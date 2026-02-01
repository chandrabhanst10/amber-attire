import User from "../../models/user.model";
import Otp from "../../models/otp.model";
import bcrypt from "bcrypt";
import { signJwt } from "../../shared/utils/generateToken";
import { generateOTP } from "../../shared/utils/generateOTP";
import { RegisterPayload, LoginPayload, VerifyOtpPayload } from "./auth.types";
import { EmailService } from "../../services/email/email.service";
import otpTemplate from "../../templates/account/otp";
import { AppError } from "../../shared/utils/AppError";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { TokenService } from "./token.service";


const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("JWT_SECRET missing");
export class AuthService {
  /* ================= REGISTER ================= */

  static async register(payload: RegisterPayload) {
    const { name, email, phone, password, profilePhoto } = payload;

    if (!/^[6-9]\d{9}$/.test(phone)) {
      throw new AppError("Invalid Indian phone number", 400);
    }

    const formattedPhone = "+91" + phone;

    const existingUser = await User.findOne({ email });
    const existingPhone = await User.findOne({ phone: formattedPhone });

    // Handle existing verified user
    if ((existingUser && existingUser.isVerified) || (existingPhone && existingPhone.isVerified)) {
      throw new AppError("User already registered", 400);
    }

    let user;

    // Handle existing unverified user (resend OTP)
    if (existingUser && !existingUser.isVerified) {
      user = existingUser;
      // We can optionally update details if provided, but for now just resend OTP
    } else if (existingPhone && !existingPhone.isVerified) {
      user = existingPhone;
    } else {
      // Create New User
      const hashedPassword = await bcrypt.hash(password, 12);
      user = new User({
        name,
        email,
        phone: formattedPhone,
        password: hashedPassword,
        isVerified: false,
        profilePhoto: profilePhoto
      });
      await user.save();
    }

    await this.sendOtp({
      phone: user.phone,
      email: user.email!,
      name: user.name,
    });

    return { user, message: "OTP sent to your email. Please verify." };
  }

  /* ================= SEND OTP ================= */

  static async sendOtp({
    phone,
    email,
    name,
  }: {
    phone: string;
    email: string;
    name: string;
  }) {
    const otp = generateOTP();

    const hashedOtp = await bcrypt.hash(otp, 10);

    // Remove console.log of hash in prod

    await Otp.deleteMany({ phone });
    await Otp.create({ phone, otp: hashedOtp });

    // Send via Email
    try {
      // Pass simple string or template? Using existing template helper
      // The template might need customization but reusing logic
      await EmailService.sendOtpEmail(email, otp);
    } catch (e) {
      console.error("Failed to send OTP email", e);
      // Should we fail the request? Yes, ideally.
      throw new AppError("Failed to send OTP email", 500);
    }

    return true;
  }

  /* ================= RESEND OTP ================= */

  static async resendOtp(payload: { phone?: string; email: string; name?: string }) {
    const { email } = payload;
    if (!email) {
      throw new AppError("Email is required", 400);
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      // For security, maybe don't reveal user doesn't exist, but for now:
      throw new AppError("User not registered", 404);
    }

    await this.sendOtp({
      phone: user.phone,
      email: user.email!,
      name: user.name,
    });

    return { message: "OTP resent successfully" };
  }

  /* ================= VERIFY OTP ================= */

  static async verifyOtp(payload: VerifyOtpPayload) {
    // Current frontend sends raw phone, need to format or handle flexible input
    let formattedPhone = payload.phone;
    if (!formattedPhone.startsWith("+91")) {
      formattedPhone = "+91" + formattedPhone;
    }

    const record = await Otp.findOne({ phone: formattedPhone });
    if (!record) {
      throw new AppError("Invalid or expired OTP", 400);
    }

    const isValid = await bcrypt.compare(payload.otp, record.otp);
    if (!isValid) {
      throw new AppError("Invalid or expired OTP", 400);
    }

    const user = await User.findOne({ phone: formattedPhone });
    if (!user) {
      throw new AppError("User not found for verification", 400);
    }

    if (payload.email && user.email !== payload.email) {
      throw new AppError("Email mismatch during verification", 400);
    }

    // cleanup
    await Otp.deleteMany({ phone: formattedPhone });

    user.isVerified = true;
    await user.save();

    // After verification, do we return tokens? 
    // Usually yes, auto-login.
    const { accessToken, refreshToken } = await TokenService.generateAuthTokens(user._id.toString(), user.role);

    return { user, accessToken, refreshToken };
  }

  /* ================= LOGIN ================= */

  static async login(payload: LoginPayload) {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      throw new AppError("Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 400);
    }

    if (!user.isVerified) {
      // Send OTP and block login
      await this.sendOtp({
        phone: user.phone,
        email: user.email!,
        name: user.name
      });
      throw new AppError("Account not verified. OTP sent to your email.", 403);
    }

    // Use TokenService
    const { accessToken, refreshToken } = await TokenService.generateAuthTokens(user._id.toString(), user.role);

    return { user, accessToken, refreshToken };
  }

  /* ================= PROFILE ================= */

  static async getProfile(userId: Types.ObjectId) {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  static async updateProfile(
    userId: Types.ObjectId,
    data: Partial<RegisterPayload>,
  ) {
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.phone) user.phone = data.phone;
    if (data.profilePhoto) user.profilePhoto = data.profilePhoto;

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    await user.save();
    return true;
  }

  /* ---------- VERIFY EMAIL ---------- */
  static async verifyEmail(token: string) {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) throw new AppError("Invalid token", 400);

    user.isVerified = true;
    await user.save();
  }

  /* ================= REFRESH TOKEN ================= */
  static async refreshTokens(incomingRefreshToken: string) {
    const userId = await TokenService.rotateRefreshToken(incomingRefreshToken);
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    return await TokenService.generateAuthTokens(user._id.toString(), user.role);
  }
}

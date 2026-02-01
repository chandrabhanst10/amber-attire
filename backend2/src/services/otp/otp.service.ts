import Otp from "../../models/otp.model";
import { AppError } from "../../shared/utils/AppError";
import { generateOTP } from "../../shared/utils/generateOTP";
import { OtpProvider } from "./otp.provider";

class MockOtpProvider implements OtpProvider {
  async send(phone: string, otp: string) {
    console.log(`📱 OTP sent to ${phone}: ${otp}`);
  }
}

const provider: OtpProvider = new MockOtpProvider();

export class OtpService {
  static async sendOtp(phone: string) {
    const otp = generateOTP(6);

    // remove old OTPs
    await Otp.deleteMany({ phone });

    await Otp.create({ phone, otp });

    await provider.send(phone, otp);

    return true;
  }

  static async verifyOtp(phone: string, otp: string) {
    const record = await Otp.findOne({ phone, otp });

    if (!record) {
      throw new AppError("Invalid or expired OTP", 400);
    }

    await Otp.deleteMany({ phone });

    return true;
  }
}

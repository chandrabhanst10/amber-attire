import { EmailService } from "../email/email.service";

export class NotificationService {
  static async userRegistered(email: string, verificationLink: string) {
    await EmailService.sendVerificationEmail(email, verificationLink);
  }

  static async otpSent(email: string, otp: string) {
    await EmailService.sendOtpEmail(email, otp);
  }

  static async orderPlaced(email: string) {
    await EmailService.sendOrderInvoice(email, Buffer.from(""));
  }
}

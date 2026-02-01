import { EmailProvider } from "./email.provider";
import { NodemailerProvider } from "./nodemailer.provider";

const provider: EmailProvider = new NodemailerProvider();
// later switch to real provider based on env

export class EmailService {
  static async sendVerificationEmail(email: string, link: string) {
    await provider.sendMail({
      to: email,
      subject: "Verify your account",
      html: `<p>Click below to verify your account:</p><a href="${link}">${link}</a>`,
    });
  }

  static async sendOtpEmail(email: string, otp: string) {
    await provider.sendMail({
      to: email,
      subject: "Your OTP Code",
      html: `<h3>Your OTP is ${otp}</h3><p>Valid for 5 minutes.</p>`,
    });
  }

  static async sendOrderInvoice(email: string, pdfBuffer: Buffer) {
    // attachment support later
    await provider.sendMail({
      to: email,
      subject: "Your Order Invoice",
      html: `<p>Your invoice is attached.</p>`,
    });
  }
}

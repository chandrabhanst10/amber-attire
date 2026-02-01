import { EmailPayload, EmailProvider } from "./email.provider";

export class MockEmailProvider implements EmailProvider {
  async sendMail(payload: EmailPayload): Promise<void> {
    console.log("📧 Mock Email Sent");
    console.log("To:", payload.to);
    console.log("Subject:", payload.subject);
    console.log("HTML:", payload.html);
  }
}

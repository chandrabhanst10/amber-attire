export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export interface EmailProvider {
  sendMail(payload: EmailPayload): Promise<void>;
}

export interface OtpProvider {
  send(phone: string, otp: string): Promise<void>;
}

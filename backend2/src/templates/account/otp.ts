

export default function otpTemplate({
  name,
  otp,
}: {
  name: string;
  otp: string;
}) {
  return `
    <h2>Hello User,</h2>
    <p>Your OTP is:</p>
    <h1 style="letter-spacing:4px;">${otp}</h1>
    <p>This OTP is valid for 5 minutes.</p>
  `;
}

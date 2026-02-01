export default function passwordResetTemplate(data: { name: any; resetLink: any; }) {
    return {
      subject: "Password Reset AuthRequest",
      html: `
        <h2>Hi ${data.name || "User"},</h2>
        <p>We received a request to reset your password.</p>
        <a href="${data.resetLink}" target="_blank">Reset Password</a>
        <p>If you didn’t request this, please ignore this email.</p>
      `
    };
  }
  
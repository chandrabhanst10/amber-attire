export default function emailVerificationTemplate(data: { name: any; verificationLink: any; }) {
    return  `
        <h2>Hello ${data.name || "User"},</h2>
        <p>Click the link below to verify your email address:</p>
        <a href="${data.verificationLink}" target="_blank">Verify Email</a>
        <p>If you didn’t create an account, you can ignore this email.</p>
      `
  }
  
export default function passwordChangedTemplate(data: { name: any; }) {
    return {
      subject: "Your password has been changed",
      html: `
        <h2>Hi ${data.name || "User"},</h2>
        <p>This is to confirm your password was successfully updated.</p>
        <p>If you didn’t make this change, contact support immediately.</p>
      `
    };
  }
  
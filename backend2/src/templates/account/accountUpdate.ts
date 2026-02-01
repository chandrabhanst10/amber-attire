export default function accountUpdateTemplate(data: { name: any; }) {
    return {
      subject: "Account Information Updated",
      html: `
        <h2>Hi ${data.name || "User"},</h2>
        <p>Your account information has been updated successfully.</p>
        <p>If this wasn’t you, please contact support immediately.</p>
      `
    };
  }
  
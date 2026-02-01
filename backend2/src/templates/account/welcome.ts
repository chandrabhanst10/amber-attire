export default function welcomeTemplate(data: { appName: any; name: any; }) {
    return {
      subject: `Welcome to ${data.appName || "Our Store"} 🎉`,
      html: `
        <h2>Hi ${data.name || "User"},</h2>
        <p>Welcome to <b>${data.appName || "Our Store"}</b>! We’re excited to have you on board.</p>
        <p>Start exploring our latest products and offers now.</p>
        <p>Best,<br>The ${data.appName || "Our Store"} Team</p>
      `
    };
  }
  
export default function accountStatusTemplate(data: { status: string; name: any; }) {
    return {
      subject: `Account ${data.status === "deactivated" ? "Deactivated" : "Reactivated"}`,
      html: `
        <h2>Hi ${data.name || "User"},</h2>
        <p>Your account has been <b>${data.status}</b>.</p>
        <p>If this wasn’t intended, please reach out to support.</p>
      `
    };
  }
  
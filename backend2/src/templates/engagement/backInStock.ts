export default function backInStockTemplate(data: { name: any; productName: any; productLink: any; }) {
    return {
      subject: "Back in Stock 🎉",
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Your favorite item <b>${data.productName}</b> is back in stock!</p>
        <a href="${data.productLink}" target="_blank">Grab it before it’s gone!</a>
      `
    };
  }
  
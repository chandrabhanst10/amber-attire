export default function priceDropTemplate(data: { name: any; productName: any; newPrice: any; productLink: any; }) {
    return {
      subject: "Price Drop Alert 🔻",
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Good news! The price of <b>${data.productName}</b> dropped to <b>$${data.newPrice}</b>.</p>
        <a href="${data.productLink}" target="_blank">Buy Now</a>
      `
    };
  }
  
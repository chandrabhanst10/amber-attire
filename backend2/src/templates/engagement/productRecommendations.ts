export default function productRecommendationsTemplate(data: { name: any; products: any[]; }) {
    return {
      subject: "Recommended for You ✨",
      html: `
        <h2>Hi ${data.name},</h2>
        <p>We thought you might like these products:</p>
        <ul>
          ${data.products.map(p => `<li><a href="${p.link}" target="_blank">${p.name} - $${p.price}</a></li>`).join("")}
        </ul>
      `
    };
  }
  
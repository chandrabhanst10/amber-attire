export default function recentlyViewedTemplate(data: { name: any; products: any[]; }) {
    return {
      subject: "Recently Viewed Items",
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Here are the items you recently viewed:</p>
        <ul>
          ${data.products.map(p => `<li><a href="${p.link}" target="_blank">${p.name} - $${p.price}</a></li>`).join("")}
        </ul>
      `
    };
  }
  
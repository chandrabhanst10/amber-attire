export default function cartReminderTemplate(data: any) {
  return {
    subject: "Complete your purchase 🛒",
    html: `
        <h2>Hi ${data.name},</h2>
        <p>You left some items in your cart. Don’t miss out!</p>
        <a href="${data.cartLink}" target="_blank">Go to Cart</a>
      `
  };
}

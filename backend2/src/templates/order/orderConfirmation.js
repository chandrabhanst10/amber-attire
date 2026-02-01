export default function orderConfirmationTemplate(data) {
    return {
      subject: `Order Confirmation - #${data.orderId}`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Thank you for your order <b>#${data.orderId}</b>!</p>
        <p>Total Amount: <b>$${data.amount}</b></p>
        <p>We’ll notify you when it ships.</p>
      `
    };
  }
  
export default function refundProcessedTemplate(data) {
    return {
      subject: `Refund Processed - Order #${data.orderId}`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Your refund for order <b>#${data.orderId}</b> has been processed.</p>
        <p>Amount refunded: <b>$${data.amount}</b></p>
      `
    };
  }
  
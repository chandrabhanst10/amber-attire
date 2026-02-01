export default function orderDeliveredTemplate(data) {
    return {
      subject: `Order #${data.orderId} Delivered ✅`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Your order <b>#${data.orderId}</b> has been delivered successfully.</p>
        <p>We’d love to hear your feedback!</p>
      `
    };
  }
  
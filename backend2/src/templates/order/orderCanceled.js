export default function orderCanceledTemplate(data) {
    return {
      subject: `Order #${data.orderId} Canceled`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Your order <b>#${data.orderId}</b> has been canceled.</p>
        <p>If this wasn’t intentional, please contact support.</p>
      `
    };
  }
  
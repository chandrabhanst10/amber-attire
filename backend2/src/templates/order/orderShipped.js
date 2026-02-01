export default function orderShippedTemplate(data) {
    return {
      subject: `Your order #${data.orderId} has shipped!`,
      html: `
        <h2>Good news, ${data.name}!</h2>
        <p>Your order <b>#${data.orderId}</b> has been shipped.</p>
        <p>Tracking ID: <b>${data.trackingId}</b></p>
        <a href="${data.trackingLink}" target="_blank">Track your package</a>
      `
    };
  }
  
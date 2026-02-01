export default function paymentStatusTemplate(data) {
    return {
      subject: `Payment ${data.status === "success" ? "Successful" : "Failed"}`,
      html: `
        <h2>Hi ${data.name},</h2>
        <p>Your payment for order <b>#${data.orderId}</b> was <b>${data.status}</b>.</p>
        <p>Amount: $${data.amount}</p>
      `
    };
  }
  
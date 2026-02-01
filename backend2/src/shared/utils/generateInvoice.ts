import PDFDocument from "pdfkit";

export const generateInvoicePDF = (
  order: any
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      /* =====================
         INVOICE HEADER
      ===================== */
      doc.fontSize(18).text("INVOICE", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Order Number: ${order?.orderNumber || "-"}`);
      doc.text(`Date: ${new Date(order?.createdAt || Date.now()).toLocaleDateString()}`);
      doc.text(`Email: ${order?.email || "-"}`);
      doc.text(`Phone: ${order?.phone || "-"}`);
      doc.moveDown();

      /* =====================
         SHIPPING ADDRESS
      ===================== */
      const addr = order?.shippingAddress;

      doc.fontSize(14).text("Shipping Address:");
      doc.fontSize(12).text(addr?.name || "-");
      doc.text(addr?.addressLine1 || "-");

      if (addr?.addressLine2) {
        doc.text(addr.addressLine2);
      }

      doc.text(
        `${addr?.city || "-"}, ${addr?.state || "-"} - ${addr?.postalCode || "-"}`
      );
      doc.text(addr?.country || "-");
      doc.moveDown();

      /* =====================
         ORDER ITEMS
      ===================== */
      doc.fontSize(14).text("Order Items:");
      doc.moveDown(0.5);

      doc.fontSize(12);

      if (Array.isArray(order?.items)) {
        order.items.forEach((item: any) => {
          doc.text(
            `${item?.productName || "Item"} ` +
              `(${item?.size || ""} ${item?.color?.name || ""}) ` +
              `x${item?.quantity || 0} - ₹${item?.itemTotal || 0}`
          );
        });
      }

      doc.moveDown();

      /* =====================
         TOTALS
      ===================== */
      doc.text(`Subtotal: ₹${order?.subTotal || 0}`);
      doc.text(`Discount: ₹${order?.discountTotal || 0}`);
      doc.text(`Tax: ₹${order?.taxTotal || 0}`);
      doc.text(`Shipping: ₹${order?.shippingCost || 0}`);

      doc.moveDown(0.5);

      // PDFKit bold = use font weight, not option
      doc.fontSize(14).font("Helvetica-Bold").text(
        `Grand Total: ₹${order?.grandTotal || 0}`
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

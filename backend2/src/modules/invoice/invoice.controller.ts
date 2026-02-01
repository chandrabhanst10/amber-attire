// controllers/invoiceController
import {  Response } from "express";
import fs from "fs"
import path from "path"
import { AuthRequest } from "../../shared/types/auth.types";

export const downloadInvoice = (req:AuthRequest, res:Response) => {
  try {
    const { invoiceId } = req.params;

    // Path to invoice PDF (example: saved locally)
    const invoicePath = path.join(__dirname, "../invoices", `${invoiceId}.pdf`);

    // Check if invoice exists
    if (!fs.existsSync(invoicePath)) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Set headers and send file
    res.download(invoicePath, `invoice-${invoiceId}.pdf`, (err) => {
      if (err) {
        console.error("Error downloading invoice:", err);
        res.status(500).json({ message: "Error downloading invoice" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

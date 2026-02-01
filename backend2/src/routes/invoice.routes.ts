import express from "express";
import { downloadInvoice } from "../modules/invoice/invoice.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:invoiceId", authMiddleware, downloadInvoice);

export default router;

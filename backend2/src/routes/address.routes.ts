import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { createAddress, deleteAddress, getAddressById, getAddresses, updateAddress } from "../modules/address/address.controller";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createAddress);
router.get("/", getAddresses);
router.get("/:id", getAddressById);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;

import express from "express";
import { subscribeToNotifications } from "../modules/notification/notification.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/subscribe", authMiddleware, subscribeToNotifications);

export default router;

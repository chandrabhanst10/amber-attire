import { Response } from "express";
import { AuthRequest } from "../../shared/types/auth.types";
import { notificationService } from "./notification.service";

export const subscribeToNotifications = (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // SSE Headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    notificationService.addClient(req.user.id.toString(), res);

    // Send initial ping
    res.write(`data: ${JSON.stringify({ message: "Connected to notification stream" })}\n\n`);
};

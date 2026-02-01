import { kafkaService } from "../kafka/kafka.service";
import AuditLog from "../../models/audit.model";
import { logger } from "../../shared/utils/logger";

export const startAuditConsumer = async () => {
    await kafkaService.subscribe("admin-audit-logs", async (message) => {
        try {
            logger.info("Processing Audit Log", message);
            await AuditLog.create({
                action: message.action,
                method: message.method,
                endpoint: message.endpoint,
                userId: message.userId,
                userEmail: message.userEmail,
                ipAddress: message.ipAddress,
                userAgent: message.userAgent,
                createdAt: message.timestamp
            });
        } catch (err) {
            logger.error({ err }, "Failed to save audit log");
        }
    });
};

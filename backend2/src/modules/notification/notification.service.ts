import { Response } from "express";
import { logger } from "../../shared/utils/logger";

interface Client {
    id: string;
    res: Response;
    userId: string;
}

class NotificationService {
    private clients: Client[] = [];

    // Add a new client connection
    addClient(userId: string, res: Response) {
        const clientId = Date.now().toString();
        const newClient = { id: clientId, res, userId };
        this.clients.push(newClient);

        logger.info(`SSE Client connected: ${userId} (${clientId})`);

        // Remove client on connection close
        res.on("close", () => {
            logger.info(`SSE Client disconnected: ${userId} (${clientId})`);
            this.clients = this.clients.filter((c) => c.id !== clientId);
        });
    }

    // Send notification to specific user
    sendToUser(userId: string, event: string, data: any) {
        const userClients = this.clients.filter((c) => c.userId === userId.toString());
        userClients.forEach((client) => {
            client.res.write(`event: ${event}\n`);
            client.res.write(`data: ${JSON.stringify(data)}\n\n`);
        });
    }

    // Broadcast to all admins (role check would be needed in addClient or separate list)
    // Simple implementation: broadcast to all for now or filter by role logic if we stored role
    sendToAdmins(event: string, data: any) {
        // Assuming we identify admins, for now sending to everyone (placeholder)
        // or we can expect role to be passed in addClient
        this.clients.forEach(client => {
            // In a real app, check client.role === 'ADMIN'
            client.res.write(`event: ${event}\n`);
            client.res.write(`data: ${JSON.stringify(data)}\n\n`);
        })
    }
}

export const notificationService = new NotificationService();

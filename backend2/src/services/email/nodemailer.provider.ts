import nodemailer from "nodemailer";
import { EmailPayload, EmailProvider } from "./email.provider";
import dotenv from "dotenv";
dotenv.config();

const env = process.env;

export class NodemailerProvider implements EmailProvider {
    private transporter: nodemailer.Transporter;

    constructor() {
        console.log("📧 Nodemailer Config Check:", {
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            user: env.SMTP_USER,
            secure: env.SMTP_SECURE,
            envHostRaw: env.SMTP_HOST // Fallback check
        });

        this.transporter = nodemailer.createTransport({
            host: env.SMTP_HOST,
            port: Number(env.SMTP_PORT),
            secure: env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS,
            },
        });
    }

    async sendMail(payload: EmailPayload): Promise<void> {
        const mailOptions = {
            from: env.SMTP_USER, // sender address
            to: payload.to, // list of receivers
            subject: payload.subject, // Subject line
            html: payload.html, // html body
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.error("Error sending email via Nodemailer:", error);
            // Depending on requirements, we might want to throw or swallow.
            // Throwing allows the service to know it failed.
            throw error;
        }
    }
}

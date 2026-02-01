import { config } from "dotenv"
import nodemailer from 'nodemailer';
config();

export const sendOrderEmail = async (to: string, subject: string, html: string, attachments = []) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: "belh mzrz auuk awef"
      }
    });
  
    await transporter.sendMail({
      from: `"Aangan attire" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments
    });
    return true
  };
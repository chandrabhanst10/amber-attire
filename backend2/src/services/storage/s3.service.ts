import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { logger } from "../../shared/utils/logger";
import crypto from "crypto";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    logger.warn("AWS S3 Credentials missing. File uploads will fail.");
}

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKeyId || "",
        secretAccessKey: secretAccessKey || "",
    },
    region: region || "ap-south-1",
});

export const StorageService = {
    async uploadFile(fileBuffer: Buffer, mimeType: string, folder: string = "products"): Promise<string> {
        const fileName = `${folder}/${crypto.randomUUID()}.${mimeType.split("/")[1]}`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: fileBuffer,
            ContentType: mimeType,
        });

        try {
            await s3.send(command);
            // Construct public URL (assuming public bucket or CloudFront)
            // If using CloudFront, this should be replaced with CloudFront URL logic
            return `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
        } catch (error) {
            logger.error({ err: error }, "S3 Upload Error");
            throw new Error("File upload failed");
        }
    },

    async deleteFile(fileUrl: string) {
        // Extract Key from URL
        // Format: https://bucket.s3.region.amazonaws.com/folder/filename
        try {
            const urlParts = new URL(fileUrl);
            const key = urlParts.pathname.substring(1); // Remove leading /

            const command = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key,
            });

            await s3.send(command);
        } catch (error) {
            logger.error({ err: error }, "S3 Delete Error");
            // Don't throw, just log
        }
    },

    async getPresignedUrl(key: string, expiresIn = 3600) {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
        });
        return getSignedUrl(s3, command, { expiresIn });
    }
};

import { kafka } from "../../config/kafka";
import { logger } from "../../shared/utils/logger";
import { Producer, Consumer } from "kafkajs";

class KafkaService {
    private producer: Producer | null = null;
    private consumer: Consumer | null = null;

    constructor() {
        if (kafka) {
            this.producer = kafka.producer();
            this.consumer = kafka.consumer({ groupId: "audit-group" });
        }
    }

    async connect() {
        if (!this.producer) return;
        try {
            await this.producer.connect();
            // await this.consumer?.connect(); // Connect consumer only when needed or on start
            logger.info("Kafka Producer connected");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            logger.warn(`Kafka connection failed (${msg}). App running without async events.`);
        }
    }

    async send(topic: string, messages: any[]) {
        if (!this.producer) return;
        try {
            await this.producer.send({
                topic,
                messages: messages.map((msg) => ({ value: JSON.stringify(msg) })),
            });
        } catch (err) {
            logger.error({ err }, "Failed to send Kafka message");
        }
    }

    async subscribe(topic: string, callback: (message: any) => Promise<void>) {
        if (!this.consumer) return;
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic, fromBeginning: false });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    if (message.value) {
                        const parsed = JSON.parse(message.value.toString());
                        await callback(parsed);
                    }
                }
            });
            logger.info(`Kafka Consumer subscribed to ${topic}`);
        } catch (err) {
            logger.error({ err }, `Failed to subscribe to ${topic}`);
        }
    }
}

export const kafkaService = new KafkaService();

import { Kafka, logLevel } from "kafkajs";
import { env } from "./env";

const brokers = env.KAFKA_BROKERS ? env.KAFKA_BROKERS.split(",") : [];

export const kafka = brokers.length > 0 ? new Kafka({
    clientId: "amber-attire-backend",
    brokers,
    logLevel: logLevel.ERROR,
}) : null;

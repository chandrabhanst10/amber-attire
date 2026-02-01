import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import compression from "compression";
import routes from "./rootRoutes";
import { securityMiddlewares } from "./middlewares/security.middleware";
import { errorHandler } from "./shared/error/errorHandler";
import { kafkaService } from "./services/kafka/kafka.service";

import { startAuditConsumer } from "./services/audit/audit.consumer";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./shared/docs/swagger";

config();

const app = express();

// ===== Core Middlewares =====
app.use(cors({ origin: true, credentials: true, }));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: { ...req.query },
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});
// ===== Security =====
securityMiddlewares(app);

// ===== Services =====
kafkaService.connect();
// Start consumer in background (non-blocking)
startAuditConsumer();

// ===== Routes =====
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ===== Global Error Handler (MUST BE LAST) =====
app.use(errorHandler);

export default app;

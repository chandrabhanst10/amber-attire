import { env } from "./config/env";
import app from "./app";
import connectDB from "./db/Db";

const PORT = env.PORT || 5000;

const startServer = async () => {
  try {
    // 1️⃣ Connect Database
    await connectDB();

    // 2️⃣ Connect Redis (safe even if unused initially)

    // 3️⃣ Start Server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Handle Unhandled Rejections (Promise rejections)
    process.on("unhandledRejection", (err: Error) => {
      console.error("❌ Unhandled Rejection! Shutting down...");
      console.error(err.name, err.message);

      // Graceful shutdown
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle Uncaught Exceptions (Sync errors)
    process.on("uncaughtException", (err: Error) => {
      console.error("❌ Uncaught Exception! Shutting down...");
      console.error(err.name, err.message);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Server startup failed", error);
    process.exit(1);
  }
};

startServer();

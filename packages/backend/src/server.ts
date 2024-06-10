import Fastify, { FastifyInstance } from "fastify";
import TaskController from "@/controllers/task.controller";
import { connect } from "mongoose";

export default class MomentumServer {
  private fastify: FastifyInstance;

  constructor() {
    this.fastify = this.createFastify();
  }

  private createFastify(): FastifyInstance {
    const msgPrefix = "[Momentum] ";
    const loggerConfiguration = {
      transport: {
        target: "pino-pretty",
      },
    };

    return Fastify({
      logger: {
        msgPrefix,
        ...(process.env.NODE_ENV === "production" ? {} : loggerConfiguration),
      },
      disableRequestLogging: true,
    });
  }

  public async start(): Promise<void> {
    await this.connectDatabase();
    await this.startServer();
  }

  private async connectDatabase(): Promise<void> {
    const { MONGODB_URI, MONGODB_DB } = process.env;

    if (!MONGODB_URI || !MONGODB_DB) {
      this.fastify.log.error("MongoDB URI or DB is not provided");
      process.exit(1);
    }

    try {
      await connect(MONGODB_URI, {
        dbName: MONGODB_DB,
        connectTimeoutMS: 5000,
      });
      this.fastify.log.info(`Connected to MongoDB database: ${MONGODB_DB}`);
    } catch (error) {
      this.fastify.log.error(error);
    }
  }

  private async startServer(): Promise<void> {
    this.fastify.register(import("@fastify/cors"), {
      origin: "*",
    });

    this.fastify.get("/", async function handler(request, reply) {
      reply.status(200).send({ status: "Server is running" });
    });

    this.fastify.register(new TaskController().getController, {
      prefix: "v1/tasks",
      logLevel: process.env.NODE_ENV === "production" ? "info" : "debug",
    });

    try {
      const port = Number(process.env.PORT) || 3000;
      await this.fastify.listen({ host: "0.0.0.0", port });
    } catch (error) {
      this.fastify.log.error(error);
      process.exit(1);
    }
  }
}

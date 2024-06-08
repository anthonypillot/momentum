import Fastify, { FastifyInstance } from "fastify";
import TaskController from "./controllers/task.controller";
import { connect } from "mongoose";
import "dotenv/config";

class HttpServer {
  private fastify: FastifyInstance = this.createFastify();

  private createFastify(): FastifyInstance {
    if (process.env.NODE_ENV !== "production") {
      return Fastify({
        logger: {
          msgPrefix: "[Momentum server] ",
          transport: {
            target: "pino-pretty",
          },
        },
      });
    } else {
      return Fastify({
        logger: {
          msgPrefix: "[Momentum server] ",
        },
      });
    }
  }

  public async start() {
    await this.connectToDatabase();

    this.fastify.get("/", async function handler(request, reply) {
      reply.status(200).send({ status: "Server is running" });
    });

    const taskController = new TaskController();

    this.fastify.register(taskController.getController, {
      prefix: "v1/tasks",
    });

    try {
      const port = Number(process.env.PORT) || 3000;
      await this.fastify.listen({ host: "0.0.0.0", port });
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }

  private async connectToDatabase() {
    try {
      await connect("mongodb://momentum:password@localhost:27017", {
        dbName: "momentum",
        connectTimeoutMS: 1000,
      });
      this.fastify.log.info("Connected to the database");
    } catch (err) {
      this.fastify.log.error(err);
    }
  }
}

const server = new HttpServer();
server.start();

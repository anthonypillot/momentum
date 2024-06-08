import Fastify, { FastifyInstance } from "fastify";
import taskController from "./controllers/task.controller";

class HttpServer {
  private fastify: FastifyInstance = Fastify({
    logger: {
      msgPrefix: "[Momentum server] ",
      transport: {
        target: "pino-pretty",
      },
    },
  });

  async start() {
    // Declare a route
    this.fastify.get("/", async function handler(request, reply) {
      return { hello: "world" };
    });

    this.fastify.register(taskController, {
      prefix: "/tasks",
    });

    // Run the server!
    try {
      await this.fastify.listen({ port: 3000 });
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }
}

const server = new HttpServer();
server.start();

// task.controller.ts
import { FastifyInstance } from "fastify";

export default async function taskController(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    // Implémentez votre logique ici
    reply.send({ controller: "task" });
  });
}

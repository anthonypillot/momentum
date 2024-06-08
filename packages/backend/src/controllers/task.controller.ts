import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "@/services/task.service";
import { Task } from "@/types/task.type";

interface TaskParams {
  id: string;
}

export default class TaskController {
  private taskService: TaskService;

  public constructor() {
    /**
     * Because of using
     * this.fastify.register(taskController.getController) in main.ts,
     * we need to bind the context of the getController method to the TaskController instance.
     */
    this.getController = this.getController.bind(this);
    this.taskService = new TaskService();
  }

  public async getController(fastify: FastifyInstance): Promise<void> {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
      const tasks: Task[] | null = await this.taskService.getAll();
      if (tasks) {
        reply.header("content-type", "application/json").status(200).send(JSON.stringify(tasks));
      } else {
        reply.header("content-type", "application/json").status(200).send("[]");
      }
    });

    fastify.get("/:id", async (request: FastifyRequest<{ Params: TaskParams }>, reply: FastifyReply) => {
      const task: Task | null = await this.taskService.get(request.params.id);
      if (task) {
        reply.header("content-type", "application/json").status(200).send(JSON.stringify(task));
      } else {
        reply.header("content-type", "application/json").status(404).send();
      }
    });

    fastify.post("/", async (request: FastifyRequest<{ Body: Task }>, reply: FastifyReply) => {
      const newTask: Task = await this.taskService.create(request.body);
      reply.header("content-type", "application/json").status(201).send(JSON.stringify(newTask));
    });

    fastify.put("/", async (request: FastifyRequest<{ Body: Task }>, reply: FastifyReply) => {
      const task: Task | null = await this.taskService.update(request.body);
      if (task) {
        reply.header("content-type", "application/json").status(200).send(JSON.stringify(task));
      } else {
        reply.header("content-type", "application/json").status(404).send();
      }
    });

    fastify.delete("/", async (request: FastifyRequest, reply: FastifyReply) => {
      await this.taskService.deleteAll();
      reply.header("content-type", "application/json").status(204).send();
    });

    fastify.delete("/:id", async (request: FastifyRequest<{ Params: TaskParams }>, reply: FastifyReply) => {
      await this.taskService.delete(request.params.id);
      reply.header("content-type", "application/json").status(204).send();
    });
  }
}

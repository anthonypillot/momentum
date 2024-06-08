import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import TaskService from "../services/task.service";
import { Task } from "../types/task.type";

export default class TaskController {
  private taskService: TaskService;

  constructor() {
    /**
     * Because of using
     * this.fastify.register(taskController.getController)
     * in main.ts, we need to bind the context of the getController method to the TaskController instance.
     */
    this.getController = this.getController.bind(this);
    this.taskService = new TaskService();
  }

  async getController(fastify: FastifyInstance): Promise<void> {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
      const tasks: Task[] = await this.taskService.getTasks();
      reply.header("content-type", "application/json").status(200).send(JSON.stringify(tasks));
    });

    fastify.get("/:id", async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };
      const task: Task = await this.taskService.getTask(params.id);
      reply.header("content-type", "application/json").status(200).send(JSON.stringify(task));
    });

    fastify.post("/", async (request: FastifyRequest, reply: FastifyReply) => {
      const task: Task = request.body as Task;
      const newTask: Task = await this.taskService.createTask(task);
      reply.header("content-type", "application/json").status(201).send(JSON.stringify(newTask));
    });
  }
}

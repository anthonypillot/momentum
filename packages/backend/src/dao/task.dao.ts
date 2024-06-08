import { TaskModel } from "@/models/task.model";
import { Task } from "@/types/task.type";
import { logger } from "@/utils/logger";

export default class TaskDao {
  public async getAll(): Promise<Task[] | null> {
    try {
      logger.debug("Getting all tasks");
      return await TaskModel.find();
    } catch (error) {
      throw new Error("Failed to get tasks. Error: " + error);
    }
  }

  public async get(id: string): Promise<Task | null> {
    try {
      logger.debug("Get one task");
      return await TaskModel.findById(id);
    } catch (error) {
      throw new Error("Failed to get task. Error: " + error);
    }
  }

  public async create(task: Task): Promise<Task> {
    try {
      logger.debug("Creating task");
      return TaskModel.create(task);
    } catch (error) {
      throw new Error("Failed to create task. Error: " + error);
    }
  }

  public async update(task: Task): Promise<Task | null> {
    try {
      logger.debug("Updating task");
      return TaskModel.findByIdAndUpdate(task._id, task, { new: true });
    } catch (error) {
      throw new Error("Failed to create task. Error: " + error);
    }
  }

  public async deleteAll(): Promise<boolean> {
    try {
      logger.debug("Deleting all tasks");
      await TaskModel.deleteMany({});
      return true;
    } catch (error) {
      throw new Error("Failed to delete all tasks. Error: " + error);
    }
  }

  public async delete(id: string): Promise<Task | null> {
    try {
      logger.debug("Deleting task");
      return TaskModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Failed to delete task. Error: " + error);
    }
  }
}

import { TaskModel } from "../models/task.model";
import { Task } from "../types/task.type";

export default class TaskDao {
  public getTasks(): Promise<Task[] | null> {
    return TaskModel.find();
  }

  public getTask(id: string): Promise<Task | null> {
    return TaskModel.findById(id);
  }

  public createTask(task: Task): Promise<Task> {
    return TaskModel.create(task);
  }
}

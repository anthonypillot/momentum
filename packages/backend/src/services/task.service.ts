import TaskDao from "@/dao/task.dao";
import { Task } from "@/types/task.type";

export class TaskService {
  private taskDao: TaskDao;

  constructor() {
    this.taskDao = new TaskDao();
  }

  public async getAll(): Promise<Task[] | null> {
    return this.taskDao.getAll();
  }

  public async get(id: string): Promise<Task | null> {
    return this.taskDao.get(id);
  }

  public async create(task: Task): Promise<Task> {
    return this.taskDao.create(task);
  }

  public async update(task: Task): Promise<Task | null> {
    return this.taskDao.update(task);
  }

  public async deleteAll(): Promise<void> {
    this.taskDao.deleteAll();
  }

  public async delete(id: string): Promise<void> {
    this.taskDao.delete(id);
  }
}

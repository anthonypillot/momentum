import TaskDao from "../dao/task.dao";
import { Task } from "../types/task.type";

export default class TaskService {
  private taskDao: TaskDao;

  constructor() {
    this.taskDao = new TaskDao();
  }

  async getTasks(): Promise<Task[]> {
    return this.taskDao.getTasks();
  }

  async getTask(id: string): Promise<Task> {
    return this.taskDao.getTask(id);
  }

  async createTask(task: Task): Promise<Task> {
    return this.taskDao.createTask(task);
  }
}

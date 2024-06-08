import { Schema, model } from "mongoose";
import type { Task } from "@/types/task.type";

const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: { type: String, required: false },
  status: { type: String, required: true, enum: ["todo", "in-progress", "done"] },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const TaskModel = model<Task>("Task", taskSchema);

export type Task = {
  _id?: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'done'
  createdAt: Date
  updatedAt: Date
}

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "ongoing" | "finished";
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  subTasks: SubTask[];
};

export type SubTask = {
  id: number;
  title: string;
  completed: boolean;
};

export type TasksResponse = {
  tasks: Task[];
};

export type TaskResponse = {
  task: Task;
};

export type SubTaskResponse = {
  subTask: SubTask;
};

export type TaskFormType = {
  title: string;
  description: string;
};

export type SubTaskFormType = {
  title: string;
};

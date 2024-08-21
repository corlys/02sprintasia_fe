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

export type TaskResponse = {
  tasks: Task[];
};

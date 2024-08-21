export type Task = {
  id: number;
  title: string;
  description: string;
  status: "ongoing" | "finished";
  createdAt: string;
  updatedAt: string;
  deadline?: string;
};

export type TaskResponse = {
  tasks: Task[];
};

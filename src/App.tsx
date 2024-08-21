import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosClient from "./utils/axios";
import type { SubTask, TaskResponse } from "./types";

function App() {
  const queryClient = useQueryClient();
  const getTasklist = async () => {
    const res = await axiosClient.get<TaskResponse>("/tasks");
    return res.data;
  };

  const deleteTask = async (id: number) => {
    await axiosClient.post("/tasks/delete", {
      id,
    });
  };

  const flipTask = async (id: number, currentState: string) => {
    await axiosClient.post("/tasks/update", {
      id,
      currentState: currentState === "finished" ? "ongoing" : "finished",
    });
  };

  const deleteTaskMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const flipTaskMutation = useMutation({
    mutationFn: ({ id, currentState }: { id: number; currentState: string }) =>
      flipTask(id, currentState),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const { data } = useQuery("tasks", getTasklist);

  function progressPercentage(subTasks: SubTask[]) {
    if (subTasks.length === 0) return 0;
    const completedCount = subTasks.filter(
      (subTask) => subTask.completed === true,
    ).length;
    const percentage = (completedCount / subTasks.length) * 100;
    return percentage.toFixed(2);
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center mt-10">
        <div className="min-w-96 border-2 border-sky-50 rounded-lg flex flex-col items-start justify-between p-8 gap-4">
          <input
            className="border-2 border-sky-100 rounded p-1 w-full"
            placeholder="Task Title"
          />
          <textarea
            className="border-2 border-sky-100 rounded p-1 w-full"
            placeholder="Task Description"
          />
          <button className="px-4 py-2 border rounded-xl bg-blue-500 hover:bg-blue-400 text-white self-end">
            Create Task
          </button>
        </div>
        {data &&
          data.tasks.map((task) => (
            <div
              className="border-2 border-sky-50 rounded-lg flex flex-row items-center justify-between p-8 gap-4"
              key={task.id}
            >
              <div className="flex flex-col items-start justify-center">
                <h2 className="text-xl font-bold">{task.title}</h2>
                <p className="text-md font-semibold">{task.description}</p>
              </div>
              <button
                onClick={() => {
                  deleteTaskMutation.mutate({
                    id: task.id,
                  });
                }}
                className="px-4 py-2 border rounded-xl bg-red-500 hover:bg-red-400 text-white"
              >
                Delete
              </button>
              <button className="px-4 py-2 border rounded-xl bg-orange-500 hover:bg-orange-400 text-white">
                Edit
              </button>
              {task.subTasks.length === 0 && (
                <button
                  onClick={() => {
                    flipTaskMutation.mutate({
                      id: task.id,
                      currentState:
                        task.status === "ongoing" ? "finished" : "ongoing",
                    });
                  }}
                  className="px-4 py-2 border rounded-xl bg-green-500 hover:bg-green-400 text-white"
                >
                  Finish
                </button>
              )}
              {task.subTasks.length > 0 && (
                <div>{progressPercentage(task.subTasks)} %</div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default App;

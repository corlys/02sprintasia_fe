import { useQuery } from "react-query";
import axiosClient from "./utils/axios";
import type { TaskResponse } from "./types";

function App() {
  const lists = [
    {
      id: 1,
      title: "Task 1",
      description: "This is description",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is description",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is description",
    },
  ];

  const getTasklist = async () => {
    const res = await axiosClient.get<TaskResponse>("/tasks");
    return res.data;
  };

  const { data } = useQuery("tasks", getTasklist);

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
              <button className="px-4 py-2 border rounded-xl bg-red-500 hover:bg-red-400 text-white">
                Delete
              </button>
              <button className="px-4 py-2 border rounded-xl bg-orange-500 hover:bg-orange-400 text-white">
                Edit
              </button>
              <button className="px-4 py-2 border rounded-xl bg-green-500 hover:bg-green-400 text-white">
                Finish
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;

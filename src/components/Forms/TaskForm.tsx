import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import type { TaskFormType } from "../../types";
import axiosClient from "../../utils/axios";

export default function TaskForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<TaskFormType>();
  const onSubmitTask = handleSubmit((data) => createTaskMutation.mutate(data));
  const createTask = async (title: string, description: string) => {
    await axiosClient.post("/tasks/create", {
      title,
      description,
    });
  };
  const createTaskMutation = useMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => createTask(title, description),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
  return (
    <>
      <form
        onSubmit={onSubmitTask}
        className="min-w-96 border-2 border-sky-50 rounded-lg flex flex-col items-start justify-between p-8 gap-4"
      >
        <input
          {...register("title")}
          className="border-2 border-sky-100 rounded p-1 w-full"
          placeholder="Task Title"
        />
        <textarea
          {...register("description")}
          className="border-2 border-sky-100 rounded p-1 w-full"
          placeholder="Task Description"
        />
        <button
          type="submit"
          className="px-4 py-2 border rounded-xl bg-blue-500 hover:bg-blue-400 text-white self-end"
        >
          Create Task
        </button>
      </form>
    </>
  );
}

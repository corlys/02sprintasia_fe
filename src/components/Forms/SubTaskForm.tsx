import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import type { SubTaskFormType } from "../../types";
import axiosClient from "../../utils/axios";

export default function TaskForm({ taskId }: { taskId: number }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<SubTaskFormType>();
  const onSubmitTask = handleSubmit((data) =>
    createSubTaskMutation.mutate({
      title: data.title,
      taskId,
    }),
  );
  const createSubTask = async (title: string, taskId: number) => {
    await axiosClient.post("/subtasks/create", {
      title,
      taskId,
    });
  };
  const createSubTaskMutation = useMutation({
    mutationFn: ({ title, taskId }: { title: string; taskId: number }) =>
      createSubTask(title, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
  return (
    <>
      <form
        onSubmit={onSubmitTask}
        className="w-full border-2 border-sky-50 rounded-lg flex flex-col items-start justify-between p-8 gap-4"
      >
        <input
          {...register("title")}
          className="border-2 border-sky-100 rounded p-1 w-full"
          placeholder="Task Title"
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

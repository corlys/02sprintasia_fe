import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import type { TaskFormType } from "../../types";
import axiosClient from "../../utils/axios";

export default function TaskForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormType>();
  const onSubmitTask = handleSubmit((data) => createTaskMutation.mutate(data));
  const createTask = async (
    title: string,
    description: string,
    deadline?: string,
  ) => {
    await axiosClient.post("/tasks/create", {
      title,
      description,
      deadline,
    });
  };
  const createTaskMutation = useMutation({
    mutationFn: ({
      title,
      description,
      deadline,
    }: {
      title: string;
      description: string;
      deadline?: string;
    }) => createTask(title, description, deadline),
    onSuccess: () => {
      reset({
        title: "",
        description: "",
        deadline: "",
      });
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
          {...register("title", { required: "field is required" })}
          className="border-2 border-sky-100 rounded p-1 w-full"
          placeholder="Task Title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
        <textarea
          {...register("description", { required: "field is required" })}
          className="border-2 border-sky-100 rounded p-1 w-full"
          placeholder="Task Description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
        <input
          type="date"
          {...register("deadline")}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
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

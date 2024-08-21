import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import type { TaskFormType, TaskResponse } from "../../types";
import axiosClient from "../../utils/axios";

export default function EditTaskForm({ taskId }: { taskId: number }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const getTask = async () => {
    return axiosClient.get<TaskResponse>(`/tasks/${taskId}`);
  };
  const { data, status } = useQuery({
    queryFn: getTask,
    queryKey: ["task", taskId],
  });
  const { register, handleSubmit, reset } = useForm<TaskFormType>();
  const onSubmitTask = handleSubmit((data) => editTaskMutation.mutate(data));
  const editTask = async (title: string, description: string) => {
    await axiosClient.post("/tasks/update", {
      id: taskId,
      title,
      description,
    });
  };
  const editTaskMutation = useMutation({
    mutationFn: ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => editTask(title, description),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      navigate("/");
    },
  });
  useEffect(() => {
    if (data?.data.task) {
      reset({
        title: data?.data.task.title,
        description: data?.data.task.description,
      });
    }
  }, [reset, data?.data.task]);
  return (
    <>
      {status === "success" && (
        <form
          onSubmit={onSubmitTask}
          className="min-w-96 border-2 border-sky-50 rounded-lg flex flex-col items-start justify-between p-8 gap-4"
        >
          <input
            {...register("title")}
            className="border-2 border-sky-100 rounded p-1 w-full"
          />
          <textarea
            {...register("description")}
            className="border-2 border-sky-100 rounded p-1 w-full"
          />
          <button
            type="submit"
            className="px-4 py-2 border rounded-xl bg-blue-500 hover:bg-blue-400 text-white self-end"
          >
            Edit Task
          </button>
        </form>
      )}
    </>
  );
}

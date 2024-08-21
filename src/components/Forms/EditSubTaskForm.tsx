import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import type { SubTaskFormType, SubTaskResponse } from "../../types";
import axiosClient from "../../utils/axios";

export default function EditSubTaskForm({ subTaskId }: { subTaskId: number }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const getSubTask = async () => {
    return axiosClient.get<SubTaskResponse>(`/subtasks/${subTaskId}`);
  };
  const { data, status } = useQuery({
    queryFn: getSubTask,
    queryKey: ["subTask", subTaskId],
  });
  const { register, handleSubmit } = useForm<SubTaskFormType>({
    defaultValues: {
      title: data?.data.subTask.title,
    },
  });
  const onSubmitTask = handleSubmit((data) =>
    editTaskMutation.mutate({
      title: data.title,
    }),
  );
  const editTask = async (title: string) => {
    await axiosClient.post("/subtasks/update", {
      id: subTaskId,
      title,
    });
  };
  const editTaskMutation = useMutation({
    mutationFn: ({ title }: { title: string }) => editTask(title),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      navigate("/");
    },
  });
  useEffect(() => {
    console.log("subTaskId changed to ", subTaskId);
  }, [subTaskId]);
  useEffect(() => {
    console.log("title changed to ", data?.data.subTask.title);
  }, [data?.data.subTask.title]);
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

import { useParams, Link } from "react-router-dom";
import { EditTaskForm } from "../components/Forms";

export default function TaskPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 gap-4">
        <Link
          to="/"
          className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 self-start"
        >
          Back
        </Link>
        {id && <EditTaskForm taskId={parseInt(id)} />}
      </div>
    </>
  );
}

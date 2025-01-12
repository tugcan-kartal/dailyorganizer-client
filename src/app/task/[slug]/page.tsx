"use client";

import { getTaskDetail } from "@/app/api/taskService";
import TaskItem from "@/app/components/taskItem";
import { Task } from "@/app/context/TasksContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";

const TaskDetails = () => {
  const router = useRouter();

  const [taskDetail, setTaskDetail] = useState<Task>();

  const params = useParams();
  const taskId = params.slug;

  const fetchTaskDetail = async () => {
    const token = localStorage.getItem("token");
    if (!token || typeof taskId !== "string") return;

    try {
      const data = await getTaskDetail(token, taskId);
      setTaskDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateTasksPage = () => {
    router.push("/tasks");
  };

  useEffect(() => {
    fetchTaskDetail();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Üstteki ikon kısmı */}
      <div className="absolute top-4 left-4">
        <div onClick={navigateTasksPage}>
          <AiOutlineHome  className="text-4xl cursor-pointer" />
        </div>
      </div>

      {/* Sayfa içeriği */}
      <div className="flex flex-1 items-center justify-center">
        <div>
          {taskDetail ? (
            <TaskItem task={taskDetail} fetchTasks={fetchTaskDetail} />
          ) : (
            <p>Loading task details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

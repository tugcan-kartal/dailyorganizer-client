"use client";

import { sendMessageToGbt, setTaskToGbt } from "@/app/api/taskGbtService";
import { getTaskDetail } from "@/app/api/taskService";
import TaskItem from "@/app/components/taskItem";
import { Task } from "@/app/context/TasksContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";

const TaskDetails = () => {
  const router = useRouter();

  const [taskDetail, setTaskDetail] = useState<Task>();

  const [gbtQuestion,setGbtQuestion]=useState("");
  const [gbtAnswer,setGbtAnswer]=useState("");

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

  const sendTaskDetail = async () => {
    const token = localStorage.getItem("token");
    if (!token || typeof taskId !== "string") return;

    try {
        const response = await setTaskToGbt(token, taskId);
        if (!response) {
            console.error("Error from server:", response.error);
        } else {
            console.log("Success:", response.message);
        }
    } catch (error) {
        console.log("Error in sendTaskDetail:", error);
    }
  };

  const getAnswerFromGbt=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const token=localStorage.getItem("token");
    if(!token) return;

    try {
      const response=await sendMessageToGbt(token,gbtQuestion);
      if (!response) {
        console.error("Error from server:", response.error);
      } else {
          console.log("Success:", response.message);
          console.log(response)
          setGbtAnswer(response.message);
      }
    } catch (error) {
      console.log("Error in sendTaskDetail:", error);
    }
  }

  const navigateTasksPage = () => {
    router.push("/tasks");
  };

  useEffect(() => {
    const forWait=async()=>{
      await fetchTaskDetail();
      await sendTaskDetail();
    }

    forWait();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center gap-y-[3vh] py-[3vh] bg-gray-50">
      {/* Üstteki ikon kısmı */}
      <div className="">
        <div onClick={navigateTasksPage}>
          <AiOutlineHome className="text-4xl cursor-pointer" />
        </div>
      </div>

      {/* Task kart kısmı */}
      <div className="">
        <div>
          {taskDetail ? (
            <TaskItem task={taskDetail} fetchTasks={fetchTaskDetail} />
          ) : (
            <p>Loading task details...</p>
          )}
        </div>
      </div>

      {/* Yapay zeka chat kısmı */}
      <div>
          <div>
            {gbtAnswer ? <div>{gbtAnswer}</div> : "Loading answer"}
          </div>

          <form onSubmit={getAnswerFromGbt}>
            <input placeholder="Ask a question" onChange={(e)=>setGbtQuestion(e.target.value)}/>
            <button type="submit">Send</button>
          </form>
      </div>
    </div>
  );
};

export default TaskDetails;

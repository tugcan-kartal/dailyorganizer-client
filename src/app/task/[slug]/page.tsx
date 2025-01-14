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

  const [gbtQuestion,setGbtQuestion]=useState("Tavsiye ver");
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

  const formatAnswer = (answer: string) => {
    return answer
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("**")) {
          // Başlıkları kalın yap
          return <h3 key={index} className="font-bold text-lg mt-2">{line.replace(/\*\*/g, "")}</h3>;
        } else if (line.startsWith("1.") || line.startsWith("-")) {
          // Maddeleri listeye çevir
          return <li key={index} className="ml-4 list-disc">{line.replace(/^\d+\.\s*/, "").replace(/^-/, "").trim()}</li>;
        } else {
          // Normal paragraflar
          return <p key={index} className="mb-2">{line}</p>;
        }
      });
  };

  useEffect(() => {
    const forWait=async()=>{
      await fetchTaskDetail();
      await sendTaskDetail();
      await getAnswerFromGbt({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    }

    forWait();
  }, []);

  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex flex-col justify-center items-center">
      
        {/* Üstteki ikon kısmı */}
        <div className="pt-[5vh]">
          <div onClick={navigateTasksPage}>
            <AiOutlineHome className="text-4xl cursor-pointer" />
          </div>
        </div>

        {/* İçerik */}
        <div className="flex justify-center items-center pt-[10vh] gap-x-[5vw] w-[80%] mx-auto">

          {/* Task kart kısmı */}
          <div className="">
              {taskDetail ? (
                <TaskItem task={taskDetail} fetchTasks={fetchTaskDetail} />
              ) : (
                <p>Loading task details...</p>
              )}
          </div>

          {/* Yapay zeka chat kısmı */}
          <div className="flex flex-col gap-y-4">
              <div className="h-[50vh] overflow-y-scroll bg-white rounded-2xl p-4">
                {gbtAnswer ? <div>{formatAnswer(gbtAnswer)}</div> : <div>"Loading Answer</div>}
              </div>
              
              <div className="">
                <form onSubmit={getAnswerFromGbt}>
                  <input placeholder="Ask a question" className="p-2 rounded-l w-[90%]" onChange={(e)=>setGbtQuestion(e.target.value)}/>
                  <button className="w-[10%] bg-gray-100 p-2 rounded-r" type="submit">Send</button>
                </form>
              </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TaskDetails;

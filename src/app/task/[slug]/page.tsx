"use client";

import {
  getHistoryGbt,
  sendMessageToGbt,
  setTaskToGbt,
} from "@/app/api/taskGbtService";
import { getTaskDetail } from "@/app/api/taskService";
import TaskItem from "@/app/components/taskItem";
import { Task } from "@/app/context/TasksContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";

const TaskDetails = () => {
  const router = useRouter();

  const [taskDetail, setTaskDetail] = useState<Task>();

  const [gbtQuestion, setGbtQuestion] = useState("Tavsiye ver");
  const [gbtAnswer, setGbtAnswer] = useState("");

  const [gbtHistory, setGbtHistory] = useState<
    { message: string; response: string; timestamp: Date }[]
  >([]);

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
      }
    } catch (error) {
      console.log("Error in sendTaskDetail:", error);
    }
  };

  const getAnswerFromGbt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await sendMessageToGbt(token, gbtQuestion, taskId as string);
      if (!response) {
        console.error("Error from server:", response.error);
      } else {
        setGbtAnswer(response.message);
        setGbtHistory((prev) => [
          ...prev,
          {
            message: gbtQuestion,
            response: response.message,
            timestamp: new Date(),
          },
        ]);
      }
      setGbtQuestion("");
    } catch (error) {
      console.log("Error in sendTaskDetail:", error);
    }
  };

  const getPastMessagesFromGbt = async () => {
    const token = localStorage.getItem("token");
    if (!token || typeof taskId !== "string") return;

    try {
      const response = await getHistoryGbt(token, taskId);
      setGbtHistory(response.messages || []);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const navigateTasksPage = () => {
    router.push("/tasks");
  };

  const formatAnswer = (answer: string) => {
    return answer.split("\n").map((line, index) => {
      if (line.startsWith("**")) {
        // Büyük başlıklar: Kalın, biraz daha büyük yazı
        return (
          <h3
            key={index}
            className="font-bold text-xl mt-4 text-blue-600 border-b-2 border-blue-300 pb-2"
          >
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      } else if (line.match(/:$/)) {
        // Alt başlıklar: Kalın ve belirgin yazı
        return (
          <h4
            key={index}
            className="font-semibold text-lg text-indigo-600 mt-3 mb-2"
          >
            {line.replace(/:$/, "")}
          </h4>
        );
      } else if (line.startsWith("```")) {
        // Kod blokları
        const content = line.replace(/```/g, "").trim();
        return (
          <div
            key={index}
            className="relative bg-gray-800 text-gray-200 font-mono text-sm p-4 rounded-md overflow-x-auto my-3 border border-gray-700"
          >
            <div className="absolute top-2 right-2">
              <button
                onClick={() => navigator.clipboard.writeText(content)}
                className="text-xs text-gray-300 bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
              >
                Kopyala
              </button>
            </div>
            <pre>
              <code>{content}</code>
            </pre>
          </div>
        );
      } else if (line.startsWith("-")) {
        // Liste öğeleri
        return (
          <li
            key={index}
            className="ml-6 text-gray-700 text-base flex items-start gap-2 leading-relaxed"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-[6px]" />{" "}
            {line.replace(/^-/, "").trim()}
          </li>
        );
      } else if (line.match(/^\d+\./)) {
        // Sıralı liste
        return (
          <li
            key={index}
            className="ml-8 list-decimal text-gray-700 text-base leading-relaxed"
          >
            {line.replace(/^\d+\.\s*/, "").trim()}
          </li>
        );
      } else {
        // Paragraflar
        return (
          <p
            key={index}
            className="mb-3 text-gray-600 text-base leading-relaxed hover:bg-gray-100 p-2 rounded-md transition"
          >
            {line}
          </p>
        );
      }
    });
  };

  useEffect(() => {
    const forWait = async () => {
      await fetchTaskDetail();
      await sendTaskDetail();
      await getAnswerFromGbt({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    };

    forWait();
  }, []);

  useEffect(() => {
    getPastMessagesFromGbt();
  }, [gbtAnswer]);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen md:py-[0vh] pb-[10%]">
      <div className="flex flex-col items-center">
        {/* Ev iconu burada */}
        <div className="pt-[3%] md:pr-[11%]">
          <AiOutlineHome
            className="text-4xl cursor-pointer hover:text-indigo-600 transition"
            onClick={navigateTasksPage}
          />
        </div>

        {/* Task kartı ve gbt formu */}
        <div className="flex flex-col lg:flex-row justify-center items-start pt-[5%] gap-x-[2%] w-[90%] max-w-7xl mx-auto gap-y-[5vh]">
          {/* Task kartı */}
          <div className="w-full ">
            {taskDetail ? (
              <TaskItem task={taskDetail} fetchTasks={fetchTaskDetail} />
            ) : (
              <p className="text-gray-500">Loading task details...</p>
            )}
          </div>

          {/* Gbt formu */}
          <div className="flex flex-col gap-y-6 w-full">
            <div className="h-[50vh] overflow-y-auto bg-white shadow-md rounded-xl p-6">
              {gbtHistory.map((history, key) => (
                <div key={key} className="mb-4 relative">
                  {/* Kullanıcı Mesajı */}
                  <div className="flex justify-start relative">
                    <div className="bg-blue-100 text-blue-900 p-3 rounded-lg shadow-md max-w-[75%] relative">
                      <div>{history.message}</div>
                      <div className="text-xs text-gray-500 absolute bottom-[-20px] left-2">
                        {new Date(history.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Yanıt Mesajı */}
                  <div className="flex justify-end mt-2 relative">
                    <div className="bg-gray-200 text-gray-900 p-3 rounded-lg shadow-md max-w-[75%] relative">
                      <div>{formatAnswer(history.response)}</div>
                      <div className="text-xs text-gray-500 absolute bottom-[-20px] right-2">
                        {new Date(history.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={getAnswerFromGbt}
              className="flex items-center w-full shadow-md rounded-xl bg-white"
            >
              <input
                placeholder="Ask a question..."
                className="p-4 flex-grow rounded-l-xl border-none focus:ring-2 focus:ring-blue-600 outline-none"
                onChange={(e) => setGbtQuestion(e.target.value)}
                value={gbtQuestion}
              />
              <button
                type="submit"
                className="md:w-[10%] bg-blue-600 text-white p-4 rounded-r-xl hover:bg-blue-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;

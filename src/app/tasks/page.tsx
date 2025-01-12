"use client";
import React, { useEffect } from "react";
import TaskList from "../components/taskList";
import TaskAddForm from "../components/taskAddForm";
import SideBar from "../components/sideBar";
import { useTasksContext } from "../context/TasksContext";

const Tasks: React.FC = () => {
  const {
    tasks,
    setTasks,
    taskFilter,
    setTaskFilter,
    isSideBar,
    setIsSideBar,
    isAddTask,
    setIsAddTask,
    fetchTasks
  } = useTasksContext();

  useEffect(() => {
    fetchTasks();
  }, [taskFilter || ""]);

  return (
    <div className="h-full">
      <div className="flex">
        {/* Burası sidebar açık halinin gösterim yeri yani sidebar kısmı */}
        <div
          className={`min-h-screen transition-all duration-500 ease-in-out ${
            isSideBar ? "w-[15%]" : "w-0"
          } border-r-2 bg-white border-gray-50 shadow-lg`}
        >
          <SideBar
            tasks={tasks}
            isAddTask={isAddTask}
            setIsAddTask={setIsAddTask}
            isSideBar={isSideBar}
            setIsSiteBar={setIsSideBar}
            setTaskFilter={setTaskFilter}
          />
        </div>

        <div className={`min-h-screen ${isSideBar ? "w-[85%]" : "w-[100%]"}`}>
          {/* Burada ise eğer isAddTask açıksa yani task ekleme isteniyorsa o çıkıyor yoksa task listesi geliyor */}
          {!isAddTask ? (
            <TaskList
              isAddTask={isAddTask}
              setIsAddTask={setIsAddTask}
              isSideBar={isSideBar}
              setIsSiteBar={setIsSideBar}
              tasks={tasks}
              setTasks={setTasks}
              fetchTasks={fetchTasks}
            />
          ) : (
            <TaskAddForm
              isAddTask={isAddTask}
              setIsAddTask={setIsAddTask}
              isSideBar={isSideBar}
              setIsSiteBar={setIsSideBar}
              fetchTasks={fetchTasks}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

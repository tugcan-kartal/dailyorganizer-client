"use client"
import React, { useEffect, useState } from "react";
import TaskList from "../components/taskList";
import TaskAddForm from "../components/taskAddForm";
import { getUserTasks } from "../api/taskService";
import SideBar from "../components/sideBar";

export interface Task {
  _id: string;
  title: string;
  description: string;
  importance_level: number;
  category: string;
  start_date: string;
  end_date: string;
  order: number;
}

const Tasks: React.FC=()=>{

    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskFilter, setTaskFilter] = useState<string | undefined>(undefined);

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        try {
          const data = await getUserTasks(token,taskFilter);
          if(Array.isArray(data)){
            setTasks(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchTasks();
      }, [taskFilter || ""]);

    return(
        <div className="h-full">
          <div className="flex">

            <div className="w-[15%] border-r-2 bg-white border-gray-50 shadow-lg">
              <SideBar setTaskFilter={setTaskFilter}/>
            </div>

            <div className="w-[85%] bg-blue-100 py-10">
              <TaskList tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}/>
              <TaskAddForm fetchTasks={fetchTasks}/>
            </div>

          </div>
        </div>
    )
}

export default Tasks;
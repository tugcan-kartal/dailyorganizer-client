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

    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        try {
          const data = await getUserTasks(token);
          if(Array.isArray(data)){
            setTasks(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        fetchTasks();
      }, []);

    return(
        <div className="bg-blue-100 h-full">
          <div className="flex gap-x-8">

            <div className="w-[15%] border-r-2 bg-gray-100 border-white shadow-lg">
              <SideBar />
            </div>

            <div className="w-[60%]">
              <TaskList tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}/>
              <TaskAddForm fetchTasks={fetchTasks}/>
            </div>

          </div>
        </div>
    )
}

export default Tasks;
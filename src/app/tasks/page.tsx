"use client"
import React, { useEffect, useState } from "react";
import TaskList from "../components/taskList";
import TaskAddForm from "../components/taskAddForm";
import { getUserTasks } from "../api/taskService";
import SideBar from "../components/sideBar";
import { GoSidebarCollapse } from "react-icons/go";

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

    const [isAddTask,setIsAddTask]=useState<boolean>(false);

    const [isSideBar,setIsSiteBar]=useState<boolean>(true)

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


            <div className={`transition-all duration-500 ease-in-out ${ isSideBar ? "w-[15%]" : "w-0" } border-r-2 bg-white border-gray-50 shadow-lg`}>
              <SideBar isAddTask={isAddTask} setIsAddTask={setIsAddTask} isSideBar={isSideBar} setIsSiteBar={setIsSiteBar} setTaskFilter={setTaskFilter}/>
            </div>

            <div className={` ${isSideBar ? "w-[85%]" : "w-[100%]"} bg-blue-100`}>
              {!isSideBar && 
                <div>
                  <GoSidebarCollapse onClick={()=>setIsSiteBar(!isSideBar)} className="text-2xl cursor-pointer ml-5"/>
                </div>
              }
              {!isAddTask ? 
                <TaskList tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}/>
                :
                <TaskAddForm fetchTasks={fetchTasks}/>
              }
            </div>


          </div>
        </div>
    )
}

export default Tasks;
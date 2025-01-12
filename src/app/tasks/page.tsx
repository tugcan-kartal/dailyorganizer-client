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

    // Burada sidebardaki seçeneklere göre sort yapan fieldı ayarlıyor
    const [taskFilter, setTaskFilter] = useState<string | undefined>(undefined);
    // Burada sidebar açık mı kapalı mı
    const [isSideBar,setIsSiteBar]=useState<boolean>(true)
    // Burada task eklencek mi diye boolean kontrol
    const [isAddTask,setIsAddTask]=useState<boolean>(false);


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

            {/* Burası sidebar açık halinin gösterim yeri yani sidebar kısmı */}
            <div className={`min-h-screen transition-all duration-500 ease-in-out ${ isSideBar ? "w-[15%]" : "w-0" } border-r-2 bg-white border-gray-50 shadow-lg`}>
              <SideBar tasks={tasks} isAddTask={isAddTask} setIsAddTask={setIsAddTask} isSideBar={isSideBar} setIsSiteBar={setIsSiteBar} setTaskFilter={setTaskFilter}/>
            </div>
            
            <div className={`min-h-screen ${isSideBar ? "w-[85%]" : "w-[100%]"}`}>
              
              {/* Burada ise eğer isAddTask açıksa yani task ekleme isteniyorsa o çıkıyor yoksa task listesi geliyor */}
              {!isAddTask ? 
                <TaskList isAddTask={isAddTask} setIsAddTask={setIsAddTask} isSideBar={isSideBar} setIsSiteBar={setIsSiteBar} tasks={tasks} setTasks={setTasks} fetchTasks={fetchTasks}/>
                :
                <TaskAddForm isAddTask={isAddTask} setIsAddTask={setIsAddTask} isSideBar={isSideBar} setIsSiteBar={setIsSiteBar} fetchTasks={fetchTasks}/>
              }
            </div>

          </div>
        </div>
    )
}

export default Tasks;
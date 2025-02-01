"use client";

import React,{createContext,useContext,useState} from "react";
import { getUserTasks } from "../api/taskService";

export interface Task {
    _id: string;
    title: string;
    description: string;
    importance_level: number;
    category: string;
    start_date: string;
    end_date: string;
    order: number;
    status: string;
}

interface TasksContextProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    taskFilter: string | undefined;
    setTaskFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
    isSideBar: boolean;
    setIsSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    isAddTask: boolean;
    setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    fetchTasks: ()=> Promise<void>;
}

const TasksContext=createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider: React.FC<{children: React.ReactNode}>=({children})=>{
    
    const [tasks, setTasks] = useState<Task[]>([]);
    // Burada sidebardaki seçeneklere göre sort yapan fieldı ayarlıyor
    const [taskFilter, setTaskFilter] = useState<string | undefined>(undefined);
    // Burada sidebar açık mı kapalı mı
    const [isSideBar,setIsSideBar]=useState<boolean>(false)
    // Burada task eklencek mi diye boolean kontrol
    const [isAddTask,setIsAddTask]=useState<boolean>(false);

    //Burada sidebardaki ayarlara göre filtreleme yapıyor prioritysine göre değişiyor
    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
    
        try {
          const data = await getUserTasks(token, taskFilter);
          if (Array.isArray(data)) {
            setTasks(data);
          }
        } catch (error) {
          console.log(error);
        }
    };

    return(
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
                taskFilter,
                setTaskFilter,
                isSideBar,
                setIsSideBar,
                isAddTask,
                setIsAddTask,
                fetchTasks,
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export const useTasksContext = () => {
    const context = useContext(TasksContext);
    if (!context) {
      throw new Error("useTasksContext must be used within a TasksProvider");
    }
    return context;
};
"use client";

import React,{useState,useEffect} from "react";
import { getUserTasks } from "../api/taskService";
import TaskItem from "./taskItem";

const TaskList: React.FC=()=>{

    const [tasks,setTasks]=useState([]);

    const fetchTasks=async()=>{
        const token=localStorage.getItem("token");
        if(!token) return;

        try {
            const data=await getUserTasks(token);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchTasks();
    },[]);

    return (
        <div>
            <div className="grid grid-cols-3 w-[80vw] mx-auto gap-6">
                {tasks && tasks.map((task: any)=>(
                    <TaskItem key={task._id} task={task} refreshTasks={fetchTasks}/>
                ))}
            </div>
        </div>
    )
}

export default TaskList;
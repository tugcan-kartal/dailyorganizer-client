"use client"

import { getTaskDetail } from "@/app/api/taskService";
import TaskItem from "@/app/components/taskItem";
import { Task } from "@/app/tasks/page";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TaskDetails=()=>{

    const [taskDetail,setTaskDetail]=useState<Task>();
    
    const params=useParams();
    const taskId=params.slug;

    const fetchTaskDetail=async()=>{
        const token=localStorage.getItem("token");
        if (!token || typeof taskId !== "string") return;

        try {
            const data=await getTaskDetail(token,taskId);
            setTaskDetail(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchTaskDetail();
    },[])

    return(
        <div>
            <div></div>

            <div>
                {taskDetail 
                ? 
                    <TaskItem task={taskDetail} fetchTasks={fetchTaskDetail}/>
                :
                    <p>Loading task details...</p>
                }
                
            </div>
        </div>
    )
}

export default TaskDetails;
"use client"

import { getTaskDetail } from "@/app/api/taskService";
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
            {taskDetail && 
                <div>
                    <div>
                        <h1>{taskDetail.title}</h1>
                        <p>{taskDetail.description}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default TaskDetails;
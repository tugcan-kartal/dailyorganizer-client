"use client";

import React,{useState,useEffect} from "react";
import { rectSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getUserTasks } from "../api/taskService";
import TaskItem from "./taskItem";
import { closestCorners, DndContext } from "@dnd-kit/core";

interface Task {
    _id: string;
    title: string;
    description: string;
    author: string;
    importance_level: number;
    category: string;
    start_date: string;
    end_date: string;
  }
  

const TaskList: React.FC=()=>{

    const [tasks,setTasks]=useState<Task[]>([]);

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


    //sürüklemek için gereken fonksiyon
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
      
        if (active.id !== over?.id) {
          setTasks((prevTasks) => {
            const oldIndex = prevTasks.findIndex((task) => task._id === active.id);
            const newIndex = prevTasks.findIndex((task) => task._id === over.id);
      
            const updatedTasks = [...prevTasks];
            const [movedTask] = updatedTasks.splice(oldIndex, 1);
            updatedTasks.splice(newIndex, 0, movedTask);
      
            return updatedTasks;
          });
        }
    };
    //sürüklemek için gereken fonksiyon bitişi

    return (
        <div>
            <div className="grid grid-cols-3 w-[80vw] mx-auto gap-6">
                <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                    <SortableContext items={tasks && tasks.map(task => ({ id: task._id }))} strategy={rectSortingStrategy}>
                        {tasks && tasks.map((task: any)=>(
                            <TaskItem key={task._id} task={task} refreshTasks={fetchTasks}/>
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
}

export default TaskList;
"use client";
import React,{ChangeEvent, useState} from "react";
import { addTask } from "../api/taskService";

const TaskAddForm: React.FC=()=>{

    const [taskToAdd,setTaskToAdd]=useState({
        title: "",
        description: "",
        author: "",
        importance_level: "",
        category: "",
        start_date: "",
        end_date: "",
    });

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setTaskToAdd({
            ...taskToAdd,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault();

        const token=localStorage.getItem("token");
        if(!token) return;

        await addTask(taskToAdd,token);
        
        setTaskToAdd({
            title: "",
            description: "",
            author: "",
            importance_level: "",
            category: "",
            start_date: "",
            end_date: "",
        });
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name="title" placeholder="title"/>
                <input onChange={handleChange} name="description" placeholder="description"/>
                <input onChange={handleChange} name="author" placeholder="author"/>
                <input onChange={handleChange} name="importance_level" placeholder="importance_level"/>
                <input onChange={handleChange} name="category" placeholder="category"/>
                <input onChange={handleChange} type="date" name="start_date" placeholder="start_date"/>
                <input onChange={handleChange} type="date" name="end_date" placeholder="end_date"/>

                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default TaskAddForm;
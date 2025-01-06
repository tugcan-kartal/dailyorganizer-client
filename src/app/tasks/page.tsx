"use client"
import React from "react";
import TaskList from "../components/taskList";
import TaskAddForm from "../components/taskAddForm";

const Tasks: React.FC=()=>{
    return(
        <div className="bg-gray-500 h-screen py-10">
            <TaskList />
            {/* <TaskAddForm /> */}
        </div>
    )
}

export default Tasks;
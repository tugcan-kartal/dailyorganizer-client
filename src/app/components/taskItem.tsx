import React,{ChangeEvent, useState} from "react";
import { deleteTask,updateTask } from "../api/taskService";

const TaskItem: React.FC<{task: any; refreshTasks: ()=>void}>=({
    task,
    refreshTasks,
})=>{

    const [newUpdatedTask,setNewUpdatedTask]=useState({
        title: task.title,
        description: task.description,
        author: task.author,
        importance_level: task.importance_level,
        category: task.category,
        start_date: task.start_date,
        end_date: task.end_date,
    })

    const [isEditing,setIsEditing]=useState(false);

    const handleDelete=async()=>{
        await deleteTask(task._id);
        refreshTasks();
    }

    const handleUpdate=async()=>{
        await updateTask(task._id, newUpdatedTask);
        setIsEditing(false);
        refreshTasks();
    }

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setNewUpdatedTask({
            ...newUpdatedTask,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <div>{task.title}</div>
            {isEditing && 
                <input name="title" onChange={handleChange} placeholder="Update task title"/>
            }
            
            <div>{task.description}</div>
            {isEditing && 
                <input name="description" onChange={handleChange} placeholder="Update task description"/>
            }

            <div>{task.author}</div>
            {isEditing && 
                <input name="author" onChange={handleChange} placeholder="Update task author"/>
            }

            <div>{task.importance_level}</div>
            {isEditing && 
                <input name="importance_level" onChange={handleChange} placeholder="Update task importance_level"/>
            }

            <div>{task.category}</div>
            {isEditing && 
                <input name="category" onChange={handleChange} placeholder="Update task category"/>
            }

            <div>{task.start_date}</div>
            {isEditing && 
                <input type="date" name="start_date" onChange={handleChange} placeholder="Update task start_date"/>
            }

            <div>{task.end_date}</div>
            {isEditing && 
                <input type="date" name="end_date" onChange={handleChange} placeholder="Update task end_date"/>
            }

            <button onClick={handleDelete}>Delete</button>

            <button onClick={()=>setIsEditing(!isEditing)}>Edit Task</button>
            <button onClick={handleUpdate}>Update Task</button>

        </div>
    )


}

export default TaskItem;
"use client"

import React, { ChangeEvent, FormEvent, useState } from "react";

const Task: React.FC =() => {

    const [taskBody, setTaskBody]=useState({
        title: "",
        description: "",
        author: "",
        importance_level: "",
        category: "",
        start_date: "",
        end_date: "",
    });

    const [addedTasks,setAddedTasks]=useState();

    const [errors, setErrors]=useState<string[]>([]);
    const [success, setSuccess] = useState<string>("");

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setTaskBody({
            ...taskBody,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit=async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setErrors([]);
        setSuccess("");

        const token=localStorage.getItem("token");
        if(!token){
            throw new Error("Token not found");
        }

        try {
            const response=await fetch("http://localhost:3000/task",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskBody),
            });

            if(!response.ok){
                const data=await response.json();
                const errorMessages = Array.isArray(data.message)
                ? data.message
                : [data.message];
                setErrors(errorMessages);
            }else{
                const data=await response.json();
                setAddedTasks(data);
                setSuccess("Task Added")
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    return(
        <div>
            <div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <input placeholder="title" onChange={handleChange} name="title"/>
                    <input placeholder="description" onChange={handleChange} name="description"/>
                    <input placeholder="author" onChange={handleChange} name="author"/>
                    <input placeholder="importance_level" onChange={handleChange} name="importance_level"/>
                    <input placeholder="category" onChange={handleChange} name="category"/>
                    <input placeholder="start_date" onChange={handleChange} name="start_date"/>
                    <input placeholder="end_date" onChange={handleChange} name="end_date"/>

                    <button type="submit">Send</button>
                </form>

                <div>
                    {success && success}
                    {errors && errors}
                </div>
            </div>
        </div>
    )

}

export default Task;
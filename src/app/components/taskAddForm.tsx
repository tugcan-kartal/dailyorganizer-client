"use client";
import React,{ChangeEvent, useState} from "react";
import { addTask } from "../api/taskService";
import RoboticHand from "@/../public/assets/robotic-hand.png";
import Image from "next/image";

const TaskAddForm: React.FC=()=>{

    const [taskToAdd,setTaskToAdd]=useState({
        title: "",
        description: "",
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
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white border-t-8 border-blue-500 shadow-lg rounded-2xl w-[20vw] py-[4vh] relative">
            <form className="mx-5 relative flex flex-col gap-y-4" onSubmit={handleSubmit}>
              {/* Başlık */}
              <input
                className="text-2xl text-gray-800 font-semibold border-b"
                name="title"
                placeholder="Task Title"
                onChange={handleChange}
              />
    
              {/* Açıklama */}
              <input
                className="text-gray-400 border-b"
                name="description"
                placeholder="Task Description"
                onChange={handleChange}
              />
    
              {/* Kategori */}
              <input
                className="text-gray-400 border-b"
                name="category"
                placeholder="Category"
                onChange={handleChange}
              />

              {/* Önemlilik Derecesi */}
              <input
                className="text-gray-400 border-b"
                name="importance_level"
                placeholder="Importance Level"
                onChange={handleChange}
              />
    
              {/* Tarihler */}
              <div className="flex justify-between">
                <input
                  className="text-xs text-gray-600 border-b"
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                />
                <input
                  className="text-xs text-gray-600 border-b"
                  type="date"
                  name="end_date"
                  onChange={handleChange}
                />
              </div>
    
              {/* Görsel */}
              <div className="flex justify-center mt-4">
                <Image className="w-20" src={RoboticHand} alt="not found" />
              </div>
    
              {/* Submit Butonu */}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      );
}

export default TaskAddForm;
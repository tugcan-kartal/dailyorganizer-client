"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { addTask } from "../api/taskService";
import RoboticHand from "@/../public/assets/robotic-hand.png";
import Image from "next/image";

const TaskAddForm: React.FC = () => {
  const [taskToAdd, setTaskToAdd] = useState({
    title: "",
    description: "",
    importance_level: "3",
    category: "",
    start_date: "",
    end_date: "",
    files: [] as File[],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name==="files"){
      console.log(e.target.files)
      setTaskToAdd({
        ...taskToAdd,
        [e.target.name]: Array.from(e.target.files || [])
      })
    }else{
      setTaskToAdd({
        ...taskToAdd,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return;

    await addTask(taskToAdd, token);
  };


  //kartın arkasındaki renk için zorluk belirten
  const borderPicker=()=>{
    if(taskToAdd.importance_level==="1"){
      return "border-green-500"
    }else if(taskToAdd.importance_level==="2"){
      return "border-yellow-500"
    }else if(taskToAdd.importance_level==="3"){
      return "border-blue-500"
    }else if(taskToAdd.importance_level==="4"){
      return "border-red-500"
    }
  }

  useEffect(()=>{
    borderPicker();
  },[taskToAdd])
  //kartın arkasındaki renk için zorluk belirten bitiş

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className={`bg-white border-t-8 ${borderPicker()} shadow-lg rounded-2xl w-[20vw] py-[4vh] relative`}>
        <form
          className="mx-5 relative flex flex-col gap-y-4"
          onSubmit={handleSubmit}
        >
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
          <div className="mt-4">
            <label className="text-gray-800 font-semibold">
              Importance Level
            </label>
            <div className="relative w-full mt-2">
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                name="importance_level"
                onChange={(e) => {
                  handleChange(e);
                }}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer bg-gray-300"
              />
              <div className="flex justify-between text-xs font-semibold mt-1">
                <span className="text-green-500">Low</span>
                <span className="text-yellow-500">Medium</span>
                <span className="text-blue-500">High</span>
                <span className="text-red-500">Extreme</span>
              </div>
            </div>
          </div>

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

          <div>
            <input type="file" name="files" multiple onChange={handleChange} />
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
};

export default TaskAddForm;

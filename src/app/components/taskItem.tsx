"use client";
import React, { ChangeEvent, useState } from "react";
import { deleteTask, updateTask } from "../api/taskService";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import OtherCat from "@/../public/assets/category-images/other.png";
import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { borderPicker } from "./borderPicker";


const TaskItem: React.FC<{ task: any; refreshTasks: () => void }> = ({
  task,
  refreshTasks,
}) => {
  const [newUpdatedTask, setNewUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    importance_level: task.importance_level,
    category: task.category,
    start_date: task.start_date,
    end_date: task.end_date,
  });

  const [isMenu, setIsMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await deleteTask(task._id);
    refreshTasks();
  };

  const handleUpdate = async () => {
    await updateTask(task._id, newUpdatedTask);
    setIsEditing(false);
    refreshTasks();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUpdatedTask({
      ...newUpdatedTask,
      [e.target.name]: e.target.value,
    });
  };

  // Yüzde tamamlanma ibresi burası--------
  const calculateProgress = () => {
    const startDate = new Date(task.start_date).getTime();
    const endDate = new Date(task.end_date).getTime();
    const today = Date.now();

    if (today < startDate) return 0; // Before start
    if (today > endDate) return 100; // After end

    return Math.round(((today - startDate) / (endDate - startDate)) * 100);
  };

  const progress = calculateProgress();
  //Yüzde tamamlanma ibresi bitişi----------


  //Sürüklemek için elementleri------------
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  //Sürüklemek için elementleri  bitiş-----

  return (
    <div>
      <div className={`bg-white border-t-8 ${borderPicker(task)} shadow-lg rounded-2xl w-[20vw] py-[4vh] relative`}>
          {/* <div className="absolute top-0 left-0 h-full bg-yellow-500 text-white flex items-center justify-center w-[50px] rounded-l-2xl">
            <div className="rotate-90 whitespace-nowrap">{task.category}</div>
            {isEditing && (
              <input
                name="category"
                onChange={handleChange}
                placeholder="Update task category"
              />
            )}
          </div> */}
        <div className="ml-[2vw] relative">
          
          <div>

            {/* title kısmı */}
            <div>
              <div className="text-2xl text-gray-800 font-semibold">{task.title}</div>
              {isEditing && (
                <input
                  name="title"
                  onChange={handleChange}
                  placeholder="Update task title"
                />
              )}
            </div>

            {/* description kısmı */}
            <div className="text-gray-400 my-[2vh]">
              <div>{task.description}</div>
              {isEditing && (
                <input
                  name="description"
                  onChange={handleChange}
                  placeholder="Update task description"
                />
              )}
            </div>
            
            {/* date ve yüzde barı kısmı */}
            <div className="flex justify-between mr-4 mt-[5vh]">

                <div>
                  <div className="text-xs">{new Date(task.start_date).toLocaleDateString("en-GB")}</div>
                  {isEditing && (
                    <input
                      type="date"
                      name="start_date"
                      onChange={handleChange}
                      placeholder="Update task start_date"
                    />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 w-full">
                  <div className="relative w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 text-center mt-2">
                    {progress}% time passed
                  </div>
                </div>

                <div>
                  <div className="text-xs">{new Date(task.end_date).toLocaleDateString("en-GB")}</div>
                  {isEditing && (
                    <input
                      type="date"
                      name="end_date"
                      onChange={handleChange}
                      placeholder="Update task end_date"
                    />
                  )}
                </div>

            </div>
            
            {/* resim kısmı */}
            <div className="flex justify-center">
              <Image className="mt-[5vh]" width="100" height={100} src={task.images[0]?.Location || OtherCat} alt="not found"/>
            </div>

            {/* Sürüklenebilme özelliği olan button kısmı */}
            <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="absolute top-[-3vh] left-[-2vw] text-3xl font-semibold cursor-pointer">
              <MdDragIndicator />
            </div>
            
            {/* Butonlar */}
            <div onClick={()=>setIsMenu(!isMenu)} className="absolute top-[-3vh] right-[0vw] text-4xl cursor-pointer">
              <IoIosMenu />
            </div>
            {isMenu && 
              <div className="flex flex-col gap-y-[4vh] absolute top-[2vh] right-[-6.7vw] justify-evenly">
                <button
                  className="bg-red-500 rounded-2xl px-[2vw] py-1"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 rounded-2xl px-[2vw] py-1"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>

                {isEditing ? (
                  <button
                    className="bg-green-500 rounded-2xl px-[2vw] py-1"
                    onClick={handleUpdate}
                  >
                    {isEditing ? "Update" : ""}
                  </button>
                ) : (
                  ""
                )}
              </div>
            }
          </div>
          
          
          
        </div>
        
        

      </div>
    </div>
  );
};

export default TaskItem;

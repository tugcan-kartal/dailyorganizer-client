"use client";
import React, { ChangeEvent, useState } from "react";
import { deleteTask, updateTask } from "../api/taskService";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import OtherCat from "@/../public/assets/category-images/other.png";
import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { borderPicker } from "./borderPicker";
import toast from "react-hot-toast";
import { MdChatBubbleOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

const TaskItem: React.FC<{ task: any; fetchTasks: () => Promise<void> }> = ({
  task,
  fetchTasks: refreshTasks,
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

  const router=useRouter();

  const navigateToTaskDetails=(id: string)=>{
    router.push(`task/${id}`);
  }

  const handleDelete = async () => {
    await deleteTask(task._id);
    refreshTasks();
    toast.success("Successfully deleted");
  };

  const handleUpdate = async () => {
    await updateTask(task._id, newUpdatedTask);
    setIsEditing(false);
    refreshTasks();
    toast.success("Successfully updated");
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
      <div
        className={`bg-white border-t-8 ${borderPicker(
          task
        )} shadow-lg rounded-2xl w-[20vw] py-4 relative`}
      >
        <div className="relative w-[90%] mx-auto py-2">
          <div>
            {/* Sürükle ve Menü butonu  */}
            <div className="w-[100%]">
              {/* Çarpı ve sürükleme butonu */}
              <div className="flex justify-between pb-2">

                {/* Sürüklenebilme özelliği olan button kısmı */}
                <div
                  ref={setNodeRef}
                  {...attributes}
                  {...listeners}
                  style={style}
                  className="text-3xl font-semibold cursor-pointer"
                >
                  <MdDragIndicator />
                </div>

                {/* Kapama butonu */}
                <div
                  onClick={() => setIsMenu(!isMenu)}
                  className="text-4xl cursor-pointer"
                >
                  {isMenu ? <IoMdClose /> : <IoIosMenu />}
                </div>
              </div>

              {/* Delete cancel update butonları */}
              <div>
                {isMenu && (
                  <div className="flex justify-center gap-x-[1.5vw] mb-5">
                    <button
                      className="bg-red-500 rounded-2xl px-[1.5vw] py-1 text-white shadow-lg"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    
                    <button
                      className="bg-yellow-500 rounded-2xl px-[1.5vw] py-1 text-white shadow-lg"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </button>

                    {isEditing ? (
                      <button
                        className="bg-green-500 rounded-2xl px-[1.5vw] py-1 text-white shadow-lg"
                        onClick={handleUpdate}
                      >
                        {isEditing ? "Update" : ""}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Kart içeriği */}
            <div className="w-[80%] mx-auto">
              {/* title kısmı */}
              <div>
                <div className="text-2xl text-gray-800 font-semibold">
                  {task.title}
                </div>
                {isEditing && (
                  <input
                    name="title"
                    onChange={handleChange}
                    placeholder="Update task title"
                    className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-2 py-2 mt-2 w-[90%] transition-all duration-300 ease-in-out shadow-sm focus:ring-2 focus:ring-blue-500"
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
                    className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-2 py-4 mt-2 w-[90%] transition-all duration-300 ease-in-out shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* date ve yüzde barı kısmı */}
              <div className="flex justify-between mt-[5vh] mx-3 gap-x-[1.5vw]">
                {/* Start Date Section */}
                <div className="flex flex-col items-center w-[20%]">
                  <div className="text-sm text-gray-700 font-medium">
                    {new Date(task.start_date).toLocaleDateString("en-GB")}
                  </div>
                  {isEditing && (
                    <input
                      type="date"
                      name="start_date"
                      onChange={handleChange}
                      placeholder="Update task start_date"
                      className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-[0.7vw] py-2 mt-2 w-full transition-all duration-300 ease-in-out shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>

                {/* Progress Bar Section */}
                <div className="flex flex-col items-center w-[60%]">
                  <div className="relative w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 text-center mt-2">
                    {progress}% time passed
                  </div>
                </div>

                {/* End Date Section */}
                <div className="flex flex-col items-center w-[20%]">
                  <div className="text-sm text-gray-700 font-medium">
                    {new Date(task.end_date).toLocaleDateString("en-GB")}
                  </div>
                  {isEditing && (
                    <input
                      type="date"
                      name="end_date"
                      onChange={handleChange}
                      placeholder="Update task end_date"
                      className="border-2 border-gray-300 focus:border-blue-500 rounded-lg px-[0.7vw] py-2 mt-2 w-full transition-all duration-300 ease-in-out shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              </div>

              {/* resim kısmı */}
              <div className="flex justify-center">
                <Image
                  className="mt-[5vh]"
                  width="100"
                  height={100}
                  src={task.images[0]?.Location || OtherCat}
                  alt="not found"
                />
              </div>
            </div>
            
            {/* Yapay zeka butonu */}
            <div onClick={()=>navigateToTaskDetails(task._id)} className="text-3xl flex justify-end cursor-pointer">
              <MdChatBubbleOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

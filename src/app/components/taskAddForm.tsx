"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { addTask } from "../api/taskService";
import Image from "next/image";

import TechnologyCat from "@/../public/assets/category-images/technology.png";
import ScienceCat from "@/../public/assets/category-images/science.png";
import ArtCat from "@/../public/assets/category-images/art.png";
import SportsCat from "@/../public/assets/category-images/sports.png";
import EducationCat from "@/../public/assets/category-images/education.png";
import HealthCat from "@/../public/assets/category-images/health.png";
import FinanceCat from "@/../public/assets/category-images/finance.png";
import EntertaintmentCat from "@/../public/assets/category-images/entertaintment.png";
import TravelCat from "@/../public/assets/category-images/travel.png";
import BusinessCat from "@/../public/assets/category-images/business.png";
import LifestyleCat from "@/../public/assets/category-images/lifestyle.png";
import FoodCat from "@/../public/assets/category-images/food.png";
import EnvironmentCat from "@/../public/assets/category-images/environment.png";
import OtherCat from "@/../public/assets/category-images/other.png";
import { borderPicker } from "./borderPicker";
import HeaderActions from "./headerActions";
import toast from "react-hot-toast";
import { useTasksContext } from "../context/TasksContext";

const categoryImages: { [key: string]: string } = {
  technology: TechnologyCat.src,
  science: ScienceCat.src,
  art: ArtCat.src,
  sports: SportsCat.src,
  education: EducationCat.src,
  health: HealthCat.src,
  finance: FinanceCat.src,
  entertainment: EntertaintmentCat.src,
  travel: TravelCat.src,
  business: BusinessCat.src,
  lifestyle: LifestyleCat.src,
  food: FoodCat.src,
  environment: EnvironmentCat.src,
  other: OtherCat.src,
};



const TaskAddForm: React.FC = () => {

  const {
      isSideBar,
      setIsSideBar,
      isAddTask,
      setIsAddTask,
      fetchTasks
    } = useTasksContext();

  // Kullanıcı start date girmeden de veri göndermek için zorunlu istiyor yani server bugünün tarihi
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Kullanıcı end date girmeden de veri göndermek için zorunlu istiyor yani server yarının tarihi
  const getNextDayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Move to the next day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [taskToAdd, setTaskToAdd] = useState({
    title: "",
    description: " ",
    importance_level: "3",
    category: "other",
    start_date: getTodayDate(),
    end_date: getNextDayDate(),
    files: [] as File[],
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("other");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "category") {
      setSelectedCategory(e.target.value);
    }
    if (e.target.name === "files" && e.target instanceof HTMLInputElement) {
      setTaskToAdd({
        ...taskToAdd,
        [e.target.name]: Array.from(e.target.files || []),
      });
    } else {
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
    fetchTasks()

    toast.success("Successfully added")
  };

  // Burada seçtiğimiz kategori resmini mevcut urlsini localde olsa çıkarıyor ve onu normal url haline getiriyor yüklencek sonra files adı altında taskToAdde ekliyor files'ı
  useEffect(() => {
    const fetchCategoryImage = async () => {
      if (selectedCategory && categoryImages[selectedCategory]) {
        const response = await fetch(categoryImages[selectedCategory]);
        const blob = await response.blob();
        const imageFile = new File([blob], `${selectedCategory}.png`, {
          type: "image/png",
        });
        setTaskToAdd((prev) => ({ ...prev, files: [imageFile] }));
      }
    };

    fetchCategoryImage();
  }, [selectedCategory]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200 h-full">
      {/* Sidebar kapalıyken çıkan sol üstteki butonlar slide aç ve yeni task oluştur butonları */}
      <div>
        <HeaderActions />
      </div>
      
      {/* Task ekleme kartının olduğu kısım */}
      <div className="md:flex justify-center items-center md:pt-[3%] pt-[15%] md:px-[0%] px-[5%]">
        <div
          className={`bg-white border-t-8 ${borderPicker(
            taskToAdd
          )} shadow-lg rounded-2xl md:w-[30%] py-[4vh] relative`}
        >
          <form
            className="mx-5 relative flex flex-col gap-y-4"
            onSubmit={handleSubmit}
          >
            <input
              className="text-2xl text-gray-800 font-semibold border-b"
              name="title"
              placeholder="Task Title"
              onChange={handleChange}
            />

            <input
              className="text-gray-400 border-b"
              name="description"
              placeholder="Task Description"
              onChange={handleChange}
            />

            {/* Kategori seçme kısmı */}
            <select
              className="text-gray-400 border-b"
              name="category"
              onChange={handleChange}
            >
              <option value="other" >
                Select a category
              </option>
              {Object.keys(categoryImages).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
            
            {/* importance level ekleme kısmı */}
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
                  onChange={handleChange}
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
            
            {/* Tarih ekleme kısmı */}
            <div className="flex justify-between items-center space-x-6">
              <div className="flex flex-col gap-y-1 w-1/2">
                <label className="text-sm text-gray-700 font-medium">
                  Starting Date
                </label>
                <input
                  className="text-xs text-gray-600 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-y-1 w-1/2">
                <label className="text-sm text-gray-700 font-medium">
                  Ending Date
                </label>
                <input
                  className="text-xs text-gray-600 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                  type="date"
                  name="end_date"
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {/* <div>
              <input type="file" name="files" multiple onChange={handleChange} />
            </div> */}

            {/* Seçtiğin kategoriye göre resim gelme kısmı */}
            <div className="flex justify-center mt-4">
              {selectedCategory ? (
                <Image
                  width={500}
                  height={500}
                  className="w-20"
                  src={categoryImages[selectedCategory]}
                  alt={selectedCategory}
                />
              ) : (
                <p className="text-gray-500">
                  Select a category to see the image
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskAddForm;

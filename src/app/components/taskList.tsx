import React, { useEffect, useState } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { saveTaskOrder } from "../api/taskService";
import TaskItem from "./taskItem";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Task, useTasksContext } from "../context/TasksContext";
import HeaderActions from "./headerActions";
import { getDetailUser } from "../api/userService";
import { IoCreateOutline } from "react-icons/io5";

const TaskList: React.FC = () => {
  const {
    tasks,
    setTasks,
    isSideBar,
    setIsSideBar,
    isAddTask,
    setIsAddTask,
    fetchTasks,
  } = useTasksContext();

  // Kullanıcıya ait  bilgiyi çekmek için
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const getInfoUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userData = await getDetailUser(token);
      setUserInfo(userData);
      console.log("User data fetched:", userData); // Bu doğru sonucu gösterir
    };

    getInfoUser();
  }, []);
  // Kullanıcıya ait  bilgiyi çekmek için bitiş


  // Sürüklenen görev için olan state
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Dokunmatik desteği ekler sürükleme için
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // Sürüklenen görev için olan fonksiyonlar
  const handleDragStart = (event: any) => {
    const task = tasks.find((t) => t._id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex((task) => task._id === active.id);
        const newIndex = prevTasks.findIndex((task) => task._id === over.id);

        const updatedTasks = [...prevTasks];
        const [movedTask] = updatedTasks.splice(oldIndex, 1);
        updatedTasks.splice(newIndex, 0, movedTask);

        // Update the order property based on the new array index
        updatedTasks.forEach((task, index) => {
          task.order = index;
        });

        // Save the updated order to the server
        saveTaskOrder(updatedTasks);

        return updatedTasks;
      });
    }
    setActiveTask(null);
  };
  // Sürüklenen görev için olan fonksiyonlar bitiş

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-200 to-blue-200 h-full">
      {/* Sidebar kapalıyken çıkan sol üstteki butonlar slide aç ve yeni task oluştur butonları */}
      <div>
        <HeaderActions />
      </div>

      {/* Eğer task varsa ilk yer yoksa diğer yer çalışıyor bu dndContextler fln sürüklemek için gereken paketin şeyleri */}
      {tasks.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-[4vh] md:ml-[10%] mx-[10%] md:mx-0">
          <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={tasks?.map((task) => task._id)}
              strategy={rectSortingStrategy}
            >
              {tasks.map((task) => (
                <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
              ))}
            </SortableContext>

            {/* Drag yapılırken gösterilen kısım */}
            <DragOverlay>
              {activeTask ? (
                <div className="bg-white shadow-lg rounded-2xl md:w-[20vw] w-[40vw] md:h-[10vh] h-[10vh] text-center py-7">
                  <div>{activeTask.title}</div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen p-6">
          <div className="text-3xl font-semibold text-gray-800 mb-4">
            Hello, {userInfo?.name}
          </div>

          <div className="flex items-center gap-x-2 text-gray-600">
            <div className="text-lg">You have no tasks yet.</div>
            <div
              onClick={() => setIsAddTask(!isAddTask)}
              className="text-3xl text-blue-500 hover:text-blue-700 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
            >
              <IoCreateOutline />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

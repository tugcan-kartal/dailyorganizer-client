import React, { useState } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { saveTaskOrder } from "../api/taskService";
import TaskItem from "./taskItem";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { Task, useTasksContext } from "../context/TasksContext";
import HeaderActions from "./headerActions";


const TaskList: React.FC = () => {

  const {
    tasks,
    setTasks,
    isSideBar,
    setIsSideBar,
    isAddTask,
    setIsAddTask,
    fetchTasks
  } =useTasksContext();

  const [activeTask, setActiveTask] = useState<Task | null>(null); // Sürüklenen görev için olan state

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
    <div className="bg-blue-100 min-h-screen">

      {/* Sidebar kapalıyken çıkan sol üstteki butonlar slide aç ve yeni task oluştur butonları */}
      <div>
        <HeaderActions />
      </div>
      
      {/* Task Listin kendisi var tüm tasklar */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 py-[4vh] px-[5vw]">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
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
              <div className="bg-white shadow-lg rounded-2xl w-[20vw] h-[10vh] text-center pt-7">
                <div>{activeTask.title}</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

    </div>
  );
};

export default TaskList;

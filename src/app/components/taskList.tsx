import React, { useState, useEffect } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { getUserTasks, saveTaskOrder } from "../api/taskService";
import TaskItem from "./taskItem";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";

export interface Task {
  _id: string;
  title: string;
  description: string;
  importance_level: number;
  category: string;
  start_date: string;
  end_date: string;
  order: number;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeTask, setActiveTask] = useState<Task | null>(null); // Sürüklenen görev için olan state

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const data = await getUserTasks(token);
      if(Array.isArray(data)){
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
    <div>
      <div className="grid grid-cols-3 w-[80vw] mx-auto gap-6">
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
              <TaskItem key={task._id} task={task} refreshTasks={fetchTasks} />
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

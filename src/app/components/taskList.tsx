import React, { useState } from "react";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { saveTaskOrder } from "../api/taskService";
import TaskItem from "./taskItem";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { Task } from "../tasks/page";
import { GoSidebarCollapse } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import HeaderActions from "./headerActions";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchTasks: () => Promise<void>;
  isSideBar: boolean;
  setIsSiteBar: React.Dispatch<React.SetStateAction<boolean>>;
  isAddTask: boolean;
  setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskList: React.FC<TaskListProps> = ({tasks,setTasks,fetchTasks,isSideBar,setIsSiteBar,isAddTask,setIsAddTask}) => {

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
    <div>

      {/* Sidebar kapalıyken çıkan sol üstteki butonlar slide aç ve yeni task oluştur butonları */}
      <div>
        <HeaderActions
          isSideBar={isSideBar}
          setIsSiteBar={setIsSiteBar}
          isAddTask={isAddTask}
          setIsAddTask={setIsAddTask}
        />
      </div>
      
      {/* Task Listin kendisi var tüm tasklar */}
      <div className="grid grid-cols-3 gap-6 py-[4vh] ml-[5vw]">
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

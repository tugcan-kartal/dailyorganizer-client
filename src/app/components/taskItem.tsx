import React, { ChangeEvent, useState } from "react";
import { deleteTask, updateTask } from "../api/taskService";

const TaskItem: React.FC<{ task: any; refreshTasks: () => void }> = ({
  task,
  refreshTasks,
}) => {
  const [newUpdatedTask, setNewUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    author: task.author,
    importance_level: task.importance_level,
    category: task.category,
    start_date: task.start_date,
    end_date: task.end_date,
  });

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

  // Progress calculation
  const calculateProgress = () => {
    const startDate = new Date(task.start_date).getTime();
    const endDate = new Date(task.end_date).getTime();
    const today = Date.now();

    if (today < startDate) return 0; // Before start
    if (today > endDate) return 100; // After end

    return Math.round(((today - startDate) / (endDate - startDate)) * 100);
  };

  const progress = calculateProgress();

  return (
    <div>
      <div className="bg-white shadow-lg rounded-2xl p-6 relative">

        <div className="absolute top-0 left-0 h-full bg-yellow-500 text-white flex items-center justify-center w-[50px] rounded-l-2xl">
          <div className="rotate-90 whitespace-nowrap">{task.category}</div>
          {isEditing && (
            <input
              name="category"
              onChange={handleChange}
              placeholder="Update task category"
            />
          )}
        </div>

        <div className="ml-[2vw] relative">

          <div>
            <div>{task.title}</div>
            {isEditing && (
              <input
                name="title"
                onChange={handleChange}
                placeholder="Update task title"
              />
            )}
          </div>

          <div>
            <div>{task.description}</div>
            {isEditing && (
              <input
                name="description"
                onChange={handleChange}
                placeholder="Update task description"
              />
            )}
          </div>

          <div className="absolute right-0 top-[-2vh] bg-red-500 p-2 rounded-full text-white">
            <div>{task.importance_level}</div>
            {isEditing && (
              <input
                name="importance_level"
                onChange={handleChange}
                placeholder="Update task importance_level"
              />
            )}
          </div>

          <div className="flex justify-between">
            <div>
              <div>{new Date(task.start_date).toLocaleDateString("en-GB")}</div>
              {isEditing && (
                <input
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                  placeholder="Update task start_date"
                />
              )}
            </div>

            <div>
              <div>{new Date(task.end_date).toLocaleDateString("en-GB")}</div>
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

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="relative w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 text-center mt-2">
              {progress}% time passed
            </div>
          </div>

          <div className="flex gap-x-[1vw] mt-4 justify-evenly">
            <button className="bg-red-500 rounded-2xl px-[2.5vw] py-1" onClick={handleDelete}>Delete</button>
            <button className="bg-yellow-500 rounded-2xl px-[2.5vw] py-1" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </button>

            {
                isEditing ? <button className="bg-green-500 rounded-2xl px-[2.5vw] py-1" onClick={handleUpdate}>{isEditing ? "Update" : ""}</button> : ""
            }
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TaskItem;

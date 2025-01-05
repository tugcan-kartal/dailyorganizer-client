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
        <div>
          <div>
            <div>{task.title}</div>
            {isEditing && (
              <input name="title" onChange={handleChange} placeholder="Update task title" />
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

          <div>
            <div>{task.category}</div>
            {isEditing && (
              <input
                name="category"
                onChange={handleChange}
                placeholder="Update task category"
              />
            )}
          </div>

          <div>
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
            <div className="text-sm text-gray-600 text-center mt-2">{progress}% completed</div>
          </div>

          <div className="flex gap-x-[1vw] mt-4">
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;

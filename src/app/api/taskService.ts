import { Task } from "../components/taskList";

const API_URL="http://localhost:3000/task";


export const getUserTasks=async(token: string)=>{
    const response=await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
}

export const addTask=async(taskData: any,token: string)=>{
    const response=await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
    });
    return response.json();
}

export const updateTask=async(taskId: string,taskData: any)=>{
    const response=await fetch(`${API_URL}/${taskId}`,{
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(taskData)
    });

    return response.json();
}

export const saveTaskOrder = async (updatedTasks: Task[]) => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const tasksToUpdate = updatedTasks.map(({ _id, order }) => ({ _id, order }));
      await fetch(`${API_URL}/update-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tasks: tasksToUpdate }),
      });
    } catch (error) {
      console.error("Failed to save task order:", error);
    }
  };
  

export const deleteTask=async(taskId: string) => {
    const response=await fetch(`${API_URL}/${taskId}`,{method: "DELETE"});
    return response.json;
}
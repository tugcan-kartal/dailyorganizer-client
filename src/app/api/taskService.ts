import { Task } from "../tasks/page";

const API_URL="http://localhost:3000/task";


export const getTaskDetail=async(token: string,id: string)=>{
  const response=await fetch(`${API_URL}/${id}`,{
    method: "GET",
    headers: {
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`,
    }
  })

  return await response.json();
}

//Kullanıcıya ait tüm taskları çekiyor
export const getUserTasks=async(token: string,taskFilter?: string)=>{
    const queryParams=taskFilter ? `?filter=${taskFilter}` : "";
    const response=await fetch(`${API_URL}${queryParams}`, {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
}

export const addTask = async (taskData: any, token: string) => {
    // FormData oluşturuyoruz
    const formData = new FormData();
  
    // Diğer alanları FormData'ya ekliyoruz
    formData.append("title", taskData.title);
    formData.append("description", taskData.description);
    formData.append("importance_level", taskData.importance_level);
    formData.append("category", taskData.category);
    formData.append("start_date", taskData.start_date);
    formData.append("end_date", taskData.end_date);
  
    // Dosyaları FormData'ya ekliyoruz
    if (taskData.files.length > 0) {
      taskData.files.forEach((file: File) => {
        formData.append("files", file);
      });
    }
  
    // API'ye veri gönderiyoruz
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Content-Type burada belirtilmez çünkü FormData otomatik olarak bunu yapar
      },
      body: formData, // FormData'yı gönderiyoruz
    });
  
    const data = await response.json();
    return data;
};
  
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

// Burası sürüklenen taskların orderını belirliyordu
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
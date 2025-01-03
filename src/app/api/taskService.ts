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

export const deleteTask=async(taskId: string) => {
    const response=await fetch(`${API_URL}/${taskId}`,{method: "DELETE"});
    return response.json;
}
const API_URL="http://13.51.47.163:3000/chat";

export const setTaskToGbt = async (token: string, id: string) => {
    try {
        const response = await fetch(`${API_URL}/set-task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ taskId: id }),
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
};

export const sendMessageToGbt  = async (token: string,message: string,taskId: string) => {
    try {
        const response=await fetch(`${API_URL}/send-message`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                message: message,
                taskId: taskId,
            })
        });

        const responseData=await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}

export const getHistoryGbt = async (token: string, taskId: string) => {
    try {
        const response = await fetch(`${API_URL}/history/${taskId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
};

const API_URL="http://localhost:3000/chat";

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

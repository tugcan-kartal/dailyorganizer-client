const API_URL="http://localhost:3000/auth";


export const getDetailUser=async(token: string)=>{
    try {
        const response=await fetch(`${API_URL}/user-details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const responseData=await response.json();
        return responseData;
    } catch (error) {
        console.log(error);
    }
}
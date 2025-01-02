import React, { useEffect, useState } from "react";

const GetTask: React.FC = () => {

    const [userTasks,setUserTasks]=useState<any>();

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string>("");

    const getUserTasks=async()=>{

        const token = localStorage.getItem("token");
        if(!token){
            throw new Error("Token not found please sign in");
        }

        try {
            const response=await fetch("http://localhost:3000/task",{
                method: "GET",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if(!response.ok){
                const data = await response.json();
                const errorMessages = Array.isArray(data.message)
                ? data.message
                : [data.message];
                setErrors(errorMessages);
            }else{
                const data=await response.json();
                setUserTasks(data);
                setSuccess("Task Added");
            }
        } catch (error) {
            console.log(error);
        }

    }
    
    useEffect(()=>{
        getUserTasks();
    },[])

    return(
        <div>
            {userTasks && userTasks.map((item:any,index:any)=>(
                <div key={index}>
                    {item.title}
                </div>
            ))}

            <div>
                {errors && errors}
                {success && success}
            </div>
        </div>
    )

}

export default GetTask;
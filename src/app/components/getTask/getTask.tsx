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

    const handleDelete=async(taskId: string)=>{

        try {
            const response=await fetch(`http://localhost:3000/task/${taskId}`,{
                method: "DELETE",
            })

            if(!response.ok){
                throw new Error("Not deleted")
            }else{
                setSuccess("Deleted successfully")
            }
        } catch (error) {
            
        }

    }

    return(
        <div>
            <div>
                {userTasks && userTasks.map((item:any,index:any)=>(
                    <div className="my-10 bg-gray-300" key={index}>
                        <div className="text-xl font-semibold">{item.title}</div>
                        <div className="text-lg">{item.description}</div>
                        <div className="text-gray-400">{item.author}</div>
                        <div className="bg-green-400 p-2 inline-block rounded-full">{item.importance_level}</div>
                        <div>{item.category}</div>
                        <div>{new Date(item.start_date).toLocaleDateString("en-GB")}</div>
                        <div>{new Date(item.end_date).toLocaleDateString("en-GB")}</div>

                        <div onClick={()=>handleDelete(item._id)} className="text-red-700 text-xl cursor-pointer">X</div>
                    </div>
                ))}
            </div>

            <div>
                {errors && errors}
                {success && success}
            </div>
        </div>
    )

}

export default GetTask;
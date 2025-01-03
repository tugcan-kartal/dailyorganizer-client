import React, { ChangeEvent, useEffect, useState } from "react";

const GetTask: React.FC = () => {

    const [userTasks,setUserTasks]=useState<any>();

    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string>("");

    const [updatedTask,setUpdatedTask]=useState({
        title: "",
        description: "",
        author: "",
        importance_level: "",
        category: "",
        start_date: "",
        end_date: "",
    })
    const [openUpdate,setOpenUpdate]=useState(false);

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

    const handleUpdate=async(taskId: string)=>{

        try {
            const response=await fetch(`http://localhost:3000/task/${taskId}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            })

            if(!response.ok){
                throw new Error("Couldnt send updated task");
            }else{
                const updatedSuccessfully=await response.json();
                console.log(updatedSuccessfully);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setUpdatedTask({
            ...updatedTask,
            [e.target.name]: e.target.value
        });
    };

    return(
        <div>
            <div>
                {userTasks && userTasks.map((item:any,index:any)=>(
                    <div className="my-10 bg-gray-300" key={index}>

                        <div className="text-xl font-semibold">{item.title}</div>
                        {
                            openUpdate &&
                            <input name="title" onChange={handleChange} placeholder="Edit Title"/>
                        }

                        <div className="text-lg">{item.description}</div>
                        {
                            openUpdate &&
                            <input name="description" onChange={handleChange} placeholder="Edit Title"/>
                        }

                        <div className="">{item.author}</div>
                        {
                            openUpdate &&
                            <input name="author" onChange={handleChange} placeholder="Edit Title"/>
                        }

                        <div className="">{item.importance_level}</div>
                        {
                            openUpdate &&
                            <input name="importance_level" onChange={handleChange} placeholder="Edit Title"/>
                        }

                        <div>{item.category}</div>
                        {
                            openUpdate &&
                            <input name="category" onChange={handleChange} placeholder="Edit Title"/>
                        }

                        <div>{new Date(item.start_date).toLocaleDateString("en-GB")}</div>
                        {
                            openUpdate &&
                            <input type="date" name="start_date" onChange={handleChange} placeholder="Edit Title"/>
                        }

                        <div>{new Date(item.end_date).toLocaleDateString("en-GB")}</div>
                        {
                            openUpdate &&
                            <input type="date" name="end_date" onChange={handleChange} placeholder="Edit Title"/>
                        }

                        <div onClick={()=>handleDelete(item._id)} className="text-red-700 text-xl cursor-pointer">X</div>
                        <div onClick={()=>setOpenUpdate(!openUpdate)}>Edit</div>

                        {
                            openUpdate &&
                            <div onClick={()=>handleUpdate(item._id)}>Update Task</div>
                        }
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
"use client"

import { getUserTasks } from "@/app/api/taskService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Middleware:React.FC=()=>{
    const router=useRouter();

    useEffect(()=>{
        const token=localStorage.getItem("token");

        if(token){
            try {
                const waitForAsync=async()=>{
                    const checking=await getUserTasks(token,"category:asc");
                    if(checking.statusCode===401){
                        localStorage.removeItem("token");
                        router.push("/user/signup");
                    }else{
                        router.push("/tasks");
                    }
                }

                waitForAsync();
            } catch (error) {
                console.log(error);
            }
        }else{
            router.push("/user/signup");
        }
    },[router]);


    return null;
}

export default Middleware;
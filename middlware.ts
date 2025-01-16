"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Middleware:React.FC=()=>{
    const router=useRouter();

    useEffect(()=>{
        const token=localStorage.getItem("token");

        if(token){
            router.push("/tasks");
        }else{
            router.push("/user/signup");
        }
    },[router]);


    return null;
}

export default Middleware;
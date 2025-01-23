"use client"

import { getUserTasks } from "@/app/api/taskService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//burası o kdr detaylı değil önce token var mı diye kontrol ediyor ve en basit servisle o tokenın geçerliliğine bakıyor getUserTasks ile
// eğer geçerli değilse  süresi geçmiştir ve signup a atıyor geri geçerliyse tasks pageine atıyor en başından token yoksa da signine atıyor geri

const Middleware:React.FC=()=>{
    const router=useRouter();

    useEffect(()=>{
        const token=localStorage.getItem("token");

        if(token){
            try {
                const waitForAsync=async()=>{
                    const checking=await getUserTasks(token,"category:asc");    //test için verilmiş servis kontrol ediyor aslında geçerliliğini tokenın çünkü bazen olsa da süresi geçiyor
                    if(checking.statusCode===401){
                        localStorage.removeItem("token");
                        router.push("/user/signin");
                    }else{
                        router.push("/tasks");
                    }
                }

                waitForAsync();
            } catch (error) {
                console.log(error);
            }
        }else{
            router.push("/user/signin");
        }
    },[router]);
    //router parametresi ile kullanıcı her rroute değiştiğinde clientda bu kontroller sağlancak tokenla alakalı

    return null;
}

export default Middleware;
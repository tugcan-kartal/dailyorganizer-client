import React, { useState } from "react";
import Image from "next/image";
import CategoryBar from "@/../public/assets/sidebar-images/category.png";
import ImportanceBar from "@/../public/assets/sidebar-images/importance.png";
import StartDateBar from "@/../public/assets/sidebar-images/start-date.png";
import EndDateBar from "@/../public/assets/sidebar-images/end-date.png";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { Task } from "../context/TasksContext";
import { useRouter } from "next/navigation";


interface SideBarProps {
    tasks: Task[] | undefined;
    isAddTask: boolean;
    setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    isSideBar: boolean;
    setIsSiteBar: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskFilter: (filter: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ tasks,isAddTask,setIsAddTask,isSideBar,setIsSiteBar,setTaskFilter }) => {

    const router=useRouter();

    const navigateToTaskDetails=(id: string)=>{
        router.push(`/task/${id}`)
    }

    return (
        <div>
            <div>

                {/* Sidebardaki sol üst köşedeki butonlar */}
                <div className="flex justify-between pt-4 px-3">
                    <div className="text-2xl cursor-pointer" onClick={()=>setIsSiteBar(!isSideBar)}>
                        {isSideBar ? <GoSidebarExpand /> : <GoSidebarCollapse />}
                    </div>

                    <div onClick={()=>setIsAddTask(!isAddTask)} className="text-2xl cursor-pointer">
                        {!isAddTask ? <IoCreateOutline /> : <GoChecklist />}
                    </div>
                </div>
                
                {/* Sidebardaki filtreleme tip buton fieldlarının bulunduğu yer */}
                <div className="flex flex-col justify-center gap-y-[2vh] pt-[5vh] pl-[1vw] border-b-2 border-gray-100 pb-10">

                    <div className="cursor-pointer flex gap-x-4 w-[85%] hover:shadow-lg transition-all duration-300 px-2 py-2 rounded-lg" onClick={()=>setTaskFilter("category:asc")}>
                        <div>
                            <Image src={CategoryBar} alt="Category Bar" width={20}/>
                        </div>
                        <div>Sort by category</div>
                    </div>

                    <div className="cursor-pointer flex gap-x-4 w-[85%] hover:shadow-lg transition-all duration-300 px-2 py-2 rounded-lg" onClick={()=>setTaskFilter("importance_level:asc")}>
                        <div>
                            <Image src={ImportanceBar} alt="Importance Bar" width={20}/>
                        </div>
                        <div>Sort by Priority</div>
                    </div>


                    <div className="cursor-pointer flex gap-x-4 w-[85%] hover:shadow-lg transition-all duration-300 px-2 py-2 rounded-lg" onClick={()=>setTaskFilter("start_date:asc")}>
                        <div>
                            <Image src={StartDateBar} alt="StartDate Bar" width={20}/>
                        </div>
                        <div>Sort by Start Date</div>
                    </div>

                    <div className="cursor-pointer flex gap-x-4 w-[85%] hover:shadow-lg transition-all duration-300 px-2 py-2 rounded-lg" onClick={()=>setTaskFilter("end_date:asc")}>
                        <div>
                            <Image src={EndDateBar} alt="EndDate Bar" width={20}/>
                        </div>
                        <div>Sort by End Date</div>
                    </div>

                </div>
                
                {/* Buraya da mevcut taskları tekli gösterimi yapcam */}
                <div className="flex flex-col justify-center items-start pl-[2vw] pt-[2vh] gap-y-4">
                    {tasks && tasks.map((task,index)=>(
                        <div key={index}>
                            <div onClick={()=>navigateToTaskDetails(task._id)} className="cursor-pointer hover:scale-110 p-2 rounded-full transition-all duration-200">
                                {task.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
import React from "react";
import Image from "next/image";
import CategoryBar from "@/../public/assets/sidebar-images/category.png";
import ImportanceBar from "@/../public/assets/sidebar-images/importance.png";
import StartDateBar from "@/../public/assets/sidebar-images/start-date.png";
import EndDateBar from "@/../public/assets/sidebar-images/end-date.png";
import StatusBar from "@/../public/assets/sidebar-images/status.png";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { useTasksContext } from "../context/TasksContext";
import { useRouter } from "next/navigation";

const SideBar: React.FC = () => {

    const {
        tasks,
        setTaskFilter,
        isSideBar,
        setIsSideBar,
        isAddTask,
        setIsAddTask,
      } = useTasksContext();

    const router=useRouter();

    const navigateToTaskDetails=(id: string)=>{
        router.push(`/task/${id}`)
    }

    const logoutAccount=()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div>
            <div className="overflow-hidden bg-white border-gray-50 border-r-2">

                {/* Sidebardaki sol üst köşedeki butonlar */}
                <div className="flex justify-between pt-4 px-3">
                    <div className="text-2xl cursor-pointer" onClick={()=>setIsSideBar(!isSideBar)}>
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

                    <div className="cursor-pointer flex gap-x-4 w-[85%] hover:shadow-lg transition-all duration-300 px-2 py-2 rounded-lg" onClick={()=>setTaskFilter("importance_level:desc")}>
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

                    <div className="cursor-pointer flex gap-x-4 w-[85%] hover:shadow-lg transition-all duration-300 px-2 py-2 rounded-lg" onClick={()=>setTaskFilter("status:process-first")}>
                        <div>
                            <Image src={StatusBar} alt="Status Bar" width={20}/>
                        </div>
                        <div>Sort by Status</div>
                    </div>

                </div>
                
                {/* Buraya da mevcut taskları tekli gösterimi yapcam ve signout butonu */}
                <div className="flex flex-col justify-center items-start pl-[2vw] pt-[2vh] gap-y-4">
                    <div onClick={logoutAccount} className="ml-[20%] bg-gray-200 text-black p-2 rounded-full cursor-pointer hover:opacity-90">Sign Out</div>
                    {tasks && tasks.map((task,index)=>(
                        <div key={index}>
                            <div onClick={()=>navigateToTaskDetails(task._id)} className="cursor-pointer hover:scale-90 p-2 rounded-full transition-all duration-200">
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
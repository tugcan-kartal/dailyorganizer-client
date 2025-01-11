import React, { useState } from "react";
import Image from "next/image";
import CategoryBar from "@/../public/assets/sidebar-images/category.png";
import ImportanceBar from "@/../public/assets/sidebar-images/importance.png";
import StartDateBar from "@/../public/assets/sidebar-images/start-date.png";
import EndDateBar from "@/../public/assets/sidebar-images/end-date.png";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";


interface SideBarProps {
    isAddTask: boolean;
    setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
    isSideBar: boolean;
    setIsSiteBar: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskFilter: (filter: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isAddTask,setIsAddTask,isSideBar,setIsSiteBar,setTaskFilter }) => {

    return (
        <div>
            <div>
                <div className="flex justify-between pt-4 px-3">
                    <div className="text-2xl cursor-pointer" onClick={()=>setIsSiteBar(!isSideBar)}>
                        {isSideBar ? <GoSidebarExpand /> : <GoSidebarCollapse />}
                    </div>

                    <div onClick={()=>setIsAddTask(!isAddTask)} className="text-2xl cursor-pointer">
                        <IoCreateOutline />
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-y-[2vh] mt-[5vh] ml-[1vw] border-b-2 border-gray-300 pb-10">

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

                <div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
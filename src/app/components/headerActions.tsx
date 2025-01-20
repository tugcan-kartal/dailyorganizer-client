import React from "react";
import { GoChecklist, GoSidebarCollapse } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { useTasksContext } from "../context/TasksContext";
import Image from "next/image";
import LogoTransparent from "@/../public/logo-transparent.png"
const HeaderActions: React.FC = () => {

  const {
      isSideBar,
      setIsSideBar,
      isAddTask,
      setIsAddTask,
    } = useTasksContext();

  return (
    <div className="pl-4">
      {!isSideBar && (
        <div className="flex items-center gap-x-4 pt-[2vh]">

          <div
            onClick={() => setIsSideBar(!isSideBar)}
            className="text-2xl cursor-pointer"
          >
            <GoSidebarCollapse />
          </div>

          <div
            onClick={() => setIsAddTask(!isAddTask)}
            className="text-2xl cursor-pointer"
          >
            {!isAddTask ? <IoCreateOutline /> : <GoChecklist />}
          </div>
          
          <div className="flex items-center">
            {/* İkon kısmı */}
            {/* <div className="w-[5%]">
              <Image src={LogoTransparent} alt="not found"/>
            </div> */}
            {/* Uygulama adı */}
            <div className="text-lg font-semibold">
              Taskly Adviser AI
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default HeaderActions;

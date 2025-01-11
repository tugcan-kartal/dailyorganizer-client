import React from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";

interface HeaderActionsProps {
  isSideBar: boolean;
  setIsSiteBar: React.Dispatch<React.SetStateAction<boolean>>;
  isAddTask: boolean;
  setIsAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  isSideBar,
  setIsSiteBar,
  isAddTask,
  setIsAddTask,
}) => {
  return (
    <div className="pl-4">
      {!isSideBar && (
        <div className="flex gap-x-4 pt-[2vh]">
          <div
            onClick={() => setIsSiteBar(!isSideBar)}
            className="text-2xl cursor-pointer"
          >
            <GoSidebarCollapse />
          </div>
          <div
            onClick={() => setIsAddTask(!isAddTask)}
            className="text-2xl cursor-pointer"
          >
            {!isAddTask ? <IoCreateOutline /> : <CiViewList />}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderActions;

import React from "react";

interface SideBarProps {
    setTaskFilter: (filter: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setTaskFilter }) => {
    return (
        <div>
            <div>
                <div className="flex flex-col justify-center items-center gap-y-2 mt-[5vh]">
                    <div className="cursor-pointer" onClick={()=>setTaskFilter("category:asc")}>List by category</div>
                    <div className="cursor-pointer" onClick={()=>setTaskFilter("importance_level:asc")}>List by importance level</div>
                    <div className="cursor-pointer" onClick={()=>setTaskFilter("start_date:asc")}>List by start date</div>
                    <div className="cursor-pointer" onClick={()=>setTaskFilter("end_date:asc")}>List by end date</div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default SideBar;
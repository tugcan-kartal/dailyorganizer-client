"use client"

import React from "react";
import AddTask from "../components/addTask/addTask";
import GetTask from "../components/getTask/getTask";

const Task: React.FC =() => {

    return(
        <div>
            <AddTask />
            <GetTask />
        </div>
    )

}

export default Task;
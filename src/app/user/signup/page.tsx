"use client"

import React, { ChangeEvent, FormEvent, useState } from "react";

const Signup:React.FC =()=>{

    const [userData,setUserData]=useState({
        name: "",
        email: "",
        password: ""
    });


    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
        console.log(userData)
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
          const response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData), // Kullanıcı verilerini gönder
          });
      
          if (!response.ok) {
            throw new Error("Signup failed. Please try again.");
          }
      
          const data = await response.json();
          console.log("Token:", data.token);
      
          // Gelen token'ı saklayabilirsiniz
          localStorage.setItem("token", data.token);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input className="w-[20vw]" placeholder="Whats your name" name="name" onChange={handleChange}/>
                <input className="w-[20vw]" placeholder="Whats your email" name="email" onChange={handleChange}/>
                <input className="w-[20vw]" placeholder="Whats your password" name="password" onChange={handleChange}/>

                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Signup;
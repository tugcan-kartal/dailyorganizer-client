"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import LogoTransparent from "@/../public/logo-transparent.png";
import Image from "next/image";
import { signInUser } from "@/app/api/userService";

const Signin: React.FC = () => {
  const API_URL="https://api.tasklyadviserai.com/auth";

  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await signInUser(userData,setErrors,setSuccess,router);
  };


  //Google giriş için başlangıç

  // useEffect içinde token'ı al ve localStorage'a kaydet
  useEffect(() => {
      // URL parametrelerinden token'ı al
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");
  
      if (token) {
        console.log("Token found:", token);
  
        // Token'ı localStorage'a kaydet
        localStorage.setItem("token", token);
        setSuccess("Login successfully");
        setTimeout(() => {
          router.push("/tasks");
        }, 2000);
  
        // Token kaydedildikten sonra yönlendir
      }else{
        console.log("Google token not found");
      }
    }, [router]);

  // Burada sunucudaki auth içindeki google a yönlendiriyoruz o da kullanıcıya giriş şansını veriyor sonra callbacke yönlendiriyor
  // callbacke yönlendirilen ise gerekli jwt token ve kullanıcı kaydedip token döndürüyor yukarıda useEffect yapıyor
  const handleGoogle = () => {
    window.location.href = `${API_URL}/google`;
  };

  //Google giriş için son


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200 gap-x-[10%] relative">
      
      <div className="flex justify-center items-center absolute top-0 left-0">
        <div>
          <Image className="md:w-[5vw] w-[15vw]" src={LogoTransparent} alt="not found" />
        </div>
        <div className="md:text-xl font-semibold">
          Taskly Adviser AI
        </div>
      </div>

      <div className="bg-white p-8 shadow-md rounded-md md:w-[400px] w-[300px]">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Your Task, Our Advice</h1>
          <p className="text-2xl text-gray-400 font-semibold">
            Log in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          {errors.length > 0 && (
            <div className="mb-4">
              <ul className="text-red-500">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {success && (
            <div className="mb-4">
              <div className="text-green-500">{success}</div>
            </div>
          )}

          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full py-2 px-2 border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={handleChange}
            name="email"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full py-2 px-2 border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={handleChange}
            name="password"
          />

          <button
            type="submit"
            className="bg-blue-500 w-full text-white p-2 mt-1 text-center font-semibold rounded-xl cursor-pointer hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
        
        {/* Google'ın girişi için yönlendirme yapıyor */}
        {
          typeof window !== "undefined" && (
            <div className="bg-red-500 text-white p-2 mt-1 text-center font-semibold rounded-xl cursor-pointer hover:bg-red-600" onClick={handleGoogle}>Google sign in</div>
          )
        }

        <Link
          href={"/user/signup"}
          className="text-xs text-blue-700 mt-6 hover:underline"
        >
          If you dont have an account.
        </Link>
      </div>
      
    </div>
  );
};

export default Signin;

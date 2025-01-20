"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const Signin: React.FC = () => {
  const router=useRouter();
  
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
    setErrors([]);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Kullanıcı verilerini gönder
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessages = Array.isArray(data.message)
          ? data.message
          : [data.message];
        setErrors(errorMessages);
      } else {
        const data = await response.json();
        console.log("Token:", data.token);

        localStorage.setItem("token", data.token);
        setSuccess("Login successfully");
        setTimeout(()=>{
          router.push("/tasks")
        },2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200">
      <div className="bg-white p-8 shadow-md rounded-md md:w-[400px] w-[300px]">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Think it. Make it.</h1>
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
              <div className="text-green-500">
                {success}
              </div>
            </div>
          )}

          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={handleChange}
            name="email"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={handleChange}
            name="password"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
          >
            Continue
          </button>
        </form>

        <Link href={"/user/signup"} className="text-xs text-blue-700 mt-4 underline">
          If you don't have an account.
        </Link>
      </div>
    </div>
  );
};

export default Signin;

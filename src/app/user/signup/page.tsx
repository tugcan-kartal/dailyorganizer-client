"use client";

import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoTransparent from "@/../public/logo-transparent.png";
import { signUpUser } from "@/app/api/userService";

const Signup: React.FC = () => {
  const router=useRouter();

  const [userData, setUserData] = useState({
    name: "",
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
    await signUpUser(userData,setErrors,setSuccess,router);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200">
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
          <p className="text-2xl text-gray-400 font-semibold">Sign up</p>
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
            type="text"
            placeholder="Enter your name"
            className="w-full py-2 px-2 border-b border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={handleChange}
            name="name"
          />

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
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
          >
            Continue
          </button>
        </form>

        <Link href={"/user/signin"} className="text-xs text-blue-700 mt-6 hover:underline">
          If you already have an account.
        </Link>
      </div>
    </div>
  );
};

export default Signup;

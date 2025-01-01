"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

const Signup: React.FC = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

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
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Kullanıcı verilerini gönder
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.message);
      } else {
        const data = await response.json();
        console.log("Token:", data.token);

        localStorage.setItem("token",data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-[400px]">
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

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            onChange={handleChange}
            name="name"
          />

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

        <p className="text-xs text-gray-400 text-center mt-4">
          Your name and photo are displayed to users who invite you to a
          workspace using your email. By continuing, you acknowledge that you
          understand and agree to the{" "}
          <a href="#" className="text-blue-500">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;

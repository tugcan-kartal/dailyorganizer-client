import React, { ChangeEvent, FormEvent, useState } from "react";

const AddTask: React.FC = () => {
  
  const [taskBody, setTaskBody] = useState({
    title: "",
    description: "",
    author: "",
    importance_level: "",
    category: "",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskBody({
      ...taskBody,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskBody),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessages = Array.isArray(data.message)
          ? data.message
          : [data.message];
        setErrors(errorMessages);
      } else {
        const data = await response.json();
        setSuccess("Task Added");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        
        <form
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Form
          </h2>

          <div className="space-y-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Title"
              onChange={handleChange}
              name="title"
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description"
              onChange={handleChange}
              name="description"
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Author"
              onChange={handleChange}
              name="author"
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Importance Level"
              onChange={handleChange}
              name="importance_level"
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Category"
              onChange={handleChange}
              name="category"
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Start Date"
              onChange={handleChange}
              name="start_date"
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="End Date"
              onChange={handleChange}
              name="end_date"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>

        <div className="mt-4">
          {success && <p className="text-green-600 font-semibold">{success}</p>}
          {errors && <p className="text-red-600 font-semibold">{errors}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddTask;

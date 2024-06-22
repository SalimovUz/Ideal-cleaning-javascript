import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const moveRegister = () => {
    navigate("/sign-up");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Sign-In
        </h1>
        <form id="submit" className="mt-6 space-y-4">
          <TextField
            fullWidth
            label="Email"
            name="email"
            onChange={handleChange}
            type="text"
            id="email"
            className="my-2"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="text"
            id="password"
            className="my-2"
          />
          <div className="text-center">
            <a
              onClick={moveRegister}
              href="#"
              className="text-blue-500 hover:underline"
            >
              Register
            </a>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            type="submit"
            form="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

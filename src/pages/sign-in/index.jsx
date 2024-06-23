import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.sign_in(form);

      if (response.status === 200) {
        localStorage.setItem("token", response?.data?.access_token);
        toast.success("Succesfully Login!", {});
      } else {
        toast.error("Error Login!");
      }
    } catch (error) {
      console.log(error);
    }
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
            type="password"
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
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

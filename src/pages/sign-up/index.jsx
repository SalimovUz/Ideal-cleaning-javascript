import { TextField } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../service";
import VerifyCodeModal from "../../components/VerifyCodeModal";

const Index = () => {
  const [form, setForm] = useState({});
  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await auth.sign_up(form);
      if (response.status === 200) {
        setModalOpen(true);
        localStorage.setItem("email", form.email);
      } else if (response.status === 400) {
        const data = await response.json();
        alert(data.error);
        console.log(data.error);
      } else {
        console.log("Signup failed");
      }
    } catch (error) {
      console.log("Error during signup:", error);
      alert("Ushbu akkaunt bilan avval ro'yxatdan o'tilgan");
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
        <VerifyCodeModal isOpen={modalOpen} toggle={toggleModal} />
        <div className="card mb-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Sign-Up
          </h1>
        </div>
        <div className="login_body w-full">
          <form className="space-y-4" id="submit" onSubmit={handleSubmit}>
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
              label="Fullname"
              name="full_name"
              onChange={handleChange}
              type="text"
              id="full_name"
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
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              onChange={handleChange}
              type="text"
              id="phone_number"
              className="my-2"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;

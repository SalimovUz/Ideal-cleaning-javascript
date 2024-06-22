import { TextField } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../service";
import VerifyCodeModal from "../../components/VerifyCodeModal";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      validatePassword(value);
    } else if (name === "phone_number") {
      validatePhoneNumber(value);
    }
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    setPasswordError(!(hasUpperCase && hasNumber));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const isValidUzbekPhoneNumber = /^(\+998)?\d{9}$/.test(phoneNumber);
    setPhoneError(!isValidUzbekPhoneNumber);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
        <VerifyCodeModal isOpen={modalOpen} toggle={toggleModal} />
        <div className="card mb-4">
          <h1 className="text-2xl border-none font-bold text-center text-gray-800">
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
              className="my-3"
              required
            />
            <TextField
              fullWidth
              label="Fullname"
              name="full_name"
              onChange={handleChange}
              type="text"
              id="full_name"
              className="my-3"
              required
            />
            <div>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                id="password"
                className=""
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <p
                className={`text-sm text-rose-600 ${
                  passwordError ? "opacity-100" : "opacity-0"
                }`}
              >
                Parolda kamida bitta katta harf va raqam qatnashgan bo'lishi
                shart!
              </p>
            </div>
            <div>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone_number"
                onChange={handleChange}
                type="text"
                id="phone_number"
                className=""
                required
              />
              <p
                className={`text-sm text-rose-600 ${
                  phoneError ? "opacity-100" : "opacity-0"
                }`}
              >
                Faqat O'zbek raqamlari ro'yxatdan o'tishi mumkin
              </p>
            </div>
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

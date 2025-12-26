import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful!\nEmail: " + res.data.user.email);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      {/* CARD */}
      <div className="w-[600px] mt-[200px] bg-white rounded-2xl pb-8 shadow-lg">

        {/* HEADER */}
        <div className="mt-8 text-center">
          <h2 className="text-[30px] font-bold text-[#b61b1b]">
            MyApp Login
          </h2>
        </div>

        {/* INPUTS */}
        <div className="mt-14 flex flex-col gap-6">
          {/* EMAIL */}
          <div className="w-[480px] mx-auto flex flex-col gap-1">
            <label className="text-lg font-medium text-left">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="h-[50px] border border-black rounded-lg px-4 text-[19px] outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="w-[480px] mx-auto flex flex-col gap-1">
            <label className="text-lg font-medium text-left">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="h-[50px] border border-black rounded-lg px-4 text-[19px] outline-none"
            />
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <div className="flex justify-center mt-14">
          <button
            onClick={handleLogin}
            className="w-[450px] h-[50px] bg-[#4c23b1] text-white text-[25px] rounded-lg flex items-center justify-center hover:opacity-90 transition"
          >
            Login
          </button>
        </div>

        {/* SIGNUP LINK */}
        <div className="mt-7 text-center text-[18px] text-gray-500">
          Don&apos;t have an account?
          <Link
            to="/signup"
            className="ml-1 text-[#4c00b4] hover:underline"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;

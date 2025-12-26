import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import soccerBall from "./image.png";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  /* ================================
     FORM HANDLERS
  ================================ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  /* ================================
     OAUTH HANDLERS (REDIRECT)
  ================================ */
  const handleGoogle = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };

  const handleFacebook = () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };

  const handleTwitter = () => {
    window.open("http://localhost:5000/api/auth/twitter", "_self");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* CARD */}
      <div className="flex w-[1000px] h-[770px] rounded-2xl overflow-hidden bg-white shadow-lg">

        {/* LEFT */}
        <div className="flex-1 p-[50px] flex flex-col gap-3">
          <h2 className="text-[28px] font-semibold">Hello!</h2>
          <p className="text-gray-500">Please signup to continue</p>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              className="h-[42px] border-b border-gray-300 outline-none text-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="h-[42px] border-b border-gray-300 outline-none text-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="h-[42px] border-b border-gray-300 outline-none text-base"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="h-[42px] border-b border-gray-300 outline-none text-base"
            />
          </div>

          <button
            onClick={handleSignup}
            className="mt-5 h-[45px] bg-[#7fae9c] text-white rounded-lg text-lg hover:opacity-90 transition"
          >
            Sign Up
          </button>

          <div className="text-center text-gray-500 mt-4">
            or <br /> signup with
          </div>

          {/* OAUTH BUTTONS */}
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={handleFacebook}
              className="w-[45px] h-[45px] rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:scale-110 transition"
            >
              <FaFacebookF />
            </button>

            <button
              onClick={handleTwitter}
              className="w-[45px] h-[45px] rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:scale-110 transition"
            >
              <FaTwitter />
            </button>

            <button
              onClick={handleGoogle}
              className="w-[45px] h-[45px] rounded-full bg-[#db4437] flex items-center justify-center text-white hover:scale-110 transition"
            >
              <FaGoogle />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 bg-[#7FA997] text-white flex flex-col items-center justify-center gap-2">
          <img src={soccerBall} alt="Soccer Ball" className="w-[60px] h-[50px]" />
          <h2 className="text-2xl font-semibold">Soccer Ball</h2>
          <p>Already have an account?</p>

          <Link to="/">
            <button className="mt-2 px-6 py-2 border-2 border-white rounded-full hover:bg-white hover:text-[#7FA997] transition">
              Sign In
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;

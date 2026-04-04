// src/pages/Login.jsx

import React, { useState } from "react";
import { FaLeaf, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Login:", form);
      setLoading(false);

      // redirect after login
      navigate("/");
    }, 1000);
  };

  return (
    <div
      className="main-content flex justify-center items-center px-4 dashboard-hero"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="app-panel w-full max-w-md p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-fit p-4 rounded-full bg-emerald-500/10 text-emerald-400 text-3xl">
            <FaLeaf />
          </div>

          <h2 className="page-title mt-3">Welcome Back</h2>
          <p className="page-subtitle mt-1">
            Login to manage your farm 🌱
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="micro-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="app-input mt-1"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="micro-label">Password</label>
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              className="app-input mt-1 pr-10"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 cursor-pointer text-slate-400 hover:text-white"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Button */}
          <button
            className="app-button-primary w-full mt-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-5">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
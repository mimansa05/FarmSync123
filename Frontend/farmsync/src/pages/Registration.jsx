// src/pages/Register.jsx

import React, { useState } from "react";
import { FaLeaf, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Register:", form);
      setLoading(false);

      // redirect after register
      navigate("/login");
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

          <h2 className="page-title mt-3">Create Account</h2>
          <p className="page-subtitle mt-1">
            Start managing your farm 🚜
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="micro-label">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="app-input mt-1"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

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

          {/* Phone no */}
            <div>
                <label className="micro-label">Phone Number</label>
                <input
                type="tel"
                placeholder="Enter phone number"
                className="app-input mt-1"
                onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                }
                />
            </div>

          {/* Password */}
          <div className="relative">
            <label className="micro-label">Password</label>
            <input
              type={show ? "text" : "password"}
              placeholder="Create password"
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
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-emerald-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;
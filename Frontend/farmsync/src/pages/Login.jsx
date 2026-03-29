// Placeholder login page file reserved for future authentication UI.

import React, { useState } from "react";
import { FaLeaf, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Login:", form);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="main-content flex justify-center items-center">
      <div className="glass-panel p-8 rounded-3xl w-full max-w-md">

        <div className="text-center mb-6">
          <FaLeaf className="text-4xl text-green-600 mx-auto" />
          <h2 className="text-2xl font-bold mt-2">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded-xl"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-xl">
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;

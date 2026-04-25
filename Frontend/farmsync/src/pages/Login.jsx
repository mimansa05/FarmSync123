import React, { useState } from 'react';
import { FaLeaf, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await loginApi(form.email, form.password);
      login(data);           // saves token + user into context & sessionStorage
      navigate('/');         // redirect to dashboard
    } catch (err) {
      setError(err.message); // show backend error message e.g. "Invalid email or password"
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center px-4 dashboard-hero"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="dashboard-hero-overlay absolute inset-0" />
      <div className="app-panel relative z-10 w-full max-w-md p-8 bg-[var(--bg-secondary)]">

        <div className="text-center mb-6">
          <div className="mx-auto w-fit p-4 rounded-full bg-emerald-500/10 text-emerald-400 text-3xl">
            <FaLeaf />
          </div>
          <h2 className="page-title mt-3">Welcome Back</h2>
          <p className="page-subtitle mt-1">Login to manage your farm 🌱</p>
        </div>

        {/* Error message from backend */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="micro-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="app-input mt-1"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <label className="micro-label">Password</label>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter your password"
              className="app-input mt-1 pr-10"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            className="app-button-primary w-full mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="text-center text-sm text-[var(--text-secondary)] mt-5">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-[var(--accent-color)] font-bold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
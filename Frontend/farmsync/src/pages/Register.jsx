import React, { useState } from 'react';
import { FaLeaf, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { registerApi, sendOtpApi, verifyOtpApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!form.email) return setError('Please enter your email');
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendOtpApi(form.email);
      setOtpSent(true);
      setSuccess('OTP sent successfully to your email!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setError('Please enter the OTP');

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await verifyOtpApi(form.email, otp);
      setVerified(true);
      setSuccess('Email verified successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verified) return setError('Please verify your email first');
    
    setLoading(true);
    setError('');

    try {
      const data = await registerApi(form.name, form.email, form.password, form.phone);
      setSuccess('Registration successful!');
      login(data);     // auto-login after register
      setTimeout(() => navigate('/'), 1500);   // go to dashboard after a brief delay
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center px-4 dashboard-hero py-10"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="dashboard-hero-overlay absolute inset-0" />
      <div className="app-panel relative z-10 w-full max-w-md p-8 bg-[var(--bg-secondary)]">

        <div className="text-center mb-6">
          <div className="mx-auto w-fit p-4 rounded-full bg-emerald-500/10 text-emerald-400 text-3xl">
            <FaLeaf />
          </div>
          <h2 className="page-title mt-3">Create Account</h2>
          <p className="page-subtitle mt-1">Start managing your farm 🚜</p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 flex items-center gap-2">
            <FaCheckCircle /> {success}
          </div>
        )}

        <form onSubmit={verified ? handleSubmit : (otpSent ? handleVerifyOtp : handleSendOtp)} className="space-y-4">

          {/* STEP 1: Email Input */}
          <div>
            <label className="micro-label">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className={`app-input mt-1 ${verified ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-200' : ''}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                disabled={otpSent || loading}
              />
              {verified && (
                <FaCheckCircle className="absolute right-3 top-4 text-emerald-400" />
              )}
            </div>
          </div>

          {/* STEP 2: OTP Input */}
          {otpSent && !verified && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="micro-label">Enter OTP</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="app-input mt-1"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                disabled={loading}
              />
              <p className="text-[10px] text-[var(--text-muted)] mt-1 cursor-pointer hover:text-[var(--accent-color)]" onClick={() => { setOtpSent(false); setOtp(''); }}>
                Wrong email? Change it
              </p>
            </div>
          )}

          {/* STEP 3: Full Registration Form */}
          {verified && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div>
                <label className="micro-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="app-input mt-1"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="micro-label">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  className="app-input mt-1"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="relative">
                <label className="micro-label">Password</label>
                <input
                  type={show ? 'text' : 'password'}
                  placeholder="Create password (min 6 characters)"
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
            </div>
          )}

          <button
            className="app-button-primary w-full mt-3"
            type="submit"
            disabled={loading}
          >
            {loading 
              ? (verified ? 'Creating account...' : (otpSent ? 'Verifying...' : 'Sending OTP...')) 
              : (verified ? 'Register' : (otpSent ? 'Verify OTP' : 'Send OTP'))
            }
          </button>

        </form>

        <p className="text-center text-sm text-[var(--text-secondary)] mt-5">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[var(--accent-color)] font-bold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;
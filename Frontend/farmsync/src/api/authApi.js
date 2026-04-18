const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const loginApi = async (email, password) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    // data.message comes from GlobalExceptionHandler's ErrorResponse
    throw new Error(data.message || 'Login failed');
  }

  return data; // AuthResponse: { token, tokenType, userId, name, email, role }
};

export const registerApi = async (name, email, password, phone) => {
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data; // AuthResponse
};

export const sendOtpApi = async (email) => {
  const response = await fetch(`${BASE_URL}/api/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to send OTP');
  }

  return data;
};

export const verifyOtpApi = async (email, otp) => {
  const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'OTP verification failed');
  }

  return data;
};

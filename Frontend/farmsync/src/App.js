import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import Expenses from './pages/Expenses';
import Activities from './pages/Actitivities';
import Reports from './pages/Reports';
import Weather from './pages/Weather';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import ContactUs from './pages/ContactUs';
import AiAssistant from './pages/AiAssistant';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes wrapped with FarmProvider */}
          <Route element={<ProtectedRoute />}>
            <Route element={<FarmProvider><MainLayout /></FarmProvider>}>
              <Route path="/" index element={<Dashboard />} />
              <Route path="crops" element={<Crops />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="activities" element={<Activities />} />
              <Route path="reports" element={<Reports />} />
              <Route path="weather" element={<Weather />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="ai-assistant" element={<AiAssistant />} />
              <Route path="contact-us" element={<ContactUs />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

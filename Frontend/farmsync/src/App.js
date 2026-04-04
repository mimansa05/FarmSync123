import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import Expenses from './pages/Expenses';
import Activities from './pages/Actitivities';
import Reports from './pages/Reports';
import Weather from './pages/Weather';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="crops" element={<Crops />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="activities" element={<Activities />} />
          <Route path="reports" element={<Reports />} />
          <Route path="weather" element={<Weather />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

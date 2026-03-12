import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import './index.css';

// Temporary pages
const Crops = () => <div className="p-4 text-xl">🌱 Crops Page - Coming Soon</div>;
const Expenses = () => <div className="p-4 text-xl">💰 Expenses Page - Coming Soon</div>;
const Activities = () => <div className="p-4 text-xl">📋 Activities Page - Coming Soon</div>;
const Reports = () => <div className="p-4 text-xl">📈 Reports Page - Coming Soon</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="crops" element={<Crops />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="activities" element={<Activities />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses'; // ✅ IMPORT REAL PAGE
import './index.css';
import Crops from './pages/Crops';
import Activities from './pages/Actitivities';
import Reports from './pages/Reports';

// App-level routing keeps all public page navigation in one place.
// Temporary pages
// const Crops = () => <div className="p-4 text-xl">🌱 Crops Page - Coming Soon</div>;
// const Activities = () => <div className="p-4 text-xl">📋 Activities Page - Coming Soon</div>;
// const Reports = () => <div className="p-4 text-xl">📈 Reports Page - Coming Soon</div>;

function App() {
  return (
    <BrowserRouter>
      {/* MainLayout provides the shared sidebar and header shell for app pages. */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="crops" element={<Crops />} />
          <Route path="expenses" element={<Expenses />} /> {/* ✅ real page */}
          <Route path="activities" element={<Activities />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

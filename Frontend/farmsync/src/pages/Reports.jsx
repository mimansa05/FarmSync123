import React, { useState } from "react";
import { FaChartBar, FaCheckCircle, FaExclamationTriangle, FaArrowUp, FaSeedling } from "react-icons/fa";

const Reports = () => {
  const [filter, setFilter] = useState("Monthly");

  // Sample data (later from backend)
  const data = [
    { crop: "Wheat", revenue: 12000, expense: 5000 },
    { crop: "Rice", revenue: 8000, expense: 4000 },
    { crop: "Corn", revenue: 5000, expense: 3000 },
  ];

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpense = data.reduce((sum, d) => sum + d.expense, 0);
  const profit = totalRevenue - totalExpense;

  const bestCrop = data.reduce((best, curr) =>
    curr.revenue - curr.expense > best.revenue - best.expense ? curr : best
  );

  return (
    <div className="main-content p-6 space-y-6">

      {/* HEADER */}
      <div className="glass-panel p-6 rounded-3xl flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaChartBar /> Reports
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-xl">
          <p className="font-semibold">Revenue</p>
          <h2 className="text-xl font-bold">₹{totalRevenue}</h2>
        </div>

        <div className="bg-red-100 p-4 rounded-xl">
          <p className="font-semibold">Expense</p>
          <h2 className="text-xl font-bold">₹{totalExpense}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl">
          <p className="font-semibold">Profit</p>
          <h2 className="text-xl font-bold">₹{profit}</h2>
        </div>
      </div>

      {/* Crop Breakdown */}
      <div className="glass-panel p-6 rounded-3xl">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <FaSeedling className="text-green-600" />
          Crop Performance
        </h2>

        {data.map((item, index) => {
          const profit = item.revenue - item.expense;
          const percent = (profit / item.revenue) * 100;

          return (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <p>{item.crop}</p>
                <p className="text-sm">₹{profit}</p>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="glass-panel p-6 rounded-3xl bg-yellow-50">
        <h2 className="font-semibold mb-4">Insights</h2>

        <div className="flex items-center gap-2 text-gray-800 mb-2">
          <FaCheckCircle className="text-green-600" />
          <p>
            Best performing crop: <b>{bestCrop.crop}</b>
          </p>
        </div>

        {profit < 0 && (
          <div className="flex items-center gap-2 text-red-500">
            <FaExclamationTriangle />
            <p>Warning: Your farm is running at a loss</p>
          </div>
        )}

        {profit > 0 && (
          <div className="flex items-center gap-2 text-green-600">
            <FaArrowUp />
            <p>Farm is profitable. Keep optimizing costs.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Reports;
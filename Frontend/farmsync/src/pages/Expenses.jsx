import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Seeds", amount: 1200, date: "2024-03-10", crop: "Wheat" },
    { id: 2, title: "Fertilizer", amount: 2000, date: "2024-03-12", crop: "Rice" },
    { id: 3, title: "Water", amount: 800, date: "2024-03-14", crop: "Corn" },
  ]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    crop: "",
  });

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add expense
  const addExpense = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    setExpenses([newExpense, ...expenses]);
    setForm({ title: "", amount: "", date: "", crop: "" });
  };

  // delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // calculations
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const highest = Math.max(...expenses.map((e) => e.amount), 0);

  const currentMonth = new Date().getMonth();
  const monthlyTotal = expenses
    .filter((e) => new Date(e.date).getMonth() === currentMonth)
    .reduce((sum, e) => sum + e.amount, 0);

  const avg = Math.floor(total / (expenses.length || 1));

  const chartData = expenses.map((e) => ({
    name: e.title,
    amount: e.amount,
  }));

  return (
    <motion.div
      className="p-6 space-y-6 bg-gradient-to-r from-green-50 to-yellow-50 min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold">💰 Expenses Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-yellow-100 p-4 rounded-xl shadow hover:scale-105 transition">
          <p>Total</p>
          <h2 className="text-xl font-bold">₹{total}</h2>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow hover:scale-105 transition">
          <p>This Month</p>
          <h2 className="text-xl font-bold">₹{monthlyTotal}</h2>
        </div>

        <div className="bg-red-100 p-4 rounded-xl shadow hover:scale-105 transition">
          <p>Highest</p>
          <h2 className="text-xl font-bold">₹{highest}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl shadow hover:scale-105 transition">
          <p>Avg</p>
          <h2 className="text-xl font-bold">₹{avg}</h2>
        </div>
      </div>

      {/* Add Expense */}
      <form
        onSubmit={addExpense}
        className="bg-white/70 backdrop-blur-lg p-4 rounded-xl shadow space-y-3"
      >
        <h2 className="font-semibold text-lg">➕ Add Expense</h2>

        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Crop Select */}
        <select
          name="crop"
          value={form.crop}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Crop</option>
          <option value="Wheat">Wheat</option>
          <option value="Rice">Rice</option>
          <option value="Corn">Corn</option>
        </select>

        <button className="bg-green-600 hover:bg-green-700 hover:scale-105 transition text-white px-4 py-2 rounded">
          Add Expense
        </button>
      </form>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">📊 Expense Chart</h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">📋 Expense Timeline</h2>

        {expenses.length === 0 && (
          <p className="text-center text-gray-500">No expenses yet 😢</p>
        )}

        <div className="border-l-2 border-green-400 pl-4 space-y-6">
          {expenses.map((item) => (
            <motion.div
              key={item.id}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute -left-3 top-2 w-3 h-3 bg-green-500 rounded-full"></div>

              <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                  <p className="text-xs text-green-600">{item.crop}</p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold text-red-500">₹{item.amount}</p>

                  <button
                    onClick={() => deleteExpense(item.id)}
                    className="text-red-500 font-medium hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Expenses;
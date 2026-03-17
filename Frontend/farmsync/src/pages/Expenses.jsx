import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getExpenses,
  addExpenseApi,
  deleteExpenseApi,
} from "../api/expensesApi";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    crop: "",
  });

  // GET (on load)
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  // form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // POST
  const addExpense = async (e) => {
    e.preventDefault();

    const newExpense = await addExpenseApi(form);
    setExpenses([newExpense, ...expenses]);

    setForm({ title: "", amount: "", date: "", crop: "" });
  };

  // DELETE
  const deleteExpense = async (id) => {
    await deleteExpenseApi(id);
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
    <motion.div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">💰 Expenses Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          <p>Total</p>
          <h2 className="text-xl font-bold">₹{total}</h2>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow">
          <p>This Month</p>
          <h2 className="text-xl font-bold">₹{monthlyTotal}</h2>
        </div>

        <div className="bg-red-100 p-4 rounded-xl shadow">
          <p>Highest</p>
          <h2 className="text-xl font-bold">₹{highest}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <p>Avg</p>
          <h2 className="text-xl font-bold">₹{avg}</h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={addExpense} className="bg-white p-4 rounded-xl shadow space-y-3">
        <h2 className="font-semibold">➕ Add Expense</h2>

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

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Expense
        </button>
      </form>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-4">📋 Timeline</h2>

        <div className="space-y-3">
          {expenses.map((item) => (
            <div key={item.id} className="flex justify-between bg-gray-50 p-3 rounded">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm">{item.date}</p>
                <p className="text-xs text-green-600">{item.crop}</p>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-red-500 font-bold">₹{item.amount}</p>

                <button
                  onClick={() => deleteExpense(item.id)}
                  className="text-red-500 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Expenses;
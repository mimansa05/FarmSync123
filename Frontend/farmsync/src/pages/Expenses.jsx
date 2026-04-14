import React, { useEffect, useMemo, useState } from 'react';
import {
  Bar, BarChart, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { createExpense, deleteExpense, getExpensesByCrop } from '../api/ExpenseAPI';
import { useFarm } from '../context/FarmContext';

const chartColors = ['#4ade80', '#38bdf8', '#fbbf24', '#fb7185', '#a78bfa'];
const currency = (value) => `Rs ${Number(value || 0).toLocaleString('en-IN')}`;

const Expenses = () => {
  const { crops, loading: farmLoading } = useFarm();

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [form, setForm] = useState({ category: '', amount: '', date: '', cropId: '' });
  const [error, setError] = useState('');
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [adding, setAdding] = useState(false);

  // Load expenses for all crops
  useEffect(() => {
    const fetchAllExpenses = async () => {
      if (!crops || crops.length === 0) return;

      setLoadingExpenses(true);
      try {
        // Fetch expenses for each crop and flatten
        const results = await Promise.all(
          crops.map((crop) => getExpensesByCrop(crop.cropId))
        );
        setExpenses(results.flat());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingExpenses(false);
      }
    };

    fetchAllExpenses();
  }, [crops]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addExpense = async (e) => {
    e.preventDefault();
    setAdding(true);
    setError('');

    try {
      const newExpense = await createExpense({
        category: form.category,
        amount: Number(form.amount),
        description: form.category,
        date: form.date,
        cropId: Number(form.cropId),
      });
      setExpenses((prev) => [newExpense, ...prev]);
      setForm({ category: '', amount: '', date: '', cropId: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const removeExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.expenseId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredExpenses = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const matchesSearch = expense.category?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || String(expense.cropId) === categoryFilter;
      const matchesDate =
        dateFilter === 'All' ||
        (dateFilter === 'This Month' &&
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear) ||
        (dateFilter === 'Last 30 Days' &&
          Date.now() - expenseDate.getTime() <= 30 * 24 * 60 * 60 * 1000);

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [categoryFilter, dateFilter, expenses, search]);

  const total = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const monthlyTotal = filteredExpenses
    .filter((e) => new Date(e.date).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const highest = filteredExpenses.reduce((max, e) => Math.max(max, Number(e.amount)), 0);
  const average = Math.round(total / (filteredExpenses.length || 1));

  const barData = filteredExpenses.map((e) => ({
    name: e.category,
    amount: Number(e.amount),
  }));

  const pieData = Object.values(
    filteredExpenses.reduce((acc, e) => {
      const cropName = crops.find((c) => c.cropId === e.cropId)?.cropName || `Crop ${e.cropId}`;
      acc[cropName] = acc[cropName] || { name: cropName, value: 0 };
      acc[cropName].value += Number(e.amount);
      return acc;
    }, {})
  );

  if (farmLoading || loadingExpenses) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        Loading expenses...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Expense Control</div>
            <h1 className="page-title mt-2">Monitor farm spending with confidence</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              A cleaner finance view with smart filters and a focused expense table.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-3 lg:grid-cols-[2fr_1fr_1fr]">
          <label className="block">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by category"
              className="app-input"
            />
          </label>
          <label className="block">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="app-select"
            >
              <option>All</option>
              <option>This Month</option>
              <option>Last 30 Days</option>
            </select>
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="app-select"
          >
            <option value="All">All Crops</option>
            {crops.map((crop) => (
              <option key={crop.cropId} value={String(crop.cropId)}>
                {crop.cropName}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'Total Spend', value: currency(total), tone: 'text-emerald-300' },
          { title: 'This Month', value: currency(monthlyTotal), tone: 'text-sky-300' },
          { title: 'Highest Expense', value: currency(highest), tone: 'text-amber-300' },
          { title: 'Average', value: currency(average), tone: 'text-violet-300' },
        ].map((item) => (
          <article key={item.title} className="app-panel app-card-hover p-5">
            <div className="text-sm text-slate-400">{item.title}</div>
            <div className={`mt-3 text-3xl font-semibold tracking-tight ${item.tone}`}>
              {item.value}
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Add expense form */}
        <article className="app-panel p-6">
          <h2 className="text-2xl font-semibold text-white">Add expense</h2>
          <p className="mt-1 text-sm text-slate-400">Log a new cost against one of your crops.</p>

          <form onSubmit={addExpense} className="mt-5 grid gap-3 md:grid-cols-2">
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Fertilizer)"
              value={form.category}
              onChange={handleChange}
              className="app-input md:col-span-2"
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              className="app-input"
              required
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="app-input"
              required
            />
            <select
              name="cropId"
              value={form.cropId}
              onChange={handleChange}
              className="app-select md:col-span-2"
              required
            >
              <option value="">Select crop</option>
              {crops.map((crop) => (
                <option key={crop.cropId} value={crop.cropId}>
                  {crop.cropName}
                </option>
              ))}
            </select>
            <div className="md:col-span-2">
              <button className="app-button-primary" type="submit" disabled={adding}>
                {adding ? 'Saving...' : 'Save Expense'}
              </button>
            </div>
          </form>
        </article>

        {/* Charts */}
        <article className="app-panel p-6">
          <h2 className="text-2xl font-semibold text-white">Expense insights</h2>
          <p className="mt-1 text-sm text-slate-400">Bar and category distribution.</p>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="app-panel-soft p-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#0f1720', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', color: '#fff' }} />
                  <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="app-panel-soft flex items-center justify-center p-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={84} paddingAngle={4}>
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f1720', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </article>
      </section>

      {/* Expense table */}
      <section className="app-panel p-6">
        <h2 className="text-2xl font-semibold text-white mb-5">Expense table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-white/8 text-sm text-slate-400">
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Crop</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    No expenses found.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense.expenseId} className="border-b border-white/5 text-sm text-slate-200">
                    <td className="py-4">
                      <span>{expense.category}</span>
                    </td>
                    <td className="py-4 text-slate-400">
                      {crops.find((c) => c.cropId === expense.cropId)?.cropName || `Crop ${expense.cropId}`}
                    </td>
                    <td className="py-4 text-slate-400">{expense.date}</td>
                    <td className="py-4 font-medium text-white">{currency(expense.amount)}</td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => removeExpense(expense.expenseId)}
                        className="rounded-xl border border-white/8 px-4 py-2 text-xs font-semibold text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/8 hover:text-red-300 uppercase"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Expenses;
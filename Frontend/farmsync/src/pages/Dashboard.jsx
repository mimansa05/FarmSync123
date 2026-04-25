import React from 'react';
import {
  FaArrowRight,
  FaBarsProgress,
  FaBottleWater,
  FaCalendarDays,
  FaChevronRight,
  FaCloudSun,
  FaMoneyBillWave,
  FaSprayCanSparkles,
  FaTractor,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { LuLeaf } from 'react-icons/lu';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Crops',
      value: '12',
      detail: 'All time crops',
      icon: <LuLeaf />,
      color: '#22c55e',
      bg: 'rgba(34, 197, 94, 0.1)',
      onClick: () => navigate('/crops'),
    },
    {
      title: 'Active Crops',
      value: '8',
      detail: 'Currently growing',
      icon: <FaTractor />,
      color: '#0ea5e9',
      bg: 'rgba(14, 165, 233, 0.1)',
      onClick: () => navigate('/crops'),
    },
    {
      title: 'Monthly Expense',
      value: 'Rs 5,250',
      detail: '▲ 12.5% from last month',
      icon: <FaMoneyBillWave />,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
      onClick: () => navigate('/expenses'),
    },
    {
      title: 'Harvest Soon',
      value: '3',
      detail: 'Crops ready',
      icon: <FaCalendarDays />,
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      onClick: () => navigate('/activities'),
    },
  ];

  const activities = [
    { icon: <FaBottleWater />, title: 'Watering - Wheat field', meta: '2 hours ago by Raj', color: '#3b82f6' },
    { icon: <LuLeaf />, title: 'Fertilizer applied - Rice field', meta: '5 hours ago by John', color: '#22c55e' },
    { icon: <FaSprayCanSparkles />, title: 'Pesticide spray - Corn field', meta: 'Yesterday by Raj', color: '#f59e0b' },
    { icon: <FaBarsProgress />, title: 'Soil check - Cotton field', meta: '2 days ago by Amit', color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section with Background Image */}
      <section 
        className="dashboard-hero relative overflow-hidden rounded-[32px] p-8 text-white shadow-2xl min-h-[400px] flex items-center"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div className="dashboard-hero-overlay absolute inset-0 rounded-[32px]" />
        
        <div className="relative z-10 w-full flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-bold backdrop-blur-md border border-emerald-500/30">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Farm status is looking strong today
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl text-white">
              Good Morning, <br />
              <span className="text-emerald-400">Farmer!</span>
            </h1>
            <p className="mt-6 text-lg font-medium opacity-90 leading-relaxed max-w-xl text-slate-100">
              Your fields are healthy and growth is on track. Here's a quick overview of your farm's performance today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const target = document.querySelector('#crop-overview');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-500/30 transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                View Farm Overview <FaArrowRight />
              </button>
              <button
                onClick={() => navigate('/activities')}
                className="rounded-2xl bg-white/10 px-6 py-3.5 text-sm font-bold backdrop-blur-md border border-white/20 transition-all hover:bg-white/20"
              >
                Add Activity +
              </button>
            </div>
          </div>

          <div className="lg:w-80">
            <div className="rounded-3xl bg-black/40 p-6 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Local Weather</span>
                <FaCloudSun className="text-3xl text-emerald-400" />
              </div>
              <div className="mt-6">
                <div className="text-5xl font-black text-white">34.0°C</div>
                <p className="mt-2 text-sm font-medium text-slate-300">Mostly sunny, perfect for harvest.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.title}
            onClick={stat.onClick}
            className="app-panel group flex items-center justify-between p-6 transition-all hover:border-[var(--accent-color)] hover:scale-[1.02] bg-[var(--bg-secondary)]"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">{stat.title}</p>
              <p className="mt-2 text-3xl font-black text-[var(--text-primary)]">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-[var(--text-secondary)]">{stat.detail}</p>
            </div>
            <div 
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform group-hover:rotate-12"
              style={{ backgroundColor: stat.bg, color: stat.color }}
            >
              {stat.icon}
            </div>
          </button>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <article id="crop-overview" className="app-panel p-6 bg-[var(--bg-secondary)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Crop Performance</h2>
            <button onClick={() => navigate('/reports')} className="text-sm font-bold text-[var(--accent-color)] hover:underline">View Analytics</button>
          </div>
          <div className="h-64 w-full rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] italic">
            Performance chart visualization would go here
          </div>
        </article>

        <article className="app-panel p-6 bg-[var(--bg-secondary)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Recent Activities</h2>
            <button onClick={() => navigate('/activities')} className="text-sm font-bold text-[var(--accent-color)] hover:underline">See All</button>
          </div>
          <div className="space-y-3">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-4 transition-all hover:bg-[var(--bg-secondary)]">
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xl shrink-0"
                  style={{ backgroundColor: `${activity.color}15`, color: activity.color }}
                >
                  {activity.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[var(--text-primary)] truncate">{activity.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{activity.meta}</p>
                </div>
                <FaChevronRight className="text-[var(--text-muted)] text-xs" />
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;

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
      tone: 'from-emerald-950/90 to-emerald-900/40 text-emerald-200',
      iconTone: 'bg-emerald-500/20 text-emerald-300',
      onClick: () => navigate('/crops'),
    },
    {
      title: 'Active Crops',
      value: '8',
      detail: 'Currently growing',
      icon: <FaTractor />,
      tone: 'from-sky-950/90 to-blue-900/40 text-blue-200',
      iconTone: 'bg-blue-500/20 text-blue-300',
      onClick: () => navigate('/crops'),
    },
    {
      title: 'Monthly Expense',
      value: 'Rs 5,250',
      detail: '▲ 12.5% from last month',
      icon: <FaMoneyBillWave />,
      tone: 'from-yellow-950/90 to-amber-900/40 text-amber-100',
      iconTone: 'bg-amber-400/20 text-amber-300',
      onClick: () => navigate('/expenses'),
    },
    {
      title: 'Harvest Soon',
      value: '3',
      detail: 'Crops ready',
      icon: <FaCalendarDays />,
      tone: 'from-red-950/80 to-orange-950/40 text-orange-100',
      iconTone: 'bg-orange-400/20 text-orange-300',
      onClick: () => navigate('/activities'),
    },
  ];

  const cropLines = [
    { label: 'Wheat', color: '#4ade80', points: [42, 58, 61, 69, 66, 72, 70, 81, 86] },
    { label: 'Rice', color: '#3b82f6', points: [30, 37, 54, 66, 59, 55, 57, 50, 63] },
    { label: 'Corn', color: '#f59e0b', points: [16, 12, 18, 27, 46, 44, 35, 29, 41] },
    { label: 'Cotton', color: '#fb923c', points: [22, 18, 14, 26, 40, 48, 38, 20, 15] },
    { label: 'Sugarcane', color: '#8b5cf6', points: [19, 21, 17, 23, 36, 28, 24, 31, 20] },
  ];

  const linePath = (points) => {
    const stepX = 100 / (points.length - 1);
    return points.map((point, index) => {
      const x = index * stepX;
      const y = 100 - point;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const activities = [
    { icon: <FaBottleWater />, title: 'Watering - Wheat field', meta: '2 hours ago by Raj', tone: 'bg-blue-500/15 text-blue-300' },
    { icon: <LuLeaf />, title: 'Fertilizer applied - Rice field', meta: '5 hours ago by John', tone: 'bg-emerald-500/15 text-emerald-300' },
    { icon: <FaSprayCanSparkles />, title: 'Pesticide spray - Corn field', meta: 'Yesterday by Raj', tone: 'bg-orange-500/15 text-orange-300' },
    { icon: <FaBarsProgress />, title: 'Soil check - Cotton field', meta: '2 days ago by Amit', tone: 'bg-violet-500/15 text-violet-300' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section 
        className="dashboard-hero relative overflow-hidden rounded-[32px] p-8 text-white shadow-2xl min-h-[380px] flex items-center"
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
            <p className="mt-6 text-lg font-medium opacity-90 leading-relaxed text-slate-100 max-w-xl">
              Your fields are healthy and growth is on track. Here's a quick overview of your farm's performance today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => document.querySelector('#crop-overview')?.scrollIntoView({ behavior: 'smooth' })}
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
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.title}
            onClick={stat.onClick}
            className={`rounded-[26px] border border-white/6 bg-gradient-to-br ${stat.tone} p-5 text-left shadow-2xl transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">{stat.title}</p>
                <p className="mt-2 text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-2 text-xs font-medium opacity-60">{stat.detail}</p>
              </div>
              <div className={`rounded-full p-4 text-2xl ${stat.iconTone}`}>{stat.icon}</div>
            </div>
          </button>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.95fr_0.95fr]">
        <article id="crop-overview" className="rounded-[28px] border border-white/8 bg-[#0b120f] p-6 shadow-2xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <LuLeaf className="text-2xl text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Crop Overview</h2>
            </div>
            <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 transition-colors">
              This Month
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.7fr]">
            <div className="rounded-[24px] border border-white/6 bg-[#0d1512]/60 p-5 relative overflow-hidden">
              <div className="mb-6 flex flex-wrap gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {cropLines.map((line) => (
                  <div key={line.label} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: line.color }} />
                    {line.label}
                  </div>
                ))}
              </div>

              <div className="relative h-[280px]">
                {/* Grid Lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="h-full w-full border-b border-white/5 grid grid-rows-4">
                    <div className="border-t border-white/5" />
                    <div className="border-t border-white/5" />
                    <div className="border-t border-white/5" />
                    <div className="border-t border-white/5" />
                  </div>
                  <div className="absolute inset-0 grid grid-cols-4">
                    <div className="border-r border-white/5" />
                    <div className="border-r border-white/5" />
                    <div className="border-r border-white/5" />
                  </div>
                </div>

                <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                  {cropLines.map((line) => (
                    <path
                      key={line.label}
                      d={linePath(line.points)}
                      fill="none"
                      stroke={line.color}
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                  <circle cx="81" cy="20" r="1.5" fill="#4ade80" />
                </svg>

                <div className="absolute -right-2 top-[12%] rounded-xl bg-emerald-500/90 px-3 py-2 text-[10px] font-bold text-white shadow-lg backdrop-blur-sm">
                  Wheat
                  <div className="text-[10px] opacity-80">75%</div>
                </div>

                <div className="absolute -bottom-8 left-0 right-0 flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[24px] border border-white/6 bg-[#0d1512]/70 p-6 text-center">
              <div className="relative mx-auto h-40 w-40 flex items-center justify-center">
                <svg className="h-full w-full -rotate-90 overflow-visible">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="110" className="text-emerald-500" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                  <span className="text-4xl font-black text-white">75%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Growth</span>
                </div>
              </div>
              <div className="mt-8">
                <div className="text-2xl font-black text-emerald-400 flex items-center justify-center gap-2">
                  <span className="text-sm">▲</span> 8.5%
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">from last month</div>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-[28px] border border-white/8 bg-[#0b120f] p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LuLeaf className="text-2xl text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
            </div>
            <button onClick={() => navigate('/activities')} className="text-xs font-bold text-emerald-400 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {activities.map((activity, i) => (
              <button 
                key={i} 
                onClick={() => navigate('/activities')}
                className="flex w-full items-center gap-4 rounded-[22px] border border-white/5 bg-white/[0.03] p-4 text-left transition-all hover:bg-white/[0.06] hover:scale-[1.01]"
              >
                <div className={`rounded-xl p-3 text-lg ${activity.tone}`}>{activity.icon}</div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white text-sm truncate">{activity.title}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-0.5">{activity.meta}</p>
                </div>
                <FaChevronRight className="text-slate-600 text-xs" />
              </button>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;

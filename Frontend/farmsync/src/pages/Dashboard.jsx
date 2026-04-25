import React from 'react';
import {
  FaArrowRight,
  FaBarsProgress,
  FaBottleWater,
  FaCalendarDays,
  FaChevronRight,
  FaCloudSun,
  FaMoneyBillWave,
  FaRobot,
  FaSprayCanSparkles,
  FaSun,
  FaTractor,
  FaSeedling,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { GiPlantRoots, GiWheat } from 'react-icons/gi';
import { LuLeaf } from 'react-icons/lu';

const Dashboard = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const target = document.querySelector(id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  const activities = [
    { icon: <FaBottleWater />, title: 'Watering - Wheat field', meta: '2 hours ago by Raj', tone: 'bg-blue-500/15 text-blue-300' },
    { icon: <LuLeaf />, title: 'Fertilizer applied - Rice field', meta: '5 hours ago by John', tone: 'bg-emerald-500/15 text-emerald-300' },
    { icon: <FaSprayCanSparkles />, title: 'Pesticide spray - Corn field', meta: 'Yesterday by Raj', tone: 'bg-orange-500/15 text-orange-300' },
    { icon: <FaBarsProgress />, title: 'Soil check - Cotton field', meta: '2 days ago by Amit', tone: 'bg-violet-500/15 text-violet-300' },
  ];

  const insightCards = [
    { icon: <GiPlantRoots />, title: 'Soil Health', primary: 'Good', secondary: 'pH 6.5 - Optimal', tone: 'text-emerald-300' },
    { icon: <FaBottleWater />, title: 'Irrigation', primary: 'Next in 2 Days', secondary: 'Wheat Field', tone: 'text-blue-300' },
    { icon: <FaSun />, title: 'AI Suggestion', primary: 'Irrigate in the evening', secondary: 'for better results', badge: 'New', tone: 'text-amber-300' },
    { icon: <GiWheat />, title: 'Market Price', primary: 'Wheat: Rs 2,140', secondary: '▲ 3.2% today', tone: 'text-yellow-200' },
  ];

  const linePath = (points) => {
    const stepX = 100 / (points.length - 1);

    return points
      .map((point, index) => {
        const x = index * stepX;
        const y = 100 - point;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <div className="space-y-5 text-slate-900 dark:text-white">
      <section
        className="dashboard-hero relative overflow-hidden rounded-[30px] border border-emerald-400/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-7"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div className="dashboard-hero-overlay absolute inset-0" />
        <div className="relative z-10 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.85)]" />
              Farm status is looking strong today
            </div>
            <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-[3.25rem]">
              Good Morning, <span className="text-emerald-400">Farmer!</span>
            </h1>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
              <FaSeedling className="text-emerald-300" />
              Healthy fields, steady growth
            </div>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200/90 md:text-lg">
              Here&apos;s what&apos;s happening on your farm today. Check your crops, expenses, and activities at a glance.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('#crop-overview')}
                className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_16px_28px_rgba(34,197,94,0.32)] transition hover:bg-emerald-400"
              >
                View Farm Overview
                <FaArrowRight />
              </button>
              <button
                type="button"
                onClick={() => navigate('/activities')}
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/55 px-5 py-2.5 text-sm font-medium text-slate-100 backdrop-blur transition hover:bg-slate-800/70"
              >
                Add New Activity
                <span className="text-lg leading-none">+</span>
              </button>
            </div>
          </div>

          <div className="self-end xl:pt-24">
            <button
              type="button"
              onClick={() => navigate('/weather')}
              className="w-full min-w-[280px] max-w-sm rounded-[28px] border border-white/10 bg-stone-900/70 p-6 text-left backdrop-blur-md transition hover:border-emerald-400/15 hover:bg-stone-900/80"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-amber-100/70">Today&apos;s Weather</p>
              <div className="mt-4 flex items-start justify-between gap-6">
                <div>
                  <div className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">34.0°C</div>
                  <p className="mt-3 max-w-[180px] text-sm leading-6 text-stone-200/80">
                    Mostly cloudy and ideal for field work
                  </p>
                </div>
                <div className="rounded-2xl bg-amber-300/10 p-4 text-5xl text-amber-300">
                  <FaCloudSun />
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <button
            key={stat.title}
            type="button"
            onClick={stat.onClick}
            className={`app-card-hover app-clickable rounded-[26px] border border-white/6 bg-gradient-to-br ${stat.tone} p-5 text-left shadow-[0_18px_38px_rgba(0,0,0,0.24)]`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-white/70">{stat.title}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-white/60">{stat.detail}</p>
              </div>
              <div className={`rounded-full p-4 text-3xl ${stat.iconTone}`}>{stat.icon}</div>
            </div>
          </button>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.95fr_0.95fr]">
        <article id="crop-overview" className="dashboard-panel rounded-[28px] p-6 scroll-mt-28">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl text-emerald-400">
                <LuLeaf />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Crop Overview</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/reports')}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              This Month
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.7fr]">
            <div className="rounded-[24px] border border-white/6 bg-[#0d1512]/60 p-4">
              <div className="mb-5 flex flex-wrap gap-4 text-sm text-slate-300">
                {cropLines.map((line) => (
                  <div key={line.label} className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: line.color }} />
                    {line.label}
                  </div>
                ))}
              </div>

              <div className="relative h-[320px] overflow-hidden rounded-[20px]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_24%,rgba(255,255,255,0.07)_25%,transparent_26%,transparent_49%,rgba(255,255,255,0.07)_50%,transparent_51%,transparent_74%,rgba(255,255,255,0.07)_75%,transparent_76%),linear-gradient(to_right,transparent_0%,transparent_24%,rgba(255,255,255,0.04)_25%,transparent_26%,transparent_49%,rgba(255,255,255,0.04)_50%,transparent_51%,transparent_74%,rgba(255,255,255,0.04)_75%,transparent_76%)]" />
                <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
                  {cropLines.map((line) => (
                    <path
                      key={line.label}
                      d={linePath(line.points)}
                      fill="none"
                      stroke={line.color}
                      strokeWidth="0.55"
                      strokeLinecap="round"
                    />
                  ))}
                  <circle cx="87.5" cy="19" r="1.3" fill="#4ade80" />
                </svg>

                <div className="absolute bottom-3 left-5 right-5 flex justify-between text-sm text-slate-400">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>

                <div className="absolute right-[8%] top-[12%] rounded-2xl bg-emerald-500/80 px-3 py-2 text-sm font-medium text-white shadow-lg">
                  Wheat
                  <div className="text-xs text-emerald-100">75%</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/reports')}
              className="flex flex-col justify-between rounded-[24px] border border-white/6 bg-[#0d1512]/70 p-5 text-left transition hover:border-emerald-400/15 hover:bg-[#0d1512]/85"
            >
              <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#4ade80_0_270deg,rgba(255,255,255,0.08)_270deg_360deg)] p-4">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#0b120f]">
                  <div className="text-4xl font-semibold text-slate-900 dark:text-white">75%</div>
                  <div className="mt-1 text-sm text-slate-300">Overall Growth</div>
                </div>
              </div>
              <div className="pt-6 text-center">
                <div className="text-2xl font-semibold text-emerald-400">▲ 8.5%</div>
                <div className="mt-2 text-sm text-slate-400">from last month</div>
              </div>
            </button>
          </div>
        </article>

        <article id="recent-activities" className="dashboard-panel rounded-[28px] p-6 scroll-mt-28">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl text-emerald-400">
                <LuLeaf />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Recent Activities</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('/activities')}
              className="text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
            >
              View All
            </button>
          </div>

          <div className="space-y-2">
            {activities.map((activity) => (
              <button
                key={activity.title}
                type="button"
                onClick={() => navigate('/activities')}
                className="flex w-full items-center gap-4 rounded-[22px] border border-white/5 bg-white/[0.02] px-4 py-4 text-left transition hover:bg-white/[0.04]"
              >
                <div className={`rounded-2xl p-3 text-xl ${activity.tone}`}>{activity.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-lg font-medium text-slate-900 dark:text-white">{activity.title}</div>
                  <div className="mt-1 text-sm text-slate-400">{activity.meta}</div>
                </div>
                <FaChevronRight className="text-slate-500" />
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1fr_1.15fr_1fr_1.7fr]">
        {insightCards.map((card) => (
          <button
            key={card.title}
            type="button"
            onClick={() => navigate(card.title === 'Market Price' ? '/reports' : '/weather')}
            className="dashboard-panel rounded-[26px] p-5 text-left transition hover:border-emerald-400/15"
          >
            <div className={`mb-4 text-3xl ${card.tone}`}>{card.icon}</div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-medium text-slate-900 dark:text-white">{card.title}</p>
                <p className={`mt-2 text-xl font-semibold ${card.tone}`}>{card.primary}</p>
                <p className="mt-1 text-sm text-slate-400">{card.secondary}</p>
              </div>
              {card.badge && (
                <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-medium text-blue-300">
                  {card.badge}
                </span>
              )}
            </div>
          </button>
        ))}

        <button
          id="ai-assistant"
          type="button"
          onClick={() => navigate('/ai-assistant')}
          className="rounded-[26px] border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(11,61,34,0.9),rgba(14,32,20,0.92))] p-5 text-left shadow-[0_18px_38px_rgba(0,0,0,0.24)] transition hover:border-emerald-300/30"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="rounded-2xl bg-emerald-400/15 p-3 text-3xl text-emerald-300">
              <FaRobot />
            </div>
            <span className="rounded-full bg-lime-400/15 px-3 py-1 text-xs font-medium text-lime-300">Beta</span>
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">AI Farm Assistant</h3>
          <p className="mt-3 text-sm leading-7 text-emerald-50/75">
            Based on weather and soil data, consider irrigating your wheat field tomorrow evening for best results.
          </p>
        </button>
      </section>
    </div>
  );
};

export default Dashboard;

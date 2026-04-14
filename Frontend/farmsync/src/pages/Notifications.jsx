import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaCloudSunRain, FaMoneyBillWave, FaSeedling } from 'react-icons/fa';

const Notifications = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Weather update for today',
      message: 'Cloud cover is increasing in Bengaluru. Irrigation can be shifted to the evening.',
      time: '5 min ago',
      read: false,
      icon: <FaCloudSunRain />,
      tone: 'bg-sky-400/15 text-sky-300',
    },
    {
      id: 2,
      title: 'Crop growth milestone',
      message: 'Your wheat field has entered a healthy growth stage. Keep soil moisture steady.',
      time: '20 min ago',
      read: false,
      icon: <FaSeedling />,
      tone: 'bg-emerald-400/15 text-emerald-300',
    },
    {
      id: 3,
      title: 'Expense reminder',
      message: 'This week\'s fertilizer payment is due tomorrow.',
      time: '1 hour ago',
      read: true,
      icon: <FaMoneyBillWave />,
      tone: 'bg-amber-400/15 text-amber-300',
    },
  ]);

  const unreadCount = items.filter((item) => !item.read).length;

  const markAllRead = () => {
    setItems((current) => current.map((item) => ({ ...item, read: true })));
  };

  return (
    <div className="space-y-5 text-white">
      <section className="app-panel p-6 md:p-7">
        <div className="micro-label">Notifications</div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="page-title">Stay updated on your farm</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              Important alerts, crop updates, and reminders appear here so you can act quickly.
            </p>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/15"
          >
            Mark all as read
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_2fr]">
        <article className="app-panel p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-400/15 p-3 text-xl text-emerald-300">
              <FaBell />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Unread alerts</h2>
              <p className="text-sm text-slate-400">You have {unreadCount} active notifications.</p>
            </div>
          </div>
        </article>

        <article className="app-panel p-6">
          <div className="space-y-3">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setItems((current) =>
                    current.map((entry) => (entry.id === item.id ? { ...entry, read: true } : entry)),
                  );
                }}
                className={`flex w-full items-start gap-4 rounded-[22px] border px-4 py-4 text-left transition ${
                  item.read
                    ? 'border-white/6 bg-white/[0.02] hover:bg-white/[0.04]'
                    : 'border-emerald-400/15 bg-emerald-500/[0.06] hover:bg-emerald-500/[0.08]'
                }`}
              >
                <div className={`rounded-2xl p-3 text-lg ${item.tone}`}>{item.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <span className="text-xs text-slate-400">{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.message}</p>
                </div>
                {item.read && <FaCheckCircle className="mt-1 text-emerald-300" />}
              </button>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Notifications;

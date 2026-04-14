import React from 'react';
import { FaArrowRight, FaRobot, FaSun } from 'react-icons/fa6';
import { GiPlantRoots } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const insights = [
  {
    title: 'Irrigation timing',
    description: 'Water your wheat field after sunset to reduce evaporation loss and improve absorption.',
    icon: <FaSun />,
    tone: 'bg-amber-400/15 text-amber-300',
  },
  {
    title: 'Soil condition',
    description: 'Current moisture looks balanced. Hold off on heavy watering through the afternoon.',
    icon: <GiPlantRoots />,
    tone: 'bg-emerald-400/15 text-emerald-300',
  },
  {
    title: 'Next best action',
    description: 'Schedule a field inspection tomorrow morning and log any pest signs in activities.',
    icon: <FaRobot />,
    tone: 'bg-sky-400/15 text-sky-300',
  },
];

const AiAssistant = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5 text-white">
      <section className="rounded-[30px] border border-emerald-400/12 bg-[linear-gradient(135deg,rgba(8,29,20,0.96),rgba(9,19,15,0.96))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:p-7">
        <div className="micro-label">AI Assistance</div>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <h1 className="page-title">AI Farm Assistant</h1>
            <p className="page-subtitle mt-3">
              Smart recommendations based on your crop activity, weather pattern, and current farm conditions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/activities')}
            className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_16px_28px_rgba(34,197,94,0.3)] transition hover:bg-emerald-400"
          >
            Log Suggested Action
            <FaArrowRight />
          </button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {insights.map((insight) => (
          <article key={insight.title} className="app-panel p-6">
            <div className={`mb-4 inline-flex rounded-2xl p-3 text-2xl ${insight.tone}`}>{insight.icon}</div>
            <h2 className="text-xl font-semibold text-white">{insight.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{insight.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AiAssistant;

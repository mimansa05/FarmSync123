import React, { useState } from 'react';
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FaArrowUp, FaChartLine, FaDownload, FaSeedling, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { generateFarmReport } from '../utils/reportGenerator';

const trendData = [
  { name: 'Jan', yield: 34, profit: 18 },
  { name: 'Feb', yield: 42, profit: 24 },
  { name: 'Mar', yield: 46, profit: 29 },
  { name: 'Apr', yield: 53, profit: 33 },
  { name: 'May', yield: 58, profit: 38 },
  { name: 'Jun', yield: 62, profit: 44 },
];

const cropMix = [
  { name: 'Wheat', value: 38 },
  { name: 'Rice', value: 26 },
  { name: 'Corn', value: 18 },
  { name: 'Sugarcane', value: 18 },
];

const reportsColors = ['#4ade80', '#38bdf8', '#fbbf24', '#a78bfa'];

/**
 * Reports Component
 * 
 * Provides in-depth analytics including yield trends, crop mix distributions,
 * and automated PDF report generation for farm management.
 */
const Reports = () => {
  // --- Context & State ---
  const { auth } = useAuth();
  const { farm } = useFarm();
  const [filter, setFilter] = useState('Monthly');
  
  /** @type {boolean} State to track PDF generation progress */
  const [isExporting, setIsExporting] = useState(false);
  
  /** @type {boolean} State to show temporary success feedback */
  const [showSuccess, setShowSuccess] = useState(false);

  // --- KPI Data ---
  const kpis = [
    { title: 'Yield Growth', value: '+18.4%', tone: 'text-emerald-300' },
    { title: 'Net Margin', value: '+12.1%', tone: 'text-sky-300' },
    { title: 'Best Crop', value: 'Wheat', tone: 'text-amber-300' },
  ];

  /**
   * Handles the professional export of farm data to a downloadable PDF.
   * Utilizes the generateFarmReport utility with html2canvas support.
   */
  const handleExportReport = async () => {
    try {
      setIsExporting(true);
      
      const reportData = {
        yieldGrowth: kpis[0].value,
        netMargin: kpis[1].value,
        bestCrop: kpis[2].value,
        trendData: trendData
      };

      const context = {
        farmerName: auth?.user?.name,
        location: farm?.location || 'Main Field'
      };

      // Trigger the PDF generation
      await generateFarmReport(reportData, context, 'trend-chart-container');
      
      // Success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* --- Intro Section & Controls --- */}
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Farm Analytics</div>
            <h1 className="page-title mt-2">Actionable reports in a cleaner premium layout</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              Keep trends, crop mix, and insight cards in one compact analytics dashboard without changing the core app layout.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {showSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 animate-in fade-in slide-in-from-right-4">
                <FaCheckCircle />
                Report Downloaded!
              </div>
            )}
            <select 
              value={filter} 
              onChange={(event) => setFilter(event.target.value)} 
              className="app-select min-w-[150px]"
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
            <button 
              onClick={handleExportReport}
              disabled={isExporting}
              className={`app-button-primary flex items-center gap-2 ${isExporting ? 'opacity-70 grayscale' : ''}`}
            >
              {isExporting ? <FaSpinner className="animate-spin" /> : <FaDownload />}
              {isExporting ? 'Generating...' : 'Export Report'}
            </button>
          </div>
        </div>
      </section>

      {/* --- KPI Cards --- */}
      <section className="grid gap-4 md:grid-cols-3">
        {kpis.map((item) => (
          <article key={item.title} className="app-panel app-card-hover p-5">
            <div className="text-sm text-slate-400">{item.title}</div>
            <div className={`mt-3 text-3xl font-semibold tracking-tight ${item.tone}`}>{item.value}</div>
          </article>
        ))}
      </section>

      {/* --- Visual Trends & Mix --- */}
      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <article id="trend-chart-container" className="app-panel p-6">

          <div className="mb-5 flex items-center gap-3">
            <FaChartLine className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Performance trends</h2>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={trendData}>
              <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f1720',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />
              <Line type="monotone" dataKey="yield" stroke="#4ade80" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="profit" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="app-panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <FaSeedling className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-white">Crop mix</h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={cropMix} dataKey="value" nameKey="name" innerRadius={56} outerRadius={88} paddingAngle={4}>
                {cropMix.map((entry, index) => (
                  <Cell key={entry.name} fill={reportsColors[index % reportsColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0f1720',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-5 space-y-3">
            {cropMix.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: reportsColors[index] }} />
                  {item.name}
                </div>
                <span className="text-slate-400">{item.value}%</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          'Wheat continues to outperform the seasonal average with stronger mid-cycle growth.',
          'Profitability improved after irrigation costs were reduced over the last six weeks.',
          'Corn inventory suggests an opportunity to shift more budget toward fertilizer efficiency.',
        ].map((insight, index) => (
          <article key={insight} className="app-panel app-card-hover p-5">
            <div className="mb-4 inline-flex rounded-full bg-emerald-400/12 px-3 py-1 text-xs font-medium text-emerald-300">
              Insight {index + 1}
            </div>
            <p className="text-sm leading-7 text-slate-300">{insight}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
              <FaArrowUp />
              Trending positive
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Reports;

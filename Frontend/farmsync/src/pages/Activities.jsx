import React, { useEffect, useMemo, useState } from 'react';
import { FaCalendarAlt, FaPlus, FaSprayCan, FaTint, FaTractor, FaTrash } from 'react-icons/fa';
import { GiFertilizerBag } from 'react-icons/gi';
import { createActivity, deleteActivity, getActivitiesByCrop } from '../api/activityApi';
import { useFarm } from '../context/FarmContext';

const iconMap = {
  Watering:   { icon: <FaTint />,          tone: 'bg-sky-400/15 text-sky-300' },
  Fertilizer: { icon: <GiFertilizerBag />, tone: 'bg-emerald-400/15 text-emerald-300' },
  Harvest:    { icon: <FaTractor />,       tone: 'bg-amber-400/15 text-amber-300' },
  Pesticide:  { icon: <FaSprayCan />,      tone: 'bg-violet-400/15 text-violet-300' },
};

/**
 * Activities Component
 * 
 * Provides a vertical timeline of all farm-related activities (Watering, Fertilizer, etc.).
 * Data is aggregated from all crops belonging to the active farm.
 * 
 * @returns {JSX.Element} The rendered Activities timeline page
 */
const Activities = () => {
  const { crops, loading: farmLoading } = useFarm();

  const [activities, setActivities] = useState([]);
  const [range, setRange] = useState('All');
  const [form, setForm] = useState({ activityType: '', cropId: '', description: '', date: '' });
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(false);

  /**
   * Effect hook to fetch activities for all available crops.
   * It uses Promise.all to fetch data concurrently for each crop ID.
   */
  useEffect(() => {
    const fetchAll = async () => {
      // Check if crops are loaded before attempting to fetch activities
      if (!crops || crops.length === 0) {
        setActivities([]);
        return;
      }

      setLoadingActivities(true);
      try {
        /** @type {Array<Promise>} Array of pending activity fetch requests */
        const promises = crops.map((crop) => getActivitiesByCrop(crop.cropId));
        
        /** @type {Array<Array>} Resolved activity lists for each crop */
        const results = await Promise.all(promises);
        
        // Flatten the array of arrays into a single list and sort by date descending
        const allActivities = results.flat().sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setActivities(allActivities);
      } catch (err) {
        setError("Failed to load activities: " + err.message);
      } finally {
        setLoadingActivities(false);
      }
    };

    fetchAll();
  }, [crops]);

  const addActivity = async (event) => {
    event.preventDefault();
    setAdding(true);
    setError('');

    try {
      const newActivity = await createActivity({
        activityType: form.activityType,
        description: form.description,
        date: form.date || new Date().toISOString().split('T')[0],
        cropId: Number(form.cropId),
      });
      setActivities((prev) => [newActivity, ...prev]);
      setForm({ activityType: '', cropId: '', description: '', date: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteActivity(id);
      setActivities((prev) => prev.filter((a) => a.activityId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredActivities = useMemo(() => {
    if (range === 'All') return activities;
    const today = new Date().toISOString().split('T')[0];
    return activities.filter((a) => a.date === today);
  }, [activities, range]);

  if (farmLoading || loadingActivities) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        Loading activities...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Field Timeline</div>
            <h1 className="page-title mt-2">Track daily farm activity in a clean flow</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              A vertical timeline with modern cards and consistent visual treatment.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="mt-6 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="app-select"
          >
            <option value="All">All Activities</option>
            <option value="Today">Today</option>
          </select>

          <form onSubmit={addActivity} className="grid gap-3 md:grid-cols-5">
            <select
              name="activityType"
              value={form.activityType}
              onChange={(e) => setForm({ ...form, activityType: e.target.value })}
              className="app-select"
              required
            >
              <option value="">Type</option>
              <option value="Watering">Watering</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Harvest">Harvest</option>
              <option value="Pesticide">Pesticide</option>
            </select>
            <select
              name="cropId"
              value={form.cropId}
              onChange={(e) => setForm({ ...form, cropId: e.target.value })}
              className="app-select"
              required
            >
              <option value="">Crop</option>
              {crops.map((crop) => (
                <option key={crop.cropId} value={crop.cropId}>
                  {crop.cropName}
                </option>
              ))}
            </select>
            <input
              name="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Note"
              className="app-input"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="app-input"
              required
            />
            <button className="app-button-secondary" type="submit" disabled={adding}>
              <FaPlus />
              {adding ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>
      </section>

      {/* Timeline */}
      <section className="app-panel p-6">
        <div className="mb-5 flex items-center gap-3">
          <FaCalendarAlt className="text-xl text-emerald-300" />
          <h2 className="text-2xl font-semibold text-white">Activity timeline</h2>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            No activities found. Log your first activity above.
          </div>
        ) : (
          <div className="relative space-y-4 before:absolute before:left-[19px] before:top-2 before:h-[calc(100%-24px)] before:w-px before:bg-white/8">
            {filteredActivities.map((activity) => {
              const itemStyle = iconMap[activity.activityType] || iconMap.Watering;
              const cropName = crops.find((c) => c.cropId === activity.cropId)?.cropName || '';

              return (
                <article key={activity.activityId} className="relative flex gap-4 pl-12">
                  <div className={`absolute left-0 top-2 rounded-2xl p-3 text-lg ${itemStyle.tone}`}>
                    {itemStyle.icon}
                  </div>
                  <div className="app-panel-soft app-card-hover w-full p-5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {activity.activityType} — {cropName}
                        </h3>
                        {activity.description && (
                          <p className="mt-2 text-sm leading-7 text-slate-400">
                            {activity.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(activity.activityId)}
                        className="rounded-xl border border-white/8 p-2 text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/8 hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="mt-4 text-sm text-slate-500">{activity.date}</div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Activities;
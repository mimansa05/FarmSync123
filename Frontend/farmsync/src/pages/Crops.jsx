import React, { useEffect, useMemo, useState } from 'react';
import { createCrop, deleteCrop } from '../api/cropApi';
import { useFarm } from '../context/FarmContext';

/**
 * Crops Component
 * 
 * Manages the lifecycle of crops in a specific farm.
 * Provides functionality to view, search, filter, add, and delete crops.
 * 
 * @returns {JSX.Element} The rendered Crops management page
 */
const Crops = () => {
  // --- Hooks & Context ---

  /** @type {Object} Farm context for data and operations */
  const { farm, crops, setCrops, refreshCrops, loading } = useFarm();

  /** @type {Object} Local state for the crop creation form */
  const [form, setForm] = useState({ cropName: '', season: '', sowingDate: '', expectedHarvest: '' });

  /** @type {string} Search query for filtering crops by name */
  const [search, setSearch] = useState('');

  /** @type {string} Filter for categorizing crops by season */
  const [statusFilter, setStatusFilter] = useState('All');

  /** @type {string} Error message for feedback */
  const [error, setError] = useState('');

  /** @type {boolean} State to track the asynchronous adding operation */
  const [adding, setAdding] = useState(false);

  // --- Effects ---

  /**
   * Refreshes the crop list from the API whenever the component mounts
   * or the refresh function changes.
   */
  useEffect(() => {
    refreshCrops();
  }, [refreshCrops]);

  // --- Functions / Methods ---

  /**
   * Persists a new crop to the backend for the current farm.
   * 
   * @async
   * @param {Event} event - The form submission event
   * @returns {Promise<void>}
   */
  const addCrop = async (event) => {
    event.preventDefault();
    if (!farm) return;

    setAdding(true);
    setError('');

    try {
      /** @type {Object} Result of the API call to create a crop */
      const newCrop = await createCrop({
        cropName: form.cropName,
        season: form.season,
        sowingDate: form.sowingDate || new Date().toISOString().split('T')[0],
        expectedHarvest: form.expectedHarvest || new Date().toISOString().split('T')[0],
        farmId: farm.farmId,
      });

      // Update local state optimizing for immediate UI feedback
      setCrops((prev) => [newCrop, ...prev]);
      setForm({ cropName: '', season: '', sowingDate: '', expectedHarvest: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  /**
   * Removes a crop record from the system.
   * 
   * @async
   * @param {number} id - The unique identifier of the crop to delete
   * @returns {Promise<void>}
   */
  const handleDelete = async (id) => {
    try {
      await deleteCrop(id);
      // Optimistically remove from UI
      setCrops((prev) => prev.filter((c) => c.cropId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * useMemo - Memoized filtrations
   * 
   * Filters the list of crops based on the search string and season filter.
   * This is memoized to prevent redundant calculations on every render.
   */
  const filteredCrops = useMemo(() =>
    crops.filter((crop) => {
      // ✅ IMPROVED SEARCH LOGIC: Handles nulls and trims whitespace
      const normalizedSearch = search.trim().toLowerCase();
      const matchesSearch = (crop.cropName || '').toLowerCase().includes(normalizedSearch);
      
      const matchesStatus = statusFilter === 'All' || crop.season === statusFilter;
      
      return matchesSearch && matchesStatus;
    }),
    [crops, search, statusFilter]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        Loading farm data...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="app-panel p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="micro-label">Crop Management</div>
            <h1 className="page-title mt-2">Manage crop cycles with clarity</h1>
            <p className="page-subtitle mt-3 max-w-2xl">
              Track crop area, current growth stage, and progress in one compact workspace.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* --- Unified Management Controls --- */}
        <div className="mt-8">
          <form 
            onSubmit={addCrop} 
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1.2fr_0.8fr_1.2fr_0.8fr_1fr_1fr_auto] items-end"
          >
            {/* Search Part (Functional siblings, though inside form for layout) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Search crops</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="app-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Filter Season</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="app-select"
              >
                <option value="All">All Seasons</option>
                <option value="Rabi">Rabi</option>
                <option value="Kharif">Kharif</option>
                <option value="Summer">Summer</option>
                <option value="Annual">Annual</option>
              </select>
            </div>

            {/* Quick Add Fields */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500/80 ml-1">Crop Name</label>
              <input
                placeholder="e.g. Wheat"
                value={form.cropName}
                onChange={(e) => setForm({ ...form, cropName: e.target.value })}
                className="app-input"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500/80 ml-1">Season</label>
              <select
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
                className="app-select"
                required
              >
                <option value="">Select</option>
                <option value="Rabi">Rabi</option>
                <option value="Kharif">Kharif</option>
                <option value="Summer">Summer</option>
                <option value="Annual">Annual</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500/80 ml-1">Sowing Date</label>
              <input
                type="date"
                value={form.sowingDate}
                onChange={(e) => setForm({ ...form, sowingDate: e.target.value })}
                className="app-input"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-500/80 ml-1">Est. Harvest</label>
              <input
                type="date"
                value={form.expectedHarvest}
                onChange={(e) => setForm({ ...form, expectedHarvest: e.target.value })}
                className="app-input"
                required
              />
            </div>

            <button 
              className="app-button-secondary h-[44px] px-8 sm:col-span-2 lg:col-span-1" 
              type="submit" 
              disabled={adding}
            >
              {adding ? 'Adding...' : 'Quick Add'}
            </button>
          </form>
        </div>
      </section>

      {/* --- Display Grid --- */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredCrops.length === 0 ? (
          <div className="col-span-4 py-12 text-center text-slate-400">
            No crops found matching these criteria.
          </div>
        ) : (
          filteredCrops.map((crop) => (
            <article key={crop.cropId} className="app-panel app-card-hover p-5">
              <div className="flex items-start justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
                  {crop.season}
                </div>
                <button 
                  onClick={() => handleDelete(crop.cropId)}
                  className="text-xs font-medium text-slate-500 hover:text-red-400 transition-colors uppercase"
                  aria-label="Delete crop"
                >
                  Delete
                </button>
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-bold text-white">{crop.cropName}</h2>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default Crops;
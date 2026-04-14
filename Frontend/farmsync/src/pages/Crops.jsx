import React, { useEffect, useMemo, useState } from 'react';
import { FaPlus, FaSearch, FaSeedling, FaSlidersH, FaTrash } from 'react-icons/fa';
import { createCrop, deleteCrop } from '../api/cropApi';
import { useFarm } from '../context/FarmContext';

const Crops = () => {
  const { farm, crops, setCrops, refreshCrops, loading } = useFarm();

  const [form, setForm] = useState({ cropName: '', season: '', sowingDate: '', expectedHarvest: '' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  // ✅ FIXED HERE
  useEffect(() => {
    refreshCrops();
  }, [refreshCrops]);

  const addCrop = async (event) => {
    event.preventDefault();
    if (!farm) return;

    setAdding(true);
    setError('');

    try {
      const newCrop = await createCrop({
        cropName: form.cropName,
        season: form.season,
        sowingDate: form.sowingDate || new Date().toISOString().split('T')[0],
        expectedHarvest: form.expectedHarvest || new Date().toISOString().split('T')[0],
        farmId: farm.farmId,
      });

      setCrops((prev) => [newCrop, ...prev]);
      setForm({ cropName: '', season: '', sowingDate: '', expectedHarvest: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCrop(id);
      setCrops((prev) => prev.filter((c) => c.cropId !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredCrops = useMemo(() =>
    crops.filter((crop) => {
      const matchesSearch = crop.cropName?.toLowerCase().includes(search.toLowerCase());
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

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.35fr_0.8fr_auto]">
          <label className="relative block">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crops..."
              className="app-input pl-11"
            />
          </label>

          <label className="relative block">
            <FaSlidersH className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="app-select pl-11"
            >
              <option>All</option>
              <option>Rabi</option>
              <option>Kharif</option>
              <option>Summer</option>
              <option>Annual</option>
            </select>
          </label>

          <form onSubmit={addCrop} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              placeholder="Crop name"
              value={form.cropName}
              onChange={(e) => setForm({ ...form, cropName: e.target.value })}
              className="app-input"
              required
            />
            <select
              value={form.season}
              onChange={(e) => setForm({ ...form, season: e.target.value })}
              className="app-select"
              required
            >
              <option value="">Season</option>
              <option value="Rabi">Rabi</option>
              <option value="Kharif">Kharif</option>
              <option value="Summer">Summer</option>
              <option value="Annual">Annual</option>
            </select>
            <input
              type="date"
              value={form.sowingDate}
              onChange={(e) => setForm({ ...form, sowingDate: e.target.value })}
              className="app-input"
              required
            />
            <input
              type="date"
              value={form.expectedHarvest}
              onChange={(e) => setForm({ ...form, expectedHarvest: e.target.value })}
              className="app-input"
              required
            />
            <button className="app-button-secondary sm:col-span-2 lg:col-span-4" type="submit" disabled={adding}>
              <FaPlus />
              {adding ? 'Adding...' : 'Quick Add'}
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredCrops.length === 0 ? (
          <div className="col-span-4 py-12 text-center text-slate-400">
            No crops found. Add your first crop above.
          </div>
        ) : (
          filteredCrops.map((crop) => (
            <article key={crop.cropId} className="app-panel app-card-hover p-5">
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-emerald-500/12 p-3 text-2xl text-emerald-300">
                  <FaSeedling />
                </div>
                <button onClick={() => handleDelete(crop.cropId)}>
                  <FaTrash />
                </button>
              </div>

              <div className="mt-5">
                <h2>{crop.cropName}</h2>
                <p>{crop.season}</p>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default Crops;
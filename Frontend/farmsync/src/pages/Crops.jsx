import React, { useState } from "react";
import { FaSeedling, FaPlus, FaTrash } from "react-icons/fa";

const Crops = () => {
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", area: "5 acres", status: "Growing", progress: 60 },
    { id: 2, name: "Rice", area: "3 acres", status: "Growing", progress: 45 },
    { name: "Corn", area: "4 acres", status: "Harvesting", progress: 90 },
    { name: "Sugarcane", area: "6 acres", status: "Growing", progress: 30 },
  ]);

  const [form, setForm] = useState({ name: "", area: "" });
  const [search, setSearch] = useState("");

  const addCrop = (e) => {
    e.preventDefault();
    const newCrop = {
      id: Date.now(),
      ...form,
      status: "Growing",
      progress: 10,
    };
    setCrops([newCrop, ...crops]);
    setForm({ name: "", area: "" });
  };

  const deleteCrop = (id) => {
    setCrops(crops.filter((c) => c.id !== id));
  };

  const filtered = crops.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-content p-6 space-y-6">
      
      {/* Add Crop */}
      <form onSubmit={addCrop} className="glass-panel p-4 rounded-xl flex gap-3">
        <input
          placeholder="Crop name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="p-2 border rounded w-full"
          required
        />
        <input
          placeholder="Area"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          className="p-2 border rounded w-full"
          required
        />
        <button className="bg-green-600 text-white px-4 rounded flex items-center gap-2">
          <FaPlus /> Add
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        placeholder="Search crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border"
      />

      {/* Crop List */}
      <div className="glass-panel p-6 rounded-3xl shadow-xl">
        <h1 className="text-xl font-bold mb-4 flex gap-2 items-center">
          <FaSeedling /> Crop Management
        </h1>

        {filtered.map((crop) => (
          <div key={crop.id} className="mb-4 p-4 bg-white/70 rounded-xl">
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">{crop.name}</h2>
                <p className="text-sm text-gray-500">{crop.area}</p>
              </div>

              <button
                onClick={() => deleteCrop(crop.id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>

            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${crop.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crops;
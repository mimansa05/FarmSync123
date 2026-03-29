import React, { useState } from "react";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const [form, setForm] = useState({
    type: "",
    crop: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addActivity = (e) => {
    e.preventDefault();

    // Validation
    if (!form.type || !form.crop) {
      alert("Please select type and crop");
      return;
    }

    const newActivity = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleString(),
      user: "You",
    };

    setActivities([newActivity, ...activities]);

    setForm({ type: "", crop: "", note: "" });
  };

  return (
    <div className="main-content p-6 space-y-6">

      {/* Form */}
      <form
        onSubmit={addActivity}
        className="glass-panel p-4 rounded-xl space-y-3"
      >
        <h2 className="font-semibold flex items-center gap-2">
          <FaPlus /> Add Activity
        </h2>

        {/* Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Activity Type</option>
          <option value="Watering">Watering</option>
          <option value="Fertilizer">Fertilizer</option>
          <option value="Harvest">Harvest</option>
          <option value="Pesticide">Pesticide</option>
        </select>

        {/* Crop */}
        <input
          name="crop"
          placeholder="Crop (e.g. Wheat)"
          value={form.crop}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Note */}
        <input
          name="note"
          placeholder="Optional note"
          value={form.note}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Activity
        </button>
      </form>

      {/* Activity List */}
      <div className="glass-panel p-6 rounded-3xl">
        <h1 className="text-xl font-bold mb-4 flex gap-2 items-center">
          <FaCalendarAlt /> Activities
        </h1>

        {activities.length === 0 && (
          <p className="text-gray-500">No activities yet</p>
        )}

        {activities.map((a) => (
          <div
            key={a.id}
            className="activity-item border-b pb-3 mb-3"
          >
            <p className="font-medium">
              {a.type} - {a.crop}
            </p>

            {a.note && (
              <p className="text-sm text-gray-600">{a.note}</p>
            )}

            <p className="text-xs text-gray-500">
              {a.date} • {a.user}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
import React, { useState, useEffect } from 'react';
import { FaBell, FaMoon, FaUser } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useFarm } from '../context/FarmContext';

const Settings = () => {
  const { farm, updateFarmDetails } = useFarm();
  const { theme, toggleTheme } = useTheme();

  const [farmData, setFarmData] = useState({
    farmName: farm?.farmName || '',
    location: farm?.location || '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (farm) {
      setFarmData({
        farmName: farm.farmName || '',
        location: farm.location || '',
      });
    }
  }, [farm]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateFarmDetails(farmData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  /** @type {Object} Local state for notification toggles */
  const [notifications, setNotifications] = useState({
    weather: true,
    activity: true,
    finance: false,
  });

  return (
    <div className="space-y-5">
      {/* --- Intro Section --- */}
      <section className="app-panel p-6 md:p-7">
        <div className="micro-label">Preferences</div>
        <h1 className="page-title mt-2">Personalize your FarmSync experience</h1>
        <p className="page-subtitle mt-3 max-w-2xl">
          Manage your account details, notification alerts, and accessibility settings.
        </p>
      </section>

      {/* --- Profile & Notifications --- */}
      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <article className="app-panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <FaUser className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Profile</h2>
          </div>
          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Display Name</label>
                <input className="app-input" defaultValue="Farmer" placeholder="Display name" readOnly />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                <input className="app-input" defaultValue="farmer@farmsync.com" placeholder="Email" readOnly />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Farm Name</label>
              <input 
                className="app-input" 
                value={farmData.farmName} 
                onChange={(e) => setFarmData({ ...farmData, farmName: e.target.value })}
                placeholder="Farm name" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 ml-1">Location</label>
              <input 
                className="app-input" 
                value={farmData.location} 
                onChange={(e) => setFarmData({ ...farmData, location: e.target.value })}
                placeholder="Location (e.g. North Valley)" 
              />
            </div>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="app-button-primary mt-2"
            >
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </article>

        <article className="app-panel p-6">
          <div className="mb-5 flex items-center gap-3">
            <FaBell className="text-emerald-300" />
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { key: 'weather', label: 'Weather alerts' },
              { key: 'activity', label: 'Field activity reminders' },
              { key: 'finance', label: 'Expense summary emails' },
            ].map((item) => (
              <div key={item.key} className="app-panel-soft flex items-center justify-between p-4">
                <span className="text-sm text-slate-700 dark:text-slate-200">{item.label}</span>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                  className={`relative h-7 w-12 rounded-full transition ${
                    notifications[item.key] ? 'bg-emerald-500' : 'bg-white/10'
                  }`}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                      notifications[item.key] ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* --- Theme Settings --- */}
      <section className="app-panel p-6">
        <div className="mb-5 flex items-center gap-3">
          <FaMoon className="text-emerald-300" />
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Appearance</h2>
        </div>
        <div className="app-panel-soft flex items-center justify-between p-4">
          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-white">Dark mode</div>
            <div className="mt-1 text-sm text-slate-400">Reduce eye strain with a premium dark interface.</div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative h-7 w-12 rounded-full transition ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-white/10'}`}
            aria-label="Toggle dark mode"
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;


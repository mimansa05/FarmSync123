import React, { useState, useEffect } from 'react';
import { FaBell, FaMoon, FaSun, FaUser } from 'react-icons/fa';
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

  const [notifications, setNotifications] = useState({
    weather: true,
    activity: true,
    finance: false,
  });

  return (
    <div className="space-y-6">
      <section className="app-panel p-6 md:p-8">
        <div className="micro-label">Preferences</div>
        <h1 className="page-title mt-2">Personalize your FarmSync experience</h1>
        <p className="page-subtitle mt-3 max-w-2xl">
          Manage your account details, notification alerts, and accessibility settings.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="app-panel p-6">
          <div className="mb-6 flex items-center gap-3">
            <FaUser className="text-[var(--accent-color)] text-xl" />
            <h2 className="text-xl font-bold">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">Display Name</label>
                <input className="app-input" defaultValue="Farmer" readOnly />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">Email Address</label>
                <input className="app-input" defaultValue="farmer@farmsync.com" readOnly />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">Farm Name</label>
              <input 
                className="app-input" 
                value={farmData.farmName} 
                onChange={(e) => setFarmData({ ...farmData, farmName: e.target.value })}
                placeholder="Farm name" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] ml-1">Location</label>
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
              className="app-button-primary w-full mt-4 py-3"
            >
              {isSaving ? 'Saving...' : saveSuccess ? 'Changes Saved!' : 'Save Profile Changes'}
            </button>
          </div>
        </article>

        <div className="space-y-6">
          <article className="app-panel p-6">
            <div className="mb-6 flex items-center gap-3">
              <FaMoon className="text-[var(--accent-color)] text-xl" />
              <h2 className="text-xl font-bold">Appearance</h2>
            </div>
            <div className="app-panel-soft flex items-center justify-between p-4 border border-[var(--border-color)]">
              <div>
                <div className="font-bold text-[var(--text-primary)]">Dark Mode</div>
                <div className="text-sm text-[var(--text-secondary)]">Enable a darker interface to reduce eye strain.</div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-[var(--accent-color)]' : 'bg-[var(--border-color)]'}`}
                aria-label="Toggle Dark Mode"
              >
                <div className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center ${theme === 'dark' ? 'left-7' : 'left-1'}`}>
                  {theme === 'dark' ? <FaMoon className="text-[10px] text-[var(--accent-color)]" /> : <FaSun className="text-[10px] text-orange-400" />}
                </div>
              </button>
            </div>
          </article>

          <article className="app-panel p-6">
            <div className="mb-6 flex items-center gap-3">
              <FaBell className="text-[var(--accent-color)] text-xl" />
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="space-y-3">
              {[
                { key: 'weather', label: 'Weather Alerts' },
                { key: 'activity', label: 'Field Reminders' },
                { key: 'finance', label: 'Expense Reports' },
              ].map((item) => (
                <div key={item.key} className="app-panel-soft flex items-center justify-between p-4 border border-[var(--border-color)]">
                  <span className="text-sm font-medium">{item.label}</span>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      notifications[item.key] ? 'bg-[var(--accent-color)]' : 'bg-[var(--border-color)]'
                    }`}
                  >
                    <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${notifications[item.key] ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Settings;

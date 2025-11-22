import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const defaultSettings = {
  temperatureUnit: "celsius",
  windSpeedUnit: "ms",
};

/**
 * Load settings from localStorage with validation
 */
const loadSettings = () => {
  try {
    const saved = localStorage.getItem("weatherSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate structure
      if (parsed.temperatureUnit && parsed.windSpeedUnit) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return defaultSettings;
};

/**
 * Settings Provider Component
 */
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(loadSettings);

 useEffect(() => {
    try {
      localStorage.setItem("weatherSettings", JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Hook to use settings context
 */
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
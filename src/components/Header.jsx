import React, { useState } from "react";
import logo from "./assets/icons/weatherPulseLogo.png";
import SearchBar from "./SearchBar";
import Settings from "./Settings";
import { Button } from "./ui/button";
import { Settings as SettingsIcon } from "lucide-react";

const Header = ({ onSearch, onSettingsChange }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("weatherSettings");
    return saved ? JSON.parse(saved) : { temperatureUnit: "celsius", windSpeedUnit: "ms" };
  });

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    if (onSettingsChange) {
      onSettingsChange(newSettings);
    }
  };

  return (
    <>
      <header className="px-4 sm:px-8 py-4 flex flex-col items-center justify-between gap-4 md:flex-row bg-background/10 backdrop-blur-sm border-b border-border/20">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="WeatherPulse Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain transition-transform hover:scale-105"
            loading="eager"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary drop-shadow-lg">
            WeatherPulse
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
          <SearchBar onSearch={onSearch} />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="flex-shrink-0"
            aria-label="Open settings"
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChange={handleSettingsChange}
        currentSettings={settings}
      />
    </>
  );
};

export default Header;
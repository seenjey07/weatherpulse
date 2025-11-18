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
      <header className="glass-card sticky top-0 z-50 px-4 sm:px-8 py-4 flex flex-col items-center justify-between gap-4 md:flex-row bg-background/10 border-b border-border/20 rounded-b-3xl">
        <div className="flex items-center gap-1">
          <img
            src={logo}
            alt="WeatherPulse Logo"
            className="w-14 h-14 object-contain transition-transform hover:scale-105"
            loading="eager"
          />
          <h1 className="text-xl sm:text-md font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            WeatherPulse
          </h1>
        </div>

        <div className="flex items-center gap-1 w-full md:w-auto justify-center md:justify-end">
          <div className="flex-1 md:flex-none ml-3">
            <SearchBar onSearch={onSearch} />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="flex-shrink-0 h-10 w-10 self-center"
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
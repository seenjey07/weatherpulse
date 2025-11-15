import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Settings as SettingsIcon, X, Thermometer, Gauge } from "lucide-react";

const Settings = ({ isOpen, onClose, onSettingsChange, currentSettings }) => {
  const [settings, setSettings] = useState(currentSettings || {
    temperatureUnit: "celsius",
    windSpeedUnit: "ms",
  });

  useEffect(() => {
    if (currentSettings) {
      setSettings(currentSettings);
    }
  }, [currentSettings]);

  const handleSave = () => {
    localStorage.setItem("weatherSettings", JSON.stringify(settings));
    onSettingsChange(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-2 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Settings</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close settings"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Temperature Unit */}
          <div className="mb-6">
            <label className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
              <Thermometer className="h-4 w-4" />
              Temperature Unit
            </label>
            <div className="flex gap-2">
              <Button
                variant={settings.temperatureUnit === "celsius" ? "default" : "outline"}
                onClick={() => setSettings({ ...settings, temperatureUnit: "celsius" })}
                className="flex-1"
              >
                Celsius (°C)
              </Button>
              <Button
                variant={settings.temperatureUnit === "fahrenheit" ? "default" : "outline"}
                onClick={() => setSettings({ ...settings, temperatureUnit: "fahrenheit" })}
                className="flex-1"
              >
                Fahrenheit (°F)
              </Button>
            </div>
          </div>

          {/* Wind Speed Unit */}
          <div className="mb-6">
            <label className="flex items-center gap-2 mb-3 text-sm font-medium text-foreground">
              <Gauge className="h-4 w-4" />
              Wind Speed Unit
            </label>
            <div className="flex gap-2">
              <Button
                variant={settings.windSpeedUnit === "ms" ? "default" : "outline"}
                onClick={() => setSettings({ ...settings, windSpeedUnit: "ms" })}
                className="flex-1"
              >
                m/s
              </Button>
              <Button
                variant={settings.windSpeedUnit === "kmh" ? "default" : "outline"}
                onClick={() => setSettings({ ...settings, windSpeedUnit: "kmh" })}
                className="flex-1"
              >
                km/h
              </Button>
              <Button
                variant={settings.windSpeedUnit === "mph" ? "default" : "outline"}
                onClick={() => setSettings({ ...settings, windSpeedUnit: "mph" })}
                className="flex-1"
              >
                mph
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
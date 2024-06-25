import React from "react";

const Footer = () => {
  return (
    <div className="bg-white/10 p3 md:px-8 md:py-2 flex flex-row justify-evenly align-middle font-mono">
      <p className="text-xs text-gray-200">
        &copy; {new Date().getFullYear()} WeatherPulse
      </p>
      <p className="text-xs text-gray-200">Powered by OpenWeather API</p>
    </div>
  );
};

export default Footer;

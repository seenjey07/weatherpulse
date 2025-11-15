import React from "react";
import logo from "./assets/icons/weatherPulseLogo.png";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
  return (
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

      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;
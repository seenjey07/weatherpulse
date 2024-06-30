import React from "react";
import logo from "./assets/icons/weatherPulseLogo.png";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
  return (
    <div className="px-8 py-2 flex flex-col items-center justify-between md:flex-row">
      <div className="flex items-center mb-2 md:mb-0">
        <img
          src={logo}
          alt="weatherPulseLogo"
          style={{
            width: "130px",
            height: "130px",
            objectFit: "contain",
          }}
          className="logo mb-4 md:mb-0"
        />
        <h2 className="text-xl font-bold font-mono text-amber-400 mr-4 md:mr-0">
          WeatherPulse
        </h2>
      </div>

      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default Header;

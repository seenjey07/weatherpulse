import React from "react";
import logo from "./assets/icons/weatherPulseLogo.png";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }) => {
  return (
    <div className="px-8 py-2 flex items-center justify-between">
      <div className="flex flex-row items-center flex-wrap">
        <img
          src={logo}
          alt="weatherPulseLogo"
          style={{
            width: "130px",
            height: "130px",
            objectFit: "contain",
          }}
          className="logo"
        />
        <h2 className="text-xl font-bold font-mono text-amber-400">
          WeatherPulse
        </h2>
      </div>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default Header;

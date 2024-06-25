import React from "react";
import logo from "./assets/icons/weatherPulseLogo.png";

const Header = () => {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 flex items-center justify-start">
      <img
        src={logo}
        alt="weatherPulseLogo"
        style={{
          width: "130px",
          height: "130px",
          objectFit: "contain",
          objectPosition: "start",
        }}
        className="logo"
      />
      <h2 className="text-xl font-bold font-mono text-amber-400">
        WeatherPulse
      </h2>
    </div>
  );
};

export default Header;

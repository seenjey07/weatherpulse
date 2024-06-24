import React from "react";
import logo from "./assets/icons/weatherPulseLogo.png";

const NavBar = () => {
  return (
    <>
      <nav>
        <h1 className="header">WeatherPulse</h1>
        <img src={logo} alt="weatherPulseLogo" />
      </nav>
    </>
  );
};

export default NavBar;

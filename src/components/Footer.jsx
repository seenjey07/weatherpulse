import React from "react";

const Footer = () => {
  return (
    <div>
      <p>Powered by OpenWeather</p>
      <p>&copy; {new Date().getFullYear()} WeatherPulse</p>
    </div>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background/10 backdrop-blur-sm border-t border-border/20 px-4 py-3 md:px-8 md:py-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-muted-foreground text-sm">
        <p className="text-center">
          &copy; {new Date().getFullYear()} WeatherPulse
        </p>
        <span className="hidden sm:inline">•</span>
        <p className="text-center">
          Powered by{" "}
          <a
            href="https://openweathermap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline transition-colors"
            aria-label="OpenWeather API website"
          >
            OpenWeather API
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
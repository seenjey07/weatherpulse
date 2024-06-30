import React, { useState } from "react";
import axios from "axios";
import { Input } from "./ui/input";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const fetchLocations = async (query) => {
    const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
    url.searchParams.append("appid", "95450dccd5e90daf362271ca732cee70");
    url.searchParams.append("limit", "5");
    url.searchParams.append("q", query);

    try {
      const response = await axios.get(url.toString());
      setFilteredLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations", error);
      setFilteredLocations([]);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setCity(value);

    if (value.length > 0) {
      fetchLocations(value);
    }
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (city.trim()) {
  //     onSearch(city);
  //     setCity("");
  //     setFilteredLocations([]);
  //   } else {
  //     setFilteredLocations([]);
  //   }
  // };

  const handleLocationSelect = (location) => {
    onSearch(location.name);
    setCity("");
    setFilteredLocations([]);
  };

  return (
    <div className="relative flex flex-col items-center mb-4 md:mb-0 text-xs justify-center md:items-end rounded-md">
      <Input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter city name..."
        className="absolute py-1 px-2 bg-yellow-100 outline-none w-56 h-8"
        required
      />

      <div className="absolute top-4 w-56 opacity-85 z-50 mt-1">
        {filteredLocations.length > 0 && city.length >= 1 ? (
          <ul className="rounded-md p-1 text-sm bg-yellow-100 w-full overflow-auto scrollbar-thin scrollbar-bg-yellow-300">
            {filteredLocations.map((location) => (
              <li
                key={`${location.lat}-${location.lon}`}
                onClick={() => handleLocationSelect(location)}
                className="cursor-pointer text-nowrap hover:bg-yellow-200"
              >
                {location.name}, {location.state}, {location.country}
              </li>
            ))}
          </ul>
        ) : (
          city.length > 0 && (
            <p className="absolute text-nowrap text-red-500 p-1 mt-1 w-fit text-xs bg-red-100 rounded-md">
              Oops! Please try another city.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;

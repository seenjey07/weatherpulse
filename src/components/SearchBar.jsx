import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setCity(value);

    if (value.length > 2) {
      const filtered = [].filter((location) =>
        location.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity("");
    setFilteredLocations([]);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex flex-row m-auto min-w-1/2">
        <Input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
          autoComplete="on"
          required
        />
        <Button type="submit" className="ml-2">
          Search
        </Button>

        {filteredLocations.length > 0 && (
          <ul>
            {filteredLocations.map((location) => (
              <li key={location.id}>{location.name}</li>
            ))}
          </ul>
        )}

        {city === 0 && <p>No locations found.</p>}
      </form>
    </>
  );
};

export default SearchBar;

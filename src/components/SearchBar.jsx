import React, { useState } from "react";

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
    <div className="searchBar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name"
          autoComplete="on"
          required
        />
        {filteredLocations.length > 0 && (
          <ul>
            {filteredLocations.map((location) => (
              <li key={location.id}>{location.name}</li>
            ))}
          </ul>
        )}
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

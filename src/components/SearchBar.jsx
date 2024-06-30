import React, { useState } from "react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  const fetchLocations = async (query) => {
    const url = new URL("https://api.openweathermap.org/geo/1.0/direct");
    url.searchParams.append("appid", "95450dccd5e90daf362271ca732cee70");
    url.searchParams.append("limit", "7");
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

    if (value.length > 2) {
      fetchLocations(value);
    } else {
      setFilteredLocations([]);
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
    console.log("Location Selected", location);
    setCity(location.name);
    onSearch(city);
    setCity("");
    setFilteredLocations([]);
  };

  return (
    <>
      {/* <form onSubmit={handleSearch} className="flex flex-row m-auto text-sm"> */}
      <div className="flex flex-col text-xs justify-center items-end gap-2">
        <Input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city name..."
          className="rounded-md p-1 bg-yellow-100 outline-none w-60"
          required
        />

        <ScrollArea className="rounded-md z-50">
          {filteredLocations.length > 0 && city.length > 0 ? (
            <div className="p-1 leading-none bg-yellow-100 rounded-md">
              <ul className="leading-none text-sm overflow-y-auto w-52 h-5rem">
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
            </div>
          ) : (
            filteredLocations.length > 2 &&
            city.length > 0 && (
              <div className="mt-1 leading-none bg-red-100 rounded-md">
                <ul>
                  <li className="text-nowrap m-1 p-1 text-red-400">
                    Oops! Please try another city.
                  </li>
                </ul>
              </div>
            )
          )}
        </ScrollArea>
      </div>

      {/* <Button className="ml-2">Search</Button>
      </form> */}
    </>
  );
};

export default SearchBar;

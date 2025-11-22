import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("weatherFavorites");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load favorites:', error);
  }
  return [];
};

/**
 * Favorites Provider Component
 */
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    try {
      localStorage.setItem("weatherFavorites", JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, [favorites]);

  const addFavorite = (location) => {
    const favorite = {
      name: location.name,
      country: location.country,
      state: location.state,
      lat: location.lat,
      lon: location.lon,
      id: `${location.lat}-${location.lon}`,
    };

    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === favorite.id)) {
        return prev;
      }
      return [...prev, favorite];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (lat, lon) => {
    const id = `${lat}-${lon}`;
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Hook to use favorites context
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
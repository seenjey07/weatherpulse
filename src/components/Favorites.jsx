import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useFavorites } from "../contexts/FavoritesContext";
import { Star, X, MapPin } from "lucide-react";

const Favorites = ({ onLocationSelect, onClose }) => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Card className="absolute top-full right-0 mt-2 w-64 bg-card border-2 shadow-xl z-50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            No favorite locations yet. Add locations by clicking the star icon.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="absolute top-full right-0 mt-2 w-64 max-h-96 overflow-y-auto bg-card border-2 shadow-xl z-50">
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-2 px-2">
          <h3 className="text-sm font-semibold">Favorites</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
            aria-label="Close favorites"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <ul className="space-y-1">
          {favorites.map((favorite) => (
            <Star key={favorite.id} 
            li
              className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer group"
              onClick={() => {
                onLocationSelect(favorite.name);
                onClose();
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onLocationSelect(favorite.name);
                  onClose();
                }
              }}
              aria-label={`Select ${favorite.name}`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{favorite.name}</p>
                  {favorite.state && (
                    <p className="text-xs text-muted-foreground truncate">
                      {favorite.state}, {favorite.country}
                    </p>
                  )}
                  {!favorite.state && (
                    <p className="text-xs text-muted-foreground">{favorite.country}</p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(favorite.id);
                }}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${favorite.name} from favorites`}
              >
                <X className="h-3 w-3" />
              </Button>
              </Star>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Favorites;
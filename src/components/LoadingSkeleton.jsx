import React from "react";
import { Card, CardContent } from "./ui/card";

/**
 * Skeleton loader for weather card
 */
export const WeatherCardSkeleton = () => {
  return (
    <Card className="bg-gradient-to-br from-cyan-50/90 via-teal-50/90 to-emerald-50/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg overflow-hidden animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="h-8 w-64 bg-muted rounded"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 mb-6">
          <div className="w-32 h-32 bg-muted rounded-full"></div>
          <div className="text-center">
            <div className="h-20 w-32 bg-muted rounded mx-auto mb-2"></div>
            <div className="h-6 w-48 bg-muted rounded mx-auto"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Skeleton loader for weather metrics
 */
export const WeatherMetricsSkeleton = () => {
  return (
    <Card className="bg-gradient-to-br from-cyan-50/90 via-teal-50/90 to-emerald-50/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg animate-pulse">
      <CardContent className="p-4 md:p-6">
        <div className="h-6 w-32 bg-muted rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="bg-card/60 backdrop-blur-sm border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-muted rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-3 w-16 bg-muted rounded mb-2"></div>
                    <div className="h-4 w-20 bg-muted rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Main loading skeleton component
 */
const LoadingSkeleton = () => {
  return (
    <div className="m-auto max-w-4xl px-4 sm:px-6 z-40 mt-4 space-y-6">
      <WeatherCardSkeleton />
      <WeatherMetricsSkeleton />
    </div>
  );
};

export default LoadingSkeleton;
import React, { useState, useEffect } from "react";

interface GeolocationData {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const useGeolocation = (): GeolocationData => {
  const [geolocation, setGeolocation] = useState<GeolocationData>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setGeolocation({
            latitude: null,
            longitude: null,
            error: error.message,
          });
        },
      );
    } else {
      setGeolocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser.",
      });
    }
  }, []);

  return geolocation;
};

export default useGeolocation;

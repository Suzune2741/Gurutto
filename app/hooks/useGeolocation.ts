import { useState, useEffect } from "react";
import { getCurrentPosition } from "../utils/geolocation";

export const useGeolocation = () => {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchCoords = async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await getCurrentPosition();
      setCoords(position.coords);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCoords();
  }, []);

  return { coords, error, loading, refetch: fetchCoords };
};

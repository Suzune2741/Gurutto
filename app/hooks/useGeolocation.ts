import { useState, useEffect } from "react";
import { getCurrentPosition } from "../utils/geolocation";

/**
 * 現在地を取得する
 * @returns coords 取得した位置情報
 * @returns error エラー情報
 * @returns loading 取得中かどうか
 * @returns refetch 再取得するための関数
 */
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

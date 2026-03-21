import { useState, useEffect } from "react";
import { reverseGeocode } from "~/utils/reverseGeocoder";
import { useGeolocation } from "./useGeolocation";

export const useCurrentAddress = (): any => {
  const { coords, error, loading } = useGeolocation();
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    if (!coords) return;
    reverseGeocode(coords.latitude, coords.longitude)
      .then((result) => setAddress(result.joinAddress))
      .catch((error) => console.log(error));
  }, [coords]);
  return { coords, address, error, loading };
};

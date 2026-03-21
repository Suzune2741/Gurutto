import { useState, useEffect } from "react";
import { reverseGeocode } from "~/utils/reverseGeocoder";
import { useGeolocation } from "./useGeolocation";

type UseCurrentAddressReturn = {
  coords: GeolocationCoordinates | null;
  address: string | null;
  error: Error | null;
  loading: boolean;
};
/**
 * 現在地の座標を取得し、逆ジオコーディングで住所文字列に変換する
 * @returns coords 取得した位置情報
 * @returns address 座標から変換された現在地の住所
 * @returns error 位置情報の取得に失敗した場合のエラー情報
 * @returns loading 位置情報を取得中かどうか
 */
export const useCurrentAddress = (): UseCurrentAddressReturn => {
  const { coords, error, loading } = useGeolocation();
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    if (!coords) return;
    reverseGeocode(coords.latitude, coords.longitude)
      .then((result) => setAddress(result.joinAddress))
      .catch((err) => console.log(err));
  }, [coords]);
  return { coords, address, error, loading };
};

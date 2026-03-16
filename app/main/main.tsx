import { Button } from "~/components/Button";
import { SearchField } from "../components/SearchField";
import { useGeolocation } from "~/hooks/useGeolocation";
import { reverseGeocode } from "~/utils/reverseGeocoder";
import { useEffect, useState } from "react";
export function Main() {
  const { coords, error, loading } = useGeolocation();
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    if (!coords) return;
    reverseGeocode(coords.latitude, coords.longitude)
      .then((result) => setAddress(result.joinAddress))
      .catch(() => setAddress("住所の取得に失敗しました"));
    console.log("address", address);
  }, [coords]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-1/2">
        <p className="text-4xl">きゃっちこぴー</p>
        <div>
          <p className="text-2xl">現在地付近のレストランを検索する</p>
          <div className="flex flex-row items-center">
            <p className="text-xl">現在地: {address}</p>
          </div>
          <div>
            <p className="text-2xl">ジャンルを指定して検索する</p>
            <SearchField lat={coords?.latitude} lng={coords?.longitude} />
          </div>
        </div>
      </div>
    </>
  );
}

import { MdPlace } from "react-icons/md";
import { SearchField } from "../components/SearchField";
import { useGeolocation } from "~/hooks/useGeolocation";
import { reverseGeocode } from "~/utils/reverseGeocoder";
import { useEffect, useState } from "react";
import { Slider } from "~/components/Slider";
export function Main() {
  const { coords, error, loading } = useGeolocation();
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => {
    if (!coords) return;
    reverseGeocode(coords.latitude, coords.longitude)
      .then((result) => setAddress(result.joinAddress))
      .catch((error) => console.log(error));
    console.log("address", address);
  }, [coords]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-1/2 gap-5">
        <p className="text-4xl">きゃっちこぴー</p>
        <div>
          <p className="text-2xl">現在地付近のレストランを検索する</p>
          <div className="flex flex-row items-center border rounded-3xl px-2">
            <MdPlace size={20} />
            <p className="text-xl">現在地: {address ?? "取得中"}</p>
          </div>
        </div>
        <div>
          <SearchField lat={coords?.latitude} lng={coords?.longitude} />
        </div>
      </div>
    </>
  );
}

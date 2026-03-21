import { MdPlace } from "react-icons/md";
import { SearchField } from "../components/SearchField";
import { useCurrentAddress } from "~/hooks/useCurrentAddress";
/**
 * トップページ
 */
export function Main() {
  const { coords, address, error, loading } = useCurrentAddress();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-1/2 gap-5">
        <p className="text-4xl">きゃっちこぴー</p>
        <div>
          <p className="text-2xl">現在地付近のレストランを検索する</p>
          <div className="flex flex-row items-center border rounded-3xl mt-1 px-3 w-fit">
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

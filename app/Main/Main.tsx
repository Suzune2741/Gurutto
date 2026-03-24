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
        <div className="text-center mb-8 flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest text-orange-600 ">
            ぐるっとグルメ探し
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-80 mt-2">
            現在地から、今開いてるお店をパッと検索。
          </p>
        </div>
        <div className="flex flex-col items-center w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-10">
          <p className="text-xl font-bold opacity-90 text-center">
            現在地付近のレストランを検索する
          </p>
          <div className="flex flex-row items-center border border-gray-300 rounded-3xl bg-theme-bg  my-2 px-3 mx-auto w-fit shadow-sm">
            <MdPlace size={22} className=" text-red-500 shrink-0" />
            <p className="text-xl ml-1">
              {loading ? "現在地を取得中" : (address ?? "未取得")}
            </p>
          </div>
          <div>
            <SearchField lat={coords?.latitude} lng={coords?.longitude} />
          </div>
        </div>
      </div>
    </>
  );
}

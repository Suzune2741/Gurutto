import { useState } from "react";
import { MdPlace } from "react-icons/md";
import { useNavigation, useSearchParams } from "react-router";
import { DropDownList } from "~/components/DropDownList";
import { Pagination } from "~/components/Pagination";
import { SearchField } from "~/components/SearchField";
import { ShopCard } from "~/components/ShopCard";
import { FaListUl, FaTh } from "react-icons/fa";
import { ShopList } from "~/components/ShopList";
import { useCurrentAddress } from "~/hooks/useCurrentAddress";
import type { Shop } from "~/types/hotpepper";

type Props = {
  shops: Shop[];
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};
type ViewStatus = "Card" | "List";
const COUNT_OPTIONS = [
  { value: "10", label: "10件" },
  { value: "20", label: "20件" },
  { value: "50", label: "50件" },
  { value: "100", label: "100件" },
];
export const ResearchPage = ({
  shops,
  totalItems,
  currentPage,
  itemsPerPage,
}: Props) => {
  const navigation = useNavigation();
  const isSearching = navigation.state === "loading";
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [viewStatus, setViewStatus] = useState<ViewStatus>("Card");
  const { coords, address, loading } = useCurrentAddress();

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));
    setSearchParams(newParams);
  };
  const currentCount = searchParams.get("count") || "10";
  const handleCountChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("count", val);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };
  return (
    <div className="flex flex-col items-center my-5 gap-1 w-full">
      <p className="text-xl">検索する</p>
      <div className="flex flex-row items-center border rounded-3xl mt-1 px-3 w-fit">
        <MdPlace size={22} className=" text-red-500 shrink-0" />
        <p className="text-xl ml-1">
          {loading ? "現在地を取得中" : (address ?? "未取得")}
        </p>
      </div>
      <SearchField lat={coords?.latitude} lng={coords?.longitude} />
      {totalItems > 0 && !isSearching && (
        <div className="w-full flex justify-end px-0 min-[375px]:px-5 md:px-20 mb-2">
          <div className="flex flex-row items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-200 p-1 rounded-md mt-auto">
              <button
                onClick={() => setViewStatus("Card")}
                className={`p-2 rounded transition-colors ${
                  viewStatus === "Card"
                    ? "bg-white shadow-sm text-orange-500"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
                title="カード表示"
              >
                <FaTh size={20} />
              </button>
              <button
                onClick={() => setViewStatus("List")}
                className={`p-2 rounded transition-colors ${
                  viewStatus === "List"
                    ? "bg-white shadow-sm text-orange-500"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
                title="リスト表示"
              >
                <FaListUl size={20} />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-gray-700">表示件数</p>
              <DropDownList
                value={currentCount}
                onChange={handleCountChange}
                options={COUNT_OPTIONS}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center my-2">
        <p className="text-2xl">
          {isSearching
            ? "検索中..."
            : totalItems === 0
              ? "該当なし"
              : `${totalItems}件ヒットしました`}
        </p>
      </div>
      {viewStatus === "Card" ? (
        <div className="flex flex-wrap justify-center gap-3 mx-5">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 w-full px-5">
          {shops.map((shop) => (
            <div key={shop.id} className="w-full md:w-2/3 lg:w-1/2">
              <ShopList shop={shop} />
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

import { useState, useEffect } from "react";
import { MdPlace } from "react-icons/md";
import { useNavigation, useSearchParams } from "react-router";
import { DropDownList } from "~/components/DropDownList";
import { Pagination } from "~/components/Pagination";
import { SearchField } from "~/components/SearchField";
import { ShopCard } from "~/components/ShopCard";
import { useGeolocation } from "~/hooks/useGeolocation";
import { reverseGeocode } from "~/utils/reverseGeocoder";

type Props = {
  shops: any;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

export const ResearchPage = ({
  shops,
  totalItems,
  currentPage,
  itemsPerPage,
}: Props) => {
  const navigation = useNavigation();
  const isSearching = navigation.state === "loading";
  const { coords } = useGeolocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [address, setAddress] = useState<string | null>(null);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", String(newPage));

    setSearchParams(newParams);
  };
  useEffect(() => {
    if (!coords) return;
    reverseGeocode(coords.latitude, coords.longitude)
      .then((result) => setAddress(result.joinAddress))
      .catch((error) => console.log(error));
  }, [coords]);
  console.log(currentPage, totalItems);
  return (
    <div className="flex flex-col items-center my-5 gap-1">
      <p className="text-xl">検索する</p>
      <div className="flex flex-row items-center border rounded-3xl mt-1 px-3 w-fit">
        <MdPlace size={20} />
        <p className="text-xl ">現在地: {address ?? "取得中"}</p>
      </div>
      <SearchField lat={coords?.latitude} lng={coords?.longitude} />
      <div className="flex flex-col items-center">
        <p className="font-bold text-gray-700">表示件数</p>
        <DropDownList />
      </div>
      {isSearching && <p>検索中...</p>}
      {shops.length === 0 && !isSearching ? (
        <p>該当なし</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mx-5">
            {shops.map((shop: any) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

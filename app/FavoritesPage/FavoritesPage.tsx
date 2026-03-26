import { useState } from "react";
import { FaTh, FaListUl } from "react-icons/fa";
import { Link } from "react-router";
import { DropDownList } from "~/components/DropDownList";
import { Pagination } from "~/components/Pagination";
import { ShopCard } from "~/components/ShopCard";
import { ShopList } from "~/components/ShopList";
import { useFavoritesContext } from "~/contexts/FavoritesContext";

type ViewStatus = "Card" | "List";

export const FavoritesPage = () => {
  const { favorites } = useFavoritesContext();
  const [viewStatus, setViewStatus] = useState<ViewStatus>("Card");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = favorites.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedFavorites = favorites.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (val: string) => {
    setItemsPerPage(Number(val));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center my-5 gap-4 w-full px-4">
      <h1 className="text-3xl font-bold text-amber-900 mb-4">
        お気に入り一覧 ({totalItems}件)
      </h1>
      {totalItems > 0 ? (
        <div className="w-full max-w-6xl flex justify-end mb-2">
          <div className="flex flex-row items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md mt-auto shadow-sm">
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
              <p className="font-bold text-gray-700 text-sm mb-1">表示件数</p>
              <DropDownList
                value={String(itemsPerPage)}
                onChange={handleItemsPerPageChange}
                options={[
                  { value: "10", label: "10件" },
                  { value: "20", label: "20件" },
                  { value: "50", label: "50件" },
                ]}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-lg md:text-xl">
            お気に入りに登録されている飲食店はありません
          </p>
          <div className="w-full flex justify-end px-2 md:px-7 mt-5 mb-10">
            <Link
              to="/research"
              className="text-blue-700 hover:underline flex items-center"
            >
              ←検索ページへ戻る
            </Link>
          </div>
        </>
      )}
      {viewStatus === "Card" ? (
        <div className="flex flex-wrap justify-center gap-5 w-full max-w-6xl">
          {displayedFavorites.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
          {displayedFavorites.map((shop) => (
            <div key={shop.id} className="w-full">
              <ShopList shop={shop} />
            </div>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

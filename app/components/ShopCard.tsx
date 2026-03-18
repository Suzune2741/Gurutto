import { Link } from "react-router";
import { getDate } from "~/utils/getDate";
import { getNowOpen } from "~/utils/getNowOpen";

/**
 * 検索時の一覧表示用コンポーネント
 * @param props
 * @param props.shop APIから取得したデータ
 */
export const ShopCard = ({ shop }: any) => {
  const date = getDate();
  const nowOpen = getNowOpen(date, shop.open);
  return (
    <Link to={`/research/${shop.id}`}>
      <div className="rounded overflow-hidden shadow-lg flex flex-row w-80 h-40 my-2 bg-[#fff9f2] hover:bg-[#f5ede0]">
        <img
          className="object-cover w-40 h-40 shrink-0 "
          src={shop.logo_image}
          alt={shop.name}
        />
        <div className="p-3 flex flex-col min-w-0 overflow-hidden w-full">
          <div>
            <div className="font-bold text-lg  text-gray-900 mb-2 line-clamp-2 wrap-break-word">
              {shop.name}
            </div>
            <div className="text-gray-700 text-sm line-clamp-2 wrap-break-word overflow-hidden">
              {shop.access}
            </div>
          </div>
          <div
            className={[
              "px-2 text-white  text-base border rounded-2xl w-fit mt-auto",
              nowOpen ? "bg-blue-500" : "bg-red-500",
            ].join(" ")}
          >
            {nowOpen ? "営業中" : "準備中"}
          </div>
        </div>
      </div>
    </Link>
  );
};

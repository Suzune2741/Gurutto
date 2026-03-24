import { Link } from "react-router";
import type { Shop } from "~/types/hotpepper";
import { getDate } from "~/utils/getDate";
import { getNowOpen } from "~/utils/getNowOpen";
type Props = {
  shop: Shop;
};
/**
 * 検索時の一覧表示用コンポーネント
 * @param props
 * @param props.shop APIから取得したデータ
 */
export const ShopList = ({ shop }: Props) => {
  const date = getDate();
  const nowOpen = getNowOpen(date, shop.open);
  return (
    <Link to={`/research/${shop.id}`} className="block w-full my-1">
      <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md flex flex-row bg-[#fff9f2] hover:bg-[#f5ede0] transition-all border border-[#f5ede0]">
        <img
          className="object-cover w-24 h-24 shrink-0 "
          src={shop.logo_image}
          alt={shop.name}
        />
        <div className="p-3 flex flex-col min-w-0 overflow-hidden w-full">
          <div>
            <div className="font-bold text-sm md:text-lg text-gray-900 mb-1 wrap-break-word">
              {shop.name}
            </div>
            <div className="text-gray-500 text-sm line-clamp-2 wrap-break-word overflow-hidden">
              {shop.access}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={[
              "text-sm font-bold text-white px-3 py-2 mr-1.5 rounded-full w-fit whitespace-nowrap",
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

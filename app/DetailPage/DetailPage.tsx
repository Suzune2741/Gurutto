import { FaRegClock } from "react-icons/fa6";
import { MdOutlineCurrencyYen } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
import { Link } from "react-router";
import { getDate } from "~/utils/getDate";
import { getNowOpen } from "~/utils/getNowOpen";
type Props = {
  shop: any;
};
export const DetailPage = ({ shop }: Props) => {
  console.log(shop);
  //TODO:　地図を出す
  const date = getDate();
  console.log(date);
  const nowOpen = getNowOpen(date, shop.open);
  console.log(nowOpen);
  return (
    <div className="flex flex-col items-center">
      <p className="text-3xl my-5">店舗詳細</p>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col items-center">
          <img
            className="object-contain w-50 h-50 shrink-0 "
            src={shop.logo_image}
            alt={shop.name}
          />
          <p className="text-2xl font-bold">{nowOpen ? "営業中" : "準備中"}</p>
        </div>
        <div>
          <p className="text-2xl font-bold">店名:{shop.name}</p>
          <p className="text-xl flex flex-row items-center">
            <MdOutlinePlace />
            住所:{shop.address}
          </p>
          <p className="text-xl text-wrap flex flex-row items-center line-clamp-2 wrap-break-word">
            {/*文章が長くなるので対策する*/}
            <FaRegClock />
            営業時間:{shop.open}
          </p>
          <p className="text-xl text-wrap flex flex-row items-center">
            <MdOutlineCurrencyYen />
            平均金額:{shop.budget.average}
          </p>
        </div>
      </div>
      <p className=" flex items-end">
        <Link to="/research" className="text-blue-700">
          検索ページへ戻る
        </Link>
      </p>
    </div>
  );
};

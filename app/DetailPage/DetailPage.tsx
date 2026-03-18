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
  //TODO:　地図を出す
  const date = getDate();
  const nowOpen = getNowOpen(date, shop.open);
  console.log(shop);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-3xl my-5 font-bold">店舗詳細</p>
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
            平均金額:
            {shop.budget.name === "" ? "記載なし" : shop.budget.name}
          </p>
        </div>
      </div>
      <div className="mb-3">
        <p className="flex justify-center text-xl font-bold mb-1.5">店舗写真</p>
        <picture>
          <source media="(max-width: 768px)" srcSet={shop.photo.mobile.l} />
          <img
            src={shop.photo.pc.l}
            alt={`${shop.name}の店舗写真`}
            className="w-full max-w-md object-contain rounded-lg"
          />
        </picture>
      </div>
      <div className="w-full max-w-md my-5">
        <p className="flex justify-center text-xl font-bold mb-1.5">店舗位置</p>
        <iframe
          title="shop-map"
          src={`https://maps.google.com/maps?q=${shop.lat},${shop.lng}&z=15&output=embed`}
          width="100%"
          height="300"
          className="border-0 rounded-lg shadow-md"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="w-full flex justify-end px-7 mt-5 mb-10">
        <Link
          to="/research"
          className="text-blue-700 hover:underline flex items-center"
        >
          ←検索ページへ戻る
        </Link>
      </div>
    </div>
  );
};

import { FaRegClock } from "react-icons/fa6";
import { MdOutlineCurrencyYen } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
import { Link } from "react-router";
import { FavoriteButton } from "~/components/FavoriteButton";
import { useFavoritesContext } from "~/contexts/FavoritesContext";
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
export const DetailPage = ({ shop }: Props) => {
  const date = getDate();
  const nowOpen = getNowOpen(date, shop.open);
  // 営業時間の文章が長いので区切る
  // 区切りにスペースがある場合とない場合があるので正規表現で対策
  const formattedOpen = shop.open.replace(
    /(\d{2}:\d{2}|[）)])\s*([月火水木金土日祝])/g,
    "$1\n$2",
  );
  const { clickFavorite, isFavorite } = useFavoritesContext();
  const isSaved = isFavorite(shop.id);
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
          <p className="text-2xl font-bold">{shop.catch}</p>
          <p className="text-2xl font-bold">{shop.name}</p>
          <p className="text-xl flex flex-row items-center">
            <MdOutlinePlace />
            住所:{shop.address}
          </p>
          <div className="flex flex-col items-start gap-1  text-xl">
            <div className="flex flex-row">
              <FaRegClock className="mt-1 shrink-0" />
              <p className="text-xl">営業時間</p>
            </div>
            <p className="wrap-break-word">{formattedOpen}</p>
          </div>
          <p className="text-xl text-wrap flex flex-row items-center">
            <MdOutlineCurrencyYen />
            平均金額:
            {shop.budget.name === "" ? "記載なし" : shop.budget.name}
          </p>
        </div>
        <FavoriteButton
          isFavorite={isSaved}
          onClick={() => clickFavorite(shop)}
        />
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
        <div className="flex flex-col justify-center items-center text-xl mb-2 gap-1">
          <p className="font-bold">店舗位置</p>
          <p>{shop.access}</p>
        </div>
        <iframe
          title="shop-map"
          src={`https://maps.google.com/maps?q=${shop.lat},${shop.lng}&z=15&output=embed`}
          width="100%"
          height="300"
          className="border-0 rounded-lg shadow-md"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
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

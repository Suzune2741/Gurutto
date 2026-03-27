import type { IconType } from "react-icons";
import {
  FaHeart,
  FaFish,
  FaCoffee,
  FaPizzaSlice,
  FaHamburger,
  FaGlassCheers,
  FaRegHeart,
} from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiNoodles, GiMeat, GiSushis } from "react-icons/gi";
import { IoBeer } from "react-icons/io5";
import { BiSolidBowlRice } from "react-icons/bi";

type GenreMapItem = {
  keywords: string[];
  Icon: IconType;
  color: string;
};

const GENRE_MAP: GenreMapItem[] = [
  { keywords: ["ラーメン", "麺"], Icon: GiNoodles, color: "text-yellow-600" },
  { keywords: ["寿司"], Icon: GiSushis, color: "text-orange-500" },
  { keywords: ["魚", "海鮮"], Icon: FaFish, color: "text-blue-500" },
  { keywords: ["和食"], Icon: BiSolidBowlRice, color: "text-emerald-700" },
  { keywords: ["焼肉", "ホルモン", "肉"], Icon: GiMeat, color: "text-red-700" },
  { keywords: ["カフェ", "スイーツ"], Icon: FaCoffee, color: "text-amber-800" },
  { keywords: ["居酒屋"], Icon: IoBeer, color: "text-yellow-500" },
  {
    keywords: ["バー", "カクテル"],
    Icon: FaGlassCheers,
    color: "text-purple-500",
  },
  {
    keywords: ["イタリアン", "ピザ"],
    Icon: FaPizzaSlice,
    color: "text-orange-600",
  },
  {
    keywords: ["洋食", "ハンバーガー"],
    Icon: FaHamburger,
    color: "text-amber-600",
  },
  {
    keywords: ["中華", "うどん", "そば"],
    Icon: FaBowlFood,
    color: "text-red-600",
  },
];
/**
 * ジャンル名に応じたアイコンを返す
 * @param genreName 店舗のジャンル名
 * @param isFavorite お気に入りに登録済みかどうか
 * @param size アイコンのサイズ
 * @returns ジャンルに対応したアイコン要素
 */
export const getGenreIcon = (
  genreName: string,
  isFavorite: boolean,
  size: number,
) => {
  const matchGenre = GENRE_MAP.find((item) =>
    item.keywords.some((keyword) => genreName.includes(keyword)),
  );

  const inactiveColor = "text-gray-400";
  if (matchGenre) {
    const { Icon, color } = matchGenre;
    const iconColor = isFavorite ? color : inactiveColor;
    return (
      <Icon
        size={size}
        className={`${iconColor} transition-colors duration-200 drop-shadow-sm`}
      />
    );
  }
  return isFavorite ? (
    <FaHeart
      size={size}
      className="text-pink-500 transition-colors duration-200 drop-shadow-sm"
    />
  ) : (
    <FaRegHeart
      size={size}
      className={`${inactiveColor} transition-colors duration-200 drop-shadow-sm`}
    />
  );
};

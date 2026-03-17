import { FaRegClock } from "react-icons/fa6";
import { MdOutlineCurrencyYen } from "react-icons/md";
import { MdOutlinePlace } from "react-icons/md";
type Props = {
  shop: any;
};
export const DetailPage = ({ shop }: Props) => {
  console.log(shop);
  //TODO:　地図を出す
  return (
    <div className="flex flex-col items-center">
      <p className="text-3xl my-5">店舗詳細</p>
      <div className="flex flex-row gap-10">
        <img
          className="object-cover w-40 h-40 shrink-0 "
          src={shop.logo_image}
          alt={shop.name}
        />
        <div>
          <p className="text-2xl">店名:{shop.name}</p>
          <p className="text-xl flex flex-row items-center">
            <MdOutlinePlace />
            住所:{shop.address}
          </p>
          <p className="text-xl text-wrap flex flex-row items-center">
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
    </div>
  );
};

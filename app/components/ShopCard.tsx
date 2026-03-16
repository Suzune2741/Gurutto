import { Link } from "react-router";

type Props = {
  store: any;
};

export const ShopCard = ({ shop }: any) => {
  console.log(shop.id);
  return (
    <Link to={`/research/${shop.id}`}>
      <div className="rounded overflow-hidden shadow-lg flex flex-row w-80 h-40 my-2 bg-[#fff9f2] hover:bg-[#f5ede0]">
        <img
          className="object-cover w-40 h-40 shrink-0"
          src={shop.logo_image}
        />
        <div className="pl-2 py-3 flex flex-col min-w-0 overflow-hidden">
          <div className="font-bold text-xl  text-gray-900 mb-2 line-clamp-2 wrap-break-word">
            {shop.name}
          </div>
          <p className="text-gray-700 text-base line-clamp-3 wrap-break-word overflow-hidden">
            {shop.address}
          </p>
        </div>
      </div>
    </Link>
  );
};

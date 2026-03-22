import { FaRegHeart, FaHeart } from "react-icons/fa";
type Props = {
  isFavorite: boolean;
  onClick: () => void;
};
export const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  return (
    <button
      className="w-36 bg-gray-100 flex flex-row justify-center gap-1.5 border-2 h-fit p-1.5 hover:relative hover:top-0.5 hover:left-0.5 shadow-md items-center"
      onClick={onClick}
    >
      {isFavorite ? (
        <>
          <FaHeart size={20} className="text-pink-500 drop-shadow-sm" />
          <p className="font-medium"> 追加済み</p>
        </>
      ) : (
        <>
          <FaRegHeart size={20} />
          <p className="font-medium"> お気に入り</p>
        </>
      )}
    </button>
  );
};

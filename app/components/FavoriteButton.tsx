import type { ReactNode } from "react";
type Props = {
  icon: ReactNode;
  isFavorite: boolean;
  onClick: () => void;
};
export const FavoriteButton = ({ icon, isFavorite, onClick }: Props) => {
  return (
    <button
      className="bg-gray-100 flex flex-row  gap-1.5 border-2 h-fit w-fit py-1.5 px-2  hover:relative hover:top-0.5 hover:left-0.5 shadow-md items-center"
      onClick={onClick}
    >
      {icon}
      <p className="font-medium text-gray-700">
        {isFavorite ? " 追加済み" : " お気に入り"}
      </p>
    </button>
  );
};

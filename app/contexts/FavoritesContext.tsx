import { createContext, useContext, type ReactNode } from "react";
import { useFavorites } from "~/hooks/useFavorites";
import type { Shop } from "~/types/hotpepper";

type FavoriteContextType = {
  favorites: Shop[];
  clickFavorite: (shop: Shop) => void;
  isFavorite: (id: string) => boolean;
};
const FavoritesContext = createContext<FavoriteContextType | undefined>(
  undefined,
);
/**
 * お気に入り機能をアプリ全体に提供するプロバイダー
 * このコンポーネントで囲まれた範囲でuseFavoritesContextが使用できる
 * @param children 子コンポーネント
 */
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const favoritesList = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesList}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error("useFavoritesContextはここでは使えません");
  }

  return context;
};

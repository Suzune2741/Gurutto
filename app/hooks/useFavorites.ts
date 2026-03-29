import { useCallback, useEffect, useState } from "react";
import type { Shop } from "~/types/hotpepper";
/**
 * お気に入り機能を管理する
 * @returns favorites お気に入りの店舗一覧
 * @returns clickFavorite お気に入りの追加・削除を行う関数
 * @returns isFavorite 指定したIDの店舗がお気に入りに登録されているかを返す関数
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Shop[]>([]);

  useEffect(() => {
    const savedFavorite = localStorage.getItem("favorites");
    if (savedFavorite) {
      try {
        setFavorites(JSON.parse(savedFavorite));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const clickFavorite = useCallback((shop: Shop) => {
    setFavorites((prevFavorites) => {
      const isExist = prevFavorites.some((item) => item.id === shop.id);
      const updateFavorites = isExist
        ? prevFavorites.filter((item) => item.id !== shop.id)
        : [shop, ...prevFavorites];
      localStorage.setItem("favorites", JSON.stringify(updateFavorites));
      return updateFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.some((item) => item.id === id);
    },
    [favorites],
  );

  return { favorites, clickFavorite, isFavorite };
};

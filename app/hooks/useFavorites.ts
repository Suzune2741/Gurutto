import { useCallback, useEffect, useState } from "react";
import type { Shop } from "~/types/hotpepper";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Shop[]>([]);

  useEffect(() => {
    const savedFavorite = localStorage.getItem("favorites");
    if (savedFavorite) {
      try {
        setFavorites(JSON.parse(savedFavorite));
      } catch (err) {
        console.log(err);
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

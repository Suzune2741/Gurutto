import { FavoritesPage } from "~/FavoritesPage/FavoritesPage";

// タブに表示されるタイトルを設定
export function meta() {
  const title = "お気に入り一覧";

  return [{ title }];
}

export default function Settings() {
  return <FavoritesPage />;
}

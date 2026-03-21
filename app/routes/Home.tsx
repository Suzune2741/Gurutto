import { Main } from "~/Main/Main";
import type { Route } from "../+types/root";
// タブに表示されるタイトルを設定
export function meta({}: Route.MetaArgs) {
  return [{ title: "ぐるっと" }];
}
export default function Home() {
  return <Main />;
}

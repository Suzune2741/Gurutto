import type { HotpepperResponse } from "~/types/hotpepper";
import type { Route } from "./+types/Research";
import { ResearchPage } from "~/ResearchPage/ResearchPage";

// タブに表示されるタイトルを設定
// loaderからキーワードを取得してあれば表示する
export function meta({ location }: Route.MetaArgs) {
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const title = keyword
    ? `${keyword}の検索結果 | ぐるっと`
    : "お店を探す | ぐるっと";

  return [{ title }];
}
const CONDITIONS: string[] = [
  "private_room",
  "free_drink",
  "parking",
  "lunch",
  "free_food",
  "card",
  "child",
];
export async function loader({ request, context }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? "";
  const lat = searchParams.get("lat") ?? "35.6895";
  const lng = searchParams.get("lng") ?? "139.6917";
  const radius = searchParams.get("radius") ?? "3";
  const page = Number(searchParams.get("page") || "1");
  const count = Number(searchParams.get("count") || "10");
  const start = (page - 1) * count + 1;

  const url = new URL("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/");
  url.searchParams.set("key", context.cloudflare.env.API_KEY);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lng", lng);
  url.searchParams.set("range", radius);
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("format", "json");
  url.searchParams.set("count", String(count));
  url.searchParams.set("start", String(start));

  CONDITIONS.forEach((condition) => {
    const value = searchParams.get(condition);
    if (value === "1") {
      url.searchParams.set(condition, "1");
    }
  });
  const res = await fetch(url.toString());
  const data = (await res.json()) as HotpepperResponse;
  const totalItems = data.results?.results_available ?? 0;

  return {
    shops: data.results.shop ?? [],
    totalItems,
    currentPage: page,
    itemsPerPage: count,
  };
}

export default function Research({ loaderData }: Route.ComponentProps) {
  return (
    <ResearchPage
      shops={loaderData.shops}
      totalItems={loaderData.totalItems}
      currentPage={loaderData.currentPage}
      itemsPerPage={loaderData.itemsPerPage}
    />
  );
}

import type { HotpepperResponse } from "~/types/hotpepper";
import type { Route } from "./+types/ShopDetailPage";
import { DetailPage } from "~/DetailPage/DetailPage";

// タブに表示されるタイトルを設定
// 店舗情報を受け取って表示
export function meta({ loaderData }: Route.MetaArgs) {
  const title = loaderData?.shop?.name
    ? `${loaderData.shop.name} | ぐるっと`
    : "店舗詳細 | ぐるっと";

  return [{ title }];
}

export async function loader({ params, context }: Route.LoaderArgs) {
  const url = new URL("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/");
  url.searchParams.set("key", context.cloudflare.env.API_KEY);
  url.searchParams.set("id", params.id);
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());
  const data = (await res.json()) as HotpepperResponse;

  const shop = data.results.shop?.[0];
  if (!shop) throw new Response("Not Found", { status: 404 });

  return { shop };
}

export default function ShopDetailPage({ loaderData }: Route.ComponentProps) {
  return <DetailPage shop={loaderData.shop} />;
}

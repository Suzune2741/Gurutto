import { Form, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/Research";
import { SearchField } from "~/components/SearchField";
import { ShopCard } from "~/components/ShopCard";
import { useGeolocation } from "~/hooks/useGeolocation";

export async function loader({ request, context }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? "";
  const lat = searchParams.get("lat") ?? "35.6895";
  const lng = searchParams.get("lng") ?? "139.6917";
  const radius = searchParams.get("radius") ?? "3";
  if (!keyword) return { shops: [] };

  const url = new URL("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/");
  url.searchParams.set("key", context.cloudflare.env.API_KEY);
  url.searchParams.set("lat", lat);
  url.searchParams.set("lng", lng);
  url.searchParams.set("range", radius);
  url.searchParams.set("keyword", keyword);
  url.searchParams.set("format", "json");
  url.searchParams.set("count", "20");
  const res = await fetch(url.toString());
  const data = (await res.json()) as any;
  console.log(res);
  return { shops: data.results.shop ?? [] };
}

export default function Research({ loaderData }: Route.ComponentProps) {
  const { shops } = loaderData;
  const navigation = useNavigation();
  const isSearching = navigation.state === "loading";
  const { coords } = useGeolocation();
  const navigate = useNavigate();
  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams();
    params.set("keyword", keyword);
    if (coords) {
      params.set("lat", String(coords.latitude));
      params.set("lng", String(coords.longitude));
    }
    navigate(`/shops?${params.toString()}`);
  };
  return (
    <div className="flex flex-col items-center my-5 gap-1">
      <p className="text-xl">検索する</p>
      <SearchField lat={coords?.latitude} lng={coords?.longitude} />
      {isSearching && <p>検索中...</p>}
      {shops.length === 0 ? (
        <p>該当なし</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mx-5">
            {shops.map((shop: any) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

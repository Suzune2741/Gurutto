import MUNI_ARRAY from "~/utils/muni.ts";
export type Address = {
  prefecture: string;
  city: string;
  town: string;
  joinAddress: string;
};
type GsiResponse = {
  results: {
    muniCd: string; // 市区町村コード
    lv01Nm: string; // 都道府県 + 市区町村
  };
};
export const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<Address> => {
  const url = `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("住所の取得に失敗しました");

  const data: GsiResponse = await res.json();
  const { muniCd, lv01Nm } = data.results;
  const muni = MUNI_ARRAY[muniCd].split(",");

  return {
    prefecture: muni[1],
    city: muni[3],
    town: lv01Nm,
    joinAddress: `${muni[1]}${muni[3]}${lv01Nm}`,
  };
};

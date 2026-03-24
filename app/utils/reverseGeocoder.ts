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
    lv01Nm: string; // 町丁目名称
  };
};

/**
 * 緯度と経度から住所情報を取得する関数（逆ジオコーディング）
 * 国土地理院のAPIを使用し、都道府県・市区町村・町域を組み立てて返します。
 * @param lat 緯度
 * @param lng 経度
 * @returns 取得した住所情報（Addressオブジェクト）を返すPromise
 */
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

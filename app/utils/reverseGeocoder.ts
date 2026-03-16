export type Address = {
  city: string;
  town: string;
  joinAddress: string;
};
type GsiResponse = {
  results: {
    muniCd: string; // 市区町村コード
    lv01Nm: string; // 都道府県 + 市区町村
    lv02Nm: string; // 町・大字
  };
};
export const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<Address> => {
  const url = `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("住所の取得に失敗しました");
  console.log(await res.json());
  const data: GsiResponse = await res.json();
  const { lv01Nm, lv02Nm } = data.results;
  console.log(lv01Nm, lv02Nm);
  return {
    city: lv01Nm,
    town: lv02Nm,
    joinAddress: `${lv01Nm}${lv02Nm}`,
  };
};

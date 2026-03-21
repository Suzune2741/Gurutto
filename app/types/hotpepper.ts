/*
/ https://webservice.recruit.co.jp/doc/hotpepper/reference.html
*/
export type HotpepperResponse = {
  results: {
    shop: Shop[];
    results_available: number;
  };
};
export type Shop = {
  id: string;
  name: string;
  address: string;
  access: string;
  open: string;
  logo_image: string;
  lat: number;
  lng: number;
  catch: string;
  budget: { name: string };
  photo: { pc: { l: string }; mobile: { l: string } };
};

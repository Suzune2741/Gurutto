/**
 * Geolocation APIを使用して現在地を取得する
 * @param options 位置情報取得のオプション
 * @returns 取得した位置情報を返す
 */
export const getCurrentPosition = (
  options?: PositionOptions
): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation APIに対応していません"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

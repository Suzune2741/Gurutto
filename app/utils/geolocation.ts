export const getCurrentPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation APIに対応していません"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

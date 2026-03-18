/**
 * 店舗の営業時間から、現在営業しているかを判定する関数
 * 祝日、祝前日には対応していないため、必要に応じて拡張が必要
 * @param date 現在の日時（例: { time: "14:30", day: "火" }）
 * @param open 店舗の営業時間（例: "火～日、祝日、祝前日: 10:00～18:00"）
 * @returns 現在営業しているかどうか
 */
export const getNowOpen = (
  date: { time: string; day: string },
  open: string,
): boolean => {
  const daysOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
  const openDays = open.split(": ").filter((_, i) => i % 2 === 0);
  const openTimes = open.split(": ").filter((_, i) => i % 2 === 1);

  const nowOpen = openTimes.some((time, i): boolean => {
    const day = openDays[i];
    const splitDay = day.split("、");
    const isDayMatch = splitDay.some((d) => {
      if (d.includes("～")) {
        const startDay = d.split("～")[0];
        const endDay = d.split("～")[1];
        const startIndex = daysOfWeek.indexOf(startDay);
        const endIndex = daysOfWeek.indexOf(endDay);
        const todayIndex = daysOfWeek.indexOf(date.day);
        if (startIndex === -1 || endIndex === -1 || todayIndex === -1)
          return false;
        if (startIndex <= endIndex) {
          return startIndex <= todayIndex && todayIndex <= endIndex;
        } else {
          return todayIndex >= startIndex || todayIndex <= endIndex;
        }
      } else {
        return d === date.day;
      }
    });
    if (!isDayMatch) return false;
    const re = /\d{2}:\d{2}～\d{2}:\d{2}/;
    const regArray = re.exec(time);
    if (regArray === null) return false;
    const regTime = regArray[0];

    const openTime = regTime.split("～")[0];
    const closeTime = regTime.split("～")[1];

    return openTime <= date.time && date.time < closeTime;
  });

  return nowOpen;
};

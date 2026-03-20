/**
 * 現在の時刻と曜日を取得する
 * @returns time 現在の時刻（例: "14:30"）
 * @returns day 現在の曜日（例: "火"）
 */
export const getDate = (): { time: string; day: string } => {
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const dayOfWeek = date.getDay();
  
  return {
    time: `${hours}:${minutes}`,
    day: daysOfWeek[dayOfWeek],
  };
};

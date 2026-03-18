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

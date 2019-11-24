export default function unixToDate(unixTime: number) : string {
  const date = new Date(unixTime);
  return date.getFullYear() + "年" + (date.getUTCMonth() + 1) + "月" + date.getUTCDate() + "日 " + date.toLocaleTimeString();
}

export function secToHour(time: number) : string {
  let hour = "";
  if (time >= 3600) { hour += Math.floor(time / 3600) + "时"; time %= 3600; }
  hour += Math.floor(time / 60) + "分"; time %= 60;
  hour += time + "秒";
  return hour;
}
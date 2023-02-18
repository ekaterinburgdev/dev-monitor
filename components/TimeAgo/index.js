import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export default function TimeAgoComponnet({ date }) {
  if (!date) return null;
  const time = new Date(date);
  const formatted = timeAgo.format(time);
  const iso = time.toISOString();

  return <time dateTime={iso}>{formatted}</time>;
}

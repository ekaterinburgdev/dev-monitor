export function cache(res, seconds) {
  const date = new Date();
  date.setSeconds(date.getSeconds() + seconds);
  res.setHeader("Cache-Control", `public, max-age=${seconds}`);
  res.setHeader("Expires", date.toUTCString());
}

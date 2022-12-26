import { useMemo } from "react";

export function Contributions({ activity }) {
  const value = useMemo(() => {
    if (!activity) return 0;

    const year = activity.slice(-52);
    return year.reduce((all, item) => all + item.total, 0);
  }, [activity]);

  if (!activity.length || !value) return null;

  return (<span>{value} contributions in&nbsp;the&nbsp;last year</span>);
}

import { useMemo } from "react";
import styles from "./Contributions.module.css";

export function Contributions({ activity }) {
  const value = useMemo(() => {
    if (!activity) return 0;

    const year = activity.slice(-52);
    return year.reduce((all, item) => all + item.total, 0);
  }, [activity]);

  if (!activity.length || !value) return null;

  return (
    <div className={styles.contributions}>
      {value} contributions in the last year
    </div>
  );
}

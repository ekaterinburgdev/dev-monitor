import { useEffect, useMemo, useState } from "react";
import uniq from "lodash/uniq";
import styles from "./Activity.module.css";
import { Loading } from "../Loading/Loading";

let monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
});

export function Activity({ activity }) {
  const [limit, setLimit] = useState(1000);

  const { months, days } = useMemo(() => {
    if (!activity) return {};

    const year = activity.slice(-limit);
    const days = year
      .reduce((all, item) => all.concat(item.days), [])
      .map((value) => {
        if (value > 6) return 3;
        if (value > 3) return 2;
        if (value > 0) return 1;

        return 0;
      });

    const months = uniq(
      year
        .map((w) => {
          if (w.week * 1000) {
            return new Date(w.week * 1000);
          }
          return false;
        })
        .filter(Boolean)
        .map(monthFormatter.format)
    );

    return { months, days };
  }, [activity, limit]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 700) {
        setLimit(20);
      } else if (window.innerWidth < 1600) {
        setLimit(38);
      } else {
        setLimit(56);
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [setLimit]);

  if (!activity.length) {
    return <Loading />;
  }

  return (
    <div className={styles.graph}>
      <ul className={styles.months}>
        {months.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <ul className={styles.squares}>
        {days.map((value, i) => (
          <li key={i} data-level={value} />
        ))}
      </ul>
    </div>
  );
}

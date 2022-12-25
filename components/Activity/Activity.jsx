import { useEffect, useMemo, useState } from "react";
import uniq from "lodash/uniq";
import styles from "./Activity.module.css";
import { Loading } from "../Loading/Loading";

const DAY = 1000 * 60 * 60 * 24;
const SHOW_WEEKS = { S: 20, M: 38, L: 56 };
const SHOW_WEEKS_BREAKPOINTS = { S: 700, L: 1600 };

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
});

const commitDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

const descriptionFormatter = ({ index, day, week }) => {
  const date = new Date(week * 1000 + index * DAY);

  return {
    short: `${day}, ${commitDateFormatter.format(date)}`,
    full: `${day} contribution${
      day > 1 ? `s` : ""
    } on ${commitDateFormatter.format(date)}`
  };
};

export function Activity({ activity }) {
  const [limit, setLimit] = useState(SHOW_WEEKS.L);

  const { months, days } = useMemo(() => {
    if (!activity) return {};

    const year = activity.slice(-limit);
    const days = year
      .reduce(
        (all, item) =>
          all.concat(
            item.days.map((d, index) => ({ day: d, week: item.week, index }))
          ),
        []
      )
      .map((item) => {
        const result = { ...item, description: descriptionFormatter(item) };
        if (item.day > 6) return { ...result, level: 3 };
        if (item.day > 3) return { ...result, level: 2 };
        if (item.day > 0) return { ...result, level: 1 };

        return { ...result, level: 0 };
      });

    const months = uniq(
      year
        .map((w) => {
          const timestamp = w.week * 1000;
          if (timestamp) return new Date(timestamp);
          return false;
        })
        .filter(Boolean)
        .map(monthFormatter.format)
    );

    return { months, days };
  }, [activity, limit]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < SHOW_WEEKS_BREAKPOINTS.S) {
        setLimit(SHOW_WEEKS.S);
      } else if (window.innerWidth < SHOW_WEEKS_BREAKPOINTS.L) {
        setLimit(SHOW_WEEKS.M);
      } else {
        setLimit(SHOW_WEEKS.L);
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
    <div className={styles.graph} aria-hidden>
      <ul className={styles.months}>
        {months.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <ul className={styles.squares}>
        {days.map(({ description, level }, i) => (
          <li
            className={styles.square}
            key={i}
            data-level={level}
            data-description-short={description.short}
            data-description-full={description.full}
          />
        ))}
      </ul>
    </div>
  );
}

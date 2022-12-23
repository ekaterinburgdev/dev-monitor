import styles from "./Activity.module.css";
import uniq from "lodash/uniq";
import Contributors from "./Contributors";
import { useMemo } from "react";

let monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
});

export function Activity({ activity, contributors }) {
  const { months, days } = useMemo(() => {
    if (!activity) return {};

    const year = activity.slice(-52);
    const days = year
      .reduce((all, item) => all.concat(item.days), [])
      .map((value) => {
        if (value > 6) return 3;
        if (value > 3) return 2;
        if (value > 0) return 1;

        return 0;
      });

    const months = uniq(
      year.map((w) => new Date(w.week * 1000)).map(monthFormatter.format)
    );

    return { months, days };
  }, [activity]);

  if (activity.length === 0) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Активность</h2>
      <div className={styles.graph}>
        <ul className={styles.months}>
          {months.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <ul className={styles.days}>
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className={styles.squares}>
          {days.map((value, i) => (
            <li key={i} data-level={value} />
          ))}
        </ul>
      </div>

      <h2 className={styles.title}>Контрибьютеры</h2>
      <Contributors contributors={contributors} />
    </div>
  );
}

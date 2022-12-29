import { useEffect, useState } from "react";
import styles from "./Activity.module.css";
import { Loading } from "../Loading/Loading";
import { useActivity } from "./useActivity";

const SHOW_WEEKS = { S: 20, M: 38, L: 56 };
const SHOW_WEEKS_BREAKPOINTS = { S: 700, L: 1600 };

export function Activity({ activity }) {
  const [limit, setLimit] = useState(SHOW_WEEKS.L);
  const { months, days } = useActivity({ activity, limit });

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
        {months.map((m, i) => (
          <li className={styles.month} style={{transform: `scale(${m.scale})`}} key={i}>
            {m.month}
            {m.contributions && (
              <span className={styles.month__contributions}>
                {m.contributions}
              </span>
            )}
          </li>
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

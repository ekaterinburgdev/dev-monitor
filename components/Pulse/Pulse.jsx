import { useEffect, useState } from "react";
import styles from "./Pulse.module.css";

function getPercent({ min, max, value }) {
  return (100 * (value - min)) / (max - min);
}

const STROKE_WIDTH = 2;
const X_FREQUENCY = 5;
const GRAPH_HEIGHT = 50;

export function Pulse({ activity, isDead }) {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const css = getComputedStyle(document.body);
    const color = isDead
      ? css.getPropertyValue("--text-color-danger")
      : css.getPropertyValue("--activity-color-secondary");
    setColor(color);
  }, [isDead]);

  if (!activity) return null;
  if (!activity.length) return null;

  const max = Math.max(...activity);
  const formatValues = activity.map((value) =>
    getPercent({ min: 0, max, value })
  );
  const points = formatValues.reduce(
    (all, point, i) =>
      all + `${i * X_FREQUENCY}, ${(100 - point) / 2 + STROKE_WIDTH} `,
    ""
  );

  const width = X_FREQUENCY * activity.length;
  const height = GRAPH_HEIGHT + STROKE_WIDTH * 2;

  return (
    <svg
      className={styles.pulse}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      <polyline
        fill="none"
        stroke={`rgb(${color})`}
        strokeWidth={STROKE_WIDTH}
        points={points}
        strokeLinejoin="round"
      />
    </svg>
  );
}

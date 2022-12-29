import { getPercent } from "../../utils/getPercent";

const STROKE_WIDTH = 2;
const X_FREQUENCY = 5;
const GRAPH_HEIGHT = 50;

export function Pulse({ activity }) {
  if (!activity || !activity.length) return null;

  const values = activity?.map((a) => a.total);
  const max = Math.max(...values);
  const formatValues = values.map((value) =>
    getPercent({ min: 0, max, value })
  );
  const points = formatValues.reduce(
    (all, point, i) =>
      all + `${i * X_FREQUENCY}, ${(100 - point) / 2 + STROKE_WIDTH} `,
    ""
  );

  const width = X_FREQUENCY * values.length;
  const height = GRAPH_HEIGHT + STROKE_WIDTH * 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <polyline
        fill="none"
        stroke="#7bc96f"
        strokeWidth={STROKE_WIDTH}
        points={points}
        strokeLinejoin="round"
      />
    </svg>
  );
}

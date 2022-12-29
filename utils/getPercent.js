export function getPercent({ min, max, value }) {
  return (100 * (value - min)) / (max - min);
}

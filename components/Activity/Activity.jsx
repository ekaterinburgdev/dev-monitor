import styles from "./Activity.module.css";

export function Activity({ activity }) {
  if (activity.length === 0) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const startIndex = activity.findIndex(
    (item) => new Date(item.week * 1000).getMonth() === 0
  );
  const year = activity.slice(startIndex, activity.length);
  const days = year
    .reduce((all, item) => all.concat(item.days), [])
    .map((value) => {
      if (value > 6) return 3;
      if (value > 3) return 2;
      if (value > 0) return 1;

      return 0;
    });

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Активность</h2>
      <div className={styles.graph}>
        <ul className={styles.months}>
          <li>Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
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
    </div>
  );
}

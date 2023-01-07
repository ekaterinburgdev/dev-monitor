import styles from "../Chips/Chips.module.css";

export function SlotsInfo({  onClick, repository, project }) {
  const pulls = project.stats.pulls;
  const hasPulls = Boolean(pulls.length);

  return (
    <ul className={styles.chips} onClick={onClick}>
      <li className={styles.chips__item}>Branches</li>
      <li className={styles.chips__item} disabled={!hasPulls}>Pulls ({pulls.length})</li>
      <li className={styles.chips__item}>
        Issues{" "}
        {Boolean(repository.open_issues_count) &&
          `(${repository.open_issues_count})`}
      </li>
    </ul>
  );
}

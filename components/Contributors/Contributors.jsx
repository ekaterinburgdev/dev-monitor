import styles from "./Contributors.module.css";
import { Loading } from "../Loading/Loading";
import { getPercent } from "../../utils/getPercent";

export function Contributors({ contributors, sizeByPercent = true }) {
  if (!contributors.length) return <Loading />;

  const maxContributions = Math.max(
    ...contributors.map((c) => c.contributions)
  );

  return (
    <div className={styles.contributors}>
      {contributors
        .sort((a, b) => b.contributions - a.contributions)
        .map((contributor) => {
          const scale = sizeByPercent
            ? getPercent({
                min: 0,
                max: maxContributions,
                value: contributor.contributions,
              }) / 1.5
            : contributor.contributions / 2;

          return (
            <a
              href={contributor.html_url}
              key={contributor.login}
              className={styles.contributor}
            >
              <img
                src={contributor.avatar_url}
                className={styles.contributor__avatar}
                alt={contributor.login}
                width={scale}
                height={scale}
              />
              <div className={styles.contributor__contributions}>
                {contributor.contributions}
              </div>
            </a>
          );
        })}
    </div>
  );
}

import styles from "./Contributors.module.css";
import { Loading } from "../Loading/Loading";

export function Contributors({ contributors, scaled }) {
  if (!contributors.length) return <Loading />;

  return (
    <div className={styles.contributors}>
      {contributors
        .sort((a, b) => b.contributions - a.contributions)
        .map((contributor) => {
          const scale = scaled
            ? contributor.contributions / 2
            : 36;

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

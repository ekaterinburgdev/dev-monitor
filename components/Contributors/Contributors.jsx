import styles from "./Contributors.module.css";
import { Loading } from '../Loading/Loading';

export function Contributors({ contributors }) {
  if (!contributors.length) return <Loading />;

  return (
    <div className={styles.contributors}>
      {contributors
        .sort((a, b) => b.contributions - a.contributions)
        .map((contributor) => (
          <a
            href={contributor.html_url}
            key={contributor.login}
            className={styles.contributor}
          >
            <img
              src={contributor.avatar_url}
              className={styles.contributor__avatar}
              alt={contributor.login}
              width={contributor.contributions / 2}
              height={contributor.contributions / 2}
            />
            <div className={styles.contributor__contributions}>
              {contributor.contributions}
            </div>
          </a>
        ))}
    </div>
  );
}

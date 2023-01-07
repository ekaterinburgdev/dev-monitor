import styles from "./Slots.module.css";
import { Loading } from "../Loading/Loading";
import { useSlots } from "./useSlots";
import TimeAgo from "../TimeAgo";

export function IssuesSlots({ git, vercel, repositoryUrl }) {
  const {
    loaded,
    firstItems,
    hasMoreItems,
  } = useSlots({
    git,
    vercel,
    loadItems: loadIssues,
  });

  if (!loaded) return <Loading />;

  if (!firstItems.length) return <p>No issues found</p>;

  return (
    <ul className={styles.slots}>
      {firstItems.map(({ title, url, date, author, authorAvatar }) => {
        return (
          <li className={styles.slot} key={url}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={styles.slot__link}
            >
              {title}
            </a>
            <div className={styles.slot__info}>
              {author && (
                <>
                  <a
                    href={`https://github.com/${author}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={authorAvatar} className={styles.slot__avatar} />
                    {author}
                  </a>
                  , <TimeAgo date={date} />
                </>
              )}
            </div>
          </li>
        );
      })}

      {hasMoreItems && (
        <li className={styles.slot}>
          <a
            href={`${repositoryUrl}/issues`}
            target="_blank"
            rel="noreferrer"
            className={styles.slot__link}
          >
            All issues
          </a>
        </li>
      )}
    </ul>
  );
}

async function loadIssues(repo) {
  const response = await fetch(`/api/issues?repo=${repo}`);

  return await response.json();
}

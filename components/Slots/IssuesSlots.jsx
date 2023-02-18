import styles from "./Slots.module.css";
import { Loading } from "../Loading/Loading";
import { useSlots } from "./useSlots";
import TimeAgo from "../TimeAgo";

export function IssuesSlots({ repos, repositoryUrl }) {
  const { loaded, items } = useSlots({
    repos,
    loadItems: loadIssues,
  });

  if (!loaded) return <Loading />;

  if (!items.length) return <p>No issues</p>;

  return (
    <ul className={styles.slots}>
      {items.map(({ title, url, date, author, authorAvatar }) => {
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
    </ul>
  );
}

async function loadIssues(repo) {
  const response = await fetch(`/api/issues?repo=${repo}`);

  return await response.json();
}

import { useSlots } from "./useSlots";
import { Loading } from "../Loading/Loading";
import styles from "./Slots.module.css";
import TimeAgo from "../TimeAgo";

export function PullsSlots({ repos }) {
  const { loaded, items: pulls } = useSlots({
    repos,
    loadItems: loadPulls,
  });

  if (!loaded) return <Loading />;

  if (!pulls.length) return <p>No pull requests found</p>;

  return (
    <ul className={styles.slots}>
      {pulls.map(({ title, url, date, author, authorAvatar }) => {
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
    </ul>
  );
}

async function loadPulls(repo) {
  const response = await fetch(`/api/pulls?repo=${repo}`);

  return await response.json();
}

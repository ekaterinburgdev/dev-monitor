import { useSlots } from "./useSlots";
import { Loading } from "../Loading/Loading";
import styles from "./Slots.module.css";

export function PullsSlots({ project }) {
  const { loaded, items: pulls } = useSlots({
    project,
    loadItems: loadPulls,
  });

  if (!loaded) return <Loading />;

  if (!pulls.length) return <p>No pull requests found</p>;

  return (
    <ul className={styles.slots}>
      {pulls.map(({ title, url, repository }) => {
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
            <div className={styles.slot__info}>{repository.language}</div>
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

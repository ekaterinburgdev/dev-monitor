import styles from "./Slots.module.css";
import { Loading } from "../Loading/Loading";
import { useSlots } from "./useSlots";

export function IssuesSlots({ project, repositoryUrl }) {
  const { loaded, items } = useSlots({
    project,
    loadItems: loadIssues,
  });

  if (!loaded) return <Loading />;

  if (!items.length) return <p>No issues</p>;

  return (
    <ul className={styles.slots}>
      {items.map(({ title, url, repository }) => {
        const description =
          project.stats.repository.name !== repository.name
            ? [repository.language, repository.name]
            : [repository.language];

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
            <div className={styles.slot__info}>{description.join(" • ")}</div>
          </li>
        );
      })}
    </ul>
  );
}

async function loadIssues(repo) {
  const response = await fetch(`/api/issues?repo=${repo}`);

  return await response.json();
}

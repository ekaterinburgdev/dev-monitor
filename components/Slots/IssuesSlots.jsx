import styles from "./Slots.module.css";
import { Loading } from "../Loading/Loading";
import { useSlots } from "./useSlots";

export function IssuesSlots({ project }) {
  const { loaded, repos, projects } = useSlots({
    project,
    loadItems: loadIssues,
  });

  if (!loaded) return <Loading />;

  if (!repos.length) return <p>No issues</p>;

  return (
    <ul className={styles.sections}>
      {repos.map(([name, items]) => {
        const repo = projects[name]?.stats.repository;
        return (
          <li className={styles.section} key={name}>
            <a href={repo.html_url} className={styles.sections__label}>
              {name} ({repo.language})
            </a>
            <ul className={styles.slots}>
              {items.map(({ title, url }) => {
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
                  </li>
                );
              })}
            </ul>
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

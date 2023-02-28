import { useSlots } from "./useSlots";
import styles from "./Slots.module.css";
import { Loading } from "../Loading/Loading";

export function ReadyForReviewPullsSlots({ project }) {
  const { loaded, items } = useSlots({
    project,
    loadItems: loadPulls,
  });

  if (!loaded) return <Loading />;

  if (!items.length) return <p>No pull requests found</p>;

  const readyForReview = items.filter((p) => p.reviewers.length);

  if (!readyForReview.length) return <p>No requests for review</p>;

  return (
    <ul className={styles.slots}>
      {readyForReview.map(({ title, url, repository }) => {
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

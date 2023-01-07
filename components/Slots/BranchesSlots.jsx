import styles from "./Slots.module.css";
import { Loading } from "../Loading/Loading";
import { useSlots } from "./useSlots";
import TimeAgo from "../TimeAgo";

const DEFAULT_BRANCH_NAME = "main";

export function BranchesSlots({ git, url, vercel, repositoryUrl }) {
  const { loaded, firstItems, hasMoreItems } = useSlots({
    git,
    vercel,
    loadItems: loadBranches,
  });

  if (!loaded) return <Loading />;

  if (!firstItems.length) return <p>No branches found</p>;

  return (
    <ul className={styles.slots}>
      {firstItems.map(
        ({
          branch,
          slotUrl,
          date,
          commitMessage,
          commitUrl,
          commitAuthor,
          commitAuthorAvatar,
        }) => (
          <li className={styles.slot} key={commitUrl}>
            <a
              href={branch === DEFAULT_BRANCH_NAME ? url : slotUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.slot__link}
            >
              {branch}, <TimeAgo date={date} />
            </a>
            <div className={styles.slot__info}>
              {commitAuthor && (
                <>
                  <a
                    href={`https://github.com/${commitAuthor}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={commitAuthorAvatar}
                      className={styles.slot__avatar}
                    />
                    {commitAuthor}
                  </a>
                  :
                </>
              )}{" "}
              <i>{commitMessage}</i>
            </div>
          </li>
        )
      )}

      {hasMoreItems && (
        <li className={styles.slot}>
          <a
            href={`${repositoryUrl}/branches`}
            target="_blank"
            rel="noreferrer"
            className={styles.slot__link}
          >
            All branches
          </a>
        </li>
      )}
    </ul>
  );
}

async function loadBranches(repo, vercel) {
  const response = await fetch(`/api/branches?repo=${repo}&vercel=${vercel}`);

  return await response.json();
}

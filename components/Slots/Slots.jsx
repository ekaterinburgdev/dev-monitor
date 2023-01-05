import styles from "./Slots.module.css";
import en from "javascript-time-ago/locale/en";
import TimeAgo from "javascript-time-ago";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");
const DEFAULT_BRANCH_NAME = "main";

export function Slots({ slots = [], url }) {
  const slotsWithoutBot = slots.filter((s) => s.commitAuthor !== "web-flow");

  return (
    <ul className={styles.slots}>
      {slotsWithoutBot.map(
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
              {branch}, {timeAgo.format(new Date(date))}
            </a>
            <div className={styles.slot__info}>
              {commitAuthor && (
                <>
                  <a
                    href={`https://github.com/${commitAuthor}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={commitAuthorAvatar} className={styles.slot__avatar} />
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
    </ul>
  );
}

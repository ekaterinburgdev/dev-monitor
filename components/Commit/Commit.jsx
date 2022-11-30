import classNames from "classnames/bind";
import styles from "./Commit.module.css";

const cx = classNames.bind(styles);

export default function Commit({ commit, commitUrl, commitMessage, slotUrl }) {
  return (
    <div className={cx("commit")}>
      <a href={commit.author?.html_url} className={cx("commit__author")}>
        {commit.author?.avatar_url && (
          <img
            className={cx("commit__avatar")}
            src={commit.author?.avatar_url}
            width={64}
            height={64}
            alt={commit.author?.login}
          />
        )}
      </a>
      <div className={cx("commit__content")}>
        <div className={cx("commit__message")}>
          <a href={slotUrl || commit.html_url} target="_blank" rel="noreferrer">
            {commitMessage}
          </a>
        </div>

        <div className={cx("commit__info")}>
          {/* <a href={commitUrl} target="_blank" rel="noreferrer">
            PR
          </a>
          {", "} */}

          <a className={cx("commit__preview")} href={commit.html_url}>
            Commit:{" "}
          </a>
          {commit?.stats?.additions && (
            <span>
              <span className={cx("commit__stats", "commit__stats-added")}>
                {commit?.stats.additions} files added
              </span>
              {", "}
              <span className={cx("commit__stats", "commit__stats-deleted")}>
                {commit.stats.deletions} files deleted
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

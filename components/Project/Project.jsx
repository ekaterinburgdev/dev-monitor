import classNames from "classnames/bind";
import styles from "./Project.module.css";
import { Pulse } from "../Pulse/Pulse";
import { Contributors } from "../Contributors/Contributors";
import TimeAgo from "javascript-time-ago";
import projectsConfig from "../../projects.config";
import en from "javascript-time-ago/locale/en";
import { getContributions } from "../Contributors/getContributions";

const DEFAULT_BRANCH_NAME = "main";

TimeAgo.addDefaultLocale(en);
const cx = classNames.bind(styles);
const timeAgo = new TimeAgo("en-US");

export default function Project({
  title,
  icon,
  url,
  git,
  stats = [],
  slots = [],
  links,
}) {
  const contributions = getContributions(stats?.contributors);
  const commitsWithoutRobot = slots.filter(s => s.commitAuthor !== "web-flow");

  return (
    <article className={cx("project")}>
      <header className={cx("project__meta")}>
        {icon ? (
          <img className={cx("project__icon")} src={`/images/${icon}`} alt="" />
        ) : (
          <span className={cx("project__letter")}>{title.charAt(0)}</span>
        )}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={cx("project__slots-link")}
        >
          <h2 className={cx("project__title")}>{title}</h2>
        </a>

        <p className={cx("project__meta-description")}>
          {git && (
            <a
              href={`https://github.com/${projectsConfig.organization}/${git}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>
          )}
          &nbsp;&nbsp;
          {stats === undefined ? (
            <>Loading...</>
          ) : (
            <>
              <a
                href={`https://github.com/${projectsConfig.organization}/${git}/pulls`}
                target="_blank"
                rel="noreferrer"
                className={cx("project__meta-link")}
              >
                Pull requests: {stats.pulls}
              </a>
              &nbsp;·&nbsp;
              <a
                href={`https://github.com/${projectsConfig.organization}/${git}/issues`}
                target="_blank"
                rel="noreferrer"
                className={cx("project__meta-link")}
              >
                Issues: {stats.issues}
              </a>
            </>
          )}
        </p>
        <Pulse activity={stats?.activity} />
      </header>

      <Contributors contributors={contributions} />

      <ul className={cx("project__slots-list")}>
        <li
          className={cx(
            "project__slots-list-item",
            "project__slots-list-item_production"
          )}
        ></li>

        {commitsWithoutRobot?.map(
          ({
            branch,
            slotUrl,
            date,
            commitMessage,
            commitUrl,
            commitAuthor,
          }) => {
            const commitDate = new Date(date);
            const DAY = 1000 * 60 * 60 * 24;
            const isNew = commitDate - new Date() > -DAY * 3;

            return (
              <li className={cx("project__slots-list-item")} key={commitUrl}>
                <a
                  href={branch === DEFAULT_BRANCH_NAME ? url : slotUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cx("project__slots-branch")}
                >
                  {commitMessage}
                </a>
                <div className={cx("project__slots-commit")}>
                  {isNew && "⚡️🆕 "}
                  <a href={commitUrl} target="_blank" rel="noreferrer">
                    #
                  </a>{" "}
                  <a href={`https://github.com/${commitAuthor}`}>
                    {commitAuthor}
                  </a>{" "}
                  {timeAgo.format(commitDate)}: {commitMessage}
                </div>
              </li>
            );
          }
        )}
      </ul>

      <ul className={cx("project__other-list")}>
        {links.map(({ name, url }) => (
          <li className={cx("project__other-list-item")} key={name}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={cx("project__other-link")}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

import { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./Project.module.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { groupBy } from "lodash";
import Commit from "../Commit/Commit";
import ProjectInfo from "../ProjectInfo/ProjectInfo";
import projectsConfig from "../../projects.config";
import Contributors from "../Contributors/Contributors";

TimeAgo.addDefaultLocale(en);
const cx = classNames.bind(styles);
const timeAgo = new TimeAgo("en-US");

export default function Project({
  title,
  icon,
  url,
  git,
  vercel,
  stats,
  slots = [],
  links,
}) {

  const slotsGroupedByDate = useMemo(() => {
    const items = slots.map((s) => ({
      ...s,
      date: timeAgo.format(new Date(s.date)),
    }));

    return groupBy(items, (s) => s.date);
  }, [slots]);

  const isLoading = !stats;

  useEffect(() => {
    if (!isLoading) {
      console.log(' ');
      console.log('Repository', stats?.repo);
      console.log('Contributors', stats?.contributors);
      console.log('Commits', slots)
    }
  }, [isLoading, slots, stats])

  return (
    <article className={cx("project")}>
      <header>
        {icon ? (
          <img className={cx("project__icon")} src={`/images/${icon}`} alt="" />
        ) : (
          <span className={cx("project__letter")}>{title.charAt(0)}</span>
        )}
        <h2 className={cx("project__title")}>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h2>

        <ProjectInfo git={git} links={links} stats={stats} />

        {isLoading && <>Loading...</>}
      </header>

      {!isLoading && <h2 className={cx("project__header")}>Контрибьюторы</h2>}
      <Contributors contributors={stats?.contributors} />
      
      {!isLoading && <h2 className={cx("project__header")}>Таймлайн</h2>}
      
      {stats && (
        <p className={cx("project__links")}>
          <a
            href={`https://github.com/${projectsConfig.organization}/${git}/pulls`}
            target="_blank"
            rel="noreferrer"
            className={cx("project__link")}
          >
            Pull requests: {stats.pulls}
          </a>
          &nbsp;·&nbsp;
          <a
            href={`https://github.com/${projectsConfig.organization}/${git}/issues`}
            target="_blank"
            rel="noreferrer"
            className={cx("project__link")}
          >
            Issues: {stats.issues}
          </a>
        </p>
      )}
      

      <ul className={cx("project__slots-list")}>
        {Object.keys(slotsGroupedByDate).map((title) => (
          <div key={title}>
            <h4 className={cx('project__subheader')}>{title}</h4>
            <div>
              {slotsGroupedByDate[title]?.map((data) => (
                <li
                  className={cx("project__slots-list-item")}
                  key={data.commitUrl}
                >
                  <Commit {...data} />
                </li>
              ))}
            </div>
          </div>
        ))}
      </ul>
    </article>
  );
}

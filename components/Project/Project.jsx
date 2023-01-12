import classNames from "classnames/bind";
import styles from "./Project.module.css";
import { isDeadProject, getLastWeekActivity } from "../usecases/metrics";
import { Pulse } from "../Pulse/Pulse";
import { Loading } from "../Loading/Loading";
import { SlotsInfo } from "../Slots/SlotsInfo";
import { Chips } from "../Chips/Chips";
import { useCallback } from "react";

const cx = classNames.bind(styles);

export default function Project({ openProject, ...project }) {
  const { title, icon, url, stats, links } = project;
  const link = new URL(url).host;
  const onClick = useCallback(() => {
    openProject(project.git);
  }, [openProject, project.git]);

  if (!stats)
    return (
      <article className={cx("project")}>
        <h2 className={cx("project__title")}>{title}</h2>
        <div className={cx("project__section")}>
          <Loading />
        </div>
      </article>
    );

  const isApiError = stats?.activity.length === undefined;
  const activityByWeeks = stats?.activity.length
    ? stats?.activity?.map((a) => a.total)
    : [];
  const isDead = isDeadProject(activityByWeeks);
  const lastActivity = getLastWeekActivity(activityByWeeks);

  return (
    <article
      onClick={onClick}
      className={cx("project", "project_hover", {
        ["project_dead"]: !isApiError && isDead,
        ["project_disabled"]: isApiError,
      })}
    >
      <div className={cx("project__cover")}></div>
      <img
        className={cx("project__icon")}
        src={`/images/${icon}`}
        alt={title}
      />
      <h2 className={cx("project__title")}>
        <a href={stats.repository.html_url} target="_blank" rel="noreferrer">
          {title}
        </a>
      </h2>
      <a
        href={url}
        className={cx("project__link")}
        target="_blank"
        rel="noreferrer"
      >
        {link}
      </a>
      <div className={cx("project__section", "project__description")}>
        {stats.repository.description}
      </div>
      <div className={cx("project__section")}>
        <Chips links={links} />
      </div>
      <div className={cx("project__section")}>
        <Pulse activity={activityByWeeks} isDead={isDead} />
      </div>
      <div className={cx("project__section")}>
        <SlotsInfo project={project} repository={stats.repository} />
      </div>

      <div className={cx("project__section")}>
        {isDead && !isApiError && (
          <div>Последняя активность {lastActivity} нед. назад</div>
        )}
      </div>
    </article>
  );
}

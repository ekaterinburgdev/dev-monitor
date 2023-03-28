import { useCallback } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./Project.module.css";
// import { isDeadProject, getLastWeekActivity } from "../usecases/metrics";
import { Pulse } from "../Pulse/Pulse";
import { Loading } from "../Loading/Loading";
// import { Chips } from "../Chips/Chips";

const cx = classNames.bind(styles);

export default function Project({ openProject, ...project }) {
  const { title, cover, icon, url, stats, fullStat } = project;

  const link = new URL(url).host;
  const onClick = useCallback(() => {
    openProject(project);
  }, [openProject, project]);

  if (!stats)
    return (
      <article className={cx("project")}>
        <div className={cx("project__loader")}>
          <h2 className={cx("project__title")}>{title}</h2>
          <div className={cx("project__section")}>
            <Loading />
          </div>
        </div>
      </article>
    );

  // const isApiError = stats?.activity.length === undefined;
  const activityByWeeks = stats?.activity.length
    ? stats?.activity?.map((a) => a.total)
    : [];
  // const isDead = isDeadProject(activityByWeeks);
  // const lastActivity = getLastWeekActivity(activityByWeeks);
  const issues = fullStat.issues;

  return (
    <article
      onClick={onClick}
      className={cx("project", "project_hover", {
        // ["project_dead"]: !isApiError && isDead,
        // ["project_disabled"]: isApiError,
      })}
    >
      {cover && (
        <Image
          className={cx("project__cover")}
          src={cover}
          alt={title}
          width="640"
          height="400"
        />
      )}
      <div className={cx("project__content")}>
        <Image
          className={cx("project__icon")}
          src={icon}
          alt={title}
          width="28"
          height="28"
        />
        <h2 className={cx("project__title")}>{title}</h2>
        <div className={cx("project__section", "project__description")}>
          {stats.repository.description}
        </div>
        <div className={cx("project__section")}>
          <a
            href={url}
            className={cx("project__link")}
            target="_blank"
            rel="noreferrer"
          >
            {link}
          </a>
        </div>
        {/* <div className={cx("project__section")}>
          <Chips links={links} />
        </div> */}
        {issues > 0 && (
          <div className={cx("project__section")}>
            <div className={cx("project__label")}>
              {issues} open issue{issues === 1 ? "" : "s"}
            </div>
          </div>
        )}
        <div className={cx("project__section")}>
          <Pulse
            activity={activityByWeeks}
            // isDead={isDead}
          />
        </div>
      </div>
    </article>
  );
}

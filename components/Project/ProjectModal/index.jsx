import classNames from "classnames/bind";
import Image from "next/image";
import styles from "../Project.module.css";
// import { isDeadProject } from "../../usecases/metrics";
// import { Pulse } from "../../Pulse/Pulse";
import { Loading } from "../../Loading/Loading";
import { Slots } from "../../Slots/Slots";
import { Chips } from "../../Chips/Chips";

const cx = classNames.bind(styles);

export function ProjectModal({ onClick, ...project }) {
  const { title, icon, url, stats, links, cover } = project;
  const link = new URL(url).host;

  // const activityByWeeks = stats?.activity.length
  //   ? stats?.activity?.map((a) => a.total)
  //   : [];
  // const isDead = isDeadProject(activityByWeeks);

  if (!stats)
    return (
      <article className={cx("project")}>
        <h2 className={cx("project__title")}>{title}</h2>
        <div className={cx("project__section")}>
          <Loading />
        </div>
      </article>
    );

  return (
    <article
      className={classNames(cx("project"), cx("project_no_shadow"))}
      onClick={onClick}
    >
      {/* {cover && (
        <Image
          className={cx("project__cover")}
          src={cover}
          alt={title}
          width="640"
          height="400"
        />
      )} */}
      <div className={cx("project__content")}>
        <Image
          className={cx("project__icon")}
          src={icon}
          alt={title}
          width="28"
          height="28"
        />
        <h2 className={cx("project__title")}>
          <a href={stats.repository.html_url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h2>
        {/* <a
          href={url}
          className={cx("project__link")}
          target="_blank"
          rel="noreferrer"
        >
          {link}
        </a> */}
        {/* <div className={cx("project__section", "project__description")}>
          {stats.repository.description}
        </div> */}
        {/* <div className={cx("project__section")}> */}
        <Chips
          links={[
            {
              name: link,
              url,
            },
          ].concat(links)}
        />
        {/* </div> */}
        {/* <div className={cx("project__section")}>
          <Pulse activity={activityByWeeks} isDead={isDead} />
        </div> */}
        <div className={cx("project__section")}>
          <Slots {...project} repository={stats.repository} />
        </div>
      </div>
    </article>
  );
}

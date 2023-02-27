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
  const { title, icon, url, stats, links } = project;
  const link = new URL(url).host;

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
        <Chips links={[{ name: link, url }].concat(links)} />
        <div className={cx("project__section")}>
          <Slots {...project} repository={stats.repository} />
        </div>
      </div>
    </article>
  );
}

import classNames from "classnames/bind";
import styles from "./Project.module.css";
import { Pulse } from "../Pulse/Pulse";
import { Loading } from "../Loading/Loading";
import { Slots } from "../Slots/Slots";
import { Chips } from "../Chips/Chips";
import Image from "next/image";

const cx = classNames.bind(styles);

export default function Project({
  title,
  cover,
  icon,
  url,
  stats,
  slots,
  links,
}) {
  const link = new URL(url).host;

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

  return (
    <article className={cx("project")}>
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
          <Pulse activity={stats?.activity} />
        </div>
        <div className={cx("project__section")}>
          <Chips
            links={[
              {
                name: `Pull requests (${stats.pulls})`,
                url: `${stats.repository.html_url}/pulls`,
              },
              {
                name: `Issues (${stats.repository.open_issues})`,
                url: `${stats.repository.html_url}/issues`,
              },
            ]}
          />
        </div>
        <div className={cx("project__section")}>
          <Slots url={url} slots={slots} />
        </div>
      </div>
    </article>
  );
}

import classNames from "classnames/bind";
import styles from "./ProjectInfo.module.css";
import projectsConfig from "../../projects.config";

const cx = classNames.bind(styles);

export default function ProjectInfo({ git, links, stats }) {
  if (!stats) return null
  
  return (
    <div className={cx("info")}>
      <ul className={cx("info__list")}>
        {git && (
          <li className={cx("info__item")} key="git">
            <a
              href={`https://github.com/${projectsConfig.organization}/${git}`}
              target="_blank"
              rel="noreferrer"
              className={cx("info__link")}
            >
              Github
            </a>
          </li>
        )}
        {links.map(({ name, url }) => (
          <li className={cx("info__item")} key={name}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={cx("info__link")}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

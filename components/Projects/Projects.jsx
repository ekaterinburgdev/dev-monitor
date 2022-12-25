import classNames from "classnames/bind";
import Project from "../Project/Project";
import styles from "./Projects.module.css";

const cx = classNames.bind(styles);

export default function Projects({ projectsData }) {
  return (
    <div className={cx("project-list")}>
      {projectsData.map((project) => (
        <div className={cx("project-list__item")} key={project.git}>
          <Project {...project} />
        </div>
      ))}
    </div>
  );
}

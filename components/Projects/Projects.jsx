import classNames from "classnames/bind";
import Project from "../Project/Project";
import styles from "./Projects.module.css";

const cx = classNames.bind(styles);

export default function Projects({ projectsData }) {
  let sortedProjects = projectsData;
  try {
    sortedProjects = projectsData.sort((a, b) => {
      const aDate = new Date(a.stats.repository.pushed_at);
      const bDate = new Date(b.stats.repository.pushed_at);
      if (bDate < aDate) {
        return -1;
      }
      if (bDate > aDate) {
        return 1;
      }
      return 0;
    });
  } catch (e) {
  }

  return (
    <div className={cx("project-list")}>
      {sortedProjects.map((project) => (
        <div className={cx("project-list__item")} key={project.git}>
          <Project {...project} />
        </div>
      ))}
    </div>
  );
}

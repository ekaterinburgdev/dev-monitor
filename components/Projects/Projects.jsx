import classNames from "classnames/bind";
import Project from "../Project/Project";
import styles from "./Projects.module.css";

const cx = classNames.bind(styles);

export default function Projects({ projectsData }) {
  let sortedByLastContribution;

  try {
    sortedByLastContribution = projectsData
      .map((project) => {
        const lastContributionDate = project.slots?.[0]?.date;
        const lastContribution = lastContributionDate ? new Date(lastContributionDate).getTime() : -1;
        return { ...project, lastContribution };
      })
      .sort((a, b) => b.lastContribution - a.lastContribution);

  } catch (e) {
    sortedByLastContribution = projectsData;
  }

  return (
    <div className={cx("project-list")}>
      {sortedByLastContribution.map((project) => (
        <div className={cx("project-list__item")} key={project.git}>
          <Project {...project} />
        </div>
      ))}
    </div>
  );
}

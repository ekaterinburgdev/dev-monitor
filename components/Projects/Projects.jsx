import classNames from "classnames/bind";
import Project from "../Project/Project";
import { ProjectModal } from "../Project/ProjectModal";
import styles from "./Projects.module.css";
import { Modal, useModal } from "../Modal";

const cx = classNames.bind(styles);

export default function Projects({ isWidgetVersion, projectsData }) {
  const { isOpen, open, close, data: openedProjectId } = useModal();

  let sortedProjects = projectsData
    .filter((p) => !p.parentGit) // hide sub git repositories
    .map((p) => ({
      ...p,
      // add children projects
      children: projectsData.filter((pp) => p.git === pp.parentGit),
    }))
    .map((p) => ({
      ...p,
      fullStat: {
        issues: [p?.stats]
          .concat(p?.children.map((c) => c.stats))
          ?.reduce((all, item) => all + item?.repository.open_issues_count, 0),
      },
    }));

  try {
    sortedProjects = sortedProjects.sort((a, b) => {
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
  } catch (e) {}

  const selectedProject = sortedProjects.find((p) => p.git === openedProjectId);

  const onProjectClick = (project) => {
    if (isWidgetVersion) {
      window.parent.open(project.stats.repository.html_url, '_blank')
    } else {
      open(project.git);
    }
  };

  return (
    <div className={cx("project-list")}>
      {!isWidgetVersion && (
        <Modal isOpen={isOpen} close={close}>
          {isOpen && selectedProject && <ProjectModal {...selectedProject} />}
        </Modal>
      )}
      {sortedProjects.map((project) => (
        <div className={cx("project-list__item")} key={project.git}>
          <Project {...project} openProject={onProjectClick} />
        </div>
      ))}
    </div>
  );
}

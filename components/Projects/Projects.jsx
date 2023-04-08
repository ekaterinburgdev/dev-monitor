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

  const selectedProject = sortedProjects.find((p) => p.git === openedProjectId);

  const onProjectClick = (project) => {
    if (!isWidgetVersion) {
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
          <Project 
            widgetLink={isWidgetVersion && project?.stats?.repository.html_url}
            openProject={onProjectClick}
            {...project} 
          />
        </div>
      ))}
    </div>
  );
}

import classNames from "classnames/bind";
import Project from "../Project/Project";
import { ProjectModal } from "../Project/ProjectModal";
import styles from "./Projects.module.css";
import { Modal, useModal } from "../Modal";

const cx = classNames.bind(styles);

export default function Projects({ projectsData }) {
  const { isOpen, open, close, data: openedProjectId } = useModal();

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
  } catch (e) {}

  const selectedProject = sortedProjects.find((p) => p.git === openedProjectId);

  return (
    <div className={cx("project-list")}>
      <Modal isOpen={isOpen} close={close}>
        {isOpen && selectedProject && <ProjectModal {...selectedProject} />}
      </Modal>
      {sortedProjects.map((project) => (
        <div className={cx("project-list__item")} key={project.git}>
          <Project {...project} openProject={open} />
        </div>
      ))}
    </div>
  );
}

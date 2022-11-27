import classNames from 'classnames/bind';
import Project from '../Project/Project';

import styles from './ProjectList.module.css';

const cx = classNames.bind(styles);

/** @param {{ projectsData: import("../../types/projects-config").Project[] }} */
export default function ProjectList({ projectsData }) {
    return (
        <div className={cx('project-list')}>
            {projectsData.map((project) => (
                <div className={cx('project-list__item')} key={project.git}>
                    <Project {...project} />
                </div>
            ))}
        </div>
    );
}

import classNames from "classnames/bind";
import { groupBy } from "lodash";
import { useEffect, useState } from "react";
import { Activity } from "../Activity/Activity";
import Project from "../Project/Project";

import styles from "./ProjectList.module.css";

const cx = classNames.bind(styles);

export default function ProjectList({ projectsData }) {
  const [activity, setActivity] = useState([]);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const activity = projectsData
      .map((p) => p?.stats?.activity)
      .filter(Boolean)
      .flat();
    const byWeek = groupBy(activity, (item) => item.week);
    const byTotal = Object.keys(byWeek).map((weekstamp) => {
      const week = byWeek[weekstamp];
      return {
        week: weekstamp,
        days: week
          .map((w) => w.days)
          .filter(Boolean)
          .reduce((all, row) => {
            row.forEach((cell, columlIndex) => {
              all[columlIndex] = all[columlIndex] || 0;
              all[columlIndex] += cell;
            });

            return all;
          }, []),
        total: week.reduce((all, item) => all + item.total, 0),
      };
    });

    setActivity(byTotal);
  }, [projectsData]);

  useEffect(() => {
    const contributors = projectsData
      .map((p) => p?.stats?.contributors)
      .filter(Boolean)
      .flat();

    const byLogin = groupBy(contributors, (item) => item.login);

    const contributions = Object.keys(byLogin).map((login) => {
      const user = byLogin[login];
      return {
        ...user[0],
        contributions: user.reduce((all, item) => all + item.contributions, 0),
      };
    }).sort((a, b) => b.contributions - a.contributions)

    setContributors(contributions);
  }, [projectsData]);

  return (
    <div className={cx("projects")}>
      <Activity activity={activity} contributors={contributors} />
      <div className={cx("project-list")}>
        {projectsData.map((project) => (
          <div className={cx("project-list__item")} key={project.git}>
            <Project {...project} />
          </div>
        ))}
      </div>
    </div>
  );
}

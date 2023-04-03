import classNames from "classnames/bind";
import { groupBy } from "lodash";
import { useEffect, useState } from "react";
import { Activity } from "../Activity/Activity";
import { uniqBy } from "lodash";
import { Contributions } from "../Contributions/Contributions";
import { Contributors } from "../Contributors/Contributors";
import { commitDateFormatter } from "../Activity/utils";
import Projects from "../Projects/Projects";
import styles from "./Dashboard.module.css";

const cx = classNames.bind(styles);

export function Dashboard({ projectsData, isWidgetVersion }) {
  const [activity, setActivity] = useState([]);
  const [contributors, setContributors] = useState([]);
  const mainProjects = projectsData.filter((p) => !p.parentGit);
  const numberOfProjects = mainProjects.length;
  const numberOfRepos = projectsData.length;

  useEffect(() => {
    const activity = projectsData
      .map((p) => p?.stats?.activity)
      .filter(Boolean)
      .flat();

    const byWeek = groupBy(activity, (item) => item.week);
    const byTotal = Object.entries(byWeek)
      .map(([weekstamp, week]) => {
        return {
          week: weekstamp * 1000,
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
      })
      .filter((w) => w.week);

    setActivity(
      uniqBy(byTotal, (item) => commitDateFormatter.format(item.week))
    );
  }, [projectsData]);

  useEffect(() => {
    const contributors = projectsData
      .map((p) => p?.stats?.contributors)
      .filter(Boolean)
      .flat();

    const byLogin = groupBy(contributors, (item) => item.login);
    const contributions = Object.keys(byLogin)
      .map((login) => {
        const user = byLogin[login];
        return {
          ...user[0],
          contributions: user.reduce(
            (all, item) => all + item.contributions,
            0
          ),
        };
      })
      .sort((a, b) => b.contributions - a.contributions);

    setContributors(contributions);
  }, [projectsData]);

  return (
    <div className={cx("projects")}>
      {!isWidgetVersion && (
        <h1 className={cx("projects__title")}>ekaterinburg.dev projects</h1>
      )}
      <div className={cx("projects__grid")}>
        <div className={cx("projects__section", "projects__section_activity")}>
          <h2 className={cx("projects__subtitle")}>
            Activity{" "}
            <span className={cx("projects__info")}>
              <Contributions activity={activity} />
            </span>
          </h2>
          <div className={cx("projects__activity")}>
            <Activity activity={activity} />
          </div>
        </div>
        <div
          className={cx("projects__section", "projects__section_contributors")}
        >
          <h2 className={cx("projects__subtitle")}>
            Contributors{" "}
            {contributors.length > 0 && (
              <span className={cx("projects__info")}>
                {contributors.length}
              </span>
            )}
          </h2>
          <Contributors contributors={contributors} />
        </div>
        <div className={cx("projects__section", "projects__section_repos")}>
          <div className={cx("projects__subtitle")}>
            Projects {" "}
            <span className={cx("projects__info")}>{numberOfProjects}</span> ·
            Repositories{" "}
            <span className={cx("projects__info")}>{numberOfRepos}</span>
          </div>
          <Projects
            isWidgetVersion={isWidgetVersion}
            projectsData={projectsData}
          />
        </div>
      </div>
    </div>
  );
}

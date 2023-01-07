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
import { getContributions } from "../Contributors/getContributions";

const cx = classNames.bind(styles);

export function Dashboard({ projectsData }) {
  const [activity, setActivity] = useState([]);
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const activity = projectsData
      .map((p) => p?.stats?.activity)
      .filter(Boolean)
      .flat();

    const byWeek = groupBy(activity, (item) => item.week);
    const byTotal = Object.keys(byWeek)
      .map((weekstamp) => {
        const week = byWeek[weekstamp];
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

    const contributions = getContributions(contributors)

    setContributors(contributions);
  }, [projectsData]);

  return (
    <div className={cx("projects")}>
      <h1 className={cx("projects__title")}>ekaterinburg.dev projects</h1>
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
            {contributors.length && <span className={cx("projects__info")}>{contributors.length}</span>}
          </h2>
          <Contributors contributors={contributors} scaled />
        </div>
        <div className={cx("projects__section", "projects__section_repos")}>
          <h2 className={cx("projects__subtitle")}>
            Repositories{" "}
            <span className={cx("projects__info")}>{projectsData.length}</span>
          </h2>
          <Projects projectsData={projectsData} />
        </div>
      </div>
    </div>
  );
}

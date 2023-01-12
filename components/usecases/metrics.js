const DAY = 1000 * 60 * 60 * 24;

export function isDeadProject(activityByWeeks) {
  // last two weeks have no activity (less than 3 commit)
  return activityByWeeks.slice(-2).reduce((all, item) => all + item, 0) < 3;
}

export function getLastWeekActivity(activityByWeeks) {
  return activityByWeeks
    .slice()
    .reverse()
    .findIndex((item) => item > 0);
}

export function isDeadBranch(date) {
  const diffTime = Math.abs(new Date() - new Date(date));
  const diffDays = Math.ceil(diffTime / DAY);

  return diffDays > 10;
}

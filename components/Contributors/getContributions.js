import { groupBy } from "lodash";

export function getContributions(contributors) {
  const byLogin = groupBy(contributors, (item) => item.login);
  const contributions = Object.keys(byLogin)
    .map((login) => {
      const user = byLogin[login];
      return {
        ...user[0],
        contributions: user.reduce((all, item) => all + item.contributions, 0),
      };
    })
    .sort((a, b) => b.contributions - a.contributions);

  return contributions;
}

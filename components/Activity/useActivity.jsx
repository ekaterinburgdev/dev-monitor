import { useMemo } from "react";
import { groupBy } from "lodash";
import {
  clearDuplicatedMonth,
  monthFormatter,
  commitDateFormatter,
} from "./utils";

const DAY = 1000 * 60 * 60 * 24;

const descriptionFormatter = ({ index, day, week }) => {
  const date = week + index * DAY;

  return {
    short: `${day}, ${commitDateFormatter.format(date)}`,
    full: `${day} contribution${
      day > 1 ? `s` : ""
    } on ${commitDateFormatter.format(date)}`,
  };
};

export function useActivity({ activity, limit }) {
  const { months, days } = useMemo(() => {
    if (!activity) return {};

    // Year
    const year = activity.slice(-limit);

    // Days
    const days = year
      .reduce(
        (all, item) =>
          all.concat(
            item.days.map((d, index) => ({ day: d, week: item.week, index }))
          ),
        []
      )
      .map((item) => {
        const result = { ...item, description: descriptionFormatter(item) };
        if (item.day > 6) return { ...result, level: 3 };
        if (item.day > 3) return { ...result, level: 2 };
        if (item.day > 0) return { ...result, level: 1 };

        return { ...result, level: 0 };
      });

    // Contributions per month
    const byMonthsContributions = groupBy(
      year.map((w) => ({ ...w, month: new Date(w.week).getMonth() })),
      (w) => w.month
    );

    for (let month in byMonthsContributions) {
      byMonthsContributions[month] = byMonthsContributions[month].reduce(
        (acc, w) => acc + w.total,
        0
      );
    }

    // Months
    const months = clearDuplicatedMonth(
      year.map((w) => new Date(w.week).getMonth()).filter(Boolean)
    ).map((monthIndex) => {
      if (!monthIndex) return { month: "", contributions: "" };

      return {
        month: monthFormatter.format(new Date(2022, monthIndex)),
        contributions: byMonthsContributions[monthIndex] || 0,
      };
    });

    return { months, days };
  }, [activity, limit]);

  return {
    months,
    days,
  };
}

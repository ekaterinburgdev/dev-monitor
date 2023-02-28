import { groupBy } from "lodash";
import { useState, useEffect } from "react";

export function useSlots({ project, loadItems }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const projects = [project].concat(project?.children).filter((p) => p?.git);

  const init = async () => {
    if (loaded) return;

    const itemsData = await Promise.all(
      projects.map(async (project) => {
        const items = await loadItems(project.git);
        return items.map((item) => ({
          ...item,
          repository: project?.stats?.repository,
        }));
      })
    );

    setItems(itemsData?.flat());
    setLoaded(true);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loaded,
    items,
    projects: projects.reduce((acc, project) => {
      acc[project.git] = project;
      return acc;
    }, {}),
    repos: Object.entries(groupBy(items, (item) => item.repository.name)),
  };
}

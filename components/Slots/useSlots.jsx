import { useState, useEffect } from "react";

export function useSlots({ repos, loadItems }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const init = async () => {
    if (loaded) return;

    const itemsData = await Promise.all(repos.map((git) => loadItems(git)));

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
  };
}

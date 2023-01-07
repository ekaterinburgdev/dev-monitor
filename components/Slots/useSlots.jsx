import { useState, useEffect } from "react";

export function useSlots({ git, vercel, loadItems }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const init = async () => {
    if (loaded) return;

    const itemsData = await loadItems(git, vercel);

    setItems(itemsData);
    setLoaded(true);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstItems = items.slice(0, 5);
  const hasMoreItems = items.length > firstItems.length;

  return {
    loaded,
    items,
    firstItems,
    hasMoreItems,
  };
}

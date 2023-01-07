import { useCallback, useState } from "react";

export function useModal() {
  const [data, setOpen] = useState(null);

  const open = useCallback((params) => setOpen(params), [setOpen]);
  const close = useCallback(() => setOpen(null), [setOpen]);

  const isOpen = Boolean(data);

  return { isOpen, open, close, data };
}

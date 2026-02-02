import { useState } from "react";

export function useWindow() {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => {
      setOpen(val => !val);
  }
  return [open, toggle] as const;
}

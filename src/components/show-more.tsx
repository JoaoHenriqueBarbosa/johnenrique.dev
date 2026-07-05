"use client";

import { useState } from "react";

export function ShowMore({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-10 w-full rounded-lg border py-3.5 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:border-input hover:text-foreground"
        >
          {label} ↓
        </button>
      )}
      <div hidden={!open}>{children}</div>
    </>
  );
}

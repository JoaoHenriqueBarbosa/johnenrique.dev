"use client";

import { useState } from "react";
import { track } from "@/lib/tracking/client";

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
          onClick={() => {
            setOpen(true);
            track("show_more");
          }}
          className="mt-10 w-full rounded-lg border py-3.5 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:border-input hover:text-foreground"
        >
          {label} ↓
        </button>
      )}
      <div hidden={!open}>{children}</div>
    </>
  );
}

"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/lib/tracking/client";

export function CopyEmail({
  copyLabel,
  copiedLabel,
}: {
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(site.email);
        track("contact_intent", { method: "copy", location: "contact" });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-input hover:text-foreground"
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-success" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}

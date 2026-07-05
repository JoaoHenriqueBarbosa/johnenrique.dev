"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { track } from "@/lib/tracking/client";

const labels = { "en": "EN", "pt-BR": "PT" } as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <span className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground/50">/</span>}
          <Link
            // pathname+params reproduce the current route in the other locale
            href={{ pathname, params } as never}
            locale={l}
            onClick={() => {
              if (l !== locale) track("locale_switch", { from: locale, to: l });
            }}
            className={cn(
              "px-0.5 transition-colors",
              l === locale
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {labels[l]}
          </Link>
        </span>
      ))}
    </span>
  );
}

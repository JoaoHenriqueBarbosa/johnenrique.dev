"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { omit } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

export function LanguageSwitcher({
  variant = "dropdown",
}: {
  variant: "dropdown" | "radio";
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLocale = (newLocale: string) => {
    // @ts-ignore
    router.push({
        pathname,
        params: omit(params, "locale"),
      },
      { locale: newLocale }
    );
  };

  if (variant === "radio") {
    return (
      <div className="flex flex-col gap-5">
        <Label className="text-md">Language</Label>
        <RadioGroup value={locale} onValueChange={switchLocale} className="gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="en" id="en"/>
            <Label htmlFor="en">English</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pt-BR" id="pt-BR"/>
            <Label htmlFor="pt-BR">Português (Brasil)</Label>
          </div>
        </RadioGroup>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="hover:bg-primary/20 px-2 py-2 rounded">
          <GlobeIcon className="h-5 w-5 text-white drop-shadow" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => switchLocale("en")}
              isActive={locale === "en"}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => switchLocale("pt-BR")}
              isActive={locale === "pt-BR"}
            >
              Português (Brasil)
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@/i18n/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";
import { usePathname } from "@/i18n/navigation";

export function Header() {
  const [scroll, setScroll] = useState(false);
  const t = useTranslations("header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 200);
    });
  }, []);

  return (
    <header
      className={cn(
        "w-full fixed px-4 top-0 z-30 header",
        scroll ? "header-glass-dark" : "header-glass"
      )}
    >
      <div className="container mx-auto px-3 sm:px-10 flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/john.jpg" />
              <AvatarFallback>{t("initials")}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white drop-shadow-xl">
                {t("name")}
              </h1>
              <p className="text-xs sm:text-sm text-white drop-shadow-xl">{t("role")}</p>
            </div>
          </Link>
        </div>
        <nav className="hidden lg:space-x-6 md:space-x-4 md:flex items-center">
          <Link
            href="/blog"
            className="text-md font-medium text-primary-foreground hover:underline drop-shadow-xl"
            prefetch={false}
          >
            {t("nav.blog")}
          </Link>
          <Link
            // @ts-ignore
            href={pathname !== "/" ? "/#projects" : "#projects"}
            className="text-md font-medium text-primary-foreground hover:underline drop-shadow-xl hidden lg:block"
          >
            {t("nav.work")}
          </Link>
          <Link
            href="/about"
            className="text-md font-medium text-primary-foreground hover:underline drop-shadow-xl"
            prefetch={false}
          >
            {t("nav.about")}
          </Link>
          <Link
            // @ts-ignore
            href={pathname !== "/" ? "/#contact" : "#contact"}
            className="text-md font-medium text-primary-foreground hover:underline drop-shadow-xl"
          >
            {t("nav.contact")}
          </Link>
          <LanguageSwitcher variant="dropdown" />
          <Link
            // @ts-ignore
            href={pathname !== "/" ? "/#contact" : "#contact"}
            className={cn(
              "hidden md:inline-flex text-md ml-4 md:px-4 lg:px-8",
              buttonVariants({
                variant: "default",
                size: "lg",
              })
            )}
          >
            {t("cta")}
          </Link>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link
                href="/blog"
                className="text-lg font-medium text-foreground hover:underline"
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                {t("nav.blog")}
              </Link>
              <Link
                // @ts-ignore
                href={pathname !== "/" ? "/#projects" : "#projects"}
                className="text-lg font-medium text-foreground hover:underline"
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                {t("nav.work")}
              </Link>
              <Link
                href="/"
                className="text-lg font-medium text-foreground hover:underline"
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                // @ts-ignore
                href={pathname !== "/" ? "/#contact" : "#contact"}
                className="text-lg font-medium text-foreground hover:underline"
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                {t("nav.contact")}
              </Link>
              <Link
                // @ts-ignore
                href={pathname !== "/" ? "/#contact" : "#contact"}
                className={buttonVariants({
                  variant: "default",
                  size: "lg",
                })}
              >
                {t("cta")}
              </Link>
              <hr />
              <LanguageSwitcher variant="radio" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>): React.JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

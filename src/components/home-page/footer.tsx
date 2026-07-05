import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Script from "next/script";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6">
      <div className="container flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 overflow-x-clip">
        <div
          className="badge-base LI-profile-badge"
          data-locale="pt_BR"
          data-size="medium"
          data-theme="dark"
          data-type="HORIZONTAL"
          data-vanity="john-enrique"
          data-version="v1"
        >
          <a
            className="badge-base__link LI-simple-link"
            href="https://br.linkedin.com/in/john-enrique?trk=profile-badge"
          >
            João Henrique
          </a>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Obrigado!</h3>
          <p className="text-sm mb-4">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/john-enrique/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              <svg
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://github.com/JoaoHenriqueBarbosa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              <svg
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
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        async
        defer
        type="text/javascript"
      />
    </footer>
  );
}

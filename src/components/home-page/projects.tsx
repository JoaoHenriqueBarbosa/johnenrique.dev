import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useTranslations, useLocale } from "next-intl";
import enProjects from "@/content/en/projects";
import ptBRProjects from "@/content/pt-BR/projects";
import { buttonVariants } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type Project = {
  slug: string;
  title: string;
  description: string;
  url?: string;
  github?: string;
  readme: string;
  cover: string;
  images: string[];
};

export function Projects({ className }: { className?: string }) {
  const locale = useLocale();

  const projects =
    locale === "pt-BR" ? ptBRProjects : (enProjects as Project[]);

  return (
    <section id="projects" className={cn(className, "py-5")}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  url,
  slug,
  cover,
  className,
}: {
  title: string;
  description: string;
  url?: string;
  slug?: string;
  cover: string;
  className?: string;
}) {
  const t = useTranslations("projects");

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <Image
          src={`/${cover}`}
          alt={title}
          width={640}
          height={360}
          className="noremark h-[150px] rounded-lg border object-cover"
        />
      </CardHeader>
      <CardContent className="mt-0 flex h-full flex-col justify-between space-y-4 p-6 !pt-0">
        <div className="space-y-3">
          <h3 className="noremark text-lg font-semibold tracking-tight">
            {title}
          </h3>
          <p className="noremark line-clamp-6 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex gap-2">
          {url && (
            <a
              href={url}
              className={cn(
                "noremark",
                buttonVariants({ variant: "default", size: "sm" })
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("liveDemo")}
            </a>
          )}
          {slug && (
            <Link
              href={{
                pathname: "/projects/[slug]",
                params: { slug },
              }}
              className={cn(
                "noremark",
                buttonVariants({
                  variant: url ? "outline" : "default",
                  size: "sm",
                })
              )}
            >
              {t("readMore")}
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

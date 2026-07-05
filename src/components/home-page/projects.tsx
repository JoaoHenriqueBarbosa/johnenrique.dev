import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
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

export function Projects({
  className,
  homePage
}: {
  className?: string;
  homePage?: boolean;
}) {
  const t = useTranslations("projects");
  const locale = useLocale();

  const projects =
    locale === "pt-BR" ? ptBRProjects : (enProjects as Project[]);

  return (
    <section
      id="projects"
      className={cn(className, "bg-muted py-5 px-6", homePage && "mt-[-178px]")}
    >
      {homePage && (
        <div className="h-[78px]"/>
      )}
      <div className="container max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4 relative z-20">
          <h2 className="text-3xl md:text-4xl font-bold noremark">{t("heading")}</h2>
          <p className="text-muted-foreground noremark">{t("description")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
          {homePage && (
          <ProjectCard
            title={t("more")}
            description={t("moreDescription")}
            otherLink="/blog/projects"
            cover="dev.webp"
            className="md:hidden"
          />
          )}
        </div>
        {homePage && (
          <Card className="hidden md:flex gap-6 p-6 items-center">
            <Image
              src="/dev.webp"
              alt="Developer"
              width={640}
              height={360}
              className="rounded-lg object-cover h-[150px] noremark"
            />
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-xl font-bold noremark">{t("more")}</h3>
              <p className="text-muted-foreground noremark">{t("moreDescription")}</p>
              <Link
                href={{
                  pathname: "/blog/[slug]",
                  params: { slug: "projects" },
                }}
                className={cn("noremark", buttonVariants({
                  variant: "default",
                  size: "md",
                }))}
              >
                {t("readMore")}
              </Link>
              </div>
          </Card>
        )}
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
  otherLink,
  className
}: {
  title: string;
  description: string;
  url?: string;
  slug?: string;
  otherLink?: string;
  cover: string;
  className?: string;
}) {
  const t = useTranslations("projects");

  return (
    <Card className={cn("flex flex-col z-20", className)}>
      <CardHeader>
        <Image
          src={`/${cover}`}
          alt={title}
          width={640}
          height={360}
          className="rounded-lg object-cover h-[150px] noremark"
        />
      </CardHeader>
      <CardContent className="!pt-0 mt-0 p-6 space-y-4 h-full flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-xl font-bold noremark">{title}</h3>
          <p className="text-muted-foreground line-clamp-6 noremark">{description}</p>
        </div>
        <div className="flex gap-2">
          {url && (
            <a
              href={url}
              className={cn("noremark",buttonVariants({ variant: "default", size: "md" }))}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("liveDemo")}
            </a>
          )}
          {otherLink && (
          <Link
          // @ts-ignore
            href={otherLink}
            className={cn("noremark", buttonVariants({
              variant: "default",
              size: "md",
            }))}
          >
            {t("readMore")}
          </Link>
          )}
          {slug && (
          <Link
            href={{
              pathname: "/projects/[slug]",
              params: { slug },
            }}
            className={cn("noremark", buttonVariants({
              variant: url ? "outline" : "default",
              size: "md",
            }))}
          >
            {t("readMore")}
          </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

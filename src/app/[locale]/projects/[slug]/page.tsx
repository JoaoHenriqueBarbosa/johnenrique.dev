import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "next-intl";
import { notFound } from "next/navigation";
import Image from "next/image";
import { projects as enProjects } from "@/content/en/projects";
import { projects as ptBRProjects } from "@/content/pt-BR/projects";
import { Header } from "@/components/home-page/header";
import { Footer } from "@/components/home-page/footer";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Readme } from "@/components/readme";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

type Params = Promise<{ slug: string; locale: Locale }>;

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectPage");
  const commonT = await getTranslations("common");

  const projects = locale === "en" ? enProjects : ptBRProjects;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-dvh relative">
      <Header />
      <section className="relative w-full">
        <Image
          src="/holo-2.webp"
          alt="Hero Image"
          width={1120}
          height={630}
          quality={100}
          className="w-full object-cover object-center h-[350px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-10% to-60% from-muted/100 to-muted/0" />
        <div className="absolute inset-0 flex flex-col justify-center px-4">
          <div className="container mx-auto">
            <div className="h-[98px]"></div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">{commonT("home")}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/#projects">
                    {commonT("projects")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl mt-4 font-bold tracking-tight text-black md:text-5xl drop-shadow-xl">
              {project.title}
            </h1>
            <p className="mt-4 text-black md:text-xl drop-shadow-xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>
      <main className="flex-1 container mx-auto ">
        <div className="px-4 pb-8">
          <Carousel
            className="mr-10 max-h-[330px] mb-0 xl:mb-10"
            opts={{
              dragFree: true,
            }}
          >
            <CarouselContent className="py-4 px-2">
              <CarouselItem className="basis-1/2">
                <Dialog>
                  <DialogTrigger>
                    <Image
                      src={`/${project.cover}`}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <Image
                      src={`/${project.cover}`}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg"
                    />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
              {project.images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src={`/${image}`}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <Image
                        src={`/${image}`}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg"
                      />
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>

          {project.url || project.github ? (
            <div className="flex gap-4 mt-4 mb-8 flex-col md:flex-row">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                  })}
                >
                  {t("liveDemo")}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  {t("viewOnGitHub")}
                </a>
              )}
            </div>
          ) : (
            <Alert className="mb-4 space-x-2 border-yellow-800">
              <AlertCircleIcon className="h-6 w-6 stroke-yellow-800" />
              <AlertTitle className="text-yellow-800">
                {t("noPublicAccessTitle")}
              </AlertTitle>
              <AlertDescription className="text-yellow-800">
                {t("noPublicAccessDescription")}
              </AlertDescription>
            </Alert>
          )}

          <h2 className="text-2xl font-bold mb-4">{t("readme")}</h2>
          <Readme url={project.readme} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return enProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const projects = locale === "en" ? enProjects : ptBRProjects;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  const commonT = await getTranslations({ locale, namespace: "common" });

  return {
    title: `${project.title} | ${commonT("meta.title")}`,
    description: project.description,
    keywords: project.keywords?.join(", "),
    openGraph: {
      title: `${project.title} | ${commonT("meta.title")}`,
      description: project.description,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects/${slug}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${project.cover}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
        ...project.images.map((image) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        })),
      ],
      siteName: commonT("meta.title"),
    },
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/projects/${slug}`,
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${commonT("meta.title")}`,
      description: project.description,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${project.cover}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
        ...project.images.map((image) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/${image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        })),
      ],
    },
  };
}

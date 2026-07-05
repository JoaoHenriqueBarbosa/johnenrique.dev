import Image from "next/image";
import { useWordTyper } from "@/hooks/useWordTyper";
import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "../ui/button";

export function Hero() {
  const t = useTranslations('hero');
  const word = useWordTyper(t('typedWords').split(','));

  return (
    <section className="relative w-full">
      <Image
        src="/holo.webp"
        alt="Hero Image"
        width={1120}
        height={630}
        quality={100}
        className="h-[600px] sm:h-[500px] w-full object-cover object-center md:h-[600px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t to-60% from-muted/100 to-muted/0" />
      <div className="container absolute inset-0 flex flex-col items-center justify-center sm:px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl drop-shadow-xl">
          {t('heading')}<br/>{word}<span className="border-r-4 border-gray-800 animate-blink inline-block ">&nbsp;</span>
        </h1>
        <p className="mt-4 max-w-xl text-black md:text-xl drop-shadow-xl">
          {t('description')}
        </p>
        <div className="mt-8">
          <Link
            // @ts-ignore
            href="/#projects"
            className={buttonVariants({ size: "lg" })}
          >{t('cta')}</Link>
        </div>
      </div>
    </section>
  );
}

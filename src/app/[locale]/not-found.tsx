import { useTranslations } from "next-intl";
import { NotFoundTracker } from "@/components/not-found-tracker";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-screen grid place-content-center">
      <h1 className="text-2xl">{t("heading")}</h1>
      <NotFoundTracker />
    </div>
  );
}

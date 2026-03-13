import HomePage from "@/components/home/HomePage";
import { type Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}

import type { ReactNode } from "react";
import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerList = await headers();
  const locale = headerList.get("x-locale") ?? "es";

  return (
    <html lang={locale}>
      <body className={`${plusJakartaSans.variable} antialiased`}>{children}</body>
    </html>
  );
}

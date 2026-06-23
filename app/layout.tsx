import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { InvoiceProvider } from "@/context/invoice-context";
import { DirectionProvider } from "@/components/ui/direction";
import { TemplateProvider } from "@/context/template-context";

const bakh = localFont({
  src: "./YekanBakh.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "فاکتور",
  description: "ساخت فاکتور خرید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <InvoiceProvider>
        <TemplateProvider>
          <body className={bakh.className}>
            <DirectionProvider dir="rtl">{children}</DirectionProvider>
          </body>
        </TemplateProvider>
      </InvoiceProvider>
    </html>
  );
}

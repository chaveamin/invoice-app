import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { InvoiceProvider } from "@/context/invoice-context";

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
        <body className={bakh.className}>{children}</body>
      </InvoiceProvider>
    </html>
  );
}

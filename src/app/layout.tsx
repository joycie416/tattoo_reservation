import type { Metadata } from "next";
import "./globals.css";
import { Providers as QueryClientProvider } from "@/providers/QueryClientProvider";

export const metadata: Metadata = {
  title: "enan.tt 예약",
  description: "enan.tt 예약. 홍대, 합정 타투 예약.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider>
      <html lang="ko">
        <body className={` antialiased`}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}

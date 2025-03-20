import type { Metadata } from "next";
import "./globals.css";
import { Providers as QueryClientProvider } from "@/providers/QueryClientProvider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "enan.tt 예약",
  description: "enan.tt 예약. 홍대, 합정 타투 예약.",
};

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider>
      <html lang="ko">
        <body className={`bg-blue-100 ${inter.className} antialiased`}>
          <main className="w-full max-w-mobile min-h-screen mx-auto bg-white">
            {children}
          </main>
        </body>
      </html>
    </QueryClientProvider>
  );
}

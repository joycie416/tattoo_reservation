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
        <body
          className={`bg-blue-100 font-pretendard text-gray-100 tracking-[-0.025em] antialiased`}
        >
          <main className="w-full max-w-mobile min-h-screen mx-auto bg-white">
            {children}
          </main>
        </body>
      </html>
    </QueryClientProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Providers as QueryClientProvider } from "@/providers/QueryClientProvider";
import AdminProvider from "@/providers/AdminProvider";

export const metadata: Metadata = {
  title: "enan.tt 예약",
  description: "enan.tt 예약. 홍대, 합정 타투 예약.",
  openGraph: {
    description: "enan.tt 예약. 홍대, 합정 타투 예약.",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <QueryClientProvider>
      <AdminProvider>
        <html lang="ko">
          <body
            className={`bg-gray-30 font-pretendard text-gray-100 tracking-[-0.025em] antialiased`}
          >
            <main className="w-full max-w-mobile min-h-screen mx-auto bg-white">
              {children}
            </main>
            {modal}
          </body>
        </html>
      </AdminProvider>
    </QueryClientProvider>
  );
}

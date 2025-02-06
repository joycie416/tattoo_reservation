import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

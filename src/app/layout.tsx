import type { Metadata } from "next";
import { Geist_Mono, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Điện Máy Trần Điền - Giải pháp Điện máy Gia đình Việt",
  description: "Chuyên cung cấp các dịch vụ lắp đặt, sửa chữa và mua bán điện máy và các phụ kiện chất lượng cao, chính hãng.",
};

import { SupportWidget } from "@/components/layout/support-widget";
import { ScrollReset } from "@/components/layout/scroll-reset";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex flex-col">
        <ScrollReset />
          {children}
          <SupportWidget />
      </body>
    </html>
  );
}

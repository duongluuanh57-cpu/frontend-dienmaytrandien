import { Header } from "@/components/layout/header";
import { AboutPageSchema } from "@/components/seo/json-ld";
import { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "Giới thiệu | Điện Máy Trần Điền",
  description: "Trần Điền - Giải pháp điện máy hàng đầu. Hơn 9 năm kinh nghiệm thi công, phân phối máy lạnh Nagakawa, Panasonic, Kingpump, NEDFON chính hãng tại TP.HCM.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background overflow-x-hidden">
      <AboutPageSchema />
      <Header />
      
      <main className="bg-background">
        <AboutContent />
      </main>
    </div>
  );
}


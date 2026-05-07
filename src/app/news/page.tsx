import { Metadata } from "next";
import { NewsContent } from "./news-content";
import { Newspaper } from "lucide-react";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Tin tức & Sự kiện | Điện Máy Trần Điền",
  description: "Cập nhật những thông tin mới nhất về thị trường điện máy, các chương trình khuyến mãi và hướng dẫn sử dụng sản phẩm từ chuyên gia Trần Điền.",
  openGraph: {
    title: "Tin tức & Sự kiện | Điện Máy Trần Điền",
    description: "Cập nhật những thông tin mới nhất về thị trường điện máy, các chương trình khuyến mãi và hướng dẫn sử dụng sản phẩm từ chuyên gia Trần Điền.",
    type: "website",
  }
};

export default function NewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Tin tức & Sự kiện | Điện Máy Trần Điền",
    "description": "Cập nhật những thông tin mới nhất về thị trường điện máy, các chương trình khuyến mãi và hướng dẫn sử dụng sản phẩm từ chuyên gia Trần Điền.",
    "publisher": {
      "@type": "Organization",
      "name": "Điện Máy Trần Điền",
      "url": "https://trandien.com.vn"
    }
  };

  return (
    <div className="bg-background overflow-x-hidden min-h-screen flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-0 pb-20">
        {/* Inject JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="container mx-auto px-4 md:px-[50px]">
          {/* Page Hero Header */}
          <div className="text-center mb-12 relative">
            <span className="inline-block px-4 py-1.5 mb-6 text-[11px] font-black tracking-[0.2em] text-primary bg-primary/10 rounded-full uppercase">
              BẢN TIN & SỰ KIỆN
            </span>
            
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              TIN TỨC & <span className="text-primary">SỰ KIỆN</span>
              <span className="block text-[11px] font-black tracking-[0.3em] text-slate-400 uppercase mt-2">
                News & Events
              </span>
            </h1>

            <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Cập nhật những thông tin mới nhất về thị trường điện máy, các chương trình khuyến mãi 
              và hướng dẫn sử dụng sản phẩm hữu ích từ các chuyên gia hàng đầu.
            </p>
          </div>

          {/* Dynamic News Filter Grid & Modals */}
          <NewsContent />
        </div>
      </main>
    </div>
  );
}

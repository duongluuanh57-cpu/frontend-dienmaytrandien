"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Shield, Zap, Wrench } from "lucide-react";
import { AboutShort } from "@/components/home/about-short";
import { CompanyDetails } from "@/components/about/company-details";
import { useAppStore } from "@/store/use-app-store";
import { useLanguageStore } from "@/store/useLanguageStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoaded = useAppStore((state) => state.isLoaded);
  const { lang } = useLanguageStore();

  // SEO Schema - Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Trần Điền",
    "alternateName": "Tran Dien Electric & Air Conditioning",
    "url": "https://trandien.com.vn",
    "logo": "https://trandien.com.vn/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-xxx-xxx-xxx",
      "contactType": "customer service",
      "areaServed": "VN",
      "availableLanguage": ["Vietnamese", "English"]
    },
    "description": lang === "vi" 
      ? "Hơn 9 năm kinh nghiệm mang đến giải pháp không khí sạch, không gian mát cho gia đình và doanh nghiệp Việt."
      : "Over 9 years of experience bringing clean air and cool comfort solutions to Vietnamese families and businesses.",
    "sameAs": [
      "https://facebook.com/trandien",
      "https://youtube.com/@trandien"
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nếu chưa load xong preloader thì ẩn hết nội dung để tránh FOUC
      if (!isLoaded) {
        gsap.set([".about-hero-bg", ".about-hero-content", ".core-value-card"], { opacity: 0 });
        return;
      }

      // Analytics: Track page view interaction
      console.log("[Analytics] About Page Section Viewed: Hero");

      // Hero Banner Animation - Fade in & slide up smoothly
      gsap.fromTo(
         ".about-hero-content",
         { opacity: 0, y: 50 },
         { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );

      // Hero Banner Background Pulse
      gsap.fromTo(
        ".about-hero-bg",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );

      // Core Values Stagger Animation
      gsap.fromTo(
        ".core-value-card",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".core-values-section",
            start: "top 85%",
            onEnter: () => console.log("[Analytics] Scrolled to Core Values Section"),
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]); // Chạy lại khi isLoaded thay đổi

  return (
    <div ref={containerRef}>
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Banner Section */}
      <section 
        className="container mx-auto px-4 md:px-6 mb-16"
        aria-labelledby="about-hero-title"
      >
        <div className="about-hero-bg bg-primary/5 rounded-[40px] p-8 md:p-20 text-center border border-primary/10 shadow-sm relative overflow-hidden opacity-0">
           {/* Decorative Background - Hidden from screen readers */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
             <div className="absolute -top-1/2 -left-1/4 w-[50%] h-[150%] bg-blue-400/10 rounded-full blur-[80px]" />
             <div className="absolute -bottom-1/2 -right-1/4 w-[50%] h-[150%] bg-primary/10 rounded-full blur-[80px]" />
           </div>
           
           <div className="relative z-10 about-hero-content opacity-0">
             <span className="inline-block px-4 py-1.5 mb-6 text-[11px] font-black tracking-[0.2em] text-primary bg-primary/10 rounded-full uppercase">
               {lang === "vi" ? "Hành trình phát triển" : "Our Journey"}
             </span>
             <h1 
               id="about-hero-title"
               className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight uppercase"
             >
               {lang === "vi" ? (
                 <>GIỚI THIỆU VỀ <br className="md:hidden" /><span className="text-primary">TRẦN ĐIỀN</span></>
               ) : (
                 <>ABOUT <br className="md:hidden" /><span className="text-primary">TRAN DIEN</span></>
               )}
             </h1>
             <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
               {lang === "vi" 
                 ? "Hơn 9 năm kinh nghiệm mang đến giải pháp không khí sạch, không gian mát cho gia đình và doanh nghiệp Việt."
                 : "Over 9 years of experience bringing clean air and cool comfort solutions to Vietnamese families and businesses."}
             </p>
           </div>
        </div>
      </section>

      {/* Core Values */}
      <section 
        className="container mx-auto px-4 md:px-6 mb-16 core-values-section"
        aria-label={lang === "vi" ? "Giá trị cốt lõi của chúng tôi" : "Our Core Values"}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="core-value-card opacity-0 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center group">
            <div className="w-20 h-20 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300">
              <Shield className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
              {lang === "vi" ? "Chính Hãng 100%" : "100% Genuine"}
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              {lang === "vi"
                ? "Đại lý ủy quyền chính thức của các thương hiệu hàng đầu như Nagakawa, Panasonic, Kingpump, NEDFON. Đảm bảo nguồn gốc xuất xứ rõ ràng."
                : "Official authorized dealer of top brands such as Nagakawa, Panasonic, Kingpump, NEDFON. Guaranteeing clear product origin."}
            </p>
          </div>
          
          <div className="core-value-card opacity-0 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center group">
            <div className="w-20 h-20 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300">
              <Zap className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
              {lang === "vi" ? "Giải Pháp Tối Ưu" : "Optimal Solutions"}
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              {lang === "vi"
                ? "Luôn tư vấn và mang đến các dòng máy Inverter tiết kiệm điện năng, công nghệ tiên tiến nhất bảo vệ sức khỏe cho mọi không gian sống."
                : "Always consulting and bringing energy-saving Inverter systems with advanced health protection technologies for all living spaces."}
            </p>
          </div>

          <div className="core-value-card opacity-0 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center group">
            <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform duration-300">
              <Wrench className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
              {lang === "vi" ? "Thi Công Chuyên Nghiệp" : "Professional Execution"}
            </h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              {lang === "vi"
                ? "Đội ngũ kỹ thuật viên dày dặn kinh nghiệm, am hiểu kiến trúc. Đảm bảo quy trình thi công nhanh chóng, an toàn và có tính thẩm mỹ cao."
                : "Highly experienced technicians with deep architectural insight, ensuring fast, safe, and highly aesthetic installation."}
            </p>
          </div>
        </div>
      </section>

      {/* Detailed History with Animations */}
      <div className="max-w-6xl mx-auto border-t border-slate-100 pt-8">
        <AboutShort />
      </div>

      {/* Corporate Information Section */}
      <CompanyDetails />
    </div>
  );
}

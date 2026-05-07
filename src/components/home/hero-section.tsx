"use client";

import { useEffect } from "react";
import { ArrowRight, Zap, Shield } from "lucide-react";
import gsap from "gsap";
import { useAppStore } from "@/store/use-app-store";
import { useLanguageStore } from "@/store/useLanguageStore";

export function HeroSection() {
  const isLoaded = useAppStore((state) => state.isLoaded);
  const { lang } = useLanguageStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isLoaded) {
        // Ẩn trước để tránh bị giật (FOUC) khi preloader chuyển trạng thái
        gsap.set(["#main-banner", ".banner-title", ".banner-text", ".banner-btns", ".banner-decor"], {
          opacity: 0,
        });
        return;
      }

      const tl = gsap.timeline({ 
        defaults: { ease: "power4.out", duration: 1.2 } 
      });

      tl.fromTo("#main-banner", { opacity: 0, y: 30 }, { opacity: 1, y: 0, clearProps: "transform" })
        .fromTo(".banner-title", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.8")
        .fromTo(".banner-text", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(".banner-btns", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo(".banner-decor", { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 1 }, "-=0.8");

      gsap.to(".decor-icon", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section id="main-banner" className="relative w-full overflow-hidden flex flex-col pt-[10px] pb-4 transition-none opacity-0">
      <div className="container mx-auto px-0 md:px-[50px] flex flex-col">
        {/* Main Code Banner - Light Theme */}
        <div className="relative w-full min-h-[450px] md:min-h-[570px] overflow-hidden rounded-3xl shadow-xl bg-slate-50 flex items-center border border-slate-100">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full opacity-60 blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-blue-100/20 rounded-full opacity-40 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/50" />
          </div>

          <div className="relative z-10 px-8 md:px-16 w-full flex justify-between items-center hero-content">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6 uppercase tracking-tighter banner-title md:whitespace-nowrap">
                {lang === "vi" ? (
                  <>
                    Không khí sạch. <br className="hidden md:block" /> <span className="text-primary">Không gian</span> mát.
                  </>
                ) : (
                  <>
                    Clean air. <br className="hidden md:block" /> <span className="text-primary">Cool</span> space.
                  </>
                )}
              </h1>

              <p className="text-slate-600 text-base mb-8 max-w-3xl leading-relaxed font-medium banner-text">
                {lang === "vi" 
                  ? "Xử lý triệt để vấn đề nhiệt độ và chất lượng không khí cho mọi không gian. Giải pháp thiết thực, thi công chuẩn xác từ đội ngũ lành nghề."
                  : "Completely solve temperature and air quality issues for any space. Practical solutions, precise installation from our professional team."}
              </p>

              <div className="flex flex-wrap gap-4 banner-btns">
                <button 
                  aria-label={lang === "vi" ? "Khám phá các giải pháp máy lạnh và máy bơm" : "Explore HVAC and pump solutions"}
                  onClick={() => console.log("[Analytics] Home Hero Clicked: Explore Solutions")}
                  className="group px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2 hover:translate-y-[-2px] active:scale-95"
                >
                  <span>{lang === "vi" ? "Khám phá giải pháp" : "Explore Solutions"}</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
                <button 
                  aria-label={lang === "vi" ? "Liên hệ nhận báo giá" : "Contact for quote"}
                  onClick={() => console.log("[Analytics] Home Hero Clicked: Get Quote")}
                  className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                >
                  {lang === "vi" ? "Nhận báo giá" : "Get Quote"}
                </button>
              </div>
            </div>

            <div className="hidden lg:block relative banner-decor">
              <div className="relative">
                <div className="w-56 h-56 bg-white rounded-[40px] border border-slate-200 shadow-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
                  <Zap className="h-24 w-24 text-primary opacity-90 filter drop-shadow-sm decor-icon" />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Innovation</span>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white z-20">
                  <Shield className="text-white h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


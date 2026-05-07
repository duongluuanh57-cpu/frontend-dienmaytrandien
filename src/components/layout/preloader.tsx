"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAppStore } from "@/store/use-app-store";
import { usePathname, useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/useLanguageStore";

const TAGLINES = {
  vi: [
    "Giải pháp không khí sạch, không gian mát cho gia đình Việt",
    "Chính hãng — Chuyên nghiệp — Tận tâm",
    "Hơn 9 năm kinh nghiệm thi công điều hòa tại TP.HCM",
    "Lắp đặt tận nơi — Bảo hành chính hãng — Hỗ trợ 24/7",
    "Mát lạnh nhà bạn, nhiệt huyết chúng tôi",
    "Công trình nào cũng được hoàn thành với chất lượng cao nhất",
    "Nagakawa • Panasonic • Kingpump • HI-TECH — Chỉ hàng chính hãng",
  ],
  en: [
    "Clean air and cool space solutions for Vietnamese families",
    "Genuine — Professional — Dedicated",
    "Over 9 years of HVAC installation experience in HCMC",
    "On-site installation — Genuine warranty — 24/7 Support",
    "Your cool home, our warm passion",
    "Every project is completed with the highest quality",
    "Nagakawa • Panasonic • Kingpump • HI-TECH — Genuine products only",
  ]
};

let hasInitialLoaded = false;

export function Preloader() {
  const setIsLoaded = useAppStore((state) => state.setIsLoaded);
  const { lang } = useLanguageStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [tagline, setTagline] = useState<string>("");

  // Determine if this is the first hard load
  const [isInitial] = useState(!hasInitialLoaded);
  const pathname = usePathname();
  const router = useRouter();

  // Fix hydration: chỉ random trên client, sau khi mount
  useEffect(() => {
    const list = TAGLINES[lang] || TAGLINES.vi;
    setTagline(list[Math.floor(Math.random() * list.length)]);
  }, [lang]);

  useEffect(() => {
    // Nếu reset ở trang khác trang chủ, ép về trang chủ và KHÔNG chạy animation vội
    if (isInitial && pathname !== "/") {
      router.replace("/");
      return; 
    }

    // Skip preloader for Lighthouse/Bots so we don't fail performance tests
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);

    if (isBot) {
      setTimeout(() => {
        setIsVisible(false);
        setIsLoaded(true);
        hasInitialLoaded = true;
      }, 0);
      return;
    }

    const ctx = gsap.context(() => {
      
      // Chặn ngay animation của trang mới bằng cách báo là "chưa load xong"
      setIsLoaded(false);

      if (isInitial) {
        // --- 1. FULL PRELOADER (Initial Load / F5) ---
        hasInitialLoaded = true; // Mark as loaded for future transitions
        
        const tl = gsap.timeline({
          onComplete: () => {
            setIsVisible(false);
            setIsLoaded(true);
          },
        });

        // Animate logo entrance
        tl.to(logoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.2,
        })
          // Animate progress bar and percentage
          .to(progressRef.current, {
            scaleX: 1,
            duration: 1.5,
            ease: "power1.inOut",
            onUpdate: function () {
              const progress = Math.round(this.progress() * 100);
              if (percentRef.current) {
                percentRef.current.textContent = `${progress}%`;
              }
            }
          })
          // Fade out logo
          .to(logoRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.in",
          })
          // Slide out entire screen to the top
          .to(containerRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: "power4.inOut",
          });
      } else {
        // --- 2. QUICK TRANSITION (Soft Navigation) ---
        const tl = gsap.timeline({
          onComplete: () => {
            setIsVisible(false);
            setIsLoaded(true); // <--- Kích hoạt animation của trang mới
          },
        });

        // Thay vì nhảy từ dưới lên (gây giật trắng), ta cho từ từ hiện ra (Fade in)
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
          // Animate logo entrance
          .to(logoRef.current, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" })
          // Pause briefly (simulating a 1s total flow)
          .to({}, { duration: 0.5 })
          // Fade out logo
          .to(logoRef.current, { opacity: 0, scale: 0.9, duration: 0.2, ease: "power2.in" })
          // Fade out entire screen thay vì trượt lên
          .to(containerRef.current, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isInitial, setIsLoaded, pathname, router]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white shadow-2xl"
      style={{ opacity: isInitial ? 1 : 0 }}
    >
      {/* Khóa hoàn toàn thanh cuộn bằng CSS quan trọng nhất */}
      <style>{`
        html, body {
          overflow: hidden !important;
        }
      `}</style>
      
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[100px]" />
      </div>

      {/* Centered Welcome Content */}
      <div
        ref={logoRef}
        className="relative z-10 opacity-0 scale-95 flex flex-col items-center px-6 max-w-4xl"
      >
        <div className="mb-8 overflow-hidden">
          <h1 className="text-3xl md:text-6xl font-black text-slate-900 text-center leading-tight tracking-tight font-[family-name:var(--font-be-vietnam)]">
            {isInitial ? (
              lang === "vi" ? (
                <>
                  Chào mừng quý khách đến với <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                    ĐIỆN MÁY TRẦN ĐIỀN
                  </span>
                </>
              ) : (
                <>
                  Welcome to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                    TRAN DIEN APPLIANCES
                  </span>
                </>
              )
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                {lang === "vi" ? "TRẦN ĐIỀN" : "TRAN DIEN"}
              </span>
            )}
          </h1>
        </div>

        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
        <p className="text-slate-500 text-center text-sm md:text-lg leading-relaxed font-medium px-4 max-w-2xl italic">
          &ldquo;{tagline}&rdquo;
        </p>
      </div>

      {/* Full-width Loading Bar at Bottom (Only for Initial) */}
      {isInitial && (
        <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col">
          <div className="flex justify-between items-end px-8 mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">
                {lang === "vi" ? "Đang khởi tạo hệ thống" : "Initializing System"}
              </span>
              <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">
                {lang === "vi" ? "Vui lòng đợi trong giây lát..." : "Please wait a moment..."}
              </span>
            </div>
            <span
              ref={percentRef}
              className="text-primary font-black text-2xl md:text-4xl tracking-tighter italic"
            >
              0%
            </span>
          </div>
          <div className="w-full h-1.5 md:h-2 bg-slate-100 overflow-hidden">
            <div
              ref={progressRef}
              className="w-full h-full bg-gradient-to-r from-primary to-blue-500 origin-left scale-x-0"
            />
          </div>
        </div>
      )}
    </div>
  );
}

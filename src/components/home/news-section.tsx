"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, User, ArrowRight, X, Share2, MessageSquare, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguageStore } from "@/store/useLanguageStore";
import { NEWS_DATABASE, NewsArticle } from "@/constants/news";
import { NewsCard } from "@/components/news/news-card";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function NewsSection() {
  const { lang } = useLanguageStore();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  useEffect(() => {
    const items = document.querySelectorAll(".news-card-wrapper");
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 40 });

    const anim = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".news-grid",
        start: "top 95%",
        toggleActions: "play none none none"
      }
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const handleShareDetails = async () => {
    if (!selectedArticle) return;
    const shareUrl = `${window.location.origin}/news#${selectedArticle.slug}`;
    const title = lang === "vi" ? selectedArticle.titleVi : selectedArticle.titleEn;
    const description = lang === "vi" ? selectedArticle.descVi : selectedArticle.descEn;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard failed:", err);
      }
    }
  };

  return (
    <section id="news" className="pt-12 pb-24 bg-slate-50/50">
      <div className="container mx-auto px-4 md:px-[50px]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-black tracking-[0.2em] text-primary bg-primary/10 rounded-full uppercase">
              {lang === "vi" ? "Cập nhật mới nhất" : "LATEST UPDATES"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              {lang === "vi" ? (
                <>TIN TỨC & <span className="text-primary">SỰ KIỆN</span></>
              ) : (
                <>NEWS & <span className="text-primary">EVENTS</span></>
              )}
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              {lang === "vi" 
                ? "Chia sẻ kiến thức kỹ thuật, cập nhật xu hướng công nghệ điện máy và các hoạt động nổi bật của chúng tôi."
                : "Sharing technical knowledge, updating electrical technology trends, and highlighting our outstanding activities."}
            </p>
          </div>

          <div>
            <Link href="/news" className="group flex items-center gap-2 text-slate-900 font-bold hover:text-primary transition-colors text-sm">
              {lang === "vi" ? "Xem tất cả tin tức" : "View All News"}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 news-grid">
          {NEWS_DATABASE.slice(0, 3).map((article) => (
            <div key={article.id} className="news-card-wrapper">
              <NewsCard article={article} onSelect={setSelectedArticle} />
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Interactive Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lang === "vi" ? selectedArticle.titleVi : selectedArticle.titleEn}
          >
            {/* Close Button Overlay */}
            <button
              ref={closeButtonRef}
              className="absolute top-6 right-6 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[210] focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setSelectedArticle(null)}
              aria-label={lang === "vi" ? "Đóng" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: Article Cover Image */}
              <div className="relative w-full md:w-1/2 bg-slate-100 flex items-center justify-center overflow-hidden min-h-[260px] md:min-h-0">
                {isImageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse z-10 flex items-center justify-center">
                    <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase animate-bounce">
                      {lang === "vi" ? "Đang tải ảnh..." : "Loading image..."}
                    </span>
                  </div>
                )}
                <Image
                  src={selectedArticle.src}
                  alt={lang === "vi" ? selectedArticle.titleVi : selectedArticle.titleEn}
                  fill
                  priority
                  onLoad={() => setIsImageLoading(false)}
                  className={cn(
                    "object-cover transition-all duration-500",
                    isImageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  )}
                />
              </div>

              {/* Right Side: Article Details & Content */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none">
                <div className="space-y-4">
                  {/* Category Pill */}
                  <div>
                    <span className="inline-block px-3 py-1 text-[9px] font-black tracking-widest text-primary bg-primary/10 rounded-full uppercase">
                      {lang === "vi" ? selectedArticle.categoryNameVi : selectedArticle.categoryNameEn}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
                    {lang === "vi" ? selectedArticle.titleVi : selectedArticle.titleEn}
                  </h3>

                  {/* Meta Details Row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{selectedArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{lang === "vi" ? selectedArticle.readTimeVi : selectedArticle.readTimeEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{lang === "vi" ? selectedArticle.authorVi : selectedArticle.authorEn}</span>
                    </div>
                  </div>

                  {/* Article Full Content Text */}
                  <div className="text-slate-600 text-xs md:text-sm leading-relaxed space-y-4 pt-2">
                    <p className="font-bold text-slate-800">
                      {lang === "vi" ? selectedArticle.descVi : selectedArticle.descEn}
                    </p>
                    <p>
                      {lang === "vi" ? selectedArticle.contentVi : selectedArticle.contentEn}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Section */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-slate-100">
                  {/* Share button */}
                  <button
                    onClick={handleShareDetails}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 hover:text-primary hover:border-primary font-black text-xs rounded-xl transition-all shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>{lang === "vi" ? "Đã sao chép" : "Copied Link"}</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>{lang === "vi" ? "Chia sẻ" : "Share"}</span>
                      </>
                    )}
                  </button>

                  {/* Contact/Action CTA */}
                  <a
                    href="https://zalo.me/0903385882"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-black text-xs rounded-xl hover:bg-primary/95 transition-all shadow-md hover:shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{lang === "vi" ? "Tư vấn ngay" : "Get Free Consult"}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

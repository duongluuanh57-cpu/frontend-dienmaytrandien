"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Calendar, Clock, User, ArrowRight, Share2, MessageSquare, Check } from "lucide-react";
import Image from "next/image";
import { NewsArticle, NEWS_DATABASE } from "@/constants/news";
import { NewsCard } from "@/components/news/news-card";
import { useLanguageStore } from "@/store/useLanguageStore";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function NewsContent() {
  const { lang } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter logic
  const filteredArticles = NEWS_DATABASE.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const titleText = lang === "vi" ? article.titleVi.toLowerCase() : article.titleEn.toLowerCase();
    const descText = lang === "vi" ? article.descVi.toLowerCase() : article.descEn.toLowerCase();
    const matchesSearch = query === "" || titleText.includes(query) || descText.includes(query);

    return matchesCategory && matchesSearch;
  });

  // WCAG: Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedArticle) setSelectedArticle(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArticle]);

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

  // GSAP Scroll Animation
  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".news-card");
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 30 });

    const anim = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: "all", nameVi: "Tất cả", nameEn: "All" },
    { id: "promotion", nameVi: "Khuyến mãi", nameEn: "Promotions" },
    { id: "tech", nameVi: "Hướng dẫn kỹ thuật", nameEn: "Tech Guides" },
    { id: "event", nameVi: "Sự kiện", nameEn: "Events" },
  ];

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
    <div ref={containerRef} className="space-y-10">
      {/* Search & Category Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-3xl border border-slate-100">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 text-xs md:text-sm font-black rounded-xl transition-all border",
                selectedCategory === cat.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm"
              )}
            >
              {lang === "vi" ? cat.nameVi : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === "vi" ? "Tìm kiếm tin tức..." : "Search articles..."}
            className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900"
            >
              {lang === "vi" ? "Xoá" : "Clear"}
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} onSelect={setSelectedArticle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
          <p className="text-slate-400 font-medium">
            {lang === "vi" ? "Không tìm thấy tin tức nào phù hợp." : "No matching articles found."}
          </p>
        </div>
      )}

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
    </div>
  );
}

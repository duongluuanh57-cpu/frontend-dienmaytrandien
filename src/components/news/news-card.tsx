"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, User, Share2, ArrowRight, Check } from "lucide-react";
import { NewsArticle } from "@/constants/news";
import { useLanguageStore } from "@/store/useLanguageStore";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  onSelect: (article: NewsArticle) => void;
}

export function NewsCard({ article, onSelect }: NewsCardProps) {
  const { lang } = useLanguageStore();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const title = lang === "vi" ? article.titleVi : article.titleEn;
  const description = lang === "vi" ? article.descVi : article.descEn;
  const categoryName = lang === "vi" ? article.categoryNameVi : article.categoryNameEn;
  const author = lang === "vi" ? article.authorVi : article.authorEn;
  const readTime = lang === "vi" ? article.readTimeVi : article.readTimeEn;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/news#${article.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  return (
    <article
      onClick={() => onSelect(article)}
      className="news-card group relative flex flex-col h-full bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-slate-200 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Article Image & Category Badge */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50">
        {isImageLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse z-10 flex items-center justify-center">
            <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase animate-pulse">
              {lang === "vi" ? "ĐANG TẢI..." : "LOADING..."}
            </span>
          </div>
        )}
        <Image
          src={article.src}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsImageLoading(false)}
          className={cn(
            "object-cover transition-all duration-700 group-hover:scale-105",
            isImageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        />

        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-[9px] font-black tracking-widest text-primary bg-white/90 backdrop-blur-md rounded-full uppercase shadow-sm">
            {categoryName}
          </span>
        </div>

        {/* Share Button Overlay */}
        <button
          onClick={handleShare}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-primary transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Chia sẻ bài viết"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Article Text Content */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div className="space-y-3">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate max-w-[100px]">{author}</span>
            </div>
          </div>

          <h3 className="text-base md:text-lg font-black text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Learn More Trigger */}
        <div className="flex items-center gap-1.5 text-xs font-black text-primary uppercase tracking-wider mt-6 group-hover:gap-2.5 transition-all">
          <span>{lang === "vi" ? "Đọc tiếp" : "Read more"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
}

"use client";

import { ArrowRight, ChevronDown, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ProductCard } from "./product-card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { useLanguageStore } from "@/store/useLanguageStore";

const getTranslatedTitle = (viTitle: string, lang: "vi" | "en") => {
  if (lang === "vi") return viTitle;
  switch (viTitle) {
    case "MÁY BƠM NƯỚC NGƯNG ĐIỀU HÒA": return "CONDENSATE PUMPS";
    case "QUẠT CHẮN GIÓ (AIR CURTAIN)": return "AIR CURTAINS";
    case "MÁY LẠNH DI ĐỘNG": return "PORTABLE AIR CONDITIONERS";
    case "MÁY ĐHKK NAGAKAWA": return "NAGAKAWA AIR CONDITIONERS";
    case "MÁY ĐHKK PANASONIC": return "PANASONIC AIR CONDITIONERS";
    default: return viTitle;
  }
};

const getTranslatedFilter = (opt: string, lang: "vi" | "en") => {
  if (lang === "vi") return opt;
  switch (opt) {
    case "Tất cả": return "All";
    case "Treo tường": return "Wall Mounted";
    case "Tủ đứng": return "Floor Standing";
    case "Âm trần": return "Cassette";
    case "Hệ thống Multi": return "Multi System";
    default: return opt;
  }
};

interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  brand?: string;
  type?: string;
  desc: string;
  soldCount?: number;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  filterOptions: string[];
  bgGray?: boolean;
  filterKey: "brand" | "type";
}

export function ProductSection({
  title,
  products,
  filterOptions,
  bgGray = false,
  filterKey
}: ProductSectionProps) {
  const [filter, setFilter] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("default");
  const [startIndex, setStartIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguageStore();

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(".product-card-item");
      if (items.length === 0) return;

      gsap.set(items, { opacity: 0, y: 50 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [startIndex, filter, sortBy, products]);

  const isFiltered = filter !== "Tất cả" || sortBy !== "default";
  const limit = isFiltered ? 8 : 4;

  const handleReset = () => {
    setFilter("Tất cả");
    setSortBy("default");
    setStartIndex(0);
  };

  const filteredAndSortedProducts = products
    .filter(p => filter === "Tất cả" || p[filterKey] === filter)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.priceValue - b.priceValue;
      if (sortBy === "price-desc") return b.priceValue - a.priceValue;
      return 0;
    });

  const totalProducts = filteredAndSortedProducts.length;
  const showNext = () => {
    if (startIndex + limit < totalProducts) {
      setStartIndex(startIndex + limit);
    }
  };
  const showPrev = () => {
    if (startIndex - limit >= 0) {
      setStartIndex(startIndex - limit);
    }
  };


  return (
    <section ref={sectionRef} className={`py-10 ${bgGray ? "bg-slate-50/50" : "bg-white"} overflow-hidden`}>
      <div className="container mx-auto px-4 md:px-[50px] max-w-none">
        {/* Combined Header: Title + Filters + Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-6 border-b border-slate-200 pb-4">

          {/* Left Side: Title & Filter Buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight whitespace-nowrap">
                {getTranslatedTitle(title, lang)}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filterOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setStartIndex(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 whitespace-nowrap ${filter === item
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-primary hover:text-primary"
                    }`}
                >
                  {getTranslatedFilter(item, lang)}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Sort & Navigation */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            {sortBy !== "default" && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 text-[11px] font-bold transition-all px-3 py-1.5 bg-slate-50 hover:bg-red-50 rounded-full border border-slate-200"
              >
                <X className="h-3.5 w-3.5" />
                {lang === "vi" ? "Xóa lọc" : "Clear Filter"}
              </button>
            )}
            <div className="relative inline-block text-left min-w-[150px]">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setStartIndex(0);
                }}
                className="w-full appearance-none bg-slate-50/50 border border-slate-200 text-slate-600 py-1.5 px-3 pr-10 rounded-full text-[11px] font-bold focus:outline-none focus:border-primary cursor-pointer hover:bg-slate-100 transition-all"
              >
                <option value="default">{lang === "vi" ? "Sắp xếp theo giá" : "Sort by Price"}</option>
                <option value="price-asc">{lang === "vi" ? "Giá: Thấp đến Cao" : "Price: Low to High"}</option>
                <option value="price-desc">{lang === "vi" ? "Giá: Cao đến Thấp" : "Price: High to Low"}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={showPrev}
                disabled={startIndex === 0}
                aria-label={lang === "vi" ? "Sản phẩm trước" : "Previous Products"}
                className="p-1.5 rounded-full border border-slate-200 hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={showNext}
                disabled={startIndex + limit >= totalProducts}
                aria-label={lang === "vi" ? "Sản phẩm tiếp theo" : "Next Products"}
                className="p-1.5 rounded-full border border-slate-200 hover:border-primary hover:text-primary transition-all disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid with Animation */}
        <div className="relative min-h-[400px]">
          <div 
            key={startIndex + filter}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1400px] mx-auto product-grid"
          >
            {filteredAndSortedProducts.slice(startIndex, startIndex + limit).map((product) => (
              <div
                key={product.id}
                className="product-card-item opacity-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2.5 px-7 py-2 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-[0.12em] rounded-full hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 group">
            <span>{lang === "vi" ? "Xem tất cả sản phẩm" : "View All Products"}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/store/useLanguageStore";

interface BannerGalleryProps {
  images: string[];
}

export function BannerGallery({ images }: BannerGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { lang } = useLanguageStore();

  useEffect(() => {
    if (selectedImage) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [selectedImage]);

  return (
    <>
      <div id="secondary-banner" className="container mx-auto px-0 md:px-[50px] mt-2 mb-12 transition-none">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-48 md:h-64 rounded-3xl overflow-hidden shadow-lg">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              className="relative h-full w-full overflow-hidden group border-r last:border-r-0 border-slate-100 cursor-pointer"
            >
              <Image
                src={img}
                alt={lang === "vi" ? `Dịch vụ tiêu biểu ${index + 1}` : `Featured Service ${index + 1}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Search className="text-white w-5 h-5" />
                </div>
                <p className="text-white font-bold text-sm text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {lang === "vi" ? "Xem chi tiết" : "View Details"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-slate-900/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-[110]"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Banner Preview"
                width={1600}
                height={1200}
                className="max-w-full max-h-[85vh] w-auto h-auto rounded-xl shadow-2xl pointer-events-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

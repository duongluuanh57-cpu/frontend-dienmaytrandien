"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Users, Briefcase, Award, X, Search } from "lucide-react";
import Image from "next/image";
import { useLanguageStore } from "@/store/useLanguageStore";

export function AboutShort() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { lang } = useLanguageStore();

  const translatedStats = [
    { label: lang === "vi" ? "Năm Kinh Nghiệm" : "Years of Experience", value: "9+", icon: Briefcase, color: "text-blue-600" },
    { label: lang === "vi" ? "Khách Hàng Tin Dùng" : "Happy Customers", value: "10K+", icon: Users, color: "text-emerald-600" },
    { label: lang === "vi" ? "Đối Tác Chiến Lược" : "Strategic Partners", value: "7", icon: Award, color: "text-primary" },
  ];

  const guaranteeItems = lang === "vi" ? [
    "Cam kết sản phẩm chính hãng 100%",
    "Đội ngũ kỹ thuật chuyên môn cao",
    "Chính sách bảo hành, hậu mãi tận tâm"
  ] : [
    "100% genuine product guarantee",
    "Highly skilled technical team",
    "Dedicated warranty & support"
  ];

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

  const images = [
    "https://i.ibb.co/gbYdZXQC/about-us-2.jpg",
    "https://i.ibb.co/sJmDGQgn/about-us-1.jpg",
    "https://i.ibb.co/7tn3SN9f/about-us.jpg"
  ];

  return (
    <section className="py-24 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-[50px]">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Stack Content */}
          <div className="w-full lg:w-1/2 relative h-[400px] md:h-[550px] flex items-center justify-center lg:justify-start">
            {/* Decorative background blocks */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/30 rounded-full blur-[100px] opacity-40 pointer-events-none" />

            {/* Image 3 (Back - Top Left) */}
            <motion.div
              initial={{ opacity: 0, x: -100, y: -50, rotate: -15 }}
              whileInView={{ opacity: 0.6, x: -120, y: -120, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              onClick={() => setSelectedImage(images[0])}
              className="absolute w-[70%] rounded-3xl overflow-hidden shadow-lg z-0 border-4 border-white hidden md:block cursor-pointer group/img"
            >
              <Image
                src={images[0]}
                alt={lang === "vi" ? "Kỹ thuật viên Trần Điền" : "Tran Dien Technician"}
                width={800}
                height={600}
                unoptimized
                priority
                className="w-full h-auto grayscale group-hover/img:grayscale-0 transition-all duration-500 object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <Search className="text-white w-8 h-8" />
              </div>
            </motion.div>

            {/* Image 2 (Middle - Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, x: 100, y: 50, rotate: 10 }}
              whileInView={{ opacity: 0.9, x: 125, y: 135, rotate: 9 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              onClick={() => setSelectedImage(images[1])}
              className="absolute w-[70%] rounded-3xl overflow-hidden shadow-xl z-10 border-4 border-white hidden md:block cursor-pointer group/img"
            >
              <Image
                src={images[1]}
                alt={lang === "vi" ? "Thi công máy lạnh chuyên nghiệp" : "Professional HVAC Installation"}
                width={800}
                height={600}
                unoptimized
                priority
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <Search className="text-white w-8 h-8" />
              </div>
            </motion.div>

            {/* Image 1 (Front - Main Showroom) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => setSelectedImage(images[2])}
              className="relative w-full md:w-[85%] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl z-20 border-4 border-white cursor-pointer group/img"
            >
              <Image
                src={images[2]}
                alt="Trần Điền Showroom"
                width={800}
                height={600}
                unoptimized
                priority
                className="w-full h-auto transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                  <Search className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -bottom-6 -left-2 md:-left-6 bg-white p-4 md:p-6 rounded-3xl shadow-xl z-30 border border-slate-100"
            >
              <div className="text-2xl md:text-3xl font-black text-primary">9+</div>
              <div className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {lang === "vi" ? "Năm đồng hành" : "Years of Partnership"}
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-[11px] font-black tracking-[0.2em] text-primary bg-primary/10 rounded-full uppercase">
                {lang === "vi" ? "Câu chuyện của chúng tôi" : "Our Story"}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight leading-[1.2] text-wrap-balance">
                {lang === "vi" ? (
                  <>TRẦN ĐIỀN — <span className="text-primary">UY TÍN</span> LÀM NÊN THƯƠNG HIỆU</>
                ) : (
                  <>TRAN DIEN — <span className="text-primary">CREDIBILITY</span> MAKES THE BRAND</>
                )}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 text-pretty">
                {lang === "vi" 
                  ? "Khởi đầu từ niềm đam mê mang lại những giải pháp điện máy chất lượng nhất cho người Việt, Trần Điền đã không ngừng phát triển để trở thành đối tác tin cậy của hàng ngàn hộ gia đình và doanh nghiệp trên khắp cả nước."
                  : "Starting from a passion to bring the best quality electrical appliance solutions to Vietnamese people, Tran Dien has constantly developed to become a trusted partner for thousands of households and businesses across the country."}
              </p>

              <div className="space-y-4 mb-10">
                {guaranteeItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200">
                {translatedStats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className={`flex justify-center mb-2 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-xl font-black text-slate-900">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
              className="relative max-w-full max-h-full flex items-center justify-center pointer-events-none p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="About Preview"
                width={1600}
                height={1200}
                unoptimized
                className="max-w-full max-h-[85vh] w-auto h-auto rounded-2xl md:rounded-[40px] shadow-2xl border-4 border-white pointer-events-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

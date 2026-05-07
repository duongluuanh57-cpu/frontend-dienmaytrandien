"use client";

import { motion } from "framer-motion";
import { Truck, Award, CircleDollarSign, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/useLanguageStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function Features() {
  const { lang } = useLanguageStore();

  const features = [
    {
      title: lang === "vi" ? "NHANH CHÓNG" : "FAST DELIVERY",
      description: lang === "vi" ? "Vận chuyển hàng hóa nhanh chóng, an toàn và chuyên nghiệp đến tận nơi." : "Fast, safe, and professional delivery directly to your doorstep.",
      icon: Truck,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      shadowColor: "hover:shadow-blue-500/10",
      hoverBorder: "hover:border-blue-100",
      accentColor: "bg-blue-500",
      accentText: "group-hover:text-blue-600"
    },
    {
      title: lang === "vi" ? "CHẤT LƯỢNG" : "TOP QUALITY",
      description: lang === "vi" ? "Cam kết cung cấp sản phẩm uy tín, đảm bảo chất lượng vượt trội cho người dùng." : "Committed to delivering reputable products with outstanding quality.",
      icon: Award,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      shadowColor: "hover:shadow-amber-500/10",
      hoverBorder: "hover:border-amber-100",
      accentColor: "bg-amber-500",
      accentText: "group-hover:text-amber-600"
    },
    {
      title: lang === "vi" ? "GIÁ CẢ HỢP LÝ" : "REASONABLE PRICE",
      description: lang === "vi" ? "Mức giá cạnh tranh, phù hợp với điều kiện kinh tế của mọi gia đình Việt." : "Highly competitive pricing that is suitable for every household.",
      icon: CircleDollarSign,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      shadowColor: "hover:shadow-emerald-500/10",
      hoverBorder: "hover:border-emerald-100",
      accentColor: "bg-emerald-500",
      accentText: "group-hover:text-emerald-600"
    },
    {
      title: lang === "vi" ? "CHÍNH HÃNG" : "100% GENUINE",
      description: lang === "vi" ? "Cung cấp 100% các sản phẩm chính hãng, nguồn gốc và bảo hành rõ ràng." : "Providing 100% genuine products with clear origin and warranty.",
      icon: ShieldCheck,
      color: "bg-primary",
      lightColor: "bg-primary/10",
      textColor: "text-primary",
      shadowColor: "hover:shadow-primary/10",
      hoverBorder: "hover:border-primary/20",
      accentColor: "bg-primary",
      accentText: "group-hover:text-primary"
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-[50px] relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-black tracking-[0.2em] text-primary bg-primary/10 rounded-full uppercase">
              {lang === "vi" ? "Tại sao là Trần Điền?" : "Why Tran Dien?"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight text-wrap-balance">
              {lang === "vi" ? (
                <>GIÁ TRỊ CHÚNG TÔI <span className="text-primary">CAM KẾT</span></>
              ) : (
                <>OUR <span className="text-primary">COMMITTED</span> VALUES</>
              )}
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed text-pretty">
              {lang === "vi"
                ? "Đơn vị chuyên nghiệp, uy tín và có nhiều năm kinh nghiệm trong lĩnh vực điện máy."
                : "A professional, highly credible company with years of experience in electrical appliances."}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "group relative p-6 rounded-[24px] bg-white border border-slate-100 transition-all duration-500 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center text-center hover:shadow-lg",
                feature.shadowColor,
                feature.hoverBorder
              )}
            >
              {/* Icon Container with Animated Background */}
              <div className="relative mb-6">
                <div className={cn(
                  "absolute inset-0 scale-150 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full",
                  feature.color
                )} />
                <div className={cn(
                  "relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                  feature.lightColor
                )}>
                  <feature.icon className={cn("w-8 h-8 transition-transform duration-500 group-hover:scale-110", feature.textColor)} aria-hidden="true" />
                </div>
              </div>

              <h3 className={cn(
                "text-lg font-black text-slate-900 mb-3 tracking-tight transition-colors duration-300",
                feature.accentText
              )}>
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-[13px] font-medium">
                {feature.description}
              </p>

              {/* Decorative line */}
              <div className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-slate-100 group-hover:w-16 transition-all duration-500 rounded-t-full",
                feature.accentColor
              )} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

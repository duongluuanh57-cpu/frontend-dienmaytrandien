"use client";

import { Mail, Phone } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";

export function TopBar() {
  const { lang } = useLanguageStore();

  const marqueeText = lang === "vi" 
    ? "Công ty Trần Điền kính chào quý khách - Đơn vị chuyên cung cấp, thi công, lắp đặt & bảo trì hệ thống điện lạnh uy tín. Cam kết hàng chính hãng 100% - Bảo hành dài hạn!"
    : "Welcome to Tran Dien Company - Specialized in providing, constructing, installing & maintaining reputable refrigeration systems. 100% genuine products - Long-term warranty!";

  return (
    <div className="w-full bg-primary select-none relative h-8 md:h-10 flex items-center shadow-sm">
      <div className="container mx-auto px-4 md:px-[50px] flex items-center justify-between h-full">

        {/* Vùng Marquee: Chiếm dụng không gian lớn hơn để hiển thị dài hơn */}
        <div className="flex-[2] md:flex-[3] relative h-full flex items-center overflow-hidden">
          <style jsx>{`
            @keyframes marquee {
              0% { left: 100%; transform: translateY(-50%) translateX(0); }
              100% { left: 0; transform: translateY(-50%) translateX(-100%); }
            }
            .marquee-container {
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
            .marquee-content {
              position: absolute;
              white-space: nowrap;
              animation: marquee 25s linear infinite;
              will-change: transform, left;
              top: 50%;
              transform: translateY(-50%);
            }
          `}</style>
          <div className="marquee-container">
            <div className="marquee-content text-[10px] md:text-xs font-bold tracking-wide text-white">
              {marqueeText}
            </div>
          </div>
        </div>

        {/* Vạch ngăn cách */}
        <div className="h-4 w-px bg-white/20 mx-4 hidden sm:block" />

        {/* Thông tin Email */}
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white whitespace-nowrap">
          <Mail className="h-3 w-3 text-white" />
          <a href="mailto:dienmaytrandien@gmail.com" className="hover:text-black transition-colors">
            Dienmaytrandien@gmail.com
          </a>
        </div>

        <div className="h-4 w-px bg-white/20 mx-4 hidden sm:block" />

        {/* Thông tin Số điện thoại */}
        <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold text-white whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-white" />
            <a href="tel:0903760096" className="hover:text-black transition-colors">0903 760 096</a>
          </div>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-white" />
            <a href="tel:0913639913" className="hover:text-black transition-colors">0913 639 913</a>
          </div>
        </div>
      </div>
    </div>
  );
}

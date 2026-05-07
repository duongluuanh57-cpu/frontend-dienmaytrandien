"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";

import { useAppStore } from "@/store/use-app-store";

export function ContactButtons() {
  const isLoaded = useAppStore((state) => state.isLoaded);

  if (!isLoaded) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4">
      {/* Zalo Button */}
      <motion.a
        href="https://zalo.me/0903760096"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#0068ff] text-white rounded-full shadow-[0_8px_25px_-5px_rgba(0,104,255,0.5)] transition-all"
      >
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-[#0068ff] text-xs font-black rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 border border-[#0068ff]/10">
          Chat Zalo ngay
        </span>
        <div className="flex flex-col items-center justify-center leading-none">
          <span className="text-xl font-black">Z</span>
          <span className="text-[8px] font-black tracking-tighter uppercase">Zalo</span>
        </div>
        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-[#0068ff] animate-ping opacity-25 -z-10"></span>
      </motion.a>

      {/* Phone Button */}
      <motion.a
        href="tel:0903760096"
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#00ba10] text-white rounded-full shadow-[0_8px_25px_-5px_rgba(0,186,16,0.5)] transition-all"
      >
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-[#00ba10] text-xs font-black rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 border border-[#00ba10]/10">
          Gọi: 0903 76 00 96
        </span>
        <Phone className="w-6 h-6 fill-white" />
        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-[#00ba10] animate-ping opacity-25 -z-10"></span>
      </motion.a>
    </div>
  );
}

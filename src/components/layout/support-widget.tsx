"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Phone, MessageSquare, Plus } from "lucide-react";
import gsap from "gsap";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: -20,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        display: "flex",
      });
      gsap.to(".support-icon-main", { rotate: 135, duration: 0.3 });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        display: "none",
      });
      gsap.to(".support-icon-main", { rotate: 0, duration: 0.3 });
    }
  }, [isOpen]);

  const supportOptions = [
    {
      name: "Zalo Chat",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "https://zalo.me/0903760096",
      action: () => console.log("[Analytics] Support Clicked: Zalo"),
    },
    {
      name: "Hotline",
      icon: <Phone className="w-6 h-6" />,
      color: "bg-emerald-500",
      link: "tel:0903760096",
      action: () => console.log("[Analytics] Support Clicked: Hotline"),
    },
    {
      name: "Messenger",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-sky-500",
      link: "https://m.me/trandien",
      action: () => console.log("[Analytics] Support Clicked: Messenger"),
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* Support Menu */}
      <div
        ref={menuRef}
        className="hidden flex-col gap-3 mb-2"
        style={{ opacity: 0, transform: "translateY(20px) scale(0.8)" }}
      >
        {supportOptions.map((option, index) => (
          <a
            key={index}
            href={option.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={option.action}
            className="flex items-center gap-3 group"
          >
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg text-slate-700 text-xs font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {option.name}
            </span>
            <div className={`w-12 h-12 ${option.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300`}>
              {option.icon}
            </div>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-[24px] flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-all group relative overflow-hidden"
        aria-label="Hỗ trợ trực tuyến"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Plus className="w-8 h-8 support-icon-main" />
      </button>
    </div>
  );
}

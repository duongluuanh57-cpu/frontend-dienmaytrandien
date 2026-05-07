"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "./top-bar";
import { Navbar } from "./navbar";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Nếu cuộn qua 40px (khoảng chiều cao TopBar) thì coi như đã cuộn
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Chỉ hiển thị TopBar ở trang chủ */}
      {isHomepage && <TopBar />}
      
      {/* 
        Dùng fixed để navbar luôn hiển thị ở đỉnh khi cuộn.
        Khi ở trang chủ: chưa cuộn nằm dưới TopBar (top-10), đã cuộn hít lên đỉnh (top-0).
        Khi ở trang trong (không có TopBar): luôn hít lên đỉnh (top-0).
      */}
      <header 
        id="main-header" 
        className={`fixed left-0 right-0 z-50 w-full pointer-events-none transition-all duration-300 ease-out ${
          isHomepage ? (isScrolled ? "top-0" : "top-10") : "top-0"
        }`}
      >
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </header>

      {/* Spacer để nội dung không bị đè khi Navbar ở chế độ fixed */}
      <div className="h-20" />
    </>
  );
}

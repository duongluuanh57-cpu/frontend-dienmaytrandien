"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

export function ScrollReset() {
  useEffect(() => {
    // Read saved language from localStorage on initial client-side mount
    const saved = localStorage.getItem("lang");
    if (saved === "vi" || saved === "en") {
      useLanguageStore.setState({ lang: saved });
    }

    // Ép trình duyệt không tự động cuộn về vị trí cũ
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Cuộn lên đầu trang ngay khi load
    window.scrollTo(0, 0);
  }, []);

  return null;
}

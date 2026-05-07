import { create } from "zustand";

interface LanguageState {
  lang: "vi" | "en";
  setLang: (lang: "vi" | "en") => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "vi", // Default always "vi" initially to match server-side rendering and avoid hydration mismatches
  setLang: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      set({ lang });
      window.location.reload();
    }
  },
}));

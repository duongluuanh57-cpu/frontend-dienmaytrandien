"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/store/useLanguageStore";

const getTranslatedName = (name: string, lang: "vi" | "en") => {
  if (lang === "vi") return name;
  const translations: Record<string, string> = {
    // Nav Items
    "Trang chủ": "Home",
    "Sản phẩm": "Products",
    "Công trình": "Projects",
    "Tin tức": "News",
    "Giới thiệu": "About Us",

    // Sub Items
    "MÁY BƠM NƯỚC NGƯNG ĐIỀU HÒA": "CONDENSATE PUMPS",
    "QUẠT CHẮN GIÓ": "AIR CURTAINS",
    "MÁY LẠNH DI ĐỘNG": "PORTABLE AC",
    "MÁY ĐHKK NAGAKAWA": "NAGAKAWA AC",
    "MÁY ĐHKK PANASONIC": "PANASONIC AC",

    // Nested Items
    "BƠM HI-TECH HRP": "HI-TECH HRP PUMP",
    "BƠM KINGPUMP": "KINGPUMP PUMP",
    "BƠM WATER GENIUS": "WATER GENIUS PUMP",
    "BƠM HIPPO": "HIPPO PUMP",
    "PHỤ KIỆN BƠM": "PUMP ACCESSORIES",
    "Quạt chắn gió UOLAI": "Uolai Air Curtains",
    "Máy lạnh di động KOOLMAN": "Koolman Portable AC",
    "Máy treo tường": "Wall-Mounted AC",
    "Máy âm trần": "Cassette AC",
    "Máy tủ đứng": "Floor-Standing AC",

    // Deep Items
    "HRP-6M": "HRP-6M",
    "HRP-8M": "HRP-8M",
    "HRP-12M": "HRP-12M",
    "HRP-15M": "HRP-15M",
    "BƠM KINGPUMP CUBE 10M": "KINGPUMP CUBE 10M",
    "BƠM KINGPUMP 3M": "KINGPUMP 3M",
    "BƠM WATER GENIUS 6m": "WATER GENIUS PUMP 6M",
    "BƠM HIPPO II 4M": "HIPPO II PUMP 4M",
    "VAN PHAO PHỤ": "AUXILIARY FLOAT VALVE",
    "ỐNG D4mm": "D4mm TUBING",
    "ỐNG D10mm": "D10mm TUBING",
    "LOẠI INVETER": "INVERTER TYPE",
    "LOẠI MONO": "MONO TYPE",
  };
  return translations[name] || name;
};


interface NavItemData {
  name: string;
  href?: string;
  isMenuOnly?: boolean;
  subItems?: SubItemData[];
}

interface SubItemData {
  name: string;
  href: string;
  nested?: NestedItemData[];
}

interface NestedItemData {
  name: string;
  href: string;
  deep?: { name: string; href: string }[];
}

const navItems: NavItemData[] = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Sản phẩm",
    isMenuOnly: true,
    subItems: [
      {
        name: "MÁY BƠM NƯỚC NGƯNG ĐIỀU HÒA",
        href: "/products#pump",
        nested: [
          {
            name: "BƠM HI-TECH HRP",
            href: "/products#hi-tech",
            deep: [
              { name: "HRP-6M", href: "/products#hrp6m" },
              { name: "HRP-8M", href: "/products#hrp8m" },
              { name: "HRP-12M", href: "/products#hrp12m" },
              { name: "HRP-15M", href: "/products#hrp15m" }
            ]
          },
          {
            name: "BƠM KINGPUMP",
            href: "/products#kingpump",
            deep: [
              { name: "BƠM KINGPUMP CUBE 10M", href: "/products#cube10m" },
              { name: "BƠM KINGPUMP 3M", href: "/products#cube15m" }
            ]
          },
          {
            name: "BƠM WATER GENIUS",
            href: "/products#watergenius",
            deep: [
              { name: "BƠM WATER GENIUS 6m", href: "/products#wg6m" }
            ]
          },
          {
            name: "BƠM HIPPO",
            href: "/products#hippo",
            deep: [
              { name: "BƠM HIPPO II 4M", href: "/products#hippo2" }
            ]
          },
          {
            name: "PHỤ KIỆN BƠM",
            href: "/products#phukienbom",
            deep: [
              { name: "VAN PHAO PHỤ", href: "/products#phukienbom" },
              { name: "ỐNG D4mm", href: "/products#phukienbom" },
              { name: "ỐNG D10mm", href: "/products#phukienbom" }
            ]
          }
        ]
      },
      {
        name: "QUẠT CHẮN GIÓ",
        href: "/products#fan",
        nested: [
          { name: "Quạt chắn gió UOLAI", href: "/products#uolai" }
        ]
      },
      {
        name: "MÁY LẠNH DI ĐỘNG",
        href: "/products#portable-ac",
        nested: [
          { name: "Máy lạnh di động KOOLMAN", href: "/products#koolman" }
        ]
      },
      {
        name: "MÁY ĐHKK NAGAKAWA",
        href: "/products#nagakawa",
        nested: [
          {
            name: "Máy treo tường",
            href: "/products#naga-wall",
            deep: [
              { name: "LOẠI INVETER", href: "/products#naga-wall-inveter" },
              { name: "LOẠI MONO", href: "/products#naga-wall-mono" }
            ]
          },
          { name: "Máy âm trần", href: "/products#naga-cassette" },
          { name: "Máy tủ đứng", href: "/products#naga-floor" }
        ]
      },
      {
        name: "MÁY ĐHKK PANASONIC",
        href: "/products#panasonic",
        nested: [
          {
            name: "Máy treo tường",
            href: "/products#pana-wall",
            deep: [
              { name: "LOẠI INVETER", href: "/products#pana-wall-inveter" },
              { name: "LOẠI MONO", href: "/products#pana-wall-mono" }
            ]
          }
        ]
      },
    ]
  },
  { name: "Công trình", href: "/projects" },
  { name: "Tin tức", href: "/news" },
  { name: "Giới thiệu", href: "/about" },
];

function NestedNavItem({ nestedItem }: { nestedItem: NestedItemData }) {
  const [isDeepHovered, setIsDeepHovered] = useState(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { lang } = useLanguageStore();

  const handleDeepMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    // Trì hoãn một chút (Hover Intent) để tránh mở nhầm khi lướt chuột qua
    enterTimeoutRef.current = setTimeout(() => {
      setIsDeepHovered(true);
    }, 100);
  };

  const handleDeepMouseLeave = () => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setIsDeepHovered(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleDeepMouseEnter}
      onMouseLeave={handleDeepMouseLeave}
    >
      <motion.div
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: -10 }
        }}
      >
        <Link
          href={nestedItem.href}
          className="flex items-center justify-between px-4 py-3 text-[11px] font-bold text-slate-500 hover:text-foreground hover:bg-slate-50 transition-colors duration-200 uppercase tracking-tight border-b border-slate-50 last:border-0 group/nested"
        >
          <span className="truncate mr-2">{getTranslatedName(nestedItem.name, lang)}</span>
          <div className="flex items-center justify-end w-5 h-5 shrink-0">
            {nestedItem.deep && (
              <motion.div
                animate={isDeepHovered ? { x: 2 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.div>
            )}
          </div>
        </Link>
      </motion.div>

      {/* 3rd Level Fly-out (Deep Items) */}
      <AnimatePresence>
        {nestedItem.deep && isDeepHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-full top-[-10px] ml-0 w-80 bg-white/95 backdrop-blur-xl shadow-[20px_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-visible z-[70] p-3 rounded-none"
          >
            <motion.div
              className="flex flex-col gap-1"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {nestedItem.deep.map((deepItem) => (
                <motion.div
                  key={deepItem.name}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -10 }
                  }}
                >
                  <Link
                    href={deepItem.href}
                    className="px-4 py-3 text-[11px] font-bold text-slate-400 hover:text-foreground hover:bg-slate-50 transition-colors duration-200 uppercase tracking-tight border-b border-slate-50 last:border-0 flex items-center justify-between"
                  >
                    <span className="truncate">{getTranslatedName(deepItem.name, lang)}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SubNavItem({ sub }: { sub: SubItemData }) {
  const [isHovered, setIsHovered] = useState(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { lang } = useLanguageStore();

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    // Trì hoãn mở menu cấp 3 để tránh mở nhầm khi menu cấp 2 vừa xuất hiện ngay dưới chuột
    enterTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: -10 }
        }}
      >
        <Link
          href={sub.href}
          className="flex items-center justify-between px-4 py-3 text-[11px] font-bold text-slate-600 hover:text-foreground hover:bg-slate-50 transition-colors duration-200 uppercase tracking-wide border-b border-slate-50 last:border-0"
        >
          <span className="truncate mr-2">{getTranslatedName(sub.name, lang)}</span>
          <div className="flex items-center justify-end w-5 h-5 shrink-0">
            {sub.nested ? (
              <motion.div
                animate={isHovered ? { x: 2 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -2 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -2 }}
                className="text-primary"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.div>
            )}
          </div>
        </Link>
      </motion.div>

      {/* Side Popup for Nested Items */}
      <AnimatePresence>
        {sub.nested && isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-full top-[-10px] ml-0 w-80 bg-white/95 backdrop-blur-xl shadow-[20px_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-visible z-[60] p-3 rounded-none"
          >
            <motion.div
              className="flex flex-col gap-1"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {sub.nested.map((nestedItem) => (
                <NestedNavItem key={nestedItem.name} nestedItem={nestedItem} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavItem({ item, isActive }: { item: NavItemData, isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { lang } = useLanguageStore();

  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const displayName = getTranslatedName(item.name, lang);

  const NavLinkContent = (
    <span className="relative z-10 flex flex-col items-center justify-center min-w-[80px]">
      <span className={cn(
        "transition-colors duration-300",
        isActive ? "font-black text-foreground" : "font-medium text-muted-foreground group-hover:text-foreground group-hover:font-black"
      )}>
        {displayName}
      </span>
      {/* Sliding Underline */}
      <motion.span
        initial={false}
        animate={(isHovered || isActive) ? { width: "100%", opacity: 1 } : { width: "0%", opacity: 0 }}
        className="absolute -bottom-1 left-0 h-0.5 bg-foreground"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {/* Reserve space for bold state to prevent jumping */}
      <span className="invisible h-0 font-black overflow-hidden" aria-hidden="true">
        {displayName}
      </span>
    </span>
  );

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.isMenuOnly ? (
        <div
          className={cn(
            "relative flex items-center px-4 py-2 text-sm transition-colors duration-300 cursor-default group h-full",
            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {NavLinkContent}
        </div>
      ) : (
        <Link
          href={item.href || "#"}
          className={cn(
            "relative flex items-center px-4 py-2 text-sm transition-colors duration-300 group h-full",
            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {NavLinkContent}
        </Link>
      )}

      <AnimatePresence>
        {hasSubItems && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{
              duration: 0.2,
              ease: "easeOut"
            }}
            className="absolute top-full left-0 mt-0 w-80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-visible z-50 p-3 rounded-none"
          >
            <motion.div
              className="flex flex-col gap-1"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {item.subItems?.map((sub) => (
                <SubNavItem key={sub.name} sub={sub} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { lang, setLang } = useLanguageStore();
  const fullText = lang === "vi" ? "Máy bơm nước ngưng điều hòa" : "Condensate pump for air conditioner";

  // Mock data for suggestions
  const allProducts = [
    { name: "Bơm Hi-Tech HRP-6M", price: "2.450.000đ", category: lang === "vi" ? "Máy bơm" : "Pump" },
    { name: "Bơm Kingpump Cube 10M", price: "1.850.000đ", category: lang === "vi" ? "Máy bơm" : "Pump" },
    { name: "Quạt chắn gió Nanyoo FM-12", price: "4.200.000đ", category: lang === "vi" ? "Quạt" : "Fan" },
    { name: "Máy lạnh di động Koolman", price: "8.900.000đ", category: lang === "vi" ? "Máy lạnh" : "Air Conditioner" },
    { name: "Van phao phụ Kingpump", price: "150.000đ", category: lang === "vi" ? "Phụ kiện" : "Accessories" },
  ];

  const suggestions = searchQuery.trim()
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const current = fullText.slice(0, i);
      setPlaceholder(current);

      if (!isDeleting && i < fullText.length) {
        i++;
        timeout = setTimeout(type, 150);
      } else if (isDeleting && i > 0) {
        i--;
        timeout = setTimeout(type, 100);
      } else {
        isDeleting = !isDeleting;
        timeout = setTimeout(type, isDeleting ? 2000 : 1000);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [lang]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <div className="bg-white border-b border-slate-200 shadow-md transition-all duration-300 relative z-50 w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand/Logo - Left Side */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
              <div className="relative h-16 w-16 flex items-center justify-center">
                <Image
                  src="https://i.ibb.co/k7YP1wc/logo-122x122.png"
                  alt="Logo"
                  width={60}
                  height={60}
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Main Navigation - Center */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={pathname === item.href}
              />
            ))}
          </nav>

          {/* Action Area - Right Side */}
          <div className="flex-1 flex items-center justify-end gap-3">
            {/* Unified Search Group */}
            <div ref={searchContainerRef} className="relative h-10 w-10 flex items-center justify-end">
              <motion.div
                initial={false}
                animate={{
                  width: isSearchOpen ? 180 : 40,
                  borderColor: isSearchOpen ? "var(--primary)" : "transparent",
                  boxShadow: isSearchOpen ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" : "none",
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 h-10 flex flex-row-reverse items-center bg-white rounded-full overflow-hidden border"
              >
                {/* Nút bấm đóng vai trò mỏ neo bên phải */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={cn(
                    "h-10 w-10 shrink-0 flex items-center justify-center rounded-full transition-all duration-500",
                    isSearchOpen ? "text-primary hover:bg-primary/5" : "hover:bg-slate-100 text-muted-foreground hover:text-primary"
                  )}
                >
                  {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                  <span className="sr-only">{lang === "vi" ? "Tìm kiếm" : "Search"}</span>
                </button>

                {/* Ô input nở ra bên trái */}
                <div className="flex-1 h-full overflow-hidden">
                  <motion.input
                    ref={searchInputRef}
                    animate={{ opacity: isSearchOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isSearchOpen ? placeholder : (lang === "vi" ? "Tìm kiếm..." : "Search...")}
                    className="w-full h-full bg-transparent pl-5 pr-0 text-xs font-medium focus:outline-none placeholder:text-slate-400 placeholder:font-medium"
                  />
                </div>
              </motion.div>

              {/* Suggestion Popup */}
              <AnimatePresence>
                {isSearchOpen && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    className="absolute top-full mt-3 right-0 w-[280px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden z-[100]"
                  >
                    <div className="p-2 border-b border-slate-50 bg-slate-50/50">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">
                        {lang === "vi" ? "Gợi ý sản phẩm" : "Product Suggestions"}
                      </span>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto py-1">
                      {suggestions.map((item, idx) => (
                        <Link
                           key={idx}
                          href={`/search?q=${item.name}`}
                          className="flex flex-col px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <span className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">{item.name}</span>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-[10px] text-slate-400 font-medium">{item.category}</span>
                            <span className="text-xl font-black text-primary">{item.price}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={`/search?q=${searchQuery}`}
                      className="block w-full py-3 bg-primary text-white text-center text-xs font-bold hover:bg-primary/90 transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      {lang === "vi" ? "Xem tất cả kết quả" : "View All Results"}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-4 w-px bg-border/60 hidden sm:block" />

            {/* Global Language Toggle Switcher */}
            <div className="flex items-center bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/50 h-9 shrink-0 shadow-inner">
              <button
                onClick={() => setLang("vi")}
                className={cn(
                  "px-2.5 h-full text-[10px] font-black rounded-lg transition-all duration-300 flex items-center justify-center",
                  lang === "vi" ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
                )}
              >
                VI
              </button>
              <button
                onClick={() => setLang("en")}
                className={cn(
                  "px-2.5 h-full text-[10px] font-black rounded-lg transition-all duration-300 flex items-center justify-center",
                  lang === "en" ? "bg-primary text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
                )}
              >
                EN
              </button>
            </div>

            <div className="h-4 w-px bg-border/60 hidden sm:block" />

            <button className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-95 disabled:pointer-events-none disabled:opacity-50 shrink-0">
              {lang === "vi" ? "Tư vấn ngay" : "Consult Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Search, Globe, Calendar, MapPin, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PROJECTS_DATABASE, Project } from "@/constants/projects";
import { useLanguageStore } from "@/store/useLanguageStore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectsGalleryProps {
  limit?: number;
  randomizeLayout?: boolean;
  isPageMode?: boolean;
}

const ASPECT_RATIOS = [
  "aspect-[4/5]", "aspect-[3/2]", "aspect-[4/3]",
  "aspect-[2/3]", "aspect-[1/1]", "aspect-[5/4]", "aspect-[3/4]"
];

export function ProjectsGallery({ limit, randomizeLayout = false, isPageMode = false }: ProjectsGalleryProps = {}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { lang, setLang } = useLanguageStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const galleryRef = useRef<HTMLElement>(null);

  // Reset image loading state when a new project is clicked
  useEffect(() => {
    if (selectedProject) {
      setIsImageLoading(true);
    }
  }, [selectedProject]);

  // Filter projects based on category and search query
  const filteredProjects = PROJECTS_DATABASE.filter((project) => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const titleText = lang === "vi" ? project.title.toLowerCase() : project.titleEn.toLowerCase();
    const descText = lang === "vi" ? project.description.toLowerCase() : project.descriptionEn.toLowerCase();
    
    const matchesSearch = query === "" || titleText.includes(query) || descText.includes(query);
    
    return matchesCategory && matchesSearch;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  // WCAG: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) setSelectedProject(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  // Prevent background scrolling and hide scrollbar when modal is open
  useEffect(() => {
    if (selectedProject) {
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
  }, [selectedProject]);

  // WCAG: Focus management — move focus to close button when modal opens
  useEffect(() => {
    if (selectedProject) {
      closeButtonRef.current?.focus();
    }
  }, [selectedProject]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!galleryRef.current) return;
    const section = galleryRef.current;
    const items = section.querySelectorAll(".gallery-item");
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 50 });

    const anim = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section.querySelector(".gallery-grid"),
        start: "top 100%",
        toggleActions: "play none none none"
      }
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [selectedCategory, searchQuery]); // Re-run animation when filters change for a fresh look!

  const categories = [
    { id: "all", nameVi: "Tất cả", nameEn: "All" },
    { id: "commercial", nameVi: "Lạnh công nghiệp", nameEn: "Commercial HVAC" },
    { id: "residential", nameVi: "Lạnh dân dụng", nameEn: "Residential HVAC" },
    { id: "maintenance", nameVi: "Bảo trì & Dịch vụ", nameEn: "Maintenance" },
  ];

  return (
    <section ref={galleryRef} id="projects" className={cn("pb-16 bg-white overflow-hidden", isPageMode ? "pt-8" : "pt-24")}>
      <div className="container mx-auto px-4 md:px-[50px]">
        
        {/* Header Section */}
        <div className="text-center mb-12 relative">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-black tracking-[0.2em] text-primary bg-primary/10 rounded-full uppercase">
              {lang === "vi" ? "Thành quả của chúng tôi" : "Our achievements"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              {lang === "vi" ? "CÔNG TRÌNH " : "FEATURED "}<span className="text-primary">{lang === "vi" ? "TIÊU BIỂU" : "PROJECTS"}</span>
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
              {lang === "vi" 
                ? "Các dự án đã hoàn thành với tiêu chuẩn kỹ thuật cao nhất và sự hài lòng từ khách hàng." 
                : "Completed projects meeting the highest technical standards and total customer satisfaction."}
            </p>
          </motion.div>
        </div>

        {/* Dynamic Interactive Filters (Only in Page Mode) */}
        {isPageMode && (
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 text-xs md:text-sm font-black rounded-xl transition-all border",
                    selectedCategory === cat.id
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm"
                  )}
                >
                  {lang === "vi" ? cat.nameVi : cat.nameEn}
                </button>
              ))}
            </div>

            {/* Instant Search input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "vi" ? "Tìm kiếm công trình..." : "Search projects..."}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900"
                >
                  Clear
                </button>
              )}
            </div>

          </div>
        )}

        {/* Dynamic Masonry Grid */}
        {displayedProjects.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 gallery-grid" role="list" aria-label="Thư viện công trình tiêu biểu">
            {displayedProjects.map((project, index) => {
              const ratioClass = randomizeLayout
                ? ASPECT_RATIOS[(project.id * 17 + index) % ASPECT_RATIOS.length]
                : index % 4 === 0 ? "aspect-[4/5]" :
                  index % 4 === 1 ? "aspect-[3/2]" :
                    index % 4 === 2 ? "aspect-[4/3]" : "aspect-[2/3]";

              return (
                <div
                  key={project.id}
                  className="gallery-item opacity-0 relative break-inside-avoid mb-6 group cursor-pointer overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                  role="listitem"
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="block w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl overflow-hidden"
                    aria-label={`Xem chi tiết: ${lang === "vi" ? project.title : project.titleEn}`}
                  >
                    <div className={cn(
                      "relative w-full overflow-hidden rounded-2xl",
                      ratioClass
                    )}>
                      {/* Image Optimization in action (unoptimized prop removed!) */}
                      <Image
                        src={project.src}
                        alt={lang === "vi" ? project.title : project.titleEn}
                        fill
                        priority={index < 4}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">
                            {lang === "vi" ? project.categoryName : project.categoryNameEn}
                          </span>
                          <h4 className="text-white font-black text-sm md:text-base leading-tight">
                            {lang === "vi" ? project.title : project.titleEn}
                          </h4>
                        </div>
                      </div>

                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500" aria-hidden="true">
                        <Maximize2 className="text-white w-5 h-5" />
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-400 font-medium">
              {lang === "vi" ? "Không tìm thấy công trình nào phù hợp." : "No matching projects found."}
            </p>
          </div>
        )}

      </div>

      {/* WCAG Interactive Detail Modal (Bilingual + Programmatic SEO Integration) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lang === "vi" ? selectedProject.title : selectedProject.titleEn}
          >
            <button
              ref={closeButtonRef}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[210] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setSelectedProject(null)}
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Image Section with Skeleton Loader & Direct CDN delivery */}
              <div className="relative w-full md:w-1/2 bg-slate-100 flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-0">
                {isImageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse z-10 flex items-center justify-center">
                    <span className="text-xs font-black text-slate-400 tracking-widest uppercase animate-bounce">
                      Đang tải ảnh...
                    </span>
                  </div>
                )}
                <Image
                  src={selectedProject.src}
                  alt={lang === "vi" ? selectedProject.title : selectedProject.titleEn}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onLoad={() => setIsImageLoading(false)}
                  className={cn(
                    "object-cover transition-all duration-500",
                    isImageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  )}
                />
              </div>

              {/* Specification Details Section */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none">
                <div>
                  <span className="inline-block px-3 py-1 mb-4 text-[9px] font-black tracking-widest text-primary bg-primary/10 rounded-full uppercase">
                    {lang === "vi" ? selectedProject.categoryName : selectedProject.categoryNameEn}
                  </span>
                  
                  <h3 className="text-lg md:text-2xl font-black text-slate-900 mb-4 leading-tight">
                    {lang === "vi" ? selectedProject.title : selectedProject.titleEn}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {lang === "vi" ? selectedProject.description : selectedProject.descriptionEn}
                  </p>

                  {/* Specs Details Grid */}
                  <div className="space-y-4 mb-6 border-t border-b border-slate-100 py-4">
                    <div className="flex items-center gap-3 text-slate-600 text-xs">
                      <User className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        <strong className="text-slate-800">{lang === "vi" ? "Khách hàng:" : "Client:"}</strong>{" "}
                        {lang === "vi" ? selectedProject.client : selectedProject.clientEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 text-xs">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        <strong className="text-slate-800">{lang === "vi" ? "Địa điểm:" : "Location:"}</strong>{" "}
                        {lang === "vi" ? selectedProject.location : selectedProject.locationEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 text-xs">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        <strong className="text-slate-800">{lang === "vi" ? "Hoàn thành:" : "Completed:"}</strong>{" "}
                        {selectedProject.date}
                      </span>
                    </div>
                  </div>

                  {/* Technical specs bullet points */}
                  <div className="mb-6">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3">
                      {lang === "vi" ? "Thông số kỹ thuật thi công:" : "Technical Specifications:"}
                    </h4>
                    <ul className="space-y-2">
                      {(lang === "vi" ? selectedProject.specs : selectedProject.specsEn).map((spec, i) => (
                        <li key={i} className="flex gap-2 items-start text-xs text-slate-500">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Programmatic SEO Detail Page Action Button */}
                <Link
                  href={`/projects/${selectedProject.slug}`}
                  onClick={() => setSelectedProject(null)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-black text-sm rounded-xl hover:bg-primary/95 transition-all shadow-md hover:shadow-lg hover:scale-[1.01]"
                >
                  <span>
                    {lang === "vi" ? "Xem Chi Tiết Công Trình" : "View Project Details"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

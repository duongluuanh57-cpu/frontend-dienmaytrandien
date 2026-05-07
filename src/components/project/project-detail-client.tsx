"use client";

import Image from "next/image";
import { Settings, CheckCircle2, User, MapPin, Calendar, Award, PhoneCall } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Project } from "@/constants/projects";

export function ProjectDetailClient({ project }: { project: Project }) {
  const { lang } = useLanguageStore();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Main Content Panel */}
      <div className="w-full lg:w-2/3 space-y-8">
        
        {/* Dynamic Image Wrapper with High Optimization */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-md border border-slate-200/50">
          <Image
            src={project.src}
            alt={lang === "vi" ? project.title : project.titleEn}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Specification Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div>
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/10 rounded-full uppercase">
              {lang === "vi" ? project.categoryName : project.categoryNameEn}
            </span>
            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
              {lang === "vi" ? project.title : project.titleEn}
            </h1>
          </div>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
            {lang === "vi" ? project.description : project.descriptionEn}
          </p>

          {/* Technical Specs List */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              <span>{lang === "vi" ? "Chi tiết kỹ thuật thi công" : "Construction Technical Details"}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(lang === "vi" ? project.specs : project.specsEn).map((spec, index) => (
                <div key={index} className="flex gap-3 items-start p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-slate-600 font-bold">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Right Information Sidebar Panel */}
      <div className="w-full lg:w-1/3 space-y-6">
        
        {/* Project Meta Information Card */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-4">
            {lang === "vi" ? "Thông tin dự án" : "Project Details"}
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <User className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === "vi" ? "Khách hàng" : "Client"}</span>
                <span className="text-xs md:text-sm text-slate-800 font-black">{lang === "vi" ? project.client : project.clientEn}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === "vi" ? "Địa điểm thi công" : "Location"}</span>
                <span className="text-xs md:text-sm text-slate-800 font-black">{lang === "vi" ? project.location : project.locationEn}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === "vi" ? "Thời gian hoàn thành" : "Completion Date"}</span>
                <span className="text-xs md:text-sm text-slate-800 font-black">{project.date}</span>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{lang === "vi" ? "Tiêu chuẩn chất lượng" : "Quality Standard"}</span>
                <span className="text-xs md:text-sm text-slate-800 font-black">
                  {lang === "vi" ? "Chính hãng — Kiểm định QC nghiêm ngặt" : "Genuine — Strict QC Certified"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-action Contact Card */}
        <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-black uppercase tracking-wider">{lang === "vi" ? "Tư vấn thi công?" : "Construction Consult?"}</h4>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              {lang === "vi" 
                ? "Liên hệ Điện Máy Trần Điền để nhận khảo sát thực tế và báo giá thiết kế hệ thống điều hòa trọn gói tốt nhất."
                : "Contact Tran Dien Electrical for a physical survey and the best comprehensive AC design quote."}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="tel:0903760096"
              className="flex items-center justify-center gap-2.5 w-full py-3 bg-white text-primary font-black text-sm rounded-2xl hover:bg-white/95 transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{lang === "vi" ? "Gọi tư vấn: 0903 760 096" : "Call Consult: 0903 760 096"}</span>
            </a>
            <a
              href="https://zalo.me/0903760096"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 text-white font-black text-sm rounded-2xl border border-white/20 transition-all"
            >
              <span>{lang === "vi" ? "Chat qua Zalo" : "Chat on Zalo"}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

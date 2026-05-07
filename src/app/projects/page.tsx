import { Header } from "@/components/layout/header";
import { ProjectsGallery } from "@/components/home/projects-gallery";
import { ImageGallerySchema } from "@/components/seo/json-ld";
import { PROJECTS_DATABASE } from "@/constants/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Công Trình Tiêu Biểu | Điện Máy Trần Điền",
  description: "Khám phá các dự án thi công và lắp đặt điện máy, hệ thống làm lạnh công nghiệp, hệ thống điều hòa do Điện Máy Trần Điền thực hiện tại TP.HCM và các khu vực lân cận.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  // Convert our centralized database to match ImageGallerySchema expected shape
  const galleryImages = PROJECTS_DATABASE.map((project) => ({
    src: project.src,
    title: project.title,
  }));

  return (
    <div className="bg-background overflow-x-hidden min-h-screen flex flex-col">
      <ImageGallerySchema images={galleryImages} />
      <Header />

      <main className="flex-1 bg-background">
        {/* Render the fully upgraded bilingual filtered/searched ProjectsGallery */}
        <ProjectsGallery randomizeLayout={true} isPageMode={true} />
      </main>
    </div>
  );
}


import { PROJECTS_DATABASE } from "@/constants/projects";
import { Header } from "@/components/layout/header";
import { ContactButtons } from "@/components/layout/contact-buttons";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectDetailClient } from "@/components/project/project-detail-client";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate Static Params for Next.js Static Site Generation (SSG)
export async function generateStaticParams() {
  return PROJECTS_DATABASE.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic SEO Metadata Generation for Programmatic SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATABASE.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Không tìm thấy công trình",
    };
  }

  return {
    title: `${project.title} | Dự Án Tiêu Biểu Trần Điền`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Điện Máy Trần Điền`,
      description: project.description,
      images: [
        {
          url: project.src,
          width: 800,
          height: 600,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS_DATABASE.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-[50px] max-w-6xl">
          
          {/* Back Navigation & Breadcrumbs */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              <span>Quay lại danh sách công trình</span>
            </Link>
          </div>

          {/* Interactive Client-Side Bilingual Project Details */}
          <ProjectDetailClient project={project} />

        </div>
      </main>
      
      {/* Dynamic Floating Contact Buttons */}
      <ContactButtons />
    </div>
  );
}

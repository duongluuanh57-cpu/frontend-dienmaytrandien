import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { AboutShort } from "@/components/home/about-short";
import { ProductSection } from "@/components/home/product-section";
import { HeroSection } from "@/components/home/hero-section";
import { BannerGallery } from "@/components/home/banner-gallery";
import { OrganizationSchema, LocalBusinessSchema, ProductSchema, ImageGallerySchema, FAQSchema, WebSiteSchema } from "@/components/seo/json-ld";
import { Metadata } from "next";
import { PrivacyAnalytics } from "@/components/analytics/privacy-analytics";
import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/home/features").then((mod) => mod.Features), {
  ssr: true,
  loading: () => <div className="container mx-auto px-4 md:px-[50px] py-20 h-96 animate-pulse bg-slate-50 rounded-3xl mb-12" />
});

const ProjectsGallery = dynamic(() => import("@/components/home/projects-gallery").then((mod) => mod.ProjectsGallery), {
  ssr: true,
  loading: () => <div className="container mx-auto px-4 md:px-[50px] py-20 h-[500px] animate-pulse bg-slate-50 rounded-3xl mb-12" />
});

const NewsSection = dynamic(() => import("@/components/home/news-section").then((mod) => mod.NewsSection), {
  ssr: true,
  loading: () => <div className="container mx-auto px-4 md:px-[50px] py-20 h-96 animate-pulse bg-slate-50 rounded-3xl mb-12" />
});

import {
  PUMP_PRODUCTS,
  FAN_PRODUCTS,
  PORTABLE_AC_PRODUCTS,
  NAGAKAWA_AC_PRODUCTS,
  PANASONIC_AC_PRODUCTS
} from "@/constants/products";

export const metadata: Metadata = {
  title: "Điện Máy Trần Điền | Máy Bơm Nước Ngưng, Quạt Chắn Gió, Máy Lạnh Nagakawa & Panasonic",
  description: "Chuyên cung cấp máy bơm nước ngưng điều hòa Kingpump, HI-TECH, quạt chắn gió NEDFON, NANYOO, máy lạnh di động và điều hòa không khí Nagakawa, Panasonic chính hãng. Tư vấn và thi công lắp đặt chuyên nghiệp tại TP.HCM. Liên hệ: 0903 76 00 96.",
  keywords: ["máy bơm nước ngưng điều hòa", "quạt chắn gió", "máy lạnh di động", "điều hòa Nagakawa", "điều hòa Panasonic", "lắp đặt điều hòa TPHCM", "Kingpump", "HI-TECH HRP", "NEDFON", "điện máy Trần Điền"],
  authors: [{ name: "Điện Máy Trần Điền" }],
  creator: "Điện Máy Trần Điền",
  metadataBase: new URL("http://dienmaytrandien.vn"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "http://dienmaytrandien.vn",
    siteName: "Điện Máy Trần Điền",
    title: "Điện Máy Trần Điền - Giải Pháp Điều Hòa & Điện Máy Chuyên Nghiệp TP.HCM",
    description: "Máy bơm nước ngưng Kingpump, quạt chắn gió NEDFON, máy lạnh Nagakawa & Panasonic chính hãng. Lắp đặt tận nơi tại TP.HCM.",
    images: [{
      url: "https://i.ibb.co/vCrxXD2L/bn-1366x470.png",
      width: 1366,
      height: 470,
      alt: "Điện Máy Trần Điền - Banner",
    }],
  },
};

const bannerImages = [
  "https://i.ibb.co/vCrxXD2L/bn-1366x470.png",
  "https://i.ibb.co/B5KqJDZ0/bn-1366x470-1.png",
  "https://i.ibb.co/bgStpf1c/bn-1366x470.png"
];

const galleryImages = [
  { src: "https://i.ibb.co/m50FzJkM/gallery-2.png", title: "Thi công hệ thống lạnh công nghiệp" },
  { src: "https://i.ibb.co/wZ3PrP6h/gallery-1.png", title: "Công trình toà nhà thương mại" },
  { src: "https://i.ibb.co/PZDwjXBL/gallery-3.png", title: "Thi công hệ thống ống gió và máy lạnh giấu trần" },
  { src: "https://i.ibb.co/QvBkhbS6/gallery-4.png", title: "Điện lực Tân Phú Đông" },
  { src: "https://i.ibb.co/4xCXKCn/gallery-5.png", title: "Lắp đặt điều hòa cho công trình biệt thự" },
  { src: "https://i.ibb.co/VcnnLBTK/gallery-6.png", title: "Công trình đang thi công" },
  { src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", title: "Lắp đặt máy lạnh âm trần cho văn phòng" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop", title: "Dự án thi công hệ thống thông gió" },
  { src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop", title: "Bảo trì máy lạnh trung tâm VRV" },
  { src: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=800&auto=format&fit=crop", title: "Thiết kế thi công điều hòa nhà phố cao cấp" },
];

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      <WebSiteSchema />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema />
      <ImageGallerySchema images={galleryImages.slice(0, 6)} />
      <PrivacyAnalytics />
      <ProductSchema products={PUMP_PRODUCTS} />
      <ProductSchema products={FAN_PRODUCTS} />
      <ProductSchema products={PORTABLE_AC_PRODUCTS} />
      <ProductSchema products={NAGAKAWA_AC_PRODUCTS} />
      <ProductSchema products={PANASONIC_AC_PRODUCTS} />

      {/* WCAG: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Bỏ qua điều hướng
      </a>

      <main id="main-content" className="flex-1 overflow-x-hidden">
        <HeroSection />
        <BannerGallery images={bannerImages} />
        
        <BrandMarquee />
        <AboutShort />

        {/* Pump Section */}
        <ProductSection
          title="MÁY BƠM NƯỚC NGƯNG ĐIỀU HÒA"
          products={PUMP_PRODUCTS}
          filterOptions={["Tất cả", "Kingpump", "HI-TECH"]}
          filterKey="brand"
          bgGray={true}
        />

        {/* Fan Section */}
        <ProductSection
          title="QUẠT CHẮN GIÓ (AIR CURTAIN)"
          products={FAN_PRODUCTS}
          filterOptions={["Tất cả", "NEDFON", "NANYOO"]}
          filterKey="brand"
        />

        {/* Portable AC Section */}
        <ProductSection
          title="MÁY LẠNH DI ĐỘNG"
          products={PORTABLE_AC_PRODUCTS}
          filterOptions={["Tất cả", "NAGAKAWA", "PANASONIC"]}
          filterKey="brand"
          bgGray={true}
        />

        {/* Nagakawa Section */}
        <ProductSection
          title="MÁY ĐHKK NAGAKAWA"
          products={NAGAKAWA_AC_PRODUCTS}
          filterOptions={["Tất cả", "Treo tường", "Tủ đứng", "Âm trần"]}
          filterKey="type"
        />

        {/* Panasonic Section */}
        <ProductSection
          title="MÁY ĐHKK PANASONIC"
          products={PANASONIC_AC_PRODUCTS}
          filterOptions={["Tất cả", "Treo tường", "Âm trần", "Hệ thống Multi"]}
          filterKey="type"
          bgGray={true}
        />

        <Features />
        <ProjectsGallery limit={6} />
        <NewsSection />
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { Mail, Phone, Clock, MapPin, Globe, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, Typography } from "@/components/ds";
import { useLanguageStore } from "@/store/useLanguageStore";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguageStore();

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": lang === "vi" ? "CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ KỸ THUẬT TRẦN ĐIỀN" : "TRAN DIEN TRADING SERVICE TECHNICAL CO., LTD",
    "url": "http://dienmaytrandien.vn",
    "logo": "https://i.ibb.co/k7YP1wc/logo-122x122.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-903-76-00-96",
      "contactType": "customer service",
      "email": "dienmaytrandien@gmail.com",
      "availableLanguage": ["Vietnamese", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": lang === "vi" ? "22 Đoàn Hữu Trưng, P.An Khánh" : "22 Doan Huu Trung, An Khanh Ward",
      "addressLocality": lang === "vi" ? "Tp. Hồ Chí Minh" : "Ho Chi Minh City",
      "addressCountry": "VN"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61555879134958",
      "https://twitter.com/dienmaytrandien",
      "https://www.youtube.com/dienmaytrandien"
    ]
  };

  const supportPolicies = [
    { vi: "Chính sách & Quy định chung", en: "General Terms & Regulations" },
    { vi: "Quy định và hình thức thanh toán", en: "Payment Policies & Methods" },
    { vi: "Chính sách vận chuyển và giao nhận", en: "Shipping & Delivery Policies" },
    { vi: "Chính sách bảo hành", en: "Warranty Policies" },
    { vi: "Chính sách đổi trả và hoàn tiền", en: "Return & Refund Policies" },
    { vi: "Chính sách bảo vệ thông tin cá nhân", en: "Privacy Policy" },
    { vi: "Chính sách xử lý khiếu nại", en: "Complaint Resolution Policy" },
  ];

  const productCategories = [
    { vi: "MÁY BƠM NƯỚC NGƯNG ĐIỀU HÒA", en: "CONDENSATE PUMPS" },
    { vi: "QUẠT CHẮN GIÓ", en: "AIR CURTAINS" },
    { vi: "MÁY LẠNH DI ĐỘNG", en: "PORTABLE AIR CONDITIONERS" },
    { vi: "MÁY ĐHKK NAGAKAWA", en: "NAGAKAWA AIR CONDITIONERS" },
    { vi: "MÁY ĐHKK PANASONIC", en: "PANASONIC AIR CONDITIONERS" },
  ];

  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-8 border-t border-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            <Typography variant="h4" className="text-slate-900 border-b-2 border-primary/10 pb-2 inline-block font-black">
              {lang === "vi" ? (
                <>CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ KỸ THUẬT <span className="text-red-600">TRẦN ĐIỀN</span></>
              ) : (
                <>TRAN DIEN TRADING SERVICE TECHNICAL <span className="text-red-600">CO., LTD</span></>
              )}
            </Typography>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-primary" />
                <p className="text-slate-700">
                  {lang === "vi" 
                    ? "22 Đoàn Hữu Trưng, P.An Khánh, Tp. Hồ Chí Minh" 
                    : "22 Doan Huu Trung St, An Khanh Ward, Thu Duc City, Ho Chi Minh City"}
                </p>
              </div>
              <p className="pl-8 text-slate-500 italic">
                {lang === "vi"
                  ? "MST: 0319085664 do sở tài chính TP.HCM cấp 05/08/2025"
                  : "Tax Code: 0319085664 issued by HCM City Finance Department on 05/08/2025"}
              </p>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 shrink-0 text-primary" />
                <div className="text-slate-700 font-medium flex flex-wrap gap-x-2">
                  <a href="tel:0903760096" className="hover:text-primary transition-colors">0903 76 00 96</a>
                  <span>–</span>
                  <a href="tel:0922578679" className="hover:text-primary transition-colors">0922 578 679</a>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="w-5 h-5 bg-blue-500 text-white rounded-sm flex items-center justify-center font-bold text-[10px]">Z</div>
                <p className="text-slate-700">
                  Zalo: <a href="https://zalo.me/0903760096" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-blue-600 transition-colors">0903 76 00 96</a>
                </p>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 shrink-0 text-primary" />
                <p className="text-slate-700">dienmaytrandien@gmail.com</p>
              </div>
              <div className="flex gap-3">
                <Globe className="w-5 h-5 shrink-0 text-primary" />
                <div className="text-slate-700">
                  <p>http://dienmaytrandien.vn</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 shrink-0 text-primary" />
                <p className="text-slate-700">
                  {lang === "vi" ? "Giờ làm việc: 7h-22h" : "Working Hours: 7:00 AM - 10:00 PM"}
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-6">
              <p className="text-sm font-bold text-slate-900 mb-3">Follow us:</p>
              <div className="flex gap-3">
                <Link href="https://www.facebook.com/profile.php?id=61555879134958" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Policies */}
          <div className="space-y-6">
            <Typography variant="h4" className="text-slate-900 border-b-2 border-primary/10 pb-2 inline-block font-black">
              {lang === "vi" ? "CHÍNH SÁCH HỖ TRỢ" : "SUPPORT POLICIES"}
            </Typography>
            <ul className="space-y-3">
              {supportPolicies.map((item) => (
                <li key={item.vi} className="group">
                  <Link href="#" className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary hover:translate-x-1 transition-all">
                    <ChevronRight className="w-3 h-3 text-primary/50" />
                    {lang === "vi" ? item.vi : item.en}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Image
                src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png"
                alt={lang === "vi" ? "Đã thông báo Bộ Công Thương" : "Registered with Ministry of Industry and Trade"}
                width={150}
                height={50}
                className="transition-none"
              />
            </div>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-6">
            <Typography variant="h4" className="text-slate-900 border-b-2 border-primary/10 pb-2 inline-block font-black">
              {lang === "vi" ? "SẢN PHẨM" : "PRODUCTS"}
            </Typography>
            <ul className="space-y-3">
              {productCategories.map((item) => (
                <li key={item.vi} className="group">
                  <Link href="/products" className="flex items-center gap-2 text-sm uppercase text-slate-600 hover:text-primary hover:translate-x-1 transition-all">
                    <ChevronRight className="w-3 h-3 text-primary/50" />
                    {lang === "vi" ? item.vi : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Fanpage */}
          <div className="space-y-6">
            <Typography variant="h4" className="text-slate-900 border-b-2 border-primary/10 pb-2 inline-block font-black">
              FANPAGE
            </Typography>
            <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 h-[250px] w-full bg-white">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61555879134958&tabs=timeline&width=340&height=250&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="250"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <div>
            {lang === "vi" ? (
              <>{currentYear} © Điện Máy <span className="text-red-600 font-bold">Trần Điền</span>. Thiết kế bởi <span className="text-primary hover:underline cursor-pointer">duongluuanh57@gmail.com</span></>
            ) : (
              <>{currentYear} © <span className="text-red-600 font-bold">Tran Dien</span> Electrical Appliances. Designed by <span className="text-primary hover:underline cursor-pointer">duongluuanh57@gmail.com</span></>
            )}
          </div>
          <div className="flex gap-6">
            <p>
              {lang === "vi" ? "Đang online:" : "Online Now:"}{" "}
              <span className="text-slate-900 font-bold">1</span>
            </p>
            <p>
              {lang === "vi" ? "Tổng truy cập:" : "Total Visits:"}{" "}
              <span className="text-slate-900 font-bold">74034</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

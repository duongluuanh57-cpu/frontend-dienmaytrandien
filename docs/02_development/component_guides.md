# 📐 Component Guides - Quy trình Xây dựng Trang & Component mới

Tài liệu này hướng dẫn chi tiết quy trình gồm 4 bước chuẩn hóa để thêm mới một Trang (Page) hoặc một Component tương tác song ngữ có đầy đủ hiệu ứng mượt mà và an toàn hydration trong dự án Điện Máy Trần Điền.

## 🛠️ Quy trình 4 bước thêm mới một Page tương tác song ngữ

Khi bạn cần tạo thêm một trang mới (ví dụ: Trang Liên hệ - `/contact`), hãy tuân thủ quy trình đồng bộ sau:

### Bước 1: Tạo thư mục định tuyến tĩnh Server Component
Tạo file `page.tsx` tại thư mục `src/app/contact/`:
```typescript
import { Metadata } from "next";
import ContactContent from "./contact-content.js";

export const metadata: Metadata = {
  title: "Liên Hệ Tư Vấn | Điện Máy Trần Điền",
  description: "Liên hệ ngay với Điện Máy Trần Điền để nhận tư vấn thiết kế, thi công lắp đặt máy lạnh, máy bơm nước ngưng, quạt chắn gió chính hãng tại TP.HCM.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <main className="bg-background">
        <ContactContent />
      </main>
    </div>
  );
}
```

### Bước 2: Tạo Client Component chứa Logic tương tác & Đồng bộ Ngôn ngữ
Tạo file `contact-content.tsx` trong cùng thư mục:
```typescript
"use client";

import { useLanguageStore } from "@/store/useLanguageStore.js";
import { useAppStore } from "@/store/use-app-store.js";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContactContent() {
  const { lang } = useLanguageStore();
  const { isLoaded } = useAppStore();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // FOUC Protection: Chỉ chạy hoạt ảnh khi Preloader đã hoàn thành nạp trang
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    });

    return () => ctx.revert(); // Dọn dẹp tránh rò rỉ CPU (Garbage Collection)
  }, [isLoaded]);

  return (
    <section className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-black text-slate-900 mb-8 text-center">
        {lang === "vi" ? "LIÊN HỆ TƯ VẤN" : "REQUEST CONSULTATION"}
      </h1>

      <form ref={formRef} className="space-y-6 bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
        {/* Form Inputs ở đây */}
      </form>
    </section>
  );
}
```

### Bước 3: Đăng ký liên kết định tuyến trên Header/Navbar
Mở tệp tin `src/components/layout/navbar.tsx` (hoặc `src/components/layout/header.tsx`), thêm liên kết mới vào mảng danh mục hiển thị:
```typescript
const navLinks = [
  { href: "/", labelVi: "Trang chủ", labelEn: "Home" },
  { href: "/about", labelVi: "Giới thiệu", labelEn: "About" },
  { href: "/projects", labelVi: "Dự án", labelEn: "Projects" },
  { href: "/news", labelVi: "Tin tức", labelEn: "News" },
  { href: "/contact", labelVi: "Liên hệ", labelEn: "Contact" }, // Thêm mới
];
```

### Bước 4: Kiểm tra và kiểm thử độ tương thích giao diện
*   Chạy `npm run dev` kiểm tra khả năng chuyển đổi ngôn ngữ Việt - Anh tức thời tại nút gạt trên Header.
*   Kiểm tra tính phản hồi màn hình di động (Responsive Grid) của trang web.
*   Chạy `npm run build` để đảm bảo Next.js tự động pre-render tĩnh thành công trang mới của bạn mà không gặp lỗi biên dịch TypeScript.

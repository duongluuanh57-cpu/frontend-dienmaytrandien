# 🎨 Design System - Hệ thống Thiết kế & Ngôn ngữ Giao diện

Tài liệu này chi tiết hóa dải màu OKLCH cao cấp, hệ thống Typography, quản lý biến thể Component (CVA), thư viện Icon Lucide React và các lưới bố cục thích ứng (Responsive Layouts).

## 🌈 1. Không gian màu OKLCH thế hệ mới (2026 Color Palette)

Dự án áp dụng không gian màu **OKLCH** thay vì HEX/RGB truyền thống. OKLCH cho phép kiểm soát độ sáng (Lightness), độ bão hòa (Chroma) và sắc độ (Hue) hoàn toàn độc lập, đảm bảo dải màu hiển thị rực rỡ, đồng đều trên mọi loại tấm nền màn hình (OLED, Retina, IPS) và hỗ trợ tính toán bảng màu Dark Mode tự nhiên nhất.

### Bảng cấu hình mã màu chuẩn hóa trong `globals.css`:

*   **Màu chủ đạo (Primary)**: `oklch(0.79 0.134 234.6)` — Tông màu Xanh Ngọc Cyan mát rực rỡ, biểu trưng cho luồng khí mát mẻ, sạch sẽ và năng lượng tích cực của điện lạnh hiện đại. Thay thế cho tông màu đỏ nóng cũ để tăng trải nghiệm dịu mắt cho người dùng.
*   **Màu nền chính (Background)**: `oklch(1 0 0)` — Trắng tinh khiết `#ffffff`, tạo không gian thoáng đãng, sang trọng (White Space).
*   **Màu chữ chính (Foreground)**: `oklch(0.145 0 0)` — Màu xám đá phiến siêu đậm (Slate-900), tăng độ sâu chữ và giảm mỏi mắt so với màu đen thuần.
*   **Màu cảnh báo & Trạng thái (Status Colors)**:
    *   *Thành công (Success)*: `oklch(0.627 0.265 149.213)` — Màu xanh lá tươi tắn cho các thông báo hoàn thành hoặc nhãn chính hãng.
    *   *Cảnh báo (Warning)*: `oklch(0.769 0.188 70.08)` — Màu vàng ấm cho các nhãn giảm giá, ưu đãi đặc biệt.
    *   *Thông tin (Info)*: `oklch(0.707 0.165 254.624)` — Màu xanh dương đậm cho các đường link hỗ trợ kỹ thuật.
*   **Màu điểm nhấn truyền thống (Brand Accent)**: Màu Đỏ thương hiệu (`text-red-600`) vẫn được sử dụng tinh tế tại các cụm chữ **TRẦN ĐIỀN** quan trọng và dấu chấm phá logo, tạo nên sự kết hợp hài hòa giữa di sản thương hiệu truyền thống và làn sóng công nghệ 2026 hiện đại.

---

## 🏗️ 2. Quản lý Biến thể bằng Class Variance Authority (CVA)

Để xây dựng hệ thống Reusable Components vững chắc và có type-safety, dự án sử dụng thư viện `class-variance-authority` (CVA) để quản lý các biến thể giao diện:

```typescript
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/25",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

---

## ⚡ 3. Hệ thống biểu tượng Icon Lucide React tối ưu

Dự án tích hợp **Lucide React** mang lại hệ thống icon sắc nét, nhất quán và có khả năng Tree-shaking tối đa:
*   **Tải ưu tiên**: Next.js tự động tối ưu hóa việc import gói icon để không làm chậm luồng chính.
*   **Hỗ trợ tiếp cận**: Tất cả các icon trang trí đều được tích hợp cờ `aria-hidden="true"` để các phần mềm đọc màn hình tự động bỏ qua, tránh gây phiền nhiễu cho người khiếm thị.

---

## 📐 4. Lưới Masonry Pinterest thích ứng (Responsive Layouts)

Lưới danh mục dự án sử dụng bố cục xếp lớp **Pinterest Masonry Grid** so le chiều cao, mang lại vẻ đẹp mỹ thuật, hiện đại và cao cấp hơn so với lưới ô vuông đồng đều truyền thống:

*   **Tính thích ứng di động**: Tự động chia cột linh hoạt từ 1 cột trên mobile đến 3 cột trên desktop: `columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6`.
*   **Giữ khoảng cách chống lệch (CLS Prevention)**: Áp dụng mảng tỉ lệ khung hình chuẩn định sẵn `["aspect-[4/5]", "aspect-[3/2]", "aspect-[4/3]"]` để giữ trước vị trí hiển thị hình ảnh trước khi tải xong.

# 📈 Structured Data & Accessibility - Tối ưu hóa SEO & Tiếp cận Người dùng

Tài liệu này đặc tả chi tiết bộ dữ liệu cấu trúc JSON-LD đa lớp (SGE & AI Search Engine Ready) và các tiêu chuẩn thiết kế tiếp cận người dùng đạt chuẩn quốc tế WCAG 2.2 AA.

## 🧠 1. Bộ cấu trúc Dữ liệu 7-Schema JSON-LD Suite

Để các thuật toán tìm kiếm AI (Google Search, Bing CoPilot, Perplexity) hiểu sâu sắc về dịch vụ cơ điện lạnh Điện Máy Trần Điền tại TP.HCM, hệ thống tiêm trực tiếp 7 loại Schema định dạng JSON-LD vào mã nguồn:

### 1. WebSite Schema (`home.md` / `page.tsx`)
*   Định hình hộp tìm kiếm Sitelinks Searchbox liên kết trực tiếp với tên miền chính chủ.

### 2. Organization Schema (`about.md` / `about-content.tsx`)
*   Khai báo danh tính pháp nhân chính thức, tên thương hiệu, logo và liên kết mạng xã hội chính xác.

### 3. LocalBusiness Schema (`home.md`)
*   Khai báo địa chỉ chi tiết tại Quận Thủ Đức, tọa độ GPS bản đồ thực tế, giờ hoạt động, thang giá và xếp hạng tín nhiệm AggregateRating đạt `4.9/5` từ `86` lượt đánh giá thực của khách hàng.

### 4. Product Schema (`home.md`)
*   Lắng nghe mảng dữ liệu sản phẩm động (Máy bơm, Quạt chắn gió, Máy lạnh Nagakawa & Panasonic) để xuất khẩu dữ liệu giá VND, thương hiệu và trạng thái còn hàng (`InStock`) cho bot tìm kiếm thu thập.

### 5. ImageGallery Schema (`projects/page.tsx`)
*   Định vị thư viện ảnh dự án, công trình thi công tiêu biểu kèm tên và tác giả là Điện Máy Trần Điền.

### 6. FAQ Schema (`home.md`)
*   Khai báo danh sách các cặp câu hỏi - câu trả lời thường gặp về máy bơm, quạt chắn gió, máy lạnh di động,... giúp hiển thị trực tiếp các tab câu hỏi đáp thả xuống trên trang kết quả tìm kiếm của Google để tăng CTR.

### 7. NewsArticle Schema (`news/page.tsx`)
*   Khai báo cấu trúc bài viết tin tức, tác giả, ngày đăng để kích hoạt băng chuyền tin tức nổi bật trên kết quả tìm kiếm.

---

## ♿ 2. Tiếp cận Người dùng chuẩn quốc tế WCAG 2.2 AA

Đạt chuẩn tiếp cận AA giúp website được đánh giá cực kỳ thân thiện bởi bot tìm kiếm và hỗ trợ tối đa cho nhóm đối tượng người dùng khuyết tật duyệt web mua sắm.

### 1. Cấu trúc ngữ nghĩa chuẩn (Semantic HTML5)
*   Sử dụng duy nhất 1 thẻ `<h1>` chính trên mỗi trang mô tả thông điệp dịch vụ.
*   Gom cụm nội dung vào các thẻ ngữ nghĩa: `<header>`, `<main>`, `<section>`, `<footer>`, `<article>`.

### 2. Quản lý tiêu điểm bàn phím (Focus Management)
*   **Hỗ trợ Escape đóng Lightbox**: Lắng nghe sự kiện bàn phím toàn cục, bấm phím `Escape` tự động đóng cửa sổ ảnh thu nhỏ để người dùng bàn phím không bị mắc kẹt.
*   **Dịch chuyển tiêu điểm**: Khi mở Lightbox phóng lớn ảnh công trình, mã nguồn tự động dịch chuyển tiêu điểm điều hướng của bàn phím thẳng vào nút Đóng (`closeButtonRef.current?.focus()`) giúp người dùng bàn phím bấm phím `Enter` hoặc `Space` là có thể đóng cửa sổ ngay tức thì.

### 3. Nhãn hỗ trợ trình đọc màn hình (ARIA)
*   Gán thuộc tính `aria-hidden="true"` vào tất cả các biểu tượng icon trang trí để trình đọc màn hình tự động bỏ qua.
*   Sử dụng lớp `sr-only` (Screen Reader Only) định nghĩa nhãn ẩn cho các hành động nhấp chuột không có chữ hiển thị (ví dụ: các nút chia sẻ biểu tượng mạng xã hội).

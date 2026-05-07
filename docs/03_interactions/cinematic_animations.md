# 🎬 Cinematic Animations - Hoạt ảnh tương tác & Chuyển động Điện ảnh

Tài liệu này đặc tả các bộ hoạt ảnh chuyên sâu sử dụng GSAP Core, ScrollTrigger, và Framer Motion nhằm mang lại trải nghiệm thị giác "Cinematic" cao cấp bậc nhất cho Điện Máy Trần Điền.

## ⌛ 1. Màn hình Chờ Điện ảnh (Cinematic Preloader)

Preloader giải quyết triệt để hiện tượng nháy bố cục chưa định hình (FOUC), che giấu độ trễ nạp ảnh phân giải cao và tạo ấn tượng thị giác mạnh mẽ ngay giây đầu tiên.

### Nguyên lý hoạt động tại `src/components/layout/preloader.tsx`:
1.  **Khóa cuộn (Scroll Lock)**: Khi preloader mount, áp dụng `overflow: hidden !important` vào thẻ `html` và `body` để chống giật nhảy màn hình.
2.  **Định thì GSAP Timeline**:
    *   Hiển thị logo, dải thanh tiến trình và số đếm phần trăm chạy mượt từ `0%` đến `100%` với easing `power1.inOut` trong `1.5` giây.
    *   **Exit Sequence**: Đẩy toàn bộ màn chờ trượt thẳng lên trên (`yPercent: -100`) với gia tốc `power4.inOut` trong `0.6` giây để lộ ra trang chủ cực kỳ nghệ thuật.

---

## 🧭 2. Bộ kích hoạt Cuộn màn hình (GSAP ScrollTrigger)

ScrollTrigger lắng nghe vị trí cuộn màn hình và kích hoạt các hoạt ảnh so le trơn tru mà không làm chặn luồng xử lý chính của trình duyệt (Main thread).

### Áp dụng tại Lưới Tin tức (`news-section.tsx`) & Lưới Dự án (`projects-gallery.tsx`):
*   **Hoạt ảnh xuất hiện so le (Staggered Animation)**:
    ```typescript
    gsap.fromTo(
      ".news-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15, // Khoảng trễ so le giữa mỗi thẻ đúng 150ms
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".news-grid",
          start: "top 90%", // Chạy khi lưới tin tức lọt vào 90% tầm mắt
          toggleActions: "play none none none"
        }
      }
    );
    ```
*   **Dọn dẹp bộ nhớ chống rò rỉ (Garbage Collection)**: Luôn bọc hoạt ảnh trong `gsap.context()` và gọi `ctx.revert()` khi unmount để giải phóng hoàn toàn tài nguyên CPU.

---

## 🎈 3. Nút tiện ích nổi Bung nở Bật nảy (GSAP Support Widget)

Nút hỗ trợ đa kênh nổi (`support-widget.tsx`) ở góc dưới màn hình mang lại tương tác bung mở vô cùng mềm mại mô phỏng vật lý lò xo:
*   **GSAP Back Easing**: Khi click nút chính, menu hỗ trợ trượt lên phía trên và zoom rộng từ `0.8` lên `1` với hàm easing bật nảy `back.out(1.7)` chỉ trong `0.4` giây.
*   **Xoay nút chuyển đổi**: Nút chính tự xoay góc `135 độ` biến dấu Cộng thành dấu Nhân báo hiệu đóng mở trực quan.

---

## 🖼️ 4. Thư viện Phóng to ảnh khóa cuộn khử lệch (Image Lightbox & CLS Prevention)

Khi xem phóng to ảnh công trình thực tế (Lightbox Modal) trong `about-short.tsx`, việc khóa cuộn màn hình thông thường (`overflow: hidden`) làm biến mất thanh cuộn của trình duyệt, gây giật nhảy lệch bố cục toàn trang sang phải khoảng `15px` (Scrollbar Layout Shift).

### Giải pháp tính toán khoảng đệm bù trừ động:
```typescript
// 1. Đo chiều rộng thực tế của thanh cuộn hệ thống
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

// 2. Chèn khoảng đệm lề phải động và khóa cuộn body
document.body.style.paddingRight = `${scrollbarWidth}px`;
document.body.style.overflow = "hidden";

// 3. Khi đóng Lightbox, hoàn trả nguyên trạng
document.body.style.paddingRight = "";
document.body.style.overflow = "";
```
Điều này giải quyết triệt để lỗi CLS, giúp duy trì điểm số Lighthouse CLS = 0 tuyệt đối!

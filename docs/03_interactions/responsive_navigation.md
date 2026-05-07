# 🗺️ Responsive Navigation - Định vị thanh điều hướng & Menu thích ứng

Tài liệu này đặc tả cơ chế định vị điều hướng cao cấp, thiết kế Mega Menu đa lớp, giải pháp ngăn kéo trượt di động (Drawer) và các khối hoạt ảnh trượt dài vô tận.

## 🧭 1. Thanh điều hướng Kính mờ hít đỉnh (Sticky Glassmorphism Navbar)

Navbar được thiết kế với cơ chế hít sát đỉnh thông minh kết hợp hiệu ứng kính mờ (Glassmorphism backdrop blur) giúp giữ vững nhận diện thương hiệu nhưng không lấn chiếm không gian hiển thị:

*   **Hít đỉnh thông minh**: Trình lắng nghe sự kiện cuộn trang `window.scrollY` kiểm tra khoảng cách cuộn. Nếu vượt quá `40px` (khi TopBar ẩn đi), kích hoạt class `fixed top-0 shadow-md backdrop-blur-md bg-white/90` bám sát đỉnh.
*   **Thanh tìm kiếm nở rộng động**: Nhấp vào biểu tượng Search kích hoạt biến `isOpen` chuyển từ `false` sang `true`, tự động dãn rộng chiều dài từ `40px` ra `180px` cực kỳ mượt mà chỉ trong `300ms` kèm gợi ý danh mục sản phẩm trực quan.

---

## ⚡ 2. Menu phân loại đa ngành đa lớp (Hover Intent Mega Menu)

Mega Menu cho phép phân loại đa lĩnh vực (máy lạnh Nagakawa, Panasonic, máy bơm ngưng, quạt chắn gió) gọn gàng:
*   **Hover Intent**: Sử dụng class kiểm soát hover chọn lọc của Tailwind (`group-hover:block group-hover:opacity-100`) kết hợp hoạt ảnh trượt nhẹ từ cấp cha sang cấp con bên phải giúp chống hiện tượng hiển thị đột ngột gây nhức mắt.

---

## 📱 3. Ngăn kéo Di động trượt siêu nhẹ (Mobile Overlay Drawer)

Vì hơn 70% lượng khách hàng duyệt điện máy thông qua smartphone, menu ngăn kéo di động trượt êm mượt bằng một tay là cực kỳ quan trọng:
*   **Hiệu ứng trượt phủ mờ**: Nhấn hamburger icon kích hoạt lớp phủ kính mờ phía sau (`backdrop-blur-sm bg-black/40`) và đẩy bảng menu trượt nhẹ từ góc phải màn hình vào giữa chỉ trong `250ms` bằng CSS Transitions tối ưu GPU.
*   **Khóa cuộn chồng (Scroll Chaining)**: Tự động khóa cuộn màn hình nền phía sau khi Drawer mở để tránh hiện tượng cuộn chồng hai lớp gây khó chịu cho khách hàng.

---

## ⚙️ 4. Băng chuyền Đối tác Vô hạn (GPU-Accelerated Brand Marquee)

Khối logo đối tác (`brand-marquee.tsx`) chạy liên tục vô hạn giúp gia tăng độ uy tín thương hiệu mà không làm chậm máy khách:
*   **CSS Keyframes thuần**: Sử dụng hoạt ảnh tịnh tiến `translateX` từ `0%` sang `-50%` liên tục vô hạn trực tiếp trên luồng Compository của GPU, mang lại chuyển động mượt mà 60fps tuyệt đối kể cả trên các dòng điện thoại đời cũ.
*   **Tương tác Gray-scale**: Các logo mặc định lọc màu xám mờ (`grayscale opacity-60`). Di chuột qua chuyển sang sáng màu rực rỡ chuẩn thương hiệu (`grayscale-0 opacity-100`) vô cùng sinh động.

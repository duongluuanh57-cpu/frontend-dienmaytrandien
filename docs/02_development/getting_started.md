# 🚀 Getting Started - Hướng dẫn Cài đặt & Phát triển Frontend

Tài liệu này hướng dẫn chi tiết cách cài đặt môi trường phát triển cục bộ (Local Development), cấu hình và chạy dự án Frontend Điện Máy Trần Điền thành công.

## 📋 Yêu cầu hệ thống trước khi cài đặt
*   **Runtime**: [Node.js](https://nodejs.org/) (v18 trở lên) hoặc [Bun](https://bun.sh/) (Tối ưu hiệu năng nén và cài đặt).
*   **Hệ điều hành**: Windows, macOS, hoặc Linux.

---

## 🛠️ Quy trình cài đặt 4 bước nhanh gọn

### Bước 1: Clone dự án và di chuyển vào thư mục Frontend
```bash
cd Frontend
```

### Bước 2: Cài đặt các thư viện phụ thuộc (Dependencies)
Sử dụng npm:
```bash
npm install
```
Hoặc sử dụng Bun (tải siêu tốc):
```bash
bun install
```

### Bước 3: Cấu hình biến môi trường
Tạo tệp `.env.local` tại thư mục gốc của Frontend (`Frontend/.env.local`) để định cấu hình URL gọi API của Backend:
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

> [!NOTE]
> Khi chạy trên môi trường phát triển cục bộ, nếu chưa chạy server Backend, các Client Component có cơ chế bắt lỗi an toàn (catch errors) và hiển thị thông báo thân thiện hoặc sử dụng dữ liệu tĩnh cục bộ để không làm đứt gãy giao diện trang web.

### Bước 4: Khởi động máy chủ phát triển (Local Dev Server)
Khởi chạy dự án Next.js 15 ở chế độ phát triển:
```bash
npm run dev
```
Trang web sẽ lập tức chạy thành công tại địa chỉ: `http://localhost:3000` 🚀.

---

## 🏗️ Quy trình đóng gói và biên dịch (Production Build)

Trước khi đẩy ứng dụng lên máy chủ Production, hãy chạy lệnh sau để kiểm tra lỗi cú pháp TypeScript và biên dịch tối ưu hóa tĩnh 100% trang web:

```bash
npm run build
```

Sau khi hoàn tất, bạn có thể chạy thử bản build tĩnh ngay dưới local bằng lệnh:
```bash
npm run start
```
Bản build tĩnh của Next.js 15 sẽ tự động nén gộp Javascript, tối ưu hóa kích thước bundle và phân phối mượt mà nhất.

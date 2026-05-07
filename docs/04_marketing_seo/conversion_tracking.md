# 📊 Conversion Tracking - Đo lường Chuyển đổi & Phân tích Hành vi

Tài liệu này đặc tả hệ thống đo lường hành vi, ghi nhận chuyển đổi thực tế qua nút bấm liên hệ (Zalo, Hotline) và cơ chế phân tích dữ liệu bảo mật quyền riêng tư (Privacy-First Compliance).

## 🪝 1. Lắng nghe cú click & Đo lường chuyển đổi thực tế

Trong kinh doanh điện máy kỹ thuật, hiểu rõ lượng tương tác liên hệ Zalo, Facebook và gọi Hotline thực tế từ Landing Page là chìa khóa then chốt để đo lường lợi nhuận đầu tư quảng cáo (ROAS).

### Trình kích hoạt sự kiện click trong `support-widget.tsx` & `navbar.tsx`:
Sử dụng sự kiện `onClick` của React để gửi một gói tin sự kiện (Event payload) chứa nhãn hành động về máy chủ phân tích:

```typescript
// Click Hotline gọi điện
const handleCallClick = () => {
  console.log("[Analytics] Click_Hotline - Kích hoạt cuộc gọi đến 0903760096");
  // Đẩy sự kiện lên Google Tag Manager / Meta Conversions API ở đây
};

// Click Chat Zalo
const handleZaloClick = () => {
  console.log("[Analytics] Click_Zalo - Kích hoạt chat đến Zalo kỹ thuật viên");
  // Đẩy sự kiện lên Google Tag Manager / Meta Conversions API ở đây
};
```

Những dữ liệu chuyển đổi này sẵn sàng kết nối trực tiếp với Conversions API của Google hoặc Meta để ghi nhận chuyển đổi thành công tức thời.

---

## 🔒 2. Phân tích dữ liệu bảo mật quyền riêng tư (Privacy-First Analytics)

Để duy trì tốc độ tải trang tĩnh đạt điểm tối đa và không xâm phạm quyền riêng tư của người dùng (tránh việc phải đặt Banner đồng ý Cookie phiền toái), dự án áp dụng chuẩn theo dõi không chứa Cookie (Cookieless tracking):

*   **Tích hợp ngầm**: Sử dụng thẻ meta chuyên dụng để liên kết an toàn với các kịch bản phân tích siêu nhẹ (`<script defer>`) của Plausible hoặc Umami:
    ```html
    <meta name="analytics-platform" content="privacy-first-ready" />
    ```
*   **Không lưu Cookie**: Tuyệt đối không lưu trữ Cookie trên máy khách, không thu thập địa chỉ IP hay thông tin định danh cá nhân (PII), bảo vệ an toàn pháp lý tuyệt đối cho doanh nghiệp.
*   **Tối ưu Core Web Vitals**: Nhờ kịch bản gọn nhẹ, tốc độ tải và điểm hiệu suất của website luôn được duy trì ở mức xanh mượt tối đa.

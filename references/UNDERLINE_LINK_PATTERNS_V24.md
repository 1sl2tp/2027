# Các mẫu gạch chân và liên kết · UI 2027 V24

## Bằng chứng và phạm vi
- Ảnh người dùng gửi ngày 22/11/2026: các văn bản mở nguồn, tài liệu và PR hiển thị dưới dạng liên kết có gạch dưới nhẹ, trông như nét chấm. Đây là **quan sát từ ảnh**; không thể suy ra chính xác `text-decoration-style`, `border-bottom` hoặc pixel spacing nếu thiếu CSS thực tế của lớp giao diện đó.
- [ChatGPT.html trên Drive](https://drive.google.com/file/d/14RXspORGw1X8MJV3nxA850ahdDAMa9nW/view): có token cỡ chữ, nhưng bản HTML lưu không chứa style `text-decoration-style: dotted` của các liên kết trong ảnh này. Không được gắn nhãn "đã xác nhận từ ChatGPT source" cho mẫu nét chấm.
- [OpenAI Apps SDK UI / TextLink.tsx](https://github.com/openai/apps-sdk-ui/blob/main/src/components/TextLink/TextLink.tsx) và [TextLink.module.css](https://github.com/openai/apps-sdk-ui/blob/main/src/components/TextLink/TextLink.module.css), giấy phép MIT. Trong source chính thức: `underline` mặc định bật (trừ `primary`), `text-decoration: underline`, `text-decoration-color: color-mix(in oklab, currentcolor 70%, transparent)`, `text-underline-offset: var(--link-underline-decoration-offset)`, có trạng thái hover và focus.

## Mẫu được bổ sung vào thư viện
Mục 3 `#simpleUnderline` gồm 12 mẫu lựa chọn trực tiếp:
1. Nét liền.
2. Nét liền nhạt 70% — dựa theo Apps SDK UI.
3. Nét chấm — tái dựng dựa trên **ảnh người dùng**, không phải source xác nhận.
4. Nét đứt.
5. Hai nét.
6. Lượn sóng.
7. Cách chữ 5px.
8. Nét dày 2px.
9. Liên kết nét chấm + mũi tên đi ra ngoài — theo bố cục ảnh.
10. Liên kết gạch chân liền.
11. Màu nhấn không gạch chân (primary).
12. Chỉ gạch khi rê, focus bàn phím, hoặc được chọn trên điện thoại.

Mục 3 sử dụng `span` để xem thử trong nút chọn mẫu, không tạo liên kết điều hướng thật. Không chèn font hoặc CSS độc quyền, không thay đổi trang CHAT/TAPHOA. Cơ chế GitHub Pages `web/dist-v24` làm mới URL cho mọi module liên quan để tránh cache JS cũ trên điện thoại.

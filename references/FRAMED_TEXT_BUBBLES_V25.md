# UI 2027 V25 — Khung viền và bong bóng

## Nguồn đã đọc trực tiếp

**OpenAI Apps SDK UI (MIT)** — thư viện thành phần cho ứng dụng trong ChatGPT; không phải toàn bộ mã nguồn nội bộ chatgpt.com.

- [Badge](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Badge/index.tsx) và [Badge CSS](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Badge/Badge.module.css): `variant=soft|solid|outline`, `pill`, `size=sm|md|lg` (18/22/24px), ngữ nghĩa màu secondary/success/warning/danger/info/discovery. Mục 4 tái dựng các kiểu từ FRAME-06 đến FRAME-10.
- [Alert](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Alert/Alert.module.css): `soft|solid|outline`, tiêu đề, mô tả, viền nhẹ và bo góc. Mục 4 tái dựng FRAME-11 đến FRAME-14.
- [CodeBlock CSS](https://github.com/openai/apps-sdk-ui/blob/main/src/components/CodeBlock/CodeBlock.module.css): viền 1px, bo góc `--radius-md`, nền riêng và mã monospace. Mục 4 tái dựng FRAME-15.

**assistant-ui (MIT; dự án cộng đồng, không phải mã ChatGPT nội bộ):**
- [Ví dụ ChatGPT](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/components/pages/examples/chatgpt.tsx): tin người gửi nền tối bo khoảng 22px, tối đa 70% chiều rộng (trong mẫu source), padding ngang 16px, dọc 10px; tin trợ lý ở dạng chữ trên nền trang thay vì bong bóng lớn. 2027 tham khảo các vai trò cho FRAME-17 và FRAME-21.
- Bong bóng nền sáng, có viền, nhận/gửi, 2 dòng, 4 dòng, có giờ (FRAME-18–20, FRAME-22–24) là **biến thể thiết kế 2027**, không có xác nhận tương ứng chính xác trong source Apps SDK UI.

## 24 mẫu trong thư viện
- FRAME-01–05: khung viền vuông/bo góc/nét đứt/nét chấm/viền đậm — mẫu 2027.
- FRAME-06–10: nhãn `soft`, `outline`, `solid`, `pill`, trạng thái thành công — dựa trên API Badge.
- FRAME-11–14: thông báo `soft`, `outline`, `solid`, tiêu đề+mô tả — dựa trên Alert.
- FRAME-15: ô mã có viền — dựa trên CodeBlock.
- FRAME-16: ô trích dẫn có viền trái — mẫu 2027.
- FRAME-17–24: bong bóng gửi/nhận, nền tối/sáng, có viền/không, 2–4 dòng, giờ — nguồn phân biệt rõ dưới mỗi mẫu.

## Nguyên tắc
Thư viện là bản xem trước **cục bộ**, chọn bằng cách chạm toàn bộ dòng. Không gửi tin thật, không tạo giao dịch, không sửa CHAT/TAPHOA. Không sao chép CSS nguyên xi của OpenAI. Tải toàn bộ ES module từ đường dẫn `web/dist-v25/` để tránh giữ mã cũ trong cache.

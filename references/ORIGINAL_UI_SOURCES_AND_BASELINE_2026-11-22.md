# Mốc lưu gốc · UI 2027 · 22/11/2026

## 1. Mốc gốc của dự án 2027 (trước khi tạo base V09)

- **Nhánh lưu nguyên trạng:** [`archive/ui-v08-original-before-foundation-20261122`](https://github.com/1sl2tp/2027/tree/archive/ui-v08-original-before-foundation-20261122).
- **Commit được chốt:** [`7e10663b72e85c63621462048a262897f36c3182`](https://github.com/1sl2tp/2027/commit/7e10663b72e85c63621462048a262897f36c3182).
- **Nội dung bảo tồn:** giao diện thư viện V08, ba luồng thử V04, một `web/styles.css`, tài liệu RULE 01–04 và bảng đối chiếu nguồn; nhánh này **không được dùng để chỉnh sửa các vòng mới**.
- Nhánh Git không tự động khóa quyền ghi: mốc **commit SHA** mới là định danh chính xác của bản gốc. Dùng mã commit để phục hồi; không ghi đè vào đó.

## 2. Nguồn gốc ChatGPT, Facebook và Gemini trên Drive

Thư mục được người dùng cung cấp: [Google Drive – UI 2027](https://drive.google.com/drive/folders/1uPNFbeA_lbJjIEZW0O__g4lTWWXJEVSj?hl=vi).

| Nguồn lưu | Đường dẫn nguyên bản trong Drive | Phạm vi |
|---|---|---|
| ChatGPT | [ChatGPT.html](https://drive.google.com/file/d/14RXspORGw1X8MJV3nxA850ahdDAMa9nW/view) | Save Page có preset Codex, không mặc nhiên toàn bộ giao diện ChatGPT |
| Facebook | [(20+) Facebook.html](https://drive.google.com/file/d/1A2A86yBaz42Gv1fZP7b5aHmObIER1qXe/view) | Save Page Facebook Reel, có nhiều token Facebook/Messenger |
| Gemini | [Google Gemini.html](https://drive.google.com/file/d/1KSPGdSqEcxFcyR_N6fdVjoGxyhhxKwJV/view) | Save Page Gemini, gồm CSS nhiều mode và viewport |
| ChatGPT cũ | [UI_LIBRARY_CHATGPT_REFERENCE_2026-09-07](https://drive.google.com/drive/folders/10_HovvaVcwve6BjsbwJHFpZr_1SKea3T) | Thư viện tham chiếu cũ để đối chiếu phiên bản |

**Cách lưu nguyên bản:** giữ tất cả tệp nguồn trong Drive như hiện tại, không ghi đè, đổi tên, di chuyển hoặc sửa file. Tài liệu repo chỉ lưu link và kết luận đối chiếu. Không nhân bản CSS/HTML tài khoản hãng vào repo để tránh mang theo mã nguồn có bản quyền, nội dung tài khoản hoặc dữ liệu phiên truy cập.

## 3. Mẫu gốc 2027 (mới tạo)

- **Trang hoạt động:** [`base.html`](https://1sl2tp.github.io/2027/base.html) (chỉ hiện sau khi CI và Pages deploy thành công).
- **Thiết kế:** hệ gốc 2027 là mặc định; có lựa chọn so sánh ba hướng ChatGPT/Facebook/Gemini. Bốn lựa chọn dùng **một DOM, một TS, một CSS**; chỉ thay token.
- **File sở hữu giao diện:** `base.html` + `web/src/base.ts` + các class `.base-*` trong `web/styles.css`.
- **Mục đích:** chuẩn hóa rail, sidebar, tiêu đề, nội dung, bảng, danh sách, số tiền, nút, input, ô nhập chat, menu và popup; thử bản rộng/mobile.
- **Mẫu không có backend:** tin nhắn, sản phẩm và số lượng là dữ liệu mô phỏng. Không gửi chat, không thu tiền, không tạo đơn hay cập nhật dữ liệu khách thật.
- **Nguồn nghiên cứu:** [bảng đối chiếu ba hãng](./CHATGPT_FACEBOOK_GEMINI_UI_COMPARISON_2026-11-22.md), [RULE 04](../RULES.md). Mẫu này do 2027 tự xây dựng chứ không phải bản clone giao diện chính thức.

## 4. Phục hồi/đối chiếu

Đối chiếu thay đổi V09 với mốc `7e10663b72e85c63621462048a262897f36c3182`. Nếu mẫu mới không đạt yêu cầu, **không xóa bản gốc**: sửa hoặc revert V09 trên nhánh mới, giữ nguyên archive và đường dẫn Drive. Không triển khai đến CHAT/TAPHOA khi người dùng chưa yêu cầu.

# Đối chiếu typography ChatGPT, OpenAI và nguồn GitHub · 22/11/2026

## Nguồn 1 — Bản lưu thực tế trên Google Drive (không phải mã nguồn mở)
- [ChatGPT.html](https://drive.google.com/file/d/14RXspORGw1X8MJV3nxA850ahdDAMa9nW/view).
- Đọc từ style token: `--font-ui-size:16px`, `--font-code-size:12px`, `--text-xs:12px`, `--text-sm:14px`, `--text-base:16px`, `--text-lg:18px`, `--text-xl:20px`, `--text-2xl:24px`, `--text-3xl:30px`, `--text-4xl:36px`, `--text-heading-app:28px`, `--text-heading-sm:18px`, `--text-heading-md:20px`, `--text-heading-lg:24px`.
- Quan sát được role: tiêu đề sidebar/chat, menu, nội dung, chữ đậm/thường, trạng thái nhạt, nút, liên kết, nội dung ô gõ. Bản lưu HTML **không chứa đầy đủ mã nguồn TypeScript/React nội bộ của ChatGPT**; thông số không có trong DOM hoặc CSS được đánh dấu là ví dụ tham khảo.

## Nguồn 2 — UI công khai của OpenAI (khác với nguồn chatgpt.com)
- [openai/apps-sdk-ui — Typography](https://github.com/openai/apps-sdk-ui/blob/main/src/Typography.mdx) — MIT.
- [Font token CSS](https://github.com/openai/apps-sdk-ui/blob/main/src/styles/variables-semantic.css).
- Hệ chữ: sans cho giao diện, monospace cho code; weight 400/500/600/700.
- Cỡ chữ body: `text-3xs=8/12`, `2xs=10/14`, `xs=12/18`, `sm=14/20`, `md=16/24`, `lg=18/29` (font-size/line-height, đơn vị px).
- Heading: `xs=16/24`, `sm=18/26`, `md=20/26`, `lg=24/28`, `xl=32/38`, `2xl=36/42`, `3xl=48/48`, `4xl=60/60`, `5xl=72/72`; weight 600.
- Đây là thư viện dành cho Apps SDK, **không khẳng định chính xác mỗi heading xuất hiện trong ứng dụng ChatGPT hiện tại**.

## Nguồn 3 — Mã cộng đồng
- [assistant-ui/assistant-ui — ChatGPT example](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/examples/chatgpt.mdx) — MIT; minh họa cấu trúc hội thoại, header/composer, bubble, thanh công cụ và theme.
- [bg1870/chatgpt-ui-skill](https://github.com/bg1870/chatgpt-ui-skill) — bộ hướng dẫn UI iOS đo từ ảnh; nhiều giá trị suy luận, kiểm tra giấy phép trước khi tái sử dụng.
- Các nguồn cộng đồng **không phải mã ChatGPT chính thức**. Không sao chép nguyên biểu tượng độc quyền, CSS minified hoặc dữ liệu người dùng.

## Thư viện 2027 V23: cách áp dụng
- **Mục 1:** 10 dòng mức chữ được kiểm từ file ChatGPT lưu trên Drive. Không giả vờ rằng Arial/Georgia là font riêng của ChatGPT.
- **Mục 2:** 45 mẫu, mở rộng từ 31: 1–4 dòng và 1–4 dòng bị giới hạn; heading/body; medium, semibold, bold; nghiêng, underline, strike; link, code, quote, list, table, tiền, giờ, trạng thái, sidebar, composer; các cỡ `8/10px`, heading `32/36px` được ghi rõ **nguồn Apps SDK**.
- Phân loại rõ: **Token xác minh từ nguồn** vs **mẫu 2027 tự dựng**. Chỉ dùng một thiết kế đơn sắc, chọn mẫu bằng cách chạm cả dòng.
- **Lỗi ảnh V22:** HTML mới có thể chứa mô tả 31 mẫu, nhưng ESM `simple-gallery.js` vẫn lấy từ URL cũ (`web/dist/simple-gallery.js`) dù URL `app.js?v=...` đã đổi. Vì vậy thấy danh sách Arial, Georgia cũ. Bản sửa đóng gói **toàn bộ** dependency vào `web/dist-v23/` để mỗi module có URL mới. Đây là chẩn đoán dựa trên cấu trúc module và ảnh, không phải thông số cache được đo trực tiếp từ trình duyệt.
- Chỉ thay đổi thư viện 2027; không gửi tin nhắn hay dữ liệu thật, không sửa CHAT/TAPHOA.

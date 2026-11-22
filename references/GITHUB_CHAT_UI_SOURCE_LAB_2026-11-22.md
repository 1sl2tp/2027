# SOURCE-V01: GitHub nguồn mở và phòng thử giao diện chat (22/11/2026)

Trang thử: [github-sources.html](../github-sources.html). Trang chính có liên kết tới phòng thử, dùng chung stylesheet web/styles.css và không cài thêm package runtime.

## 8 nguồn đã kiểm tra

| Nguồn | License | Công dụng | Quyết định |
| --- | --- | --- | --- |
| [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui) | MIT | Input, textarea, button, token | Tham khảo hợp đồng UI, không phải CSS của ChatGPT nội bộ |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | MIT | Thread, composer, message actions | Chưa nhập React vào bản 2027 hiện tại |
| [Vercel AI Elements](https://github.com/vercel/ai-elements) | Apache-2.0 | Message, attachment, reasoning | Tham khảo cấu trúc, không kéo cả AI SDK |
| [Radix UI](https://github.com/radix-ui/primitives) | MIT | Focus, dialog, menu | Học accessibility, dùng dialog native ở phòng thử |
| [Floating UI](https://github.com/floating-ui/floating-ui) | MIT | Định vị menu tránh tràn cạnh | Đánh giá nếu popup thực có lỗi |
| [TanStack Virtual](https://github.com/TanStack/virtual) | MIT | Danh sách rất dài | Chỉ cài nếu có số đo nghẽn render |
| [Lucide](https://github.com/lucide-icons/lucide) | ISC | Icon SVG có hình học nhất quán | Tái dựng icon cần dùng trong web/icons.svg |
| [react-textarea-autosize](https://github.com/Andarist/react-textarea-autosize) | MIT (metadata GitHub) | Ô gõ tự tăng cao | Chưa cài; chỉ học cơ chế khi cần |

Giấy phép MIT/ISC/Apache-2.0 ở trên được đối chiếu qua LICENSE hoặc metadata repo; không sao chép code nào từ các thư viện vào 2027 trong vòng này.

## Thành phần vừa thêm vào phòng thử

- Composer: một viền ngoài, textarea không có viền con, cỡ chữ 16px, tự tăng cao tối đa 144px; chỉ ghi nội dung vào màn thử, không gửi.
- Khung mobile/rộng, bàn phím giả lập; thread là scroll owner. Đây là mô phỏng, chưa chứng minh hành vi Safari/PWA khi bàn phím thật xuất hiện.
- Danh bạ 1–4 dòng với icon/avatar, chữ, metadata có cột riêng, tên dài rút gọn.
- Bảng STT/tên/SL/đơn giá/thành tiền, căn số giữa và tiền phải, bảng cuộn riêng trên màn nhỏ.
- Media 1–4 ô, popup native, menu thử, trạng thái tin.
- CSS có tiền tố source- trong web/styles.css; không thay CSS/handler của CHAT và TAPHOA.

## Điều kiện trước khi áp dụng vào ứng dụng thật

1. Kiểm tra kích cỡ 320/360/390px và màn rộng, cả nội dung 1–4 dòng, chữ rất dài, giá trị tiền.
2. Kiểm tra bàn phím thật, safe-area, cuộn không nhảy, ô nhập không rung trên iOS/Android Safari/Chrome/PWA/APK.
3. Thử ảnh thật: EXIF, zoom, media 1–4, lỗi mạng, preview chờ gửi.
4. Menu/popup: Escape, focus, TalkBack/VoiceOver, tràn ở bốn cạnh, cấp 1–4.
5. Đo hiệu năng rồi mới thêm virtual list hoặc React dependency.
6. Chưa chỉnh cơ sở dữ liệu production, chưa gửi tin hoặc tạo đơn.

## Nguồn Drive phân biệt cấp chứng cứ

- [ChatGPT.html lưu 22/11/2026](https://drive.google.com/file/d/14RXspORGw1X8MJV3nxA850ahdDAMa9nW/view) có appearance preset Codex, không đại diện cho mọi màn chat.
- [UI_LIBRARY_FACEBOOK_GEMINI_CHATGPT_V1_1.html](https://drive.google.com/file/d/13gIMajcCGlIugcBdnJKNHu0tH7HaXjhs/view) là tài liệu do người dùng lưu để so sánh ba hệ.
- [Audit ChatGPT](./CHATGPT_UI_SOURCE_AUDIT_2026-11-22.md) có phân biệt giá trị CSS đã trích, quan sát ảnh và phương án thiết kế.

SOURCE-V01 chỉ là phòng thí nghiệm thành phần. Không xem như nghiệm thu thiết bị thật hoặc cài đặt thư viện bên thứ ba.

# V43 — Nguồn GitHub icon/motion và quyết định triển khai

Ngày: 22/11/2026. Phạm vi: **1sl2tp/2027 Web demo**; không sửa CHAT hoặc TAPHOA production.

## Nguồn đã kiểm tra
- [shadcn/ui — chat rules](https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/rules/chat.md): `MessageScroller` sở hữu scroll, `MessageScrollerButton` jump to latest, `scrollAnchor` trên item; message, bubble, attachment là con của thread. Đây là pattern, không đưa thư viện React vào project TypeScript DOM.
- [shadcn/ui — design rules](https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/SKILL.md): icon trong button theo slot; kích thước icon do component sở hữu, không dùng class rời theo từng icon.
- [assistant-ui — ScrollAnchor](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/scroll-anchor.mdx): mũi tên xuống có thể làm jump, nhưng giữ tương thích viewport V42 hiện tại.
- [Lucide](https://github.com/lucide-icons/lucide): kho SVG icon mã nguồn mở, giấy phép ISC, tham khảo hệ nét/nhóm/icon naming. V43 dùng **tự định nghĩa SVG đơn giản trong `web/icons.svg`** theo hệ 2027, không sao chép toàn bộ pack hay cài React.
- [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui): tài liệu mở có `Icon`, `Indicator`, `Animate`, `AnimateLayout`, `Button`, `Textarea`; đây là UI cho Apps SDK, **không phải mã CSS nội bộ ChatGPT**. Chỉ mượn nguyên lý phân loại transition, loading, focus và geometry.

## Đã làm
1. Giữ `web/icons.svg` là một registry canonical. V43 thêm 18 SVG glyph còn thiếu; tổng 69, xem nhóm ở mục 6.2. Nhấn một icon sẽ sao chép mã `ui-icon-*`.
2. `CHAT-MESSAGE-LIST` sở hữu `THREAD-JUMP-TO-LATEST` là một `ui-button` tròn, icon `arrow-down` và badge `THREAD-UNSEEN-COUNT`. Khi rời cuối sẽ hiện dù không có tin mới; badge chỉ có khi có dữ liệu chưa xem.
3. Mục 7.2 có 7 mẫu motion: fade, rise, scale, shimmer, dots, spin, pulse; tất cả là effect của owner hiện hữu. Có replay, hỗ trợ `prefers-reduced-motion`, không cài motion framework.
4. Chỉ sử dụng dữ liệu mẫu. CI/Pages và thiết bị thật là hai cấp bằng chứng khác nhau; **không tuyên bố E4/E5 đã đạt**.

## Điều không làm
- Không nhập toàn bộ Lucide/React/Apps SDK, không sao chép CSS ChatGPT.
- Không thay scroll engine V42 hoặc triển khai sang app CHAT thật. Không tự phát tin hoặc giao dịch.
- Không áp dụng animation vô hạn cho mọi nút: chỉ dùng ở trạng thái loading/processing và phòng thử.

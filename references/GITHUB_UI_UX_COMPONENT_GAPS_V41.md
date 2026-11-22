# V41 — Kiểm kê GitHub nâng cao: bổ sung con cho đúng cha, không dựng UI độc lập

**Kiểm tra:** 22/11/2026 (VN). **Trạng thái:** khảo sát nguồn & thiết kế contract, **chưa triển khai các feature bên dưới**. UI trang chính vẫn là `2027-UI-V40` (8 mục đơn giản). **Owner rule:** `RULES.md` RULE 12, không tạo design system thứ hai.

## 1. Kết quả: có thư viện/mẫu mới và mẫu trước đây chưa khai thác sâu

| Nguồn đã đọc | Khả năng có ích trong chat | Điều kiện bản quyền & kỹ thuật |
| --- | --- | --- |
| [TanStack Virtual](https://github.com/TanStack/virtual), [Chat guide](https://tanstack.com/virtual/latest/docs/chat), [React chat example](https://tanstack.com/virtual/latest/docs/framework/react/examples/chat) | Virtual list, `anchorTo:'end'`, `followOnAppend`, `scrollEndThreshold`, giữ neo khi prepend tin cũ bằng **message ID** | MIT; headless JS/TS + adapters, **phù hợp để nghiên cứu** dù 2027 không dùng React. Đã biết nguồn V33, phần Chat Guide là phát hiện bổ sung |
| [React Virtuoso](https://github.com/petyosi/react-virtuoso), [Message List](https://virtuoso.dev/message-list/) | Item height động, cuộn lịch sử, virtual message list, header/footer, sticky | **Phân biệt:** `react-virtuoso` core giới thiệu MIT trong README; riêng **`@virtuoso.dev/message-list` là gói thương mại cần license production** ([nguồn chính thức](https://virtuoso.dev/message-list/licensing/)). KHÔNG tự đưa package đó vào 2027/CHAT |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui): [MessagePair](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/message-pair.mdx), [MessageActions](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/message-actions.mdx) | `Thread.Messages → Message.Root → Parts + ActionBar`; một action bar thuộc **đúng message**; Copy có trạng thái copied, regenerate khi khả dụng | MIT; đã nghiên cứu Composer V40, đây là phần mở rộng **Message**, không tạo nút mới |
| [assistant-ui DraftRestore](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/draft-restore.mdx) | Tin đang gõ dở được khôi phục hoặc xóa **đúng thread** sau khi chuyển hội thoại | MIT; **mẫu**, bản thân app quản lý state/lưu trữ. Không mặc định đưa nháp nhạy cảm lên cloud/localStorage khi chưa xác định chính sách |
| [assistant-ui ConversationSearch](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/conversation-search.mdx) | Tìm trong một Thread, highlight hit, Next/Previous và jump đúng `messageId` | MIT; nguồn mô tả **không có search primitive tự động**, đây là composition do ứng dụng làm từ message parts |
| [assistant-ui ImageGallery](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/image-gallery.mdx) | 1–n ảnh trong một message/tool output, shared lightbox, overflow `+N` | MIT; chỉ tham khảo source và hợp đồng cha-con, không dùng lightbox độc lập cho từng ảnh |
| [Radix UI Primitives](https://github.com/radix-ui/primitives), [Popover source](https://github.com/radix-ui/primitives/blob/main/packages/react/popover/src/popover.tsx), [Dialog source](https://github.com/radix-ui/primitives/blob/main/packages/react/dialog/src/dialog.tsx) | Trigger / Portal / Overlay / Content / Close, FocusScope, DismissableLayer, return-focus; popup đặt dưới đúng cha context | MIT; React primitives, dùng làm tiêu chuẩn hành vi. Repo 2027 có native dialog, chưa tự nhận là tương đương đầy đủ |
| [Floating UI](https://github.com/floating-ui/floating-ui) | Định vị popup theo anchor, tránh tràn viewport/keyboard/collision | MIT; **positioning utility**, không phải một Button/Popover hoàn chỉnh; đã biết nguồn V33, đây là kiểm sâu về owner vị trí |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels), [Group/Panel docs](https://github.com/bvaughn/react-resizable-panels/blob/main/README.md) | Workspace 2–3 vùng, `Group → Panel + Separator`, min/max/collapse, drag + keyboard, kích thước lưu theo group | MIT; React, **phù hợp tham khảo** 3 vùng danh bạ/chat/tiện ích. Panel phải nằm dưới Group chứ không là nút tự do |
| [cmdk](https://github.com/dip/cmdk), [README](https://github.com/dip/cmdk/blob/main/README.md) | Menu tìm lệnh `Command → Input + List → Group → Item`; empty/loading, arrow key, keyboard | MIT; chỉ hợp lý nếu Composer thực sự có lệnh `/` hoặc app có tìm hành động. Không tạo menu chỉ để trưng bày |
| [Motion](https://github.com/motiondivision/motion) / [AutoAnimate](https://github.com/formkit/auto-animate) | Chuyển trạng thái list, drawer, attachment (add/remove) | MIT; **ưu tiên CSS animation/R11 hiện có**, tôn trọng reduced-motion; không thêm thư viện nặng hay animate toàn bộ streaming chỉ vì có nguồn |

**Nguồn không khuyến nghị nhập vào:** [Vaul](https://github.com/emilkowalski/vaul) (README công bố **unmaintained**). Có thể tham khảo mô hình drawer nhưng không xem đây là lựa chọn dependency mặc định.

## 2. Gap matrix — R12 phải tìm đúng cha, cardinality và CSS owner

**Quy ước lồng nhau:** `CHAT-MESSAGE → CONTENT-PARTS → TABLE-PART → DATA-TABLE → TABLE-COLUMN`: bảng nằm trong tin vẫn dùng **một primitive DATA-TABLE gốc**, không tạo bảng chat riêng. Mẫu khảo sát này **không gửi tin thật**, không gọi backend hay cập nhật dữ liệu người dùng.

**Ký hiệu:** `Có` = bộ mẫu/logic nền đã được thấy trong source 2027; `Một phần` = mới mô phỏng hoặc thiếu vòng đời; `Chưa có` = chưa thấy mẫu chức năng tương ứng trong các file đã xem, không khẳng định mọi file toàn repo đều thiếu.

| Ưu tiên | Thành phần chính | Cây cha → con dự kiến | Hiện trạng 2027 đã kiểm tra | Owner cần giữ | Tiêu chí nghiệm thu giai đoạn sau |
| --- | --- | --- | --- | --- | --- |
| **P0** | Thread dài / tải tin cũ | `CHAT-THREAD → CHAT-MESSAGE-LIST → MESSAGE [0..n]`; Virtualizer là **hành vi của list**, không phải Message | **Một phần:** `web/src/scroll-anchor.ts` có append, pinned, jump; chưa có virtualizer hay bù offset khi prepend nhiều tin | `thread layout` nắm scroll; `Message` nắm content | ID cố định, prepend 100 tin không nhảy, khi đọc tin cũ không auto kéo cuối; kiểm height ảnh/Markdown thay đổi |
| **P0** | Một tin có nhiều nội dung | `CHAT-MESSAGE → CONTENT-PARTS [0..n] → TEXT/IMAGE/TABLE/FILE/CODE`; `MESSAGE-ACTIONS [0..1]` là **con message** | **Một phần:** `ui-patterns.ts` có CHAT-02 tin nhắn + action, CHAT-04 preview ảnh; R12 mới khai báo text/actions, chưa phân loại nhiều loại part | message schema + `ui-action-strip` và `ds-table` dùng lại | Text/ảnh/bảng cùng một message, action copy/forward đúng message ID; nhiều ảnh không tràn |
| **P0** | Composer nhiều trạng thái | `CHAT-COMPOSER → ATTACHMENTS + INPUT + TOOLBAR`; toolbar nút gửi/mic/attach; draft/queue là **state thuộc Composer/Thread** | **Một phần:** V40 đã sửa FIELD-11 và send/stop mẫu; `composer-gallery.ts` có preview ảnh, chưa có per-thread draft restore | `ds-composer`, `ui-button`, `web/icons.svg` | Draft không lẫn giữa khách A/B, stop có action thật, reset ảnh đúng nguồn; không lưu bí mật mặc định |
| **P1** | Tìm trong hội thoại | `THREAD → SEARCH-PANEL → SEARCH-INPUT + HIT-LIST [0..n] + NAV-ACTIONS` | **Một phần:** đang có input tìm cơ bản; chưa có hit markers theo message ID trong nguồn mẫu đã kiểm | `ds-field` cho input; `Thread` sở hữu search state/index | Tìm không di chuyển sai thread, next/prev, mark đúng vị trí; keyboard không che kết quả |
| **P1** | Popover/menu/dialog | `OVERLAY-ROOT → TRIGGER + PORTAL/CONTENT + ACTIONS` | **Một phần:** `index.html` có native dialog và menu; chưa có contract cho focus restore, nested overlay, viewport collision | `overlay manager` cho portal/focus, `ui-button` cho action, positioning theo anchor | Tab/Escape/focus restore đúng, menu không nằm dưới keyboard; không 2 overlay tranh nhau |
| **P1** | 3 vùng desktop / 1 vùng mobile | `WORKSPACE → PANEL-GROUP → CONTACTS-PANEL + THREAD-PANEL + UTILITY-PANEL`; Separator thuộc group | **Một phần:** bản shell có nhiều vùng, chưa thấy resize contract keyboard/min/max như source panel library | `workspace layout`, mỗi panel sở hữu nội dung, **chỉ một owner scroll trên mỗi panel** | Co kéo không méo input, mobile ưu tiên thread khi keyboard mở, safe-area không bị lẹm |
| **P2** | Ảnh tin nhắn | `MESSAGE → MEDIA-GRID [0..1] → TILE [1..n] → LIGHTBOX (shared overlay)` | **Một phần:** có ảnh chờ gửi và demo media, chưa thấy một shared lightbox theo message/album trong code đã xem | message grid/layout, overlay manager cho viewer | 1/2/3/4 ảnh cân đối, xoay/zoom, đóng về đúng vị trí và focus |
| **P2** | Menu lệnh khi gõ | `COMPOSER → COMMAND-POPOVER → INPUT + LIST → GROUP → ITEM` | **Chưa thấy mẫu slash command hoàn chỉnh** | Composer sở hữu lệnh, overlay manager sở hữu popover, Button primitive không tự thành menu | Chỉ làm nếu có lệnh thật; gợi ý ở trên keyboard, arrow/Enter/Escape đúng |
| **P2** | Hiệu ứng thêm/xóa | `LIST/OVERLAY (cha) → item`; motion là trạng thái **chuyển đổi**, không tạo nội dung riêng | **Có nền:** RULE 11 / `text-motion.ts` hỗ trợ skeleton/caret/chunk, chưa có contract chuyển động list | R11 + media reduced-motion, không thay token CSS | Không rung input, không gây layout shift, không animate khi reduced-motion |

## 3. Gating trước khi thêm thư viện/mẫu

Theo **RULE 12** (không tạo RULE 13), áp dụng các câu hỏi sau cho từng ý tưởng:

1. Đã có `parent ID` trong `component-contracts.ts` chưa? Nếu chưa, có phải là region/composition mới thật sự?
2. `nature` là container/content/control/decoration hay **utility** (virtualizer/positioning) không nên biến thành DOM component?
3. `cardinality` 1, 0–1, 0–n là gì? Chẳng hạn attachment **nhiều con**, toolbar **một cha**, nút gửi **một con**.
4. Chủ sở hữu layout/scroll/focus/state ở đâu? Cha sở hữu bố cục/vùng/scroll, primitive sở hữu kích thước/border/icon. Tránh CSS `nth-child` hoặc điều chỉnh margin âm ở con.
5. Source hiện có đã thỏa mãn chưa? **Không thêm thư viện React runtime** chỉ để tạo mẫu trong TypeScript DOM/Vite-less 2027.
6. Hành động thật có không? Không xây nút stop/more/search nếu không có handler, không gọi AI hoặc gửi thật trong demo.
7. Đã xem giấy phép gói *cụ thể* chưa (không suy diễn giấy phép của package con từ repo cha), đã có E0–E5 và test thiết bị chưa?

## 4. Kết luận thực thi

**Nên làm tiếp theo thứ tự**: (A) chuẩn hóa `CHAT-MESSAGE` thành *một parent có các parts* với action bar thuộc đúng tin; (B) thử luồng prepend/append/reflow dài dựa trên TanStack Chat Guide; (C) kiểm toán overlay/focus/keyboard; (D) kiểm Workspace Panel; sau đó mới tìm kiếm nâng cao, draft restore, slash menu và animation. **Không chuyển những dòng trong bảng này thành component thật khi chưa triển khai**. R12 registry V40 hiện vẫn chỉ khai báo phạm vi đã sửa; bảng này là **backlog nguồn**.

**Bằng chứng nội bộ đối chiếu:** `web/src/component-contracts.ts`, `web/src/scroll-anchor.ts`, `web/src/ui-patterns.ts`, `web/src/composer-gallery.ts`, `web/src/text-motion.ts`, `index.html`, `web/styles.css`, `RULES.md`. Không chỉnh CHAT/TAPHOA production, không tạo giao dịch/tin nhắn thật.

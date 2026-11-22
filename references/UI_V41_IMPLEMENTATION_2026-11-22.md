# 2027 UI Library — V41 · Một Message có nhiều phần, primitive dùng nhiều vị trí

**Ngày:** 22/11/2026 (VN) · **Phạm vi mã:** riêng `1sl2tp/2027` (Web demo) · **Owner quy tắc:** `RULES.md → RULE 12`. Không sửa dự án CHAT/TAPHOA thật, không gửi tin, không tạo giao dịch, không cài thư viện ngoài.

## Những gì đã cài

1. `web/src/component-contracts.ts` đã mở rộng registry với `MESSAGE-CONTENT-PARTS` (một cha), các con `MESSAGE-TEXT-PART` / `MESSAGE-TABLE-PART` / `MESSAGE-MEDIA-PART` (0–n), `MESSAGE-MEDIA-TILE` (0–n trong nhóm), và `CHAT-MESSAGE-ACTIONS → MESSAGE-COPY-BUTTON`. Chữ cũ `CHAT-MESSAGE-TEXT` vẫn được giữ để tránh phá mẫu V40.
2. **Primitive đa vị trí, không đa bản sao.** `COMPONENT_CONTRACTS` vẫn có **một** định nghĩa `DATA-TABLE` và một `COLUMN_SCHEMA` 20 cột trong `column-matrix.ts`. `COMPONENT_PLACEMENTS` thêm quyền mount `DATA-TABLE` vào `MESSAGE-TABLE-PART`, ngoài catalog chính `CHAT-SCREEN`. Quy tắc hiển thị registry ghi `↳ sử dụng DATA-TABLE`, không vẽ một cây primitive thứ hai.
3. `auditComponentPlacements` bắt ID placement trùng, host/child thiếu, host không là container, tự lồng và chu trình theo đồ thị nhiều cha. `auditMessageTree` kiểm cấu trúc DOM một tin, đúng Message ID, 1 vùng parts, tối đa 1 actions, tile nằm trong nhóm, table là primitive chia sẻ, copy button dùng `ui-button`.
4. Trang chính `index.html` đã lên **V41**, dưới nhóm **4. Chữ có khung viền và bong bóng → 4.1 Một tin có nhiều nội dung**. Có 3 chế độ: chỉ chữ / chữ + bảng / chữ + bảng + ảnh; nút copy chỉ lấy nội dung các parts trong tin. Dữ liệu thử không phát qua mạng.
5. `web/src/message-parts.ts` dựng DOM bằng `createElement` và `textContent`, tránh dùng `innerHTML`. Bảng dùng đúng `COLUMN_SCHEMA` (các key `name`, `quantity`, `total`) và `ds-table ds-table--schema`, số tiền căn theo `data-col-role`, button dùng `ui-button`. CSS V41 chỉ sở hữu layout `message-v41-*`, không tạo CSS button/table thứ hai.
6. `.github/workflows/pages.yml` giữ tương thích `dist-v40`, đóng gói thêm `dist-v41`. `tests/message-parts-v41.test.mjs` kiểm contracts/placements và scaffold. Kiểm thử regression V40 được chuyển sang bundle V41.

## Cây chuẩn và vị trí dùng lại

```text
CHAT-SCREEN
└── CHAT-THREAD
    ├── CHAT-MESSAGE-LIST
    │   └── CHAT-MESSAGE [0..n]
    │       ├── MESSAGE-CONTENT-PARTS [1]
    │       │   ├── MESSAGE-TEXT-PART [0..n]
    │       │   ├── MESSAGE-TABLE-PART [0..n]
    │       │   │   └── → DATA-TABLE gốc [1]   (placement; không tạo định nghĩa mới)
    │       │   └── MESSAGE-MEDIA-PART [0..n]
    │       │       └── MESSAGE-MEDIA-TILE [1..n ở mẫu]
    │       └── CHAT-MESSAGE-ACTIONS [0..1]
    │           └── MESSAGE-COPY-BUTTON [0..1] → ui-button
    └── CHAT-COMPOSER (không thay đổi V40)
```

**Tách đúng hai khái niệm:** `ComponentContract.parent` là đường đi *canonical catalog* cho việc định danh và tra cứu. `ComponentPlacement.host` là vùng được quyền gắn primitive đã tồn tại. `DATA-TABLE` không phải có hai bộ CSS hoặc hai schema chỉ vì xuất hiện trong Message và màn bảng.

## Cấp bằng chứng / trạng thái

- **E0–E2:** có code và kiểm thử tĩnh; `auditMessageTree` chạy mỗi lần đổi mode trong demo.
- **E3:** build, GitHub Actions và Pages chỉ được coi đạt khi có bằng chứng workflow/deploy thật; push commit **không chứng minh** deploy hoàn tất.
- **E4/E5:** chưa xác nhận iPhone/Android, bàn phím thật, chọn text, media thật, screen reader, hiệu năng hoặc production. Cần kiểm thử riêng trước khi chuyển contract vào CHAT.
- **Không nằm trong V41:** virtualizer cho thread dài, ảnh thực/lightbox, tìm trong hội thoại, draft/queue, panel resize, popup nested. Chúng ở backlog [GITHUB_UI_UX_COMPONENT_GAPS_V41.md](GITHUB_UI_UX_COMPONENT_GAPS_V41.md), không được nhận là đã sửa.

## Nguồn công khai hỗ trợ (không sao chép code runtime)

- [assistant-ui: Message Pair](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/message-pair.mdx), [Message Actions](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/message-actions.mdx) — Message owns parts + ActionBar.
- [AI Elements Message](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/message.md) — khái niệm content parts.
- [components.build](https://github.com/vercel/components.build) — compound composition và slot.
- [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui) — button/textarea semantics, không phải CSS nội bộ ChatGPT.

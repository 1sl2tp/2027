# V44 — Đối chiếu component hiện có trong CHAT với thư viện UI/UX 2027

**Ngày:** 22/11/2026. **Platform source thực:** `keyboard-inset-core.js`, `shell-form-viewport-policy.js` (viewport/keyboard/safe-area); không thêm writer riêng ở composer. **Nguồn CHAT:** `1sl2tp/chat` nhánh `main`, `index.source.html` là nguồn HTML gốc (index.html là generated inline). **Thư viện nhận:** `1sl2tp/2027`. Không thay dữ liệu, Supabase, tin nhắn, giao dịch hay CSS production.

## Kết luận quan trọng
Không được gọi các năng lực **đã có trong CHAT** là còn thiếu chỉ vì thư viện 2027 chưa vẽ demo: CHAT đã có keyboard/visual viewport, Directory, compact header, loaded-message search, full-screen image viewer, forward picker, sender states và nút về cuối. V44 bổ sung chúng thành contract/bindings trong **cùng registry**.

## Sơ đồ P0 → P4 và quan hệ logic
```text
P0 Platform [không phải DOM con]: keyboard-inset-core + shell-form-viewport-policy
  P1 Shell [shell.js] → CHAT-SCREEN
    ├─ CHAT-DIRECTORY [region1] → TOOLS(Search + Filters) + LIST(Row → Avatar/Name/Preview) + Footer
    ├─ CHAT-REGION-TOP [header] → Identity(Avatar+Name) + Call + More
    ├─ CHAT-THREAD [region2] → MESSAGE-LIST(Message → Parts + Actions + State)
    │                     └─ CHAT-COMPOSER → Reply + Attachments + Input + Toolbar(+/mic/send) + Menu
    ├─ CHAT-WORK-REGION [region3] → WORK-SUMMARY
    ├─ CHAT-MOBILE-DRAWER [shell projection]
    └─ CHAT-OVERLAY-ROOT → Search(Hits) + ImageViewer + ForwardPicker
```
**DOM khác ownership:** `#threadScrollControl` được mount gần `#thread-bottom-container` nhưng state/scroll hành vi của `CHAT-MESSAGE-LIST`. Không ép chuyển nó vào composer hay tạo thêm handler.

## Thay thế / giữ nguyên theo nhóm
| Hiện tại CHAT và nguồn | Quyết định V44 trong thư viện | Nguồn GitHub tham khảo |
| --- | --- | --- |
| `#regionTop .compact-top-grid`, `shell.js`, mobile normal/reading/typing | **Giữ owner Shell**, thư viện thêm Header → Identity/Call/More; không tái tạo 3 header DOM | [assistant-ui Mobile Composer](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/mobile-composer.mdx) |
| `#shellNavigationLayer`, `.contact-directory-tools`, `[data-contact-row]` | **Giữ** một Directory List; mỗi row là cha của avatar/name/preview; footer ngoài list | [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) (tham khảo group 3 vùng, không cài React) |
| `#messageWindow`, `.message-row`, `.message-action-group` | **Giữ** Message owner, 1 ActionBar/tin, trạng thái sending/failed thuộc đúng tin | [assistant-ui Message Actions](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/message-actions.mdx), [shadcn chat](https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/rules/chat.md) |
| `#threadScrollControl` + badge | **Không tạo nút thứ hai**; V43 mẫu mũi tên là preview; parent logic MessageList, DOM mount vùng Footer | [shadcn MessageScroller](https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/rules/chat.md) |
| `#composerForm → #composerShell → #editorWrap → #editor`, `#attachmentTray`, `#composerFooter` | **Giữ** 1 Composer với các con; `#composerActionMenu` do nút + mở, visualViewport Platform quản lý | [assistant-ui Composer](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/composer.mdx), [Mobile Composer](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/mobile-composer.mdx) |
| `conversation-search.js` + `V21ConversationBridge.searchLoaded/revealLoadedMessage` | **Thay mô tả thiếu Search** bằng binding đã có; `SEARCH-FIELD` mount thêm ở SearchOverlay bằng placement, không clone Search primitive | [assistant-ui Conversation Search](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/conversation-search.mdx) |
| Viewer `app.js`, `message-forward.js`, `InteractionController` | **Giữ overlay root/focus owner**, không làm popup cho từng ảnh; cần E4/E5 ảnh thật/zoom/keyboard | [Radix Dialog/FocusScope](https://github.com/radix-ui/primitives), [assistant-ui ImageGallery](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/image-gallery.mdx) |
| `#workThreadView` + `[data-work-summary-root]` | **Giữ Work region riêng**, không trộn thành message part hoặc button trong composer | [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) |

## Những thứ cần kiểm trước khi thay thật
- Rà UI trên 3 trạng thái `data-chat-header-mode="normal/reading/typing"` và 2 breakpoint thực tế (`64rem` directory, `80rem` workspace, hover+fine pointer).
- Mobile Safari/PWA: bàn phím ẩn/hiện, input 1–4 dòng, safe-area, header thu gọn mà không làm rung composer; **đã có Platform owner**, đừng vá riêng trong bubble.
- Directory scroll bền, contact search/filter; tap/long press phân biệt, ActionBar không làm mất chọn text.
- Message ảnh xoay/zoom/forward; đóng overlay trả focus đúng và không sửa message đang đọc.
- Nếu CSS có các `!important` nối tiếp hoặc `ui-icons.js` phụ thuộc reference markup, rà từng owner rồi dọn; **không replace toàn hệ icon ngay**.
- V44 là map metadata và cây thư viện, không tuyên bố đã nghiệm thu bốn ảnh trên mọi màn hình, không thay CHAT production.

**Owner docs CHAT:** [00 workflow](https://github.com/1sl2tp/chat/blob/main/docs/ui/00-QUY-TRINH-UI.md), [01 common](https://github.com/1sl2tp/chat/blob/main/docs/ui/01-THE-CHUNG-UI.md), [02 UI rules](https://github.com/1sl2tp/chat/blob/main/docs/ui/02-THE-RULE-UI.md), [10 CHAT](https://github.com/1sl2tp/chat/blob/main/docs/ui/10-THE-CHAT-UI.md).

## Correction V44 — physical parent ≠ canonical owner

Thực tế `#composerForm` chứa `#composerShell`; `#composerShell` chứa `#editorWrap → #editor`, `#attachmentTray`, `#composerFooter` và reply context. Mẫu V40 `ds-composer` có thể đặt textarea/toolbar trực tiếp bên trong form. V44 giữ nguyên **một** `COMPOSER-INPUT`/`COMPOSER-TOOLBAR` canonical và cho phép physical mount vào `COMPOSER-SURFACE`/`COMPOSER-EDITOR-WRAP` bằng `COMPONENT_PLACEMENTS`, không tạo CSS/Input/Button riêng.

`#composerActionMenu` là **popover sibling** sau `</form>` trong nguồn HTML, nhưng action/visibility thuộc Composer và nút `#composer-plus-btn`. Không nhét popover vào textarea/surface hay tạo root menu thứ hai. Tương tự `#threadScrollControl` mount gần footer nhưng có logical owner MessageList.

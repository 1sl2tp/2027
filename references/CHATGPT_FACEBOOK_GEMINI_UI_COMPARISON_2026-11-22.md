# UI 2027 · Đối chiếu CSS ChatGPT × Facebook × Gemini

**Nguồn:** [thư mục UI 2027 do người dùng cung cấp](https://drive.google.com/drive/folders/1uPNFbeA_lbJjIEZW0O__g4lTWWXJEVSj?hl=vi) · các bản Save Page ngày 22/11/2026. Tài liệu phân tích để chọn thành phần phù hợp; **không sao chép nguyên giao diện, stylesheet minified hay hệ class tự sinh của bất cứ hãng nào**.

## 1. Ba nguồn đã đọc và giới hạn

| Nguồn | File HTML trong Drive | Phạm vi thực tế |
|---|---|---|
| ChatGPT | [ChatGPT.html](https://drive.google.com/file/d/14RXspORGw1X8MJV3nxA850ahdDAMa9nW/view) | Bản lưu ChatGPT có `data-appearance-preset="codex"`; không mặc nhiên là toàn bộ giao diện hội thoại thông thường |
| Facebook | [(20+) Facebook.html](https://drive.google.com/file/d/1A2A86yBaz42Gv1fZP7b5aHmObIER1qXe/view) | Trang **Facebook Reel**; có CSS token Facebook và Messenger nhúng trong capture nhưng **không chứng minh toàn bộ UI Messenger đang hiển thị** |
| Google Gemini | [Google Gemini.html](https://drive.google.com/file/d/1KSPGdSqEcxFcyR_N6fdVjoGxyhhxKwJV/view) | Trang web `gemini.google.com/app`, có CSS nhiều component/viewport; không coi mọi biến được định nghĩa là đang dùng ở ảnh hiện hành |

Tham khảo thêm [thư viện ChatGPT tháng 9/2026](https://drive.google.com/drive/folders/10_HovvaVcwve6BjsbwJHFpZr_1SKea3T) và [bản kiểm kê nguồn ChatGPT](./CHATGPT_UI_SOURCE_AUDIT_2026-11-22.md). Từng nhóm bên dưới phân biệt **[CSS]** (đọc trực tiếp giá trị), **[THIẾT KẾ]** (quyết định riêng dự án 2027). Không dùng thông tin tài khoản hay token từ trang HTML đã lưu.

## 2. Họ font và phân cấp chữ

| Hệ thống | [CSS] Họ font được tìm thấy | [THIẾT KẾ] Điều nên học |
|---|---|---|
| ChatGPT | Bản lưu trước có system UI; bản 22/11 có biến `--font-ui-size:16px`, `--text-xs:12px`, `--text-sm:14px`, `--text-base:16px`, `--text-lg:18px`, `--text-xl:20px`, `--text-2xl:24px` được đặt trong markup | Nội dung đọc với **một họ sans chính**, phân cấp qua size/weight/spacing; monospace dành cho code |
| Facebook | `--font-family-system-fds: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI Historic, Segoe UI, Helvetica, Arial, sans-serif`; `--font-family-default: Helvetica, Arial, sans-serif` | Dùng mức chữ nhỏ/đậm cho sidebar, tên, metadata; không làm chữ giao diện cùng cấp |
| Gemini | CSS chứa `Google Sans Flex`, `Google Sans`, `Google Sans Text`, `Roboto` và fallback sans | Lấy nguyên tắc typography theo vai trò, **không mang font có giới hạn bản quyền** về dự án |

**Kết luận 2027:** `--ui-font` system sans mặc định; `--ui-font-mono` cho code; các role `display`, `heading`, `body`, `body-strong`, `caption`, `input`, `table`, `money`. Font size không được thay bằng cách giảm quá nhỏ để nhét nhiều nội dung vào một hàng.

## 3. Màu sắc và bề mặt

| Vai trò | ChatGPT [CSS] | Facebook [CSS] | Gemini [CSS] |
|---|---|---|---|
| Mặt nền chính sáng | `--app-color-background-elevated-primary:#fff` | `--surface-background:#fff` | `--lumi-sys-color--surface-bright:#fff`, `--lumi-sys-color--surface-background:#fdfcfc` |
| Mặt nền phụ | `--app-color-background-elevated-secondary:#f3f3f3` | `--web-wash:#F0F2F5` (một biến thể sáng) | `--lumi-sys-color--surface-dim:#f2f0f0` |
| Chữ chính | `--app-color-text-foreground:#0d0d0d` | `--primary-text:#050505` (một biến thể sáng) | `--lumi-sys-color--on-surface:#000` (biến thể sáng) |
| Chữ thứ cấp | `--app-color-text-foreground-secondary:#5d5d5d` | `--secondary-text:#65676B` | `--lumi-sys-color--on-surface-variant:rgba(0,0,0,.55)` |
| Viền nhẹ | `--app-color-border:#0000001a` | `--input-border-color:#CED0D4` (cho input) | `--bard-color-form-field-outline:#80868b` (cho input) |
| Viền focus | `--app-color-border-focus:#3a83f7` | `--border-focused:#65676B` (trong một nhóm token) | `--bard-color-form-field-outline-active:#1a73e8` |
| Màu nhấn | `--app-color-icon-accent:#2c67c5` | `--fds-blue-60:#1877F2`, `--accent:#0866FF` (ở một biến thể) | `--gem-sys-color--brand-blue:#3186ff` |

**[CSS] Facebook** còn khai báo `--fds-gray-00:#F5F6F7`, `--fds-gray-05:#F2F3F5`, `--fds-gray-20:#DADDE1`, `--fds-gray-100:#1C1E21`. **[CSS] Gemini** có `--bard-color-sidenav-background-desktop:#e9eef6` trong một light theme. Giá trị có thể bị ghi đè theo theme/lớp stylesheet; không lấy một khai báo rồi khẳng định là màu đang render.

**[THIẾT KẾ 2027]:** một hệ token **theo vai trò**, không sinh 3 theme độc lập:
`--ui-bg`, `--ui-surface`, `--ui-text`, `--ui-text-muted`, `--ui-border`, `--ui-focus-color`, `--ui-accent`.
Giữ palette trung tính chính; chỉ dùng màu hãng làm **mẫu so sánh**, không đưa nhận diện Facebook/Gemini vào sản phẩm.

## 4. Khoảng cách, kích thước và cấu trúc cha–con

| Mục | Số liệu từ bản lưu [CSS] | Giới hạn / diễn giải |
|---|---|---|
| ChatGPT spacing | `--spacing:.25rem` = **4px** khi root 16px (thư viện 09/2026) | Dùng nhịp cơ bản 4px |
| Facebook sidebar Messenger | `--messenger-sidebar-collapsed-width:44px`; `--messenger-sidebar-expanded-width:240px` | Là **token Messenger có trong CSS của trang Reel**, chưa quan sát UI Messenger ở trạng thái mở |
| Gemini spacing | `--gem-sys-spacing--xs:4px`, `s:8px`, `m:12px`, `l:16px`, `xl:20px`, `xxl:24px`, `xxxl:28px` | Nhịp không gian dùng lại được, các phần tử khác có thể dùng các nhịp khác |
| Gemini sidenav (desktop layout) | `--ssr-sidenav-closed-width:72px`, `--ssr-sidenav-open-width:308px` trong một media rule; **một biến thể khác** ghi 52/288px | Không coi một giá trị duy nhất là kích thước chung mọi viewport |
| Gemini input area | `--input-area-icon-size:40px`, `--input-area-height:40–43px` ở các rule khác nhau | Cỡ control/icon phụ thuộc chế độ/viewport; không phải chiều cao toàn bộ composer |
| ChatGPT composer tham chiếu cũ | min-height **56px**, radius **28px**, nội dung chữ **16px/26px** | Là capture tháng 9/2026; không đồng nhất chắc chắn với snapshot Codex mới |

**[THIẾT KẾ 2027]:** tách `Shell / Rail / Sidebar / Header / Thread / Composer / Overlay`. Mobile ưu tiên `Thread + Composer`; khi bàn phím mở, composer không được che và không gây rung vùng gõ. Đặt một vùng chịu trách nhiệm cuộn, không để shell + thread cùng cuộn tranh nhau.

## 5. Các thành phần nên trộn theo chức năng

| Thành phần thư viện 2027 | ChatGPT | Facebook | Gemini | Hướng làm của 2027 |
|---|---|---|---|---|
| Văn bản/Markdown | Bài viết, heading, bold, list, code, table | Chữ chính/nhãn phụ trong feed và menu | Hệ typography component | **ChatGPT làm chuẩn phân cấp đọc** |
| Bảng | Table container cuộn ngang, giữ gutter | Dữ liệu theo hàng/nhóm | Hệ bảng/lists ứng dụng | Cột trái chữ, cột giữa SL, phải tiền; overflow độc lập |
| Danh bạ / danh sách | Sidebar lịch sử | Token sidebar, row, trạng thái | Sidenav, danh sách hội thoại | **Facebook làm tham chiếu mật độ và row** |
| Tin nhắn | User bubble + assistant text không bubble lớn (mẫu tham chiếu cũ) | Có token bubble Messenger: `18px` radius, padding **8px × 12px** | Khung response, vùng hội thoại | Không ép hai bên chat giống nhau nếu loại nội dung khác |
| Icon + chữ + vùng phụ | Icon action/toolbar | Row, nhãn, trailing, badge | Tile/side nav, icon controls | Chọn bố cục tối đa 2–4 vùng theo nội dung, không thêm nút thừa |
| Input số lượng | Không là thành phần chat chính | Nhiều token control/viền | Trạng thái outline rõ | Một khung focus cho nhóm `− | số | +`, không đứt viền ở ô con |
| Input chat | Composer sticky/overlay | Messenger input tokens có sẵn | Textarea và input area nhiều mode | **Gemini + ChatGPT tham chiếu composer**, không buộc dùng ProseMirror |
| Menu/popover | Một hệ overlay riêng | Menu, modal, dialog tokens | Material menus/dialog | Overlay không làm hỏng kích thước vùng nội dung |
| Màu/bo góc | Trung tính, bo mềm | Nhiều nấc radius | Surface state và corner tokens | Không lặp CSS; dùng `--ui-radius-*` theo mục đích |

**Facebook [CSS] chi tiết quan trọng:**
`--chat-bubble-border-radius:18px`, `--chat-bubble-padding-vertical:8px`, `--chat-bubble-padding-horizontal:12px`, `--chat-incoming-message-bubble-background-color:#F0F0F0`, `--chat-outgoing-message-bubble-background-color:var(--accent)`, `--input-background:#FFFFFF`, `--input-border-color:#CED0D4`, `--button-corner-radius:6px` hay `8px` tùy bộ token/theme.

**Gemini [CSS] chi tiết quan trọng:** các surface tách `--lumi-sys-color--surface-bright`, `--surface-dim`, `--on-surface`; `--bard-color-form-field-outline` có trạng thái thường/hover/active; `--input-area-icon-size:40px`; một số vùng composer có `max-width:608px`. Những giá trị này chỉ có tính chất *nhóm component tương ứng*.

## 6. Cách sử dụng trong dự án

- **Không copy** nguyên file CSS Facebook/Gemini/ChatGPT, class minified, asset proprietary, font binary hoặc nội dung tài khoản từ bản Save Page.
- **Không đổi** `web/styles.css` hoặc thay đổi giao diện 2027 ngay chỉ vì có token mới. Bảng này là inventory nguồn để so sánh và duyệt.
- Chỉ nhận một mẫu sau khi nó có **vai trò, số liệu đo, hình minh họa, trạng thái hover/focus/disabled, xử lý mobile, thiết bị kiểm thử và kiểm tra tương phản**.
- Một component chỉ có **một chủ sở hữu CSS**, biến thể `table / qty / input / icon-row / popup` dùng lại token nền tảng; không tạo 3 stylesheet theo hãng.
- Khi dùng ảnh/bản lưu khác, ghi nguồn + ngày và phân biệt rõ: **xác nhận CSS**, **quan sát hình**, **phương án thiết kế 2027**.

**Trạng thái:** đã trích và ghi số liệu nguồn (docs). Chưa áp UI mới, chưa nghiệm thu màn hình thực, chưa động chạm CHAT/TAPHOA production.

# ĐỐI CHIẾU UI CHATGPT — ẢNH 22/11/2026 + THƯ VIỆN NGUỒN TRONG DRIVE

**Mục đích:** làm chuẩn tham chiếu để xây dựng hệ UI riêng của dự án `2027`. Ghi riêng **giá trị đã trích từ bản lưu CSS**, **hình thái quan sát trên ảnh** và **gợi ý áp dụng**. Đây không phải cam kết CSS riêng của ChatGPT hiện tại giống hệt bản lưu tháng 9/2026.

## Nguồn và cấp độ chứng cứ

- **A — CSS hoặc metadata trong Save Page ngày 06–07/09/2026:** [thư mục `ui gpt`](https://drive.google.com/drive/folders/1-lafp9tLlQC7uRAX3jSyhvb9kmWj_Jgq) → [`UI_LIBRARY_CHATGPT_REFERENCE_2026-09-07`](https://drive.google.com/drive/folders/10_HovvaVcwve6BjsbwJHFpZr_1SKea3T) → [`00_UI_LIBRARY_CHATGPT_REFERENCE.html`](https://drive.google.com/file/d/1ckwp6zF0bRZdlDG6n3VKLeM6cfVq2YI8/view). Tài liệu này có bảng token, màu, chữ, icon, khung, input, tin nhắn và bảng.
- **A — file nguồn CSS có sẵn trong Drive**, dưới thư mục [`Chỉnh sửa giao diện ChatGPT_files`](https://drive.google.com/drive/folders/1DvgZiCGyHr3QbrPkHOYgk2m3jm-fRpuT): `root-bf3xaoxt.css`, `conversation-small-d87j24cm.css`, `table-components-b39fqymt.css`, `writing-block-gwgymy54.css`, `global-modals-dgfy4wm4.css`. Đây là bản CSS đã được lưu, không phải các file đang hoạt động trực tiếp trên chatgpt.com vào 22/11/2026.
- **A — README và ánh xạ:** [`01_UI_LIBRARY_README.txt`](https://drive.google.com/file/d/1_xbAAW3j6A2V3jbnoTm1iof1_GRpKeZq/view), [`03_SOURCE_VARIANT_MAP.txt`](https://drive.google.com/file/d/1AeqmEpBJunJSMcSxctHdjoz9k-92N_YA/view). `saved_resource(3).html` là variant ưu tiên cho bản **chat app V21.72.14** do người dùng trước đó dựng, không đồng nhất với mã nguồn ChatGPT.
- **B — ảnh người dùng gửi ngày 22/11/2026:** hình cửa sổ trình duyệt hiển thị thanh icon, danh sách hội thoại, văn bản trả lời, thẻ hành động và ô nhập. Ảnh cho biết tỉ lệ thị giác và cách phân vùng; **không cho biết class CSS hay kích thước CSS px chính xác**.
- **C — gợi ý thiết kế cho dự án 2027:** những mục gắn C bên dưới là định hướng áp dụng, không phải dữ kiện từ mã nguồn.

## 01. Khung cha/con và chiếm dụng diện tích

| Thành phần | Baseline từ Drive (A) | Quan sát ảnh 22/11 (B) |
|---|---|---|
| Stage | `height:100svh; width:100vw` (tài liệu tham chiếu) | Chiếm nội dung trình duyệt, **không** gồm toolbar/tab của Chrome |
| Sidebar desktop | `260px` | Có một **icon rail** riêng rồi đến danh sách cuộc trò chuyện |
| Rail | `13 × 4 = 52px`, touch `14 × 4 = 56px` | Nút icon xếp dọc, tài khoản ở dưới |
| Header hội thoại | `52px`, pointer thô `56px` | Tên hội thoại trái, menu và chia sẻ phải |
| Nội dung | chỉ `Thread` cuộn; max nội dung tham chiếu `720px` (variant app riêng: `760px`) | Đoạn văn nằm trong cột đọc hẹp, có gutter trái phải |
| Composer | sticky/overlay cuối trang, `radius:28px`, `min-height:56px` | Ô nhập viên thuốc, + bên trái, các nút hành động bên phải |

**C:** Thiết kế ở cấp `App shell → rail/sidebar/main → header/thread/composer`; không đặt nhiều scroll owner tranh nhau. Khi bàn phím mở, composer phải được ưu tiên và thread thu hẹp, không chồng lên ô nhập.

## 02. Họ font, cấp chữ, độ đậm

Trích từ bảng token trong `00_UI_LIBRARY_CHATGPT_REFERENCE.html`:

- Font stack sans (không cần tệp font nhị phân): `"-apple-system-body", "ui-sans-serif", "-apple-system", "system-ui", "Segoe UI", "Helvetica", "Apple Color Emoji", "Arial", "sans-serif", "Segoe UI Emoji", "Segoe UI Symbol"`.
- Mono (code/số cần đơn cách): `"ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "Liberation Mono", "monospace"`.
- Cỡ token: `xs=.75rem` (12px ở root 16px), `sm=.875rem` (~14px), `base=1rem` (16px), `lg=1.125rem` (18px), `xl=1.25rem` (20px). Một số heading mẫu dùng cỡ lớn hơn; không xem đây là danh mục duy nhất.
- Weight: `normal=400`, `medium=500`, `semibold=600`, `bold=700`.
- Body/composer text trong capture: `16px / 26px / 400`.
- B trong ảnh: chữ nội dung đều độ lớn, câu nhấn mạnh chủ yếu **bold**; khối code `2027` monospace nền xám nhạt; dòng thời gian/trạng thái nhỏ và nhạt hơn; link gạch chân hoặc màu nhấn. Không có nhiều họ font trang trí.

**C:** Tạo role `heading / body / emphasis / caption / code / money / list / table` thay vì yêu cầu từng màn tự chọn font và padding tùy ý.

## 03. Bảng màu và bề mặt

Các giá trị dưới đây **được tài liệu lưu nguồn công bố** cho light theme (có thể khác phiên bản/chủ đề ảnh):

| Vai trò | Token hoặc CSS từ bản lưu (A) |
|---|---|
| Nền chính | `--bg-primary: #fff` |
| Sidebar | `--component-sidebar-bg: #fcfcfc` |
| Nền phụ nhẹ | `--gray-50: #f9f9f9`, `--gray-75: #f3f3f3` |
| Chữ chính | `--gray-950: #131313` (light) |
| Chữ phụ | `--text-secondary: #0009` |
| Chữ thứ cấp rất nhạt | `--text-tertiary: #0000004a` |
| Viền rất nhẹ | `--border-xlight: #0000000d` |
| Viền nhẹ | `--border-light: #0000001a` |
| Viền trung bình | `--border-medium: #00000026` |
| Nền tin nhắn | `--message-surface: #e9e9e980` |
| Tin nhắn người gửi màu xanh (blue theme) | `#e8f3fe` trên chữ `#0c274a` |
| Spacing đơn vị | `--spacing: .25rem` = 4px ở root 16px |

**B:** ảnh hiện có sidebar gần trắng/xám rất nhạt, khu nội dung trắng, chữ gần đen, metadata xám; call-to-action trong card có nền gần đen và chữ trắng. Ảnh Chrome phía trên là UI của trình duyệt, **không đưa vào CSS của ChatGPT**.

## 04. Các nhóm component cần thu thập tiếp

| Nhóm | A — tài liệu/capture | B — ảnh hiện tại | C — yêu cầu thư viện 2027 |
|---|---|---|---|
| Tin nhắn người gửi | bubble tối đa ~70%, `radius:22px`, `padding:10px 16px` ở demo baseline | Không nhìn rõ bubble user trong ảnh này | Có/sửa được chiều rộng, padding, radius |
| Nội dung trợ lý | không bubble lớn, văn bản/Markdown trực tiếp | Văn bản với bold, bullet, code inline, link | Chuẩn phân cấp typography, khoảng cách trước/sau đoạn |
| Thẻ hành động | nguồn có các mẫu thẻ, tile và control | Viền xám mảnh, góc bo, bên trong nút đen dạng pill | Card + button chính/phụ + tình trạng |
| Icon & nút icon | SVG kích thước 16/20/24px, 36px desktop và 40px touch theo thư viện | Icon trên header, rail, hành động tin nhắn | Icon đơn sắc và vùng chạm tách khỏi kích cỡ glyph |
| Composer | `contenteditable` ProseMirror, `role=textbox`, `aria-multiline=true`; `radius:28px`, `min-height:56px`, font `16px/26px` | + bên trái, ô gõ trung tâm, điều khiển bên phải | Không để viền focus input con cắt qua viền group |
| Menu/popup | `conversation-small-d87j24cm.css` có menu tương tác, rounded touch popup `28px` | Dấu ba chấm trong header, chưa mở menu | Chỉ phân tích kích cỡ popup từ ảnh khi người dùng chụp trạng thái mở |
| Table | `table-components-b39fqymt.css`: `overflow-x:auto`, `scrollbar-width:thin`, width `100cqw`, giữ gutter bằng `--thread-gutter-size` | Không có bảng dữ liệu hiện trong ảnh | Bảng cần container scroll độc lập, không phá cột chat |
| Bảng text | Source library: header bottom border medium, padding-block 8px; cell body border light, padding-block 10px; column end gap 24px | Không hiển thị | Ghi vai trò col header/cell/numeric, không hardcode mọi bảng |
| Bố cục hàng | Sidebar item và các row tương tác có icon, title, metadata | Row hội thoại 1–2 dòng, item được chọn nền xám nhạt | Thư viện icon + text + badge/time/trailing action |

Lưu ý: `conversation-small-d87j24cm.css` ghi trực tiếp CSS dropdown `data-content-appearance=touch-optimized`: `border-radius:28px`, `min-width:240px`, background `--bg-elevated-primary`, giới hạn `max-height` theo chiều cao còn lại, và `overscroll-behavior:contain`. Đây là quan sát từ file CSS lưu, không khẳng định popup trong ảnh hiện tại đang dùng đúng rule này.

## 05. Nguyên tắc làm việc cho các ảnh người dùng gửi tiếp

1. Tách **chrome trình duyệt** khỏi **chrome ứng dụng**.
2. Đánh dấu chính xác vùng `rail / sidebar / header / thread / assistant / user / toolbar / composer / popup`.
3. Xác định các loại chữ: `heading / body / bold / secondary / caption / code / link / table`.
4. Xác định các cặp `surface + text + border`, ưu tiên nguồn CSS đã lưu, không suy đoán giá trị hex từ mắt nhìn.
5. Ghi mẫu `icon + text + trailing` và hàng đa vùng; đối chiếu cả 1/2/3/4 dòng.
6. So sánh với CSS của 2027 (đang dùng `web/styles.css`) theo **vai trò**, không copy nguyên minified CSS nguồn hoặc tên class build tự sinh.
7. Tách ba trạng thái `ĐÃ XÁC NHẬN TỪ DRIVE`, `QUAN SÁT ẢNH`, `CHƯA KIỂM CHỨNG`. Không tuyên bố đã nghiệm thu từ ảnh chụp đơn.
8. Không chỉnh các file gốc trong Drive và không dùng font binary từ bản lưu. Bất kỳ áp dụng nào vào demo 2027 phải có commit/CI/kiểm tra riêng.

**Phạm vi hiện tại:** chỉ trích và chuẩn hóa tham chiếu. Chưa áp các thông số từ bản lưu 09/2026 vào app Chat thật hoặc tự cho rằng đó là thiết kế ChatGPT hiện thời.

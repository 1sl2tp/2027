# 2027 UI — Danh mục thành phần và điểm dùng chung (V12)

Đây là **bảng kiểm kê kỹ thuật** thực hiện [RULE 06](../RULES.md); quy tắc chuẩn tắc chỉ nằm ở `RULES.md`. Trang xem mẫu hiện tại: [Thư viện mẫu](https://1sl2tp.github.io/2027/) · [Nút & biểu tượng](https://1sl2tp.github.io/2027/#sample-actions) · [Ô nhập & gõ chat](https://1sl2tp.github.io/2027/#sample-inputs).

## Phân tầng của hệ giao diện

| Cấp | Vai trò | Vị trí lưu | Ví dụ |
|---|---|---|---|
| 0 · Token | Cỡ, màu, font, giãn cách, focus | `web/styles.css` + `web/src/design.ts` | `--ui-control-hit`, `--ui-control-send-disc`, `--ui-font` |
| 1 · Icon | Hình học SVG một nguồn | **`web/icons.svg`** | `ui-icon-plus`, `ui-icon-mic`, `ui-icon-chevron`, `ui-icon-send-up` |
| 2 · Button | Hệ nút và trạng thái | **`web/styles.css`** | `.ui-button`, `.ui-button--icon`, `.ui-button--mode`, `.ui-button--send` |
| 3 · Mẫu ghép | Dùng nút/icon đã có; chỉ khai báo layout | `index.html` + `web/src/composer-gallery.ts` | Composer gọn, có ảnh, nhiều ảnh, gửi/ghi âm |
| 4 · Luồng | Dùng lại mẫu ghép, không chép nguyên CSS | `base.html`, `flows.html` và các màn tương lai | Chat/Công việc/Bán hàng |

### 01. Nhóm chữ & nhiều dòng

Mẫu một văn bản, các vai trò `heading/body/table/note/money`, giới hạn 1–4 dòng; người dùng chọn kiểu chữ riêng. Nguồn: `web/src/design.ts`, `web/src/app.ts`, một `web/styles.css`.

### 02. Bảng & dữ liệu

Bảng cơ bản và sáu kiểu (kẻ ô, kẻ ngang, không viền, sọc, gọn, dạng thẻ). Cột chữ/số/tiền căn đúng vị trí. Nguồn: `index.html#sample-tables`.

### 03. Số lượng − / +

Mẫu cơ bản và năm biến thể. Focus được vẽ tại cấp nhóm khi các nút và ô số cùng chung một khung. Nguồn: `index.html#sample-quantity`; CSS và JS đã có.

### 04. Ô nhập & gõ chat

Tìm kiếm, ô nhập dạng chữ, ô chat và bốn mẫu Composer. **Composer là mẫu ghép**, chỉ dùng button và icon ở mục 05. Không thêm `width/height/font-size` của nút riêng trong `.composer-*`; chỉ được quyết định kích cỡ outer composer/preview và layout.

### 05. Nút & biểu tượng — nguồn chính

**Tất cả các mẫu mới của 2027 cần phân loại trước ở nhóm này**, rồi tham chiếu từ nơi sử dụng. Mẫu ở [`#sample-actions`](https://1sl2tp.github.io/2027/#sample-actions) dùng chính các class đang render trong composer.

| Tên chuẩn | CSS / SVG | Kích thước thiết kế 2027 | Dùng lại ở |
|---|---|---|---|
| Button cơ bản | `.ui-button` | min-height **44px** | Nút chính/phụ/text, popup/menu |
| Icon trong button | `.ui-button--icon` + `.ui-icon` | vùng chạm **44×44px**, SVG tự căn giữa | Nút thêm, mic, icon vuông/tròn |
| Nút + | `.ui-icon--plus` + `#ui-icon-plus` | nét vẽ trong SVG **22px** | Thêm media trong 4 ô chat |
| Chế độ | `.ui-button--mode`, `.ui-mode-label` + `#ui-icon-chevron` | chữ **14px**, chevron **13px** | Nhãn Cao/Nhanh |
| Mic | `.ui-icon--mic` + `#ui-icon-mic` | SVG **19px** | Trạng thái mic của 4 mẫu |
| Gửi | `.ui-button--send`, `.ui-send-disc`, `#ui-icon-send-up` | nút chạm **44px**, vòng tròn xanh **36px**, arrow **20px** | Gửi mẫu |
| Không có nội dung | `#ui-icon-voice` | dùng chung vùng chạm và vòng tròn gửi | Khi chưa nhập chữ/chưa có media |
| Đang gửi | `#ui-icon-stop` | icon trạng thái chỉ mô phỏng | Tại `data-composer-busy=true` |
| Menu | `#ui-icon-ellipsis` | glyph chung 20px | Menu phụ |

Đây là kích cỡ **đề xuất của 2027 để gần với ảnh ChatGPT đã gửi**, chưa phải kết quả đo `getComputedStyle` từ ChatGPT.com.

**Mẫu tái sử dụng:**
```html
<button type="button" class="ui-button ui-button--icon" aria-label="Thêm media">
  <svg class="ui-icon ui-icon--plus" aria-hidden="true">
    <use href="./web/icons.svg#ui-icon-plus"/>
  </svg>
</button>
```
`web/icons.svg` phải được đóng gói cùng `web/styles.css` trong GitHub Pages và dùng đường dẫn tương ứng ở từng trang.

### Thanh thao tác nội dung (UI-V13)

Bộ mới nằm trong nhóm **05 — Nút & biểu tượng**, mẫu ứng dụng nằm trong **06 — Hàng & bố cục**. Cả hai sử dụng lại icon/primitive và không sở hữu bộ nút mới:

| Hành động/trạng thái | Icon chung `web/icons.svg` | Xử lý mẫu |
|---|---|---|
| Sao chép | `ui-icon-copy` | Clipboard API, thông báo nếu trình duyệt chặn |
| Thích / Không thích | `ui-icon-thumbs-up`, `ui-icon-thumbs-down` | `aria-pressed`, lựa chọn loại trừ nhau |
| Đọc nội dung | `ui-icon-volume` | Chỉ trạng thái; không thu âm hoặc phát âm thanh |
| Chia sẻ | `ui-icon-share` | Bảng chia sẻ hệ điều hành nếu hỗ trợ, không tự gửi |
| Menu phụ | `ui-icon-ellipsis` | Mở/đóng menu, Escape và click ngoài |
| Tải xuống | `ui-icon-download` | Tạo tệp TXT nội dung mẫu tại trình duyệt |
| Loading / làm mới | `ui-icon-loader`, `ui-icon-refresh` | Vòng quay 900ms, không dùng mạng |
| Hoàn tất | `ui-icon-check` | Trạng thái kết thúc mô phỏng |

Các modifier gốc trong CSS: `.ui-button--message-action`, `.ui-button--message-labeled`, `.ui-icon--action`, `.ui-icon--loading`; bố cục lắp ghép `.ui-action-strip`. Vùng nhấn thiết kế 44×44px, icon 17px. Chỉ hỗ trợ trình diễn cục bộ, sử dụng cùng RULE 06.

### 06. Hàng & bố cục

Icon + chữ + 1–2 dòng phụ + vùng cuối chứa số, trạng thái, mũi tên hoặc nút. Chỉ cấp `row` quản lý phân chia không gian; không định nghĩa lại màu và cỡ của `.ui-button` ở row.

### 07. Menu & popup

Các mẫu menu và dialog dùng `.ui-button` của nhóm 05 cho nút mở, đóng/hủy/xác nhận. Menu, dialog chỉ có quy tắc overlay/focus/placement riêng.

## Cách thêm mẫu về sau

1. Xác định **loại mẫu** trong 7 nhóm hiện có; nếu không khớp, tạo một nhóm có mục đích cụ thể (không thêm card rời ngoài danh mục).
2. Kiểm tra đã có **button/icon/token** phù hợp ở 05 chưa. Nếu có, dùng nguyên tên class và id symbol. Nếu thiếu, bổ sung đúng `web/icons.svg` và CSS primitive trong `web/styles.css`, đồng thời thêm mẫu xem trước ở `#sample-actions`.
3. Các thành phần phức hợp (composer, hàng đơn hàng, thanh công cụ) chỉ **ghép** primitive và phụ trách bố cục, không ghi thêm chiều rộng nút, cỡ icon và font trong từng component.
4. Thêm trạng thái hover/focus/disabled, mobile/desktop và kiểm thử hồi quy. Giữ hành vi demo tại JS, CSS không nắm nghiệp vụ.
5. Bảo vệ mốc V08 và không triển khai vào các ứng dụng CHAT/TAPHOA thật khi chưa có yêu cầu riêng.

### Tình trạng phạm vi

**V12 được chuyển đổi:** nút và icon trên trang thư viện chính, 4 mẫu composer, nút menu và popup của thư viện. **Chưa chuyển đổi toàn bộ:** các khung demo lịch sử `base.html` V09, `flows.html` V04; chúng vẫn dùng các biến/style lịch sử. Việc di chuyển tất cả màn cũ sang primitive sẽ cần vòng kiểm thử/thiết kế riêng. Các tệp Save Page của ChatGPT/Facebook/Gemini trong Drive được giữ nguyên.

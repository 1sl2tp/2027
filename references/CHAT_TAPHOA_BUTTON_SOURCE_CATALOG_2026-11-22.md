# Danh mục nút gốc · CHAT × TAPHOA · UI 2027 V14

**Mục đích:** làm bộ mẫu và bản đồ nguồn **dùng chung một CSS** cho các dự án liên quan. Tài liệu này chỉ là *kiểm kê và ánh xạ nguồn*, còn quy tắc chuẩn tắc thuộc [`RULES.md`](../RULES.md). Các nút minh họa **không thực hiện thao tác thật**.

## Phạm vi và điều đã kiểm tra

- **CHAT** — đã đọc trực tiếp [`1sl2tp/chat/ui-library/index.html`](https://github.com/1sl2tp/chat/blob/main/ui-library/index.html) và phần `<script id="ui-inventory">` nhúng. Trong nội dung hiện đọc được **246 thành phần**, trong đó có **44 mục `shape:"Nút"`** với ID `I01`–`I44`, selector, primitive, scope và tệp owner. [README thư viện CHAT](https://github.com/1sl2tp/chat/blob/main/ui-library/README.md) ghi mốc **247 mục tại 11/10/2026** — đây là mốc cũ khác với số mục đang đọc, không tự ý cộng hoặc sửa nguồn. Bộ V14 đưa **đủ 44/44 mục nút nhận diện được** vào dữ liệu có thể tìm kiếm.
- **TAPHOA** — lấy **44 nút hoặc nhóm nút mẫu có selector/handler thể hiện trong mã** từ các tệp `src/fixed-ui-markup-1..5.js`, `src/fixed-ui-invoice-templates.js`, `src/fixed-ui-cart-spacing.css`, `src/fixed-ui-semantic-columns.css`, `src/fixed-ui-debt-popup.css`. Đây là **mẫu kiểm kê chọn lọc**, *không tuyên bố đã tìm hết mọi nút trong toàn bộ TAPHOA*.
- **Thư viện 2027** — một tệp `web/styles.css`, registry SVG `web/icons.svg` và danh mục dữ liệu [`web/src/root-button-data.ts`](../web/src/root-button-data.ts). Giao diện có lọc CHAT/TAPHOA, tìm bằng tiếng Việt có/không dấu, lọc theo họ, mở/thu gọn từng nhóm, xem selector và liên kết tệp nguồn. Các nhóm ghép bán hàng, công nợ, đơn hàng và thanh nút Chat chỉ sử dụng lại primitive.

## Bảng phân loại hiện có

| Họ nút | CHAT | TAPHOA | Tổng |
|---|---:|---:|---:|
| Điều hướng & Header | 2 | 1 | 3 |
| Tin nhắn & phản hồi | 5 | 0 | 5 |
| Soạn & âm thanh | 9 | 0 | 9 |
| Ảnh, media & viewer | 9 | 0 | 9 |
| Đăng nhập & tài khoản | 8 | 3 | 11 |
| Cuộc gọi | 4 | 0 | 4 |
| Quản trị & liên kết | 7 | 0 | 7 |
| Bán hàng & số lượng | 0 | 8 | 8 |
| Đơn hàng & kiểm hàng | 0 | 15 | 15 |
| Công nợ & thu tiền | 0 | 9 | 9 |
| Cài đặt & mẫu hóa đơn | 0 | 8 | 8 |
| **Tổng** | **44** | **44** | **88** |

Nhóm *Nút & biểu tượng* ở [thư viện chính](https://1sl2tp.github.io/2027/#sample-actions) là nơi sở hữu variant; nhóm [*Hàng & bố cục*](https://1sl2tp.github.io/2027/#sample-layouts) dùng chúng làm thanh thao tác có ngữ cảnh. Không tạo CSS một bản cho CHAT và một bản khác cho TAPHOA.

## Chủ sở hữu thành phần và cách dùng lại

| Cấp | Nguồn duy nhất | Nội dung |
|---|---|---|
| Token | `web/styles.css` | `--ui-button-control` 44px, bán kính, font, khoảng cách, các tone |
| Icon | `web/icons.svg` | 51 symbol tên `ui-icon-*` (bổ sung khi thật sự cần hình học mới) |
| Button | `web/styles.css` | `.ui-button` + intent modifiers `--primary`, `--secondary`, `--quiet`, `--outline`, `--success`, `--warning`, `--danger`, `--segment`, `--toggle`, `--catalog` |
| Hành vi mẫu | `web/src/root-button-library.ts` | Chọn mẫu, tìm/lọc, trạng thái nhấn, loading giả lập, xem tên và đường dẫn nguồn |
| Bảng kê | `web/src/root-button-data.ts` | 88 mục minh họa đã chọn, 11 họ, nguồn CHAT/TAPHOA và selector |
| Ghép luồng | `index.html` | Thanh tác vụ CHAT; Bán hàng; Công nợ; Đơn hàng |

**Lưu ý:** `44×2` là số nút *được thể hiện trong thư viện hiện tại*, **không phải số lượng tất cả nút tồn tại trong runtime**. Các button source có thể có nhiều breakpoint, trạng thái quyền và thuộc tính do backend điều khiển; V14 chỉ mô phỏng hình dạng và cách phân loại. Nút Bán ngay/Thu tiền/Xóa tài khoản/Duyệt là **mẫu hình, không hoàn thành giao dịch**.

## Hành vi và kiểm thử cần bảo toàn

- Mọi nút tương tác tối thiểu **44px vùng chạm** trong dự án demo; icon glyph có thể nhỏ hơn vùng chạm.
- Có `hover`, `focus-visible`, `pressed`, `disabled`, `loading`, `success`, `warning/error`, `danger/confirm`; không phân biệt trạng thái chỉ bằng màu.
- Input tìm nút ít nhất **16px trên mobile**, không gây zoom focus; nhóm dữ liệu có `min-width:0`, văn bản dài được xuống dòng.
- Từ khóa lọc không có dấu vẫn tìm được; nhóm không có kết quả biến mất; không tạo thêm nhiều CSS nguồn.
- Không chép stylesheet/JS nghiệp vụ từ CHAT hoặc TAPHOA; không gọi Auth, Supabase, RPC, Storage, gửi tin nhắn, ghi thu hay tạo đơn. Các nút nguy hiểm chỉ hiển thị cảnh báo mẫu.
- Khi thêm icon/button mới, **định nghĩa trong registry/token rồi thêm entry catalog trước**. Sau đó các màn dùng lại class và icon đã có (RULE 06/07).
- CI bảo đảm 44 nút CHAT theo ID hiện đọc được, 44 ví dụ TAPHOA, 11 họ, 51 icon, các lớp CSS chung và không dùng kết nối mạng. Nghiệm thu trực quan trên Safari/Chrome iPhone/Android **chưa được xác nhận bằng kiểm thử tự động**.

**Nguồn tại chỗ:** CHAT [UI source map](https://github.com/1sl2tp/chat/blob/main/ui-library/README.md); [foundation](https://github.com/1sl2tp/chat/blob/main/ui-foundation.css); TAPHOA [sửa hình học giỏ hàng](https://github.com/1sl2tp/taphoaxyz/blob/main/src/fixed-ui-cart-spacing.css), [popup công nợ](https://github.com/1sl2tp/taphoaxyz/blob/main/src/fixed-ui-debt-popup.css), [mẫu hóa đơn](https://github.com/1sl2tp/taphoaxyz/blob/main/src/fixed-ui-invoice-templates.js). Đây là những tham chiếu mã nguồn thực; những tên và icon phác họa trong 2027 là **lựa chọn thiết kế mới**, không mặc định giống hệt app đang chạy.

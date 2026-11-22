# Kiểm kê thư viện UI 2027 · V26 (22/11/2026)

## Đã kiểm trực tiếp
Nguồn hiện tại: `index.html`, `web/src/simple-gallery.ts`, `web/src/ui-patterns.ts`, `web/src/simple-fields.ts` của `1sl2tp/2027`; [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui/tree/main/src/components), [assistant-ui](https://github.com/assistant-ui/assistant-ui) và các tài liệu component đọc trực tiếp từ GitHub.

### Màn chọn nhanh
- Mục 1: 10 mẫu cỡ chữ/font.
- Mục 2: 45 mẫu nhiều dòng/kiểu chữ.
- Mục 3: 12 mẫu gạch chân/liên kết.
- Mục 4: 24 mẫu khung viền/bong bóng.
- **Mục 5 (V26): 12 mẫu ô nhập/số lượng**, có thể gõ để thử.

### Thư viện nâng cao
`web/src/ui-patterns.ts` đã có 35 mẫu tĩnh thuộc 9 nhóm: typography 2, buttons 4, fields 3, chat 4, commerce 3, invoices 13, workflow 3, settings 1, overlays 2. Không nên bỏ hoặc tạo bản sao vô nghĩa; cần chuyển từng bộ mẫu quan trọng sang giao diện chọn đơn giản.

## Đối chiếu OpenAI Apps SDK UI
- [Input API](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Input/Input.tsx): hai biến thể `outline` và `soft`, kích cỡ 22–48px, `pill`, `startAdornment`/`endAdornment`, `disabled`, `invalid`. [CSS](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Input/Input.module.css) sử dụng viền `inset box-shadow` và nêu lưu ý iOS zoom nếu input nhỏ hơn 16px.
- [Textarea docs](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Textarea/Textarea.mdx): nhiều dòng, `autoResize`, `rows`, `maxRows`, `invalid`, `disabled`.
- [Select docs](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Select/Select.mdx): bộ chọn, tùy chỉnh trigger, nhóm tùy chọn và nhiều lựa chọn.
- [assistant-ui mobile composer](https://www.assistant-ui.com/elements/mobile-composer): vùng gõ điện thoại có thanh thao tác thu gọn khi có bàn phím.
- Các component chính thức này thuộc thư viện **Apps SDK UI**, không phải bản mã nội bộ đầy đủ của chatgpt.com.

## Mẫu V26 (phân nguồn)
- FIELD-01–07: Input outline, soft, pill, tìm kiếm icon trước, xóa icon sau, invalid, disabled — tham khảo OpenAI Apps SDK UI.
- FIELD-08: Textarea nhiều dòng tự tăng chiều cao — tham khảo OpenAI Apps SDK UI.
- FIELD-09: ô tiền tự chèn dấu `.` nhưng giữ giá trị số thô — biến thể 2027, không phải Input gốc.
- FIELD-10: bộ số lượng `− / +` có giới hạn không âm — biến thể 2027.
- FIELD-11: composer nhắn tin xem thử tại chỗ, không gửi tin thật — tham khảo bố cục assistant-ui, không phải mã nguồn của OpenAI.
- FIELD-12: chọn nhóm bằng native `select` — bản đơn giản để so sánh; **không** phải clone đầy đủ Select React của Apps SDK.

Chỉ cập nhật mẫu UI 2027, không kết nối cơ sở dữ liệu, không gửi tin và không deploy CHAT/TAPHOA. Ô nhập mẫu có cùng base `.simple-field-shell` để viền, padding, focus, bo góc nhất quán.

## Các nhóm tiếp theo nên thêm, theo thứ tự
1. **Nút + icon**: đủ dạng tròn, vuông, pill, ghost/soft/outline/solid, có icon đầu/cuối, loading/disabled, phân cấp thao tác. Trước khi viết lại, tái sử dụng BTN-01 đến BTN-04 và `web/icons.svg`.
2. **Điều hướng + bố cục hàng**: avatar/tên/dòng phụ/trạng thái số, vùng trái/giữa/phải, cuộn mobile với bàn phím, tab/chọn và danh sách; kiểm tra thứ bậc và overflow.
3. **Media/đính kèm**: ảnh đơn lẻ, lưới 2–4 ảnh, file, preview chờ gửi, gửi lỗi, zoom; chỉ mô phỏng, không tự tải file thật.
4. **Bảng/dữ liệu/đơn**: bảng có và không có viền, cột số/tiền, co giãn từ desktop sang mobile; đối chiếu 13 mẫu hóa đơn đã có.
5. **Menu/Popup + trạng thái**: menu cấp 1–4, hộp xác nhận, loading/error/empty/success; keyboard focus và xử lý Esc.

Giữ quy trình **mỗi lần một nhóm**; không trộn các nhóm vào một trang điều khiển mới.

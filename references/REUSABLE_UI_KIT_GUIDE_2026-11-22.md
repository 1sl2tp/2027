# 2027 · Hướng dẫn lấy mẫu UI để dùng lại (V15)

Đây là **hướng dẫn sử dụng / bảng kiểm kê kỹ thuật**, không phải file rule song song; quy tắc chuẩn tắc thuộc [`RULES.md`](../RULES.md), RULE 06–08.

## Mở trực tiếp

- [**Bộ mẫu gốc — Lấy mã**](https://1sl2tp.github.io/2027/#sample-patterns): chọn một trong 32 mẫu thuộc 9 họ, thấy preview và mã HTML tương ứng, sao chép HTML hoặc xuất JSON danh mục.
- [**Nút & biểu tượng**](https://1sl2tp.github.io/2027/#sample-actions): 88 nút tham chiếu từ nguồn CHAT/TAPHOA, xem tên/selector/nguồn; nhóm nút không đồng nghĩa toàn bộ chức năng runtime.
- [**Hàng & bố cục**](https://1sl2tp.github.io/2027/#sample-layouts): mẫu thanh thao tác lắp ghép theo Chat / Bán hàng / Công nợ / Đơn hàng.
- [**Ô nhập & gõ chat**](https://1sl2tp.github.io/2027/#sample-inputs): bốn composer và các input mẫu.

## Sơ đồ các cấp

```text
01 Design tokens (web/styles.css) · Font / màu / focus / spacing / kích thước
         ↓
02 Icon registry (web/icons.svg) · SVG theo mã ui-icon-*
         ↓
03 UI primitives (web/styles.css) · ui-button, ui-icon, ds-field, ds-qty
         ↓
04 Compositions (ui-patterns.ts → HTML + CSS)
         ↓
05 Các luồng Chat / Công việc / Bán hàng (dùng lại, không copy CSS)
```

Một mẫu có `id`, `group`, `title`, `description`, `html` trong `web/src/ui-patterns.ts`. **HTML preview chính là HTML được sao chép.** Không có hai nguồn template riêng. Các class `ds-*` dùng chung token và primitive `ui-*` đã có.

## Danh mục 22 mẫu dùng lại

| Họ | Mã mẫu | Công dụng |
|---|---|---|
| Chữ/trạng thái | TEXT-01 / TEXT-02 | Vai trò chữ, số tiền và nhãn trạng thái |
| Nút/thao tác | BTN-01 / BTN-02 / BTN-03 / BTN-04 | Cấp nút, toolbar, số lượng, segmented |
| Nhập liệu | INPUT-01 / INPUT-02 / INPUT-03 | Tìm kiếm, mật khẩu, số tiền |
| Chat/media | CHAT-01 / CHAT-02 / CHAT-03 / CHAT-04 | Danh bạ, tin, composer, ảnh chờ gửi |
| Bán hàng | SALE-01 / SALE-02 / SALE-03 | Hàng sản phẩm, bảng đơn, hóa đơn tổng |
| Hóa đơn & phiếu | INV-00…INV-09 | 4 palette hóa đơn, bảng kẻ, mobile, đơn tạm, đã giao, đối soát, công nợ |
| Công việc | WORK-01 / WORK-02 / WORK-03 | Công nợ, kiểm hàng, báo giá |
| Cài đặt | SETTING-01 | Công tắc với aria-pressed |
| Popup/trạng thái | OVERLAY-01 / OVERLAY-02 | Xác nhận và thông báo cục bộ |

**Phân biệt nguồn:** 32 mẫu trên là *mã mới của 2027* được thiết kế từ ngữ cảnh CHAT/TAPHOA; không phải 22 component đã được chuyển nguyên code từ app thật. 88 mục nút V14 là **bản đồ tham chiếu theo mã nguồn**, không phải bộ runtime được chuyển sang production. Việc dùng bản thiết kế chỉ là cơ sở để chuẩn hóa qua các PR có kiểm soát.

## Cách đưa một mẫu vào app thật

1. Chọn mẫu và xem trực tiếp đúng form mình muốn; nhấn **Sao chép HTML**.
2. Lấy một lần hai tài nguyên từ kho:
   - [`web/styles.css`](https://github.com/1sl2tp/2027/blob/main/web/styles.css) — CSS gốc của preview
   - [`web/icons.svg`](https://github.com/1sl2tp/2027/blob/main/web/icons.svg) — icon source
3. **Không** dán mỗi CSS phần tử vào nhiều màn hoặc import cả CSS mà không kiểm tra. `web/styles.css` hiện còn chứa shell/style của trang demo, nên khi ứng dụng thật cần tích hợp phải kiểm tra selector xung đột, phần reset, load order, build/WebView và theme; tốt hơn là phân lớp/tách build từ cùng một nguồn theo PR riêng. Điều này **chưa được tích hợp vào CHAT/TAPHOA**.
4. Chỉnh đường dẫn `./web/icons.svg#ui-icon-...` cho đúng asset base path của app đích. Hạn chế phụ thuộc vào đường dẫn tuyệt đối từ GitHub Pages nếu app cần offline/PWA.
5. Thay các text thử bằng dữ liệu ứng dụng, gắn handler gốc và kiểm thử các trường hợp quyền, loading/error, bàn phím, viewport nhỏ, safe area. Không dùng nút bấm giả lập của 2027 để ghi nợ, thu tiền hay gửi chat.
6. Nếu thay đổi primitive, cập nhật `web/styles.css` và các mẫu/kiểm thử tại nguồn. **Không tạo phiên bản nút mới bằng cách chèn một selector override riêng cho mỗi màn.**

## Nghiên cứu ngoài — nguyên tắc tham khảo, không sao chép mã

- [GitHub Primer · Foundations](https://primer.style/product/getting-started/foundations/) — tổ chức token màu, chữ và component.
- [Meta Engineering · StyleX at CSS Scale](https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/) và [Meta StyleX trên GitHub](https://github.com/meta/stylex) — sở hữu CSS có cấu trúc, giá trị dùng lại, kiểm soát xung đột. **2027 chưa dùng StyleX runtime/compiler**.
- [Brad Frost · Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) — một cấp xây dựng từ cấp nhỏ hơn, đồng thời tồn tại trong hệ thống.
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) — nguyên tắc component có hợp đồng hành vi và khả năng truy cập.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — khả năng tiếp cận, focus và target size. Mốc **44px** của kit là quyết định ưu tiên cho mobile, không đồng nghĩa tiêu chí WCAG AA áp đặt mọi target phải 44px.
- [Bản đồ nguồn nút CHAT/TAPHOA](./CHAT_TAPHOA_BUTTON_SOURCE_CATALOG_2026-11-22.md) — 44 mục CHAT và 44 mẫu TAPHOA đã đối chiếu.

## Những phần còn chưa hoàn tất

- Chưa tự động chuyển toàn bộ 246 thành phần được kiểm kê trong thư viện CHAT thành `ui-*`/`ds-*` runtime; TAPHOA còn nhiều màn chưa rà soát hết.
- Chưa loại bỏ CSS patch/override trong hai app thật, chưa áp dụng chung build asset khi offline/PWA/APK, chưa đo hiệu năng và chưa nghiệm thu trực quan trên Safari/Chrome iPhone/Android.
- Không dùng bản sao giao diện/screenshot của GitHub, Facebook, ChatGPT hoặc Gemini làm source CSS chính. Đây là **bộ quy ước của 2027**, có nguồn tham khảo rõ ràng.

Nếu cần bổ sung mẫu mới, thêm vào `web/src/ui-patterns.ts` một `id` thuộc nhóm rõ, dùng class chung, bổ sung CSS cấp primitive khi thật sự cần, cập nhật preview + kiểm thử (RULE 08).

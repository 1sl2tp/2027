# 2027 — Thư viện UI/UX và ba bộ khung liên thông

**2027 là dự án thử nghiệm giao diện**, tách biệt với CHAT/TAPHOA thật. Hiện có hai trang Web:

- **[Chữ & màu nền](https://1sl2tp.github.io/2027/)** — `index.html`, bản xem trực tiếp font, cỡ chữ, độ đậm, giãn dòng và palette.
- **[Ba bộ khung liên thông](https://1sl2tp.github.io/2027/flows.html)** — `flows.html`: Đăng nhập mẫu → Chat / Công việc / Bán hàng. Chọn **Rộng/Mobile** và thử các thao tác.

## Cấu trúc và quyền sở hữu

```text
web/styles.css           ← MỘT CSS cho thư viện, các thành phần và 3 luồng
index.html               ← Trang mẫu font / màu (V03)
flows.html               ← Trang xem ba khung (V04)
web/src/app.ts           ← Điều khiển trang font / màu
web/src/flows.ts         ← Một state mẫu chung cho ba mô-đun
web/dist/*.js            ← Đầu ra TypeScript khi chạy npm run build
tests/layout.test.mjs    ← Kiểm thử cấu trúc và gói phát hành
```

CSS chỉ quản lý giao diện: typography, token màu, viền, khoảng cách, bố cục, vùng chạm và breakpoint. **CSS không liên kết dữ liệu hoặc nghiệp vụ.** Một state TypeScript trong `flows.ts` liên kết các màn:

```text
Đăng nhập (chỉ demo, không mật khẩu)
      ↓
App Shell: header + khách hàng đang chọn + menu dùng chung
      ├── 01 Chat: danh bạ → hội thoại → thêm text/ảnh mẫu
      ├── 02 Công việc: thu mẫu / tổng hợp / ảnh đơn / công nợ / báo giá
      └── 03 Bán hàng: chọn SP → đơn tạm → đã giao → công nợ / cài đặt
                 └─────┬─────────────────────────────┘
           Khách hàng · sản phẩm · đơn hàng · khoản thu
                         ↓
            Công nợ = đơn đã giao - thu mẫu
                         ↓
               Ảnh đơn (PNG local) → Chat mẫu
```

Các mô-đun chỉ đổi view và sử dụng cùng object khách, hàng, đơn, tiền; không sao chép CSS hay tạo cơ sở dữ liệu thứ hai. Ví dụ: thêm SP tạo đơn tạm → duyệt giao cập nhật công nợ → thử thu tiền giảm công nợ ở **cả Công việc và Bán hàng** → xuất ảnh PNG từ đơn đã giao vào hội thoại mẫu. Danh bạ chọn khách cũng thay đổi ngữ cảnh ở hai vùng còn lại.

**Các chức năng chỉ là mô phỏng trong trình duyệt.** Không có Auth, Supabase, gửi tin/media thật, OCR, ghi thu thật, phát hành đơn thật, nhập sản phẩm production hay lưu dữ liệu sau khi tải lại trang. Ảnh người dùng chọn chỉ được hiện cục bộ; nút tạo ảnh đơn sử dụng Canvas trên thiết bị. Bản APK Android hiện tại là một khung native riêng, chưa được đồng bộ giao diện ba mô-đun V04.

## Chạy và kiểm thử Web

```bash
npm install
npm run verify
python3 -m http.server 8000
```

Mở `http://localhost:8000/` (thư viện font) hoặc `http://localhost:8000/flows.html` (ba khung). `npm run verify` chạy kiểm thử Node rồi biên dịch TypeScript từ `web/src/*.ts` sang `web/dist/*.js`.

Workflow `.github/workflows/pages.yml` kiểm thử và đóng gói cả hai trang, **chỉ một stylesheet** và toàn bộ JS đã biên dịch. URL trên chỉ được coi là bản mới sau khi Pages deploy thành công.

## Android (khung từ các vòng trước)

```bash
cd android
gradle assembleDebug
```

Yêu cầu JDK 17, Android SDK 35, Gradle 8.11.1. V04 là cập nhật Web Library; APK native cần được thiết kế và kiểm thử riêng trước khi có thể coi là tương đương.

## Ghi chú thiết kế

[**RULES.md**](./RULES.md) chứa nguyên tắc UI/UX R01–R03. V04 đang minh họa các nguyên tắc đó; không tạo một hệ rule song song. Việc xem/nghiệm thu trên thiết bị iOS/Android thật khác với việc CI compile thành công.

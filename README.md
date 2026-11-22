# 2027 — Thư viện UI/UX và ba bộ khung liên thông

**2027 là dự án thử nghiệm giao diện**, tách biệt với CHAT/TAPHOA thật. Hiện có hai trang Web:

- **[Văn bản mẫu và thành phần](https://1sl2tp.github.io/2027/)** — `index.html`, **UI-V08**: một văn bản giống phong cách trình bày ChatGPT, chọn và chỉnh riêng 10 loại nội dung; bên dưới có thư viện mẫu thành phần: 6 bảng, 5 ô số lượng −/+, 6 ô input, chữ 1–4 dòng, icon + chữ + vùng phụ, nút, tìm kiếm, chat, menu và popup.
- **[Ba bộ khung liên thông](https://1sl2tp.github.io/2027/flows.html)** — `flows.html`: Đăng nhập mẫu → Chat / Công việc / Bán hàng. Chọn **Rộng/Mobile** và thử các thao tác.




## Sửa thống nhất viền focus input (UI-V08)

Ảnh lỗi từ Safari cho thấy khi chọn số lượng ở mẫu số 01 và số 05, viền xanh `input:focus-visible` xuất hiện **bên trong** nhóm `− | số | +`, che đường phân cách và tạo hiệu ứng đứt viền. V08 sửa tận gốc tại **`web/styles.css` dùng chung**: nhóm có một viền focus bao quanh toàn khối, ô nhập số bên trong không còn outline/shadow riêng; hai nút −/+ trong nhóm cũng dùng dấu focus của nhóm. Input chữ có icon và tìm kiếm dùng cùng quy tắc; input đơn lẻ và các ô rời vẫn hiển thị focus quanh chính ô đó để phục vụ điều hướng bàn phím. Chuẩn hóa `appearance: textfield` trên Safari. Không thay đổi tính toán số lượng, dữ liệu hoặc app production.

## Tham chiếu ba hệ UI lớn

Đã đối chiếu bản lưu **ChatGPT × Facebook × Gemini** trong [Google Drive – UI 2027](https://drive.google.com/drive/folders/1uPNFbeA_lbJjIEZW0O__g4lTWWXJEVSj?hl=vi). Bảng nguồn cụ thể: [`references/CHATGPT_FACEBOOK_GEMINI_UI_COMPARISON_2026-11-22.md`](./references/CHATGPT_FACEBOOK_GEMINI_UI_COMPARISON_2026-11-22.md). Các nguyên tắc được ghi vào **RULE 04** của `RULES.md`, không tạo thêm file rule. Tài liệu tách rõ biến CSS từ bản lưu và đề xuất cho 2027; chưa đổi giao diện V08 hoặc ứng dụng CHAT production.

## Tham chiếu ChatGPT từ Google Drive

[Đối chiếu ảnh hiện tại với thư viện CSS đã lưu tháng 9/2026](./references/CHATGPT_UI_SOURCE_AUDIT_2026-11-22.md): có nguồn, bảng màu, thang chữ, spacing, shell, composer, icon, bảng, menu và quy tắc đối chiếu ảnh tiếp theo. Đây là tài liệu phân tích, **chưa tự ý áp lại toàn bộ giao diện demo hoặc CHAT production**.

## Bộ sưu tập biến thể thành phần UI-V07

Tập trung xây dựng các mẫu **so sánh song song** trên trang chính; không thay thế luồng nghiệp vụ V04.

- **6 mẫu bảng:** kẻ ô dọc/ngang, không viền, hàng xen kẽ, mật độ cao, thẻ xếp hàng cho mobile. Bảng có tên hàng căn trái, số lượng căn giữa và số tiền căn phải. Có nút chọn mẫu để đánh dấu.
- **5 kiểu nhập số lượng:** − / + trong một viền bo; dạng viên thuốc; các nút bo riêng; nút tròn tối giản; cùng tên sản phẩm trên một hàng. Có thể tăng/giảm/nhập độc lập; giới hạn mẫu 0–99.
- **6 kiểu input:** vuông, bo 10px, bo pill, chỉ gạch dưới, nền mờ, và icon + ô nhập + nút xóa. Cỡ input 16px khi gõ để phù hợp mobile.
- **4 mẫu chữ:** giới hạn 1, 2, 3, 4 dòng, ellipsis và thao tác xem đầy đủ/thu gọn. Không tự thay đổi nội dung gốc.
- **4 kiểu hàng icon-chữ:** chỉ icon+chữ; icon+chữ+mũi tên; icon+tiêu đề/nhãn phụ+trạng thái; icon+chữ+số tiền+menu.
- **4 bố cục nhiều vùng:** danh bạ, sản phẩm, công việc và khoản thu, minh họa phối hợp icon–chữ–phụ đề–số/nút/trạng thái.

Các mẫu đều kế thừa `--ui-font`, `--ui-bg`, `--ui-surface`, `--ui-text` và `--ui-border` từ hệ design tokens, **chỉ một `web/styles.css`**. Dữ liệu hiển thị và thao tác là thử nghiệm cục bộ, không tác động tài khoản CHAT/TAPHOA, Supabase hoặc hóa đơn thật. CI kiểm thử tĩnh và TypeScript; cần xem trên thiết bị thật trước khi chốt kích thước.

## Studio văn bản + thành phần (UI-V06)

**Thay đổi thứ tự làm việc:** ưu tiên xem **một văn bản mẫu thực tế** trước, thay vì tách thành nhiều bảng thông số. Một văn bản gồm: tiêu đề lớn, đoạn mở đầu, tiêu đề mục, đoạn nội dung, danh sách, bảng sản phẩm, số lượng, số tiền, ghi chú và nhãn phụ. Chọn phần trực tiếp hoặc chọn "Toàn văn bản"; bảng điều khiển bên cạnh thay đổi font, size, weight, in nghiêng, gạch chân, bật nền vùng, giãn dòng và giãn ký tự. Các thay đổi cục bộ được lưu thử trong localStorage. Đặt lại về mặc định.

**8 mẫu thành phần dùng chung CSS:**

1. Bảng đơn hàng có tiêu đề cột, đường kẻ và tiền căn phải.
2. Nút chính / phụ / chữ / disabled.
3. Icon vuông và tròn; vùng chạm minh họa 44×44 px.
4. Input số lượng 0–99 cùng nút tăng/giảm.
5. Tìm kiếm lọc danh sách sản phẩm mẫu ngay trong trình duyệt.
6. Input chat nhiều dòng, thêm tin nhắn mẫu mà không gửi ra ngoài.
7. Menu phụ mở bằng dấu ba chấm, đóng khi chọn, khi bấm ngoài hoặc Escape.
8. Popup `<dialog>` đóng bằng nút hoặc Escape, có hành động xác nhận mô phỏng.

**Nền tảng không đổi:** một tệp `web/styles.css`, token font và palette từ `web/src/design.ts`. Nút "Sao chép CSS" xuất token cùng CSS của mười loại nội dung. Trang luồng `flows.html` V04 vẫn giữ nguyên; chưa kết nối Supabase, không có tin hoặc giao dịch thật. Hệ số px chỉ là mẫu thử, không phải giá trị cố định của giao diện ChatGPT. Kiểm thử CI chưa thay thế nghiệm thu trên thiết bị thực.

## Hoàn thiện nền tảng màu & kiểu chữ (UI-V05)

- **Nguồn token duy nhất:** `web/src/design.ts` định nghĩa màu nền/nền thẻ/chữ chính/chữ phụ/viền, 4 họ font, kiểu thường/nghiêng, cỡ chữ, giãn dòng và giãn ký tự. Bộ CSS `web/styles.css` tiêu thụ các token bằng biến `--ui-*`, không tạo CSS riêng cho mỗi khung.
- **Kiểm tra tương phản:** mô-đun tự tính tỷ lệ WCAG 2.2 cho 4 cặp màu gồm chữ chính/nền, chữ phụ/nền, chữ phụ/nền thẻ, chữ trên nút chính. Toàn bộ palette gốc đã được chọn để từng cặp **đạt ít nhất 4.5:1** qua kiểm thử tự động. Đây không phải tuyên bố ứng dụng đã đạt tất cả tiêu chí WCAG.
- **Thử nghiệm:** chọn màu/font/đậm/nghiêng/size/line-height/tracking, sửa nội dung mẫu, chuyển mobile/rộng, xem vai trò màu và CSS theo lựa chọn. Các giá trị được lưu **cục bộ bằng localStorage**, reset xóa lựa chọn. Không gửi máy chủ.
- **Phạm vi:** hoàn thiện trước **trang mẫu nền tảng**. Các màn luồng V04 vẫn là bản mẫu trước đó; chưa coi việc chọn font/màu V05 là đã áp tự động lên tất cả khung V04 hoặc ứng dụng thật. Đồng bộ nâng cấp giao diện từng luồng là bước riêng sau khi duyệt bộ nền tảng.
- **Nghiệm thu:** CI kiểm tra cấu trúc và toán học tương phản; việc dùng thiết bị thật ở nhiều viewport, zoom/font scaling, bàn phím và dark mode phải kiểm chứng riêng.

## Cấu trúc và quyền sở hữu

```text
web/styles.css           ← MỘT CSS cho thư viện, các thành phần và 3 luồng
index.html               ← Văn bản mẫu + thành phần (V06)
flows.html               ← Trang xem ba khung (V04)
web/src/design.ts        ← Nguồn token màu/chữ, công thức tương phản, xuất CSS
web/src/app.ts           ← Điều khiển từng vùng văn bản và 8 mẫu thành phần
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

[**RULES.md**](./RULES.md) chứa nguyên tắc UI/UX R01–R04. V04 đang minh họa các nguyên tắc đó; không tạo một hệ rule song song. Việc xem/nghiệm thu trên thiết bị iOS/Android thật khác với việc CI compile thành công.

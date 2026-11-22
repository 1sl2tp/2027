# 2027 — Thư viện UI/UX và ba bộ khung liên thông

**2027 là dự án thử nghiệm giao diện**, tách biệt với CHAT/TAPHOA thật. Có ba trang chính và một phòng thử nguồn GitHub:

- **[Văn bản mẫu và thành phần](https://1sl2tp.github.io/2027/)** — `index.html`, **UI-V17**: một văn bản chỉnh font/nền như trước, bên dưới là **23 bộ mẫu được chia vào 9 nhóm** có thanh lọc, tìm kiếm tiếng Việt và điều hướng trực tiếp. Các mẫu cũ vẫn tương tác bình thường.
- **[Nguồn GitHub & phòng thử Chat UI](https://1sl2tp.github.io/2027/github-sources.html)** — `github-sources.html`, SOURCE-V01: đối chiếu 8 repo mở và thử khung chat, input, bàn phím giả lập, bảng, danh bạ 1–4 dòng, media 1–4 ảnh, menu/popup. [Audit và ranh giới áp dụng](./references/GITHUB_CHAT_UI_SOURCE_LAB_2026-11-22.md).
- **[Mẫu gốc 2027](https://1sl2tp.github.io/2027/base.html)** — `base.html`, V09, so sánh bốn preset trên một khung và cùng một CSS.
- **[Ba bộ khung liên thông](https://1sl2tp.github.io/2027/flows.html)** — `flows.html`: Đăng nhập mẫu → Chat / Công việc / Bán hàng. Chọn **Rộng/Mobile** và thử các thao tác.





## Mẫu chữ đang tải và Streaming (UI-V32)

**[Mở mục 7 — Chữ đang chạy & trạng thái tải](https://1sl2tp.github.io/2027/#simpleMotion)**: sáu mẫu thử chạy cục bộ (waiting dots, chữ shimmer, skeleton, chữ theo từ + caret, khối nội dung + caret, và vòng đời chờ → streaming → hoàn tất/dừng). Mỗi mẫu có nút Chạy thử/Dừng, không gửi tin thật hay dùng API AI.

- Nguồn phân loại và hành vi được ghi chuẩn tắc ở **RULE 11** trong [RULES.md](./RULES.md).
- [Báo cáo đối chiếu 6 GitHub repo](./references/TEXT_STREAMING_SOURCE_AUDIT_V32.md): Streamdown của Vercel (Apache-2.0), assistant-ui (MIT), Streamdown của LobeHub (MIT), Vercel AI Elements (Apache-2.0), OpenAI Apps SDK UI (MIT), Lumi-UI (Apache-2.0).
- Bản thử dùng TypeScript và CSS cùng thư viện 2027. Mã không cài React, không sao chép asset/hiệu ứng độc quyền ChatGPT và **chưa có renderer Markdown đang streaming thật**.
- `prefers-reduced-motion`: hiện ngay nội dung mẫu; stop dừng timer, giữ phần đã hiển thị, con trỏ biến mất khi xong. Chờ nghiệm thu trên Safari/Chrome mobile thực tế.

## Mẫu gốc dùng chung 2027 (UI-V09)

- [**Mở mẫu gốc**](https://1sl2tp.github.io/2027/base.html) · một khung giao diện chuẩn gồm header/rail/sidebar, nội dung Chat, Công việc, Bán hàng, bảng, nút, icon, input, stepper số lượng, composer, menu và popup.
- Chọn **Gốc 2027 / ChatGPT / Facebook / Gemini** để so sánh trực tiếp trên đúng cùng cấu trúc và dữ liệu mẫu. Đây là các bộ token `2027` thiết kế theo nghiên cứu nguồn, không phải stylesheet hay bản sao chính thức của ba hãng.
- Cả bốn phương án dùng chung `web/styles.css` và `web/src/base.ts`; không cài hệ CSS khác. Có chọn Rộng/Mobile, nhập chat cục bộ, đổi mô-đun, tăng/giảm số lượng, tìm kiếm, mở menu/popup, sao chép token, đặt lại.
- **Đã lưu gốc V08** tại nhánh [`archive/ui-v08-original-before-foundation-20261122`](https://github.com/1sl2tp/2027/tree/archive/ui-v08-original-before-foundation-20261122), commit [`7e10663b72e85c63621462048a262897f36c3182`](https://github.com/1sl2tp/2027/commit/7e10663b72e85c63621462048a262897f36c3182).
- Danh mục [**nguồn gốc Drive + mốc phục hồi**](./references/ORIGINAL_UI_SOURCES_AND_BASELINE_2026-11-22.md). Không sao chép trọn CSS/HTML nhúng từ Save Page hoặc thay đổi các tệp nguồn trong Drive.

**Ranh giới:** mẫu UI chỉ chạy tại máy người xem, chưa kết nối CHAT/TAPHOA, không gửi tin nhắn hoặc làm phát sinh khoản thu/đơn hàng thật. Bản V08 đang có ở trang chính được giữ nguyên; V09 là một trang mới.

## Thư viện bảng hóa đơn và phiếu (UI-V16)

**Xem ngay:** [Bảng hóa đơn & phiếu](https://1sl2tp.github.io/2027/#sample-invoices). Nhóm này có **13 mẫu hóa đơn/phiếu**, chọn một mẫu để xem trực tiếp, sao chép HTML hoặc in thử bản đen trắng.

- **INV-00** — bản gốc đen trắng chuẩn in.
- **INV-01** — tối giản chỉ kẻ ngang.
- **INV-02** — Business Navy.
- **INV-03** — Retail Green.
- **INV-04** — bảng 5 cột có kẻ ô đầy đủ.
- **INV-05** — bảng gọn trên điện thoại.
- **INV-06** — đơn tạm chưa gửi.
- **INV-07** — đơn đã giao.
- **INV-08** — phiếu kiểm / đối soát số lượng và ghi chú.
- **INV-09** — hóa đơn kèm công nợ, số đã thu và còn phải thanh toán.
- **INV-10** — STT · TÊN · GIÁ · SL · THÀNH TIỀN, bảng đen trắng kẻ ô.
- **INV-11** — STT · TÊN · GIÁ · SL · THÀNH TIỀN, bảng tối giản kẻ ngang.
- **INV-12** — STT · TÊN · GIÁ · SL · THÀNH TIỀN, bảng gọn trên điện thoại.

Bốn màu đầu tiên tham khảo **bộ palette thực tế** ở [TAPHOA `src/fixed-ui-invoice-templates.js`](https://github.com/1sl2tp/taphoaxyz/blob/main/src/fixed-ui-invoice-templates.js): đen trắng, Tối giản, Business Navy và Retail Green. Hình học và cấu trúc HTML do `2027` dựng từ yêu cầu, **không phải bản sao pixel của ảnh hóa đơn đang xuất trong TAPHOA**. Trục bảng dựa trên [semantic columns](https://github.com/1sl2tp/taphoaxyz/blob/main/src/fixed-ui-semantic-columns.css): STT giữa, tên trái, SL giữa, đơn giá và thành tiền phải, chữ số dạng tabular.

**Hai thứ tự cột đều được giữ làm mẫu riêng:** STT–TÊN–SL–GIÁ–THÀNH TIỀN (V16) và STT–TÊN–GIÁ–SL–THÀNH TIỀN (V17). Cả phần header, giá và số lượng ở từng dòng được hoán đổi thật, không chỉ thay chữ. Định nghĩa `.ds-invoice-table--price-first` trong CSS chung dùng cho kẻ ô, tối giản và mobile; số tiền, phép tính và mẫu gốc V16 không đổi.

Đồng thời [Bộ mẫu gốc · Lấy mã](https://1sl2tp.github.io/2027/#sample-patterns) đã có **35 mẫu/9 nhóm**, trong đó có đủ **INV-00…INV-09**. Hai màn hình dùng cùng `web/src/ui-patterns.ts`; CSS hóa đơn chỉ ở `web/styles.css`. Xuất JSON của bộ mẫu chuyển sang V17, gồm các mẫu hóa đơn mới. Phần in chỉ in bản mẫu, không tạo đơn thật, không gửi ảnh đơn và không ghi thu. **RULE 09** kiểm soát bảng và print.

## Bộ mẫu gốc có thể lấy mã trực tiếp (UI-V15)

**Mở tại [Bộ mẫu gốc · Lấy mã](https://1sl2tp.github.io/2027/#sample-patterns).**

Bản V15 bổ sung **35 mẫu HTML đã phân loại trong 9 nhóm** để đưa vào nhiều màn mà không phải tự viết lại từng nút/ô nhập. Cùng một định nghĩa trong `web/src/ui-patterns.ts` dùng cho **preview và nút Sao chép HTML**. Có chọn nhóm, tìm kiếm (có/không dấu), thử một số trạng thái tương tác, sao chép hướng dẫn kết nối CSS/icon, xuất JSON danh mục và mở mã của từng mẫu.

**Mẫu hiện có:** chữ/trạng thái (2), nút/thanh công cụ/số lượng/tabs (4), nhập liệu (3), chat/media (4), bảng/bán hàng (3), **hóa đơn & phiếu (13)**, công việc/công nợ/báo giá (3), cài đặt (1), popup/phản hồi (2). Các mẫu mới sử dụng class `.ui-*` và `.ds-*`, một `web/styles.css` và một `web/icons.svg` **không có bộ CSS riêng cho CHAT và TAPHOA**.

Tham khảo kiến trúc thiết kế: [GitHub Primer](https://primer.style/product/getting-started/foundations/), [Meta StyleX](https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/), [Brad Frost Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) và [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction). Chỉ tham khảo nguyên tắc dùng lại, không copy code vendor hoặc khẳng định tương đương CSS Meta/Facebook.

**Hướng dẫn thực hiện và giới hạn:** [`references/REUSABLE_UI_KIT_GUIDE_2026-11-22.md`](./references/REUSABLE_UI_KIT_GUIDE_2026-11-22.md). **RULE 08** trong `RULES.md` kiểm soát nguồn mẫu, lớp CSS, yêu cầu kiểm thử và cách kết nối vào app thật. Hiện 2027 chưa tự động chuyển toàn bộ code CHAT/TAPHOA thành component đã chia sẻ; không thay thế handler nghiệp vụ production.

## Bộ danh mục nút gốc CHAT & TAPHOA (UI-V14)

**Xem trên trang:** [Nút & biểu tượng](https://1sl2tp.github.io/2027/#sample-actions) → chọn bộ **Danh mục nút gốc CHAT & TAPHOA**; [Hàng & bố cục](https://1sl2tp.github.io/2027/#sample-layouts) có bốn thanh nút lắp ghép.

- Đã đọc **44 mục nút CHAT có ID `I01–I44`** từ [thư viện CHAT gốc](https://github.com/1sl2tp/chat/blob/main/ui-library/index.html) và **44 ví dụ nút TAPHOA được chọn lọc** từ các file giao diện thật. Tổng **88 mục tham chiếu**, chia **11 họ** để tìm kiếm; *không tuyên bố đã liệt kê toàn bộ mọi nút trong TAPHOA*.
- Có bộ lọc **CHAT / TAPHOA / Cả hai**, ô tìm kiếm có/không dấu, lựa chọn từng họ, bảng nút thu gọn/mở rộng; bấm nút sẽ xem tên, primitive, selector và tệp nguồn GitHub.
- Thêm **ma trận trạng thái** (mặc định, đã chọn, loading, hoàn tất, lỗi, disabled, nguy hiểm, chờ xác nhận); **thanh nút** ghép từ primitive cho CHAT, Bán hàng, Công nợ và Đơn hàng.
- **Một CSS và một icon registry:** `web/styles.css` sở hữu toàn bộ màu/cỡ chữ/viền của nút, `web/icons.svg` có 51 symbol; `web/src/root-button-data.ts` là bản đồ source, `web/src/root-button-library.ts` chỉ điều khiển lọc và phản hồi mẫu.
- [**Bảng kiểm kê nguồn + phạm vi**](./references/CHAT_TAPHOA_BUTTON_SOURCE_CATALOG_2026-11-22.md); quy tắc bổ sung nằm trong **RULE 07** ở `RULES.md` (không tạo tệp rules thứ hai).

**An toàn:** các nút CHAT/TAPHOA trong trang thử không liên kết đến API, không gửi tin thật, không thu tiền, không tạo/giao đơn, không gọi điện, không sửa tài khoản. Nút nguy hiểm chỉ minh họa ngoại hình và trạng thái. Việc xem giao diện thật trên mobile/Safari là bước nghiệm thu riêng.

## Thanh nút sao chép, chia sẻ, tải xuống và Loading (UI-V13)

Trang [**Nút & biểu tượng**](https://1sl2tp.github.io/2027/#sample-actions) thêm một bộ mẫu chứa ba trạng thái:

- **Cụm thao tác gọn dưới tin nhắn:** Sao chép, Thích, Không thích, Đọc nội dung (chỉ minh họa trạng thái), Chia sẻ và nút ba chấm để mở menu phụ.
- **Các nút có nhãn:** Sao chép, Chia sẻ, Tải xuống. Chia sẻ sử dụng hộp thoại native của trình duyệt nếu hỗ trợ; Sao chép sử dụng clipboard với thông báo khi bị từ chối; Tải xuống tạo **tệp TXT mẫu trên thiết bị**, không truy cập API.
- **Loading / hoàn tất / disabled:** bấm Loading để xem icon đang quay rồi chuyển thành dấu tích; có nút tải TXT và nút bị vô hiệu để so sánh trạng thái.

Trang [**Hàng & bố cục**](https://1sl2tp.github.io/2027/#sample-layouts) cũng có một mẫu tin nhắn với đúng **cùng thanh thao tác gốc** bên dưới nội dung. SVG được đăng ký tại `web/icons.svg`, các biến thể dùng lại `.ui-button`, `.ui-button--message-action`, `.ui-action-strip` trong **một `web/styles.css`**; xử lý mẫu ở `web/src/action-gallery.ts`.

**Phân biệt:** *Loading* là trạng thái xử lý mô phỏng, *Tải xuống* là hành động tạo file TXT cục bộ. Không sao chép/đăng tải dữ liệu khách thực; trình diễn đọc nội dung không phát tiếng hoặc gọi micro. Việc chia sẻ chỉ kích hoạt sau khi người dùng bấm và qua giao diện hệ điều hành, không tự gửi.

## Nút & biểu tượng dùng chung cho ô chat (UI-V12)

**Đã đưa nút +, chữ Cao/chevron, mic và mũi tên gửi về đúng nhóm [Nút & biểu tượng](https://1sl2tp.github.io/2027/#sample-actions)** thành một bộ mẫu chủ. Cả 4 ô gõ chat tại [Ô nhập & gõ chat](https://1sl2tp.github.io/2027/#sample-inputs) dùng lại chính các class `.ui-button`, `.ui-icon` và cùng sprite SVG.

- **Một nguồn kích cỡ:** `web/styles.css` sở hữu hệ `--ui-control-*`: nút chạm 44px, vòng tròn gửi 36px, mũi tên 20px, plus 22px, mic 19px, chữ Cao 14px, chevron 13px. Không định nghĩa cỡ nút lại bên trong `.composer-*`.
- **Một nguồn hình dạng icon:** `web/icons.svg` có các symbol dùng chung, được Pages đóng gói; các nút không dùng chữ “↑”, “⌄” tự vẽ rời. `web/src/composer-gallery.ts` chỉ đổi trạng thái icon send/voice/stop; không thao tác mạng.
- **Phân loại trước khi bổ sung:** [danh mục component kỹ thuật](./references/UI_COMPONENT_CATALOG_2026-11-22.md) ánh xạ từ token → icon → button → thành phần ghép → luồng. **RULE 06** ở `RULES.md` yêu cầu mẫu mới vào đúng danh mục và kế thừa từ component chủ.
- **Phạm vi:** trang thư viện chính đã đồng bộ hệ nút (cả popup/menu), nhưng hai khung lịch sử `base.html` V09 và `flows.html` V04 chưa di chuyển hoàn toàn sang bộ primitive mới. Chưa kiểm chứng pixel trên Safari/Chrome thiết bị thật.

## Bốn mẫu ô gõ chat có media (UI-V11)

Trang xem trực tiếp: **[Ô nhập & gõ chat](https://1sl2tp.github.io/2027/#sample-inputs)**. Thêm một bộ mẫu mới vào danh mục Input (không chuyển sang trang khác), gồm bốn trạng thái:

1. **01 — Gọn:** composer nhỏ một hàng, textarea tự nở, các nút + / chế độ / mic / gửi luôn nằm trong cùng khung.
2. **02 — Có một ảnh:** một thumbnail nằm trên vùng gõ, có nút × để xóa. Nút + cho chọn ảnh trong thiết bị, chỉ xem cục bộ.
3. **03 — Nhiều ảnh:** tối đa bốn thumbnail, nằm cùng hàng cuộn ngang, không chồng nổi lên vùng nhập.
4. **04 — Trạng thái gửi/ghi âm:** có nội dung mẫu và trạng thái gửi giả lập, nút mic chỉ thay đổi biểu tượng/trạng thái, không truy cập micro.

**Dùng thật ở trang demo:** tăng chiều cao theo nội dung, chọn ảnh từ thiết bị (mỗi ảnh tối đa 10 MB), xóa ảnh, đổi nhãn chế độ, thử mic, gửi giả lập và thông báo kết quả. Ảnh dùng temporary `URL.createObjectURL` và được thu hồi khi xóa hoặc rời trang; không upload, không lưu, không gọi API. Định dạng ghép vào **một tệp CSS chung** `web/styles.css`, TypeScript chuyên trách `web/src/composer-gallery.ts` được khởi tạo từ `web/src/app.ts`. Trang `base.html` và `flows.html` vẫn giữ nguyên.

## Danh mục xem mẫu nhanh (UI-V10)

**Trang chính:** [2027 UI Library](https://1sl2tp.github.io/2027/#components). Bản V10 chỉ thay cách xem thư viện, **không xóa hoặc viết lại thành phần V08**. Có thanh chọn danh mục, số mẫu trong mỗi nhóm, ô tìm kiếm bỏ dấu tiếng Việt và thông báo khi không tìm thấy. Trên mobile thanh chọn danh mục cuộn ngang; có thể mở trực tiếp một nhóm qua liên kết `#sample-...`.

| Nhóm | Mẫu hiện có |
|---|---|
| Chữ & nhiều dòng | 1 bộ chữ giới hạn 1–4 dòng, ngoài mẫu văn bản đầy đủ ở đầu trang |
| Bảng & dữ liệu | 2 bộ (bảng cơ bản + 6 biến thể) |
| Số lượng − / + | 2 bộ (nhập số cơ bản + 5 kiểu) |
| Ô nhập & gõ chat | 3 bộ (tìm kiếm, soạn chat, 6 kiểu input) |
| Nút & biểu tượng | 2 bộ (nút chính/phụ, icon vuông/tròn) |
| Hàng & bố cục | 2 bộ (icon + chữ + vùng phụ và bố cục đa vùng) |
| Menu & popup | 2 bộ (menu ba chấm và dialog) |

**Ranh giới:** các thành phần vẫn dùng chung `web/styles.css`, `web/src/app.ts` chỉ quản lý trạng thái nhóm/tìm kiếm. Bản gốc V08 đã được bảo tồn ở nhánh `archive/ui-v08-original-before-foundation-20261122` và commit `7e10663`. Mẫu gốc `base.html` V09 và `flows.html` V04 không đổi.

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
base.html                ← Mẫu gốc 2027 (V09)
web/src/design.ts        ← Nguồn token màu/chữ, công thức tương phản, xuất CSS
web/src/app.ts           ← Điều khiển gallery, văn bản và mẫu thành phần
web/src/composer-gallery.ts ← Bộ điều khiển 4 ô chat mẫu (chỉ local)
web/icons.svg            ← Một nguồn icon SVG của thư viện
web/src/base.ts          ← Điều khiển mẫu gốc và 4 preset
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

Workflow `.github/workflows/pages.yml` kiểm thử và đóng gói cả ba trang, **chỉ một stylesheet và một tệp icon SVG** và toàn bộ JS đã biên dịch (bao gồm `base.html`). URL trên chỉ được coi là bản mới sau khi Pages deploy thành công.

## Android (khung từ các vòng trước)

```bash
cd android
gradle assembleDebug
```

Yêu cầu JDK 17, Android SDK 35, Gradle 8.11.1. V04 là cập nhật Web Library; APK native cần được thiết kế và kiểm thử riêng trước khi có thể coi là tương đương.

## Ghi chú thiết kế

[**RULES.md**](./RULES.md) chứa nguyên tắc UI/UX R01–R09. V04 đang minh họa các nguyên tắc đó; không tạo một hệ rule song song. Việc xem/nghiệm thu trên thiết bị iOS/Android thật khác với việc CI compile thành công.

# Tham khảo cho các lần thiết kế UI và viết lại logic · 22/11/2026

Phạm vi: tài liệu tham khảo cách làm việc cho thư viện 2027 và các dự án có liên quan. Không tự cài skill, không thay giao diện đang chạy, không triển khai hay gọi dịch vụ bên ngoài chỉ vì có tài liệu này.

## Bốn dự án được kiểm tra trên GitHub

| Công cụ | Repo | Vai trò và lưu ý |
| --- | --- | --- |
| Taste Skill | https://github.com/Leonxlnx/taste-skill | Làm website/trang mới: art direction, một hệ design, dùng ảnh thật hợp pháp, kiểm tra trình duyệt nhiều kích cỡ. Không áp hiệu ứng hero/landing page cho màn hình chat nghiệp vụ. MIT theo README. |
| Hallmark (Together AI) | https://github.com/Nutlope/hallmark | Chọn 50 chủ đề, kiểm tra AI-slop, hỗ trợ audit/redesign. Chỉ dùng chủ đề như khởi điểm, không được thay mất nhận diện hoặc điều hướng đã chốt. |
| unslop | https://github.com/heydamir/unslop/tree/main/skills/unslop | Rà soát giao diện hiện có từng vòng: spacing → màu → icon → copy → typography → layout → details → visuals → motion. Giữ nguyên nghiệp vụ, luồng thao tác. Giấy phép CC BY 4.0, phải ghi nguồn khi sao chép/chuyển thể. |
| rust-anything | https://github.com/erkamyaman/rust-anything | Ghi nhận hành vi gốc, tạo bridge, agent viết Rust, diff/replay/gate từng phần. Không phải tool tự chuyển toàn bộ mã tự động và không kiểm chứng những đầu vào chưa ghi. MIT theo README. |

Số GitHub stars biến động theo ngày, không dùng ngưỡng sao làm tiêu chí chấp nhận kỹ thuật.

## Quy trình đề xuất cho UI/UX hiện có (CHAT, TAPHOA, 2027)

1. Chụp ảnh trạng thái **trước**, phân tích vùng cha/con và diện tích khả dụng khi bật bàn phím trên iOS/Android, PWA/Safari/Chrome.
2. Xác định một vấn đề rõ ràng (ví dụ input số và input chat không đồng bộ viền; khung trên chiếm quá nhiều diện tích).
3. Dùng tư duy **unslop** để sửa theo thứ tự hình học và chức năng; không thêm gradient tím, glow, hiệu ứng hoặc icon trang trí tự động.
4. Dùng gợi ý Taste/Hallmark chỉ khi tạo hẳn màn hoặc sản phẩm mới. Đối với màn giao tiếp/bán hàng, ưu tiên thông tin dễ đọc, thời gian thao tác nhanh, không co giật.
5. Xem trước thực tế tại desktop/mobile và trạng thái bàn phím, focus, nhập nhiều dòng, dữ liệu dài, empty/error/loading; chụp ảnh trước/sau.
6. CI/test đạt, sau đó mới đưa qua quy trình phát hành và tăng version. Giữ đường lui. Không gửi tin, không tạo giao dịch, không sửa database production trong lúc thử thiết kế.

## Quy trình đề xuất khi cần chuyển logic sang Rust (songoku / dịch vụ hiện có)

- Chỉ chọn đơn vị có thể tách và kiểm thử, ví dụ: chuẩn hóa đơn hàng, phân tích text/số lượng, định dạng tiền, khớp hóa đơn hoặc các phép tính. Không bắt đầu bằng việc viết lại toàn bộ UI mobile hoặc hệ realtime.
- Chạy gốc trong **bản sao có dữ liệu giả hoặc đã ẩn danh**. Không dùng token production; cô lập network, webhook, email, dữ liệu và số tài khoản thật.
- Ghi các input/output, lỗi, edge cases; nếu có side effect thì thêm sink `app record --effects http,smtp` và database test + reset/dump khi phù hợp.
- Agent viết Rust **theo từng đơn vị**; `diff`, `gate`, kiểm tra fallback và đo perf. Nếu chưa đạt, không thay thế luồng đang chạy.
- 100% case khớp chỉ chứng minh khớp **dữ liệu đã ghi**, không bảo đảm mọi hành vi chưa kiểm, tải đồng thời, timezone, unicode tiếng Việt, mạng mất kết nối, Android/iOS/PWA. Bổ sung E0–E5, unit/integration/e2e và nghiệm thu thiết bị thực.
- Dùng Rust cho logic lõi nếu thực sự cải thiện chất lượng/tốc độ. UI Android/iOS vẫn cần giải pháp framework hoặc toolkit phù hợp; Rust tự thân không giải quyết layout hay bàn phím.

## Các giới hạn được ghi rõ từ tài liệu gốc
- https://github.com/erkamyaman/rust-anything/blob/main/docs/how-it-works.md#what-it-cant-catch — timing, memory, concurrency dưới tải không được so sánh trực tiếp; side effect chỉ so sánh nếu có cấu hình record; một số nền tảng/regex khác nhau vẫn cần thêm test.
- https://github.com/erkamyaman/rust-anything/blob/main/docs/whole-apps.md#side-effects-email-webhooks-and-databases — cách cấu hình HTTP/SMTP sinks và DB reset/dump.
- Benchmarks Prettier/json-server là **kết quả dự án công bố trên Apple M4** cho workload cụ thể, không được áp dụng mặc định sang CHAT hoặc Songoku.

**Kết luận áp dụng:** làm mới trang dùng Taste/Hallmark có kiểm định; tinh chỉnh sản phẩm đang chạy dùng unslop; chuyển logic gốc sang Rust dùng parity test trên môi trường cách ly. Không có công cụ nào thay thế kiểm thử thực tế và chuẩn giao diện 2027.

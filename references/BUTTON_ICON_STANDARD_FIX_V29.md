# 2027 UI-V29 — Sửa chuẩn mục 6 Nút và icon (22/11/2026)

> **Lưu ý lịch sử (V30):** Các tài liệu V27–V29 chỉ ghi nhận quá trình thử. Quy tắc chuẩn tắc là [RULES.md](../RULES.md), đặc biệt RULE 06–08. Bản V29 đã tạo mục 6.1 kích thước và token `--ds-btn-*` song song là sai; V30 bỏ phần đó, trả mục 6.1 về cấu tạo nút, và dùng chung `.ui-button`, `.ui-icon`, `--ui-control-*`. Không lấy tên lớp `simple-button-demo-*` làm chuẩn mới.


## Lỗi gốc và cách khắc phục

1. Hàm `sampleButton()` tạo class `simple-button-<style>`, trong khi bảng CSS chỉ định nghĩa `.simple-button-demo-<style>`. Vì thế biến thể solid, soft, outline, ghost, vuông, tròn, loading, toggle hiển thị sai và dễ bị nhầm là các nút cùng kiểu. **Sửa tại TypeScript tạo class**, không thêm CSS vá.
2. File `web/icons.svg` có chú thích XML lồng nhau **và một dòng `</svg>. -->` đóng root quá sớm**. Các icon plus, mic, send-up, ellipsis nằm ngoài root; trình duyệt có thể không nạp cả sprite. Đã sửa cả hai lỗi tại nguồn, thêm kiểm tra XML bằng Python trong CI và Pages.
3. Mục 6 chưa minh họa tách biệt cỡ glyph với diện tích nút, chưa minh họa trực tiếp các cỡ. **Thêm bộ chọn xem thử 6.1**; giữ 14 mẫu nút, 10 icon, 14 cấu trúc nội dung hiện có, đổi cấu trúc cũ thành 6.2.
4. Nút chọn mẫu 40×40 nhỏ hơn quy ước vùng chạm 44px của dự án. **Nâng nút chọn lên 44×44** trong cả hai danh sách.

## Bảng kích thước có thể kiểm tra

| Vai trò | Cao desktop | Cao khi pointer coarse | Chữ | Icon SVG | Gap | Padding ngang |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Gọn | 36px | tối thiểu 44px | 13px | 18px | 6px | 12px |
| Chuẩn | 44px | 44px | 14px | 20px | 8px | 16px |
| Lớn | 52px | 52px | 16px | 22px | 10px | 18px |
| Chỉ icon | 44×44px | 44×44px | — | 20px | — | 0 |

Đây là **bộ token 2027 tự thiết kế**; không khẳng định đó là số đo chính xác của ChatGPT. Nguồn tham khảo [OpenAI Apps SDK UI Button](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Button/Button.mdx) phân biệt `size` (height), `gutterSize` (padding), `iconSize`, `uniform` và `pill`. Bộ Apps SDK UI không phải toàn bộ mã nội bộ của ChatGPT.

## Hợp đồng UI

- Mọi nút mẫu có `type="button"`, label dễ hiểu, icon chỉ có `aria-label`, SVG con `aria-hidden`.
- `solid/soft/outline/ghost/danger` chỉ thay màu nền/chữ/viền; `square/circle/pill` là hình học; `compact/medium/large` là kích thước. Không trộn các cấp độ thành một màu.
- `block` chiếm rộng cột nhưng vẫn giới hạn theo khung; trạng thái `disabled`/loading thật sự vô hiệu thao tác; `aria-pressed` chỉ dùng khi nút có trạng thái.
- Một chủ sở hữu biến CSS: `--ds-btn-height`, `--ds-btn-icon`, `--ds-btn-size`, `--ds-btn-gutter`, `--ds-btn-gap`, `--ds-btn-radius`; không thêm class riêng rẽ để căn bù ở từng trang.
- Ngưỡng 44px cho thiết bị cảm ứng là **quyết định của dự án**, không phải diễn giải rằng WCAG AA yêu cầu 44px cho mọi nút.
- Mẫu không tạo đơn, không gửi tin, không thay CHAT/TAPHOA/Songoku.

## Kiểm thử và giới hạn

- `tests/button-icon-standards.test.mjs` kiểm tra class CSS khớp TypeScript cho đủ 14 kiểu, 10 icon chính có ID hợp lệ, token sizing, liên kết trang và asset build V29.
- GitHub Actions dùng `xml.etree.ElementTree.parse('web/icons.svg')` để bắt lỗi XML thay vì chỉ kiểm tra ID chuỗi.
- `npm run verify` chạy test và build TypeScript. Sau CI, cần soát bằng mắt trên Safari/Chrome và thiết bị cảm ứng; kiểm thử tĩnh không chứng minh độ cân optical của từng glyph trên mọi màn hình.
- Phân biệt `36px` desktop với **vùng chạm** `44px` khi `pointer:coarse`.

Đường dẫn mục 6: https://1sl2tp.github.io/2027/#simpleButtons

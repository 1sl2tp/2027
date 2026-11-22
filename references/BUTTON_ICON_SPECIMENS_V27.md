# Thư viện 2027 · Mục 6: Nút và icon (V27)

Phạm vi: **chỉ thư viện giao diện 1sl2tp/2027**. Không thay CHAT, TAPHOA, Songoku; không gửi tin hay tạo giao dịch.

## Đối chiếu nguồn
- [OpenAI Apps SDK UI Button](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Button/Button.tsx): `solid`, `soft`, `outline`, `ghost`; `pill`, `block`, `uniform` (icon vuông/tròn), `loading`, `disabled`, `selected`, icon có kích cỡ riêng. Nguồn công khai, không khẳng định là toàn bộ CSS của chatgpt.com.
- [Button documentation](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Button/Button.mdx): các trạng thái, loại, icon đầu/cuối, nút chiếm chiều ngang. Demo 2027 tái dựng có chọn lọc, không chép framework React.
- Bộ icon hiện hữu `web/icons.svg` của 2027: tái sử dụng cùng ID chuẩn, không chèn emoji vào nút.

## 24 mẫu chọn nhanh
- Nút BUTTON-01–14: solid chính, soft phụ, outline, ghost, pill, block, icon trái, icon phải, icon vuông, icon tròn, nguy hiểm, disabled, loading (trạng thái), toggle (nhấn/chọn).
- Icon ICON-01–10: thêm, giảm, tìm, đóng, copy, sửa, xóa, chia sẻ, gửi, dấu ba chấm.
- Mỗi hàng có mẫu nhìn thử thật và nút ✓ để đánh dấu lựa chọn. Chạm nút mẫu chỉ minh họa phản hồi trong trang, không thực hiện thao tác thật.
- Bố cục mobile: nút tối thiểu 44 px, khoảng cách nhất quán, không gradient/glow; trạng thái focus bàn phím và reduced motion cho spinner.
- Tất cả mẫu dùng chung `web/styles.css` và `web/icons.svg`, không lặp CSS riêng cho từng trang.

## Cách dùng thư viện khi dựng mới
1. Duyệt mẫu bằng trang `https://1sl2tp.github.io/2027/#simpleButtons`.
2. Gắn mã BUTTON/ICON đã chọn vào rule của chức năng mới.
3. Chỉ triển khai vào ứng dụng mới sau khi người dùng duyệt các nhóm màn hình, phiên bản và kiểm thử.
4. Không chuyển trực tiếp thay đổi từ mẫu preview vào CHAT/TAPHOA.

Duy trì các mục 1–5 cũ và thư viện nâng cao để đối chiếu, không xoá/ghi đè.

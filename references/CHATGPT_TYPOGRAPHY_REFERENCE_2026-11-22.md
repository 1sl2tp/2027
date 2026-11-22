# ChatGPT typography source inventory · 2026-11-22

## Nguồn được đối chiếu
- Google Drive lưu trang: [ChatGPT.html](https://drive.google.com/file/d/14RXspORGw1X8MJV3nxA850ahdDAMa9nW/view)
- Ảnh người dùng cung cấp trong hội thoại ngày 22/11/2026 (các vai trò chữ: thanh bên, nội dung trợ lý, nhấn mạnh, link, thời gian/trạng thái và ô gõ)
- [CHATGPT_UI_SOURCE_AUDIT_2026-11-22.md](./CHATGPT_UI_SOURCE_AUDIT_2026-11-22.md)
- [CHATGPT_FACEBOOK_GEMINI_UI_COMPARISON_2026-11-22.md](./CHATGPT_FACEBOOK_GEMINI_UI_COMPARISON_2026-11-22.md)

## Đã xác nhận trực tiếp từ biến style trong ChatGPT.html
- `--font-ui-size:16px`, `--font-code-size:12px`
- `--text-xs:12px`, `--text-sm:14px`, `--text-base:16px`, `--text-lg:18px`, `--text-xl:20px`, `--text-2xl:24px`, `--text-3xl:30px`, `--text-4xl:36px`
- `--text-heading-sm:18px`, `--text-heading-md:20px`, `--text-heading-lg:24px`, `--text-heading-app:28px`
- Bản lưu có các lớp `text-default`, `text-heading-sm`, `font-normal`, `font-medium`, `font-semibold`, `ProseMirror`; và các token màu chữ/nhấn mạnh.
- Font hệ thống (sans) làm kiểu chính; mono dành cho code. Không có bằng chứng rằng Arial/Georgia là lựa chọn độc lập của ChatGPT trong bản lưu.

## Tái dựng trong thư viện 2027
- Mục 1: 10 cỡ chữ/token tiêu biểu; dùng system sans + monospace, không sao chép font nhị phân.
- Mục 2: 31 mẫu thể hiện vai trò: 1–4 dòng; heading; body; chữ đậm/vừa đậm/nghiêng/gạch chân/gạch ngang; kết hợp; chữ phụ; caption; link; code; khối code; trích dẫn; bullet/number list; bảng; tiền; thời gian; trạng thái; sidebar; placeholder ô gõ; nhãn; nội dung người gửi; phím tắt.
- **Phân biệt:** cỡ token ở trên là thông tin xác nhận từ bản lưu. Bố cục/kiểu hiển thị của các role ngoài token là **mẫu tái dựng 2027 dựa trên cách sử dụng quan sát**, không tuyên bố là bản chép CSS chính xác từ ChatGPT. Các mẫu không gửi hoặc sửa dữ liệu thật.
- V22 không chỉnh CHAT/TAPHOA và không thay thế mã nguồn gốc trên Drive.

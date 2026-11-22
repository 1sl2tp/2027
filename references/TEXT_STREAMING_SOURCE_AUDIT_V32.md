# 2027 UI-V32 — Đối chiếu source GitHub: hiệu ứng chữ đang tải và streaming

Ngày rà soát: 22/11/2026 (giờ VN). **Tài liệu nghiên cứu, không phải tệp rule mới**; chuẩn tắc thuộc [RULES.md, RULE 11](../RULES.md).

## Kết quả tìm thấy và liên kết trực tiếp

| Nguồn | File trực tiếp đã đọc | Tính năng được chứng minh | Phần cần lưu ý |
| --- | --- | --- | --- |
| [vercel/streamdown](https://github.com/vercel/streamdown) (Apache-2.0) | [README](https://github.com/vercel/streamdown/blob/main/README.md), [features.md](https://github.com/vercel/streamdown/blob/main/skills/streamdown/references/features.md), [LICENSE](https://github.com/vercel/streamdown/blob/main/LICENSE) | Streaming Markdown chưa hoàn chỉnh, caret `block`/`circle`; chỉ hiển thị caret khi `isAnimating=true` | React, nên **không** nhúng trực tiếp vào repo vanilla TypeScript |
| [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) (MIT) | [README](https://github.com/assistant-ui/assistant-ui), [ChatGPT-style example docs](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/examples/chatgpt.mdx) | Composition, streaming, auto-scroll, keyboard, a11y; trạng thái action | Tham khảo hành vi, **không** sao chép hình ảnh/nhãn thương mại |
| [lobehub/streamdown](https://github.com/lobehub/streamdown) (MIT) | [README](https://github.com/lobehub/streamdown/blob/main/README.md) | Partial Markdown, per-char/per-word smooth reveal và giữ khối đã hoàn tất | Không đồng nhất với package của Vercel dù cùng tên Streamdown |
| [vercel/ai-elements](https://github.com/vercel/ai-elements) (Apache-2.0) | [README](https://github.com/vercel/ai-elements/blob/main/README.md), [Plan docs](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/plan.md), [LICENSE](https://github.com/vercel/ai-elements/blob/main/LICENSE) | UI streaming, trạng thái loading, shimmer khi tiêu đề đang tạo | Shimmer của UI Elements không chứng minh mọi kiểu shimmer tồn tại trong app ChatGPT hiện tại |
| [openai/apps-sdk-ui](https://github.com/openai/apps-sdk-ui) (MIT) | [AGENTS.md](https://github.com/openai/apps-sdk-ui/blob/main/AGENTS.md) | Component Animate, AnimateLayout, Indicator, Markdown và typography tokens | **Apps SDK UI dành cho app bên trong ChatGPT**, không phải toàn bộ giao diện ChatGPT |
| [mrigankad/Lumi-UI](https://github.com/mrigankad/Lumi-UI) (Apache-2.0) | [README](https://github.com/mrigankad/Lumi-UI/blob/main/README.md) | StreamingText, ThinkingIndicator và shell chat | Tham khảo; không cài React hoặc Radix |

Tài liệu trên là nội dung đã kiểm chứng trong GitHub public. Không có bằng chứng công khai ở các nguồn này về **thông số pixel, timing và hiệu ứng chính xác của UI ChatGPT đang chạy**.

## Chỗ thiếu trong 2027 trước V32

- Đã có bộ icon loading `.ui-icon--loading`, trạng thái các nút và bộ CSS token/typography nền tảng.
- Chưa có **mục mẫu chữ** cho waiting/streaming/caret/reveal/complete/cancelled.
- Không có component Markdown streaming bảo đảm cú pháp chưa hoàn chỉnh, cũng chưa tích hợp LLM trong demo.

## Bản V32 triển khai

- `#simpleMotion` là mục **7. Chữ đang chạy & trạng thái tải**, dùng `web/src/text-motion.ts` cho sáu mẫu `MOTION-01…06`.
- CSS hiển thị do **cùng một** `web/styles.css` sở hữu, các nút điều khiển dùng `.ui-button`.
- **MOTION-01:** waiting dots; **02:** chữ shimmer; **03:** skeleton; **04:** từng từ + block caret; **05:** từng khối + circle caret; **06:** vòng đời waiting → streaming → complete.
- Dữ liệu demo cục bộ, kết thúc hữu hạn. Dừng hủy timer và giữ phần chữ đã xuất hiện; không ghi completed khi cancel.
- Không kết nối OpenAI API, không import source vendor; không tải package mới.
- Dùng `textContent` tránh HTML injection, không tự viết parser Markdown sai; `prefers-reduced-motion` cho phép xem ngay nội dung mẫu.
- `role=status` chỉ cập nhật khi **trạng thái** thay đổi, không từng từ; vùng preview có `aria-busy`.
- Test ở `tests/text-motion.test.mjs` kiểm tra 6 ID, hạn chế network/XSS, accessibility và đường dẫn V32.

## Những phần chưa có / kiểm tra tiếp

1. Markdown thật khi stream chưa hoàn chỉnh (code fence, bảng, công thức, link) — cân nhắc tích hợp Streamdown nếu ứng dụng thực chuyển sang React; demo hiện không có parser.
2. Smooth streaming với backlog mạng không đều, giới hạn scroll do người dùng điều khiển, tương tác chọn/bôi đen chữ và nhận xét loading theo thời gian — cần dữ liệu/thiết bị thực.
3. E4/E5 vẫn mở: iOS Safari/PWA, Android Chrome/PWA, tối ưu CPU/mobile và đọc bằng screen reader chưa được nghiệm thu.

**Không cấp phép** sao chép logo, asset thương hiệu hay các font thương mại; giữ attribution và license khi dùng code của dự án ngoài trong tương lai.

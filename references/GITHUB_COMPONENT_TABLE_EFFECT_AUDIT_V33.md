# V33 — Kiểm kê sáu thư viện GitHub: bảng nhiều cột và hiệu ứng

Ngày rà soát: 22/11/2026 (VN). Đây là tài liệu kiểm kê, KHÔNG phải bộ rule riêng. Chuẩn tắc thuộc RULE 08, RULE 09 §9.5, RULE 11 §11.5 trong [RULES.md](../RULES.md).

## 1. Sáu thư viện và file có bằng chứng

| Nguồn | File trực tiếp kiểm tra | Thành phần tìm được | Giới hạn |
| --- | --- | --- | --- |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) (MIT) | [DataTable](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/data-table.mdx), [ScrollAnchor](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/scroll-anchor.mdx), [NumberTicker](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/number-ticker.mdx) | columns/rows, định dạng locale, sorting, thẻ khi container hẹp, scroll giữ vị trí, chuyển số | Không tự hiểu logic nghiệp vụ TAPHOA |
| [Vercel Streamdown](https://github.com/vercel/streamdown) (Apache-2.0) | [Features](https://github.com/vercel/streamdown/blob/main/skills/streamdown/references/features.md), [API](https://github.com/vercel/streamdown/blob/main/skills/streamdown/references/api.md) | Markdown chưa hoàn chỉnh, GFM table, copy CSV/TSV/HTML, download CSV/Markdown, code, Mermaid pan/zoom | Không có hợp đồng bảng 7 cột responsive cho mọi ứng dụng |
| [LobeHub Streamdown](https://github.com/lobehub/streamdown) (MIT) | [README](https://github.com/lobehub/streamdown/blob/main/README.md), src/useSmoothStreamContent.ts | Chữ hiện theo từ/ký tự và cached block | Repo khác với Vercel Streamdown |
| [Vercel AI Elements](https://github.com/vercel/ai-elements) (Apache-2.0) | [Shimmer](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/shimmer.md), [CodeBlock](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/code-block.md), [Tool](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/tool.md), [Plan](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/plan.md), [TestResults](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/test-results.md) | Loading, code copy/số dòng, công cụ pending/running/error, plan/test summary | Component không tự tạo dữ liệu thật |
| [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui) (MIT) | [Responsive design](https://github.com/openai/apps-sdk-ui/blob/main/src/Responsive%20design.mdx), [ShimmerText](https://github.com/openai/apps-sdk-ui/blob/main/src/components/ShimmerText/ShimmerText.tsx), [Animate](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Transition/Animate.mdx), [AnimateLayout](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Transition/AnimateLayout.mdx) | Mobile-first, shimmer tạm dừng theo chu kỳ, fade/crossfade, animate kích thước/accordion | KHÔNG phải toàn bộ source UI ChatGPT nội bộ |
| [Lumi-UI](https://github.com/mrigankad/Lumi-UI) (Apache-2.0) | [README](https://github.com/mrigankad/Lumi-UI/blob/main/README.md), src/components/lumi | Layout chat, composer, message, thinking indicator | Chưa xác minh component bảng dữ liệu 7 cột |

Nguồn bổ sung ngoài sáu repo: [TanStack Table — Column visibility](https://tanstack.com/table/latest/docs/guide/column-visibility), [TanStack Virtualization](https://tanstack.com/table/latest/docs/framework/react/guide/virtualization), [W3C WAI Tables](https://www.w3.org/WAI/tutorials/tables/), [WAI sortable table](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/). Không cài thêm thư viện ở 2027.

## 2. Bảng 1, 2, 3, 4, 5, 6, 7, 8 cột

| Cột | Mẫu schema tăng dần | Phương án trình bày của 2027 |
| ---: | --- | --- |
| 1 | Tên | Một cột hoặc danh sách |
| 2 | + Số lượng | Gọn, không mất nhãn |
| 3 | + Đơn giá | Số tiền phải/tabular; mobile có thể cuộn |
| 4 | + Thành tiền | Auto chuyển thẻ ở container dưới 480px, vẫn có chế độ cuộn |
| 5 | + Trạng thái | Thẻ có nhãn hoặc bảng ngang |
| 6 | + Ngày | Bảng rộng ghim cột tên; không ép ngày chồng cột |
| 7 | + Nhóm | Giữ đủ bảy trường; không tự ẩn giá/SL |
| 8 | + Ghi chú | Nội dung ghi chú xuống dòng và vẫn truy cập được |

**Đây là quy tắc đề xuất cho 2027**, không phải số cột mà sáu library tự áp đặt. Số cột chỉ là một yếu tố; độ dài nội dung, chiều rộng container, loại giá trị và nhiệm vụ đọc bảng quan trọng hơn.

V33 dùng một COLUMN_SCHEMA gồm key, label, role, priority và một SAMPLE_ROWS. Renderer cùng dữ liệu tạo bảng ngữ nghĩa (table/caption/thead/tr/th scope=col/td, aria-sort) và thẻ (heading + dl/dt/dd). CSS mở rộng primitive ds-table bằng ds-table--schema, không sửa cấu trúc hóa đơn INV-xx. Mobile Auto chuyển thẻ với 4+ cột khi container dưới 480px; chế độ Scroll vẫn có thể chọn thủ công và cuộn bằng bàn phím. Bảng có 6+ cột có cột đầu sticky.

V33 có sorting cục bộ, chế độ desktop/mobile 360px, copy HTML từ đúng bảng render. Chưa có copy CSV/TSV, virtualization, chọn cột ẩn/hiện nâng cao; không tạo dữ liệu kinh doanh thật.

## 3. Những mẫu/hiệu ứng khác còn thiếu

| Thành phần | Bằng chứng | Trạng thái trong 2027 | Ưu tiên |
| --- | --- | --- | --- |
| ScrollAnchor giữ vị trí khi nội dung tăng | assistant-ui ScrollAnchor | Chưa có contract hoàn chỉnh | Rất cao cho CHAT |
| Markdown/code fence/table streaming | Vercel & LobeHub Streamdown | V32 chỉ giả lập text | Cao |
| CodeBlock copy/line number/syntax | AI Elements CodeBlock | Chưa có bộ gốc hoàn chỉnh | Cao |
| Tool/Plan/TestResults loading→success/error | AI Elements | Chưa có panel tình trạng hoàn chỉnh | Cao cho Công việc |
| Source citations/link preview | AI Elements Sources | Chưa có contract rõ | Trung bình |
| Shimmer pause & fade/crossfade/layout transition | OpenAI Apps SDK UI | V32 có shimmer đơn giản | Trung bình |
| NumberTicker | assistant-ui | Chưa có | Thấp, tránh rung khi số tiền thay đổi |
| ComparisonCard/chọn lựa | assistant-ui | Chưa có mẫu gốc chuyên trách | Trung bình |
| Copy/tải bảng CSV/TSV/Markdown | Vercel Streamdown | V33 mới copy HTML | Trung bình |
| Ảnh/file tree/code diff/chart | AI Elements/assistant-ui | Chỉ có một phần mẫu media, chưa phủ đủ | Theo nhu cầu thực tế |

**Thứ tự ưu tiên:** (1) bảng ngữ nghĩa, (2) ScrollAnchor cho CHAT, (3) Markdown + code/table actions, (4) trạng thái công cụ và citations, (5) layout transitions, (6) số chuyển động/chart khi có dữ liệu phù hợp. Không thêm animation trang trí dàn trải.

## 4. Bằng chứng và giới hạn

- Phạm vi V33 chỉ repo 2027: thêm bảng linh hoạt trong nhóm Bảng & dữ liệu, TS mới column-matrix.ts, CSS owner web/styles.css, kiểm thử tự động.
- Không sửa CHAT/TAPHOA/songoku, không gọi API, không gửi tin, không tạo giao dịch.
- Test/build/Pages thành công mới xác nhận E2/E3; E4/E5 chưa nghiệm thu Safari/Chrome 320/360/390/430px, sticky + overflow, focus/keyboard, VoiceOver/TalkBack, zoom chữ.
- Dùng source public để học nguyên tắc, không sao chép CSS thương hiệu hay tuyên bố giống hoàn toàn UI ChatGPT hiện hành.

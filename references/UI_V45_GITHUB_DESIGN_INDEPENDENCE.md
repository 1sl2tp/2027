# V45 — GitHub UI/UX độc lập và đối chiếu nghiệp vụ cũ

**Ngày kiểm tra:** 23/11/2026. **Phạm vi sửa:** 1sl2tp/2027, không sửa nguồn CHAT/TAPHOA production hoặc dữ liệu thật. **Nguồn hiện tại:** repo GitHub, README và giấy phép từng package, không phải CSS nội bộ ChatGPT.

## Hai dòng bằng chứng không được trộn

1. **UI/UX và nguồn GitHub:** tính dễ đọc, phân cấp, layout desktop/mobile, thao tác bằng cảm ứng/bàn phím, accessibility, focus, thông báo trạng thái, scroll khi sinh nội dung, motion và token nhất quán. Quyết định làm thế nào dựa vào nguồn công khai, nguyên tắc UX và thử nghiệm. Không coi CHAT/TAPHOA cũ là hình mẫu.
2. **CHAT/TAPHOA lịch sử:** người dùng cần thao tác nào, mối liên hệ giữa danh bạ/hội thoại/công việc, trình tự dữ liệu, nhiệm vụ, lỗi và giới hạn vận hành. Đây là bằng chứng về **WHAT**, không quyết định **HOW IT LOOKS**. `chat-live-map.ts` V44 là map nghiệp vụ/DOM cũ, không là yêu cầu phải giữ kích thước, màu, gap, CSS override cũ.

**Bộ lọc nhập mẫu:** source hiện hữu? → license có rõ cho component/package ấy? → có kiểm focus/keyboard/ARIA/mobile/reduced-motion? → primitive hay composition thuộc cha nào? → có tái dùng hệ token 2027 mà không cài React thêm? → có benchmark/regression? Nếu không, chỉ **nghiên cứu**.

## Sáu nguồn mới đã xác minh

| GitHub | Nội dung nguồn hỗ trợ | Cha/owner trong 2027 | Quyết định |
| --- | --- | --- | --- |
| [Vercel Streamdown](https://github.com/vercel/streamdown), [LICENSE](https://github.com/vercel/streamdown/blob/main/LICENSE) | Streaming Markdown không hoàn chỉnh, fenced code, bảng, state của renderer; Apache-2.0 (package streamdown) | `CHAT-MESSAGE → MESSAGE-CONTENT-PARTS → TEXT/CODE/TABLE` | **Ưu tiên học** parsing/reflow, chưa nhập React/Tailwind hoặc sao chép code |
| [Zag](https://github.com/chakra-ui/zag) | Finite state machines cho dialog/menu/combobox, focus/ARIA; MIT; adapter Vanilla có sẵn | `CHAT-OVERLAY-ROOT → Trigger/Content`, một interaction owner | **Ưu tiên học** states/keyboard; chỉ chọn core riêng sau khi có nhu cầu |
| [cmdk](https://github.com/dip/cmdk) | Command menu/combobox với keyboard navigation, filtering/sorting; MIT | `SEARCH-FIELD → Results → Hit` đặt dưới SearchOverlay hoặc Composer Commands | **Tham khảo** trước, không nhân bản Search primitive |
| [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) | Resizable workspace grid/panel, keyboard separator; MIT | `APP-SHELL → Region1/Region2/Region3` | **Tham khảo** desktop; mobile Shell vẫn quyết định layout |
| [React Virtuoso](https://github.com/petyosi/react-virtuoso), [Message List license](https://virtuoso.dev/message-list/licensing/) | Virtual list nhiều chiều cao; core MIT nhưng `@virtuoso.dev/message-list` có license thương mại | `CHAT-MESSAGE-LIST` scroll owner | **Chỉ tham khảo** chat-specific API; không nhập package thương mại chưa có giấy phép |
| [Vaul](https://github.com/emilkowalski/vaul) | React mobile drawer/bottom sheet (MIT), README hiện ghi unmaintained | `CHAT-OVERLAY-ROOT → BottomSheet` | **Không nhận dependency** mới; chỉ xem những bài học về gesture/keyboard |

Các nguồn cũ **vẫn được tôn trọng**, không thay thế: assistant-ui, Vercel AI Elements, OpenAI Apps SDK UI, shadcn/ui, Radix, Floating UI, Lucide, React Aria, components.build, TanStack Virtual... Thêm repo chỉ khi giải quyết vấn đề rõ ràng, không tạo bộ button/icon/table/textarea thứ hai.

## Ưu tiên phát triển tiếp (không nhận là đã triển khai)

| Ưu tiên | Bản chất | Các nguồn phù hợp | Kiểm chứng bắt buộc |
| --- | --- | --- | --- |
| P0 | Overlay/menu nhiều cấp và bàn phím mobile | Zag + Radix + React Aria | Focus return, Escape, pointer dismissal, không chồng 2 owner |
| P0 | Markdown/tables/code đang stream | Streamdown + AI Elements | Không nhảy scroll, incomplete markup, escape nội dung an toàn |
| P1 | Search/command và tìm đến tin | cmdk + assistant-ui | Thứ tự bàn phím, đúng messageId, không đổi contact sai |
| P1 | Responsive vùng 1–3 desktop | react-resizable-panels + React Aria | Min/max; touch vs fine pointer; không mất vùng gõ |
| P2 | Thread dài nhiều nghìn tin | TanStack Virtual (core), React Virtuoso core | Đo FPS, memory, scroll anchor; không nhập Virtuoso Message List thương mại |
| P2 | BottomSheet interaction | Radix/Zag; Vaul **chỉ làm phản ví dụ về bảo trì** | Safari keyboard, safe-area, dismiss focus, nested overlay |

## Tiêu chí E0–E5
- E0: source README đã đọc, license/package đã phân biệt, không có URL bịa đặt.
- E1: owner/cha/cardinality phù hợp RULE 12; DOM mount khác logical owner có placement rõ.
- E2: mã/test tĩnh xây dựng và kiểm lần trước còn hoạt động; không cài dependency không yêu cầu.
- E3: CI/Pages thông báo thành công, URL thực sự cập nhật.
- E4/E5: cần kiểm Safari/Chrome/PWA/mobile/desktop thực tế; không thể tuyên bố khi chỉ có CI.

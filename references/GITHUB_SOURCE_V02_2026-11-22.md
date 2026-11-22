# SOURCE-V02 — Bổ sung GitHub mới và một tin chứa nhiều loại nội dung

**Ngày kiểm tra:** 22/11/2026 (VN). **Phạm vi:** chỉ repo `1sl2tp/2027`, trang `github-sources.html`. **Trạng thái:** mẫu chạy cục bộ trên DOM; chưa tích hợp CHAT/TAPHOA, chưa nghiệm thu iOS/Android thật, chưa cài dependency runtime.

## Kết quả đối chiếu thêm 5 nguồn

| Nguồn | Chứng cứ | Học để cải thiện | Hợp đồng owner/cha–con | Quyết định |
| --- | --- | --- | --- | --- |
| [Base UI](https://github.com/mui/base-ui) (MIT) | [README](https://github.com/mui/base-ui/blob/master/README.md), [LICENSE](https://github.com/mui/base-ui/blob/master/LICENSE) | Popup, Menu, Select, focus và keyboard | `OverlayRoot → Trigger + Popup/Content` | Chỉ áp dụng tiêu chuẩn hành vi; dự án hiện không dùng React |
| [Adobe React Aria Components](https://github.com/adobe/react-spectrum) (Apache-2.0 ở repo, kiểm lại theo package khi nhập) | [README package](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/README.md), [LICENSE](https://github.com/adobe/react-spectrum/blob/main/LICENSE) | Table, GridList, NumberField, SearchField; keyboard, selection | `Table → Header/Body → Row → Cell`; `SearchField → Input + ClearButton` | Đối chiếu quy tắc, không thay bảng 20 cột bằng bản mới |
| [components.build](https://github.com/vercel/components.build) (MIT) | [Composition](https://github.com/vercel/components.build/blob/main/skills/building-components/references/composition.mdx) | Tách compound components: Root, Item, Trigger, Content; context/owner | `Root → Slots`; biết node là content, control, utility, decoration | Áp dụng vào cách rà soát RULE 12; đây là đặc tả, không phải UI kit |
| [shadcn/ui](https://github.com/shadcn-ui/ui) (MIT) | [Changelog chat 06/2026](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2026-06-chat-components.mdx), [Base UI 07/2026](https://github.com/shadcn-ui/ui/blob/main/apps/v4/content/docs/changelog/2026-07-base-ui-default.mdx) | Thành phần chat/scroll, registry từ nhiều nền Base UI/Radix/React Aria | Scroll anchoring là hành vi `MessageList`, không phải node tin hay nút | Tham khảo, không copy component có tên trùng với hệ hiện tại |
| [Vercel UI SDK](https://github.com/vercel-labs/ui) (beta) | [README](https://github.com/vercel-labs/ui) | Mô hình hành vi headless | Logic gắn vào primitive và owner cụ thể | Theo dõi, KHÔNG đưa gói beta vào production như chuẩn đã kiểm chứng |

5 nguồn này **bổ sung cho 8 nguồn ở SOURCE-V01**, tổng 13 nguồn trên trang lab. Nguồn ngoài cung cấp pattern công khai, **không phải CSS nội bộ của ChatGPT**.

## Mẫu thực thi: CHAT-MESSAGE nhiều nội dung

```text
CHAT-THREAD                            region / owner scroll
  CHAT-MESSAGE-LIST                    composition / many messages
    CHAT-MESSAGE                       composition / 1 message instance
      MESSAGE-CONTENT-PARTS            container / one
        MESSAGE-TEXT-PART [0..n]       content / typography
        MESSAGE-TABLE-PART [0..n]      container → DATA-TABLE / schema owner
        MESSAGE-MEDIA-PART [0..n]      container → MEDIA-TILE [1..n]
      CHAT-MESSAGE-ACTIONS [0..1]      container / action strip
        MESSAGE-COPY-BUTTON [0..1]     control / ui-button
```

- Có **một** article chứa **một** tin mẫu, kết hợp đoạn chữ, bảng và hai khung ảnh. Không biến mỗi part thành một tin mới.
- `CHAT-MESSAGE-ACTIONS` nằm trong tin và **ngoài** `MESSAGE-CONTENT-PARTS`. Nút copy đọc nội dung parts của đúng `data-message-id`; chỉ dùng Clipboard API do người xem bấm, không gọi backend.
- `DATA-TABLE` dùng lớp cơ bản `ds-table` và `source-table` hiện có; không tạo một framework bảng khác. UI demo có 3 cột, **không thay schema chuẩn 20 cột của thư viện chính**.
- Phần media dùng ô placeholder để kiểm geometry, không có tải ảnh thật/đọc EXIF, không khẳng định đã xử lý zoom.
- Các lớp mới có tiền tố `source-parts-`; chỉ bố trí *composition* ở phòng lab. Nút vẫn dùng `ui-button`, không định nghĩa lại token nút/chiều cao.
- Phần tử `data-ui-component` trên trang lab là **nhãn mẫu để kiểm DOM**, chưa được coi là bản triển khai toàn hệ thống `component-contracts.ts` hoặc CHAT production.

## Phân biệt utility, primitive và composition

1. Base UI / React Aria là nguồn **primitive behavior**; parent vẫn là OverlayRoot/Table/Field thực tế.
2. components.build là **hướng dẫn phân rã**, không đem vào bảng như một component cần cài.
3. shadcn là registry tham khảo; TanStack scroll không cần xuất hiện như một button; nếu dùng phải gắn vào `MESSAGE-LIST` và đo perf.
4. UI SDK ở trạng thái beta, không đưa làm dependency.
5. Mỗi mẫu mới phải chỉ ra `parent`, `nature`, `cardinality`, `owner`, `states`, `actions`, và *bằng chứng đã thử* trước khi có thể nâng vào ứng dụng thật.

## Kiểm thử và giới hạn

- `tests/github-source-lab-v02.test.mjs` kiểm số 13 nguồn, một cột owner, cấu trúc mixed-message, class reuse, copy đúng tin và không có network trong mẫu.
- Chưa khẳng định tỉ lệ pixel giống ChatGPT hoặc tương đương accessibility React Aria trên Safari/PWA.
- **Bước sau:** đưa `MESSAGE-CONTENT-PARTS` vào registry chính, giải quyết thiết kế primitive có thể xuất hiện ở nhiều vị trí mà không ép `DATA-TABLE` chỉ có một cha, rồi kiểm giao diện thật E4/E5. Không vá bằng tạo thêm CSS Table/Button độc lập.

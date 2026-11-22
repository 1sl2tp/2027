# V40 — Đối chiếu GitHub: hợp đồng cha–con, loại đối tượng và vòng đời composer

**Ngày:** 22/11/2026. **Rule duy nhất để áp dụng:** [RULE 12](../RULES.md) trong RULES.md (không tạo một bộ rule khác). **Phạm vi sửa mã:** 2027 Web demo, không gửi tin thật, không đọc database production.

## 1. Bằng chứng đã đọc trực tiếp

| Repo/nguồn | File gốc | Hợp đồng thực tế | Giới hạn |
| --- | --- | --- | --- |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) · MIT | [Composer](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/composer.mdx), [Mobile Composer](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/mobile-composer.mdx), [Attachments](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/elements/composer-attachments.mdx) | `ComposerPrimitive.Root` thực chất là form; Input, AddAttachment, Send, Cancel thuộc composer scope; standalone `ComposerBar/Input/Toolbar/Actions` thành phần lắp ghép; attachments là danh sách tệp con có Name/Remove riêng | Hướng dẫn React; không tự nhúng runtime vào 2027 |
| [vercel/ai-elements](https://github.com/vercel/ai-elements) · Apache-2.0 | [Prompt Input](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/prompt-input.md) và [Message](https://github.com/vercel/ai-elements/blob/main/skills/ai-elements/references/message.md) | PromptInput: Header cho tệp, body/textarea và Footer/Tools/Buttons; Message có nội dung, actions, branches | Mẫu composition, không phải mã ChatGPT nội bộ |
| [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui) · MIT | [Button](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Button/Button.mdx), [Textarea](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Textarea/Textarea.mdx) | Button phân variant/color/size/icon/pill/block/uniform; Textarea autoResize có rows/maxRows riêng; primitive không phải composer | Apps SDK UI dành cho app tích hợp, không phải toàn bộ web ChatGPT |
| [Lumi-UI](https://github.com/mrigankad/Lumi-UI) · Apache-2.0 | [Composer](https://github.com/mrigankad/Lumi-UI/blob/main/src/components/lumi/composer.tsx), [Layout](https://github.com/mrigankad/Lumi-UI/blob/main/src/components/lumi/layout.tsx) | Composer bọc textarea, slot attachment, dãy nút cùng send/stop; Shell/TopBar/Sidebar là vùng cha cao hơn | Mẫu React, không mặc nhiên áp pixel lên 2027 |

Bổ sung nguồn hiện hành chính thức: [assistant-ui primitives architecture](https://www.assistant-ui.com/docs/primitives), trong đó có lưu ý việc mount `ActionBarPrimitive` ngoài `MessagePrimitive.Root` là sai context. Điều này hỗ trợ trực tiếp quy tắc owner/cha trực tiếp, không chỉ quy tắc đặt tên.

## 2. Đối chiếu source nội bộ 2027 trước sửa

| Thành phần | Trước V40 | Cấu trúc đúng |
| --- | --- | --- |
| `FIELD-11` trong `web/src/simple-fields.ts` | Gọi “Ô gõ chat”, vẽ textarea + `+`/`↑` từ `smallButton` có style riêng `.simple-field-action` | Chỉ là một **mẫu composer** trong nhóm input. Parent `form.ds-composer`; con Textarea và Toolbar; nút có `.ui-button` và icon lấy từ `web/icons.svg` |
| `FIELD-10` | Nhìn như ba phần rời | `QUANTITY-STEPPER` là cha của giảm, giá trị, tăng |
| `FIELD-04` | Nhìn như input có ký tự search | `SEARCH-FIELD` là cha; input và icon là con |
| `web/src/composer-gallery.ts` | Bốn demo composer ở gallery cũ dùng `ui-button`. Phát hiện Stop icon xuất hiện khi nút đang disable | V40 sửa thành Stop action có handler hủy timer, label riêng và `type=button`; cần nghiệm thu E4/E5 trên thiết bị |
| `web/src/column-matrix.ts` | Có một schema 20 cột, key và vị trí riêng | `DATA-TABLE` (cha) và `TABLE-COLUMN` (many) — giữ nguyên R09 |

## 3. Nguyên tắc bổ sung nhưng KHÔNG thêm hệ CSS

`screen → region → composition → primitive → token` là **thứ tự phân cấp**, còn `container/content/control/decoration` là **bản chất**. Hai trục này độc lập. Một vùng chỉ chứa một text có thể vẫn là composition nếu nó nắm trạng thái/điều khiển; một icon dù tròn vẫn là nội dung trong button chứ không phải nút. Cardinality `one/optional/many` kiểm soát cấu trúc lặp.

**Thao tác bắt buộc khi thêm bất kỳ mẫu mới:** xác định tên cha và slot; tra chủ sở hữu CSS; loại và cardinality; chỉ tái sử dụng primitive nếu có; bổ sung state/action; test lỗi thiếu cha/sai owner/nhầm button và icon. V40 thêm `web/src/component-contracts.ts` và `auditComposerTree()` cho mẫu composer đang hiển thị trong thư viện. Đây là cơ chế kiểm định **bước đầu**, chưa tự động thay đổi tất cả những mẫu legacy hoặc giao diện production.

## 4. Phân công giai đoạn tiếp theo

1. **Composer + attachments:** kiểm thêm stop/cancel thực sự có handler, loại nút xóa mỗi file, nhãn accessible, keyboard visibility, nút không lẫn input.
2. **Message:** message part (text/image/table/code/attachment), action bar thuộc mỗi message, số lượng một/nhiều.
3. **Thread/Navigation:** cùng một owner cuộn, composer gắn cuối viewport, header/sidebar không chiếm sai chiều cao khi có keyboard.
4. **Table/Popup:** parent có thể scroll/overlay; column là con theo key/role không theo index CSS; action trong dialog thuộc dialog chứ không thuộc message.
5. **E4/E5:** cần thử Safari/Chrome iPhone/Android với bàn phím, focus, text nhiều dòng, attach, disabled/loading và đọc bằng screen reader.

**Không sao chép code từ các nguồn bên ngoài.** Các repo dùng làm chứng cứ kiến trúc, source HTML/TypeScript trong 2027 tự viết để dùng đúng bộ CSS và SVG hiện tại.

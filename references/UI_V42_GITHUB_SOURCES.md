# V42 — nguồn GitHub ChatGPT UI/UX và ScrollAnchor
Ngày: 22/11/2026. Ứng dụng trong phạm vi demo 2027, không lấy CSS nội bộ ChatGPT.

| Nguồn | Chủ đề/cha nên học | Ranh giới |
| --- | --- | --- |
| [assistant-ui ChatGPT example](https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/examples/chatgpt.mdx) | Shell, Thread → Message/Composer | React; tham khảo, không nhập thẳng |
| [architects-toolkit/chat-ui](https://github.com/architects-toolkit/chat-ui) | TypeScript DOM/WebView; composer, parts | MIT; đánh giá trước khi tích hợp |
| [loquix-dev/loquix](https://github.com/loquix-dev/loquix) | ChatContainer → MessageList/Composer | MIT; không tạo bộ CSS song song |
| [miskibin/chat-components](https://github.com/miskibin/chat-components) | Message/composer và data-slot | Xác minh giấy phép cụ thể trước khi dùng |
| [shadcn Chat rules](https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/rules/chat.md) | MessageScroller → append, prepend, jump | Không cài React runtime vào 2027 |
| [TanStack Virtual](https://github.com/TanStack/virtual) | MessageList virtualization | Chỉ dùng sau khi đo hiệu năng |
| [Microsoft open-kosmos](https://github.com/microsoft/open-kosmos) | ChatContainer/find/sidebar/overlays | MIT; xem UX, không sao chép ứng dụng |
| [LibreChat](https://github.com/LibreChat-AI/LibreChat) | Chat/history/search/media | MIT; học hành vi |
| [Lumi UI](https://github.com/mrigankad/Lumi-UI) | Input/Composer, streaming, feedback | Apache-2.0; pattern |
| [OpenAI Apps SDK UI](https://github.com/openai/apps-sdk-ui) | Button, Textarea, Input | MIT, không đại diện CSS chatgpt.com |

## V42 trong mục 7.1
`scroll-preserve.ts` dùng `captureVisibleAnchor(viewport)` và `restoreVisibleAnchor(viewport,anchor)` theo message ID. Khi tải 6 tin cũ thì bù độ dịch của đúng tin đang đọc; ResizeObserver theo dõi thay đổi kích thước các message. Đây mới là demo client-side và không gửi dữ liệu.

E4/E5 cần kiểm nghiệm trên iOS Safari/PWA, Android Chrome/PWA khi bàn phím hiện, ảnh cao/thấp, prepend hàng trăm tin và cuộn thủ công.

# PA2 — Adaptive Chat / 2027 UI-V46 design candidate

**23/11/2026 · E0/E1:** Quyết định: hai vùng hoạt động (Danh bạ + Hội thoại), vùng Công việc chỉ mở khi có ngữ cảnh. Đây là compositional design mới của thư viện mẹ, không dùng mã từ CHAT/TAPHOA cũ.

## Phân cấp và trách nhiệm
```text
UI-LIBRARY → UI-SHELL → UI-SCREEN-SLOT → CHAT-SCREEN
  CHAT-DIRECTORY → DIRECTORY-TOOLS (1 search) + DIRECTORY-LIST (1 scroll)
  CHAT-REGION-TOP → danh tính liên hệ + trở lại (mobile) + mở ngữ cảnh
  CHAT-THREAD → CHAT-MESSAGE-LIST (1 scroll) + CHAT-COMPOSER (1 input)
  CHAT-WORK-REGION [0..1] → context mẫu, đóng mặc định
```

- Desktop preview ≥620px: danh bạ và thread cùng hiển thị; context là panel phụ dạng overlay nằm bên trong screen, không thu nhỏ vùng gõ.
- Mobile preview <620px: một màn chính mỗi lần; bắt đầu ở danh bạ, chọn khách tới hội thoại, quay lại để đổi khách; nếu mở context thì thay bằng màn context, có nút đóng.
- Preview dùng container query **theo vùng xem trước**, không phụ thuộc duy nhất chiều rộng viewport.
- Draft/text thuộc **đúng contactId** trong memory bản mẫu; không gửi mạng, không đọc dữ liệu thật, không động vào DB/notify.
- Input font 16px, button từ UI-BUTTON, textarea thuộc Composer, danh sách và thread có scroll owner riêng. Không tạo viewport/keyboard owner mới.
- Không khôi phục vùng Work đang tắt ở CHAT production: thử nghiệm này chỉ chuẩn hóa kiến trúc mẫu.

## Nghiệm thu
- E1: thay mới cấu trúc mẫu Chat trong `web/src/master-library-v46.ts`, CSS tại `web/styles.css`, static test PA2.
- E2: GitHub Actions `npm run verify` phải PASS; không tự nhận đạt trước khi có log.
- E3: Pages preview chỉ sau khi merge/publish được xác minh.
- E4/E5: Safari iPhone/PWA, Android Chrome/PWA, desktop 1024/1440; keyboard 1–6 dòng, safe area, screen-reader, mở/đóng ngữ cảnh, chuyển 3 khách và giữ draft, cuộn tin. Chưa nghiệm thu thực tế.

**Rollback:** revert các commit PA2; không xóa dữ liệu người dùng.

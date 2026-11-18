# 2027 — Chat UI Shell V01

Bộ khung trò chuyện thống nhất cho **Web App/PWA** (TypeScript/HTML/CSS) và **APK Android native** (Kotlin/Jetpack Compose). Đây là nguồn **UI đầu tiên**, chưa kết nối Auth, backend, dữ liệu thật, gửi tin hoặc tải media.

## Web

```bash
npm install
npm run verify
python3 -m http.server 8000
```

Mở `http://localhost:8000/`. `npm run verify` kiểm thử cấu trúc rồi compile TypeScript từ `web/src/app.ts` thành `web/app.js`.

## Android

```bash
cd android
gradle assembleDebug
```

Yêu cầu JDK 17, Android SDK 35, Gradle 8.11.1. Có thể import thư mục `android/` vào Android Studio để chạy native. Bản APK debug chỉ tồn tại khi Gradle build thành công; chưa có build thì không coi là đã phát hành.

## Preview Pages

Workflow `.github/workflows/pages.yml` biên dịch TypeScript và đóng gói static site. Trong **Settings → Pages**, chọn **GitHub Actions** làm nguồn xuất bản. Sau khi workflow deploy thành công, URL mặc định dự kiến: `https://1sl2tp.github.io/2027/`. Không coi đây là link hoạt động nếu chưa xác nhận deploy.

## Canonical rules

**Chỉ** [RULES.md](./RULES.md) định nghĩa quy tắc dự án, gồm Rule 01 và Rule 02, token giao diện, sơ đồ tiến trình và điều kiện E0–E5.

# UI 2027 V28 — Quy tắc cấu tạo bên trong nút

## Phạm vi
Chỉ **thư viện 2027**. Đây là quy tắc dành cho ứng dụng sẽ dựng mới; không sửa CHAT/TAPHOA/Songoku, không gửi tin thật, không ghi dữ liệu production.

## Nguồn đã đối chiếu
- [OpenAI Apps SDK UI / Button.mdx](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Button/Button.mdx): `size` quyết định chiều cao; `gutterSize` quyết định đệm ngang; `iconSize` tách riêng; `uniform` tạo nút icon vuông; `pill` bo tròn; `opticallyAlign` xử lý bù nhìn; `block` dùng toàn chiều ngang; icon có thể ở đầu hoặc cuối nhãn.
- [OpenAI Apps SDK UI / Button.module.css](https://github.com/openai/apps-sdk-ui/blob/main/src/components/Button/Button.module.css): nút dùng flex, align-items và justify-content center, gap theo token, icon có offset nhỏ -1/-2px tùy cỡ; các chế độ uniform, loading, gutter. **Không sao chép CSS nguyên xi**.
- Các số trong bảng dưới là **quy tắc 2027 tự thiết kế để duyệt**, không phải số đo chính xác của ứng dụng ChatGPT.

## Bóc tách cấu trúc và vai trò

```text
BUTTON (type, kích thước, viền, nền, bo góc, trạng thái)
└── CONTENT (một cụm có tâm hình học)
    ├── LEADING: SVG icon | ảnh thumbnail/avatar | ký tự
    ├── LABEL: chữ 1 dòng | chữ tối đa 2 dòng | số
    └── TRAILING: SVG icon | số dạng badge | trạng thái
```

- Với chỉ chữ, số hoặc icon, cả cụm nằm đúng trung tâm nút.
- Với icon + chữ, tâm nút là tâm của **cả cụm** `icon + gap + label`, không tự động coi tâm riêng phần chữ là tâm.
- Với 3 vùng phải giữ chữ ở tâm bất kể độ rộng icon/badge: dùng `grid-template-columns: 24px minmax(0,1fr) 24px`; với ảnh: `32px minmax(0,1fr) 32px`. Hai đầu **bằng nhau**, không dùng padding bù tùy tiện.
- Dùng **một quy chuẩn** `align-items:center`, `justify-content:center`; SVG có `viewBox` nhất quán và `flex:none`; không dùng ký tự khoảng trắng để căn.
- Chỉ khi hình mũi tên bị lệch về mặt cảm giác, dùng bù thị giác nhỏ, ghi rõ bằng rule `translate(1px,-.5px)` (quy tắc 2027, cần soát ảnh trên máy thật).

## Token kích thước được đề xuất

| Cỡ | Chiều cao tối thiểu | Chữ | Icon SVG | Đệm trái/phải | Gap | Ảnh |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Nhỏ (touch mobile) | 44px | 13px | 18px | 12px | 6px | 24px |
| Vừa | 44px | 14px | 20px | 16px | 8px | 28px |
| Lớn | 52px | 16px | 22px | 18px | 10px | 32px |

- Quy tắc demo đang thực hiện *cỡ vừa* (44px); nút 2 dòng **ít nhất 56px**.
- Chiều cao nút và kích thước **vùng chạm** không thấp hơn 44px trên màn hình mobile. Nút chỉ icon: 44×44, padding 0, tâm SVG 20×20.
- Chữ dùng `line-height` cố định theo cỡ; không dùng `line-height:normal` thay đổi theo font. Số dùng `font-variant-numeric:tabular-nums`.
- Nội dung dài: `min-width:0`, `overflow:hidden`, `text-overflow:ellipsis`; **không ép chữ bé đi**, và nội dung gốc vẫn giữ nguyên trong DOM.
- Ảnh thuộc vùng leading/trailing: `width=height`, `aspect-ratio:1`, `object-fit:cover`, `flex:none`, `border-radius` phù hợp; `img alt=""` khi chỉ trang trí và có nhãn chữ đi cùng.
- Ký tự đơn (A, số 12) nằm ở tâm khung 44×44; glyph và số được định vị bằng dòng chữ có chiều cao rõ ràng, không dùng `position:absolute` bừa bãi.
- Loading giữ khung và nhãn hiện tại, vô hiệu hóa tương tác; demo chỉ thử giao diện, không thực hiện thao tác thật.
- `type="button"` cho mọi mẫu để tránh submit vô ý; icon-only có `aria-label`; nút disabled có thuộc tính `disabled`. Khi dùng `aria-pressed`, phải cập nhật đúng trạng thái thực của nút.
- Các kiểu sắc độ/màu/gradient không nằm trong quy tắc nội dung; được quản lý ở gói theme.

## Các mẫu trong UI

Đường dẫn: `https://1sl2tp.github.io/2027/#simpleButtonRules`, nhóm 6.1, 14 mẫu:
`INNER-01..14`: chữ, icon, icon trái, icon phải, ảnh trái, ảnh phải, ký tự, số, 2 dòng, icon + chữ + số, ảnh + chữ + icon, chữ rất dài, mũi tên bù thị giác, trạng thái đang tải.

Ảnh trong demo là asset SVG tự dựng `web/button-thumbnail.svg` và được tải như `img`, không dùng hình người thật hoặc tài nguyên ngoài.

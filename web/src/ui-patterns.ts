// V16 · Copyable sample components. Static, locally authored templates.
// Inspired by public design-system methodology; not copied from vendor sources.
// All patterns consume the ONE web/styles.css and ONE web/icons.svg registry.
// A copied snippet is presentation only: real applications must bind real handlers.
export interface UiPattern {id:string;group:string;title:string;description:string;html:string}
export interface UiPatternGroup {id:string;label:string;hint:string}
export const UI_PATTERN_GROUPS:UiPatternGroup[]=[
  {
    "id": "typography",
    "label": "Chữ & trạng thái",
    "hint": "Văn bản, số tiền và trạng thái"
  },
  {
    "id": "buttons",
    "label": "Nút & thao tác",
    "hint": "Nút, icon, số lượng, chọn tab"
  },
  {
    "id": "fields",
    "label": "Nhập liệu",
    "hint": "Tìm kiếm, mật khẩu, số tiền"
  },
  {
    "id": "chat",
    "label": "Chat & media",
    "hint": "Danh bạ, tin nhắn, vùng gõ, ảnh"
  },
  {
    "id": "commerce",
    "label": "Bán hàng & bảng",
    "hint": "Sản phẩm, bảng đơn và tổng hợp"
  },
  {
    "id": "invoices",
    "label": "Hóa đơn & phiếu",
    "hint": "Bảng in, đơn tạm, đã giao, kiểm hàng, công nợ"
  },
  {
    "id": "workflow",
    "label": "Công việc",
    "hint": "Thu tiền, duyệt đơn, báo giá"
  },
  {
    "id": "settings",
    "label": "Cài đặt",
    "hint": "Công tắc và lựa chọn"
  },
  {
    "id": "overlays",
    "label": "Popup & phản hồi",
    "hint": "Hộp thoại và thông báo"
  }
];
export const UI_PATTERNS:UiPattern[]=[
  {
    "id": "TEXT-01",
    "group": "typography",
    "title": "Vai trò chữ chuẩn",
    "description": "Sử dụng đúng hệ chữ cho tiêu đề, nội dung, ghi chú và tiền.",
    "html": "<div class=\"ds-stack ds-text-demo\"><h4 class=\"ds-type--title\">Thông tin đơn hàng</h4><p class=\"ds-type--body\">Nội dung rõ ràng, có dấu tiếng Việt và khoảng dòng dễ đọc.</p><p class=\"ds-type--note\">Ghi chú · Kiểm hàng trước khi giao</p><strong class=\"ds-type--money\">125.000 đ</strong></div>"
  },
  {
    "id": "TEXT-02",
    "group": "typography",
    "title": "Trạng thái đơn & công nợ",
    "description": "Nhãn ngắn có ý nghĩa; không chỉ dựa vào màu.",
    "html": "<div class=\"ds-inline ds-wrap\"><span class=\"ds-pill ds-pill--neutral\">Đơn tạm</span><span class=\"ds-pill ds-pill--success\">Đã giao</span><span class=\"ds-pill ds-pill--warning\">Chờ soát</span><span class=\"ds-pill ds-pill--danger\">Quá hạn</span></div>"
  },
  {
    "id": "BTN-01",
    "group": "buttons",
    "title": "Các cấp nút",
    "description": "Nút chính, phụ, nhẹ, cảnh báo, nguy hiểm từ ui-button.",
    "html": "<div class=\"ds-inline ds-wrap\"><button type=\"button\" class=\"ui-button ui-button--primary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-save\"></use></svg>Lưu</button><button type=\"button\" class=\"ui-button ui-button--secondary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-close\"></use></svg>Hủy</button><button type=\"button\" class=\"ui-button ui-button--quiet\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-eye\"></use></svg>Chi tiết</button><button type=\"button\" class=\"ui-button ui-button--warning\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-clipboard\"></use></svg>Cần soát</button><button type=\"button\" class=\"ui-button ui-button--danger\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-trash\"></use></svg>Xóa</button></div>"
  },
  {
    "id": "BTN-02",
    "group": "buttons",
    "title": "Thanh icon thao tác",
    "description": "Dùng action strip và icon SVG chung cho copy, trả lời, chia sẻ, menu.",
    "html": "<div class=\"ui-action-strip ds-action-line\" role=\"group\" aria-label=\"Hành động dưới tin\"><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Sao chép\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-copy\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Trả lời\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-reply\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Chuyển tiếp\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-forward\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Chia sẻ\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-share\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Menu phụ\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-ellipsis\"></use></svg></button></div>"
  },
  {
    "id": "BTN-03",
    "group": "buttons",
    "title": "Nút số lượng − / +",
    "description": "Một vùng bao thống nhất; nút và ô số không có viền focus chồng chéo.",
    "html": "<div class=\"ds-qty\" data-kit-stepper><button type=\"button\" data-kit-minus aria-label=\"Giảm số lượng\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-minus\"></use></svg></button><input type=\"number\" min=\"0\" max=\"999\" value=\"3\" inputmode=\"numeric\" aria-label=\"Số lượng\"><button type=\"button\" data-kit-plus aria-label=\"Tăng số lượng\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-plus\"></use></svg></button></div>"
  },
  {
    "id": "BTN-04",
    "group": "buttons",
    "title": "Chọn chế độ / tab",
    "description": "Nhóm nút có aria-pressed, cùng chiều cao và radius.",
    "html": "<div class=\"ds-segmented\" role=\"group\" aria-label=\"Bộ lọc trạng thái\"><button type=\"button\" aria-pressed=\"true\" data-kit-segment>Tất cả</button><button type=\"button\" aria-pressed=\"false\" data-kit-segment>Đơn tạm</button><button type=\"button\" aria-pressed=\"false\" data-kit-segment>Đã giao</button></div>"
  },
  {
    "id": "INPUT-01",
    "group": "fields",
    "title": "Ô tìm kiếm",
    "description": "Một input chuẩn cho danh bạ, sản phẩm và tìm đơn.",
    "html": "<label class=\"ds-field\"><span>Tìm kiếm</span><span class=\"ds-field-shell\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-search\"></use></svg><input type=\"search\" placeholder=\"Tên khách hoặc sản phẩm...\" aria-label=\"Tìm kiếm mẫu\"></span></label>"
  },
  {
    "id": "INPUT-02",
    "group": "fields",
    "title": "Ô mật khẩu / xác thực",
    "description": "Bộ mẫu form, icon hiển thị mật khẩu không phát sinh đăng nhập.",
    "html": "<div class=\"ds-stack\"><label class=\"ds-field\"><span>Mật khẩu</span><span class=\"ds-field-shell\"><input data-kit-password type=\"password\" value=\"matkhau-demo\" aria-label=\"Mật khẩu mẫu\"><button type=\"button\" class=\"ds-field-trailing\" data-kit-password-toggle aria-label=\"Hiện mật khẩu\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-eye\"></use></svg></button></span></label><button type=\"button\" class=\"ui-button ui-button--primary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-log-in\"></use></svg>Đăng nhập mẫu</button></div>"
  },
  {
    "id": "INPUT-03",
    "group": "fields",
    "title": "Ô nhập số tiền",
    "description": "Căn phải, số đều, một viền chung cho số và đơn vị.",
    "html": "<label class=\"ds-field\"><span>Số tiền thu mẫu</span><span class=\"ds-field-shell ds-field-shell--money\"><input type=\"text\" inputmode=\"decimal\" value=\"150.000\" aria-label=\"Số tiền mẫu\"><b>đ</b></span></label>"
  },
  {
    "id": "CHAT-01",
    "group": "chat",
    "title": "Hàng danh bạ",
    "description": "Avatar, hai dòng thông tin và trạng thái ở mép phải.",
    "html": "<div class=\"ds-contact\"><span class=\"ds-avatar\">KH</span><div class=\"ds-contact-main\"><strong>Khách hàng mẫu</strong><small>Đã gửi thông tin đơn hàng</small></div><span class=\"ds-unread\" aria-label=\"2 tin chưa đọc\">2</span></div>"
  },
  {
    "id": "CHAT-02",
    "group": "chat",
    "title": "Tin nhắn & thao tác",
    "description": "Nội dung và action strip luôn cùng một hệ icon.",
    "html": "<div class=\"ds-message\"><p>Cho mình xem lại số lượng và tổng tiền đơn hôm nay nhé.</p><div class=\"ui-action-strip\" role=\"group\" aria-label=\"Thao tác tin nhắn\"><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Sao chép\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-copy\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Trả lời\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-reply\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--message-action\" data-kit-action=\"preview\" aria-label=\"Chia sẻ\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-share\"></use></svg></button></div></div>"
  },
  {
    "id": "CHAT-03",
    "group": "chat",
    "title": "Ô gõ chat rút gọn",
    "description": "Dùng lại các nút hiện có; không kết nối nhắn tin thật.",
    "html": "<div class=\"ds-composer\"><textarea rows=\"1\" placeholder=\"Nhập tin nhắn…\" aria-label=\"Gõ tin mẫu\"></textarea><div class=\"ds-composer-actions\"><button type=\"button\" class=\"ui-button ui-button--icon\" data-kit-action=\"preview\" aria-label=\"Thêm media\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-plus\"></use></svg></button><span class=\"ds-spacer\"></span><button type=\"button\" class=\"ui-button ui-button--mode\" data-kit-action=\"preview\">Cao <svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-chevron\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--icon\" data-kit-action=\"preview\" aria-label=\"Micro\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-mic\"></use></svg></button><button type=\"button\" class=\"ui-button ui-button--send\" data-kit-action=\"preview\" aria-label=\"Gửi mẫu\"><span class=\"ui-send-disc\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-send-up\"></use></svg></span></button></div></div>"
  },
  {
    "id": "CHAT-04",
    "group": "chat",
    "title": "Ảnh chờ gửi",
    "description": "Thumbnail & nút xóa, không tải dữ liệu lên máy chủ.",
    "html": "<div class=\"ds-media-list\"><div class=\"ds-media-tile\"><span class=\"ds-media-placeholder\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-eye\"></use></svg></span><span>Ảnh 01</span><button type=\"button\" data-kit-action=\"remove-media\" aria-label=\"Xóa ảnh mẫu\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-close\"></use></svg></button></div><div class=\"ds-media-tile\"><span class=\"ds-media-placeholder\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-eye\"></use></svg></span><span>Ảnh 02</span><button type=\"button\" data-kit-action=\"remove-media\" aria-label=\"Xóa ảnh mẫu\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-close\"></use></svg></button></div></div>"
  },
  {
    "id": "SALE-01",
    "group": "commerce",
    "title": "Hàng sản phẩm",
    "description": "Tên, giá, số lượng; có thể dùng trong bán hàng và kiểm hàng.",
    "html": "<div class=\"ds-product-row\"><div class=\"ds-product-text\"><strong>Sữa hộp loại 180 ml</strong><small>Đơn giá 25.000 đ</small></div><div class=\"ds-qty\" data-kit-stepper><button type=\"button\" data-kit-minus aria-label=\"Giảm\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-minus\"></use></svg></button><input type=\"number\" min=\"0\" max=\"999\" value=\"2\" aria-label=\"Số lượng sản phẩm\"><button type=\"button\" data-kit-plus aria-label=\"Tăng\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-plus\"></use></svg></button></div></div>"
  },
  {
    "id": "SALE-02",
    "group": "commerce",
    "title": "Bảng đơn hàng",
    "description": "Cột số căn phải và STT/SL căn giữa; cùng thang chữ.",
    "html": "<div class=\"ds-table-scroll\"><table class=\"ds-table\"><thead><tr><th>STT</th><th>Tên sản phẩm</th><th>SL</th><th>Đơn giá</th><th>Thành tiền</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp</td><td>3</td><td>25.000</td><td>75.000</td></tr></tbody></table></div>"
  },
  {
    "id": "SALE-03",
    "group": "commerce",
    "title": "Tổng tiền hóa đơn",
    "description": "Khối tổng có phân cấp rõ, dùng cho đơn tạm và đã giao.",
    "html": "<div class=\"ds-summary\"><div><span>Tạm tính</span><b>139.000 đ</b></div><div><span>Giảm giá</span><b>0 đ</b></div><div class=\"ds-summary-total\"><strong>Tổng cộng</strong><strong>139.000 đ</strong></div></div>"
  },
  {
    "id": "WORK-01",
    "group": "workflow",
    "title": "Công nợ & thu tiền",
    "description": "Nhóm nút phục vụ luồng công việc, chỉ giao diện thử.",
    "html": "<div class=\"ds-inline ds-wrap\"><button type=\"button\" class=\"ui-button ui-button--secondary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-wallet\"></use></svg>Xem công nợ</button><button type=\"button\" class=\"ui-button ui-button--success\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-check\"></use></svg>Thu tiền mẫu</button><button type=\"button\" class=\"ui-button ui-button--quiet\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-share\"></use></svg>Chia sẻ</button></div>"
  },
  {
    "id": "WORK-02",
    "group": "workflow",
    "title": "Soát hàng & duyệt",
    "description": "Nút phụ/điều kiện/ưu tiên hiển thị theo vai trò.",
    "html": "<div class=\"ds-inline ds-wrap\"><button type=\"button\" class=\"ui-button ui-button--secondary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-close\"></use></svg>Hủy</button><button type=\"button\" class=\"ui-button ui-button--warning\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-clipboard\"></use></svg>Soát hàng</button><button type=\"button\" class=\"ui-button ui-button--primary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-check-circle\"></use></svg>Duyệt mẫu</button></div>"
  },
  {
    "id": "WORK-03",
    "group": "workflow",
    "title": "Báo giá & giá riêng",
    "description": "Nút làm mới giá, quản lý giá và tạo mẫu báo giá.",
    "html": "<div class=\"ds-inline ds-wrap\"><button type=\"button\" class=\"ui-button ui-button--secondary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-refresh\"></use></svg>Làm mới giá</button><button type=\"button\" class=\"ui-button ui-button--outline\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-edit\"></use></svg>Giá riêng</button><button type=\"button\" class=\"ui-button ui-button--primary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-receipt\"></use></svg>Báo giá mẫu</button></div>"
  },
  {
    "id": "SETTING-01",
    "group": "settings",
    "title": "Công tắc & cài đặt",
    "description": "Có aria-pressed và nhãn diễn giải trạng thái.",
    "html": "<div class=\"ds-setting-row\"><div><strong>Thông báo mẫu</strong><small>Chỉ đổi trạng thái trong thư viện</small></div><button type=\"button\" class=\"ds-switch\" data-kit-switch aria-label=\"Bật thông báo mẫu\" aria-pressed=\"false\"><span></span></button></div>"
  },
  {
    "id": "OVERLAY-01",
    "group": "overlays",
    "title": "Hộp xác nhận",
    "description": "Mẫu vùng cha–con và hàng nút đóng/xác nhận.",
    "html": "<div class=\"ds-confirm\"><h4>Xác nhận thao tác mẫu</h4><p>Thao tác này không tạo đơn hoặc thu tiền thật.</p><div class=\"ds-inline ds-wrap\"><button type=\"button\" class=\"ui-button ui-button--secondary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-close\"></use></svg>Hủy</button><button type=\"button\" class=\"ui-button ui-button--primary\" data-kit-action=\"preview\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-check\"></use></svg>Đồng ý mẫu</button></div></div>"
  },
  {
    "id": "OVERLAY-02",
    "group": "overlays",
    "title": "Thông báo trạng thái",
    "description": "Hiển thị kết quả và nút đóng nhẹ, không phải thông báo push.",
    "html": "<div class=\"ds-toast\" role=\"status\"><span><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-check-circle\"></use></svg></span><div><strong>Đã lưu mẫu</strong><small>Chỉ là trạng thái minh họa trên trang này.</small></div><button type=\"button\" class=\"ui-button ui-button--icon\" data-kit-action=\"close-toast\" aria-label=\"Đóng thông báo\"><svg class=\"ui-icon\" aria-hidden=\"true\"><use href=\"./web/icons.svg#ui-icon-close\"></use></svg></button></div>"
  },
  {
    "id": "INV-00",
    "group": "invoices",
    "title": "Đen trắng chuẩn in (00)",
    "description": "Bảng gốc chuẩn bản in, kẻ ô rõ, ít mực; ưu tiên số và phép tính.",
    "html": "<article class=\"ds-invoice ds-invoice--print\" data-invoice-variant=\"print\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>HÓA ĐƠN</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Mẫu 00 trong bộ palette TAPHOA: đen trắng chuẩn in.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-01",
    "group": "invoices",
    "title": "Tối giản, kẻ ngang (01)",
    "description": "Nền trắng/xám rất nhẹ; các dòng không dùng viền dọc.",
    "html": "<article class=\"ds-invoice ds-invoice--minimal\" data-invoice-variant=\"minimal\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>HÓA ĐƠN</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Mẫu 01 tham chiếu palette Tối giản của TAPHOA.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-02",
    "group": "invoices",
    "title": "Business Navy (02)",
    "description": "Header navy trầm; cấu trúc bảng và cột tiền không thay đổi.",
    "html": "<article class=\"ds-invoice ds-invoice--navy\" data-invoice-variant=\"navy\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>HÓA ĐƠN</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Mẫu 02 tham chiếu palette Business Navy của TAPHOA.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-03",
    "group": "invoices",
    "title": "Retail Green (03)",
    "description": "Header xanh dịu; cấu trúc hóa đơn giữ nguyên.",
    "html": "<article class=\"ds-invoice ds-invoice--sage\" data-invoice-variant=\"sage\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>HÓA ĐƠN</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Mẫu 03 tham chiếu palette Retail Green của TAPHOA.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-04",
    "group": "invoices",
    "title": "Bảng hóa đơn kẻ dọc đầy đủ",
    "description": "Bảng 5 cột có đường kẻ ngang/dọc, hợp đối chiếu số liệu.",
    "html": "<article class=\"ds-invoice ds-invoice--full-grid\" data-invoice-variant=\"full-grid\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>CHI TIẾT HÓA ĐƠN</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Kẻ toàn bộ ô để kiểm tra STT, tên, SL, giá và thành tiền.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-05",
    "group": "invoices",
    "title": "Hóa đơn gọn trên điện thoại",
    "description": "Dạng bảng ưu tiên tên hàng và dòng tổng; cuộn riêng nếu màn nhỏ.",
    "html": "<article class=\"ds-invoice ds-invoice--compact\" data-invoice-variant=\"compact\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>HÓA ĐƠN GỌN</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Bảng giữ nguyên ngữ nghĩa 5 cột, không đẩy các số lệch cột.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table ds-invoice-table--compact\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-06",
    "group": "invoices",
    "title": "Đơn tạm chưa gửi",
    "description": "Trạng thái rõ và không giả đã giao hay đã thu.",
    "html": "<article class=\"ds-invoice ds-invoice--draft\" data-invoice-variant=\"draft\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>ĐƠN TẠM</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Chưa giao · Chưa gửi cho khách. Chỉ là dữ liệu mẫu.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-07",
    "group": "invoices",
    "title": "Đơn đã giao",
    "description": "Có tên khách, thời gian, các cột và số tiền hoàn chỉnh.",
    "html": "<article class=\"ds-invoice ds-invoice--delivered\" data-invoice-variant=\"delivered\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>ĐÃ GIAO</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Đơn hàng mẫu đã giao; trạng thái giao không đồng nghĩa đã thu tiền.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  },
  {
    "id": "INV-08",
    "group": "invoices",
    "title": "Phiếu kiểm / đối soát hàng",
    "description": "Bảng số lượng đặt, số lượng thực nhận và ghi chú; không ghi nhận giao thật.",
    "html": "<article class=\"ds-invoice ds-invoice--checklist\" data-invoice-variant=\"checklist\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>PHIẾU KIỂM HÀNG</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Dùng cùng trục tên và số lượng; các ô đánh dấu chưa kết nối nghiệp vụ.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table ds-invoice-table--check\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL ĐẶT</th><th scope=\"col\">SL THỰC</th><th scope=\"col\">GHI CHÚ</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>2</td><td>Đủ</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>2</td><td>Thiếu 1</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>1</td><td>Đủ</td></tr></tbody></table></div><div class=\"ds-invoice-check-summary\"><strong>Đã đối chiếu:</strong> 5 / 6 sản phẩm theo số lượng · <strong>Thiếu:</strong> 1</div><footer class=\"ds-invoice-note\">Phiếu mẫu để soát hàng trước duyệt, không thay đổi đơn thật.</footer></article>"
  },
  {
    "id": "INV-09",
    "group": "invoices",
    "title": "Hóa đơn kèm công nợ & khoản thu",
    "description": "Tách rõ tổng tiền, số đã thu và số còn phải thanh toán.",
    "html": "<article class=\"ds-invoice ds-invoice--debt\" data-invoice-variant=\"debt\"><header class=\"ds-invoice-header\"><div class=\"ds-invoice-brand\"><strong>TẠP HÓA · MẪU</strong><small>Hóa đơn minh họa · Không phải chứng từ thật</small></div><div class=\"ds-invoice-meta\"><strong>DH-MAU-007</strong><span>HÓA ĐƠN / CÔNG NỢ</span></div></header><div class=\"ds-invoice-customer\"><span><b>Khách hàng:</b> Khách mẫu A</span><span><b>Ngày:</b> 22/11/2026 · 08:30</span></div><p class=\"ds-invoice-caption\">Ghi nhận thu mẫu 100.000 đ, không kết nối ngân hàng.</p><div class=\"ds-invoice-scroll\"><table class=\"ds-invoice-table\"><thead><tr><th scope=\"col\">STT</th><th scope=\"col\">TÊN HÀNG</th><th scope=\"col\">SL</th><th scope=\"col\">ĐƠN GIÁ</th><th scope=\"col\">THÀNH TIỀN</th></tr></thead><tbody><tr><td>1</td><td>Gạo loại 1 kg</td><td>2</td><td>32.000</td><td>64.000</td></tr><tr><td>2</td><td>Sữa hộp 180 ml</td><td>3</td><td>25.000</td><td>75.000</td></tr><tr><td>3</td><td>Bánh quy bơ</td><td>1</td><td>48.000</td><td>48.000</td></tr></tbody></table></div><div class=\"ds-invoice-totals\"><div><span>Cộng tiền hàng</span><b>187.000 đ</b></div><div><span>Giảm giá mẫu</span><b>−7.000 đ</b></div><div class=\"ds-invoice-grand\"><strong>TỔNG THANH TOÁN</strong><strong>180.000 đ</strong></div><div><span>Đã thu mẫu</span><b>100.000 đ</b></div><div class=\"ds-invoice-debt\"><strong>Còn phải thanh toán</strong><strong>80.000 đ</strong></div></div><footer class=\"ds-invoice-note\">Ghi chú: Giao hàng đủ số lượng, kiểm tra trước khi nhận. · Dữ liệu thử.</footer></article>"
  }
];

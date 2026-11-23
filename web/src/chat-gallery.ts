// 2027 Chat Gallery CG-V01. Independent, local-only demo; never connects to a backend.
type Layout = 'open' | 'compact' | 'work';
type Device = 'desktop' | 'phone' | 'keyboard';
type Filter = 'all' | 'text' | 'order' | 'media' | 'receipt';
type Notification = 'directory' | 'locked' | 'active' | 'other' | 'off';
type ContactId = 'a' | 'group' | 'b';
type Kind = Exclude<Filter, 'all'>;
type Sample = { kind: Kind; side: 'incoming' | 'outgoing'; html: string; time: string };
const $ = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error('Missing demo element: ' + id);
  return element as T;
};
const contacts: Record<ContactId, {name: string; hint: string; avatar: string; color: string; preview: string; time: string}> = {
  a: {name: 'Khách mẫu A', hint: 'Mẫu hội thoại bán hàng', avatar: 'A', color: 'sage', preview: 'Mình gửi đơn mẫu nhé', time: '09:18'},
  group: {name: 'Nhóm lấy hàng', hint: 'Mẫu danh sách và ảnh', avatar: 'N', color: 'violet', preview: 'Danh sách hàng sáng mai', time: '08:44'},
  b: {name: 'Khách mẫu B', hint: 'Mẫu tin nhắn và bill', avatar: 'B', color: 'apricot', preview: 'Đã gửi ảnh bill mẫu', time: '08:35'}
};
const quantity = '<div class="cg-order-box"><div class="cg-order-heading"><b>Danh sách lấy hàng</b><span>3 mặt hàng</span></div><div class="cg-order-row cg-order-label"><span>STT</span><span>Tên hàng</span><span>SL</span></div><div class="cg-order-row"><span>01</span><span>Sữa hộp 180 ml</span><b>12</b></div><div class="cg-order-row"><span>02</span><span>Bánh quy bơ</span><b>3</b></div><div class="cg-order-row"><span>03</span><span>Nước suối 500 ml</span><b>24</b></div><p>Ghi chú: Giao buổi sáng.</p></div>';
const order = '<div class="cg-order-box cg-order-confirm"><div class="cg-order-heading"><b>Đơn hàng mẫu</b><span>#DM-001</span></div><div class="cg-order-row cg-order-label"><span>STT</span><span>Tên hàng</span><span>Thành tiền</span></div><div class="cg-order-row"><span>01</span><span>Sữa hộp · 2 × 30.000đ</span><b>60.000đ</b></div><div class="cg-order-row"><span>02</span><span>Bánh quy · 3 × 15.000đ</span><b>45.000đ</b></div><div class="cg-order-total"><span>Tổng cộng</span><strong>105.000đ</strong></div></div>';
const media = '<div class="cg-media-message"><div class="cg-media-grid"><span class="cg-photo-a">Ảnh mẫu 1</span><span class="cg-photo-b">Ảnh mẫu 2</span><span class="cg-photo-c">Ảnh mẫu 3</span></div><small>3 ảnh mẫu · Không phải ảnh khách hàng</small></div>';
const receipt = '<div class="cg-receipt"><span>CHỨNG TỪ CHUYỂN KHOẢN · MẪU</span><strong>105.000 đ</strong><div><span>Thời gian</span><b>09:18 · 23/11/2026</b></div><div><span>Nội dung</span><b>Thanh toán đơn demo</b></div><small>Chưa đối soát · Không tự thu</small></div>';
const examples: Record<ContactId, Sample[]> = {
  a: [
    {kind:'text',side:'incoming',html:'Chào bạn, mình cần lấy một ít hàng cho ngày mai.',time:'09:10'},
    {kind:'text',side:'outgoing',html:'Mình gửi mẫu danh sách để bạn kiểm tra nhé.',time:'09:11'},
    {kind:'order',side:'incoming',html:quantity,time:'09:12'},
    {kind:'text',side:'incoming',html:'Nếu thiếu loại nào thì báo lại giúp mình trước khi chốt.',time:'09:13'},
    {kind:'order',side:'outgoing',html:order,time:'09:16'},
    {kind:'media',side:'incoming',html:media,time:'09:17'},
    {kind:'receipt',side:'incoming',html:receipt,time:'09:18'}
  ],
  group: [
    {kind:'text',side:'incoming',html:'Cả nhóm xem danh sách hàng sáng mai giúp mình nhé.',time:'08:40'},
    {kind:'order',side:'incoming',html:quantity,time:'08:41'},
    {kind:'text',side:'outgoing',html:'Mình đã sắp xếp lại theo tên và số lượng.',time:'08:42'},
    {kind:'media',side:'incoming',html:media,time:'08:43'},
    {kind:'receipt',side:'outgoing',html:receipt,time:'08:44'}
  ],
  b: [
    {kind:'text',side:'incoming',html:'Mình gửi ảnh bill để đối chiếu nhé.',time:'08:30'},
    {kind:'receipt',side:'incoming',html:receipt,time:'08:31'},
    {kind:'text',side:'outgoing',html:'Đã nhận mẫu. Chưa xác minh chuyển khoản nên chưa ghi thu.',time:'08:32'},
    {kind:'order',side:'outgoing',html:order,time:'08:33'},
    {kind:'media',side:'incoming',html:media,time:'08:35'}
  ]
};
let layout: Layout = 'open';
let device: Device = 'desktop';
let filter: Filter = 'all';
let notification: Notification = 'directory';
let contact: ContactId = 'a';
const localAdditions: Record<ContactId, string[]> = {a:[],group:[],b:[]};
const messages = $<HTMLDivElement>('cgMessages');
const frame = $<HTMLDivElement>('cgDevice');
const composer = $<HTMLFormElement>('cgComposer');
const input = $<HTMLTextAreaElement>('cgInput');
const noticeDesc: Record<Notification,string> = {
  directory:'Đang ở danh bạ: chỉ tăng dấu chưa đọc tại hội thoại B. Không thêm banner trùng.',
  locked:'Máy khoá: một bản xem trước thông báo hệ thống; không hiển thị cùng lúc ở danh bạ.',
  active:'Đang mở đúng hội thoại: tin được xem trong vùng nội dung, không hiện push lần hai.',
  other:'Đang đọc hội thoại khác: một gợi ý nhỏ trong ứng dụng và dấu chưa đọc ở B.',
  off:'Thông báo được ẩn hoàn toàn trong bản mô phỏng.'
};
const layoutDesc: Record<Layout,string> = {
  open:'A · Ưu tiên vùng đọc; chỉ tin gửi có nền nhẹ, mọi nội dung dùng cùng một trục.',
  compact:'B · Hai chiều có nền rõ, khoảng cách giảm để đọc nhiều tin liên tục.',
  work:'C · Nội dung dạng bảng, phiếu và nhãn loại được ưu tiên; không tăng số vùng cố định.'
};
function setPressed(attribute: string, value: string): void {
  document.querySelectorAll<HTMLButtonElement>('button[' + attribute + ']').forEach((button) => {
    const active = button.getAttribute(attribute) === value;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function renderContacts(): void {
  const list = $('cgContacts');
  list.replaceChildren();
  (Object.keys(contacts) as ContactId[]).forEach((id) => {
    const value = contacts[id];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cg-contact-item' + (contact === id ? ' is-selected' : '');
    button.setAttribute('aria-pressed', String(contact === id));
    button.setAttribute('aria-label', 'Mở hội thoại ' + value.name);
    const avatar = document.createElement('span');
    avatar.className = 'cg-avatar cg-avatar-' + value.color;
    avatar.textContent = value.avatar;
    const text = document.createElement('span');
    text.className = 'cg-contact-copy';
    const name = document.createElement('strong');
    name.textContent = value.name;
    const preview = document.createElement('small');
    preview.textContent = value.preview;
    text.append(name,preview);
    const meta = document.createElement('span');
    meta.className = 'cg-contact-meta';
    const time = document.createElement('small');
    time.textContent = value.time;
    meta.append(time);
    if (id === 'b' && (notification === 'directory' || notification === 'other')) {
      const count = document.createElement('b');
      count.className = 'cg-unread-badge';
      count.textContent = '1';
      count.setAttribute('aria-label','1 tin chưa đọc');
      meta.append(count);
    }
    button.append(avatar,text,meta);
    button.addEventListener('click', () => {
      contact = id;
      frame.dataset.view = 'thread';
      renderContacts();
      renderMessages();
      renderHeader();
      applyNotification();
    });
    list.append(button);
  });
  applySearch();
}
function applySearch(): void {
  const query = $<HTMLInputElement>('cgSearch').value.trim().toLocaleLowerCase('vi');
  document.querySelectorAll<HTMLElement>('.cg-contact-item').forEach((button) => {
    button.hidden = Boolean(query) && !button.textContent?.toLocaleLowerCase('vi').includes(query);
  });
}
function renderHeader(): void {
  const value = contacts[contact];
  $('cgThreadTitle').textContent = value.name;
  $('cgThreadSubtitle').textContent = value.hint;
  $('cgThreadAvatar').textContent = value.avatar;
  $('cgThreadAvatar').className = 'cg-avatar cg-avatar-thread cg-avatar-' + value.color;
}
function renderMessages(): void {
  messages.replaceChildren();
  const day = document.createElement('div');
  day.className = 'cg-day-marker';
  day.textContent = 'Hôm nay · Nội dung giả lập';
  messages.append(day);
  examples[contact].forEach((item) => {
    const row = document.createElement('article');
    row.className = 'cg-item cg-item-' + item.side;
    row.dataset.kind = item.kind;
    const body = document.createElement('div');
    body.className = 'cg-message cg-message-' + item.kind;
    // Content below comes exclusively from hard-coded local demo templates.
    body.innerHTML = item.html;
    const meta = document.createElement('div');
    meta.className = 'cg-message-meta';
    meta.textContent = item.time + (item.side === 'outgoing' ? ' · Đã xem' : '');
    row.append(body,meta);
    messages.append(row);
  });
  localAdditions[contact].forEach((value) => {
    const row = document.createElement('article');
    row.className = 'cg-item cg-item-outgoing';
    row.dataset.kind = 'text';
    const body = document.createElement('div');
    body.className = 'cg-message cg-message-text';
    body.textContent = value;
    const meta = document.createElement('div');
    meta.className = 'cg-message-meta';
    meta.textContent = 'Vừa thêm · Chỉ ở bản demo';
    row.append(body,meta);
    messages.append(row);
  });
  applyFilter();
  requestAnimationFrame(() => {messages.scrollTop=messages.scrollHeight; checkScroll();});
}
function applyFilter(): void {
  let count=0;
  messages.querySelectorAll<HTMLElement>('.cg-item').forEach((row) => {
    row.hidden=filter!=='all' && row.dataset.kind!==filter;
    if (!row.hidden) count++;
  });
  const old=messages.querySelector('.cg-empty');
  if(old) old.remove();
  if(count===0){
    const empty=document.createElement('div');
    empty.className='cg-empty';
    empty.textContent='Hội thoại này chưa có nội dung mẫu thuộc loại đã chọn.';
    messages.append(empty);
  }
}
function checkScroll(): void {
  $('cgUnreadJump').hidden = messages.scrollHeight - messages.scrollTop - messages.clientHeight < 100;
}
function applyNotification(): void {
  const system=$('cgSystemBanner');
  const inline=$('cgContextInline');
  system.hidden=notification!=='locked';
  inline.hidden=notification!=='other';
  inline.textContent=notification==='other' ? 'Khách mẫu B có tin mới · Chọn ở danh bạ để xem' : '';
  $('cgNoticeDescription').textContent=noticeDesc[notification];
  renderContacts();
}
function changeDevice(value: Device): void {
  device=value;
  frame.dataset.device=device;
  frame.dataset.view='thread';
  setPressed('data-device',device);
  requestAnimationFrame(()=> {messages.scrollTop=messages.scrollHeight; checkScroll();});
}
function closeExtra():void {
  document.querySelector('.cg-add-menu')?.remove();
}
document.querySelectorAll<HTMLButtonElement>('[data-layout]').forEach(button=>button.addEventListener('click',()=>{
  layout=button.dataset.layout as Layout;
  frame.dataset.layout=layout;
  setPressed('data-layout',layout);
  $('cg-explain').textContent=layoutDesc[layout];
}));
document.querySelectorAll<HTMLButtonElement>('[data-device]').forEach(button=>button.addEventListener('click',()=>changeDevice(button.dataset.device as Device)));
document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter as Filter;
  setPressed('data-filter',filter);
  renderMessages();
}));
document.querySelectorAll<HTMLButtonElement>('[data-notification]').forEach(button=>button.addEventListener('click',()=>{
  notification=button.dataset.notification as Notification;
  setPressed('data-notification',notification);
  applyNotification();
}));
$('cgBack').addEventListener('click',()=>{frame.dataset.view='contacts';closeExtra();});
$('cgJump').addEventListener('click',()=>{messages.scrollTop=messages.scrollHeight;checkScroll();});
$('cgUnreadJump').addEventListener('click',()=>{messages.scrollTop=messages.scrollHeight;checkScroll();});
$('cgNewChat').addEventListener('click',()=>{contact='group';frame.dataset.view='thread';renderHeader();renderContacts();renderMessages();applyNotification();});
$('cgMore').addEventListener('click',()=>{$('cgStatus').textContent='Tuỳ chọn đang minh hoạ: đổi bố cục A/B/C hoặc dùng bộ lọc nội dung phía trên.';});
$<HTMLInputElement>('cgSearch').addEventListener('input',applySearch);
messages.addEventListener('scroll',checkScroll,{passive:true});
input.addEventListener('input',()=>{
  input.style.height='auto';
  input.style.height=Math.min(input.scrollHeight,112)+'px';
});
composer.addEventListener('submit',(event)=>{
  event.preventDefault();
  const text=input.value.trim();
  if(!text)return;
  localAdditions[contact].push(text.slice(0,1000));
  filter='all';
  setPressed('data-filter',filter);
  input.value='';
  input.style.height='auto';
  closeExtra();
  renderMessages();
  $('cgStatus').textContent='Đã thêm một tin mẫu cục bộ. Không gửi thông báo, không kết nối API.';
});
$('cgAdd').addEventListener('click',()=>{
  const existing=document.querySelector('.cg-add-menu');
  if(existing){closeExtra();return;}
  const menu=document.createElement('div');
  menu.className='cg-add-menu';
  [['Danh sách hàng','order'],['Ảnh mẫu','media'],['Bill mẫu','receipt']].forEach(([label,kind])=>{
    const button=document.createElement('button');
    button.type='button';
    button.textContent=label;
    button.addEventListener('click',()=>{filter=kind as Filter;setPressed('data-filter',filter);renderMessages();closeExtra();});
    menu.append(button);
  });
  composer.append(menu);
});
renderContacts();
renderHeader();
renderMessages();
applyNotification();

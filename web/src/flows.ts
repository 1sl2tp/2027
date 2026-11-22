// 2027 UI-V04 · One visual system and one in-memory data model for all three frames.
// All records are invented, local demo values. No authentication, APIs, sends or transactions.
type ModuleKey = "chat" | "work" | "sales";
type DeviceKey = "desktop" | "phone";
type OrderStatus = "draft" | "delivered";
type MessageKind = "text" | "image";
type SectionKey = "contacts" | "thread" | "payments" | "summary" | "invoice" | "debts" | "quotes" | "products" | "drafts" | "delivered" | "settings";
interface Customer { id:string; name:string; note:string; }
interface Product { id:string; name:string; unit:string; price:number; }
interface Line { productId:string; quantity:number; price:number; }
interface Order { id:string; customerId:string; status:OrderStatus; lines:Line[]; }
interface Payment { customerId:string; amount:number; }
interface DemoMessage { customerId:string; kind:MessageKind; body:string; imageUrl?:string; incoming?:boolean; }
interface UiState {
  signedIn:boolean; displayName:string; module:ModuleKey; device:DeviceKey;
  section:Record<ModuleKey,SectionKey>; customerId:string; orderId:string;
  orders:Order[]; payments:Payment[]; messages:DemoMessage[];
  nextOrder:number; compact:boolean; showTotals:boolean; draftText:string;
}
const customers:Customer[] = [
 {id:"a",name:"Khách mẫu A",note:"Nhóm khách hàng"},
 {id:"b",name:"Khách mẫu B",note:"Nhóm khách hàng"},
 {id:"c",name:"Khách mẫu C",note:"Nhóm khách hàng"}
];
const products:Product[] = [
 {id:"p1",name:"Sữa hộp 180ml",unit:"hộp",price:12000},
 {id:"p2",name:"Nước khoáng 500ml",unit:"chai",price:6000},
 {id:"p3",name:"Bánh quy bơ",unit:"gói",price:26000},
 {id:"p4",name:"Gạo 1kg",unit:"kg",price:18000}
];
const defaultSections:Record<ModuleKey,SectionKey> = {chat:"contacts",work:"summary",sales:"products"};
const moduleNames:Record<ModuleKey,string>={chat:"Trò chuyện",work:"Công việc",sales:"Bán hàng"};
const subnav:Record<ModuleKey,{key:SectionKey;label:string}[]> = {
  chat:[{key:"contacts",label:"Danh bạ"},{key:"thread",label:"Hội thoại"}],
  work:[{key:"payments",label:"Thu tiền"},{key:"summary",label:"Tổng hợp đơn"},{key:"invoice",label:"Ảnh đơn"},{key:"debts",label:"Công nợ"},{key:"quotes",label:"Báo giá"}],
  sales:[{key:"products",label:"Chọn sản phẩm"},{key:"drafts",label:"Đơn tạm"},{key:"delivered",label:"Đã giao"},{key:"debts",label:"Công nợ"},{key:"settings",label:"Cài đặt"}]
};
const newState=():UiState=>({
 signedIn:false,displayName:"",module:"chat",device:"desktop",section:{...defaultSections},
 customerId:"a",orderId:"DH-101",nextOrder:201,compact:false,showTotals:true,draftText:"",
 orders:[
  {id:"DH-101",customerId:"a",status:"delivered",lines:[{productId:"p1",quantity:5,price:12000},{productId:"p3",quantity:2,price:26000}]},
  {id:"DT-102",customerId:"b",status:"draft",lines:[{productId:"p4",quantity:2,price:18000}]},
  {id:"DH-103",customerId:"c",status:"delivered",lines:[{productId:"p2",quantity:4,price:6000}]}
 ],
 payments:[{customerId:"a",amount:30000}],
 messages:[{customerId:"a",kind:"text",incoming:true,body:"Đây là hội thoại mẫu. Tin nhắn chỉ xuất hiện trong bản xem thử."}]
});
let state:UiState=newState();
const root=document.getElementById("flowApp") as HTMLDivElement;
const statusEl=document.getElementById("flowStatus") as HTMLSpanElement;
const memoryUrls:string[]=[];
const vn=(n:number):string=>new Intl.NumberFormat("vi-VN").format(n)+" đ";
const encode=(s:string):string=>s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]||c));
const customer=():Customer=>customers.find(c=>c.id===state.customerId)||customers[0];
const product=(id:string):Product=>products.find(p=>p.id===id)||products[0];
const customerOrders=(id=state.customerId):Order[]=>state.orders.filter(o=>o.customerId===id);
const orderAmount=(o:Order):number=>o.lines.reduce((s,l)=>s+l.quantity*l.price,0);
const deliveredTotal=(id=state.customerId):number=>customerOrders(id).filter(o=>o.status==="delivered").reduce((s,o)=>s+orderAmount(o),0);
const paidTotal=(id=state.customerId):number=>state.payments.filter(p=>p.customerId===id).reduce((s,p)=>s+p.amount,0);
const debt=(id=state.customerId):number=>Math.max(0,deliveredTotal(id)-paidTotal(id));
const demoNote='<span class="flow-small-note">Mô phỏng trong trình duyệt · Không gửi hoặc ghi nhận thật</span>';
function notice(message:string):void{statusEl.textContent=message;}
function navigate(module:ModuleKey,section?:SectionKey):void{
 state.module=module;if(section)state.section[module]=section;
 history.replaceState(null,"","#"+module+"/"+state.section[module]);
 render();
}
function setCustomer(id:string):void {
 if(customers.some(c=>c.id===id)){
  state.customerId=id;
  const first=customerOrders(id).find(o=>o.status==="delivered");
  state.orderId=first?.id||"";
  state.draftText="";
  render();
 }
}
function labeledRows(o:Order):string {
 return o.lines.map(l=>'<div class="flow-line"><span>'+encode(product(l.productId).name)+' <small>× '+l.quantity+'</small></span><strong>'+vn(l.quantity*l.price)+'</strong></div>').join("");
}
function amountView(n:number):string{return state.showTotals?vn(n):"•••";}
function sectionHeader(name:string,description:string):string{
 return '<div class="flow-panel-heading"><div><h3>'+name+'</h3><p>'+description+'</p></div><span class="flow-context-tag">'+encode(customer().name)+'</span></div>';
}
function renderAuth():string{
 return '<div class="flow-auth"><div class="flow-auth-card"><div class="flow-auth-mark">27</div><span class="flow-eyebrow">BƯỚC 01 · ĐĂNG NHẬP</span><h2>Vào hệ thống mẫu</h2><p>Đây là khung đăng nhập để xem các luồng. Không nhập mật khẩu thật; không có máy chủ xác thực.</p><form id="flowLoginForm"><label for="flowDisplayName">Tên hiển thị</label><input id="flowDisplayName" name="displayName" value="Người dùng demo" maxlength="40" required autocomplete="off"><button type="submit" class="flow-primary flow-fill">Vào giao diện mẫu</button></form><div class="flow-auth-note">01 Chat · 02 Công việc · 03 Bán hàng</div></div></div>';
}
function renderShell():string {
 const nav=(["chat","work","sales"] as ModuleKey[]).map((m,i)=>
  '<button type="button" data-action="module" data-value="'+m+'" class="'+(state.module===m?"active":"")+'" aria-current="'+(state.module===m?"page":"false")+'"><b>0'+(i+1)+'</b>'+moduleNames[m]+'</button>').join("");
 const sections=subnav[state.module].map(item=>
  '<button type="button" data-action="section" data-value="'+item.key+'" class="'+(state.section[state.module]===item.key?"active":"")+'" aria-current="'+(state.section[state.module]===item.key?"page":"false")+'">'+item.label+'</button>').join("");
 const customerOptions=customers.map(c=>'<option value="'+c.id+'"'+(c.id===state.customerId?' selected':'')+'>'+encode(c.name)+'</option>').join("");
 let content=state.module==="chat"?renderChat():state.module==="work"?renderWork():renderSales();
 return '<div class="flow-app-shell'+(state.compact?" compact":"")+'">'+
 '<header class="flow-app-head"><div class="flow-app-brand"><span class="flow-app-logo">27</span><strong>Hệ thống mẫu</strong></div>'+
 '<nav class="flow-module-nav" aria-label="Ba bộ khung">'+nav+'</nav>'+
 '<button class="flow-signout" data-action="logout" type="button" title="Quay lại màn đăng nhập">Thoát</button></header>'+
 '<div class="flow-app-context"><span><span class="flow-context-dot"></span> Đang xem: '+moduleNames[state.module]+'</span><label>Khách hàng <select id="flowCustomerSelect" aria-label="Chọn khách hàng đang xem">'+customerOptions+'</select></label></div>'+
 '<div class="flow-app-body"><aside class="flow-app-side"><span class="flow-side-label">CHỨC NĂNG</span><nav aria-label="Chức năng '+moduleNames[state.module]+'">'+sections+'</nav><span class="flow-side-foot">Cùng 1 CSS · Cùng dữ liệu mẫu</span></aside>'+
 '<section class="flow-app-content'+(state.module==="chat"&&state.section.chat==="thread"?" is-thread":"")+'" aria-label="Nội dung '+moduleNames[state.module]+'">'+content+'</section></div>'+
 '<footer class="flow-app-footer"><span>2027 UI-V04</span><span>Không kết nối API · Không có giao dịch thật</span></footer></div>';
}
function renderChat():string{
 if(state.section.chat==="contacts"){
  return sectionHeader("Danh bạ","Chọn khách để mở hội thoại và chuyển sang nghiệp vụ liên quan.")+
  '<label class="flow-search-label" for="flowContactSearch">Tìm khách hàng</label><input class="flow-search" id="flowContactSearch" type="search" placeholder="Tìm trong danh bạ mẫu..." autocomplete="off">'+
  '<div class="flow-contact-list" id="flowContactList">'+customers.map(c=>
   '<button type="button" class="flow-contact" data-action="open-chat" data-value="'+c.id+'" data-search="'+encode(c.name.toLowerCase())+'"><span class="flow-avatar">'+encode(c.name.slice(-1))+'</span><span class="flow-contact-detail"><strong>'+encode(c.name)+'</strong><small>'+encode(c.note)+'</small></span><span class="flow-contact-debt">'+vn(debt(c.id))+'<small>Công nợ mẫu</small></span><span aria-hidden="true">›</span></button>').join("")+'</div>';
 }
 const msgs=state.messages.filter(m=>m.customerId===state.customerId);
 return '<div class="flow-chat-screen"><div class="flow-thread-header">'+
 '<button type="button" class="flow-icon-action" data-action="back-contacts" aria-label="Về danh bạ">‹</button><span class="flow-avatar">'+encode(customer().name.slice(-1))+'</span><div><strong>'+encode(customer().name)+'</strong><small>Hội thoại xem thử</small></div>'+
 '<button type="button" class="flow-quiet" data-action="goto-work">Công việc</button></div>'+
 '<div class="flow-messages" id="flowMessages">'+(msgs.length?msgs.map(m=>'<div class="flow-bubble-wrap '+(m.incoming?"incoming":"outgoing")+'">'+
 (m.kind==="image"&&m.imageUrl?'<div class="flow-image-msg"><img src="'+encode(m.imageUrl)+'" alt="'+encode(m.body)+'" loading="lazy"><small>'+encode(m.body)+'</small></div>':
 '<div class="flow-message-text">'+encode(m.body)+'</div>')+'</div>').join(""):'<div class="flow-empty-chat">Chưa có nội dung ở hội thoại mẫu này.</div>')+'</div>'+
 '<form id="flowMessageForm" class="flow-compose"><label class="flow-media-picker" for="flowMediaInput" title="Chọn ảnh để thêm vào chat mẫu">Ảnh</label><input type="file" id="flowMediaInput" accept="image/*" hidden><label class="flow-visually-hidden" for="flowMessageInput">Nội dung chat mẫu</label><textarea id="flowMessageInput" rows="1" maxlength="1000" placeholder="Nhập tin nhắn mẫu…" aria-label="Nhập tin nhắn mẫu">'+encode(state.draftText)+'</textarea><button type="submit" class="flow-primary">Thêm</button></form></div>';
}
function renderPayments():string{
 return sectionHeader("Thu tiền","Xem công nợ và thử nhập khoản thu trên bản mẫu, không ghi hệ thống thật.")+
 '<div class="flow-stats"><div class="flow-stat"><small>Đã giao mẫu</small><strong>'+amountView(deliveredTotal())+'</strong></div><div class="flow-stat"><small>Thu mẫu</small><strong>'+amountView(paidTotal())+'</strong></div><div class="flow-stat"><small>Còn nợ mẫu</small><strong>'+amountView(debt())+'</strong></div></div>'+
 '<form id="flowPaymentForm" class="flow-form-card"><h4>Thêm khoản thu thử</h4><label for="flowPaymentAmount">Số tiền (đ)</label><input type="number" id="flowPaymentAmount" name="amount" step="1000" min="1000" max="1000000000" placeholder="Ví dụ: 20000" required><p>Thay đổi chỉ lưu trong bộ nhớ của trang và cập nhật công nợ ở cả Công việc lẫn Bán hàng.</p><button class="flow-primary" type="submit">Ghi thu mẫu</button></form>'+
 '<div class="flow-panel-subheading">Các khoản thu trong mẫu</div>'+
 (state.payments.filter(p=>p.customerId===state.customerId).map(p=>'<div class="flow-row"><span>Khoản thu minh hoạ</span><strong>'+vn(p.amount)+'</strong></div>').join("")||'<div class="flow-empty">Chưa có khoản thu mẫu.</div>');
}
function renderSummary():string{
 const orders=customerOrders();
 const quantity=orders.reduce((n,o)=>n+o.lines.reduce((t,l)=>t+l.quantity,0),0);
 return sectionHeader("Tổng hợp đơn","Tổng hợp từ cùng danh sách đơn đang dùng ở Bán hàng; chưa tích hợp OCR nội dung chat hoặc ảnh.")+
 '<div class="flow-stats"><div class="flow-stat"><small>Số đơn</small><strong>'+orders.length+'</strong></div><div class="flow-stat"><small>Số lượng</small><strong>'+quantity+'</strong></div><div class="flow-stat"><small>Giá trị đơn mẫu</small><strong>'+amountView(orders.reduce((s,o)=>s+orderAmount(o),0))+'</strong></div></div>'+
 (orders.length?orders.map(o=>'<div class="flow-order-card"><div class="flow-order-head"><strong>'+encode(o.id)+'</strong><span class="flow-chip '+(o.status==="draft"?"draft":"")+'">'+(o.status==="draft"?"Đơn tạm":"Đã giao")+'</span></div>'+labeledRows(o)+'<div class="flow-order-bottom"><b>'+amountView(orderAmount(o))+'</b><button class="flow-text-btn" data-action="open-order" data-value="'+encode(o.id)+'">Xem trong Bán hàng →</button></div></div>').join(""):'<div class="flow-empty">Chưa có đơn hàng mẫu của khách.</div>')+
 '<div class="flow-inline-actions"><button class="flow-secondary" data-action="goto-sales" type="button">Tạo đơn mới</button><button class="flow-secondary" data-action="goto-invoice" type="button">Xem ảnh đơn</button></div>';
}
function renderInvoice():string{
 const delivered=customerOrders().filter(o=>o.status==="delivered");
 const chosen=delivered.find(o=>o.id===state.orderId)||delivered[0];
 if(!chosen)return sectionHeader("Ảnh đơn","Lấy dữ liệu từ đơn đã giao để dựng ảnh đơn mẫu.")+'<div class="flow-empty">Khách này chưa có đơn đã giao. Bạn có thể tạo và duyệt đơn mẫu ở Bán hàng.</div><button class="flow-primary" data-action="goto-sales" type="button">Tới Bán hàng</button>';
 state.orderId=chosen.id;
 return sectionHeader("Ảnh đơn","Chỉ đơn đã giao được dựng thành ảnh PNG cục bộ và thêm vào hội thoại mẫu.")+
 '<label class="flow-field-label" for="flowInvoiceSelect">Chọn đơn đã giao</label><select class="flow-select" id="flowInvoiceSelect">'+delivered.map(o=>'<option value="'+encode(o.id)+'"'+(o.id===chosen.id?" selected":"")+'>'+encode(o.id)+'</option>').join("")+'</select>'+
 '<div class="flow-receipt"><div class="flow-receipt-top"><b>PHIẾU GIAO HÀNG</b><small>BẢN MẪU</small></div><div class="flow-receipt-meta"><span>'+encode(chosen.id)+'</span><span>'+encode(customer().name)+'</span></div>'+labeledRows(chosen)+'<div class="flow-receipt-total"><span>Tổng cộng</span><strong>'+vn(orderAmount(chosen))+'</strong></div><small>Ảnh minh họa, không phải hóa đơn thật.</small></div>'+
 '<div class="flow-inline-actions"><button class="flow-primary" data-action="share-invoice" data-value="'+encode(chosen.id)+'" type="button">Tạo ảnh và đưa vào Chat mẫu</button></div>'+demoNote;
}
function renderDebts():string {
 return sectionHeader("Công nợ","Cùng một công thức và cùng dữ liệu trên cả hai bộ khung Công việc, Bán hàng.")+
 '<div class="flow-debt-total"><small>Còn phải thu · '+encode(customer().name)+'</small><strong>'+amountView(debt())+'</strong><span>Đơn đã giao – các khoản thu mẫu (đơn tạm không tính nợ)</span></div>'+
 '<div class="flow-panel-subheading">Bảng đối soát</div><div class="flow-row"><span>Tổng đơn đã giao</span><strong>'+amountView(deliveredTotal())+'</strong></div>'+
 '<div class="flow-row"><span>Tổng đã thu trong mẫu</span><strong>'+amountView(paidTotal())+'</strong></div>'+
 '<div class="flow-row flow-row-strong"><span>Dư nợ mẫu</span><strong>'+amountView(debt())+'</strong></div>'+
 '<div class="flow-inline-actions"><button class="flow-secondary" data-action="goto-payments" type="button">Mở thu tiền</button><button class="flow-secondary" data-action="goto-delivered" type="button">Xem đơn đã giao</button></div>'+demoNote;
}
function renderQuotes():string{
 return sectionHeader("Báo giá","Dùng một danh mục giá sản phẩm chung với Bán hàng và đơn hàng.")+
 '<div class="flow-panel-subheading">Danh sách giá mẫu</div><div class="flow-product-table">'+products.map(p=>
 '<div class="flow-row"><span>'+encode(p.name)+' <small>/ '+encode(p.unit)+'</small></span><strong>'+amountView(p.price)+'</strong></div>').join("")+'</div>'+
 '<div class="flow-inline-actions"><button class="flow-primary" data-action="share-quote" type="button">Đưa báo giá vào Chat mẫu</button></div>'+demoNote;
}
function renderWork():string{
 switch(state.section.work){
 case "payments":return renderPayments();
 case "summary":return renderSummary();
 case "invoice":return renderInvoice();
 case "debts":return renderDebts();
 case "quotes":return renderQuotes();
 default:return renderSummary();
 }
}
function renderProducts():string {
 return sectionHeader("Chọn sản phẩm","Thêm sản phẩm vào đơn tạm của khách đang chọn. Dữ liệu sẽ xuất hiện ở Tổng hợp đơn.")+
 '<div class="flow-product-table">'+products.map(p=>'<div class="flow-product-item"><span class="flow-product-symbol">▣</span><div><strong>'+encode(p.name)+'</strong><small>'+amountView(p.price)+' / '+encode(p.unit)+'</small></div><button type="button" class="flow-secondary" data-action="add-product" data-value="'+p.id+'">+ Thêm</button></div>').join("")+'</div>'+
 '<p class="flow-helper">Sản phẩm được thêm vào đơn tạm, không gửi tin nhắn hay phát sinh bán hàng thật.</p>';
}
function renderDrafts():string {
 const drafts=customerOrders().filter(o=>o.status==="draft");
 return sectionHeader("Đơn tạm","Chỉnh số lượng và duyệt giao thử. Duyệt sẽ cập nhật Công nợ/Ảnh đơn/Tổng hợp đơn trong bản mẫu.")+
 (drafts.length?drafts.map(o=>'<div class="flow-order-card"><div class="flow-order-head"><strong>'+encode(o.id)+'</strong><span class="flow-chip draft">Đơn tạm</span></div>'+
 o.lines.map(l=>'<div class="flow-line flow-line-qty"><span>'+encode(product(l.productId).name)+'</span><div class="flow-stepper"><button data-action="quantity" data-order="'+o.id+'" data-product="'+l.productId+'" data-delta="-1" aria-label="Giảm số lượng '+encode(product(l.productId).name)+'" type="button">−</button><b>'+l.quantity+'</b><button data-action="quantity" data-order="'+o.id+'" data-product="'+l.productId+'" data-delta="1" aria-label="Tăng số lượng '+encode(product(l.productId).name)+'" type="button">+</button></div><strong>'+amountView(l.quantity*l.price)+'</strong></div>').join("")+
 '<div class="flow-order-bottom"><b>'+amountView(orderAmount(o))+'</b><button class="flow-primary" data-action="deliver" data-value="'+encode(o.id)+'" type="button">Duyệt giao mẫu</button></div></div>').join(""):'<div class="flow-empty">Chưa có đơn tạm của khách này.</div>')+
 '<button class="flow-secondary" data-action="goto-products" type="button">Chọn thêm sản phẩm</button>';
}
function renderDelivered():string{
 const orders=customerOrders().filter(o=>o.status==="delivered");
 return sectionHeader("Đã giao","Đơn đã duyệt là nguồn chung cho công nợ, ảnh đơn và tổng hợp.")+
 (orders.length?orders.map(o=>'<div class="flow-order-card"><div class="flow-order-head"><strong>'+encode(o.id)+'</strong><span class="flow-chip">Đã giao</span></div>'+labeledRows(o)+
 '<div class="flow-order-bottom"><b>'+amountView(orderAmount(o))+'</b><button type="button" class="flow-secondary" data-action="invoice-order" data-value="'+encode(o.id)+'">Tạo ảnh đơn →</button></div></div>').join(""):'<div class="flow-empty">Khách chưa có đơn đã giao mẫu.</div>');
}
function renderSettings():string{
 return sectionHeader("Cài đặt","Thiết lập thử cho toàn hệ thống; không có cài đặt tài khoản thật.")+
 '<div class="flow-setting-row"><span><strong>Mật độ giao diện</strong><small>Giảm khoảng cách trong các bảng và danh sách.</small></span><button class="flow-secondary" data-action="toggle-compact" type="button" aria-pressed="'+state.compact+'">'+(state.compact?"Gọn":"Thoáng")+'</button></div>'+
 '<div class="flow-setting-row"><span><strong>Hiển thị số tiền</strong><small>Ẩn/hiện số tiền tại các mô-đun.</small></span><button class="flow-secondary" data-action="toggle-totals" type="button" aria-pressed="'+state.showTotals+'">'+(state.showTotals?"Đang hiện":"Đang ẩn")+'</button></div>'+
 '<div class="flow-setting-row"><span><strong>Dữ liệu</strong><small>Toàn bộ đơn, chat và thu tiền chỉ sống trong phiên trang này.</small></span><span class="flow-chip">Bản mẫu</span></div>'+demoNote;
}
function renderSales():string {
 switch(state.section.sales){
 case "products":return renderProducts();
 case "drafts":return renderDrafts();
 case "delivered":return renderDelivered();
 case "debts":return renderDebts();
 case "settings":return renderSettings();
 default:return renderProducts();
 }
}
function render():void{
 root.dataset.device=state.device;
 root.innerHTML=state.signedIn?renderShell():renderAuth();
 for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-module]"))){
  const selected=button.dataset.module===state.module;
  button.classList.toggle("is-active",selected);button.setAttribute("aria-pressed",String(selected));
 }
 for(const button of Array.from(document.querySelectorAll<HTMLButtonElement>("[data-device]"))){
  const selected=button.dataset.device===state.device;
  button.classList.toggle("is-selected",selected);button.setAttribute("aria-pressed",String(selected));
 }
 const list=root.querySelector<HTMLElement>("#flowMessages");
 if(list)list.scrollTop=list.scrollHeight;
}
function makeDraft():Order {
 let draft=customerOrders().find(o=>o.status==="draft");
 if(!draft){
  draft={id:"DT-"+state.nextOrder++,customerId:state.customerId,status:"draft",lines:[]};
  state.orders.push(draft);
 }
 return draft;
}
function addProduct(id:string):void{
 const item=products.find(p=>p.id===id);if(!item)return;
 const draft=makeDraft();const line=draft.lines.find(l=>l.productId===id);
 if(line)line.quantity++;else draft.lines.push({productId:id,quantity:1,price:item.price});
 notice("Đã thêm "+item.name+" vào đơn tạm mẫu của "+customer().name+".");
 navigate("sales","drafts");
}
function updateQuantity(orderId:string,productId:string,delta:number):void{
 const order=state.orders.find(o=>o.id===orderId&&o.status==="draft"&&o.customerId===state.customerId);
 const line=order?.lines.find(l=>l.productId===productId);if(!line)return;
 line.quantity=Math.max(0,Math.min(999,line.quantity+delta));
 if(!line.quantity)order!.lines=order!.lines.filter(l=>l.productId!==productId);
 if(order&&!order.lines.length)state.orders=state.orders.filter(o=>o!==order);
 render();
}
function makeInvoiceImage(order:Order):string|null{
 const canvas=document.createElement("canvas");canvas.width=680;canvas.height=290+order.lines.length*44;
 const ctx=canvas.getContext("2d");if(!ctx)return null;
 ctx.fillStyle="#ffffff";ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.fillStyle="#191919";ctx.font="bold 28px Arial";ctx.fillText("PHIEU GIAO HANG - MAU",34,57);
 ctx.font="18px Arial";ctx.fillText("2027 UI Library | Khong phai hoa don that",34,91);
 ctx.strokeStyle="#dddddd";ctx.beginPath();ctx.moveTo(34,115);ctx.lineTo(646,115);ctx.stroke();
 ctx.font="20px Arial";ctx.fillText("Khach: "+customer().name,34,157);ctx.fillText("Don: "+order.id,34,192);
 let y=244;
 order.lines.forEach(l=>{ctx.fillText(product(l.productId).name+"  x "+l.quantity,34,y);ctx.textAlign="right";ctx.fillText(vn(l.quantity*l.price),644,y);ctx.textAlign="left";y+=44;});
 ctx.beginPath();ctx.moveTo(34,y-12);ctx.lineTo(646,y-12);ctx.stroke();
 ctx.font="bold 22px Arial";ctx.fillText("Tong cong",34,y+26);ctx.textAlign="right";ctx.fillText(vn(orderAmount(order)),644,y+26);
 return canvas.toDataURL("image/png");
}
function shareInvoice(id:string):void{
 const order=state.orders.find(o=>o.id===id&&o.status==="delivered");
 if(!order)return;
 state.customerId=order.customerId;
 const url=makeInvoiceImage(order);
 if(!url){notice("Trình duyệt không hỗ trợ tạo ảnh đơn mẫu.");return;}
 state.messages.push({customerId:order.customerId,kind:"image",imageUrl:url,body:"Ảnh phiếu giao hàng mẫu · "+order.id});
 notice("Đã tạo PNG và thêm vào hội thoại mẫu, KHÔNG gửi qua mạng.");
 navigate("chat","thread");
}
function shareQuote():void{
 const lines=products.map(p=>p.name+": "+vn(p.price)+"/"+p.unit);
 state.messages.push({customerId:state.customerId,kind:"text",body:"BÁO GIÁ MẪU (không gửi thật)\n"+lines.join("\n")});
 notice("Đã đưa báo giá minh họa vào Chat mẫu.");
 navigate("chat","thread");
}
function handleAction(action:string,value:string,element:HTMLElement):void {
 switch(action){
 case "module":if(value==="chat"||value==="work"||value==="sales")navigate(value);break;
 case "section":if(subnav[state.module].some(s=>s.key===value))navigate(state.module,value as SectionKey);break;
 case "open-chat":setCustomer(value);navigate("chat","thread");break;
 case "back-contacts":navigate("chat","contacts");break;
 case "goto-work":navigate("work","summary");break;
 case "goto-sales":case "goto-products":navigate("sales","products");break;
 case "goto-invoice":navigate("work","invoice");break;
 case "goto-payments":navigate("work","payments");break;
 case "goto-delivered":navigate("sales","delivered");break;
 case "add-product":addProduct(value);break;
 case "quantity":updateQuantity(element.dataset.order||"",element.dataset.product||"",Number(element.dataset.delta)||0);break;
 case "deliver":{
  const order=state.orders.find(o=>o.id===value&&o.status==="draft"&&o.customerId===state.customerId);
  if(!order||!order.lines.length)return;
  order.status="delivered";order.id="DH-"+order.id.replace(/\D/g,"");
  state.orderId=order.id;
  notice("Đã duyệt ĐƠN MẪU; công nợ và ảnh đơn được cập nhật nội bộ. Không gửi tin thật.");
  navigate("sales","delivered");break;
 }
 case "invoice-order":{
  state.orderId=value;navigate("work","invoice");break;
 }
 case "share-invoice":shareInvoice(value);break;
 case "share-quote":shareQuote();break;
 case "toggle-compact":state.compact=!state.compact;render();break;
 case "toggle-totals":state.showTotals=!state.showTotals;render();break;
 case "logout":state.signedIn=false;state.draftText="";render();notice("Đã về màn đăng nhập mô phỏng.");break;
 default:break;
 }
}
root.addEventListener("click",event=>{
 const target=event.target as HTMLElement;
 const button=target.closest<HTMLButtonElement>("[data-action]");
 if(!button||!root.contains(button))return;
 handleAction(button.dataset.action||"",button.dataset.value||"",button);
});
document.addEventListener("click",event=>{
 const target=event.target as HTMLElement;
 const moduleButton=target.closest<HTMLButtonElement>(".flow-route-card");
 if(moduleButton){
  const m=moduleButton.dataset.module;if(m==="chat"||m==="work"||m==="sales")navigate(m);
 }
 const deviceButton=target.closest<HTMLButtonElement>("[data-device]");
 if(deviceButton){
  const next=deviceButton.dataset.device;if(next==="phone"||next==="desktop"){state.device=next;render();}
 }
 const reset=target.closest<HTMLButtonElement>('[data-action="reset"]');
 if(reset){
  if(window.confirm("Làm mới toàn bộ dữ liệu mẫu trong trang?")){
   memoryUrls.forEach(url=>URL.revokeObjectURL(url));memoryUrls.length=0;
   const keepDevice=state.device;state=newState();state.device=keepDevice;render();notice("Đã làm mới dữ liệu mẫu. Không có dữ liệu thật bị thay đổi.");
  }
 }
});
root.addEventListener("submit",event=>{
 const form=event.target as HTMLFormElement;
 if(!form||!root.contains(form))return;
 if(form.id==="flowLoginForm"){
  event.preventDefault();
  const name=(form.querySelector<HTMLInputElement>("#flowDisplayName")?.value||"").trim().slice(0,40);
  if(!name){notice("Vui lòng nhập tên hiển thị mẫu.");return;}
  state.displayName=name;state.signedIn=true;render();notice("Đang xem UI dưới tên "+name+" (không xác thực thật).");
 }else if(form.id==="flowMessageForm"){
  event.preventDefault();
  const input=form.querySelector<HTMLTextAreaElement>("#flowMessageInput");const text=(input?.value||"").trim();
  if(!text)return;
  state.messages.push({customerId:state.customerId,kind:"text",body:text.slice(0,1000)});
  state.draftText="";render();notice("Đã thêm tin nhắn vào hội thoại xem thử; không gửi thật.");
 }else if(form.id==="flowPaymentForm"){
  event.preventDefault();
  const input=form.querySelector<HTMLInputElement>("#flowPaymentAmount");
  const amount=Number(input?.value);
  if(!Number.isSafeInteger(amount)||amount<1000||amount>debt()){
   notice("Khoản thu mẫu phải là số nguyên từ 1.000 đ đến dư nợ hiện tại.");return;
  }
  state.payments.push({customerId:state.customerId,amount});
  render();notice("Khoản thu MẪU đã cập nhật hai bộ khung, không ghi hệ thống thu tiền thật.");
 }
});
root.addEventListener("input",event=>{
 const input=event.target as HTMLInputElement|HTMLTextAreaElement;
 if(input.id==="flowMessageInput")state.draftText=input.value;
 if(input.id==="flowContactSearch"){
  const query=input.value.trim().toLocaleLowerCase("vi");
  for(const item of Array.from(root.querySelectorAll<HTMLElement>(".flow-contact"))){
   item.hidden=!(item.dataset.search||"").includes(query);
  }
 }
});
root.addEventListener("change",event=>{
 const target=event.target as HTMLInputElement|HTMLSelectElement;
 if(target.id==="flowCustomerSelect")setCustomer(target.value);
 if(target.id==="flowInvoiceSelect"){state.orderId=target.value;render();}
 if(target.id==="flowMediaInput"){
  const input=target as HTMLInputElement;
  const file=input.files?.[0];
  if(!file)return;
  if(!file.type.startsWith("image/")||file.size>10*1024*1024){notice("Chỉ chọn ảnh dung lượng tối đa 10 MB.");return;}
  const url=URL.createObjectURL(file);memoryUrls.push(url);
  state.messages.push({customerId:state.customerId,kind:"image",body:"Ảnh tải lên để thử: "+file.name.slice(0,80),imageUrl:url});
  render();notice("Đã thêm ảnh cục bộ vào Chat mẫu. Không tải ảnh lên máy chủ.");
 }
});
window.addEventListener("pagehide",()=>memoryUrls.forEach(url=>URL.revokeObjectURL(url)),{once:true});
const routeMatch=location.hash.match(/^#(chat|work|sales)\/(contacts|thread|payments|summary|invoice|debts|quotes|products|drafts|delivered|settings)$/);
if(routeMatch){
 const m=routeMatch[1] as ModuleKey;const key=routeMatch[2] as SectionKey;
 if(subnav[m].some(s=>s.key===key)){state.module=m;state.section[m]=key;}
}
render();

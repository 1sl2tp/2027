// UI 2027 V19 · Simple chooser. One theme package + one component category + numbered specimens.
// Static local design samples only. Existing advanced library remains unchanged.
type SampleCategory="text"|"input"|"button"|"icon"|"table"|"layout"|"popup";
interface SimpleSample {id:string;title:string;html:string}
const textSamples:SimpleSample[]=[
 {id:"TEXT-01",title:"Tiêu đề lớn · 24px / đậm",html:'<div class="simple-type simple-type-01">Báo cáo bán hàng hôm nay</div>'},
 {id:"TEXT-02",title:"Tiêu đề mục · 20px",html:'<div class="simple-type simple-type-02">Chi tiết đơn hàng</div>'},
 {id:"TEXT-03",title:"Tiêu đề nhỏ · 18px",html:'<div class="simple-type simple-type-03">Thông tin khách hàng</div>'},
 {id:"TEXT-04",title:"Nội dung chính · 16px",html:'<div class="simple-type simple-type-04">Nội dung chat dễ đọc trên điện thoại.</div>'},
 {id:"TEXT-05",title:"Nội dung phụ · 15px",html:'<div class="simple-type simple-type-05">Đơn đã giao lúc 08:30 hôm nay.</div>'},
 {id:"TEXT-06",title:"Ghi chú · 14px",html:'<div class="simple-type simple-type-06">Ghi chú: kiểm tra hàng trước khi giao.</div>'},
 {id:"TEXT-07",title:"Chú thích · 12px",html:'<div class="simple-type simple-type-07">Cập nhật mới nhất · Dữ liệu mẫu</div>'},
 {id:"TEXT-08",title:"Số tiền · 20px / đậm",html:'<div class="simple-type simple-type-08">1.234.567 đ</div>'},
 {id:"TEXT-09",title:"Nhãn nhỏ · 11px / chữ hoa",html:'<div class="simple-type simple-type-09">TỔNG THANH TOÁN</div>'},
 {id:"TEXT-10",title:"Nhấn mạnh · 16px / bán đậm",html:'<div class="simple-type simple-type-10">Đã giao · Hoàn thành</div>'}
];
const inputSamples:SimpleSample[]=[
 {id:"INPUT-01",title:"Ô nhập nội dung 1 dòng",html:'<label class="simple-field"><input type="text" aria-label="Tên khách hàng mẫu" placeholder="Tên khách hàng"></label>'},
 {id:"INPUT-02",title:"Ô tìm kiếm có biểu tượng",html:'<label class="simple-field simple-field-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Tìm sản phẩm" placeholder="Tìm sản phẩm…"></label>'},
 {id:"INPUT-03",title:"Ô nhập số lượng",html:'<label class="simple-field"><input type="number" inputmode="numeric" min="0" aria-label="Số lượng mẫu" value="12"></label>'},
 {id:"INPUT-04",title:"Ô nhập tiền · 12.345 đ",html:'<label class="simple-field simple-field-money"><input type="text" inputmode="numeric" data-simple-money aria-label="Số tiền mẫu" value="12.345"><span>đ</span></label>'},
 {id:"INPUT-05",title:"Ô nhập dạng viên thuốc",html:'<label class="simple-field simple-field-pill"><input type="text" aria-label="Tin nhắn ngắn" placeholder="Nhập nội dung"></label>'},
 {id:"INPUT-06",title:"Ô gõ chat nhiều dòng",html:'<label class="simple-field simple-field-chat"><textarea rows="2" aria-label="Tin nhắn mẫu" placeholder="Nhắn tin…"></textarea></label>'},
 {id:"INPUT-07",title:"Ô nhập số điện thoại",html:'<label class="simple-field"><input type="tel" aria-label="Số điện thoại mẫu" placeholder="Số điện thoại"></label>'},
 {id:"INPUT-08",title:"Ô nhập mật khẩu",html:'<label class="simple-field"><input type="password" aria-label="Mật khẩu mẫu" placeholder="Mật khẩu"></label>'},
 {id:"INPUT-09",title:"Ô nhập nhiều dòng ghi chú",html:'<label class="simple-field simple-field-note"><textarea rows="3" aria-label="Ghi chú mẫu" placeholder="Ghi chú đơn hàng…"></textarea></label>'},
 {id:"INPUT-10",title:"Ô chọn danh mục",html:'<label class="simple-field"><select aria-label="Nhóm hàng mẫu"><option>Sữa &amp; đồ uống</option><option>Bánh kẹo</option><option>Gia vị</option></select></label>'}
];
const buttonStyles=["primary","secondary","outline","soft","pill","square","danger","small","wide","disabled"];
const buttonTitles=["Nút chính","Nút phụ","Nút có viền","Nút nền nhẹ","Nút bo tròn","Nút vuông","Nút cảnh báo","Nút nhỏ","Nút toàn chiều ngang","Nút không khả dụng"];
const buttonSamples:SimpleSample[]=buttonStyles.map((style,i)=>({
 id:"BTN-"+String(i+1).padStart(2,"0"),
 title:buttonTitles[i],
 html:'<button type="button" data-simple-demo="button" class="simple-demo-button simple-demo-button-'+style+'"'+(style==="disabled"?" disabled":"")+'>'+(style==="danger"?"Xóa":style==="secondary"?"Hủy":style==="small"?"Sửa":"Chọn mẫu")+'</button>'
}));
const iconNames=["plus","check","close","copy","search","menu","phone","save","trash","share"];
const iconTitles=["Thêm","Xác nhận","Đóng","Sao chép","Tìm kiếm","Menu","Gọi điện","Lưu","Xóa","Chia sẻ"];
const iconSamples:SimpleSample[]=iconNames.map((name,i)=>({
 id:"ICON-"+String(i+1).padStart(2,"0"),
 title:iconTitles[i]+" · 20px",
 html:'<span class="simple-icon-chip"><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="./web/icons.svg#ui-icon-'+name+'"/></svg><span>'+iconTitles[i]+'</span></span>'
}));
const tableTypes=["lines","grid","soft","zebra","compact","summary"];
const tableTitles=["Bảng kẻ ngang","Bảng kẻ ngang và dọc","Bảng nền nhẹ","Bảng xen kẽ dòng","Bảng gọn mobile","Bảng tổng hợp"];
const tableMarkup='<table class="simple-table"><thead><tr><th>Tên hàng</th><th>SL</th><th>Thành tiền</th></tr></thead><tbody><tr><td>Sữa hộp 180 ml</td><td>3</td><td>75.000 đ</td></tr><tr><td>Bánh quy bơ</td><td>1</td><td>48.000 đ</td></tr></tbody></table>';
const tableSamples:SimpleSample[]=tableTypes.map((style,i)=>({
 id:"TABLE-"+String(i+1).padStart(2,"0"),title:tableTitles[i],
 html:'<div class="simple-table-wrap simple-table-'+style+'">'+tableMarkup+'</div>'
}));
const layoutSamples:SimpleSample[]=[
 {id:"LAYOUT-01",title:"Một cột",html:'<div class="simple-layout simple-layout-one"><span>Vùng nội dung</span></div>'},
 {id:"LAYOUT-02",title:"Hai cột bằng nhau",html:'<div class="simple-layout simple-layout-two"><span>Vùng A</span><span>Vùng B</span></div>'},
 {id:"LAYOUT-03",title:"Icon + chữ",html:'<div class="simple-layout simple-layout-inline"><span>●</span><span>Thông tin sản phẩm</span></div>'},
 {id:"LAYOUT-04",title:"Tên + số tiền",html:'<div class="simple-layout simple-layout-between"><span>Tổng tiền</span><strong>180.000 đ</strong></div>'}
];
const popupSamples:SimpleSample[]=[
 {id:"POP-01",title:"Thông báo ngắn",html:'<div class="simple-popup-sample"><strong>Đã lưu mẫu</strong><p>Không thay đổi dữ liệu thật.</p></div>'},
 {id:"POP-02",title:"Xác nhận",html:'<div class="simple-popup-sample"><strong>Xác nhận thao tác</strong><p>Đây là hộp thoại minh họa.</p><span>Hủy　|　Đồng ý</span></div>'},
 {id:"POP-03",title:"Menu phụ",html:'<div class="simple-popup-sample"><span>Xem chi tiết</span><hr><span>Sao chép</span><hr><span>Chia sẻ</span></div>'},
 {id:"POP-04",title:"Gợi ý thao tác",html:'<div class="simple-popup-sample"><strong>Gợi ý</strong><p>Chạm vào một thành phần để chọn kiểu.</p></div>'}
];
const catalog:Record<SampleCategory,SimpleSample[]>={
 text:textSamples,input:inputSamples,button:buttonSamples,icon:iconSamples,
 table:tableSamples,layout:layoutSamples,popup:popupSamples
};
const names:Record<SampleCategory,string>={
 text:"Kiểu chữ",input:"Ô nhập",button:"Nút",icon:"Icon",
 table:"Bảng",layout:"Bố cục",popup:"Menu & popup"
};
export function initSimpleGallery():void{
 const root=document.getElementById("simpleKit") as HTMLElement|null;
 const theme=document.getElementById("simpleTheme") as HTMLSelectElement|null;
 const category=document.getElementById("simpleCategory") as HTMLSelectElement|null;
 const list=document.getElementById("simpleItems") as HTMLElement|null;
 const heading=document.getElementById("simpleCategoryTitle") as HTMLElement|null;
 const count=document.getElementById("simpleCount") as HTMLElement|null;
 const chosen=document.getElementById("simpleChosen") as HTMLElement|null;
 const status=document.getElementById("simpleStatus") as HTMLElement|null;
 const copy=document.getElementById("simpleCopy") as HTMLButtonElement|null;
 const source=document.getElementById("simpleSource") as HTMLTextAreaElement|null;
 const codeDetails=document.getElementById("simpleCodeDetails") as HTMLDetailsElement|null;
 const advanced=document.getElementById("simpleAdvancedToggle") as HTMLButtonElement|null;
 if(!root||!theme||!category||!list||!heading||!count||!chosen||!status||!copy||!source||!codeDetails||!advanced)return;
 let active:SampleCategory="text";
 // Each category keeps its last picked sample while browsing other categories.
 const selectedByCategory:Record<SampleCategory,SimpleSample>={
  text:textSamples[0],input:inputSamples[0],button:buttonSamples[0],
  icon:iconSamples[0],table:tableSamples[0],layout:layoutSamples[0],popup:popupSamples[0]
 };
 let selected:SimpleSample=selectedByCategory.text;
 function setAdvanced(open:boolean):void{
  document.body.classList.toggle("simple-first",!open);
  advanced!.textContent=open?"Ẩn thư viện chi tiết":"Mở thư viện nâng cao";
  advanced!.setAttribute("aria-expanded",String(open));
 }
 const hash=window.location.hash;
 if(hash&&hash!=="#simpleKit"&&hash!=="#simple-gallery")setAdvanced(true);
 advanced.addEventListener("click",()=>{
  const opening=document.body.classList.contains("simple-first");
  setAdvanced(opening);
  if(opening)document.getElementById("document")?.scrollIntoView({block:"start",behavior:"instant"});
  else root.scrollIntoView({block:"start",behavior:"instant"});
 });
 for(const a of Array.from(document.querySelectorAll<HTMLAnchorElement>(".studio-sidebar a[href^='#']"))){
  if(a.getAttribute("href")!=="#simpleKit")a.addEventListener("click",()=>setAdvanced(true));
 }
 window.addEventListener("hashchange",()=>{
  const anchor=window.location.hash;
  if(anchor==="#simpleKit")setAdvanced(false);
  else if(anchor.startsWith("#sample-")||["#components","#document","#controls","#sourceCss"].includes(anchor))setAdvanced(true);
 });
 function refreshSelection():void{
  for(const button of Array.from(list!.querySelectorAll<HTMLButtonElement>(".simple-row-select"))){
   const on=button.dataset.sampleId===selected.id;
   button.setAttribute("aria-pressed",String(on));
   button.textContent=on?"Đã chọn":"Chọn";
   button.closest(".simple-row")?.classList.toggle("is-selected",on);
  }
  chosen!.textContent="Đang chọn: "+selected.id+" · "+selected.title;
  source!.value='<section class="simple-kit" data-theme="'+theme!.value+'">\n  '+selected.html+'\n</section>\n<!-- Dùng chung web/styles.css và web/icons.svg từ thư viện 2027 -->';
 }
 function render():void{
  list!.replaceChildren();
  const items=catalog[active];
  selected=selectedByCategory[active];
  heading!.textContent=names[active];
  count!.textContent=items.length+" mẫu";
  for(const [i,item] of items.entries()){
   const row=document.createElement("div");row.className="simple-row";
   const code=document.createElement("span");code.className="simple-row-no";code.textContent=String(i+1).padStart(2,"0");
   const meta=document.createElement("div");meta.className="simple-row-title";meta.textContent=item.title;
   const preview=document.createElement("div");preview.className="simple-row-preview";
   preview.innerHTML=item.html; // Developer-authored, static snippets, not user HTML.
   const button=document.createElement("button");button.type="button";
   button.className="simple-row-select";button.dataset.sampleId=item.id;
   button.setAttribute("aria-label","Chọn "+item.title);
   row.append(code,meta,button,preview);list!.append(row);
  }
  refreshSelection();
  status!.textContent="Chọn một dòng mẫu. Không cần chỉnh CSS.";
 }
 category.addEventListener("change",()=>{
  if(!(category.value in catalog))return;
  active=category.value as SampleCategory;render();
 });
 theme.addEventListener("change",()=>{
  root.dataset.theme=theme.value;
  refreshSelection();
  status.textContent="Đã đổi gói chủ đề. Tất cả mẫu bên dưới dùng chung font và màu.";
 });
 list.addEventListener("click",event=>{
  if(!(event.target instanceof Element))return;
  const choose=event.target.closest<HTMLButtonElement>(".simple-row-select");
  if(choose){
   const item=catalog[active].find(x=>x.id===choose.dataset.sampleId);
   if(item){selected=item;selectedByCategory[active]=item;refreshSelection();status.textContent="Đã chọn mẫu "+item.id+". Các nhóm khác vẫn giữ lựa chọn trước đó.";}
   return;
  }
  const demo=event.target.closest<HTMLButtonElement>("[data-simple-demo]");
  if(demo){status.textContent="Đây là nút thử giao diện. Không thực hiện nghiệp vụ thật.";}
 });
 // Numeric storage is always ungrouped; punctuation belongs only to the input display.
 list.addEventListener("input",event=>{
  const input=event.target;
  if(!(input instanceof HTMLInputElement)||!input.matches("[data-simple-money]"))return;
  const at=input.selectionStart??input.value.length;
  const digitCount=input.value.slice(0,at).replace(/\D/g,"").length;
  const digits=input.value.replace(/\D/g,"").replace(/^0+(?=\d)/,"");
  const grouped=digits.replace(/\B(?=(\d{3})+(?!\d))/g,".");
  input.value=grouped;
  let pos=0,seen=0;
  for(;pos<grouped.length&&seen<digitCount;pos++)if(/\d/.test(grouped[pos]))seen++;
  input.setSelectionRange(pos,pos);
 });
 copy.addEventListener("click",async()=>{
  try{
   if(!navigator.clipboard?.writeText)throw new Error("Clipboard not available");
   await navigator.clipboard.writeText(source.value);
   status.textContent="Đã sao chép mẫu "+selected.id+" · gói "+theme.selectedOptions[0].textContent+".";
  }catch{
   codeDetails.open=true;source.focus();source.select();
   status.textContent="Hãy sao chép mã trong ô đã mở bên dưới.";
  }
 });
 render();
}

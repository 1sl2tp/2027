// UI-V26: simple, live form-field specimens. No network requests or real messages.
// Input / Textarea / Select source: OpenAI Apps SDK UI (MIT); quantity, money and
// chat-composer arrangements are 2027 demos based on common UI and assistant-ui.
type FieldKind=
 "outline"|"soft"|"pill"|"search"|"clear"|"invalid"|"disabled"|
 "textarea"|"money"|"quantity"|"composer"|"select";
interface FieldSample { id:string;label:string;kind:FieldKind;source:string }
const FIELD_SAMPLES:readonly FieldSample[]=[
 {id:"FIELD-01",label:"Ô chữ có viền",kind:"outline",source:"SDK · Input"},
 {id:"FIELD-02",label:"Ô chữ nền nhẹ",kind:"soft",source:"SDK · Input"},
 {id:"FIELD-03",label:"Ô chữ bo tròn",kind:"pill",source:"SDK · Input"},
 {id:"FIELD-04",label:"Tìm kiếm + icon",kind:"search",source:"SDK · Input"},
 {id:"FIELD-05",label:"Có nút xóa nội dung",kind:"clear",source:"SDK · Input"},
 {id:"FIELD-06",label:"Ô nhập báo lỗi",kind:"invalid",source:"SDK · Input"},
 {id:"FIELD-07",label:"Ô nhập bị khóa",kind:"disabled",source:"SDK · Input"},
 {id:"FIELD-08",label:"Ô ghi chú nhiều dòng",kind:"textarea",source:"SDK · Textarea"},
 {id:"FIELD-09",label:"Ô nhập tiền · 12.345 đ",kind:"money",source:"2027 · định dạng số"},
 {id:"FIELD-10",label:"Số lượng − / +",kind:"quantity",source:"2027 · bộ điều khiển"},
 {id:"FIELD-11",label:"Ô gõ chat",kind:"composer",source:"assistant-ui · tham khảo"},
 {id:"FIELD-12",label:"Ô chọn danh mục",kind:"select",source:"SDK · Select"}
];
function textInput(type:string,placeholder:string,aria:string):HTMLInputElement{
 const input=document.createElement("input");
 input.className="simple-field-input";input.type=type;input.placeholder=placeholder;
 input.setAttribute("aria-label",aria);return input;
}
function smallButton(label:string,visual:string):HTMLButtonElement{
 const b=document.createElement("button");b.type="button";
 b.className="simple-field-action";b.setAttribute("aria-label",label);b.textContent=visual;
 return b;
}
function onlyDigits(value:string):string{return value.replace(/\D/g,"");}
function groupMoney(digits:string):string{return digits.replace(/\B(?=(\d{3})+(?!\d))/g,".");}
function previewField(item:FieldSample):HTMLElement{
 const wrap=document.createElement("div");
 wrap.className="simple-field-demo simple-field-demo-"+item.kind;
 const shell=document.createElement("div");shell.className="simple-field-shell";
 const add=(...nodes:Node[])=>{shell.append(...nodes);wrap.append(shell);};
 switch(item.kind){
  case "outline":add(textInput("text","Tên khách hàng","Tên khách hàng mẫu"));break;
  case "soft":shell.classList.add("simple-field-shell-soft");
    add(textInput("text","Nhập ghi chú","Ô nền nhẹ mẫu"));break;
  case "pill":shell.classList.add("simple-field-shell-pill");
    add(textInput("text","Nhập nội dung","Ô bo tròn mẫu"));break;
  case "search":{
    const prefix=document.createElement("span");prefix.className="simple-field-adornment";
    prefix.textContent="⌕";prefix.setAttribute("aria-hidden","true");
    add(prefix,textInput("search","Tìm sản phẩm…","Tìm kiếm sản phẩm mẫu"));break;
  }
  case "clear":{
    const input=textInput("text","Nhập nội dung","Ô nhập có nút xóa mẫu");
    input.value="Đơn hàng mẫu";
    const clear=smallButton("Xóa nội dung mẫu","×");clear.addEventListener("click",()=>{input.value="";input.focus();});
    add(input,clear);break;
  }
  case "invalid":{
    shell.classList.add("simple-field-shell-invalid");
    const input=textInput("text","Nhập mã hợp lệ","Mã thử lỗi");input.value="12?";
    input.setAttribute("aria-invalid","true");add(input);
    const error=document.createElement("div");error.className="simple-field-error";
    error.textContent="Mã chưa hợp lệ";wrap.append(error);break;
  }
  case "disabled":{
    const input=textInput("text","Không thể nhập","Ô nhập đang khóa");
    input.value="Không thể chỉnh sửa";input.disabled=true;
    shell.classList.add("simple-field-shell-disabled");add(input);break;
  }
  case "textarea":{
    const area=document.createElement("textarea");area.className="simple-field-input simple-field-area";
    area.rows=2;area.placeholder="Ghi chú đơn hàng…";area.setAttribute("aria-label","Ghi chú nhiều dòng mẫu");
    area.addEventListener("input",()=>{area.style.height="auto";area.style.height=Math.min(area.scrollHeight,132)+"px";});
    add(area);break;
  }
  case "money":{
    const input=textInput("text","0","Số tiền mẫu");input.inputMode="numeric";
    input.classList.add("simple-field-money-input");input.value="12.345";input.dataset.raw="12345";
    const unit=document.createElement("span");unit.className="simple-field-unit";unit.textContent="đ";
    input.addEventListener("input",()=>{
      const start=input.selectionStart??input.value.length;
      const count=onlyDigits(input.value.slice(0,start)).length;
      const digits=onlyDigits(input.value).replace(/^0+(?=\d)/,"");
      input.dataset.raw=digits;const formatted=groupMoney(digits);input.value=formatted;
      let at=0,seen=0;while(at<formatted.length&&seen<count){if(/\d/.test(formatted[at]))seen++;at++;}
      input.setSelectionRange(at,at);
    });add(input,unit);break;
  }
  case "quantity":{
    const minus=smallButton("Giảm số lượng","−");
    const number=textInput("text","","Số lượng mẫu");number.inputMode="numeric";
    number.classList.add("simple-field-quantity-input");number.value="12";
    const plus=smallButton("Tăng số lượng","+");
    const sanitize=()=>{const digits=onlyDigits(number.value);number.value=digits?String(Math.min(999999,Number(digits))):"0";};
    number.addEventListener("input",sanitize);
    minus.addEventListener("click",()=>{sanitize();number.value=String(Math.max(0,Number(number.value)-1));});
    plus.addEventListener("click",()=>{sanitize();number.value=String(Math.min(999999,Number(number.value)+1));});
    add(minus,number,plus);break;
  }
  case "composer":{
    shell.classList.add("simple-field-shell-composer");
    const more=smallButton("Thêm ảnh minh họa","+");
    const area=document.createElement("textarea");area.rows=1;area.className="simple-field-input simple-field-area";
    area.placeholder="Nhắn tin…";area.setAttribute("aria-label","Nội dung chat mẫu");
    const send=smallButton("Thử gửi trong bản mẫu","↑");send.classList.add("simple-field-send");
    const status=document.createElement("div");status.className="simple-field-demo-status";
    status.setAttribute("role","status");status.setAttribute("aria-live","polite");
    more.addEventListener("click",()=>{status.textContent="Đã thêm ảnh minh họa (không tải tệp).";});
    send.addEventListener("click",()=>{
      const message=area.value.trim();
      status.textContent=message?"Đã thử: "+message+" (không gửi thật).":"Nhập tin nhắn để thử.";
      if(message)area.value="";
    });add(more,area,send);wrap.append(status);break;
  }
  case "select":{
    const select=document.createElement("select");select.className="simple-field-input";
    select.setAttribute("aria-label","Chọn nhóm sản phẩm mẫu");
    for(const text of ["Nhóm sữa","Bánh kẹo","Gia vị"]){
      const option=document.createElement("option");option.textContent=text;option.value=text;select.append(option);
    }add(select);break;
  }
 }
 return wrap;
}
export function initSimpleFields():void{
 const list=document.getElementById("simpleFieldsItems");
 const chosen=document.getElementById("simpleFieldsChosen");
 if(!list||!chosen)return;
 let picked:string|null=null;
 for(const [i,item] of FIELD_SAMPLES.entries()){
  const row=document.createElement("div");row.className="simple-field-row";row.dataset.sampleId=item.id;
  row.setAttribute("role","group");row.setAttribute("aria-label",item.label);
  const num=document.createElement("span");num.className="simple-font-number";
  num.textContent=String(i+1).padStart(2,"0");
  const content=document.createElement("div");content.className="simple-field-content";
  const title=document.createElement("strong");title.className="simple-field-title";title.textContent=item.label;
  const preview=previewField(item);
  const source=document.createElement("span");source.className="simple-font-meta";
  source.textContent=item.source;
  content.append(title,preview,source);
  const pick=smallButton("Chọn "+item.label,"✓");pick.className="simple-field-pick";
  pick.setAttribute("aria-pressed","false");pick.dataset.sampleId=item.id;
  row.append(num,content,pick);list.append(row);
 }
 const select=(id:string)=>{
  const item=FIELD_SAMPLES.find(x=>x.id===id);if(!item)return;
  picked=id;
  for(const button of Array.from(list.querySelectorAll<HTMLButtonElement>(".simple-field-pick"))){
   button.setAttribute("aria-pressed",String(button.dataset.sampleId===picked));
  }
  chosen.textContent="Đã chọn: "+item.label;chosen.hidden=false;
 };
 list.addEventListener("click",event=>{
  if(!(event.target instanceof Element))return;
  const pick=event.target.closest<HTMLButtonElement>(".simple-field-pick");
  if(pick){select(pick.dataset.sampleId||"");return;}
  if(event.target.closest("input,textarea,select,button"))return;
  const row=event.target.closest<HTMLElement>(".simple-field-row");
  if(row)select(row.dataset.sampleId||"");
 });
}

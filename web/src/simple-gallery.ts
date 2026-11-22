// V22 — ChatGPT-inspired text catalogue.
// Source snapshot: Google Drive ChatGPT.html (22 Nov 2026), --text-* and --text-heading-* tokens.
// Font family uses system sans; monospace is reserved for code.
// Styling for composition variants is authored for this demo; it is not vendor CSS.
interface FontSample {
 id:string;family:"system"|"mono";familyName:string;size:number;
 weight:400|500|600|700;weightName:string;role:string;
}
const FONT_SAMPLES:readonly FontSample[]=[
 {id:"FONT-01",family:"system",familyName:"System",size:12,weight:400,weightName:"Thường",role:"Chữ phụ / xs"},
 {id:"FONT-02",family:"system",familyName:"System",size:14,weight:400,weightName:"Thường",role:"Chữ nhỏ / sm"},
 {id:"FONT-03",family:"system",familyName:"System",size:16,weight:400,weightName:"Thường",role:"Nội dung / base"},
 {id:"FONT-04",family:"system",familyName:"System",size:18,weight:600,weightName:"Đậm vừa",role:"Tiêu đề nhỏ"},
 {id:"FONT-05",family:"system",familyName:"System",size:20,weight:600,weightName:"Đậm vừa",role:"Tiêu đề vừa"},
 {id:"FONT-06",family:"system",familyName:"System",size:24,weight:700,weightName:"Đậm",role:"Tiêu đề lớn"},
 {id:"FONT-07",family:"system",familyName:"System",size:28,weight:700,weightName:"Đậm",role:"Tiêu đề ứng dụng"},
 {id:"FONT-08",family:"system",familyName:"System",size:30,weight:700,weightName:"Đậm",role:"Chữ lớn / 3xl"},
 {id:"FONT-09",family:"system",familyName:"System",size:36,weight:700,weightName:"Đậm",role:"Chữ rất lớn / 4xl"},
 {id:"FONT-10",family:"mono",familyName:"Monospace",size:12,weight:400,weightName:"Thường",role:"Mã code"}
];
type TextTreatment =
 "normal"|"heading"|"subheading"|"body"|"semibold"|"bold"|"italic"|
 "underline"|"strike"|"mixed"|"muted"|"caption"|"link"|"code"|"codeblock"|
 "quote"|"bullets"|"ordered"|"tablehead"|"tablecell"|"money"|"time"|"status"|
 "sidebar"|"composer"|"label"|"usertext"|"kbd";
interface MultiTextSample {
 id:string;label:string;lines:readonly string[];style:TextTreatment;
}
const MULTI_TEXT_SAMPLES:readonly MultiTextSample[]=[
 {id:"MULTI-01",label:"1 dòng",lines:["Tin nhắn một dòng"],style:"normal"},
 {id:"MULTI-02",label:"2 dòng",lines:["Sữa hộp 180 ml","Số lượng: 12 hộp"],style:"normal"},
 {id:"MULTI-03",label:"3 dòng",lines:["Đơn hàng hôm nay","Khách mẫu A","Tổng: 125.000 đ"],style:"normal"},
 {id:"MULTI-04",label:"4 dòng",lines:["Đơn DH-001","Tên hàng: Bánh quy","Số lượng: 3 hộp","Thành tiền: 75.000 đ"],style:"normal"},
 {id:"MULTI-05",label:"Tiêu đề lớn · 24px",lines:["Tóm tắt công việc"],style:"heading"},
 {id:"MULTI-06",label:"Tiêu đề mục · 20px",lines:["Chi tiết đơn hàng"],style:"subheading"},
 {id:"MULTI-07",label:"Nội dung · 16px",lines:["Đây là nội dung trả lời được trình bày rõ ràng."],style:"body"},
 {id:"MULTI-08",label:"Chữ vừa đậm · 16px",lines:["Thông tin cần lưu ý"],style:"semibold"},
 {id:"MULTI-09",label:"Chữ đậm · 16px",lines:["Thông tin quan trọng"],style:"bold"},
 {id:"MULTI-10",label:"Chữ nghiêng",lines:["Ghi chú của khách hàng"],style:"italic"},
 {id:"MULTI-11",label:"Gạch chân",lines:["Xem nội dung chi tiết"],style:"underline"},
 {id:"MULTI-12",label:"Gạch ngang",lines:["Giá cũ: 150.000 đ"],style:"strike"},
 {id:"MULTI-13",label:"Đậm + thường",lines:["Tổng tiền: 125.000 đ","Đã thanh toán: 75.000 đ"],style:"mixed"},
 {id:"MULTI-14",label:"Chữ phụ · 14px",lines:["Cập nhật thông tin gần đây"],style:"muted"},
 {id:"MULTI-15",label:"Chú thích · 12px",lines:["Dữ liệu minh họa · Không gửi"],style:"caption"},
 {id:"MULTI-16",label:"Liên kết",lines:["Mở thư viện giao diện"],style:"link"},
 {id:"MULTI-17",label:"Mã nội tuyến",lines:["font-size: 16px"],style:"code"},
 {id:"MULTI-18",label:"Khối mã",lines:["const total = 125000;","console.log(total);"],style:"codeblock"},
 {id:"MULTI-19",label:"Trích dẫn",lines:["“Thiết kế tốt giúp người dùng đọc nhanh hơn.”"],style:"quote"},
 {id:"MULTI-20",label:"Danh sách dấu chấm",lines:["Tên sản phẩm","Số lượng","Thành tiền"],style:"bullets"},
 {id:"MULTI-21",label:"Danh sách đánh số",lines:["Chọn khách hàng","Kiểm tra đơn","Xác nhận"],style:"ordered"},
 {id:"MULTI-22",label:"Tiêu đề bảng",lines:["TÊN HÀNG    SL    ĐƠN GIÁ"],style:"tablehead"},
 {id:"MULTI-23",label:"Chữ trong bảng",lines:["Bánh quy bơ    3    25.000"],style:"tablecell"},
 {id:"MULTI-24",label:"Số tiền",lines:["1.234.567 đ"],style:"money"},
 {id:"MULTI-25",label:"Ngày giờ",lines:["Hôm nay · 08:30"],style:"time"},
 {id:"MULTI-26",label:"Trạng thái",lines:["Đã hoàn thành"],style:"status"},
 {id:"MULTI-27",label:"Chữ danh sách hội thoại",lines:["Kiểm tra thư viện mã nguồn"],style:"sidebar"},
 {id:"MULTI-28",label:"Chữ gợi ý nhập chat",lines:["Hỏi ChatGPT"],style:"composer"},
 {id:"MULTI-29",label:"Nhãn viết hoa",lines:["TỔNG THANH TOÁN"],style:"label"},
 {id:"MULTI-30",label:"Nội dung người gửi",lines:["Mình muốn chọn mẫu này."],style:"usertext"},
 {id:"MULTI-31",label:"Phím tắt",lines:["⌘ K"],style:"kbd"}
];
function renderTextTreatment(target:HTMLElement,item:MultiTextSample):void {
 target.className="simple-multi-preview simple-multi-"+item.style;
 if(item.style==="mixed"){
   const line1=document.createElement("strong");
   line1.textContent=item.lines[0];
   const line2=document.createElement("span");
   line2.textContent=item.lines[1];
   target.append(line1,line2);
 }else if(item.style==="bullets"||item.style==="ordered"){
   const list=document.createElement(item.style==="ordered"?"ol":"ul");
   for(const text of item.lines){const li=document.createElement("li");li.textContent=text;list.append(li);}
   target.append(list);
 }else{
   target.textContent=item.lines.join("\n");
 }
}
export function initSimpleGallery():void {
 const root=document.getElementById("simpleKit");
 const list=document.getElementById("simpleItems");
 const chosen=document.getElementById("simpleChosen");
 if(!root||!list||!chosen)return;
 // Older deep links still open the pre-existing advanced gallery.
 const showOriginal=():void=>{
   const hash=window.location.hash;
   const useOriginal=hash!==""&&hash!=="#simpleKit"&&hash!=="#simple-gallery"&&hash!=="#simpleMultiline";
   document.body.classList.toggle("simple-first",!useOriginal);
 };
 window.addEventListener("hashchange",showOriginal);
 showOriginal();
 let selectedId:string|null=null;
 for(const [index,item] of FONT_SAMPLES.entries()){
   const button=document.createElement("button");
   button.type="button";button.className="simple-font-row";
   button.dataset.sampleId=item.id;button.setAttribute("aria-pressed","false");
   button.setAttribute("aria-label","Chọn mẫu "+(index+1)+": "+item.familyName+", "+item.size+" pixel, "+item.weightName);
   const number=document.createElement("span");
   number.className="simple-font-number";number.textContent=String(index+1).padStart(2,"0");
   const content=document.createElement("span");content.className="simple-font-content";
   const preview=document.createElement("span");
   preview.className="simple-font-preview simple-font-"+item.family+" simple-font-weight-"+item.weight;
   preview.style.fontSize=item.size+"px";preview.textContent="Văn bản mẫu 123.456 đ";
   const meta=document.createElement("span");
   meta.className="simple-font-meta";
   meta.textContent=item.familyName+" · "+item.size+" px · "+item.role;
   const check=document.createElement("span");
   check.className="simple-font-check";check.setAttribute("aria-hidden","true");check.textContent="✓";
   content.append(preview,meta);button.append(number,content,check);list.append(button);
 }
 chosen.hidden=true;
 list.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const row=event.target.closest<HTMLButtonElement>(".simple-font-row");if(!row)return;
   const item=FONT_SAMPLES.find(x=>x.id===row.dataset.sampleId);if(!item)return;
   selectedId=item.id;
   for(const el of Array.from(list.querySelectorAll<HTMLButtonElement>(".simple-font-row")))
     el.setAttribute("aria-pressed",String(el.dataset.sampleId===selectedId));
   chosen.textContent="Đã chọn: "+item.familyName+" · "+item.size+" px · "+item.role;
   chosen.hidden=false;
 });
 const multilineList=document.getElementById("simpleMultilineItems");
 const multilineChosen=document.getElementById("simpleMultilineChosen");
 if(!multilineList||!multilineChosen)return;
 let selectedMultiId:string|null=null;
 for(const [index,item] of MULTI_TEXT_SAMPLES.entries()){
   const button=document.createElement("button");button.type="button";
   button.className="simple-font-row simple-multi-row";
   button.dataset.sampleId=item.id;button.setAttribute("aria-pressed","false");
   button.setAttribute("aria-label","Chọn mẫu "+(index+1)+": "+item.label);
   const number=document.createElement("span");
   number.className="simple-font-number";number.textContent=String(index+1).padStart(2,"0");
   const content=document.createElement("span");content.className="simple-font-content";
   const preview=document.createElement("span");
   renderTextTreatment(preview,item);
   const meta=document.createElement("span");meta.className="simple-font-meta";meta.textContent=item.label;
   const check=document.createElement("span");check.className="simple-font-check";
   check.setAttribute("aria-hidden","true");check.textContent="✓";
   content.append(preview,meta);button.append(number,content,check);multilineList.append(button);
 }
 multilineList.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const row=event.target.closest<HTMLButtonElement>(".simple-multi-row");if(!row)return;
   const item=MULTI_TEXT_SAMPLES.find(x=>x.id===row.dataset.sampleId);if(!item)return;
   selectedMultiId=item.id;
   for(const button of Array.from(multilineList.querySelectorAll<HTMLButtonElement>(".simple-multi-row")))
      button.setAttribute("aria-pressed",String(button.dataset.sampleId===selectedMultiId));
   multilineChosen.textContent="Đã chọn: "+item.label;multilineChosen.hidden=false;
 });
}

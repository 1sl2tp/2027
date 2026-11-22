// V25 — Source-grounded typography and framed text / message-bubble variants.
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
 "sidebar"|"composer"|"label"|"usertext"|"kbd"|"micro"|"micro2"|"headingxs"|"headingxl"|"heading2xl"|"medium"|"tertiary"|"accent"|"clamp1"|"clamp2"|"clamp3"|"clamp4"|"paragraph"|"pre";
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
 {id:"MULTI-31",label:"Phím tắt",lines:["⌘ K"],style:"kbd"},
 {id:"MULTI-32",label:"Chữ rất nhỏ · 10px (Apps SDK)",lines:["Ghi chú kích thước siêu nhỏ"],style:"micro"},
 {id:"MULTI-33",label:"Chữ siêu nhỏ · 8px (Apps SDK)",lines:["Mẫu kiểm tra độ nhỏ của chữ"],style:"micro2"},
 {id:"MULTI-34",label:"Heading XS · 16px",lines:["Tiêu đề phụ trong khối"],style:"headingxs"},
 {id:"MULTI-35",label:"Heading XL · 32px",lines:["Tiêu đề trang"],style:"headingxl"},
 {id:"MULTI-36",label:"Heading 2XL · 36px",lines:["Tiêu đề lớn hơn"],style:"heading2xl"},
 {id:"MULTI-37",label:"Chữ vừa · weight 500",lines:["Nhãn danh mục"],style:"medium"},
 {id:"MULTI-38",label:"Chữ cấp ba · tertiary",lines:["Chi tiết không cần nổi bật"],style:"tertiary"},
 {id:"MULTI-39",label:"Chữ màu nhấn",lines:["Mở thông tin tham khảo"],style:"accent"},
 {id:"MULTI-40",label:"Giới hạn 1 dòng · …",lines:["Nội dung rất dài để kiểm tra khi màn hình hẹp hoặc một dòng không đủ để hiển thị hết tên hội thoại và nội dung thông báo"],style:"clamp1"},
 {id:"MULTI-41",label:"Giới hạn 2 dòng · …",lines:["Đoạn văn dài để kiểm tra hiển thị hai dòng trên màn hình nhỏ, tránh tràn khỏi khung chứa khi văn bản kéo dài hơn giới hạn cho phép"],style:"clamp2"},
 {id:"MULTI-42",label:"Giới hạn 3 dòng · …",lines:["Đoạn nội dung dài để thử hiển thị ba dòng. Phần chữ không đủ chỗ sẽ được rút gọn bằng dấu ba chấm, nhưng bản gốc vẫn giữ nguyên nội dung. Đây là dữ liệu ví dụ phục vụ kiểm tra giao diện."],style:"clamp3"},
 {id:"MULTI-43",label:"Giới hạn 4 dòng · …",lines:["Đây là mẫu nội dung rất dài để kiểm tra việc hiển thị tối đa bốn dòng chữ trên điện thoại. Khi đoạn chữ vượt quá không gian cho phép, giao diện có thể rút gọn phần hiển thị. Người dùng có thể mở bản đầy đủ ở nơi phù hợp mà không cần làm sai lệch dữ liệu gốc. Mẫu này không thay thế nội dung thật."],style:"clamp4"},
 {id:"MULTI-44",label:"Đoạn dài tự xuống dòng",lines:["Đây là đoạn văn dài có nhiều từ và số 123.456.789 để kiểm tra khoảng cách, khả năng xuống dòng, giới hạn chiều ngang và sự dễ đọc khi thiết bị nhỏ hơn."],style:"paragraph"},
 {id:"MULTI-45",label:"Giữ khoảng trắng và xuống dòng",lines:["Đơn hàng    DH-001","Số lượng   12 hộp","Tổng tiền  125.000 đ"],style:"pre"}
];
type UnderlineStyle="solid"|"subtle"|"dotted"|"dashed"|"double"|"wavy"|"offset"|"thick"|"external"|"link"|"primary"|"hover";
interface UnderlineSample {id:string;label:string;style:UnderlineStyle;preview:string}
const UNDERLINE_SAMPLES:readonly UnderlineSample[]=[
 {id:"UNDER-01",label:"Gạch chân nét liền",style:"solid",preview:"Xem nội dung chi tiết"},
 {id:"UNDER-02",label:"Gạch chân nhạt (OpenAI SDK)",style:"subtle",preview:"Xem thông tin liên kết"},
 {id:"UNDER-03",label:"Gạch chân nét chấm (ảnh)",style:"dotted",preview:"Mở thư viện tham khảo ↗"},
 {id:"UNDER-04",label:"Gạch chân nét đứt",style:"dashed",preview:"Đường dẫn đến tài liệu"},
 {id:"UNDER-05",label:"Gạch chân hai nét",style:"double",preview:"Nhấn mạnh nội dung"},
 {id:"UNDER-06",label:"Gạch chân lượn sóng",style:"wavy",preview:"Kiểm tra chính tả"},
 {id:"UNDER-07",label:"Gạch chân cách chữ 5px",style:"offset",preview:"Xem nội dung"},
 {id:"UNDER-08",label:"Gạch chân dày 2px",style:"thick",preview:"Tiêu đề có gạch chân"},
 {id:"UNDER-09",label:"Liên kết nét chấm + mũi tên",style:"external",preview:"OpenAI Apps SDK UI ↗"},
 {id:"UNDER-10",label:"Liên kết gạch chân nét liền",style:"link",preview:"Xem tài liệu hướng dẫn ↗"},
 {id:"UNDER-11",label:"Liên kết màu nhấn, không gạch",style:"primary",preview:"Tìm hiểu thêm ↗"},
 {id:"UNDER-12",label:"Gạch chân khi rê / focus",style:"hover",preview:"Di chuột hoặc chạm để xem"}
];
type FrameStyle =
 "thin"|"round"|"dashed"|"dotted"|"heavy"|
 "badge-soft"|"badge-outline"|"badge-solid"|"badge-pill"|"badge-success"|
 "alert-soft"|"alert-outline"|"alert-solid"|"alert-description"|
 "code-box"|"quote-box"|
 "bubble-user-dark"|"bubble-user-soft"|"bubble-incoming-outline"|"bubble-incoming-soft"|
 "bubble-assistant"|"bubble-two"|"bubble-four"|"bubble-time";
interface FramedSample {
 id:string;label:string;style:FrameStyle;lines:readonly string[];
 source:"2027"|"SDK · Badge"|"SDK · Alert"|"SDK · CodeBlock"|"assistant-ui";
 time?:string;
}
const FRAMED_SAMPLES:readonly FramedSample[]=[
 {id:"FRAME-01",label:"Khung chữ vuông, viền mảnh",style:"thin",lines:["Nội dung trong khung"],source:"2027"},
 {id:"FRAME-02",label:"Khung bo góc 10px",style:"round",lines:["Thông tin đơn hàng"],source:"2027"},
 {id:"FRAME-03",label:"Khung viền nét đứt",style:"dashed",lines:["Ghi chú cần kiểm tra"],source:"2027"},
 {id:"FRAME-04",label:"Khung viền nét chấm",style:"dotted",lines:["Vùng nội dung mẫu"],source:"2027"},
 {id:"FRAME-05",label:"Khung viền đậm",style:"heavy",lines:["Tổng thanh toán: 180.000 đ"],source:"2027"},
 {id:"FRAME-06",label:"Nhãn nền nhẹ · soft",style:"badge-soft",lines:["Đơn đang xử lý"],source:"SDK · Badge"},
 {id:"FRAME-07",label:"Nhãn viền · outline",style:"badge-outline",lines:["Đã kiểm tra"],source:"SDK · Badge"},
 {id:"FRAME-08",label:"Nhãn nền đậm · solid",style:"badge-solid",lines:["Đã giao"],source:"SDK · Badge"},
 {id:"FRAME-09",label:"Nhãn dạng viên thuốc",style:"badge-pill",lines:["Thông báo mới"],source:"SDK · Badge"},
 {id:"FRAME-10",label:"Nhãn trạng thái thành công",style:"badge-success",lines:["Đã hoàn thành"],source:"SDK · Badge"},
 {id:"FRAME-11",label:"Thông báo nền nhẹ",style:"alert-soft",lines:["Đã lưu thông tin mẫu"],source:"SDK · Alert"},
 {id:"FRAME-12",label:"Thông báo chỉ có viền",style:"alert-outline",lines:["Đã cập nhật dữ liệu xem trước"],source:"SDK · Alert"},
 {id:"FRAME-13",label:"Thông báo nền đậm",style:"alert-solid",lines:["Cần xem lại nội dung"],source:"SDK · Alert"},
 {id:"FRAME-14",label:"Thông báo tiêu đề + 2 dòng",style:"alert-description",lines:["Lưu ý khi tạo đơn","Kiểm tra số lượng và giá","trước khi xác nhận."],source:"SDK · Alert"},
 {id:"FRAME-15",label:"Khung mã nguồn",style:"code-box",lines:["const total = 180000;","console.log(total);"],source:"SDK · CodeBlock"},
 {id:"FRAME-16",label:"Khung trích dẫn",style:"quote-box",lines:["“Nội dung cần được đọc dễ dàng.”"],source:"2027"},
 {id:"FRAME-17",label:"Bong bóng gửi · nền tối",style:"bubble-user-dark",lines:["Cho mình xem đơn hàng."],source:"assistant-ui"},
 {id:"FRAME-18",label:"Bong bóng gửi · nền sáng",style:"bubble-user-soft",lines:["Đã nhận thông tin nhé."],source:"2027"},
 {id:"FRAME-19",label:"Bong bóng nhận · có viền",style:"bubble-incoming-outline",lines:["Đơn đã được chuẩn bị."],source:"2027"},
 {id:"FRAME-20",label:"Bong bóng nhận · nền nhẹ",style:"bubble-incoming-soft",lines:["Mình sẽ kiểm tra lại."],source:"2027"},
 {id:"FRAME-21",label:"Trả lời không bong bóng",style:"bubble-assistant",lines:["Dưới đây là thông tin bạn cần."],source:"assistant-ui"},
 {id:"FRAME-22",label:"Bong bóng 2 dòng",style:"bubble-two",lines:["Sữa hộp 180 ml","Số lượng: 12 hộp"],source:"2027"},
 {id:"FRAME-23",label:"Bong bóng 4 dòng",style:"bubble-four",lines:["Đơn hàng: DH-001","Tên hàng: Bánh quy","Số lượng: 3 hộp","Tổng: 75.000 đ"],source:"2027"},
 {id:"FRAME-24",label:"Bong bóng có thời gian",style:"bubble-time",lines:["Mình đã nhận được."],time:"08:30",source:"2027"}
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
   const useOriginal=hash!==""&&hash!=="#simpleKit"&&hash!=="#simple-gallery"&&hash!=="#simpleMultiline"&&hash!=="#simpleUnderline"&&hash!=="#simpleFrames";
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
 const underlineList=document.getElementById("simpleUnderlineItems");
 const underlineChosen=document.getElementById("simpleUnderlineChosen");
 if(!underlineList||!underlineChosen)return;
 let pickedUnderline:string|null=null;
 for(const [index,item] of UNDERLINE_SAMPLES.entries()){
   const row=document.createElement("button");
   row.type="button";
   row.className="simple-font-row simple-underline-row";
   row.dataset.sampleId=item.id;
   row.setAttribute("aria-pressed","false");
   row.setAttribute("aria-label","Chọn "+item.label);
   const number=document.createElement("span");
   number.className="simple-font-number";
   number.textContent=String(index+1).padStart(2,"0");
   const content=document.createElement("span");
   content.className="simple-font-content";
   const preview=document.createElement("span");
   preview.className="simple-underline-preview simple-underline-"+item.style;
   preview.textContent=item.preview;
   const label=document.createElement("span");
   label.className="simple-font-meta";
   label.textContent=item.label;
   const tick=document.createElement("span");
   tick.className="simple-font-check";
   tick.setAttribute("aria-hidden","true");
   tick.textContent="✓";
   content.append(preview,label);
   row.append(number,content,tick);
   underlineList.append(row);
 }
 underlineList.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const row=event.target.closest<HTMLButtonElement>(".simple-underline-row");
   if(!row)return;
   const item=UNDERLINE_SAMPLES.find(s=>s.id===row.dataset.sampleId);
   if(!item)return;
   pickedUnderline=item.id;
   for(const button of Array.from(underlineList.querySelectorAll<HTMLButtonElement>(".simple-underline-row")))
     button.setAttribute("aria-pressed",String(button.dataset.sampleId===pickedUnderline));
   underlineChosen.textContent="Đã chọn: "+item.label;
   underlineChosen.hidden=false;
 });
 const framesList=document.getElementById("simpleFramesItems");
 const framesChosen=document.getElementById("simpleFramesChosen");
 if(!framesList||!framesChosen)return;
 let pickedFrame:string|null=null;
 for(const [index,item] of FRAMED_SAMPLES.entries()){
   if(index===0||index===16){
     const heading=document.createElement("div");
     heading.className="simple-frame-group-label";
     heading.setAttribute("role","heading");
     heading.setAttribute("aria-level","3");
     heading.textContent=index===0?"Khung chữ, nhãn và thông báo":"Bong bóng trò chuyện";
     framesList.append(heading);
   }
   const row=document.createElement("button");
   row.type="button";
   row.className="simple-font-row simple-frame-row";
   row.dataset.sampleId=item.id;
   row.setAttribute("aria-pressed","false");
   row.setAttribute("aria-label","Chọn mẫu "+item.label);
   const number=document.createElement("span");
   number.className="simple-font-number";
   number.textContent=String(index+1).padStart(2,"0");
   const content=document.createElement("span");
   content.className="simple-font-content";
   const stage=document.createElement("span");
   stage.className="simple-frame-stage";
   if(["bubble-user-dark","bubble-user-soft","bubble-two","bubble-time"].includes(item.style))
     stage.classList.add("simple-frame-stage-right");
   const preview=document.createElement("span");
   preview.className="simple-frame-preview simple-frame-"+item.style;
   if(item.style==="alert-description"){
     const heading=document.createElement("strong");
     heading.textContent=item.lines[0];
     const desc=document.createElement("span");
     desc.textContent=item.lines.slice(1).join("\n");
     preview.append(heading,desc);
   }else{
     preview.textContent=item.lines.join("\n");
   }
   if(item.time){
     const stamp=document.createElement("span");
     stamp.className="simple-frame-timestamp";
     stamp.textContent=item.time;
     preview.append(stamp);
   }
   stage.append(preview);
   const label=document.createElement("span");
   label.className="simple-font-meta";
   label.textContent=item.label+" · "+item.source;
   const tick=document.createElement("span");
   tick.className="simple-font-check";
   tick.setAttribute("aria-hidden","true");
   tick.textContent="✓";
   content.append(stage,label);
   row.append(number,content,tick);
   framesList.append(row);
 }
 framesList.addEventListener("click",event=>{
   if(!(event.target instanceof Element))return;
   const row=event.target.closest<HTMLButtonElement>(".simple-frame-row");
   if(!row)return;
   const item=FRAMED_SAMPLES.find(sample=>sample.id===row.dataset.sampleId);
   if(!item)return;
   pickedFrame=item.id;
   for(const button of Array.from(framesList.querySelectorAll<HTMLButtonElement>(".simple-frame-row")))
     button.setAttribute("aria-pressed",String(button.dataset.sampleId===pickedFrame));
   framesChosen.textContent="Đã chọn: "+item.label;
   framesChosen.hidden=false;
 });
}

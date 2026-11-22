// UI-V34 · ScrollAnchor specimen under RULE 11.
// Follows assistant-ui public ScrollAnchor behavior in spirit, not its React source.
// New text never steals scroll position once a reader scrolls away from the end.
type Author="user"|"assistant";
interface Message {author:Author;text:string}
const SEED:readonly Message[]=[
 {author:"user",text:"Kiểm tra lại vùng danh bạ."},
 {author:"assistant",text:"Mình sẽ kiểm tra trục ngang, vùng chữ và chiều cao hàng."},
 {author:"user",text:"Nếu hội thoại đang mở và tôi cuộn lên thì sao?"},
 {author:"assistant",text:"Khi bạn đang đọc tin cũ, nội dung mới không được tự kéo xuống."},
 {author:"user",text:"Lề bảng STT, Tên, Số lượng còn chưa thẳng."},
 {author:"assistant",text:"Phần tiêu đề và dữ liệu phải dùng cùng một trục cột."},
 {author:"user",text:"Hãy đưa thêm ví dụ có tên dài."},
 {author:"assistant",text:"Tên hàng dài vẫn phải xuống dòng mà không phá vỡ chiều rộng cột tiền."}
];
const STREAM:readonly string[]=[
 "Đang thêm nội dung theo các đoạn đã có trong bộ thử.",
 "Hàng đầu không tự thay đổi khi người đọc đang xem phần trước.",
 "Kết thúc mô phỏng: nút về cuối vẫn nằm ở vị trí dễ tìm."
];
function messageItem(message:Message):HTMLElement{
 const row=document.createElement("div");
 row.className="ui-scroll-anchor-message";
 row.dataset.author=message.author;
 row.textContent=message.text;
 return row;
}
export function initScrollAnchorLab():void{
 const viewport=document.getElementById("scrollAnchorViewport");
 const jump=document.getElementById("scrollAnchorJump") as HTMLButtonElement|null;
 const add=document.getElementById("scrollAnchorAdd") as HTMLButtonElement|null;
 const stream=document.getElementById("scrollAnchorStream") as HTMLButtonElement|null;
 const older=document.getElementById("scrollAnchorOld") as HTMLButtonElement|null;
 const reset=document.getElementById("scrollAnchorReset") as HTMLButtonElement|null;
 const status=document.getElementById("scrollAnchorStatus");
 if(!viewport||!jump||!add||!stream||!older||!reset||!status)return;
 let pinned=true,unseen=0,sequence=0,streamTimer:number|null=null;
 const atBottom=()=>viewport.scrollHeight-viewport.scrollTop-viewport.clientHeight<=32;
 const updateJump=()=>{
  jump.hidden=pinned||unseen===0;
  jump.textContent=unseen>0?"Về tin mới · "+unseen:"Về tin mới";
 };
 const jumpToBottom=()=>{
  pinned=true;unseen=0;
  viewport.scrollTop=viewport.scrollHeight;
  updateJump();
  status.textContent="Đang ở cuối hội thoại; tin mới sẽ xuất hiện ở dưới.";
 };
 const onScroll=()=>{
  // User initiated scroll away from the tail breaks follow mode.
  pinned=atBottom();
  if(pinned)unseen=0;
  updateJump();
 };
 viewport.addEventListener("scroll",onScroll,{passive:true});
 const append=(message:Message)=>{
  const follow=pinned;
  viewport.append(messageItem(message));
  if(follow){
   viewport.scrollTop=viewport.scrollHeight;
   unseen=0;
  }else{
   unseen++;
   // Deliberately preserve viewport.scrollTop while the reader is above the end.
  }
  updateJump();
  status.textContent=follow
   ?"Đã thêm một đoạn và giữ ở cuối hội thoại."
   :"Đang đọc tin cũ; có "+unseen+" đoạn mới nhưng vị trí đọc được giữ nguyên.";
 };
 const cancelStream=()=>{
  if(streamTimer!==null){window.clearInterval(streamTimer);streamTimer=null;}
  stream.disabled=false;
 };
 const initialize=()=>{
  cancelStream();
  viewport.replaceChildren(...SEED.map(messageItem));
  pinned=true;unseen=0;sequence=0;
  viewport.scrollTop=viewport.scrollHeight;
  updateJump();status.textContent="Sẵn sàng: cuộn lên, rồi thêm tin để thử không tự nhảy.";
 };
 jump.addEventListener("click",jumpToBottom);
 add.addEventListener("click",()=>{
  sequence++;
  append({author:"assistant",text:"Đoạn mẫu "+sequence+": soát lại tên, số lượng, đơn giá và thành tiền."});
 });
 older.addEventListener("click",()=>{
  cancelStream();pinned=false;
  viewport.scrollTop=0;
  updateJump();
  status.textContent="Đang xem đoạn đầu. Hãy bấm Thêm tin hoặc Mô phỏng streaming.";
 });
 reset.addEventListener("click",initialize);
 stream.addEventListener("click",()=>{
  if(streamTimer!==null)return;
  let next=0;stream.disabled=true;
  streamTimer=window.setInterval(()=>{
   if(document.hidden){cancelStream();return;}
   append({author:"assistant",text:STREAM[next]});
   next++;
   if(next>=STREAM.length){
    cancelStream();
    status.textContent=pinned
     ?"Đã mô phỏng đủ ba đoạn, vẫn ở cuối hội thoại."
     :"Đã mô phỏng đủ ba đoạn; vị trí đọc cũ được giữ nguyên, bấm Về tin mới khi muốn.";
   }
  },450);
 });
 document.addEventListener("visibilitychange",()=>{if(document.hidden)cancelStream();});
 window.addEventListener("pagehide",cancelStream);
 initialize();
}

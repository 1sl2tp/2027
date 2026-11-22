// UI-V32 · Read-only, local text motion specimens.
// Rule authority: RULES.md R11. No ChatGPT internals, no backend/Markdown parser.
// Motion only indicates waiting or reveals *already supplied* example text.
type MotionKind="dots"|"shimmer"|"skeleton"|"words"|"chunks"|"lifecycle";
interface MotionSpec {id:string;title:string;description:string;kind:MotionKind;source:string}
export const TEXT_MOTION_SPECS:readonly MotionSpec[]=[
 {id:"MOTION-01",title:"Đang chờ · ba chấm",description:"Chỉ báo đang chờ trước khi có chữ; không thay thế phản hồi thật.",kind:"dots",source:"Apps SDK UI · Indicator"},
 {id:"MOTION-02",title:"Đang chuẩn bị · shimmer chữ",description:"Dòng chữ mờ sáng dần khi chờ, không dùng cho câu trả lời đã hoàn tất.",kind:"shimmer",source:"AI Elements · Shimmer / Plan"},
 {id:"MOTION-03",title:"Chỗ trống · skeleton đoạn",description:"Giữ không gian bố cục khi chưa có nội dung; không dùng đoạn giả làm dữ liệu thật.",kind:"skeleton",source:"AI Elements · Skeleton / placeholders"},
 {id:"MOTION-04",title:"Chữ xuất hiện theo từ + caret",description:"Chỉ hiện nội dung mẫu đã cung cấp; con trỏ biến mất khi hoàn tất.",kind:"words",source:"Vercel Streamdown · Carets"},
 {id:"MOTION-05",title:"Nhận nội dung theo khối",description:"Thêm từng khối, không vẽ lại toàn trang và không tự tạo Markdown.",kind:"chunks",source:"Streamdown / assistant-ui · Streaming blocks"},
 {id:"MOTION-06",title:"Vòng đời · chờ → chữ → hoàn tất",description:"Thể hiện trạng thái nhất quán; Dừng là dừng, không báo thành công.",kind:"lifecycle",source:"assistant-ui · Streaming states"}
];
const DEMO_TEXT="Đây là văn bản thử để kiểm tra chữ xuất hiện dần, dấu tiếng Việt và khoảng cách giữa các từ.";
const DEMO_CHUNKS=[
 "Đang kiểm tra bố cục hội thoại theo từng vùng.",
 "Chữ được hiển thị theo các phần đã nhận, không phải hiệu ứng giả lập nội dung mới.",
 "Khi hoàn tất, giao diện giữ nguyên văn bản và ẩn con trỏ."
];
const FINAL_NOTE="Bản minh họa đã hoàn tất. Nội dung không lấy từ máy chủ.";
interface MotionInstance {
 spec:MotionSpec;
 region:HTMLElement;
 status:HTMLElement;
 start:HTMLButtonElement;
 stop:HTMLButtonElement;
 timers:Set<number>;
 state:"idle"|"waiting"|"streaming"|"complete"|"cancelled";
}
const instances:MotionInstance[]=[];
function element<K extends keyof HTMLElementTagNameMap>(tag:K,className="",value=""):HTMLElementTagNameMap[K]{
 const el=document.createElement(tag);
 if(className)el.className=className;
 if(value)el.textContent=value;
 return el;
}
function applyState(inst:MotionInstance,state:MotionInstance["state"],message:string):void{
 inst.state=state;
 inst.region.dataset.motionState=state;
 inst.region.setAttribute("aria-busy",String(state==="waiting"||state==="streaming"));
 inst.status.textContent=message;
 inst.start.disabled=state==="waiting"||state==="streaming";
 inst.stop.disabled=!(state==="waiting"||state==="streaming");
}
function clearTimers(inst:MotionInstance):void{
 for(const timer of inst.timers){window.clearTimeout(timer);window.clearInterval(timer);}
 inst.timers.clear();
}
function schedule(inst:MotionInstance,action:()=>void,ms:number):void{
 const timer=window.setTimeout(()=>{inst.timers.delete(timer);action();},ms);
 inst.timers.add(timer);
}
function recurring(inst:MotionInstance,action:()=>void,ms:number):void{
 const timer=window.setInterval(action,ms);inst.timers.add(timer);
}
function resetRegion(inst:MotionInstance):void{
 inst.region.replaceChildren();
}
function waitingDots(inst:MotionInstance):void{
 const row=element("div","ui-motion-dots");
 row.setAttribute("aria-hidden","true");
 for(let i=0;i<3;i++)row.append(element("span"));
 inst.region.append(row);
}
function shimmer(inst:MotionInstance):void{
 const node=element("p","ui-motion-shimmer","Đang chuẩn bị nội dung…");
 node.setAttribute("aria-hidden","true");
 inst.region.append(node);
}
function skeleton(inst:MotionInstance):void{
 const group=element("div","ui-motion-skeleton");
 group.setAttribute("aria-hidden","true");
 for(let i=0;i<3;i++)group.append(element("span"));
 inst.region.append(group);
}
function caret(style:"block"|"circle"):HTMLElement{
 const node=element("span","ui-motion-caret ui-motion-caret--"+style);
 node.setAttribute("aria-hidden","true");
 return node;
}
function finish(inst:MotionInstance,note?:string):void{
 clearTimers(inst);
 const text=note||FINAL_NOTE;
 if(inst.spec.kind==="dots"||inst.spec.kind==="shimmer"||inst.spec.kind==="skeleton"){
  resetRegion(inst);
  inst.region.append(element("p","ui-motion-paragraph",text));
 }
 applyState(inst,"complete","Hoàn tất · đây chỉ là bản thử giao diện.");
}
function startStream(inst:MotionInstance,mode:"words"|"chunks",isLifecycle=false):void{
 clearTimers(inst);resetRegion(inst);
 applyState(inst,"streaming","Đang nhận chữ mẫu…");
 const wrap=element("div","ui-motion-result");
 const cursor=caret(mode==="words"?"block":"circle");
 if(mode==="words"){
  const text=element("p","ui-motion-paragraph");
  const copy=element("span");
  text.append(copy,cursor);wrap.append(text);inst.region.append(wrap);
  // Split only at whitespace boundaries: no cutting into Vietnamese combining marks.
  const words=DEMO_TEXT.match(/\S+\s*/gu)||[];
  let pos=0;
  recurring(inst,()=>{
    if(inst.state!=="streaming")return;
    const batch=words.slice(pos,pos+2).join("");
    pos+=2;copy.textContent+=batch;
    if(pos>=words.length){cursor.remove();finish(inst);}
  },115);
  return;
 }
 const paragraphs=DEMO_CHUNKS;
 let pos=0;
 wrap.append(cursor);inst.region.append(wrap);
 recurring(inst,()=>{
  if(inst.state!=="streaming")return;
  const paragraph=element("p","ui-motion-paragraph",paragraphs[pos]);
  wrap.insertBefore(paragraph,cursor);pos++;
  if(pos>=paragraphs.length){
   cursor.remove();finish(inst,isLifecycle?"Vòng đời mẫu đã hoàn tất.":undefined);
  }
 },isLifecycle?420:500);
}
function run(inst:MotionInstance,reduced:boolean):void{
 clearTimers(inst);resetRegion(inst);
 if(reduced){
  if(inst.spec.kind==="words")inst.region.append(element("p","ui-motion-paragraph",DEMO_TEXT));
  else if(inst.spec.kind==="chunks"||inst.spec.kind==="lifecycle"){
   for(const chunk of DEMO_CHUNKS)inst.region.append(element("p","ui-motion-paragraph",chunk));
  }else inst.region.append(element("p","ui-motion-paragraph",FINAL_NOTE));
  applyState(inst,"complete","Hoàn tất · giảm chuyển động, không chạy hiệu ứng.");
  return;
 }
 if(inst.spec.kind==="words"||inst.spec.kind==="chunks"){
  startStream(inst,inst.spec.kind);return;
 }
 applyState(inst,"waiting","Đang chờ nội dung mẫu…");
 if(inst.spec.kind==="dots"){waitingDots(inst);schedule(inst,()=>finish(inst),1400);return;}
 if(inst.spec.kind==="shimmer"){shimmer(inst);schedule(inst,()=>finish(inst),1800);return;}
 if(inst.spec.kind==="skeleton"){skeleton(inst);schedule(inst,()=>finish(inst),1500);return;}
 waitingDots(inst);
 schedule(inst,()=>startStream(inst,"chunks",true),850);
}
function stop(inst:MotionInstance):void{
 if(inst.state!=="waiting"&&inst.state!=="streaming")return;
 clearTimers(inst);
 // Retain already visible data; remove motion-only placeholders and cursor.
 inst.region.querySelectorAll(".ui-motion-dots,.ui-motion-shimmer,.ui-motion-skeleton,.ui-motion-caret").forEach(node=>node.remove());
 if(inst.region.textContent?.trim()==="")inst.region.append(element("p","ui-motion-paragraph","Đã dừng trước khi nhận nội dung."));
 applyState(inst,"cancelled","Đã dừng · chưa hoàn tất.");
}
function makeCard(spec:MotionSpec,reduced:()=>boolean):HTMLElement{
 const card=element("article","ui-motion-card");card.dataset.motionId=spec.id;
 const head=element("div","ui-motion-head");
 const title=element("h3","ui-motion-title",spec.id+" · "+spec.title);
 const desc=element("p","ui-motion-desc",spec.description);
 head.append(title,desc);
 const region=element("div","ui-motion-preview");
 region.setAttribute("aria-label","Vùng xem trước "+spec.title);
 region.dataset.motionState="idle";
 region.append(element("p","ui-motion-paragraph ui-motion-placeholder","Bấm Chạy thử để xem mẫu."));
 const footer=element("div","ui-motion-controls");
 const start=element("button","ui-button ui-button--secondary","Chạy thử");
 const stopButton=element("button","ui-button ui-button--quiet","Dừng");
 start.type=stopButton.type="button";stopButton.disabled=true;
 const status=element("span","ui-motion-status","Chưa chạy");
 status.setAttribute("role","status");status.setAttribute("aria-live","polite");status.setAttribute("aria-atomic","true");
 footer.append(start,stopButton);
 const source=element("p","ui-motion-source","Nguồn tham khảo: "+spec.source);
 const inst:MotionInstance={spec,region,status,start,stop:stopButton,timers:new Set<number>(),state:"idle"};
 instances.push(inst);
 start.addEventListener("click",()=>run(inst,reduced()));
 stopButton.addEventListener("click",()=>stop(inst));
 card.append(head,region,footer,status,source);
 return card;
}
export function initTextMotionGallery():void{
 const list=document.getElementById("uiMotionItems");
 if(!list)return;
 const motionPreference=window.matchMedia("(prefers-reduced-motion: reduce)");
 const reduced=()=>motionPreference.matches;
 const fragment=document.createDocumentFragment();
 for(const spec of TEXT_MOTION_SPECS)fragment.append(makeCard(spec,reduced));
 list.append(fragment);
 const endAll=()=>{for(const inst of instances)stop(inst);};
 document.addEventListener("visibilitychange",()=>{if(document.hidden)endAll();});
 window.addEventListener("pagehide",endAll);
 motionPreference.addEventListener?.("change",()=>{if(reduced())endAll();});
}

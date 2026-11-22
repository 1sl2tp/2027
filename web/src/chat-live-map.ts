// V44 · P0-P4 map of the connected 1sl2tp/chat repo, to canonical R12 contracts.
// This is evidence metadata, NOT a second component registry or remote runtime.
import {COMPONENT_CONTRACTS,getComponentContract} from "./component-contracts.js";
export interface ChatLiveBinding {
 id:string;selector:string;file:string;note:string;
}
export const CHAT_LIVE_BINDINGS:readonly ChatLiveBinding[]=[
 {id:"CHAT-SCREEN",selector:"#chatScreen",file:"index.source.html",note:"Chat screen root; Platform keyboard policy ở ngoài tree."},
 {id:"CHAT-DIRECTORY",selector:"#shellNavigationLayer",file:"index.source.html",note:"Region 1, desktop cố định/mobile danh bạ."},
 {id:"DIRECTORY-TOOLS",selector:".contact-directory-tools",file:"contact-directory-admin.js",note:"Cha của search/filter."},
 {id:"DIRECTORY-SEARCH",selector:"#contactDirectorySearchInput",file:"contact-directory-admin.js",note:"Một ô tìm danh bạ."},
 {id:"DIRECTORY-FILTERS",selector:"[data-contact-directory-filter]",file:"contact-directory-admin.js",note:"Nhóm bộ lọc danh bạ."},
 {id:"DIRECTORY-LIST",selector:"[data-v21-contact-list]",file:"index.source.html",note:"Một danh sách nhiều hàng, scroll độc lập."},
 {id:"DIRECTORY-CONTACT-ROW",selector:"[data-contact-row]",file:"contact-directory-admin.js",note:"Một khách = một row."},
 {id:"CONTACT-AVATAR",selector:".shell-contact-avatar",file:"mobile-ui-polish.css",note:"Avatar thuộc một khách."},
 {id:"CONTACT-NAME",selector:".shell-contact-name",file:"mobile-ui-polish.css",note:"Tên ưu tiên so với preview."},
 {id:"CONTACT-PREVIEW",selector:".shell-contact-preview",file:"mobile-ui-polish.css",note:"Preview/tin cuối, không thuộc header."},
 {id:"DIRECTORY-ACCOUNT-FOOTER",selector:"[data-sidebar-account-footer]",file:"index.source.html",note:"Footer account ở dưới vùng danh sách."},
 {id:"CHAT-REGION-TOP",selector:"#regionTop",file:"index.source.html",note:"Header normal / reading / typing."},
 {id:"HEADER-IDENTITY",selector:".top-mode-switch",file:"index.source.html",note:"Một vùng identity/tab, không chia nhiều header."},
 {id:"HEADER-AVATAR",selector:".top-mode-contact-avatar",file:"index.source.html",note:"Ẩn khi typing mobile, Shell quyết định."},
 {id:"HEADER-NAME",selector:"[data-chat-tab-label]",file:"index.source.html",note:"Tên/tab, co giãn với không gian còn lại."},
 {id:"HEADER-CALL-CONTROL",selector:"#chatCallFocus",file:"index.source.html",note:"CallFocus thuộc header, không Message."},
 {id:"HEADER-MORE-CONTROL",selector:"[data-chat-header-more]",file:"index.source.html",note:"Mở menu có trạng thái expanded."},
 {id:"CHAT-QUICK-ACTIONS",selector:"#chatQuickActions",file:"index.source.html",note:"Nav hành động khách, không phải composer."},
 {id:"CHAT-NETWORK-STATUS",selector:"#chatConnectionStatus",file:"chat-connection-status.js",note:"Trạng thái kết nối không đồng nghĩa đã giao tin."},
 {id:"CHAT-THREAD",selector:"#thread",file:"index.source.html",note:"Region 2, vùng chat có một owner nội dung."},
 {id:"CHAT-MESSAGE-LIST",selector:"#messageWindow",file:"index.source.html",note:"Danh sách tin, tin ảo, history spacer."},
 {id:"THREAD-DAY-MARKER",selector:"#messageDayFloating",file:"index.source.html",note:"Nhãn ngày nổi, không trở thành scroll."},
 {id:"THREAD-HISTORY-LOAD",selector:"#historyMoreButton",file:"index.source.html",note:"Tải tin cũ, giữ neo."},
 {id:"THREAD-JUMP-TO-LATEST",selector:"#threadScrollControl",file:"index.source.html",note:"Logical owner là MessageList; DOM mount ở #thread-bottom-container."},
 {id:"THREAD-JUMP-ICON",selector:"#threadScrollArrow",file:"index.source.html",note:"Icon con của ScrollControl."},
 {id:"THREAD-UNSEEN-COUNT",selector:"#threadScrollUnseenBadge",file:"index.source.html",note:"Badge con của nút, data từ MessageList."},
 {id:"CHAT-MESSAGE",selector:".message-row",file:"app.js",note:"Một tin render bằng message ID."},
 {id:"MESSAGE-CONTENT-PARTS",selector:".message-body",file:"app.js",note:"Logical part; DOM CHAT có thêm wrapper .message-text."},
 {id:"MESSAGE-TEXT-PART",selector:".message-text",file:"app.js",note:"Chữ tin, CSS bubble cùng Message owner."},
 {id:"MESSAGE-REPLY-QUOTE",selector:".reply-quote",file:"app.js",note:"Quote đúng tin; wrapper thực có thể khác mẫu canonical."},
 {id:"MESSAGE-TIME",selector:".message-sent-time",file:"app.js",note:"Thời gian theo message, UTC→VN trong render."},
 {id:"MESSAGE-DELIVERY-STATE",selector:".message-delivery-state",file:"app.js",note:"Gửi/chờ/lỗi đúng tin, không suy ACK từ hiệu ứng."},
 {id:"CHAT-MESSAGE-ACTIONS",selector:".message-action-group",file:"app.js",note:"Một action group thuộc message, nhận reply/copy/forward."},
 {id:"MESSAGE-COPY-BUTTON",selector:".message-action-group button",file:"app.js",note:"Giữ handler đúng message, không clone nút."},
 {id:"MESSAGE-FORWARD-ACTION",selector:".message-action-group button",file:"app.js",note:"Conditional action; xử lý theo message."},
 {id:"MESSAGE-REPLY-ACTION",selector:".message-action-group button",file:"app.js",note:"Conditional action; xử lý theo message."},
 {id:"CHAT-COMPOSER",selector:"#composerForm",file:"index.source.html",note:"Form cha, một textarea và toolbar."},
 {id:"COMPOSER-REPLY-CONTEXT",selector:"#replyContext",file:"index.source.html",note:"Reply preview là con composer."},
 {id:"COMPOSER-SURFACE",selector:"#composerShell",file:"index.source.html",note:"DOM con của #composerForm, chứa editor/attachment/footer; không là form thứ hai."},
 {id:"COMPOSER-EDITOR-WRAP",selector:"#editorWrap",file:"index.source.html",note:"Chứa một #editor; không trực tiếp tăng chiều cao root khi keyboard thay đổi."},
 {id:"COMPOSER-INPUT",selector:"#editor",file:"index.source.html",note:"Textarea gõ một–n dòng."},
 {id:"COMPOSER-ATTACHMENTS",selector:"#attachmentTray",file:"index.source.html",note:"Khay tệp/ảnh chờ gửi."},
 {id:"COMPOSER-TOOLBAR",selector:"#composerFooter",file:"index.source.html",note:"Chỉ một vùng hành động +/mic/send."},
 {id:"COMPOSER-ATTACH-BUTTON",selector:"#composer-plus-btn",file:"index.source.html",note:"Plus mở menu hoặc picker."},
 {id:"COMPOSER-MIC-BUTTON",selector:"#composer-mic-btn",file:"index.source.html",note:"Mic/ghi âm có state."},
 {id:"COMPOSER-SEND-BUTTON",selector:"#send",file:"index.source.html",note:"Gửi/dừng có trạng thái."},
 {id:"COMPOSER-ACTION-MENU",selector:"#composerActionMenu",file:"index.source.html",note:"Popover được mount bên cạnh #composerForm; logical owner là Composer, không đặt bên trong textarea."},
 {id:"CHAT-WORK-REGION",selector:"#workThreadView",file:"index.source.html",note:"Region 3 desktop hoặc route Work mobile."},
 {id:"WORK-SUMMARY",selector:"[data-work-summary-root]",file:"index.source.html",note:"Tổng hợp hàng không phải message mới."},
 {id:"CHAT-MOBILE-DRAWER",selector:"#mobileChatDrawer",file:"index.source.html",note:"Mobile nav là shell projection."},
 {id:"CHAT-OVERLAY-ROOT",selector:"#globalOverlayRoot",file:"index.source.html",note:"Overlay root sở hữu portal."},
 {id:"THREAD-SEARCH-OVERLAY",selector:".conversation-search-overlay",file:"conversation-search.js",note:"Search only loaded messages, scoped theo contact/session."},
 {id:"THREAD-SEARCH-RESULTS",selector:".conversation-search-results",file:"conversation-search.js",note:"Danh sách kết quả, không gửi RPC."},
 {id:"THREAD-SEARCH-HIT",selector:".conversation-search-hit",file:"conversation-search.js",note:"Click dùng revealLoadedMessage(id)."},
 {id:"CHAT-IMAGE-VIEWER",selector:"[data-image-viewer-mode]",file:"app.js",note:"Overlay viewer thuộc InteractionController; selector là state marker."},
 {id:"CHAT-FORWARD-OVERLAY",selector:".message-forward-overlay",file:"message-forward.js",note:"Overlay chuyển tiếp, không gắn vào message DOM."},
];
export const CHAT_PLATFORM_OWNERS=[
 {title:"P0 · Bàn phím / viewport / safe-area",file:"keyboard-inset-core.js",paired:"shell-form-viewport-policy.js",note:"Platform tính che khuất bàn phím; Composer không tự đặt fixed/viewport writer."},
 {title:"P1 · Route / responsive / sidebar",file:"shell.js",paired:"ui-foundation.css",note:"Shell phân định mobile 1 vùng, desktop nhiều vùng; token nền dùng chung."},
 {title:"P0/P1 · Overlay và gesture",file:"interaction-controller.js",paired:"shell.js",note:"Một chủ sở hữu focus/overlay; không tạo listener global trùng."}
] as const;
export const CHAT_VIEW_GROUPS=[
 {key:"all",title:"Toàn bộ cây",root:"CHAT-SCREEN"},
 {key:"directory",title:"Vùng 1 · Danh bạ",root:"CHAT-DIRECTORY"},
 {key:"header",title:"Top · Header",root:"CHAT-REGION-TOP"},
 {key:"thread",title:"Vùng 2 · Hội thoại",root:"CHAT-THREAD"},
 {key:"composer",title:"Ô gõ · Composer",root:"CHAT-COMPOSER"},
 {key:"work",title:"Vùng 3 · Công việc",root:"CHAT-WORK-REGION"},
 {key:"overlay",title:"Popup / Menu",root:"CHAT-OVERLAY-ROOT"}
] as const;
export function auditChatLiveBindings(bindings:readonly ChatLiveBinding[]=CHAT_LIVE_BINDINGS):string[]{
 const errors:string[]=[],ids=new Set<string>();
 for(const b of bindings){
  if(ids.has(b.id))errors.push("binding trùng "+b.id);
  ids.add(b.id);
  if(!getComponentContract(b.id))errors.push("không có contract "+b.id);
  if(!b.selector.trim()||!b.file.trim())errors.push("thiếu selector/file "+b.id);
 }
 for(const b of bindings){
  let cursor=getComponentContract(b.id);
  const seen=new Set<string>();
  while(cursor?.parent){
   if(seen.has(cursor.id)){errors.push("vòng lặp "+b.id);break;}
   seen.add(cursor.id);cursor=getComponentContract(cursor.parent);
  }
 }
 return errors;
}
export function initChatLiveMap():void{
 const root=document.getElementById("chatLiveMapTree");
 const select=document.getElementById("chatLiveMapScope") as HTMLSelectElement|null;
 const status=document.getElementById("chatLiveMapStatus");
 const platform=document.getElementById("chatLivePlatform");
 if(!root||!select||!status||!platform)return;
 const sourceUrl=(file:string)=>"https://github.com/1sl2tp/chat/blob/main/"+file;
 for(const item of CHAT_PLATFORM_OWNERS){
  const line=document.createElement("p");
  const strong=document.createElement("strong");strong.textContent=item.title+" · ";
  const link=document.createElement("a");link.href=sourceUrl(item.file);link.target="_blank";link.rel="noopener noreferrer";link.textContent=item.file;
  const other=document.createElement("a");other.href=sourceUrl(item.paired);other.target="_blank";other.rel="noopener noreferrer";other.textContent=item.paired;
  const note=document.createElement("small");note.textContent=" · "+item.note;
  line.append(strong,link,document.createTextNode(" + "),other,note);platform.append(line);
 }
 const byId=new Map(CHAT_LIVE_BINDINGS.map(x=>[x.id,x]));
 const render=(id:string):HTMLElement=>{
  const contract=getComponentContract(id);
  const item=byId.get(id);
  const children=COMPONENT_CONTRACTS.filter(x=>x.parent===id&&byId.has(x.id));
  const li=document.createElement("li");li.dataset.componentId=id;
  const heading=document.createElement("strong");heading.textContent=id;
  const meta=document.createElement("span");
  const nature=contract?.nature||"container";
  meta.textContent=" · "+nature+" · "+(contract?.cardinality==="many"?"0–n":contract?.cardinality==="optional"?"0–1":"1");
  li.append(heading,meta);
  if(item){
   const desc=document.createElement("small");
   desc.textContent=item.note;
   const line=document.createElement("small");
   line.textContent="DOM: "+item.selector+" · CSS/logic owner: "+(contract?.owner||"n/a")+" · source: ";
   const link=document.createElement("a");link.href=sourceUrl(item.file);link.target="_blank";link.rel="noopener noreferrer";link.textContent=item.file;
   line.append(link);li.append(desc,line);
  }
  if(children.length){
   const list=document.createElement("ul");list.className="simple-component-tree-level";
   for(const child of children)list.append(render(child.id));
   li.append(list);
  }
  return li;
 };
 const update=()=>{
  const group=CHAT_VIEW_GROUPS.find(x=>x.key===select.value)||CHAT_VIEW_GROUPS[0];
  const list=document.createElement("ul");list.className="simple-component-tree-level";
  list.append(render(group.root));root.replaceChildren(list);
  const total=CHAT_LIVE_BINDINGS.filter(b=>group.key==="all"||b.id===group.root||(()=>{
   let p=getComponentContract(b.id)?.parent;
   while(p){if(p===group.root)return true;p=getComponentContract(p)?.parent||null;}
   return false;
  })()).length;
  status.textContent=total+" ràng buộc CHAT đã đối chiếu · chỉ đọc · "+group.title;
 };
 select.addEventListener("change",update);update();
}

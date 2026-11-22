// UI-V44 · RULE 12: structural contracts — classification before creating CSS.
// Public GitHub inspiration: assistant-ui ComposerPrimitive, AI Elements PromptInput
// and OpenAI Apps SDK UI Button/Textarea. This is original 2027 metadata, not vendor code.
export type ComponentLayer="screen"|"region"|"composition"|"primitive"|"token";
export type ComponentNature="container"|"content"|"control"|"decoration";
export type ComponentCardinality="one"|"many"|"optional";
export interface ComponentContract {
 id:string;parent:string|null;layer:ComponentLayer;nature:ComponentNature;
 cardinality:ComponentCardinality;owner:string;description:string;
}
export const COMPONENT_CONTRACTS:readonly ComponentContract[]=[
 {id:"CHAT-SCREEN",parent:null,layer:"screen",nature:"container",cardinality:"one",owner:"app shell",description:"Vùng ứng dụng chat"},
 {id:"CHAT-DIRECTORY",parent:"CHAT-SCREEN",layer:"region",nature:"container",cardinality:"one",owner:"shell.js",description:"Danh bạ bên trái desktop, view chính trên mobile"},
 {id:"CHAT-REGION-TOP",parent:"CHAT-SCREEN",layer:"region",nature:"container",cardinality:"one",owner:"shell.js",description:"Header co theo normal / reading / typing"},
 {id:"CHAT-QUICK-ACTIONS",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"shell.js",description:"Thao tác khách hàng nằm trên thread, không trong composer"},
 {id:"CHAT-NETWORK-STATUS",parent:"CHAT-SCREEN",layer:"primitive",nature:"content",cardinality:"optional",owner:"chat-connection-status.js",description:"Hiển thị mạng/sync, không tự kết luận ACK tin"},
 {id:"CHAT-WORK-REGION",parent:"CHAT-SCREEN",layer:"region",nature:"container",cardinality:"optional",owner:"shell.js",description:"Region 3 workspace desktop hoặc route Work mobile"},
 {id:"CHAT-MOBILE-DRAWER",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"shell.js",description:"Điều hướng overlay riêng mobile, không nhân bản dữ liệu danh bạ"},
 {id:"CHAT-OVERLAY-ROOT",parent:"CHAT-SCREEN",layer:"region",nature:"container",cardinality:"one",owner:"shell.js",description:"Một nơi mount overlay toàn screen"},
 {id:"DIRECTORY-TOOLS",parent:"CHAT-DIRECTORY",layer:"composition",nature:"container",cardinality:"one",owner:"contact-directory-admin.js",description:"Chứa tìm kiếm và bộ lọc danh bạ"},
 {id:"DIRECTORY-SEARCH",parent:"DIRECTORY-TOOLS",layer:"primitive",nature:"content",cardinality:"one",owner:"ds-field",description:"Tìm khách, một input do vùng công cụ sở hữu"},
 {id:"DIRECTORY-FILTERS",parent:"DIRECTORY-TOOLS",layer:"composition",nature:"container",cardinality:"optional",owner:"contact-directory-admin.js",description:"Nhóm lọc; không thuộc từng dòng liên hệ"},
 {id:"DIRECTORY-LIST",parent:"CHAT-DIRECTORY",layer:"composition",nature:"container",cardinality:"one",owner:"shell.js",description:"Một scroll owner của danh bạ"},
 {id:"DIRECTORY-CONTACT-ROW",parent:"DIRECTORY-LIST",layer:"composition",nature:"container",cardinality:"many",owner:"contact-directory-admin.js",description:"Mỗi khách là một row với avatar, tên và preview"},
 {id:"CONTACT-AVATAR",parent:"DIRECTORY-CONTACT-ROW",layer:"primitive",nature:"content",cardinality:"optional",owner:"contact-directory-admin.js",description:"Một avatar thuộc đúng hàng khách"},
 {id:"CONTACT-NAME",parent:"DIRECTORY-CONTACT-ROW",layer:"primitive",nature:"content",cardinality:"one",owner:"contact-directory-admin.js",description:"Tên khách có ưu tiên đọc và co giãn"},
 {id:"CONTACT-PREVIEW",parent:"DIRECTORY-CONTACT-ROW",layer:"primitive",nature:"content",cardinality:"optional",owner:"contact-directory-admin.js",description:"Nội dung cuối và trạng thái không làm tăng row tùy tiện"},
 {id:"DIRECTORY-ACCOUNT-FOOTER",parent:"CHAT-DIRECTORY",layer:"composition",nature:"container",cardinality:"optional",owner:"shell.js",description:"Footer account nằm dưới danh sách, không lẫn scroll list"},
 {id:"HEADER-IDENTITY",parent:"CHAT-REGION-TOP",layer:"composition",nature:"container",cardinality:"one",owner:"shell.js",description:"Tên/avatar và tab cùng một vùng điều khiển"},
 {id:"HEADER-AVATAR",parent:"HEADER-IDENTITY",layer:"primitive",nature:"content",cardinality:"optional",owner:"shell.js",description:"Avatar có thể ẩn lúc bàn phím hiện"},
 {id:"HEADER-NAME",parent:"HEADER-IDENTITY",layer:"primitive",nature:"content",cardinality:"one",owner:"shell.js",description:"Tên liên hệ/nhãn tab"},
 {id:"HEADER-CALL-CONTROL",parent:"CHAT-REGION-TOP",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Nút gọi do vùng header sở hữu"},
 {id:"HEADER-MORE-CONTROL",parent:"CHAT-REGION-TOP",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Nút menu hội thoại, không thêm menu chồng"},
 {id:"WORK-SUMMARY",parent:"CHAT-WORK-REGION",layer:"composition",nature:"container",cardinality:"optional",owner:"work-customer-summary.js",description:"Tổng hợp hàng thuộc Work, không thuộc bubble chat"},
 {id:"THREAD-SEARCH-OVERLAY",parent:"CHAT-OVERLAY-ROOT",layer:"composition",nature:"container",cardinality:"optional",owner:"conversation-search.js",description:"Tìm trong cuộc hội thoại đã tải, có đúng focus owner"},
 {id:"THREAD-SEARCH-RESULTS",parent:"THREAD-SEARCH-OVERLAY",layer:"composition",nature:"container",cardinality:"one",owner:"conversation-search.js",description:"Kết quả tìm, không truy vấn mạng trong UI"},
 {id:"THREAD-SEARCH-HIT",parent:"THREAD-SEARCH-RESULTS",layer:"primitive",nature:"control",cardinality:"many",owner:"conversation-search.js",description:"Mỗi kết quả nhảy về ID tin trong đúng thread"},
 {id:"CHAT-IMAGE-VIEWER",parent:"CHAT-OVERLAY-ROOT",layer:"composition",nature:"container",cardinality:"optional",owner:"app.js",description:"Một viewer cho media: zoom/swipe/close/focus"},
 {id:"CHAT-FORWARD-OVERLAY",parent:"CHAT-OVERLAY-ROOT",layer:"composition",nature:"container",cardinality:"optional",owner:"message-forward.js",description:"Một picker chuyển tiếp ngoài vùng soạn"},
 {id:"CHAT-THREAD",parent:"CHAT-SCREEN",layer:"region",nature:"container",cardinality:"one",owner:"thread layout",description:"Vùng nội dung hội thoại, một owner cuộn"},
 {id:"CHAT-MESSAGE-LIST",parent:"CHAT-THREAD",layer:"composition",nature:"container",cardinality:"one",owner:"thread layout",description:"Danh sách nhiều tin nhắn"},
 {id:"CHAT-MESSAGE",parent:"CHAT-MESSAGE-LIST",layer:"composition",nature:"container",cardinality:"many",owner:"message template",description:"Một tin nhắn có nhiều phần tùy chọn"},
 {id:"THREAD-DAY-MARKER",parent:"CHAT-MESSAGE-LIST",layer:"primitive",nature:"content",cardinality:"optional",owner:"app.js",description:"Nhãn ngày nổi, không thêm scroll owner"},
 {id:"THREAD-HISTORY-LOAD",parent:"CHAT-MESSAGE-LIST",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Tải tin cũ, giữ neo vị trí theo message ID"},
 {id:"THREAD-JUMP-TO-LATEST",parent:"CHAT-MESSAGE-LIST",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Một nút tròn mũi tên về cuối, chỉ MessageList điều khiển"},
 {id:"THREAD-JUMP-ICON",parent:"THREAD-JUMP-TO-LATEST",layer:"token",nature:"decoration",cardinality:"one",owner:"web/icons.svg",description:"Arrow down, con của nút, không tự có hành động"},
 {id:"THREAD-UNSEEN-COUNT",parent:"THREAD-JUMP-TO-LATEST",layer:"primitive",nature:"content",cardinality:"optional",owner:"message list state",description:"Badge số tin chưa xem do đúng MessageList tính"},
 {id:"MESSAGE-TIME",parent:"CHAT-MESSAGE",layer:"primitive",nature:"content",cardinality:"optional",owner:"app.js",description:"Time node của tin, không phải dòng thừa"},
 {id:"MESSAGE-DELIVERY-STATE",parent:"CHAT-MESSAGE",layer:"primitive",nature:"content",cardinality:"optional",owner:"app.js",description:"sending/failed/ACK thuộc chính message"},
 {id:"CHAT-MESSAGE-TEXT",parent:"CHAT-MESSAGE",layer:"primitive",nature:"content",cardinality:"optional",owner:"typography tokens",description:"Chữ legacy; bản tin hỗn hợp dùng MESSAGE-CONTENT-PARTS"},
 {id:"MESSAGE-CONTENT-PARTS",parent:"CHAT-MESSAGE",layer:"composition",nature:"container",cardinality:"one",owner:"message template",description:"Vùng chứa tuần tự nhiều loại nội dung trong cùng một tin"},
 {id:"MESSAGE-REPLY-QUOTE",parent:"MESSAGE-CONTENT-PARTS",layer:"composition",nature:"content",cardinality:"optional",owner:"app.js",description:"Trích dẫn gắn vào content của đúng tin"},
 {id:"MESSAGE-TEXT-PART",parent:"MESSAGE-CONTENT-PARTS",layer:"primitive",nature:"content",cardinality:"many",owner:"typography tokens",description:"Mỗi đoạn chữ là một part, 0–n"},
 {id:"MESSAGE-TABLE-PART",parent:"MESSAGE-CONTENT-PARTS",layer:"composition",nature:"container",cardinality:"many",owner:"message layout",description:"Slot đặt DATA-TABLE gốc, không phát minh bảng mới"},
 {id:"MESSAGE-MEDIA-PART",parent:"MESSAGE-CONTENT-PARTS",layer:"composition",nature:"container",cardinality:"many",owner:"message media layout",description:"Vùng nhóm ảnh trong một tin"},
 {id:"MESSAGE-MEDIA-TILE",parent:"MESSAGE-MEDIA-PART",layer:"primitive",nature:"content",cardinality:"many",owner:"media tile",description:"Mỗi ô ảnh là con một nhóm media"},
 {id:"CHAT-MESSAGE-ACTIONS",parent:"CHAT-MESSAGE",layer:"composition",nature:"container",cardinality:"optional",owner:"ui-action-strip",description:"Vùng nhiều hành động của đúng tin"},
 {id:"MESSAGE-FORWARD-ACTION",parent:"CHAT-MESSAGE-ACTIONS",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Chuyển tiếp đúng message ID"},
 {id:"MESSAGE-REPLY-ACTION",parent:"CHAT-MESSAGE-ACTIONS",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Trả lời đúng message ID"},
 {id:"MESSAGE-COPY-BUTTON",parent:"CHAT-MESSAGE-ACTIONS",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Nút sao chép tất cả parts của đúng tin"},
 {id:"CHAT-COMPOSER",parent:"CHAT-THREAD",layer:"composition",nature:"container",cardinality:"one",owner:"ds-composer",description:"Cha logic của textarea, đính kèm và toolbar"},
 {id:"COMPOSER-SURFACE",parent:"CHAT-COMPOSER",layer:"composition",nature:"container",cardinality:"one",owner:"composer surface",description:"Physical DOM #composerShell trong #composerForm; dùng cùng primitives gốc"},
 {id:"COMPOSER-EDITOR-WRAP",parent:"COMPOSER-SURFACE",layer:"composition",nature:"container",cardinality:"one",owner:"composer editor geometry",description:"Physical DOM #editorWrap chứa đúng một textarea gốc"},
 {id:"COMPOSER-REPLY-CONTEXT",parent:"CHAT-COMPOSER",layer:"composition",nature:"container",cardinality:"optional",owner:"app.js",description:"Reply preview là con composer"},
 {id:"COMPOSER-ACTION-MENU",parent:"CHAT-COMPOSER",layer:"composition",nature:"container",cardinality:"optional",owner:"admin-composer-actions.js",description:"Menu mở từ + và đóng theo cùng owner"},
 {id:"COMPOSER-ATTACHMENTS",parent:"CHAT-COMPOSER",layer:"composition",nature:"container",cardinality:"optional",owner:"composer attachment slots",description:"Vùng có 0–n ảnh/tệp trước khi gửi"},
 {id:"COMPOSER-ATTACHMENT",parent:"COMPOSER-ATTACHMENTS",layer:"composition",nature:"content",cardinality:"many",owner:"attachment preview",description:"Một ảnh/tệp với nút bỏ riêng"},
 {id:"COMPOSER-INPUT",parent:"CHAT-COMPOSER",layer:"primitive",nature:"content",cardinality:"one",owner:"ds-composer textarea",description:"Một ô textarea; không bao gồm nút"},
 {id:"COMPOSER-TOOLBAR",parent:"CHAT-COMPOSER",layer:"composition",nature:"container",cardinality:"one",owner:"ds-composer-actions",description:"Cha trực tiếp của các nút thao tác"},
 {id:"COMPOSER-ATTACH-BUTTON",parent:"COMPOSER-TOOLBAR",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Nút thêm ảnh, chứa ui-icon"},
 {id:"COMPOSER-MIC-BUTTON",parent:"COMPOSER-TOOLBAR",layer:"primitive",nature:"control",cardinality:"optional",owner:"ui-button",description:"Nút mic, không phải icon độc lập"},
 {id:"COMPOSER-SEND-BUTTON",parent:"COMPOSER-TOOLBAR",layer:"primitive",nature:"control",cardinality:"one",owner:"ui-button",description:"Nút gửi/dừng theo trạng thái, icon là con"},
 {id:"COMPOSER-SEND-ICON",parent:"COMPOSER-SEND-BUTTON",layer:"token",nature:"decoration",cardinality:"one",owner:"web/icons.svg",description:"SVG hiển thị không tự là một button"},
 {id:"SEARCH-FIELD",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"ds-field",description:"Cha của input tìm và nút xóa nếu có"},
 {id:"SEARCH-INPUT",parent:"SEARCH-FIELD",layer:"primitive",nature:"content",cardinality:"one",owner:"ds-field input",description:"Một text input"},
 {id:"QUANTITY-STEPPER",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"ds-qty",description:"Cha gồm giảm, giá trị, tăng"},
 {id:"QUANTITY-VALUE",parent:"QUANTITY-STEPPER",layer:"primitive",nature:"content",cardinality:"one",owner:"ds-qty input",description:"Giá trị số"},
 {id:"DATA-TABLE",parent:"CHAT-SCREEN",layer:"composition",nature:"container",cardinality:"optional",owner:"ds-table",description:"Một bảng có nhiều cột từ schema"},
 {id:"TABLE-COLUMN",parent:"DATA-TABLE",layer:"primitive",nature:"content",cardinality:"many",owner:"COLUMN_SCHEMA",description:"Một cột có key/label/role bất biến"}
];

/** Component definitions have one canonical catalog parent. Other hosts are explicit
 * placements, not copies of a primitive, stylesheet, or second schema. */
export interface ComponentPlacement {
 id:string;host:string;child:string;cardinality:ComponentCardinality;
}
export const COMPONENT_PLACEMENTS:readonly ComponentPlacement[]=[
 {id:"message-table",host:"MESSAGE-TABLE-PART",child:"DATA-TABLE",cardinality:"one"},
 {id:"thread-search-input",host:"THREAD-SEARCH-OVERLAY",child:"SEARCH-FIELD",cardinality:"one"},
 {id:"composer-editor-input",host:"COMPOSER-EDITOR-WRAP",child:"COMPOSER-INPUT",cardinality:"one"},
 {id:"composer-surface-toolbar",host:"COMPOSER-SURFACE",child:"COMPOSER-TOOLBAR",cardinality:"one"},
 {id:"composer-surface-attachments",host:"COMPOSER-SURFACE",child:"COMPOSER-ATTACHMENTS",cardinality:"optional"},
 {id:"composer-surface-reply",host:"COMPOSER-SURFACE",child:"COMPOSER-REPLY-CONTEXT",cardinality:"optional"}
];
export function getAllowedComponentParents(id:string):string[]{
 const canonical=getComponentContract(id)?.parent;
 return [
  ...(canonical?[canonical]:[]),
  ...COMPONENT_PLACEMENTS.filter(placement=>placement.child===id).map(placement=>placement.host)
 ];
}
/** Validate placements against canonical definitions and the complete multi-parent graph. */
export function auditComponentPlacements(
 contracts:readonly ComponentContract[]=COMPONENT_CONTRACTS,
 placements:readonly ComponentPlacement[]=COMPONENT_PLACEMENTS
):string[]{
 const issues:string[]=[],ids=new Set<string>();
 const byId=new Map(contracts.map(item=>[item.id,item]));
 const edges=new Map<string,string[]>();
 for(const item of contracts){
  if(item.parent)edges.set(item.parent,[...(edges.get(item.parent)||[]),item.id]);
 }
 for(const item of placements){
  if(ids.has(item.id))issues.push("Trùng placement: "+item.id);
  ids.add(item.id);
  if(!byId.has(item.host))issues.push(item.id+" thiếu host "+item.host);
  if(!byId.has(item.child))issues.push(item.id+" thiếu child "+item.child);
  if(byId.get(item.host)?.nature!=="container")issues.push(item.id+" host không là container");
  if(item.host===item.child)issues.push(item.id+" tự lồng chính nó");
  if(byId.has(item.host)&&byId.has(item.child))
   edges.set(item.host,[...(edges.get(item.host)||[]),item.child]);
 }
 const visited=new Set<string>(),active=new Set<string>();
 const walk=(id:string):void=>{
  if(active.has(id)){issues.push("Chu trình placement: "+id);return;}
  if(visited.has(id))return;
  active.add(id);
  for(const child of edges.get(id)||[])walk(child);
  active.delete(id);visited.add(id);
 };
 for(const item of contracts)walk(item.id);
 return issues;
}
/** Audits the visible V41 message instance independently of the canonical catalog. */
export function auditMessageTree(root:Element):string[]{
 const errors:string[]=[];
 const message=root.matches('[data-ui-component="CHAT-MESSAGE"]')
  ?root:root.querySelector('[data-ui-component="CHAT-MESSAGE"]');
 if(!message)return ["CHAT-MESSAGE: thiếu tin cha"];
 const children=Array.from(message.children) as HTMLElement[];
 const direct=(id:string)=>children.filter(child=>child.dataset.uiComponent===id);
 const parts=direct("MESSAGE-CONTENT-PARTS"),actions=direct("CHAT-MESSAGE-ACTIONS");
 if(parts.length!==1)errors.push("MESSAGE-CONTENT-PARTS: phải có đúng một vùng con");
 if(actions.length>1)errors.push("CHAT-MESSAGE-ACTIONS: tối đa một vùng thao tác");
 if(!message.getAttribute("data-message-id"))errors.push("CHAT-MESSAGE: thiếu message ID");
 if(parts.length===1){
  if(parts[0].children.length===0)errors.push("MESSAGE-CONTENT-PARTS: không có nội dung");
  for(const node of Array.from(parts[0].children) as HTMLElement[]){
   const id=node.dataset.uiComponent;
   if(!["MESSAGE-TEXT-PART","MESSAGE-TABLE-PART","MESSAGE-MEDIA-PART"].includes(id||""))
    errors.push("MESSAGE-CONTENT-PARTS: part sai loại "+id);
   if(id==="MESSAGE-TABLE-PART"){
    const tables=node.querySelectorAll('table[data-ui-component="DATA-TABLE"]');
    if(tables.length!==1)errors.push("MESSAGE-TABLE-PART: dùng đúng một DATA-TABLE gốc");
    if(!getAllowedComponentParents("DATA-TABLE").includes("MESSAGE-TABLE-PART"))
     errors.push("MESSAGE-TABLE-PART: chưa đăng ký placement");
   }
   if(id==="MESSAGE-MEDIA-PART"){
    if(!node.children.length)errors.push("MESSAGE-MEDIA-PART: thiếu tile");
    for(const tile of Array.from(node.children) as HTMLElement[])
     if(tile.dataset.uiComponent!=="MESSAGE-MEDIA-TILE")
      errors.push("MESSAGE-MEDIA-PART: tile sai loại");
   }
  }
 }
 if(actions.length===1){
  const buttons=Array.from(actions[0].children) as HTMLElement[];
  for(const button of buttons){
   if(button.dataset.uiComponent!=="MESSAGE-COPY-BUTTON"||
      button.tagName!=="BUTTON"||!button.classList.contains("ui-button"))
    errors.push("MESSAGE-ACTIONS: phải dùng button primitive gốc");
  }
  if(buttons.length>1)errors.push("MESSAGE-ACTIONS: quá một nút copy mẫu");
 }
 return errors;
}

export function getComponentContract(id:string):ComponentContract|undefined{
 return COMPONENT_CONTRACTS.find(node=>node.id===id);
}
// DOM-level audit for the visible FIELD-11 composer example.
// It deliberately checks ownership and nesting, not cosmetic pixel appearance.
export function auditComposerTree(root:Element):string[]{
 const errors:string[]=[];
 const form=root.matches('form.ds-composer[data-ui-component="CHAT-COMPOSER"]')
  ?root:root.querySelector('form.ds-composer[data-ui-component="CHAT-COMPOSER"]');
 if(!form)return ["CHAT-COMPOSER: thiếu form cha dùng ds-composer"];
 const input=form.querySelector<HTMLElement>('[data-ui-component="COMPOSER-INPUT"]');
 const toolbar=form.querySelector<HTMLElement>('[data-ui-component="COMPOSER-TOOLBAR"]');
 if(!input||input.tagName!=="TEXTAREA")errors.push("COMPOSER-INPUT: phải là textarea");
 if(input&&input.parentElement!==form)errors.push("COMPOSER-INPUT: phải thuộc trực tiếp Composer");
 if(!toolbar||toolbar.parentElement!==form)errors.push("COMPOSER-TOOLBAR: phải là con trực tiếp Composer");
 if(form.querySelectorAll('[data-ui-component="COMPOSER-INPUT"]').length!==1)
  errors.push("COMPOSER-INPUT: mỗi Composer chỉ có một textarea");
 if(form.querySelectorAll('[data-ui-component="COMPOSER-TOOLBAR"]').length!==1)
  errors.push("COMPOSER-TOOLBAR: mỗi Composer chỉ có một toolbar");
 for(const [id,expectedType] of [
  ["COMPOSER-ATTACH-BUTTON","button"],
  ["COMPOSER-MIC-BUTTON","button"],
  ["COMPOSER-SEND-BUTTON","submit"]
 ] as const){
  const control=form.querySelector<HTMLButtonElement>('[data-ui-component="'+id+'"]');
  if(!control){errors.push(id+": thiếu nút");continue;}
  if(control.parentElement!==toolbar)errors.push(id+": phải là con trực tiếp Toolbar");
  if(!control.classList.contains("ui-button"))errors.push(id+": phải dùng ui-button gốc");
  if(control.type!==expectedType)errors.push(id+": sai type");
  if(!control.getAttribute("aria-label"))errors.push(id+": thiếu nhãn thao tác");
  const svg=control.querySelector("svg.ui-icon > use[href]");
  if(!svg||!svg.getAttribute("href")?.startsWith("./web/icons.svg#ui-icon-"))
   errors.push(id+": icon phải là con SVG từ web/icons.svg");
 }
 if(form.querySelectorAll("[data-ui-component='COMPOSER-SEND-BUTTON']").length!==1)
  errors.push("COMPOSER-SEND-BUTTON: không được có hai nút gửi");
 return errors;
}


/** Pure registry audit: suitable for CI and for reviewing new components. */
export function auditComponentRegistry(contracts:readonly ComponentContract[]=COMPONENT_CONTRACTS):string[]{
 const issues:string[]=[];
 const byId=new Map<string,ComponentContract>();
 for(const item of contracts){
  if(byId.has(item.id))issues.push("Trùng ID: "+item.id);
  byId.set(item.id,item);
  if(!item.owner.trim())issues.push("Thiếu owner: "+item.id);
 }
 for(const item of contracts){
  if(item.parent!==null&&!byId.has(item.parent))issues.push(item.id+" thiếu cha "+item.parent);
  const seen=new Set<string>();let cursor:ComponentContract|undefined=item;
  while(cursor){
   if(seen.has(cursor.id)){issues.push("Chu trình cha-con: "+item.id);break;}
   seen.add(cursor.id);
   cursor=cursor.parent?byId.get(cursor.parent):undefined;
  }
  if(item.layer==="token"&&item.nature==="control")
   issues.push("Token không thể tự là nút: "+item.id);
 }
 return issues;
}
/** Simple, collapsible text tree, not a second design system or dashboard. */
export function initComponentContractTree():void{
 const target=document.getElementById("componentContractTree");
 if(!target)return;
 const parentLabel:{[key:string]:string}={
  screen:"Màn hình",region:"Vùng cha",composition:"Vùng ghép",
  primitive:"Thành phần gốc",token:"Token / icon"
 };
 const quantityLabel:{[key:string]:string}={one:"1",many:"0–n",optional:"0–1"};
 const render=(parent:string|null,depth=0):HTMLUListElement=>{
  const list=document.createElement("ul");
  list.className="simple-component-tree-level";
  list.dataset.depth=String(depth);
  for(const item of COMPONENT_CONTRACTS.filter(x=>x.parent===parent)){
   const row=document.createElement("li");
   row.dataset.componentId=item.id;
   row.dataset.layer=item.layer;
   const title=document.createElement("strong");title.textContent=item.id;
   const label=document.createElement("span");label.textContent=" · "+parentLabel[item.layer]+" · "+quantityLabel[item.cardinality];
   const note=document.createElement("small");
   note.textContent=item.description+" · owner: "+item.owner;
   row.append(title,label,note);
   // Shared primitives are referenced by placement; never render a second
   // canonical DATA-TABLE definition inside the Message subtree.
   for(const use of COMPONENT_PLACEMENTS.filter(x=>x.host===item.id)){
    const ref=document.createElement("small");
    ref.textContent="↳ sử dụng "+use.child+" ("+use.cardinality+") · không nhân bản primitive";
    row.append(ref);
   }
   if(COMPONENT_CONTRACTS.some(x=>x.parent===item.id))row.append(render(item.id,depth+1));
   list.append(row);
  }
  return list;
 };
 target.replaceChildren(render(null));
}

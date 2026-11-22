// UI-V13: Shared button/action behavior for library and in-message examples.
// Download is a local TXT example; loading is a simulated transient state.
// Copy/share use browser facilities only for the static demo text; no backend or customer data.
export function initMessageActions():void {
  const areas=Array.from(document.querySelectorAll<HTMLElement>("[data-action-scope]"));
  const buttons=Array.from(document.querySelectorAll<HTMLButtonElement>("[data-action-kind]"));
  const getScope=(button:HTMLButtonElement):HTMLElement|null=>button.closest<HTMLElement>("[data-action-scope]");
  const tell=(scope:HTMLElement,message:string):void=>{
    const feedback=scope.querySelector<HTMLElement>("[data-action-feedback]");
    if(feedback)feedback.textContent=message;
  };
  const message=(scope:HTMLElement):string=>
    (scope.querySelector<HTMLElement>("[data-action-content]")?.innerText||"Nội dung mẫu 2027").trim();
  const setIcon=(button:HTMLButtonElement,name:string):void=>{
    const use=button.querySelector<SVGUseElement>(".ui-icon use");
    if(use)use.setAttribute("href","./web/icons.svg#ui-icon-"+name);
  };
  const closeMenus=():void=>{
    for(const scope of areas){
      const menu=scope.querySelector<HTMLElement>("[data-action-menu]");
      const trigger=scope.querySelector<HTMLButtonElement>('[data-action-kind="more"]');
      if(menu&&!menu.hidden)menu.hidden=true;
      if(trigger)trigger.setAttribute("aria-expanded","false");
    }
  };
  async function copySample(scope:HTMLElement):Promise<void>{
    try {
      if(!navigator.clipboard?.writeText)throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message(scope));
      tell(scope,"Đã sao chép văn bản mẫu vào bộ nhớ tạm.");
    }catch{
      tell(scope,"Trình duyệt chưa cấp quyền sao chép. Không có dữ liệu nào được gửi.");
    }
  }
  async function shareSample(scope:HTMLElement):Promise<void>{
    if(!navigator.share){
      tell(scope,"Thiết bị này không có bảng chia sẻ. Hãy dùng nút Sao chép.");
      return;
    }
    try {
      await navigator.share({title:"UI 2027 · Nội dung mẫu",text:message(scope)});
      tell(scope,"Bảng chia sẻ đã đóng. Không có thao tác gửi tự động.");
    }catch(error){
      // User cancellation is ordinary and should not claim success.
      tell(scope,(error instanceof Error&&error.name==="AbortError")?
        "Đã hủy chia sẻ.":"Không mở được bảng chia sẻ trên thiết bị này.");
    }
  }
  function downloadSample(scope:HTMLElement):void{
    // No remote resource or real bill; this is intentionally a browser-only TXT download.
    const content="UI 2027 — Văn bản mẫu\n\n"+message(scope)+"\n";
    const blob=new Blob([content],{type:"text/plain;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const anchor=document.createElement("a");
    anchor.href=url;anchor.download="2027-ui-noi-dung-mau.txt";
    document.body.append(anchor);anchor.click();anchor.remove();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
    tell(scope,"Đã yêu cầu trình duyệt tải tệp TXT mẫu (không truy cập máy chủ).");
  }
  function setReaction(button:HTMLButtonElement,scope:HTMLElement,kind:"like"|"dislike"):void{
    const pressed=button.getAttribute("aria-pressed")!=="true";
    for(const peer of Array.from(scope.querySelectorAll<HTMLButtonElement>('[data-action-kind="like"], [data-action-kind="dislike"]'))){
      peer.setAttribute("aria-pressed",String(peer===button?pressed:false));
    }
    tell(scope,pressed?(kind==="like"?"Đã chọn Thích.":"Đã chọn Không thích."):"Đã bỏ chọn đánh giá.");
  }
  function toggleSpeech(button:HTMLButtonElement,scope:HTMLElement):void{
    const next=button.getAttribute("aria-pressed")!=="true";
    button.setAttribute("aria-pressed",String(next));
    tell(scope,next?"Đang minh họa trạng thái đọc nội dung; không phát âm thanh.":"Đã tắt trạng thái đọc nội dung.");
  }
  function simulateLoad(button:HTMLButtonElement,scope:HTMLElement):void{
    if(button.dataset.actionState==="loading")return;
    button.dataset.actionState="loading";
    button.disabled=true;
    button.setAttribute("aria-busy","true");
    setIcon(button,"loader");
    button.querySelector(".ui-icon")?.classList.add("ui-icon--loading");
    const label=button.querySelector<HTMLElement>(".ui-action-label");
    if(label)label.textContent="Đang tải…";
    tell(scope,"Đang mô phỏng loading, không gọi API hay tải mạng.");
    window.setTimeout(()=>{
      button.disabled=false;button.dataset.actionState="success";
      button.removeAttribute("aria-busy");
      button.querySelector(".ui-icon")?.classList.remove("ui-icon--loading");
      setIcon(button,"check");
      if(label)label.textContent="Hoàn tất";
      tell(scope,"Đã hoàn tất trạng thái loading mẫu. Bấm lại để xem vòng quay.");
    },900);
  }
  for(const button of buttons){
    button.addEventListener("click",()=>{
      const scope=getScope(button);if(!scope)return;
      const kind=button.dataset.actionKind;
      if(kind!=="more")closeMenus();
      if(kind==="copy"){void copySample(scope);return;}
      if(kind==="share"){void shareSample(scope);return;}
      if(kind==="download"){downloadSample(scope);return;}
      if(kind==="like"||kind==="dislike"){setReaction(button,scope,kind);return;}
      if(kind==="speak"){toggleSpeech(button,scope);return;}
      if(kind==="load"){simulateLoad(button,scope);return;}
      if(kind==="more"){
        const menu=scope.querySelector<HTMLElement>("[data-action-menu]");
        if(!menu)return;
        const opening=menu.hidden;closeMenus();menu.hidden=!opening;
        button.setAttribute("aria-expanded",String(opening));
        if(opening)menu.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();
        tell(scope,opening?"Đã mở menu thao tác bổ sung.":"Đã đóng menu.");
      }
    });
  }
  document.addEventListener("click",event=>{
    if(!(event.target instanceof Element))return;
    if(!event.target.closest("[data-action-menu], [data-action-kind='more']"))closeMenus();
  });
  document.addEventListener("keydown",event=>{
    if(event.key==="Escape")closeMenus();
  });
}

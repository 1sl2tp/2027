// UI 2027 V11 — independent, local-only chat composer samples.
// The file picker only creates temporary object URLs inside this browser tab.
// No backend, no microphone permission, and no outgoing messages.
export function initComposerGallery():void {
  const cards=Array.from(document.querySelectorAll<HTMLElement>("[data-composer-sample]"));
  const imageUrls=new Set<string>();
  const maxFileSize=10*1024*1024;
  const create=<T extends keyof HTMLElementTagNameMap>(tag:T):HTMLElementTagNameMap[T]=>document.createElement(tag);
  for(const card of cards){
    const kind=card.dataset.composerSample||"compact";
    const text=card.querySelector<HTMLTextAreaElement>("[data-composer-text]");
    const form=card.querySelector<HTMLFormElement>("[data-composer-form]");
    const filePicker=card.querySelector<HTMLInputElement>("[data-composer-file]");
    const previews=card.querySelector<HTMLElement>("[data-composer-previews]");
    const add=card.querySelector<HTMLButtonElement>("[data-composer-add]");
    const mic=card.querySelector<HTMLButtonElement>("[data-composer-mic]");
    const mode=card.querySelector<HTMLButtonElement>("[data-composer-mode]");
    const send=card.querySelector<HTMLButtonElement>("[data-composer-send]");
    const sendSymbol=card.querySelector<HTMLElement>("[data-composer-send-symbol]");
    const status=card.querySelector<HTMLElement>("[data-composer-status]");
    const log=card.querySelector<HTMLElement>("[data-composer-log]");
    if(!text||!form||!filePicker||!previews||!add||!mic||!mode||!send||!sendSymbol||!status||!log)continue;
    let sending=false;
    const maximum=kind==="single"?1:4;
    const countImages=()=>previews.querySelectorAll(".composer-preview").length;
    const report=(message:string):void=>{status.textContent=message;};
    const refresh=():void=>{
      previews.hidden=countImages()===0;
      sendSymbol.textContent=text.value.trim()||countImages()?"↑":"≋";
      send.setAttribute("aria-label",text.value.trim()||countImages()?"Mô phỏng gửi nội dung":"Thử chế độ giọng nói");
      send.title=text.value.trim()||countImages()?"Mô phỏng gửi nội dung":"Giọng nói mẫu (không thu âm)";
      const lineHeight=24;
      const minHeight=kind==="compact"?42:kind==="sending"?63:58;
      text.style.height="auto";
      text.style.height=Math.max(minHeight,Math.min(text.scrollHeight,132))+"px";
      text.style.overflowY=text.scrollHeight>132+lineHeight?"auto":"hidden";
    };
    const releasePreview=(element:Element):void=>{
      const url=(element as HTMLElement).dataset.objectUrl;
      if(url){URL.revokeObjectURL(url);imageUrls.delete(url);}
      element.remove();
    };
    previews.addEventListener("click",event=>{
      const button=(event.target as HTMLElement).closest<HTMLButtonElement>("button[data-composer-remove-demo], button[data-composer-remove-file]");
      if(!button)return;
      const cardElement=button.closest(".composer-preview");
      if(cardElement)releasePreview(cardElement);
      refresh();
      report("Đã xóa ảnh xem trước. Không ảnh hưởng file trên thiết bị.");
    });
    add.addEventListener("click",()=>filePicker.click());
    filePicker.addEventListener("change",()=>{
      const selected=Array.from(filePicker.files||[]);
      filePicker.value="";
      if(selected.length===0)return;
      const acceptable=selected.filter(file=>file.type.startsWith("image/")&&file.size<=maxFileSize);
      const rejected=selected.length-acceptable.length;
      if(kind==="single"){
        for(const child of Array.from(previews.querySelectorAll(".composer-preview")))releasePreview(child);
      }else{
        // Demo placeholders are replaced when the user chooses their own photos.
        for(const child of Array.from(previews.querySelectorAll("[data-composer-demo-preview]")))releasePreview(child);
      }
      const capacity=Math.max(0,maximum-countImages());
      const picked=acceptable.slice(0,capacity);
      for(const file of picked){
        const url=URL.createObjectURL(file);
        imageUrls.add(url);
        const tile=create("div");tile.className="composer-preview";tile.dataset.objectUrl=url;
        const visual=create("div");visual.className="composer-preview-art";
        const picture=create("img");picture.src=url;picture.alt="Ảnh vừa chọn: "+file.name;
        const label=create("small");label.textContent=file.name;
        const remove=create("button");remove.type="button";remove.dataset.composerRemoveFile="true";
        remove.setAttribute("aria-label","Xóa ảnh "+file.name);remove.textContent="×";
        visual.append(picture);tile.append(visual,label,remove);previews.append(tile);
      }
      refresh();
      const limits=acceptable.length-picked.length;
      report("Đã chọn "+picked.length+" ảnh trong trình duyệt."+
        (limits?" Đã bỏ "+limits+" ảnh vượt giới hạn "+maximum+".":"")+
        (rejected?" "+rejected+" file không phù hợp (chỉ ảnh tối đa 10 MB).":"")+
        " Không tải lên máy chủ.");
    });
    text.addEventListener("input",refresh);
    mode.addEventListener("click",()=>{
      const high=mode.textContent?.includes("Cao")??false;
      mode.replaceChildren(document.createTextNode(high?"Nhanh ":"Cao "));
      const chevron=create("span");chevron.textContent="⌄";chevron.setAttribute("aria-hidden","true");mode.append(chevron);
      report("Chỉ đổi nhãn chế độ để kiểm tra giao diện; không thay đổi mô hình AI.");
    });
    mic.addEventListener("click",()=>{
      const on=mic.getAttribute("aria-pressed")!=="true";
      mic.setAttribute("aria-pressed",String(on));
      mic.setAttribute("aria-label",on?"Tắt trạng thái ghi âm mẫu":"Thử trạng thái ghi âm");
      report(on?"Đang mô phỏng trạng thái ghi âm. Không truy cập micro.":"Đã tắt trạng thái ghi âm mẫu.");
    });
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(sending)return;
      const message=text.value.trim();
      const attached=countImages();
      if(!message&&!attached){
        const on=mic.getAttribute("aria-pressed")!=="true";
        mic.setAttribute("aria-pressed",String(on));
        report(on?"Đang hiển thị chế độ giọng nói mẫu. Không thu âm.":"Đã tắt chế độ giọng nói mẫu.");
        return;
      }
      sending=true;
      send.dataset.composerBusy="true";
      send.disabled=true;
      report("Đang mô phỏng gửi "+(attached?attached+" ảnh":"nội dung")+". Không kết nối mạng.");
      window.setTimeout(()=>{
        const entry=create("p");
        entry.textContent="Đã thử: "+(message?message.slice(0,110):"Không có chữ")+
          (attached?" · "+attached+" ảnh":"")+" — chỉ trên bản mẫu.";
        log.prepend(entry);log.hidden=false;
        while(log.childElementCount>2)log.lastElementChild?.remove();
        text.value="";
        mic.setAttribute("aria-pressed","false");
        sending=false;send.dataset.composerBusy="false";send.disabled=false;
        refresh();
        report("Đã mô phỏng xong, không gửi tin nhắn hoặc ảnh thật.");
      },650);
    });
    refresh();
  }
  window.addEventListener("pagehide",()=>{
    for(const url of imageUrls)URL.revokeObjectURL(url);
    imageUrls.clear();
  });
}

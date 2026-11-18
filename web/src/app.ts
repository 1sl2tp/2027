// 2027-UI-V01 — DOM-only chat shell. No remote endpoint, authentication or message sending.
type Area = "chat" | "work";
function find<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing UI node: ${id}`);
  return node as T;
}
const app = find<HTMLDivElement>("app");
const scrim = find<HTMLDivElement>("scrim");
const sidebar = find<HTMLElement>("sidebar");
const menu = find<HTMLButtonElement>("openMenu");
const closeMenu = find<HTMLButtonElement>("closeMenu");
const tabChat = find<HTMLButtonElement>("tabChat");
const tabWork = find<HTMLButtonElement>("tabWork");
const chatPanel = find<HTMLElement>("chatPanel");
const workPanel = find<HTMLElement>("workPanel");
const composerDock = find<HTMLElement>("composerDock");
const input = find<HTMLTextAreaElement>("messageInput");
const form = find<HTMLFormElement>("composerForm");
const send = find<HTMLButtonElement>("sendButton");
const toast = find<HTMLDivElement>("toast");
const search = find<HTMLDialogElement>("searchDialog");
let toastTimer: number | undefined;
let activeArea: Area = "chat";

function setMenu(open: boolean): void {
  app.classList.toggle("menu-open", open);
  scrim.hidden = !open;
  menu.setAttribute("aria-expanded", String(open));
  if (open) closeMenu.focus();
}
function selectArea(area: Area): void {
  activeArea = area;
  const chat = area === "chat";
  tabChat.classList.toggle("is-active", chat);
  tabWork.classList.toggle("is-active", !chat);
  tabChat.setAttribute("aria-selected", String(chat));
  tabWork.setAttribute("aria-selected", String(!chat));
  chatPanel.hidden = !chat;
  workPanel.hidden = chat;
  composerDock.hidden = !chat;
  find<HTMLButtonElement>("sidebarChat").classList.toggle("is-active", chat);
  find<HTMLButtonElement>("sidebarWork").classList.toggle("is-active", !chat);
  find<HTMLButtonElement>("sidebarChat").setAttribute("aria-current", chat ? "page" : "false");
  find<HTMLButtonElement>("sidebarWork").setAttribute("aria-current", chat ? "false" : "page");
  setMenu(false);
}
function showToast(message: string): void {
  if (toastTimer !== undefined) window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3600);
}
function resizeComposer(): void {
  input.style.height = "0px";
  input.style.height = `${Math.max(44, Math.min(160, input.scrollHeight))}px`;
  send.disabled = !input.value.trim();
}
function syncViewport(): void {
  const vv = window.visualViewport;
  const height = vv?.height ?? window.innerHeight;
  const top = vv?.offsetTop ?? 0;
  document.documentElement.style.setProperty("--app-height", `${height}px`);
  document.documentElement.style.setProperty("--app-top", `${top}px`);
}
let viewportFrame = 0;
function scheduleViewport(): void {
  if (viewportFrame) return;
  viewportFrame = requestAnimationFrame(() => {
    viewportFrame = 0;
    syncViewport();
  });
}

menu.addEventListener("click", () => setMenu(!app.classList.contains("menu-open")));
closeMenu.addEventListener("click", () => setMenu(false));
scrim.addEventListener("click", () => setMenu(false));
tabChat.addEventListener("click", () => selectArea("chat"));
tabWork.addEventListener("click", () => selectArea("work"));
find<HTMLButtonElement>("sidebarChat").addEventListener("click", () => selectArea("chat"));
find<HTMLButtonElement>("sidebarWork").addEventListener("click", () => selectArea("work"));
find<HTMLButtonElement>("newChat").addEventListener("click", () => {
  input.value = "";
  resizeComposer();
  selectArea("chat");
  showToast("Đã làm trống bản nháp trên thiết bị. Chưa kết nối gửi tin.");
  input.focus();
});
find<HTMLButtonElement>("themeButton").addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme === "dark";
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  find<HTMLMetaElement>("theme-color").content = dark ? "#ffffff" : "#161616";
});
find<HTMLButtonElement>("searchButton").addEventListener("click", () => {
  search.showModal();
  find<HTMLInputElement>("searchInput").focus();
});
find<HTMLButtonElement>("closeSearch").addEventListener("click", () => search.close());
input.addEventListener("input", resizeComposer);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!input.value.trim() || activeArea !== "chat") return;
  showToast("Đây là bản dựng khung: tin nhắn chưa được gửi.");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
window.addEventListener("resize", scheduleViewport, {passive:true});
window.visualViewport?.addEventListener("resize", scheduleViewport, {passive:true});
window.visualViewport?.addEventListener("scroll", scheduleViewport, {passive:true});
syncViewport();
resizeComposer();

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
const read = (file) => readFileSync(new URL("../"+file, import.meta.url),"utf8");
test("only RULES.md is normative", () => {
  const root = readdirSync(new URL("../",import.meta.url));
  assert.equal(root.filter(f=>/^(rules|agents)(-.+)?\.md$/i.test(f)).length,1);
  assert.match(read("RULES.md"), /RULE 02/);
});
test("chat shell has real semantic regions and no fake conversation", () => {
  const html=read("index.html");
  for(const id of ["chatPanel","workPanel","composerDock","messageInput","sendButton","tabChat","tabWork","sidebar"])
    assert.match(html,new RegExp('id="'+id+'"'));
  assert.doesNotMatch(html,/onclick=|https?:\/\/|<script[^>]+src="https?:/);
});
test("CSS has one token owner and keyboard-bounded main", () => {
  const css=read("web/styles.css");
  for(const part of ["--app-height","--composer-radius","--header","--hit","--column","safe-area-inset-bottom","@media(max-width:760px)"])
    assert.ok(css.includes(part),part);
});
test("native Compose scaffolding uses same fixed layout intentions", () => {
  const kotlin=read("android/app/src/main/java/app/twentytwentyseven/chat/MainActivity.kt");
  for(const part of ["imePadding()","navigationBarsPadding()","ChatShell","ChatComposer","56.dp","Color(0xFF171717)"])
    assert.ok(kotlin.includes(part),part);
});

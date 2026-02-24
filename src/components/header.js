import { siteData } from "../data/siteData.js";
import { getLang, setLang, t } from "../lib/i18n.js";
import { assetUrl } from "../lib/assetUrl.js";

export function renderHeader() {
  const header = document.createElement("header");
  header.className = "site-header";

  const wrap = document.createElement("div");
  wrap.className = "site-header__wrap";

  // Left: language
  const langBox = document.createElement("div");
  langBox.className = "site-header__left";

  const uaBtn = document.createElement("button");
  uaBtn.type = "button";
  uaBtn.className = "linklike";
  uaBtn.textContent = "UA";
  uaBtn.addEventListener("click", () => setLang("ua"));

  const enBtn = document.createElement("button");
  enBtn.type = "button";
  enBtn.className = "linklike";
  enBtn.textContent = "ENG";
  enBtn.addEventListener("click", () => setLang("en"));

  langBox.append(uaBtn, document.createTextNode("\u00A0\u00A0"), enBtn);

  // Center: title -> home
  const title = document.createElement("a");
  title.href = assetUrl("");
  title.className = "site-title";
  title.textContent = t(siteData.title);

  // Right: nav
  const nav = document.createElement("nav");
  nav.className = "site-header__right";
  nav.setAttribute("aria-label", "Primary");

  const about = document.createElement("a");
  about.className = "linklike";
  about.href = assetUrl("about/");
  about.textContent = t(siteData.nav.about);

  const contacts = document.createElement("a");
  contacts.className = "linklike";
  contacts.href = assetUrl("contacts/");
  contacts.textContent = t(siteData.nav.contacts);

  nav.append(about, document.createTextNode("\u00A0\u00A0"), contacts);

  wrap.append(langBox, title, nav);
  header.append(wrap);

  // paint active state once per render
  const current = getLang();
  uaBtn.setAttribute("aria-pressed", current === "ua" ? "true" : "false");
  enBtn.setAttribute("aria-pressed", current === "en" ? "true" : "false");
  uaBtn.classList.toggle("is-active", current === "ua");
  enBtn.classList.toggle("is-active", current === "en");

  return header;
}

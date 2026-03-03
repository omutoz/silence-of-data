import { siteData } from "../data/siteData.js";
import { t } from "../lib/i18n.js";

export function renderAbout() {
  const main = document.createElement("main");
  main.className = "page page--about";

  const wrap = document.createElement("section");
  // Keep class for typography, but override grid layout inline (text-only)
  wrap.className = "about";
  wrap.style.display = "block";
  wrap.style.maxWidth = "820px";
  wrap.style.margin = "0 auto";

  const text = document.createElement("div");
  text.className = "about__text";
  text.textContent = t(siteData.about.text);

  wrap.append(text);
  main.append(wrap);
  return main;
}

import { siteData } from "../data/siteData.js";
import { t } from "../lib/i18n.js";
import { assetUrl } from "../lib/assetUrl.js";

export function renderAbout() {
  const main = document.createElement("main");
  main.className = "page page--about";

  const wrap = document.createElement("section");
  wrap.className = "about";

  const img = document.createElement("img");
  img.className = "about__img";
  img.alt = "Portrait";
  img.src = assetUrl(siteData.about.portrait);
  img.onerror = () => {
    img.onerror = null;
    img.src = assetUrl("images/_placeholder.svg");
  };

  const text = document.createElement("div");
  text.className = "about__text";
  text.textContent = t(siteData.about.text);

  wrap.append(img, text);
  main.append(wrap);
  return main;
}

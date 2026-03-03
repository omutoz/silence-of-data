import { siteData } from "../data/siteData.js";
import { t } from "../lib/i18n.js";
import { assetUrl } from "../lib/assetUrl.js";
import { smoothScrollTo } from "../lib/scroll.js";

export function renderHome({ lightbox }) {
  const main = document.createElement("main");
  main.className = "page page--home";

  const intro = document.createElement("section");
  intro.className = "home-intro";

  const p = document.createElement("p");
  p.className = "home-intro__text";
  p.textContent = t(siteData.home.intro);

  const hint = document.createElement("button");
  hint.type = "button";
  hint.className = "home-intro__hint";
  hint.innerHTML = `<div class="home-intro__hintText"></div><div class="home-intro__arrow">↓</div>`;
  hint.querySelector(".home-intro__hintText").textContent = t(siteData.home.scrollHint);

  intro.append(p, hint);

  const works = document.createElement("section");
  works.className = "home-works";
  works.id = "works";

  const grid = document.createElement("div");
  grid.className = "home-works__grid";

  siteData.works.forEach((w) => {
    const a = document.createElement("a");
    a.className = "thumb";
    a.href = assetUrl(`work/${w.id}/`);

    const fig = document.createElement("figure");
    fig.className = "thumb__figure";

    const img = document.createElement("img");
    img.className = "thumb__img";
    img.loading = "lazy";
    img.alt = `Work ${w.label}`;
    img.src = assetUrl(w.thumb);
    img.onerror = () => {
      img.onerror = null;
      img.src = assetUrl("images/_placeholder.svg");
    };

    const cap = document.createElement("figcaption");
    cap.className = "thumb__cap linklike";
    cap.textContent = w.label;

    fig.append(img, cap);
    a.append(fig);
    grid.append(a);
  });

  works.append(grid);

  hint.addEventListener("click", () => smoothScrollTo(works));

  main.append(intro, works);

  // Support block (text + logos)
  if (siteData.home.supportText && Array.isArray(siteData.home.supportLogos) && siteData.home.supportLogos.length) {
    const support = document.createElement("section");
    support.className = "home-support";

    const supportText = document.createElement("p");
    supportText.className = "home-support__text";
    supportText.textContent = t(siteData.home.supportText);

    const logos = document.createElement("div");
    logos.className = "home-support__logos";

    siteData.home.supportLogos.forEach((l) => {
      const img = document.createElement("img");
      const alt = (l.alt || "").toLowerCase();
      let cls = "home-support__logo";
      if (alt.includes("ribbon")) cls += " home-support__logo--ribbon";
      if (alt.includes("jam") || alt.includes("factory") || alt.includes("jfac")) cls += " home-support__logo--jfac";

      img.className = cls;
      img.alt = l.alt || "";
      img.loading = "lazy";
      img.src = assetUrl(l.src);

      logos.append(img);
    });

    support.append(supportText, logos);
    main.append(support);
  }

  return main;
}

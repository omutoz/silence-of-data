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
  hint.innerHTML = `<div class="home-intro__arrow">↓</div><div class="home-intro__hintText"></div>`;

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
  return main;
}

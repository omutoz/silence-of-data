import { siteData } from "../data/siteData.js";
import { assetUrl } from "../lib/assetUrl.js";

export function renderWork({ workId, lightbox }) {
  const work = siteData.works.find((w) => w.id === String(workId));
  if (!work) {
    const main = document.createElement("main");
    main.className = "page";
    main.innerHTML = `<p style="padding:24px">Work not found.</p>`;
    return main;
  }

  const main = document.createElement("main");
  main.className = "page page--work";

  const head = document.createElement("div");
  head.className = "work-head";

  const label = document.createElement("div");
  label.className = "work-head__label linklike";
  label.textContent = work.label;

  head.append(label);

  const grid = document.createElement("section");
  grid.className = `work-grid work-grid--${work.id}`;
  grid.setAttribute("aria-label", `Gallery ${work.label}`);

  work.images.forEach((src, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "work-item";
    btn.setAttribute("aria-label", `Open image ${idx + 1}`);

    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = `${work.label} image ${idx + 1}`;
    img.src = assetUrl(src);
    img.onerror = () => {
      img.onerror = null;
      img.src = assetUrl("images/_placeholder.svg");
    };

    btn.append(img);

    btn.addEventListener("click", () => {
      lightbox.open({ list: work.images, startIndex: idx });
    });

    grid.append(btn);
  });

  main.append(head, grid);
  return main;
}

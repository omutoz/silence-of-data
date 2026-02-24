import { assetUrl } from "../lib/assetUrl.js";

export function createLightbox() {
  const root = document.createElement("div");
  root.className = "viewer";
  root.setAttribute("aria-hidden", "true");

  root.innerHTML = `
    <div class="viewer__inner" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button class="viewer__close" type="button" aria-label="Close viewer"></button>

      <button class="viewer__nav viewer__nav--prev" type="button" aria-label="Previous image">
        <span aria-hidden="true">←</span>
      </button>

      <button class="viewer__nav viewer__nav--next" type="button" aria-label="Next image">
        <span aria-hidden="true">→</span>
      </button>

      <figure class="viewer__figure">
        <img class="viewer__img" alt="" />
      </figure>
    </div>
  `;

  const img = root.querySelector(".viewer__img");
  const closeBtn = root.querySelector(".viewer__close");
  const nextBtn = root.querySelector(".viewer__nav--next");
  const prevBtn = root.querySelector(".viewer__nav--prev");

  let images = [];
  let index = 0;

  function setImg(i) {
    if (!images.length) return;
    index = (i + images.length) % images.length;
    const src = assetUrl(images[index]);

    img.src = src;
    img.alt = `Image ${index + 1} of ${images.length}`;

    img.onerror = () => {
      img.onerror = null;
      img.src = assetUrl("images/_placeholder.svg");
    };
  }

  function open({ list, startIndex = 0 }) {
    images = Array.isArray(list) ? list : [];
    if (!images.length) return;

    document.documentElement.classList.add("is-locked");
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    setImg(startIndex);

    closeBtn.focus({ preventScroll: true });

    window.addEventListener("keydown", onKeyDown, { passive: false });
  }

  function close() {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("is-locked");
    window.removeEventListener("keydown", onKeyDown);
  }

  function next() {
    setImg(index + 1);
  }

  function prev() {
    setImg(index - 1);
  }

  function onKeyDown(e) {
    if (!root.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
      return;
    }
  }

  root.addEventListener("click", (e) => {
    if (e.target === root) close();
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  return { root, open, close };
}

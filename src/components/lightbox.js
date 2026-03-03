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

  const figure = root.querySelector(".viewer__figure");
  const img = root.querySelector(".viewer__img");
  const closeBtn = root.querySelector(".viewer__close");
  const nextBtn = root.querySelector(".viewer__nav--next");
  const prevBtn = root.querySelector(".viewer__nav--prev");

  let images = [];
  let index = 0;

  // swipe state
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let lastY = 0;
  let tracking = false;
  let suppressClickUntil = 0;

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

  // close on backdrop
  root.addEventListener("click", (e) => {
    if (e.target === root) close();
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // Tap navigation (mobile-friendly):
  // - tap left half => prev
  // - tap right half => next
  figure.addEventListener("click", (e) => {
    if (!root.classList.contains("is-open")) return;
    if (Date.now() < suppressClickUntil) return;
    // Ignore clicks on controls
    if (e.target.closest(".viewer__close") || e.target.closest(".viewer__nav")) return;

    const rect = figure.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.5) prev();
    else next();
  });

  // Swipe navigation (touch)
  figure.addEventListener(
    "touchstart",
    (e) => {
      if (!root.classList.contains("is-open")) return;
      if (e.touches.length !== 1) return;

      tracking = true;
      startX = lastX = e.touches[0].clientX;
      startY = lastY = e.touches[0].clientY;
    },
    { passive: true }
  );

  figure.addEventListener(
    "touchmove",
    (e) => {
      if (!tracking) return;
      if (e.touches.length !== 1) return;

      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;

      const dx = lastX - startX;
      const dy = lastY - startY;

      // If the gesture is mostly horizontal, prevent page scrolling
      if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  figure.addEventListener(
    "touchend",
    () => {
      if (!tracking) return;
      tracking = false;

      const dx = lastX - startX;
      const dy = lastY - startY;

      // horizontal swipe threshold
      const SWIPE_PX = 48;
      if (Math.abs(dx) >= SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
        suppressClickUntil = Date.now() + 400;
        if (dx < 0) next();
        else prev();
      }
    },
    { passive: true }
  );

  return { root, open, close };
}

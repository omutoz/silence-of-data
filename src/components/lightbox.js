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
  const figure = root.querySelector(".viewer__figure");
  const closeBtn = root.querySelector(".viewer__close");
  const nextBtn = root.querySelector(".viewer__nav--next");
  const prevBtn = root.querySelector(".viewer__nav--prev");

  let images = [];
  let index = 0;

  // mobile behaviors
  let isMobile = false;
  let isPanMode = false; // only for work #1 on mobile

  // tap/swipe state
  let startX = 0;
  let startY = 0;
  let pointerDown = false;
  let didMove = false;

  // pan state
  let panStartX = 0;
  let panStartOffset = 0;
  let panOffset = 0;
  let panMax = 0;

  img.draggable = false;

  function detectMobile() {
    isMobile =
      window.matchMedia?.("(pointer: coarse)").matches ||
      window.innerWidth <= 900;
  }

  function isWork1List(list) {
    const first = list?.[0] || "";
    return first.includes("images/works/1/");
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function resetPan() {
    panOffset = 0;
    img.style.transform = "translateX(0px)";
    panMax = 0;

    // after image is rendered, compute bounds
    requestAnimationFrame(() => {
      const figRect = figure.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      const diff = imgRect.width - figRect.width;
      panMax = diff > 0 ? diff / 2 : 0;
    });
  }

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

    if (isPanMode) resetPan();
  }

  function open({ list, startIndex = 0 }) {
    images = Array.isArray(list) ? list : [];
    if (!images.length) return;

    detectMobile();
    isPanMode = isMobile && isWork1List(images);
    root.classList.toggle("is-pan", isPanMode);

    document.documentElement.classList.add("is-locked");
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");

    setImg(startIndex);

    closeBtn.focus({ preventScroll: true });
    window.addEventListener("keydown", onKeyDown, { passive: false });

    // Make sure mobile mode is correct on rotate/resize
    window.addEventListener("resize", onResize, { passive: true });
  }

  function close() {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("is-locked");
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("resize", onResize);
  }

  function next() {
    setImg(index + 1);
  }

  function prev() {
    setImg(index - 1);
  }

  function onResize() {
    const prevPan = isPanMode;
    detectMobile();
    isPanMode = isMobile && isWork1List(images);
    root.classList.toggle("is-pan", isPanMode);

    // if pan mode toggled on, recalc bounds
    if (isPanMode && !prevPan) resetPan();
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

  // Click outside closes
  root.addEventListener("click", (e) => {
    if (e.target === root) close();
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // Mobile: tap-left/tap-right navigation (works everywhere)
  // Mobile: swipe navigation (works for galleries except Work #1)
  // Work #1 on mobile: drag pans image horizontally instead of swipe navigation.
  figure.addEventListener("pointerdown", (e) => {
    if (!root.classList.contains("is-open")) return;

    pointerDown = true;
    didMove = false;
    startX = e.clientX;
    startY = e.clientY;

    if (isPanMode) {
      panStartX = e.clientX;
      panStartOffset = panOffset;
    }

    figure.setPointerCapture?.(e.pointerId);
  });

  figure.addEventListener("pointermove", (e) => {
    if (!pointerDown) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) didMove = true;

    if (isPanMode) {
      // pan image horizontally
      const panDx = e.clientX - panStartX;
      const nextOffset = clamp(panStartOffset + panDx, -panMax, panMax);
      panOffset = nextOffset;
      img.style.transform = `translateX(${panOffset}px)`;
      return;
    }

    // Not pan mode: treat horizontal swipe as navigation (only on mobile)
    if (!isMobile) return;

    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      pointerDown = false;
      if (dx < 0) next();
      else prev();
    }
  });

  figure.addEventListener("pointerup", (e) => {
    if (!pointerDown) return;
    pointerDown = false;

    // tap navigation (only on mobile). If user dragged in pan mode, do nothing.
    if (!isMobile) return;

    // If it was a drag pan, ignore tap.
    if (didMove && isPanMode) return;

    // If it was a swipe nav, ignore tap.
    if (didMove && !isPanMode) return;

    const rect = figure.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRight = x > rect.width / 2;

    if (isRight) next();
    else prev();
  });

  figure.addEventListener("pointercancel", () => {
    pointerDown = false;
  });

  return { root, open, close };
}

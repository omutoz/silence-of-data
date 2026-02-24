export function assetUrl(path) {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  const clean = String(path || "").replace(/^\//, "");
  return base + clean;
}

export function safeImgSrc(path, fallback = "images/_placeholder.svg") {
  return assetUrl(path || fallback);
}

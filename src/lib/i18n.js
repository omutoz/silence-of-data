const KEY = "silence_of_data_lang";

const listeners = new Set();

export function getLang() {
  const stored = localStorage.getItem(KEY);
  return stored === "en" ? "en" : "ua";
}

export function setLang(next) {
  const lang = next === "en" ? "en" : "ua";
  localStorage.setItem(KEY, lang);
  listeners.forEach((fn) => fn(lang));
}

export function subscribeLang(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function t(objOrString) {
  if (typeof objOrString === "string") return objOrString;
  if (!objOrString || typeof objOrString !== "object") return "";
  const lang = getLang();
  return objOrString[lang] ?? objOrString.ua ?? "";
}

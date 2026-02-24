import "./styles.css";

import { renderHeader } from "./components/header.js";
import { createLightbox } from "./components/lightbox.js";

import { renderHome } from "./pages/home.js";
import { renderWork } from "./pages/work.js";
import { renderAbout } from "./pages/about.js";
import { renderContacts } from "./pages/contacts.js";

import { subscribeLang } from "./lib/i18n.js";

let langSubInited = false;

function mount() {
  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = "";

  const lightbox = createLightbox();
  const header = renderHeader();

  const page = document.body.dataset.page;

  let main = null;

  if (page === "home") {
    main = renderHome({ lightbox });
  } else if (page === "work") {
    const workId = document.body.dataset.work;
    main = renderWork({ workId, lightbox });
  } else if (page === "about") {
    main = renderAbout();
  } else if (page === "contacts") {
    main = renderContacts();
  } else {
    main = document.createElement("main");
    main.className = "page";
    main.textContent = "Page not found.";
  }

  app.append(header, main, lightbox.root);

  // subscribe ONCE: rerender whole page on language change
  if (!langSubInited) {
    langSubInited = true;
    subscribeLang(() => mount());
  }
}

mount();

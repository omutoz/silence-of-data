import { siteData } from "../data/siteData.js";

export function renderContacts() {
  const main = document.createElement("main");
  main.className = "page page--contacts";

  const box = document.createElement("section");
  box.className = "contacts";

  // Name (line 1)
  const name = document.createElement("p");
  name.className = "contacts__line";
  name.textContent = "Nadja Kelm";

  // Location (line 2)
  const location = document.createElement("p");
  location.className = "contacts__line";
  location.textContent = "Kyiv, Ukraine";

  // Email (line 3, clickable)
  const email = document.createElement("a");
  email.className = "linklike contacts__link";
  email.href = "mailto:nadja.kelm@gmail.com";
  email.textContent = "nadja.kelm@gmail.com";

  // Spacer
  const spacer = document.createElement("div");
  spacer.style.height = "20px";

  // Links list
  const list = document.createElement("ul");
  list.className = "contacts__list";

  const links = [
    { label: "Texty.org.ua", href: "https://texty.org.ua/author/nadja-kelm/" },
    { label: "Behance", href: "https://www.behance.net/zhukkelm" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nadja-kelm-1922772a1/" }
  ];

  for (const item of links) {
    const li = document.createElement("li");
    li.className = "contacts__item";

    const a = document.createElement("a");
    a.className = "linklike contacts__link";
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = item.label;

    li.append(a);
    list.append(li);
  }

  box.append(name, location, email, spacer, list);
  main.append(box);
  return main;
}

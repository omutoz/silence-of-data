import { siteData } from "../data/siteData.js";

export function renderContacts() {
  const main = document.createElement("main");
  main.className = "page page--contacts";

  const box = document.createElement("section");
  box.className = "contacts";

  const line = document.createElement("p");
  line.className = "contacts__line";
  line.textContent = siteData.contacts.nameLine;

  const email = document.createElement("a");
  email.className = "linklike contacts__link";
  email.href = `mailto:${siteData.contacts.email}`;
  email.textContent = siteData.contacts.email;

  const linkedin = document.createElement("a");
  linkedin.className = "linklike contacts__link";
  linkedin.href = siteData.contacts.linkedin;
  linkedin.target = "_blank";
  linkedin.rel = "noreferrer";
  linkedin.textContent = "LinkedIn";

  box.append(line, email, linkedin);
  main.append(box);
  return main;
}

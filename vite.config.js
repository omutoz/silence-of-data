import { defineConfig } from "vite";
import { resolve } from "path";

// For GitHub Pages project sites, the site is served from /<repo>/
// We set BASE_PATH in GitHub Actions to `/<repo>/`.
// Locally and in other hosts, it falls back to relative `./`.
const base = process.env.BASE_PATH ?? "./";

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        contacts: resolve(__dirname, "contacts/index.html"),
        work1: resolve(__dirname, "work/1/index.html"),
        work2: resolve(__dirname, "work/2/index.html"),
        work3: resolve(__dirname, "work/3/index.html")
      }
    }
  }
});

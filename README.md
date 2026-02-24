# Silence of Data — Vite static site (GitHub Pages)

## 1) Install
```bash
npm i
```

## 2) Run locally
```bash
npm run dev
```

## 3) Build
```bash
npm run build
npm run preview
```

## 4) Deploy to GitHub Pages
Option A (simple): run
```bash
npm run deploy
```
This publishes `dist/` using the `gh-pages` package.

---

## Images / where to put your assets

Put ALL your images into:
`public/images/`

Recommended structure:
- `public/images/Thumbnail_№1.jpg`
- `public/images/Thumbnail_№2.jpg`
- `public/images/Thumbnail_№3.jpg`

- `public/images/works/1/№1_01.jpg` ... `№1_09.jpg`
- `public/images/works/2/№2_01.jpg` ... `№2_04.jpg`
- `public/images/works/3/№3_01.jpg` ... `№3_06.jpg`

- `public/images/nadja_kelm.jpg` (portrait for About page)

If some files are missing, the site falls back to `public/images/_placeholder.svg`.

---

## Notes
- Language toggle persists in `localStorage`.
- Works open in a full-screen lightbox with ESC and arrow keys.


## Automatic deploy (GitHub Actions)
1) Commit and push to `main`.
2) In GitHub repo: Settings → Pages → Source: **GitHub Actions**.
3) The workflow `.github/workflows/deploy.yml` will build and deploy to Pages.

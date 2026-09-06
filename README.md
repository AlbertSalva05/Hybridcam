# hybrid.cam — Escrowed camera marketplace

Static multi-page site (HTML + CSS + vanilla JS). No build step, no dependencies, no CDN scripts — the only external request is Google Fonts, and the site renders fully without it.

## Files

```
index.html        Home
shop.html         Inventory
protocol.html     Escrow protocol explainer
track.html        Track order
sellers.html      For sellers
404.html          Not-found page
robots.txt
render.yaml       Render static-site blueprint
assets/
  favicon.svg
  css/main.css    All styles (tokens, base, layout, components, pages, motion, responsive)
  js/main.js      Partials (header/footer/marquee), data, marquee loop, scroll effects, modal (no framework)
```

## Deploy on Render

**Option A — Blueprint (recommended).** Push this folder to a Git repo, then in Render:
New → Blueprint → select the repo. `render.yaml` is picked up automatically.

**Option B — Manual static site.** New → Static Site → connect the repo, then set:

- Build Command: *(leave empty)*
- Publish Directory: `.`

Either way the site is served as-is; `404.html` is used for unknown paths.

## Local preview

Any static server, e.g.:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. (Opening `index.html` via `file://` also works, since partials render client-side.)

## Editing notes

- **Add a page:** create the HTML file, add `<div data-partial="header"></div>` / `<div data-partial="footer"></div>`, then add one entry to the nav array in `assets/js/main.js` — header, drawer and footer links all update.
- **Product photos:** drop images into the `.card__image` slots in `shop.html` / `index.html`.
- **Listings copy:** lives in `HYBRID.data` in `assets/js/main.js`.
- **Header menu:** `HYBRID.menu` in `assets/js/main.js` drives the desktop bar — an entry with a `children` array renders as a dropdown. `HYBRID.nav` stays the flat list used by the mobile drawer.
- **Theme:** light/dark toggle in the header; choice is stored under `hc-theme` in localStorage and falls back to the OS `prefers-color-scheme`. Light-theme colors are the `6.5 · LIGHT THEME` block in `main.css` — override tokens there, not per-component.

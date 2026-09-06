# hybrid.cam — Escrowed camera marketplace

Static multi-page site (HTML + CSS + jQuery). No build step, no dependencies to install.

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
  js/main.js      Partials (header/footer/marquee), data, marquee loop, scroll effects, modal
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

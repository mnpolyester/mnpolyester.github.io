# M.N. Polyester website

Static website for [mnpolyester.in](https://mnpolyester.in/), hosted with GitHub Pages.

The site is dependency-free HTML, CSS, and JavaScript. Company photography and brand assets are stored locally in this repository.

## Local preview

From the repository root, run:

```sh
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173/](http://127.0.0.1:4173/).

## Tests

Run the static content, interaction, brand-asset, and hosting checks with:

```sh
node --test test/*.test.mjs
```

## Deployment

Pushes to `main` deploy the repository root through `.github/workflows/pages.yml`. The custom domain is declared in `CNAME`, and `.nojekyll` keeps the static files untouched by Jekyll processing.

Only the `mnpolyester` GitHub account may push or change Pages settings for this repository. Never use `Arunothia-Marappan` credentials for Git operations, GitHub Actions, or Pages configuration.

## DNS cutover

Moving the website to GitHub Pages does not replace domain registration or email service. Follow these safeguards during release:

- Keep the `mnpolyester.in` domain registration active. Cancel paid website-builder hosting only after the GitHub Pages site and HTTPS have been verified.
- Preserve all existing MX and TXT records so email delivery and authentication for `contact@mnpolyester.in` continue to work.
- Re-verify the current official GitHub Pages DNS values immediately before the cutover using GitHub's official custom-domain documentation. Do not rely on copied or previously saved addresses.
- First verify the Pages deployment at its temporary GitHub URL. Then show the exact proposed DNS changes and obtain user confirmation before saving them.
- Change only the web-hosting DNS records. Do not alter mail-related records, transfer the domain, or cancel its registration.
- After DNS propagation, verify the apex domain, `www` behavior, HTTPS, and the preserved email records before discontinuing the old website hosting.

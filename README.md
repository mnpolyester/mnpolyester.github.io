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

Pushes to `main` deploy the repository root through `.github/workflows/pages.yml`, and `.nojekyll` keeps the static files untouched by Jekyll processing.

`CNAME` is retained as repository metadata for portability to branch-based Pages publishing or other static hosts. With this custom GitHub Actions workflow, `CNAME` does not assign the live custom domain; the repository's Pages configuration does.

Only the `mnpolyester` GitHub account may push or change Pages settings for this repository. Never use `Arunothia-Marappan` credentials for Git operations, GitHub Actions, or Pages configuration.

## DNS cutover

Moving the website to GitHub Pages does not replace domain registration or email service. Follow these safeguards during release:

- Keep the `mnpolyester.in` domain registration active. Cancel paid website-builder hosting only after the GitHub Pages site and HTTPS have been verified.
- Preserve all existing MX and TXT records so email delivery and authentication for `contact@mnpolyester.in` continue to work.

Use this release order:

1. Use only the verified `mnpolyester` account. Never enable or configure Pages from another GitHub account.
2. Enable GitHub Pages with GitHub Actions as the repository's deployment source.
3. Before any DNS changes, set `mnpolyester.in` as the repository custom domain in Settings → Pages (or through GitHub's official API).
4. Verify the temporary GitHub Pages URL and the repository's custom-domain association.
5. Re-verify the current official GitHub Pages DNS values immediately before the cutover using GitHub's official custom-domain documentation. Do not rely on copied or previously saved addresses.
6. Show the exact proposed DNS changes and obtain user confirmation before saving them.
7. Only after confirmation, change only the web-hosting DNS records. Do not alter mail-related records, transfer the domain, or cancel its registration.
8. After DNS propagation, verify the apex domain, `www` behavior, HTTPS, and the preserved email records before discontinuing the old website hosting.

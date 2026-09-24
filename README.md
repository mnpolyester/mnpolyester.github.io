# M.N. Polyester website

Static website for M.N. Polyester, hosted directly at [mnpolyester.github.io](https://mnpolyester.github.io/).

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

The GitHub Pages custom domain is deliberately not configured, and the repository has no `CNAME` file. This keeps `https://mnpolyester.github.io/` available as the independent canonical website.

Only the `mnpolyester` GitHub account may push or change Pages settings for this repository. Never use `Arunothia-Marappan` credentials for Git operations, GitHub Actions, or Pages configuration.

## Optional domain forwarding

Any future forwarding from `mnpolyester.in` to `https://mnpolyester.github.io/` is managed separately by the site owner at GoDaddy. It does not make `mnpolyester.in` a GitHub Pages custom domain, and this repository does not manage or require that forwarding.

The official company email remains `contact@mnpolyester.in`. When configuring forwarding, preserve all mail-related DNS records so email delivery and authentication continue to work. No GoDaddy or DNS changes are performed by this repository.

# M.N. Polyester website

Static website for M.N. Polyester, published through GitHub Pages at [mnpolyester.in](https://mnpolyester.in/).

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

The GitHub Pages custom domain is `mnpolyester.in`. The repository's `CNAME` file records the canonical domain for portability, while the repository's Pages setting is the source of truth for this custom GitHub Actions workflow.

Only the `mnpolyester` GitHub account may push or change Pages settings for this repository. Never use `Arunothia-Marappan` credentials for Git operations, GitHub Actions, or Pages configuration.

## DNS configuration

Back up the current DNS zone before changing it. Configure and verify `mnpolyester.in` in the repository's GitHub Pages settings, then re-check GitHub's current official DNS values. Remove GoDaddy domain forwarding and any parked web-hosting record, point the apex domain to the four official GitHub Pages IPv4 addresses, and set `www` as a CNAME for `mnpolyester.github.io`.

The current GitHub Pages apex addresses are:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

The official company email remains `contact@mnpolyester.in`. Replace only the apex web records and `www`; preserve every other DNS record, including all MX, TXT, CNAME, and SRV mail-related records used for delivery and authentication. After propagation, verify the apex domain, `www`, HTTPS, and mail DNS before enabling HTTPS enforcement.

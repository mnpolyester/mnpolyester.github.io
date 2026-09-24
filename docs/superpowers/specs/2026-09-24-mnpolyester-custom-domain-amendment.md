# M.N. Polyester Custom-Domain Amendment

## Decision

At the site owner's request, `https://mnpolyester.in/` replaces `https://mnpolyester.github.io/` as the canonical public URL. GitHub Pages continues to deploy the repository through the existing custom Actions workflow.

This amendment supersedes only the earlier hosting decisions that kept the Pages custom-domain setting empty and treated GoDaddy forwarding as optional. The site's approved content, design, accessibility, assets, and deployment workflow remain unchanged.

## Sources of truth

- The repository's GitHub Pages setting associates `mnpolyester.in` with this site. For a custom Actions workflow, this setting—not the `CNAME` file—controls the live custom domain.
- The root `CNAME` file records the canonical domain for repository portability and documentation.
- Canonical, Open Graph, crawler, and sitemap URLs use `https://mnpolyester.in/`.

## Cutover order and safeguards

1. Authenticate only as the `mnpolyester` GitHub account.
2. Set and verify `mnpolyester.in` in the repository's Pages settings before changing DNS.
3. Back up the current DNS zone and re-check GitHub's official Pages DNS values immediately before the change.
4. Remove GoDaddy forwarding and parked web-hosting records.
5. Point the apex domain only to GitHub Pages and point `www` directly to `mnpolyester.github.io`.
6. Preserve every other DNS record, including all MX, TXT, CNAME, and SRV records used by `contact@mnpolyester.in`.
7. Verify apex and `www` behavior, deployed content, certificate coverage, HTTPS enforcement, and mail DNS after propagation.

The domain registration, nameservers, email service, and non-web DNS records remain under the owner's GoDaddy account and are not replaced by GitHub Pages.

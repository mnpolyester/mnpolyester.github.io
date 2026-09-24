import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const repositoryRoot = path.resolve(currentDirectory, '..');

function readRepositoryFile(filePath) {
  return readFile(path.join(repositoryRoot, filePath), 'utf8');
}

test('uses the default GitHub Pages domain and disables Jekyll processing', async () => {
  const noJekyll = await readRepositoryFile('.nojekyll');

  await assert.rejects(
    readRepositoryFile('CNAME'),
    (error) => error?.code === 'ENOENT',
    'CNAME must be absent so GitHub Pages serves mnpolyester.github.io directly',
  );
  assert.equal(noJekyll, '');
});

test('publishes crawler directives for the canonical site', async () => {
  const [robots, sitemap] = await Promise.all([
    readRepositoryFile('robots.txt'),
    readRepositoryFile('sitemap.xml'),
  ]);

  assert.equal(
    robots,
    [
      'User-agent: *',
      'Allow: /',
      '',
      'Sitemap: https://mnpolyester.github.io/sitemap.xml',
      '',
    ].join('\n'),
  );
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.equal(
    sitemap.match(/<loc>https:\/\/mnpolyester\.github\.io\/<\/loc>/g)?.length,
    1,
  );
  assert.match(sitemap, /<lastmod>2026-09-24<\/lastmod>/);
  assert.match(sitemap, /<changefreq>monthly<\/changefreq>/);
  assert.match(sitemap, /<priority>1\.0<\/priority>/);
});

test('deploys the complete static root with the approved Pages actions', async () => {
  const workflow = await readRepositoryFile('.github/workflows/pages.yml');

  assert.match(workflow, /^name: Deploy to GitHub Pages$/m);
  assert.match(
    workflow,
    /^on:\n {2}push:\n {4}branches: \[main\]\n {2}workflow_dispatch:\s*$/m,
  );
  assert.match(
    workflow,
    /^permissions:\n {2}contents: read\n {2}pages: write\n {2}id-token: write$/m,
  );
  assert.match(
    workflow,
    /^concurrency:\n {2}group: pages\n {2}cancel-in-progress: false$/m,
  );
  assert.match(workflow, /environment:\n {6}name: github-pages\n {6}url: \$\{\{ steps\.deployment\.outputs\.page_url \}\}/);
  assert.match(workflow, /uses: actions\/checkout@v7/);
  assert.match(workflow, /uses: actions\/configure-pages@v6/);
  assert.match(workflow, /uses: actions\/upload-pages-artifact@v5\n {8}with:\n {10}path: \.\n {10}include-hidden-files: true/);
  assert.match(workflow, /id: deployment\n {8}uses: actions\/deploy-pages@v5/);
});

test('documents local operation and deterministic deployment', async () => {
  const readme = await readRepositoryFile('README.md');

  assert.match(readme, /^# M\.N\. Polyester website$/m);
  assert.match(readme, /https:\/\/mnpolyester\.github\.io\//);
  assert.match(readme, /python3 -m http\.server 4173/);
  assert.match(readme, /http:\/\/127\.0\.0\.1:4173\//);
  assert.match(readme, /node --test test\/\*\.test\.mjs/);
  assert.match(readme, /\.github\/workflows\/pages\.yml/);
  assert.match(readme, /custom domain.+deliberately.+not configured/i);
  assert.match(readme, /no `CNAME` file/i);
});

test('documents credential isolation and user-managed domain forwarding', async () => {
  const readme = await readRepositoryFile('README.md');
  const forwardingSection = readme.match(/## Optional domain forwarding\n([\s\S]*?)(?=\n## |$)/)?.[1];

  assert.ok(forwardingSection, 'README must include an optional domain-forwarding section');
  assert.match(
    readme,
    /Only the `mnpolyester` GitHub account may push or change Pages settings/,
  );
  assert.match(readme, /Never use `Arunothia-Marappan` credentials/);
  assert.match(forwardingSection, /managed separately by the site owner/i);
  assert.match(forwardingSection, /does not make.+custom domain/i);
  assert.match(forwardingSection, /contact@mnpolyester\.in/);
  assert.match(forwardingSection, /preserve.+mail.+records/i);
  assert.doesNotMatch(forwardingSection, /set `mnpolyester\.in` as the repository custom domain/i);
});

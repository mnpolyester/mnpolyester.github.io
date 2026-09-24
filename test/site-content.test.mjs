import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const repositoryRoot = path.resolve(currentDirectory, '..');
const html = await readFile(path.join(repositoryRoot, 'index.html'), 'utf8');

test('preserves approved company content', () => {
  const approvedContent = [
    'Unsaturated Polyester Resin Manufacturer',
    'Precision and quality in every batch, every time.',
    'M.N. Polyester (India) Pvt. Ltd.',
    'GP Resin with and without UV Stabilization',
    'GP Resin Superior with and without UVS',
    'GP Gelcoat only with UVS',
    'ISO Resin with and without UVS',
    'ISO Gelcoat only with UVS',
    'ROOFLITE Resin with and without UVS',
    'F.R.R Resin with and without UVS',
    'contact@mnpolyester.in',
    '+91 94425 49200',
    '+91 94425 49490',
  ];

  for (const content of approvedContent) {
    assert.ok(html.includes(content), `Expected index.html to include: ${content}`);
  }
});

test('contains direct contact actions', () => {
  const contactActions = [
    'href="mailto:contact@mnpolyester.in"',
    'href="tel:+919442549200"',
    'href="tel:+919442549490"',
    'href="https://wa.me/919442549200"',
  ];

  for (const action of contactActions) {
    assert.ok(html.includes(action), `Expected index.html to include: ${action}`);
  }
});

test('uses the approved local brand and factory assets', async () => {
  const assetPaths = [
    'assets/brand/mnpolyester-logo.svg',
    'assets/brand/mnpolyester-mark.svg',
    'assets/brand/mnpolyester-favicon.svg',
    'assets/brand/apple-touch-icon.png',
    'assets/images/hero-team.jpg',
    'assets/images/product-drums.jpg',
    'assets/images/factory-materials.jpg',
    'assets/images/factory-floor.jpg',
    'assets/images/factory-team.jpg',
    'assets/images/factory-process-1.jpg',
    'assets/images/factory-process-2.jpg',
    'assets/images/factory-storage.jpg',
    'assets/images/factory-dispatch.jpg',
    'assets/css/styles.css',
    'assets/js/main.js',
  ];

  for (const assetPath of assetPaths) {
    assert.ok(html.includes(assetPath), `Expected index.html to reference: ${assetPath}`);
    await access(path.join(repositoryRoot, assetPath));
  }
});

test('includes canonical, sharing, and structural metadata', () => {
  assert.ok(html.includes('<html lang="en">'));
  assert.match(html, /<meta\s+name=["']description["'][^>]*content=["'][^"']+["'][^>]*>/i);
  assert.match(html, /<link\s+rel=["']canonical["']\s+href=["']https:\/\/mnpolyester\.in\/["']\s*\/?>/i);
  assert.match(html, /<meta\s+property=["']og:title["'][^>]*>/i);
  assert.ok(html.includes('<main id="main-content">'));
  assert.match(html, /<h1[^>]*>\s*Unsaturated Polyester Resin Manufacturer\s*<\/h1>/);
});

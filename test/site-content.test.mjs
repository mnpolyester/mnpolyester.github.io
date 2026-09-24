import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const repositoryRoot = path.resolve(currentDirectory, '..');
const html = await readFile(path.join(repositoryRoot, 'index.html'), 'utf8');

const quotedAttributeContent = String.raw`(?:[^>"']|"[^"]*"|'[^']*')*`;
const startTagPattern = new RegExp(
  String.raw`<([a-z][a-z0-9:-]*)\b(${quotedAttributeContent})>`,
  'gi',
);
const htmlTagPattern = new RegExp(
  String.raw`<\/?[a-z][a-z0-9:-]*\b${quotedAttributeContent}>`,
  'gi',
);

function stripComments(markup) {
  return markup.replace(/<!--[\s\S]*?-->/g, ' ');
}

function stripScriptAndStyleBodies(markup) {
  const bodyPattern = new RegExp(
    String.raw`(<(script|style)\b${quotedAttributeContent}>)[\s\S]*?<\/\2\s*>`,
    'gi',
  );

  return markup.replace(bodyPattern, (_match, openingTag, tagName) => {
    return `${openingTag}</${tagName}>`;
  });
}

function prepareMarkup(markup) {
  return stripScriptAndStyleBodies(stripComments(markup));
}

function parseAttributes(source) {
  const attributes = new Map();
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'))?/g;

  for (const match of source.matchAll(attributePattern)) {
    const [, name, doubleQuotedValue, singleQuotedValue] = match;
    attributes.set(name.toLowerCase(), doubleQuotedValue ?? singleQuotedValue ?? '');
  }

  return attributes;
}

function parseStartTags(markup) {
  const tags = [];
  const preparedMarkup = prepareMarkup(markup);

  for (const match of preparedMarkup.matchAll(startTagPattern)) {
    const [, name, attributeSource] = match;
    tags.push({
      name: name.toLowerCase(),
      attributes: parseAttributes(attributeSource),
    });
  }

  return tags;
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function extractVisibleText(markup) {
  return normalizeWhitespace(
    prepareMarkup(markup)
      .replace(htmlTagPattern, ' ')
      .replace(/<![^>]*>/g, ' '),
  );
}

function extractElementTexts(markup, tagName) {
  const elementPattern = new RegExp(
    String.raw`<${tagName}\b${quotedAttributeContent}>([\s\S]*?)<\/${tagName}\s*>`,
    'gi',
  );

  return Array.from(prepareMarkup(markup).matchAll(elementPattern), (match) => {
    return extractVisibleText(match[1]);
  });
}

const tags = parseStartTags(html);
const visibleText = extractVisibleText(html);

function findTag(tagName, predicate) {
  return tags.find((tag) => tag.name === tagName && predicate(tag.attributes));
}

function collectAttributeValues(attributeName) {
  return new Set(
    tags.flatMap((tag) => {
      return tag.attributes.has(attributeName) ? [tag.attributes.get(attributeName)] : [];
    }),
  );
}

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
    assert.ok(visibleText.includes(content), `Expected visible page text to include: ${content}`);
  }
});

test('contains direct contact actions', () => {
  const hrefValues = collectAttributeValues('href');
  const contactHrefs = [
    'mailto:contact@mnpolyester.in',
    'tel:+919442549200',
    'tel:+919442549490',
    'https://wa.me/919442549200',
  ];

  for (const href of contactHrefs) {
    assert.ok(hrefValues.has(href), `Expected a real link with href="${href}"`);
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
  const assetReferences = new Set([
    ...collectAttributeValues('href'),
    ...collectAttributeValues('src'),
  ]);

  for (const assetPath of assetPaths) {
    assert.ok(
      assetReferences.has(assetPath),
      `Expected a real href or src attribute with the exact local path: ${assetPath}`,
    );
    await assert.doesNotReject(
      access(path.join(repositoryRoot, assetPath)),
      `Expected referenced local asset to exist: ${assetPath}`,
    );
  }
});

test('includes canonical, sharing, and structural metadata', () => {
  assert.ok(
    findTag('html', (attributes) => attributes.get('lang')?.toLowerCase() === 'en'),
    'Expected the root <html> element to declare lang="en"',
  );
  assert.ok(
    findTag('meta', (attributes) => {
      return (
        attributes.get('name')?.toLowerCase() === 'description'
        && Boolean(attributes.get('content')?.trim())
      );
    }),
    'Expected a <meta name="description"> element with non-empty content',
  );
  assert.ok(
    findTag('link', (attributes) => {
      const relTokens = attributes.get('rel')?.toLowerCase().split(/\s+/) ?? [];
      return relTokens.includes('canonical') && attributes.get('href') === 'https://mnpolyester.in/';
    }),
    'Expected a canonical <link> with exact href="https://mnpolyester.in/"',
  );
  assert.ok(
    findTag('meta', (attributes) => {
      return (
        attributes.get('property')?.toLowerCase() === 'og:title'
        && Boolean(attributes.get('content')?.trim())
      );
    }),
    'Expected a <meta property="og:title"> element with non-empty content',
  );
  assert.ok(
    findTag('main', (attributes) => attributes.get('id') === 'main-content'),
    'Expected a <main> element with id="main-content"',
  );
  assert.ok(
    extractElementTexts(html, 'h1').includes('Unsaturated Polyester Resin Manufacturer'),
    'Expected an <h1> whose normalized visible text exactly matches the approved heading',
  );
});

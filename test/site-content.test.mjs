import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const repositoryRoot = path.resolve(currentDirectory, '..');

const tagContentPattern = String.raw`(?:[^>"']|"[^"]*"|'[^']*')*`;
const inertElementNames = new Set(['template', 'textarea', 'noscript']);

function createTagPattern() {
  return new RegExp(
    String.raw`<(/?)([a-z][a-z0-9:-]*)\b(${tagContentPattern})>`,
    'gi',
  );
}

function stripComments(markup) {
  return markup.replace(/<!--[\s\S]*?-->/g, ' ');
}

function parseAttributes(source) {
  const attributes = new Map();
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of source.matchAll(attributePattern)) {
    const [, name, doubleQuotedValue, singleQuotedValue, unquotedValue] = match;
    attributes.set(
      name.toLowerCase(),
      doubleQuotedValue ?? singleQuotedValue ?? unquotedValue ?? '',
    );
  }

  return attributes;
}

function parseTagTokens(markup) {
  return Array.from(markup.matchAll(createTagPattern()), (match) => {
    const [, closingMarker, name, attributeSource] = match;
    return {
      name: name.toLowerCase(),
      attributes: closingMarker ? new Map() : parseAttributes(attributeSource),
      isClosing: closingMarker === '/',
      start: match.index,
      end: match.index + match[0].length,
    };
  });
}

function stripRawTextBodies(markup) {
  const tagPattern = createTagPattern();
  let output = '';
  let cursor = 0;
  let match;

  while ((match = tagPattern.exec(markup)) !== null) {
    const [, closingMarker, rawName] = match;
    const name = rawName.toLowerCase();

    if (closingMarker || (name !== 'script' && name !== 'style')) {
      continue;
    }

    const closingPattern = new RegExp(String.raw`<\/${name}\s*>`, 'gi');
    closingPattern.lastIndex = tagPattern.lastIndex;
    const closingMatch = closingPattern.exec(markup);

    output += markup.slice(cursor, match.index);
    output += name === 'script' ? `${match[0]}</script>` : ' ';
    cursor = closingMatch ? closingMatch.index + closingMatch[0].length : markup.length;
    tagPattern.lastIndex = cursor;
  }

  return output + markup.slice(cursor);
}

function stripInertElements(markup) {
  const removalRanges = [];
  const inertStack = [];
  let outerStart = null;

  for (const token of parseTagTokens(markup)) {
    if (inertStack.length === 0) {
      if (!token.isClosing && inertElementNames.has(token.name)) {
        outerStart = token.start;
        inertStack.push(token.name);
      }
      continue;
    }

    const activeContainer = inertStack.at(-1);
    if (token.isClosing && token.name === activeContainer) {
      inertStack.pop();
      if (inertStack.length === 0) {
        removalRanges.push([outerStart, token.end]);
        outerStart = null;
      }
      continue;
    }

    if (
      activeContainer === 'template'
      && !token.isClosing
      && inertElementNames.has(token.name)
    ) {
      inertStack.push(token.name);
    }
  }

  if (outerStart !== null) {
    removalRanges.push([outerStart, markup.length]);
  }

  let output = '';
  let cursor = 0;
  for (const [start, end] of removalRanges) {
    output += `${markup.slice(cursor, start)} `;
    cursor = end;
  }

  return output + markup.slice(cursor);
}

function prepareDocument(markup) {
  return stripInertElements(stripRawTextBodies(stripComments(markup)));
}

function extractElementRegion(markup, tagName) {
  let contentStart = null;
  let depth = 0;

  for (const token of parseTagTokens(markup)) {
    if (token.name !== tagName) {
      continue;
    }

    if (!token.isClosing) {
      if (depth === 0) {
        contentStart = token.end;
      }
      depth += 1;
      continue;
    }

    if (depth > 0) {
      depth -= 1;
      if (depth === 0) {
        return markup.slice(contentStart, token.start);
      }
    }
  }

  return null;
}

function parseStartTags(markup) {
  return parseTagTokens(markup).filter((token) => !token.isClosing);
}

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function extractVisibleText(markup) {
  const htmlTagPattern = createTagPattern();
  return normalizeWhitespace(
    markup.replace(htmlTagPattern, ' ').replace(/<![^>]*>/g, ' '),
  );
}

function extractElementTexts(markup, tagName) {
  const openElements = [];
  const elementTexts = [];

  for (const token of parseTagTokens(markup)) {
    if (token.name !== tagName) {
      continue;
    }

    if (!token.isClosing) {
      openElements.push(token.end);
      continue;
    }

    const contentStart = openElements.pop();
    if (contentStart !== undefined) {
      elementTexts.push(extractVisibleText(markup.slice(contentStart, token.start)));
    }
  }

  return elementTexts;
}

function hasRelToken(attributes, expectedToken) {
  const relTokens = attributes.get('rel')?.toLowerCase().split(/\s+/) ?? [];
  return relTokens.includes(expectedToken);
}

function findTag(tags, tagName, predicate) {
  return tags.find((tag) => tag.name === tagName && predicate(tag.attributes));
}

function collectAttributeValues(tags, tagName, attributeName) {
  return new Set(
    tags.flatMap((tag) => {
      return tag.name === tagName && tag.attributes.has(attributeName)
        ? [tag.attributes.get(attributeName)]
        : [];
    }),
  );
}

function verifyMarkupHelpers() {
  const fixture = `
    <!doctype html>
    <html LANG=en>
      <head>
        <template><meta name=description content="decoy"></template>
        <link REL='stylesheet preload' href=assets/css/styles.css>
        <script defer SRC=assets/js/main.js>DECOY_COPY</script>
        <style>DECOY_COPY</style>
      </head>
      <body data-copy="DECOY_COPY">
        <!-- DECOY_COPY -->
        <template><template>DECOY_COPY</template></template>
        <textarea><h1>DECOY_COPY</h1></textarea>
        <noscript><a href=mailto:decoy@example.com>DECOY_COPY</a></noscript>
        <main id=main-content>
          <h1>Live <span>heading</span></h1>
          <a href=mailto:live@example.com>Contact</a>
          <img src=live.jpg alt="Live asset">
        </main>
      </body>
    </html>
  `;
  const preparedFixture = prepareDocument(fixture);
  const fixtureHead = extractElementRegion(preparedFixture, 'head') ?? '';
  const fixtureBody = extractElementRegion(preparedFixture, 'body') ?? '';
  const fixtureDocumentTags = parseStartTags(preparedFixture);
  const fixtureHeadTags = parseStartTags(fixtureHead);
  const fixtureBodyTags = parseStartTags(fixtureBody);

  assert.ok(
    findTag(fixtureDocumentTags, 'html', (attributes) => attributes.get('lang') === 'en'),
    'Parser must support case-insensitive names and unquoted attribute values',
  );
  assert.equal(
    extractVisibleText(fixtureBody).includes('DECOY_COPY'),
    false,
    'Visible-text extraction must exclude comments, raw text, inert content, and attributes',
  );
  assert.deepEqual(
    [...collectAttributeValues(fixtureBodyTags, 'a', 'href')],
    ['mailto:live@example.com'],
    'Body links must exclude anchors inside inert containers',
  );
  assert.deepEqual(
    [...collectAttributeValues(fixtureBodyTags, 'img', 'src')],
    ['live.jpg'],
    'Body images must exclude image references inside inert containers',
  );
  assert.ok(
    findTag(fixtureHeadTags, 'link', (attributes) => {
      return hasRelToken(attributes, 'stylesheet')
        && attributes.get('href') === 'assets/css/styles.css';
    }),
    'Head parsing must retain functional stylesheet links',
  );
  assert.ok(
    collectAttributeValues(fixtureHeadTags, 'script', 'src').has('assets/js/main.js'),
    'Raw-text stripping must retain real script opening tags',
  );
  assert.deepEqual(
    extractElementTexts(fixtureBody, 'h1'),
    ['Live heading'],
    'Heading extraction must ignore inert headings and normalize active text',
  );
}

verifyMarkupHelpers();

const html = await readFile(path.join(repositoryRoot, 'index.html'), 'utf8');

const activeDocument = prepareDocument(html);
const headRegion = extractElementRegion(activeDocument, 'head');
const bodyRegion = extractElementRegion(activeDocument, 'body');
const documentTags = parseStartTags(activeDocument);
const headTags = parseStartTags(headRegion ?? '');
const bodyTags = parseStartTags(bodyRegion ?? '');
const visibleBodyText = extractVisibleText(bodyRegion ?? '');

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
    assert.ok(
      visibleBodyText.includes(content),
      `Expected visible body text to include: ${content}`,
    );
  }
});

test('contains direct contact actions', () => {
  const anchorHrefs = collectAttributeValues(bodyTags, 'a', 'href');
  const contactHrefs = [
    'mailto:contact@mnpolyester.in',
    'tel:+919442549200',
    'tel:+919442549490',
    'https://wa.me/919442549200',
  ];

  for (const href of contactHrefs) {
    assert.ok(
      anchorHrefs.has(href),
      `Expected an active body <a> with exact href="${href}"`,
    );
  }
});

test('uses the approved local brand and factory assets', async () => {
  const bodyImagePaths = [
    'assets/brand/mnpolyester-logo.svg',
    'assets/brand/mnpolyester-mark.svg',
    'assets/images/hero-team.jpg',
    'assets/images/product-drums.jpg',
    'assets/images/factory-materials.jpg',
    'assets/images/factory-floor.jpg',
    'assets/images/factory-team.jpg',
    'assets/images/factory-process-1.jpg',
    'assets/images/factory-process-2.jpg',
    'assets/images/factory-storage.jpg',
    'assets/images/factory-dispatch.jpg',
  ];
  const imageSources = collectAttributeValues(bodyTags, 'img', 'src');
  const scriptSources = new Set([
    ...collectAttributeValues(headTags, 'script', 'src'),
    ...collectAttributeValues(bodyTags, 'script', 'src'),
  ]);
  const stylesheetPath = 'assets/css/styles.css';
  const scriptPath = 'assets/js/main.js';
  const faviconPath = 'assets/brand/mnpolyester-favicon.svg';
  const appleTouchIconPath = 'assets/brand/apple-touch-icon.png';

  for (const assetPath of bodyImagePaths) {
    assert.ok(
      imageSources.has(assetPath),
      `Expected an active body <img> with exact src="${assetPath}"`,
    );
  }

  assert.ok(
    findTag(headTags, 'link', (attributes) => {
      return hasRelToken(attributes, 'stylesheet') && attributes.get('href') === stylesheetPath;
    }),
    `Expected a head stylesheet <link> with exact href="${stylesheetPath}"`,
  );
  assert.ok(
    scriptSources.has(scriptPath),
    `Expected a real <script> opening tag with exact src="${scriptPath}"`,
  );
  assert.ok(
    findTag(headTags, 'link', (attributes) => {
      return hasRelToken(attributes, 'icon') && attributes.get('href') === faviconPath;
    }),
    `Expected a head icon <link> with exact href="${faviconPath}"`,
  );
  assert.ok(
    findTag(headTags, 'link', (attributes) => {
      return hasRelToken(attributes, 'apple-touch-icon')
        && attributes.get('href') === appleTouchIconPath;
    }),
    `Expected a head apple-touch-icon <link> with exact href="${appleTouchIconPath}"`,
  );

  const localAssetPaths = [
    ...bodyImagePaths,
    stylesheetPath,
    scriptPath,
    faviconPath,
    appleTouchIconPath,
  ];
  for (const assetPath of localAssetPaths) {
    await assert.doesNotReject(
      access(path.join(repositoryRoot, assetPath)),
      `Expected referenced local asset to exist: ${assetPath}`,
    );
  }
});

test('includes canonical, sharing, and structural metadata', () => {
  assert.ok(
    headRegion !== null,
    'Expected the document to include a real <head> region',
  );
  assert.ok(
    bodyRegion !== null,
    'Expected the document to include a real <body> region',
  );
  assert.ok(
    findTag(documentTags, 'html', (attributes) => {
      return attributes.get('lang')?.toLowerCase() === 'en';
    }),
    'Expected the root <html> element to declare lang="en"',
  );
  assert.ok(
    findTag(headTags, 'meta', (attributes) => {
      return (
        attributes.get('name')?.toLowerCase() === 'description'
        && Boolean(attributes.get('content')?.trim())
      );
    }),
    'Expected a <meta name="description"> element with non-empty content',
  );
  assert.ok(
    findTag(headTags, 'link', (attributes) => {
      return (
        hasRelToken(attributes, 'canonical')
        && attributes.get('href') === 'https://mnpolyester.in/'
      );
    }),
    'Expected a head canonical <link> with exact href="https://mnpolyester.in/"',
  );
  assert.ok(
    findTag(headTags, 'meta', (attributes) => {
      return (
        attributes.get('property')?.toLowerCase() === 'og:title'
        && Boolean(attributes.get('content')?.trim())
      );
    }),
    'Expected a <meta property="og:title"> element with non-empty content',
  );
  assert.ok(
    findTag(bodyTags, 'main', (attributes) => attributes.get('id') === 'main-content'),
    'Expected an active body <main> element with id="main-content"',
  );
  assert.ok(
    extractElementTexts(bodyRegion ?? '', 'h1').includes(
      'Unsaturated Polyester Resin Manufacturer',
    ),
    'Expected an active body <h1> whose normalized visible text exactly matches the approved heading',
  );
});

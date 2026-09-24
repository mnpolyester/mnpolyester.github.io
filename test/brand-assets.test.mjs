import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const favicon = await readFile(
  new URL("../assets/brand/mnpolyester-favicon.svg", import.meta.url),
  "utf8",
);

assert.doesNotMatch(favicon, /<image\b/, "favicon must remain path-based vector artwork");

const viewBox = favicon.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
assert.ok(viewBox, "favicon must declare a viewBox");
assert.equal(viewBox[1], viewBox[2], "favicon canvas must be square");

assert.match(favicon, /fill="#2e3192"/i, "favicon must include the original blue M and P ovals");
assert.match(favicon, /fill="#ed1c24"/i, "favicon must include the original red N oval and swoosh");

const whiteLetterPaths = favicon.match(/<path fill="#fff"/gi) ?? [];
assert.ok(
  whiteLetterPaths.length >= 3,
  "favicon must preserve separate white M, N, and P letter paths",
);

console.log("Brand asset checks passed: favicon preserves the complete M–N–P mark.");

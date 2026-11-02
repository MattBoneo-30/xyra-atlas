import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { COURSES } from '../data.js';

const root = process.cwd();
const assets = path.join(root, 'assets');

test('every learning world has original, distinct, accessible and offline-ready artwork', () => {
  assert.equal(COURSES.length, 14);
  assert.equal(new Set(COURSES.map(c => c.art)).size, COURSES.length,
    'Course art must be unique, not a reused background');
  const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
  for (const course of COURSES) {
    const asset = `${course.art}.svg`;
    const content = fs.readFileSync(path.join(assets, asset), 'utf8');
    assert.match(content, /<svg\b[^>]+viewBox="0 0 900 480"/);
    assert.match(content, /aria-label="Illustrated [^"]+ learning world"/);
    assert.match(content, /<\/svg>$/);
    assert.doesNotMatch(content, /<script|<foreignObject|(?:https?:)?\/\/[^\s"']+\.js/i,
      'Artwork must not load remote scripts or embedded HTML');
    assert.ok(Buffer.byteLength(content, 'utf8') < 18_000,
      `Artwork for ${course.id} should remain lightweight`);
    assert.ok(sw.includes(`/assets/${asset}`), `${asset} must be precached offline`);
  }
  const corner = fs.readFileSync(path.join(assets, 'xyra-corner.svg'), 'utf8');
  assert.match(corner, /<svg/);
  assert.ok(sw.includes('/assets/xyra-corner.svg'));
});

test('home category cards render original art and preserve readable labels', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  assert.match(app, /class="topic-image"/);
  assert.match(app, /loading="lazy" decoding="async"/);
  assert.match(app, /class="topic-icon"/);
  assert.match(css, /\.topic-tile::after/);
  assert.match(css, /\.topic-image/);
});

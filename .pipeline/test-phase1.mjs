/**
 * Cartola Elifoot - Phase 1 Foundation Test Suite
 * Automated CSS and Design Token Validation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TESTS = [];
let PASSED = 0;
let FAILED = 0;

function test(name, fn) {
  TESTS.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

function readCssFile(filename) {
  const filepath = path.join(__dirname, '../public/css', filename);
  return fs.readFileSync(filepath, 'utf8');
}

function extractVariables(css) {
  const regex = /--[\w-]+\s*:\s*([^;]+);/g;
  const vars = [];
  let match;
  while ((match = regex.exec(css)) !== null) {
    vars.push(match[0]);
  }
  return vars;
}

// Test Suite

test('CSS files exist', () => {
  const files = ['_variables.css', '_typography.css', '_layout.css', '_components.css', '_animations.css', 'main.css'];
  files.forEach(file => {
    const filepath = path.join(__dirname, '../public/css', file);
    assert(fs.existsSync(filepath), `File not found: ${file}`);
  });
});

test('_variables.css contains 93 variables', () => {
  const css = readCssFile('_variables.css');
  const vars = extractVariables(css);
  assertEquals(vars.length, 93, 'Variable count mismatch');
});

test('Dark backgrounds defined correctly', () => {
  const css = readCssFile('_variables.css');
  assert(css.includes('--dark-bg-primary: #0f1419'), 'dark-bg-primary not found');
  assert(css.includes('--dark-bg-secondary: #1a2332'), 'dark-bg-secondary not found');
  assert(css.includes('--dark-bg-tertiary: #252d3d'), 'dark-bg-tertiary not found');
  assert(css.includes('--dark-bg-elevated: #2a3545'), 'dark-bg-elevated not found');
});

test('Accent colors defined correctly', () => {
  const css = readCssFile('_variables.css');
  assert(css.includes('--primary-accent: #4a9eff'), 'primary-accent not found');
  assert(css.includes('--secondary-accent: #6bbf59'), 'secondary-accent not found');
  assert(css.includes('--warning-accent: #ffb84d'), 'warning-accent not found');
  assert(css.includes('--danger-accent: #ff5c5c'), 'danger-accent not found');
});

test('Spacing scale uses 8px base unit', () => {
  const css = readCssFile('_variables.css');
  assert(css.includes('--space-xs: 4px'), 'space-xs incorrect');
  assert(css.includes('--space-sm: 8px'), 'space-sm incorrect');
  assert(css.includes('--space-md: 16px'), 'space-md incorrect');
  assert(css.includes('--space-lg: 24px'), 'space-lg incorrect');
  assert(css.includes('--space-xl: 32px'), 'space-xl incorrect');
});

test('Typography families defined', () => {
  const css = readCssFile('_variables.css');
  assert(css.includes("--font-body: 'Inter'"), 'font-body not found');
  assert(css.includes("--font-mono: 'IBM Plex Mono'"), 'font-mono not found');
});

test('Responsive breakpoints defined', () => {
  const css = readCssFile('_variables.css');
  assert(css.includes('--breakpoint-mobile: 375px'), 'mobile breakpoint not found');
  assert(css.includes('--breakpoint-tablet: 768px'), 'tablet breakpoint not found');
  assert(css.includes('--breakpoint-desktop: 1024px'), 'desktop breakpoint not found');
  assert(css.includes('--breakpoint-wide: 1440px'), 'wide breakpoint not found');
});

test('Grid columns defined', () => {
  const css = readCssFile('_variables.css');
  assert(css.includes('--grid-columns-mobile: 4'), 'mobile columns not found');
  assert(css.includes('--grid-columns-tablet: 8'), 'tablet columns not found');
  assert(css.includes('--grid-columns-desktop: 12'), 'desktop columns not found');
});

test('Typography system imported in main.css', () => {
  const css = readCssFile('main.css');
  assert(css.includes("@import './_typography.css'"), 'typography import not found');
});

test('All files imported in main.css in correct order', () => {
  const css = readCssFile('main.css');
  const variablesPos = css.indexOf("@import './_variables.css'");
  const typographyPos = css.indexOf("@import './_typography.css'");
  const layoutPos = css.indexOf("@import './_layout.css'");
  const componentsPos = css.indexOf("@import './_components.css'");
  const animationsPos = css.indexOf("@import './_animations.css'");
  
  assert(variablesPos > 0, 'variables import not found');
  assert(typographyPos > variablesPos, 'typography should come after variables');
  assert(layoutPos > typographyPos, 'layout should come after typography');
  assert(componentsPos > layoutPos, 'components should come after layout');
  assert(animationsPos > componentsPos, 'animations should come after components');
});

test('Button variants present', () => {
  const css = readCssFile('_components.css');
  assert(css.includes('.btn-primary'), 'btn-primary not found');
  assert(css.includes('.btn-secondary'), 'btn-secondary not found');
  assert(css.includes('.btn-danger'), 'btn-danger not found');
  assert(css.includes('.btn-success'), 'btn-success not found');
});

test('Card variants present', () => {
  const css = readCssFile('_components.css');
  assert(css.includes('.card'), 'card not found');
  assert(css.includes('.card.elevated'), 'card.elevated not found');
  assert(css.includes('.card.selected'), 'card.selected not found');
  assert(css.includes('.card-compact'), 'card-compact not found');
});

test('Animation keyframes present (count > 15)', () => {
  const css = readCssFile('_animations.css');
  const keyframes = css.match(/@keyframes[\s\w-]+/g) || [];
  assert(keyframes.length > 15, `Expected > 15 keyframes, found ${keyframes.length}`);
});

test('Fade animations present', () => {
  const css = readCssFile('_animations.css');
  assert(css.includes('@keyframes fadeIn'), 'fadeIn not found');
  assert(css.includes('@keyframes fadeOut'), 'fadeOut not found');
  assert(css.includes('.fade-in'), 'fade-in utility not found');
});

test('Slide animations present', () => {
  const css = readCssFile('_animations.css');
  assert(css.includes('@keyframes slideInUp'), 'slideInUp not found');
  assert(css.includes('@keyframes slideInDown'), 'slideInDown not found');
  assert(css.includes('@keyframes slideInLeft'), 'slideInLeft not found');
  assert(css.includes('@keyframes slideInRight'), 'slideInRight not found');
});

test('Pulse animations present', () => {
  const css = readCssFile('_animations.css');
  assert(css.includes('@keyframes pulse'), 'pulse not found');
  assert(css.includes('@keyframes pulse-success'), 'pulse-success not found');
  assert(css.includes('@keyframes pulse-warning'), 'pulse-warning not found');
});

test('Responsive media queries present', () => {
  const css = readCssFile('_layout.css');
  assert(css.includes('@media (min-width: 768px)'), 'tablet media query not found');
  assert(css.includes('@media (max-width: 767px)'), 'mobile media query not found');
});

test('Typography files use variables', () => {
  const css = readCssFile('_typography.css');
  assert(css.includes('var(--font-body)'), 'font-body variable not used');
  assert(css.includes('var(--font-mono)'), 'font-mono variable not used');
  assert(css.includes('var(--text-primary)'), 'text-primary variable not used');
});

test('Layout uses spacing variables', () => {
  const css = readCssFile('_layout.css');
  assert(css.includes('var(--space-'), 'spacing variables not used');
  assert(css.includes('var(--grid-'), 'grid variables not used');
});

test('Focus accessibility styles present', () => {
  const css = readCssFile('main.css');
  assert(css.includes(':focus-visible'), 'focus-visible not found');
  assert(css.includes('outline-offset'), 'outline-offset not found');
});

test('Reduced motion media query present', () => {
  const css = readCssFile('_animations.css');
  assert(css.includes('@media (prefers-reduced-motion: reduce)'), 'prefers-reduced-motion not found');
});

test('Container max-width set correctly', () => {
  const css = readCssFile('_layout.css');
  assert(css.includes('max-width: 1440px') || css.includes('var(--container-max-width)'), 'container max-width not set');
});

test('Z-index scale properly ordered', () => {
  const css = readCssFile('_variables.css');
  assert(css.includes('--z-base: 1'), 'z-base not found');
  assert(css.includes('--z-dropdown: 100'), 'z-dropdown not found');
  assert(css.includes('--z-modal: 800'), 'z-modal not found');
  assert(css.includes('--z-tooltip: 900'), 'z-tooltip not found');
});

// Run Tests

console.log('\n=== Cartola Elifoot Phase 1 Test Suite ===\n');

TESTS.forEach(({ name, fn }, index) => {
  try {
    fn();
    console.log(`✓ Test ${index + 1}: ${name}`);
    PASSED++;
  } catch (error) {
    console.log(`✗ Test ${index + 1}: ${name}`);
    console.log(`  Error: ${error.message}`);
    FAILED++;
  }
});

console.log(`\n=== Results ===`);
console.log(`Total: ${TESTS.length}`);
console.log(`Passed: ${PASSED}`);
console.log(`Failed: ${FAILED}`);
console.log(`Success Rate: ${((PASSED / TESTS.length) * 100).toFixed(1)}%\n`);

process.exit(FAILED > 0 ? 1 : 0);

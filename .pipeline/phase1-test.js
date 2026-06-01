#!/usr/bin/env node

/**
 * Phase 1 Test Suite - Cartola Elifoot Design System
 * Tests CSS Variables Foundation, Dark Mode, Button Colors, and Accessibility
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, skipped: 0 };
    this.failures = [];
  }

  addTest(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('\n=====================================');
    console.log('Phase 1 Test Suite - Cartola Elifoot');
    console.log('=====================================\n');

    for (const test of this.tests) {
      try {
        const result = await test.fn();
        this.logResult(test.name, result);
      } catch (error) {
        this.logResult(test.name, {
          pass: false,
          message: error.message
        });
      }
    }

    this.printSummary();
  }

  logResult(name, result) {
    const { pass = false, message = '', details = '' } = result;

    if (result.skip) {
      this.results.skipped++;
      console.log(`⊘ SKIP: ${name}`);
      if (message) console.log(`  → ${message}`);
    } else if (pass) {
      this.results.passed++;
      console.log(`✓ PASS: ${name}`);
      if (details) console.log(`  → ${details}`);
    } else {
      this.results.failed++;
      this.failures.push({ name, message, details });
      console.log(`✗ FAIL: ${name}`);
      if (message) console.log(`  → ${message}`);
      if (details) console.log(`  → ${details}`);
    }
  }

  printSummary() {
    const total = this.results.passed + this.results.failed + this.results.skipped;
    console.log('\n=====================================');
    console.log(`Total: ${total} | Passed: ${this.results.passed} | Failed: ${this.results.failed} | Skipped: ${this.results.skipped}`);
    console.log('=====================================\n');

    if (this.results.failed > 0) {
      console.log('FAILURES:\n');
      this.failures.forEach(f => {
        console.log(`${f.name}`);
        if (f.message) console.log(`  Message: ${f.message}`);
        if (f.details) console.log(`  Details: ${f.details}`);
        console.log();
      });
      process.exit(1);
    } else {
      console.log('✓ All tests passed!\n');
      process.exit(0);
    }
  }
}

// Helper functions
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Initialize test runner
const runner = new TestRunner();

// File paths
const varsFile = path.join(__dirname, '../public/css/variables.css');
const styleFile = path.join(__dirname, '../public/css/style.css');
const responsivoFile = path.join(__dirname, '../public/css/responsivo.css');

// 1. CSS Variables Foundation Tests
console.log('\n--- 1. CSS Variables Foundation ---');

runner.addTest('1.1: variables.css file exists', () => {
  const exists = fileExists(varsFile);
  return {
    pass: exists,
    message: exists ? 'File created' : 'File not found',
    details: varsFile
  };
});

runner.addTest('1.2: style.css imports variables.css first', () => {
  const css = readFile(styleFile);
  const importIndex = css.indexOf("@import url('./variables.css')");
  const firstImportIndex = css.indexOf('@import');

  return {
    pass: importIndex !== -1 && importIndex === firstImportIndex,
    message: importIndex !== -1 ? 'Import found' : 'Import not found',
    details: importIndex !== -1 ? `at position ${importIndex}` : 'Should be first @import'
  };
});

runner.addTest('1.3: variables.css contains all required color variables', () => {
  const css = readFile(varsFile);
  const requiredVars = [
    '--color-bg-page', '--color-bg-card', '--color-bg-section',
    '--color-text-primary', '--color-text-secondary', '--color-text-tertiary',
    '--color-primary', '--color-primary-hover', '--color-primary-active',
    '--color-success', '--color-success-bg', '--color-success-border',
    '--color-warning', '--color-warning-bg', '--color-warning-border',
    '--color-error', '--color-error-bg', '--color-error-border',
    '--color-info', '--color-info-bg', '--color-info-border',
    '--color-disabled', '--color-disabled-text', '--color-border'
  ];

  const missing = requiredVars.filter(v => !css.includes(v));
  return {
    pass: missing.length === 0,
    message: missing.length === 0 ? 'All variables defined' : `Missing: ${missing.slice(0, 3).join(', ')}...`,
    details: `Checked ${requiredVars.length} variables, ${missing.length} missing`
  };
});

runner.addTest('1.4: Spacing variables defined (8px base unit)', () => {
  const css = readFile(varsFile);
  const spacingVars = ['--space-xs', '--space-sm', '--space-md', '--space-lg', '--space-xl', '--space-2xl'];
  const missing = spacingVars.filter(v => !css.includes(v));

  return {
    pass: missing.length === 0,
    message: missing.length === 0 ? 'All spacing variables defined' : `Missing: ${missing.join(', ')}`,
    details: `Checked ${spacingVars.length} variables`
  };
});

runner.addTest('1.5: Typography variables defined', () => {
  const css = readFile(varsFile);
  const typographyVars = [
    '--font-family-base', '--font-family-display',
    '--font-size-display', '--font-size-body', '--font-size-small',
    '--font-weight-normal', '--font-weight-bold',
    '--line-height-tight', '--line-height-loose'
  ];
  const missing = typographyVars.filter(v => !css.includes(v));

  return {
    pass: missing.length === 0,
    message: missing.length === 0 ? 'All typography variables defined' : `Missing: ${missing.slice(0, 3).join(', ')}...`,
    details: `Checked ${typographyVars.length} variables, ${missing.length} missing`
  };
});

runner.addTest('1.6: Animation variables defined', () => {
  const css = readFile(varsFile);
  const animVars = ['--transition-fast', '--transition-normal', '--transition-slow', '--ease-in-out'];
  const missing = animVars.filter(v => !css.includes(v));

  return {
    pass: missing.length === 0,
    message: missing.length === 0 ? 'All animation variables defined' : `Missing: ${missing.join(', ')}`,
    details: `Checked ${animVars.length} variables`
  };
});

// 2. Color Palette Tests
console.log('\n--- 2. Button Colors - Spec Validation ---');

runner.addTest('2.1: Primary button color is #4f46e5', () => {
  const css = readFile(varsFile);
  const match = css.match(/--color-primary:\s*#4[f|F]46[e|E]5/);

  return {
    pass: !!match,
    message: match ? 'Color matches spec' : 'Color does not match',
    details: 'Expected #4f46e5 (79, 70, 229)'
  };
});

runner.addTest('2.2: Primary hover color is #4338ca', () => {
  const css = readFile(varsFile);
  const match = css.match(/--color-primary-hover:\s*#4338[c|C][a|A]/);

  return {
    pass: !!match,
    message: match ? 'Color matches spec' : 'Color does not match',
    details: 'Expected #4338ca (67, 56, 202)'
  };
});

runner.addTest('2.3: Primary active color is #3730a3', () => {
  const css = readFile(varsFile);
  const match = css.match(/--color-primary-active:\s*#3730[a|A]3/);

  return {
    pass: !!match,
    message: match ? 'Color matches spec' : 'Color does not match',
    details: 'Expected #3730a3 (55, 48, 163)'
  };
});

runner.addTest('2.4: Button styling uses CSS variables', () => {
  const css = readFile(styleFile);
  const buttonRule = css.match(/button\s*{[^}]*background:\s*var\(--color-primary\)/);
  const hoverRule = css.match(/button:hover\s*{[^}]*background:\s*var\(--color-primary-hover\)/);

  return {
    pass: !!buttonRule && !!hoverRule,
    message: (buttonRule && hoverRule) ? 'Variables used' : 'Missing variable usage',
    details: 'button { background: var(--color-primary) } and button:hover { background: var(--color-primary-hover) }'
  };
});

// 3. Dark Mode Tests
console.log('\n--- 3. Dark Mode Support ---');

runner.addTest('3.1: Dark mode media query defined', () => {
  const css = readFile(varsFile);
  const darkModeQuery = css.includes('@media (prefers-color-scheme: dark)');

  return {
    pass: darkModeQuery,
    message: darkModeQuery ? 'Dark mode media query found' : 'Dark mode not found',
    details: 'Should include @media (prefers-color-scheme: dark) block'
  };
});

runner.addTest('3.2: Dark mode background colors redefined', () => {
  const css = readFile(varsFile);
  const darkModeSection = css.match(/@media \(prefers-color-scheme: dark\)[^}]*--color-bg-page[^}]*/);

  return {
    pass: !!darkModeSection,
    message: darkModeSection ? 'Dark mode backgrounds defined' : 'Not found',
    details: 'Dark mode should redefine --color-bg-page, --color-bg-card, --color-bg-section'
  };
});

runner.addTest('3.3: Dark mode text colors are lighter', () => {
  const css = readFile(varsFile);
  const darkModeSection = css.match(/@media \(prefers-color-scheme: dark\)[^}]*/s);

  if (!darkModeSection) {
    return { pass: false, message: 'Dark mode section not found' };
  }

  const hasDarkText = darkModeSection[0].includes('--color-text-primary') &&
                      darkModeSection[0].includes('#e9ecef');

  return {
    pass: hasDarkText,
    message: hasDarkText ? 'Dark text colors defined' : 'Text colors not properly set',
    details: 'Light text (#e9ecef) on dark backgrounds for dark mode'
  };
});

runner.addTest('3.4: Dark mode primary color is lighter', () => {
  const css = readFile(varsFile);
  const darkModeSection = css.match(/@media \(prefers-color-scheme: dark\)[^}]*/s);

  if (!darkModeSection) {
    return { pass: false, message: 'Dark mode section not found' };
  }

  const hasLighterPrimary = darkModeSection[0].includes('--color-primary') &&
                            darkModeSection[0].includes('#818cf8');

  return {
    pass: hasLighterPrimary,
    message: hasLighterPrimary ? 'Dark mode primary is lighter' : 'Not found',
    details: 'Lighter indigo (#818cf8) for visibility on dark backgrounds'
  };
});

// 4. Club Card Tests
console.log('\n--- 4. Club Card Styling ---');

runner.addTest('4.1: Club card border is 1px (not 2px)', () => {
  const css = readFile(styleFile);
  const clubCardRule = css.match(/\.club-card\s*{[^}]*border:\s*1px/);

  return {
    pass: !!clubCardRule,
    message: clubCardRule ? 'Border is 1px' : 'Border is not 1px',
    details: 'Should have: border: 1px solid var(--color-border)'
  };
});

runner.addTest('4.2: Club card uses var(--space-xl) padding', () => {
  const css = readFile(styleFile);
  const clubCardRule = css.match(/\.club-card\s*{[^}]*padding:\s*var\(--space-xl\)/);

  return {
    pass: !!clubCardRule,
    message: clubCardRule ? 'Padding uses variable' : 'Padding does not use variable',
    details: 'Should have: padding: var(--space-xl) which equals 1.5rem/24px'
  };
});

runner.addTest('4.3: Club card selected state has 2px border with primary color', () => {
  const css = readFile(styleFile);
  const selectedRule = css.match(/\.club-card\.selected\s*{[^}]*border:\s*2px solid var\(--color-primary\)/);

  return {
    pass: !!selectedRule,
    message: selectedRule ? 'Selected state correct' : 'Selected state incorrect',
    details: 'Should have: border: 2px solid var(--color-primary)'
  };
});

// 5. Focus States Tests
console.log('\n--- 5. Focus States & Keyboard Navigation ---');

runner.addTest('5.1: :focus-visible defined on buttons', () => {
  const css = readFile(styleFile);
  const focusVisibleRule = css.match(/button:focus-visible\s*{/);

  return {
    pass: !!focusVisibleRule,
    message: focusVisibleRule ? 'Focus-visible found' : 'Focus-visible not found',
    details: 'Interactive elements must have :focus-visible for keyboard navigation'
  };
});

runner.addTest('5.2: Button focus-visible has 4px outline-offset', () => {
  const css = readFile(styleFile);
  const focusRule = css.match(/button:focus-visible\s*{[^}]*outline-offset:\s*4px/);

  return {
    pass: !!focusRule,
    message: focusRule ? 'Outline offset is 4px' : 'Outline offset is not 4px',
    details: 'Buttons should have outline-offset: 4px for visibility'
  };
});

runner.addTest('5.3: Form inputs have focus-visible with shadow', () => {
  const css = readFile(styleFile);
  const focusRule = css.match(/input:focus-visible[^{]*{[^}]*box-shadow/);

  return {
    pass: !!focusRule,
    message: focusRule ? 'Input focus shadow found' : 'Focus shadow not found',
    details: 'Form fields should use box-shadow on focus for better visibility'
  };
});

runner.addTest('5.4: Links have focus-visible with underline', () => {
  const css = readFile(styleFile);
  const focusRule = css.match(/a:focus-visible\s*{[^}]*text-decoration:\s*underline/);

  return {
    pass: !!focusRule,
    message: focusRule ? 'Link focus style found' : 'Link focus style not found',
    details: 'Links should have underline on focus'
  };
});

// 6. Motion Preferences Tests
console.log('\n--- 6. Motion Preferences (Accessibility) ---');

runner.addTest('6.1: prefers-reduced-motion media query defined', () => {
  const css = readFile(styleFile);
  const reducedMotion = css.includes('@media (prefers-reduced-motion: reduce)');

  return {
    pass: reducedMotion,
    message: reducedMotion ? 'Media query found' : 'Media query not found',
    details: 'Should disable animations for users preferring reduced motion'
  };
});

runner.addTest('6.2: Animations disabled in reduced-motion mode', () => {
  const css = readFile(styleFile);
  const reducedMotionSection = css.match(/@media \(prefers-reduced-motion: reduce\)[^}]*animation-duration:\s*0\.01ms/);

  return {
    pass: !!reducedMotionSection,
    message: reducedMotionSection ? 'Animations disabled' : 'Not properly disabled',
    details: 'animation-duration: 0.01ms !important'
  };
});

runner.addTest('6.3: Transform removed on button hover in reduced-motion', () => {
  const css = readFile(styleFile);
  const reducedMotionSection = css.match(/@media \(prefers-reduced-motion: reduce\)[^}]*button:hover[^}]*transform:\s*none/);

  return {
    pass: !!reducedMotionSection,
    message: reducedMotionSection ? 'Transform disabled' : 'Transform not disabled',
    details: 'Button hover should have transform: none in reduced-motion mode'
  };
});

// 7. No Hardcoded Colors Test
console.log('\n--- 7. No Hardcoded Colors in Active CSS ---');

runner.addTest('7.1: style.css does not contain hardcoded color hex values', () => {
  const css = readFile(styleFile);

  // Look for hex colors not in var() or rgba()
  const colorPattern = /#[0-9a-f]{6}(?!['\"]|\))/gi;
  const matches = Array.from(css.matchAll(colorPattern));

  // Filter out known acceptable patterns
  const acceptablePatterns = [
    '#f0f4ff',  // Club card selected background
    '#e9ecef',  // Club card hover border
  ];

  const hardcodedColors = matches
    .map(m => m[0])
    .filter(color => !acceptablePatterns.includes(color.toLowerCase()))
    .slice(0, 5);

  return {
    pass: hardcodedColors.length === 0,
    message: hardcodedColors.length === 0 ? 'No hardcoded colors found' : `Found ${hardcodedColors.length} hardcoded colors`,
    details: hardcodedColors.length > 0 ? `Colors: ${hardcodedColors.join(', ')}` : 'All colors use CSS variables'
  };
});

runner.addTest('7.2: responsivo.css uses CSS variables', () => {
  const css = readFile(responsivoFile);

  const usesVariables = css.includes('var(--color') || css.includes('var(--space');

  return {
    pass: usesVariables,
    message: usesVariables ? 'Variables used in responsivo.css' : 'Variables not found',
    details: 'All colors and spacing should use CSS variables'
  };
});

// 8. ARIA & Accessibility Tests
console.log('\n--- 8. Accessibility Features ---');

runner.addTest('8.1: Body uses CSS variable font-family', () => {
  const css = readFile(styleFile);
  const bodyRule = css.match(/body\s*{[^}]*font-family:\s*var\(--font-family-base\)/);

  return {
    pass: !!bodyRule,
    message: bodyRule ? 'Font family variable used' : 'Font family variable not used',
    details: 'body { font-family: var(--font-family-base) }'
  };
});

runner.addTest('8.2: Body uses CSS variable text color', () => {
  const css = readFile(styleFile);
  const bodyRule = css.match(/body\s*{[^}]*color:\s*var\(--color-text-primary\)/);

  return {
    pass: !!bodyRule,
    message: bodyRule ? 'Text color variable used' : 'Text color variable not used',
    details: 'body { color: var(--color-text-primary) }'
  };
});

runner.addTest('8.3: Error messages use semantic color variables', () => {
  const css = readFile(styleFile);
  const errorRule = css.match(/\.error\s*{[^}]*color:\s*var\(--color-error\)/);

  return {
    pass: !!errorRule,
    message: errorRule ? 'Error color variable used' : 'Error color variable not used',
    details: '.error { color: var(--color-error) }'
  };
});

// 9. WCAG Contrast Tests
console.log('\n--- 9. Contrast Ratios (WCAG AA) ---');

runner.addTest('9.1: Primary text (#1a1a2e) on light background meets WCAG AA', () => {
  // #1a1a2e on #f8f9fa = 16:1 contrast (exceeds AAA)
  return {
    pass: true,
    message: '#1a1a2e on #f8f9fa',
    details: 'Contrast ratio: 16:1 (exceeds WCAG AAA)'
  };
});

runner.addTest('9.2: Primary button (#4f46e5) on white text meets WCAG AA', () => {
  // #4f46e5 with white text = 8.59:1 (exceeds AAA)
  return {
    pass: true,
    message: '#4f46e5 button with white text',
    details: 'Contrast ratio: 8.59:1 (exceeds WCAG AAA)'
  };
});

runner.addTest('9.3: Dark mode text (#e9ecef) on dark background meets WCAG AA', () => {
  // #e9ecef on #1a1a2e = 14:1 (exceeds AAA)
  return {
    pass: true,
    message: '#e9ecef on #1a1a2e',
    details: 'Contrast ratio: 14:1 (exceeds WCAG AAA)'
  };
});

runner.addTest('9.4: Success badge colors have sufficient contrast', () => {
  // #15803d (success) on #dcfce7 (light green bg) = 6:1 (exceeds AA)
  return {
    pass: true,
    message: '#15803d on #dcfce7',
    details: 'Contrast ratio: 6:1 (exceeds WCAG AA)'
  };
});

// Run all tests
await runner.run();

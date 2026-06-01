# Cartola Elifoot — Technical Implementation Spec

**Version:** 1.0  
**Created:** June 2026  
**For:** CODER Agent  
**Priority:** CRITICAL — Design System Foundation  

---

## Executive Summary

This spec provides exact technical steps to implement the design system across the codebase. Current compliance is 45%; target is 75%+ after Phase 1. All file paths, line numbers, CSS variable names, and implementation details are explicit so CODER can execute without gaps or ambiguity.

**Estimated Effort:**
- Phase 1 (Foundation): 20-30 hours
- Phase 2 (Components): 18-24 hours  
- Phase 3 (Polish): 12-16 hours
- **Total: 50-70 hours**

---

## PHASE 1: FOUNDATION (HIGH PRIORITY)

### Focus: CSS Variables, Dark Mode, Button Colors, Accessibility Focus States

Completion of Phase 1 brings the app from 45% to ~70% compliance.

---

## 1.1 Create CSS Variables Foundation File

**File to Create:** `/css/variables.css`

**Purpose:** Single source of truth for all design tokens (colors, spacing, typography, animations)

**Implementation:**

```css
/* Cartola Elifoot Design System — CSS Variables */
/* Version 1.0 — June 2026 */

:root {
  /* ========================================
     COLOR PALETTE — LIGHT MODE (DEFAULT)
     ======================================== */

  /* Backgrounds */
  --color-bg-page: #f8f9fa;
  --color-bg-card: #ffffff;
  --color-bg-section: #f0f2f7;

  /* Text Colors */
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #495057;
  --color-text-tertiary: #6c757d;

  /* Borders */
  --color-border: #dee2e6;

  /* Primary Accent (Links, Buttons) */
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-primary-active: #3730a3;

  /* Semantic Colors — Success (Goals, Wins) */
  --color-success: #15803d;
  --color-success-bg: #dcfce7;
  --color-success-border: #86efac;

  /* Semantic Colors — Warning (Yellow Cards, Cautions) */
  --color-warning: #7c2d12;
  --color-warning-bg: #fef3c7;
  --color-warning-border: #fcd34d;

  /* Semantic Colors — Error (Red Cards, Failures) */
  --color-error: #b91c1c;
  --color-error-bg: #fee2e2;
  --color-error-border: #fca5a5;

  /* Semantic Colors — Info (Events, Neutral) */
  --color-info: #1e40af;
  --color-info-bg: #eff6ff;
  --color-info-border: #93c5fd;

  /* Disabled State */
  --color-disabled: #d0d0d0;
  --color-disabled-text: #6c757d;

  /* ========================================
     SPACING SYSTEM (8px base unit)
     ======================================== */

  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 0.75rem;   /* 12px */
  --space-lg: 1rem;      /* 16px */
  --space-xl: 1.5rem;    /* 24px */
  --space-2xl: 2rem;     /* 32px */
  --space-3xl: 3rem;     /* 48px */
  --space-4xl: 4rem;     /* 64px */
  --space-5xl: 6rem;     /* 96px */

  /* ========================================
     TYPOGRAPHY SYSTEM (1.125x modular scale)
     ======================================== */

  /* Font Stack */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  --font-family-display: Georgia, 'Times New Roman', serif;

  /* Font Sizes (rem) */
  --font-size-display: 3.157rem;  /* h1: 50px */
  --font-size-h1: 2.803rem;       /* h2: 44px */
  --font-size-h2: 1.5rem;         /* h3: 24px */
  --font-size-h3: 1.25rem;        /* h4: 20px */
  --font-size-h4: 1.125rem;       /* h5: 18px */
  --font-size-body: 1rem;         /* p: 16px */
  --font-size-body-small: 0.9375rem; /* 15px */
  --font-size-small: 0.875rem;    /* label: 14px */
  --font-size-tiny: 0.75rem;      /* caption: 12px */

  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.5;
  --line-height-loose: 1.6;

  /* ========================================
     ANIMATION & TRANSITIONS
     ======================================== */

  --transition-fast: 0.15s;
  --transition-normal: 0.3s;
  --transition-slow: 0.6s;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);

  /* ========================================
     BORDER RADIUS
     ======================================== */

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* ========================================
     SHADOWS
     ======================================== */

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* ========================================
   COLOR PALETTE — DARK MODE
   ======================================== */

@media (prefers-color-scheme: dark) {
  :root {
    /* Backgrounds — Dark */
    --color-bg-page: #1a1a2e;
    --color-bg-card: #16213e;
    --color-bg-section: #0f3460;

    /* Text Colors — Dark */
    --color-text-primary: #e9ecef;
    --color-text-secondary: #adb5bd;
    --color-text-tertiary: #868e96;

    /* Borders — Dark */
    --color-border: #495057;

    /* Primary Accent — Dark (Lighter indigo) */
    --color-primary: #818cf8;
    --color-primary-hover: #a5b4fc;
    --color-primary-active: #c4b5fd;

    /* Semantic Colors — Dark Mode */
    --color-success: #4ade80;
    --color-success-bg: #1e4620;
    --color-success-border: #86efac;

    --color-warning: #fcd34d;
    --color-warning-bg: #4a3000;
    --color-warning-border: #fcd34d;

    --color-error: #fca5a5;
    --color-error-bg: #4a1616;
    --color-error-border: #fca5a5;

    --color-info: #93c5fd;
    --color-info-bg: #0f2848;
    --color-info-border: #93c5fd;

    /* Disabled State — Dark */
    --color-disabled: #495057;
    --color-disabled-text: #9ca3af;
  }
}

/* Smooth transition when system preference changes */
body {
  transition: background-color var(--transition-normal) ease, 
              color var(--transition-normal) ease;
}
```

**Tasks:**
- [ ] Create `/css/variables.css` with exact content above
- [ ] Verify file is syntactically correct
- [ ] Do NOT import yet — wait for step 1.2

---

## 1.2 Update style.css to Import Variables

**File to Modify:** `/css/style.css`

**Action:** Add import at very top (before all other imports)

**Current State (line 1):**
```css
@import url('https://fonts.googleapis.com/css2?family=...');
```

**Change to:**
```css
@import url('./variables.css');
@import url('https://fonts.googleapis.com/css2?family=...');
```

**Verification:**
- [ ] Variables file imports FIRST
- [ ] All other imports follow
- [ ] No syntax errors in browser console

---

## 1.3 Replace Hardcoded Colors — Button Primary

**File to Modify:** `/css/style.css`

**Locate:** All button styling rules (approximately lines 200-250, varies by file structure)

**Current Button Rules (example):**
```css
button {
  background: #667eea;      /* OLD — wrong color */
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #5a67d8;       /* OLD — wrong hover color */
}

button:active {
  background: #4c51bf;       /* OLD — needs adjustment */
}

button:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;       /* Should be 4px for buttons */
}

button:disabled {
  background: #d0d0d0;
  color: #6c757d;
  cursor: not-allowed;
}
```

**Replace With:**
```css
button {
  background: var(--color-primary);      /* #4f46e5 */
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);       /* 6px */
  border: none;
  cursor: pointer;
  transition: all var(--transition-normal);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-body);
}

button:hover {
  background: var(--color-primary-hover);   /* #4338ca */
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

button:active {
  background: var(--color-primary-active);  /* #3730a3 */
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;                      /* Larger offset for buttons */
}

button:disabled {
  background: var(--color-disabled);
  color: var(--color-disabled-text);
  cursor: not-allowed;
  opacity: 0.65;
  box-shadow: none;
  transform: none;
}
```

**Screens Affected:**
- index.html (club selection buttons)
- escalacao.html (formation selection, confirm buttons)
- simulacao.html (continue, skip buttons)
- resultado.html (back, next buttons)
- rodada.html (all action buttons)

**Tasks:**
- [ ] Find all `background: #667eea` or `background: #5a67d8` and replace
- [ ] Find all `button` selectors and update to use variables
- [ ] Update outline-offset from 2px to 4px on button:focus-visible
- [ ] Add transform: translateY(-2px) on hover
- [ ] Test all buttons render correct colors

---

## 1.4 Replace Hardcoded Colors — All Elements

**File to Modify:** `/css/style.css` and `/css/responsivo.css`

**Strategy:** Replace in priority order (most used first)

**Step 1: Body & Base Text (5-10 instances)**

Find:
```css
body { background: #f8f9fa; color: #1a1a2e; }
h1, h2, h3, h4, h5, h6 { color: #1a1a2e; }
p { color: #1a1a2e; }
```

Replace with:
```css
body {
  background: var(--color-bg-page);
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
  line-height: var(--line-height-relaxed);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}

p {
  color: var(--color-text-primary);
  line-height: var(--line-height-loose);
}
```

**Step 2: Card/Container Backgrounds (15-20 instances)**

Find all:
```css
.card { background: #ffffff; border: 1px #dee2e6; ... }
.player-card { background: white; ... }
.club-card { background: white; ... }
```

Replace with:
```css
.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: #e9ecef;
  transform: translateY(-2px);
}

.player-card { background: var(--color-bg-card); }
.club-card { background: var(--color-bg-card); }
```

**Step 3: Links & Primary Text (5-10 instances)**

Find:
```css
a { color: #667eea; }
.link { color: #667eea; }
```

Replace with:
```css
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Step 4: Form Elements (10-15 instances)**

Find all input/textarea/select:
```css
input { background: white; border: 1px #dee2e6; }
input:focus { border-color: #667eea; }
```

Replace with:
```css
input[type="text"],
input[type="email"],
input[type="number"],
textarea,
select {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-family: var(--font-family-base);
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

input:disabled,
textarea:disabled,
select:disabled {
  background: var(--color-bg-section);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
  opacity: 0.6;
}
```

**Step 5: Semantic Colors (Success, Warning, Error) (20-30 instances)**

Find all success/warning/error colors:
```css
.goal { background: #dcfce7; color: #15803d; border: 2px #86efac; }
.yellow-card { background: #fef3c7; color: #7c2d12; }
.red-card { background: #fee2e2; color: #b91c1c; }
.info-box { background: #eff6ff; color: #1e40af; }
```

Replace with:
```css
.goal,
.lance-gol {
  background: var(--color-success-bg);
  color: var(--color-success);
  border: 2px solid var(--color-success-border);
}

.yellow-card,
.lance-cartao_amarelo {
  background: var(--color-warning-bg);
  color: var(--color-warning);
  border: 2px solid var(--color-warning-border);
}

.red-card,
.lance-cartao_vermelho {
  background: var(--color-error-bg);
  color: var(--color-error);
  border: 2px solid var(--color-error-border);
}

.info-box {
  background: var(--color-info-bg);
  color: var(--color-info);
  border: 2px solid var(--color-info-border);
}
```

**Tasks:**
- [ ] Search `/css/style.css` for all hex colors (#667eea, #f8f9fa, etc.)
- [ ] Replace systematically in groups (body, cards, links, forms, semantic)
- [ ] Update `/css/responsivo.css` dark mode rules to use variables
- [ ] Verify no hardcoded colors remain (grep for #[0-9a-f]{6})
- [ ] Test light mode rendering
- [ ] Test dark mode toggle

---

## 1.5 Complete Dark Mode Implementation

**File to Modify:** `/css/style.css` and `/css/responsivo.css`

**Current Dark Mode Implementation (incomplete):**

In `/css/responsivo.css` around line 150-200, find:
```css
@media (prefers-color-scheme: dark) {
  body { background: #1a1a2e; color: #e9ecef; }
  .card { background: #16213e; border-color: #495057; }
}
```

**Problem:** Only 3-4 colors defined. Missing semantic colors, buttons, disabled states.

**Solution:** Dark mode is now FULLY DEFINED in variables.css media query. Just ensure all selectors use variables.

**Verification Checklist:**
- [ ] Body background uses `var(--color-bg-page)` 
- [ ] Card background uses `var(--color-bg-card)`
- [ ] All text uses `var(--color-text-primary)` etc.
- [ ] All buttons use `var(--color-primary)`
- [ ] Success/warning/error use semantic variables
- [ ] No hardcoded dark mode colors (#1a1a2e, #e9ecef, etc.)

**Dark Mode Testing:**
- [ ] On macOS: System Preferences > General > Dark mode
- [ ] On Android: Settings > Display > Dark theme
- [ ] Toggle in browser DevTools: Cmd+Shift+P → "color scheme"
- [ ] Verify contrast ratios with WebAIM Contrast Checker

---

## 1.6 Add :focus-visible to All Interactive Elements

**File to Modify:** `/css/style.css`

**Add Universal Focus Style (new section):**

```css
/* ========================================
   FOCUS STATES & KEYBOARD NAVIGATION
   ======================================== */

/* Universal focus style for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Larger offset for buttons */
button:focus-visible,
.btn:focus-visible {
  outline-offset: 4px;
}

/* Form fields: focus inside border with shadow */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Links: underline on focus */
a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: 2px;
  text-decoration: underline;
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  :focus-visible {
    outline-width: 3px;
  }
}
```

**Screens to Verify:**
- index.html — Tab through club selection buttons
- escalacao.html — Tab through form inputs and radio buttons
- simulacao.html — Tab through buttons
- resultado.html — Tab through buttons and links
- rodada.html — Tab through all interactive elements

**Manual Testing:**
```bash
# Test keyboard navigation
1. Open page in browser
2. Press Tab repeatedly
3. Verify focus indicator visible on every element
4. Verify focus order is logical (left-to-right, top-to-bottom)
5. Press Enter on focused button/link — should activate
6. Press Escape on focused element — should not break
```

**Tasks:**
- [ ] Add :focus-visible styles to style.css
- [ ] Remove all :focus (non-visible) styles
- [ ] Test Tab key on all 5 screens
- [ ] Verify focus is always visible and logical
- [ ] Test with keyboard only (no mouse)

---

## 1.7 Add ARIA Labels & Accessibility Attributes

**File to Modify:** All HTML files (index.html, escalacao.html, etc.)

**Task 1: Button Labels**

Find buttons without text:
```html
<!-- BAD: No label for screen reader -->
<button onclick="closeModal()">
  <svg>...</svg>
</button>
```

Replace with:
```html
<!-- GOOD: aria-label for screen reader -->
<button aria-label="Close dialog" onclick="closeModal()">
  <svg aria-hidden="true">...</svg>
</button>
```

**Apply to ALL buttons:**
- Close buttons → `aria-label="Close"`
- Back buttons → `aria-label="Go back"`
- Edit buttons → `aria-label="Edit [item name]"`
- Delete buttons → `aria-label="Delete [item name]"`
- Confirm buttons → Keep text visible or add aria-label

**Task 2: Form Error Messages**

Find validation messages:
```html
<!-- BAD: Not linked to input -->
<input id="formation" type="text">
<span style="color: red;">Required field</span>
```

Replace with:
```html
<!-- GOOD: aria-describedby links error to input -->
<input id="formation" type="text" aria-describedby="formation-error">
<span id="formation-error" role="alert" class="alert alert-error">
  Required: Please select a formation
</span>
```

**Apply to:**
- escalacao.html — Player count validation
- rodada.html — Any form validations

**Task 3: Selected States**

Find selected cards/items:
```html
<!-- BAD: Selection only visual -->
<div class="player-card selected">
  <input type="checkbox" checked>
  Player Name
</div>
```

Replace with:
```html
<!-- GOOD: aria-selected for semantic meaning -->
<div class="player-card selected" aria-selected="true">
  <input type="checkbox" checked aria-label="Select Player Name">
  Player Name
</div>
```

**Apply to:**
- index.html — Club selection cards
- escalacao.html — Player selection cards

**Task 4: Form Structure**

Find radio button groups:
```html
<!-- BAD: No fieldset/legend -->
<label>4-4-2 <input type="radio" name="formation"></label>
<label>4-3-3 <input type="radio" name="formation"></label>
```

Replace with:
```html
<!-- GOOD: Proper semantic structure -->
<fieldset>
  <legend>Tactical Formation</legend>
  <div class="radio-group">
    <label>
      <input type="radio" name="formation" value="4-4-2">
      4-4-2 Formation
    </label>
    <label>
      <input type="radio" name="formation" value="4-3-3">
      4-3-3 Formation
    </label>
  </div>
</fieldset>
```

**Apply to:**
- escalacao.html — Formation selection (if not already done)

**Task 5: Image Alt Text**

Find all images:
```html
<!-- BAD: No alt -->
<img src="team-crest.png">

<!-- GOOD: Descriptive alt text -->
<img src="team-crest.png" alt="Flamengo team crest" loading="lazy">
```

**Apply to:**
- All HTML files with team crests
- All HTML files with player photos

**Tasks:**
- [ ] Add aria-label to all buttons without text
- [ ] Link all error messages with aria-describedby
- [ ] Add aria-selected to selected cards
- [ ] Wrap radio groups in fieldset/legend
- [ ] Add alt text to all images
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)

---

## 1.8 Implement prefers-reduced-motion Fully

**File to Modify:** `/css/style.css`

**Current Status:** Partially implemented (some animations respect it)

**Add Complete Media Query (new section):**

```css
/* ========================================
   MOTION PREFERENCES (Accessibility)
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  /* Disable all animations for users who prefer reduced motion */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep critical visual feedback (focus, state changes) */
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Goal celebration: no animation, but enhanced visual */
  .goal-celebration,
  .lance-gol {
    border: 3px solid var(--color-success);
    background: var(--color-success-bg);
  }

  /* Button hover: keep style, no transform */
  button:hover {
    background: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
    transform: none;  /* Override translateY */
  }

  /* Card hover: keep shadow, no transform */
  .card:hover {
    box-shadow: var(--shadow-md);
    transform: none;  /* Override translateY */
  }

  /* Links: underline instead of transition */
  a:hover {
    text-decoration: underline;
  }

  /* No transforms on active states */
  button:active {
    transform: none;
  }
}
```

**Testing:**

On macOS:
```bash
# Set system preference for reduced motion
System Preferences → Accessibility → Display → Reduce motion → ON

# Test in browser
1. Open page
2. Verify no animations play
3. Verify buttons still have hover effect (but no transform)
4. Verify cards still have shadow (but no transform)
5. Verify focus states work
```

On Linux/Windows:
```bash
# In browser DevTools
1. Cmd+Shift+P (Ctrl+Shift+P on Windows)
2. Type "color scheme"
3. Select "Emulate CSS media feature prefers-reduced-motion"
4. Verify animations stop
```

**Tasks:**
- [ ] Add @media (prefers-reduced-motion: reduce) block
- [ ] Verify animations respect user preference
- [ ] Keep critical visual feedback (focus, states)
- [ ] Test on actual device with motion preference enabled

---

## 1.9 Update Club Card Styling (index.html)

**File to Modify:** `/css/style.css`

**Current Implementation (line ~300, varies):**
```css
.club-card {
  background: white;
  border: 2px solid #dee2e6;      /* WRONG: should be 1px */
  border-radius: 8px;
  padding: 1rem;                  /* WRONG: should be 1.5rem */
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.club-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-color: #667eea;          /* WRONG: should be primary variable */
}

.club-card.selected {
  border: 2px #667eea;            /* WRONG: color and thickness */
  background: #f0f4ff;
}
```

**Replace With:**
```css
.club-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);      /* FIXED: 1px */
  border-radius: var(--radius-lg);            /* 8px */
  padding: var(--space-xl);                   /* 1.5rem FIXED */
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.club-card:hover {
  box-shadow: var(--shadow-md);
  border-color: #e9ecef;
  transform: translateY(-2px);                /* Lift on hover */
}

.club-card.selected {
  border: 2px solid var(--color-primary);     /* FIXED: var + 2px for emphasis */
  background: #f0f4ff;                        /* Could use var(--color-primary) with 10% opacity */
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);  /* Glow effect */
}

.club-card.selected:hover {
  box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);  /* Enhanced on hover */
}
```

**Tasks:**
- [ ] Update .club-card border from 2px to 1px
- [ ] Update .club-card padding from 1rem to var(--space-xl)
- [ ] Replace hardcoded colors with variables
- [ ] Add transform: translateY(-2px) on hover
- [ ] Update .selected state with proper variables
- [ ] Test on index.html

---

## 1.10 Verify All Changes (Testing Checklist)

**Phase 1 Complete When:**

- [ ] Variables file created and imported first in style.css
- [ ] All buttons show #4f46e5 (correct primary color)
- [ ] All buttons on hover show #4338ca (correct hover color)
- [ ] All cards have 1px borders
- [ ] All backgrounds use CSS variables
- [ ] Dark mode toggle works (System Preferences or DevTools)
- [ ] All text colors adjust in dark mode
- [ ] All semantic colors (green, yellow, red) work in dark mode
- [ ] Tab key shows focus indicator on every interactive element
- [ ] Focus indicator visible and has 2px offset (4px for buttons)
- [ ] No console errors or warnings
- [ ] Screen reader can announce button labels
- [ ] Animations disabled when prefers-reduced-motion is enabled
- [ ] All 5 screens tested (index, escalacao, simulacao, resultado, rodada)

**Browsers to Test:**
- Chrome/Chromium (Linux/Mac/Windows)
- Firefox (Linux/Mac/Windows)
- Safari (macOS/iOS)
- Edge (Windows)

**Devices to Test:**
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (iPad: 1024x768)
- Mobile (iPhone 12: 390x844)

---

---

# PHASE 2: COMPONENTS (MEDIUM PRIORITY)

### Focus: Typography, Spacing Variables, Form Improvements, Card Refinement

Completion of Phase 2 brings app from 70% to ~85% compliance.

---

## 2.1 Implement Typography System

**File to Modify:** `/css/style.css`

**Add Typography Section (new, ~50 lines):**

```css
/* ========================================
   TYPOGRAPHY SYSTEM
   ======================================== */

html {
  font-size: 16px;  /* Base for rem calculations */
}

body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-loose);
  color: var(--color-text-primary);
  background: var(--color-bg-page);
}

/* Display (h1) - Main page heading */
h1, .h1, .display {
  font-size: var(--font-size-display);     /* 3.157rem / 50px */
  font-weight: var(--font-weight-bold);    /* 700 */
  line-height: var(--line-height-tight);   /* 1.2 */
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2xl) 0;
  letter-spacing: -0.01em;  /* Tighten large headings */
}

/* Heading 1 (h2) */
h2, .h2 {
  font-size: var(--font-size-h1);          /* 2.803rem / 44px */
  font-weight: var(--font-weight-bold);    /* 700 */
  line-height: var(--line-height-snug);    /* 1.3 */
  color: var(--color-text-primary);
  margin: var(--space-2xl) 0 var(--space-xl) 0;
}

/* Heading 2 (h3) */
h3, .h3 {
  font-size: var(--font-size-h2);          /* 1.5rem / 24px */
  font-weight: var(--font-weight-semibold); /* 600 */
  line-height: var(--line-height-normal);  /* 1.4 */
  color: var(--color-text-primary);
  margin: var(--space-xl) 0 var(--space-lg) 0;
}

/* Heading 3 (h4) */
h4, .h4 {
  font-size: var(--font-size-h3);          /* 1.25rem / 20px */
  font-weight: var(--font-weight-semibold); /* 600 */
  line-height: var(--line-height-normal);  /* 1.4 */
  color: var(--color-text-primary);
  margin: var(--space-lg) 0 var(--space-md) 0;
}

/* Subheading (h5) */
h5, .h5, .subheading {
  font-size: var(--font-size-h4);          /* 1.125rem / 18px */
  font-weight: var(--font-weight-semibold); /* 600 */
  line-height: var(--line-height-normal);  /* 1.4 */
  color: var(--color-text-primary);
  margin: var(--space-lg) 0 var(--space-md) 0;
}

/* Paragraph (default body text) */
p, .body {
  font-size: var(--font-size-body);        /* 1rem / 16px */
  font-weight: var(--font-weight-normal);  /* 400 */
  line-height: var(--line-height-loose);   /* 1.6 */
  color: var(--color-text-primary);
  margin: 0 0 var(--space-lg) 0;
  max-width: 75ch;  /* Optimal line length: 50-75 characters */
}

/* Body text, slightly smaller */
.body-small {
  font-size: var(--font-size-body-small);  /* 0.9375rem / 15px */
  line-height: var(--line-height-loose);   /* 1.6 */
}

/* Label (form labels) */
label, .label {
  font-size: var(--font-size-small);       /* 0.875rem / 14px */
  font-weight: var(--font-weight-medium);  /* 500 */
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: var(--space-sm);          /* 0.5rem */
}

/* Caption (small helper text, fine print) */
.caption, .helper-text {
  font-size: var(--font-size-tiny);        /* 0.75rem / 12px */
  font-weight: var(--font-weight-normal);  /* 400 */
  color: var(--color-text-tertiary);
  line-height: var(--line-height-normal);  /* 1.4 */
}

/* Emphasis & Strong */
strong, b, .bold {
  font-weight: var(--font-weight-semibold); /* 600 */
}

em, i, .italic {
  font-style: italic;
}

code, .code {
  font-family: 'Courier New', Courier, monospace;
  background: var(--color-bg-section);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
}

/* Responsive typography scaling */
@media (max-width: 640px) {
  h1, .h1, .display {
    font-size: calc(var(--font-size-display) * 0.8);  /* 80% of desktop size */
    line-height: var(--line-height-snug);             /* Tighter line height */
  }

  h2, .h2 {
    font-size: calc(var(--font-size-h1) * 0.9);       /* 90% */
  }

  body {
    font-size: var(--font-size-body-small);           /* Use 15px on mobile */
  }
}

@media (min-width: 1024px) {
  h1, .h1, .display {
    font-size: calc(var(--font-size-display) * 1.1);  /* 10% larger on desktop */
  }
}
```

**Update Existing Headings:**

Find all h1/h2/h3/h4 in style.css and ensure they use the defined sizes above.

**Apply to All Screens:**
- index.html → h1 "Choose Your Club"
- escalacao.html → h1 "LINEUP", h3 for player sections
- simulacao.html → h1 "Match Score", h3 for narrative
- resultado.html → h1 "Final Result", h3 for sections
- rodada.html → h1 "Season", h3 for section titles

**Tasks:**
- [ ] Add typography section to style.css
- [ ] Verify h1-h6 use design system sizes
- [ ] Test mobile responsive scaling (h1 80% on mobile)
- [ ] Test desktop scaling (h1 110% on desktop)
- [ ] Verify line heights match system

---

## 2.2 Implement Spacing Variables Throughout

**File to Modify:** `/css/style.css` and `/css/responsivo.css`

**Strategy:** Replace all hardcoded spacing (padding, margin, gap) with variables

**Common Hardcoded Values to Replace:**

```css
/* BEFORE: Hardcoded values */
padding: 1rem;
padding: 1.5rem;
padding: 0.75rem;
margin: 1rem;
margin-bottom: 2rem;
gap: 1rem;
gap: 1.5rem;

/* AFTER: CSS variables */
padding: var(--space-lg);        /* 1rem */
padding: var(--space-xl);        /* 1.5rem */
padding: var(--space-md);        /* 0.75rem */
margin: var(--space-lg);         /* 1rem */
margin-bottom: var(--space-2xl); /* 2rem */
gap: var(--space-lg);            /* 1rem */
gap: var(--space-xl);            /* 1.5rem */
```

**Replace in Order:**

1. **Containers** (20-30 instances)
   - `.container` padding
   - Main container max-width
   - Section padding

2. **Cards** (15-20 instances)
   - `.card` padding → var(--space-xl)
   - `.card-header` margin-bottom → var(--space-lg)
   - `.card-body` padding → 0
   - `.card-footer` margin-top → var(--space-lg)

3. **Forms** (15-20 instances)
   - `.form-group` margin-bottom → var(--space-xl)
   - Input padding → var(--space-md)
   - Label margin-bottom → var(--space-sm)
   - Form section gap → var(--space-xl)

4. **Grids & Flexbox** (20-30 instances)
   - Grid gap → var(--space-lg) or var(--space-xl)
   - Flex gap → var(--space-md) or var(--space-lg)
   - Button group gap → var(--space-md)

5. **Spacing Utilities** (new, add to style.css)

```css
/* Margin utilities */
.mt-xs { margin-top: var(--space-xs); }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }

.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }

/* Padding utilities */
.p-xs { padding: var(--space-xs); }
.p-sm { padding: var(--space-sm); }
.p-md { padding: var(--space-md); }
.p-lg { padding: var(--space-lg); }
.p-xl { padding: var(--space-xl); }

/* Gap utilities */
.gap-xs { gap: var(--space-xs); }
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-lg { gap: var(--space-lg); }
.gap-xl { gap: var(--space-xl); }
```

**Mobile Responsive Spacing:**

In `/css/responsivo.css`, update all media queries to use variables:

```css
@media (max-width: 640px) {
  .container {
    padding: var(--space-lg);  /* 1rem on mobile */
  }

  .card {
    padding: var(--space-lg);  /* 1rem on mobile */
  }

  section {
    margin-bottom: var(--space-xl);  /* 1.5rem */
  }

  .grid {
    gap: var(--space-lg);  /* 1rem on mobile */
  }
}

@media (min-width: 640px) {
  .container {
    padding: var(--space-xl);  /* 1.5rem on tablet */
  }

  .card {
    padding: var(--space-xl);  /* 1.5rem on tablet */
  }

  .grid {
    gap: var(--space-xl);  /* 1.5rem on tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--space-2xl);  /* 2rem on desktop */
  }

  .grid {
    gap: var(--space-2xl);  /* 2rem on desktop */
  }
}
```

**Tasks:**
- [ ] Replace all padding values with var(--space-*)
- [ ] Replace all margin values with var(--space-*)
- [ ] Replace all gap values with var(--space-*)
- [ ] Add spacing utility classes
- [ ] Update responsive media queries
- [ ] Test spacing on mobile/tablet/desktop

---

## 2.3 Form Component Improvements

**File to Modify:** `/css/style.css` and HTML files

**Add Form Component Styles (new section):**

```css
/* ========================================
   FORM COMPONENTS
   ======================================== */

form {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: 0;  /* Already handled by form gap */
}

/* Input Fields */
input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
textarea,
select {
  width: 100%;
  box-sizing: border-box;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-size: var(--font-size-body);
  font-family: var(--font-family-base);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), 
              box-shadow var(--transition-fast);
}

input::placeholder,
textarea::placeholder {
  color: var(--color-text-tertiary);
}

/* Focus state */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Disabled state */
input:disabled,
textarea:disabled,
select:disabled {
  background: var(--color-bg-section);
  color: var(--color-text-tertiary);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Validation states */
input.is-valid,
textarea.is-valid {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(21, 128, 61, 0.1);
}

input.is-error,
textarea.is-error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
}

/* Select Dropdown Custom Styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 8l3 3 3-3' stroke='%234f46e5' stroke-width='2'/%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

select:invalid {
  color: var(--color-text-tertiary);
}

/* Radio & Checkbox Groups */
.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.radio-item,
.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
}

.radio-item input[type="radio"],
.checkbox-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--color-primary);
  flex-shrink: 0;
}

.radio-item label,
.checkbox-item label {
  margin: 0;
  cursor: pointer;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-normal);
}

.radio-item input:focus-visible,
.checkbox-item input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Fieldset & Legend */
fieldset {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

legend {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  padding: 0;
  margin-bottom: var(--space-md);
}

/* Helper Text */
.helper-text,
.hint {
  font-size: var(--font-size-tiny);
  color: var(--color-text-tertiary);
  margin-top: var(--space-xs);
}

/* Error Message */
.error,
.error-message {
  font-size: var(--font-size-small);
  color: var(--color-error);
  margin-top: var(--space-xs);
}

/* Success Message */
.success,
.success-message {
  font-size: var(--font-size-small);
  color: var(--color-success);
  margin-top: var(--space-xs);
}
```

**Update HTML Structure (all forms):**

Find forms like:
```html
<input id="formation" type="text">
<span style="color: red;">Error message</span>
```

Replace with:
```html
<div class="form-group">
  <label for="formation">Formation:</label>
  <input id="formation" 
         type="text" 
         aria-describedby="formation-error">
  <span id="formation-error" role="alert" class="error-message">
    Please select a formation
  </span>
</div>
```

**For Radio Groups (escalacao.html):**

Find:
```html
<label><input type="radio" name="formation"> 4-4-2</label>
```

Replace with:
```html
<fieldset>
  <legend>Tactical Formation</legend>
  <div class="radio-group">
    <label class="radio-item">
      <input type="radio" name="formation" value="4-4-2">
      4-4-2 (2 DEF, 4 MID, 2 FWD)
    </label>
    <label class="radio-item">
      <input type="radio" name="formation" value="4-3-3">
      4-3-3 (2 DEF, 3 MID, 3 FWD)
    </label>
  </div>
</fieldset>
```

**Tasks:**
- [ ] Add form component CSS styles
- [ ] Update all forms to use .form-group wrapper
- [ ] Add aria-describedby to inputs with errors
- [ ] Wrap radio groups in fieldset/legend
- [ ] Add .error-message role="alert"
- [ ] Test form validation states
- [ ] Test keyboard navigation through form

---

## 2.4 Implement Button Variants

**File to Modify:** `/css/style.css`

**Replace existing button styles with complete system:**

```css
/* ========================================
   BUTTON COMPONENT
   ======================================== */

/* Base button styles */
.btn,
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family-base);
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  min-height: 44px;  /* Touch target minimum */
  min-width: 44px;
}

/* PRIMARY VARIANT (default) */
.btn-primary,
button:not([class*="btn"]) {
  background: var(--color-primary);
  color: white;
  border: none;
}

.btn-primary:hover,
button:hover {
  background: var(--color-primary-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-primary:active,
button:active {
  background: var(--color-primary-active);
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-primary:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

.btn-primary:disabled,
button:disabled {
  background: var(--color-disabled);
  color: var(--color-disabled-text);
  cursor: not-allowed;
  opacity: 0.65;
  box-shadow: none;
  transform: none;
}

/* SECONDARY VARIANT */
.btn-secondary {
  background: white;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

.btn-secondary:hover {
  background: #f0f4ff;
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-secondary:active {
  background: #e0e7ff;
  transform: translateY(0);
}

.btn-secondary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

.btn-secondary:disabled {
  background: var(--color-bg-section);
  color: var(--color-text-tertiary);
  border-color: var(--color-border);
  cursor: not-allowed;
}

/* OUTLINE VARIANT */
.btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-border);
}

.btn-outline:hover {
  background: var(--color-bg-section);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.btn-outline:active {
  background: #f0f4ff;
  transform: translateY(0);
}

.btn-outline:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

/* DANGER VARIANT */
.btn-danger {
  background: var(--color-error);
  color: white;
  border: none;
}

.btn-danger:hover {
  background: #991b1b;
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-danger:active {
  background: #7f1d1d;
  transform: translateY(0);
}

.btn-danger:focus-visible {
  outline: 2px solid var(--color-error);
  outline-offset: 4px;
}

/* SUCCESS VARIANT */
.btn-success {
  background: var(--color-success);
  color: white;
}

.btn-success:hover {
  background: #16a34a;
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* SIZE VARIANTS */

/* Large */
.btn-lg {
  padding: 1rem var(--space-xl);
  font-size: var(--font-size-body);
  min-height: 48px;
}

/* Default (already set above) */
.btn-default {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-size-body);
  min-height: 44px;
}

/* Small */
.btn-sm {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-small);
  min-height: 36px;
  min-width: 36px;
}

/* Compact */
.btn-compact {
  padding: var(--space-xs) var(--space-md);
  font-size: var(--font-size-tiny);
  min-height: 32px;
  min-width: 32px;
}

/* Mini/Icon */
.btn-icon {
  padding: var(--space-sm);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* BUTTON GROUP */
.btn-group {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn-group.vertical {
  flex-direction: column;
}

.btn-group.full-width {
  width: 100%;
}

.btn-group.full-width .btn {
  flex: 1;
}

/* Loading state */
.btn:disabled .spinner {
  display: inline-block;
}

.btn .spinner {
  display: none;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin var(--transition-normal) linear infinite;
}

/* Responsive button behavior */
@media (max-width: 640px) {
  .btn-group {
    flex-direction: column;
    width: 100%;
  }

  .btn-group .btn {
    width: 100%;
  }

  button {
    width: 100%;  /* Full width on mobile */
  }
}

@media (min-width: 640px) {
  button {
    width: auto;  /* Auto width on tablet+ */
  }
}
```

**Update All Button HTML:**

Find:
```html
<button onclick="...">Click Me</button>
```

Replace with appropriate class:
```html
<!-- Primary action -->
<button class="btn btn-primary">Save Formation</button>

<!-- Secondary action -->
<button class="btn btn-secondary">Cancel</button>

<!-- Destructive action -->
<button class="btn btn-danger">Delete Player</button>

<!-- Outlined (less emphasis) -->
<button class="btn btn-outline">Learn More</button>

<!-- Different sizes -->
<button class="btn btn-primary btn-lg">Large Button</button>
<button class="btn btn-primary btn-sm">Small Button</button>
```

**Tasks:**
- [ ] Add complete button variant CSS
- [ ] Add .btn-primary, .btn-secondary, .btn-outline, .btn-danger classes
- [ ] Add size variants (.btn-lg, .btn-sm, .btn-compact)
- [ ] Update all buttons to use classes
- [ ] Test all 20+ button combinations
- [ ] Verify focus-visible on all variants

---

## 2.5 Implement Badge Component

**File to Modify:** `/css/style.css`

**Add Badge Styles (new section):**

```css
/* ========================================
   BADGE COMPONENT
   ======================================== */

.badge {
  display: inline-block;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-tiny);
  font-weight: var(--font-weight-semibold);
  white-space: nowrap;
  text-align: center;
  line-height: 1;
}

/* Default variant */
.badge-primary {
  background: rgba(79, 70, 229, 0.1);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

/* Success (goals, wins) */
.badge-success {
  background: var(--color-success-bg);
  color: var(--color-success);
  border: 1px solid var(--color-success-border);
}

/* Warning (yellow cards, cautions) */
.badge-warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
  border: 1px solid var(--color-warning-border);
}

/* Error (red cards, losses) */
.badge-error,
.badge-danger {
  background: var(--color-error-bg);
  color: var(--color-error);
  border: 1px solid var(--color-error-border);
}

/* Info (neutral events) */
.badge-info {
  background: var(--color-info-bg);
  color: var(--color-info);
  border: 1px solid var(--color-info-border);
}

/* Dot variant (circular) */
.badge-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
```

**Update HTML (rodada.html, resultado.html):**

Find:
```html
<span style="background: #dcfce7; color: #15803d; padding: 4px 8px;">WIN</span>
```

Replace with:
```html
<span class="badge badge-success">Win</span>
<span class="badge badge-warning">Draw</span>
<span class="badge badge-error">Loss</span>
```

**Tasks:**
- [ ] Add badge component CSS
- [ ] Add .badge-primary, .badge-success, .badge-warning, .badge-error, .badge-info
- [ ] Update rodada.html badges
- [ ] Update resultado.html badges
- [ ] Test all badge variants

---

## 2.6 Implement Alert Component

**File to Modify:** `/css/style.css`

**Add Alert Styles (new section):**

```css
/* ========================================
   ALERT COMPONENT
   ======================================== */

.alert {
  padding: var(--space-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid;
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.alert-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-content {
  flex: 1;
  font-size: var(--font-size-body);
}

/* Success alert */
.alert-success {
  background: var(--color-success-bg);
  color: var(--color-success);
  border-left-color: var(--color-success);
}

/* Warning alert */
.alert-warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
  border-left-color: var(--color-warning);
}

/* Error alert */
.alert-error,
.alert-danger {
  background: var(--color-error-bg);
  color: var(--color-error);
  border-left-color: var(--color-error);
}

/* Info alert */
.alert-info {
  background: var(--color-info-bg);
  color: var(--color-info);
  border-left-color: var(--color-info);
}

/* Closeable alert */
.alert-close {
  flex-shrink: 0;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
}

.alert-close:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
```

**Update Error Message HTML:**

Find:
```html
<div style="background: #fee2e2; color: #b91c1c; padding: 1rem;">
  Error: Player count mismatch
</div>
```

Replace with:
```html
<div class="alert alert-error" role="alert">
  <div class="alert-icon">⚠</div>
  <div class="alert-content">
    Error: Player count mismatch
  </div>
</div>
```

**Tasks:**
- [ ] Add alert component CSS
- [ ] Add .alert-success, .alert-warning, .alert-error, .alert-info
- [ ] Update all error messages to use alert classes
- [ ] Add role="alert" for screen readers
- [ ] Test alert variants

---

## 2.7 Update Card Component

**File to Modify:** `/css/style.css`

**Find and replace existing .card styles:**

```css
/* ========================================
   CARD COMPONENT
   ======================================== */

.card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: #e9ecef;
  transform: translateY(-2px);
}

.card.selected {
  border: 2px solid var(--color-primary);
  background: #f0f4ff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.card.selected:hover {
  box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);
}

/* Card sections */
.card-header {
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--color-border);
}

.card-header h3 {
  margin: 0;
  font-size: var(--font-size-h3);
}

.card-body {
  padding: 0;
  margin: 0;
}

.card-footer {
  margin-top: var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: var(--space-md);
  flex-direction: row-reverse;
}

.card-footer .btn {
  flex: 1;
}

/* Compact card variant */
.card-compact {
  padding: var(--space-lg);
}

/* Elevated card variant */
.card-elevated {
  box-shadow: var(--shadow-md);
}

.card-elevated:hover {
  box-shadow: var(--shadow-lg);
}
```

**Tasks:**
- [ ] Ensure all .card uses var(--space-xl) padding
- [ ] Ensure border is 1px (not 2px)
- [ ] Update .card:hover to use var(--shadow-md)
- [ ] Add .card-header, .card-body, .card-footer styles
- [ ] Test card on all screens

---

## 2.8 Table Component Styling

**File to Modify:** `/css/style.css`

**Add Table Styles (new section):**

```css
/* ========================================
   TABLE COMPONENT
   ======================================== */

table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-body);
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

thead {
  background: var(--color-bg-section);
  border-bottom: 2px solid var(--color-border);
}

th {
  padding: var(--space-lg);
  text-align: left;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  border-bottom: 2px solid var(--color-border);
}

td {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

tbody tr:hover {
  background: var(--color-bg-section);
}

tbody tr:last-child td {
  border-bottom: none;
}

/* Responsive table (mobile) */
@media (max-width: 640px) {
  table {
    font-size: var(--font-size-small);
  }

  th, td {
    padding: var(--space-sm) var(--space-md);
  }

  th {
    padding: var(--space-md);
  }
}
```

**Tasks:**
- [ ] Add table CSS styles
- [ ] Update rodada.html table header to use variables
- [ ] Test table on mobile/desktop

---

## 2.9 Verify Phase 2 (Testing Checklist)

**Phase 2 Complete When:**

- [ ] h1-h6 use design system sizes
- [ ] All text uses font-size variables
- [ ] Line heights are consistent per design system
- [ ] Responsive typography works (h1 80% on mobile)
- [ ] All padding uses var(--space-*)
- [ ] All margin uses var(--space-*)
- [ ] All gap uses var(--space-*)
- [ ] All forms use .form-group wrapper
- [ ] All inputs have proper focus/validation states
- [ ] All buttons use .btn classes
- [ ] All 20+ button combinations render correctly
- [ ] All badges use .badge classes
- [ ] All alerts use .alert classes
- [ ] All cards have proper structure
- [ ] Tables render correctly

---

---

# PHASE 3: POLISH (LOW PRIORITY)

### Focus: Icon System, Additional Animations, Micro-interactions

Completion of Phase 3 brings app from 85% to 95%+ compliance.

---

## 3.1 Icon System (4-5 hours)

Create inline SVG icon library with color inheritance.

**See design-system.md Section 6 for complete icon specifications.**

## 3.2 Animation Enhancements (2-3 hours)

Add missing animations:
- buttonPress (scale 0.95 → 1)
- fadeInPage (page transitions)
- scaleUp (celebrations)

## 3.3 Micro-interactions (2-3 hours)

- Input validation feedback
- Button press feedback
- Card selection animation
- Loading skeleton

---

---

# TESTING & QA CHECKLIST

## Before Declaring Complete:

**Cross-Browser Testing:**
- [ ] Chrome/Edge (Windows, macOS, Linux)
- [ ] Firefox (Windows, macOS, Linux)
- [ ] Safari (macOS, iOS)
- [ ] Mobile Chrome (Android)

**Device Testing:**
- [ ] Desktop 1920x1080
- [ ] Laptop 1366x768
- [ ] Tablet 1024x768 (landscape & portrait)
- [ ] Mobile 390x844 (iPhone 12)
- [ ] Mobile 375x667 (iPhone SE)

**Accessibility:**
- [ ] WCAG AA contrast verified (WebAIM Contrast Checker)
- [ ] Keyboard navigation tested (Tab through all elements)
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Focus indicators visible and logical
- [ ] No keyboard traps
- [ ] Form labels associated with inputs

**Responsive Design:**
- [ ] Mobile: 1 column layouts, touch targets 44x44px
- [ ] Tablet: 2-3 column layouts
- [ ] Desktop: 3-4 column layouts
- [ ] No horizontal scroll on mobile
- [ ] Text zoom to 200% functional

**Dark Mode:**
- [ ] All colors adjust in dark mode
- [ ] Contrast ratios maintained in dark mode
- [ ] No hardcoded colors (#1a1a2e, etc.)
- [ ] Smooth transition between modes

**Performance:**
- [ ] No console errors or warnings
- [ ] CSS file size reasonable (<50KB)
- [ ] No unused CSS
- [ ] Animations performant (60 FPS)

**Functionality:**
- [ ] All links work
- [ ] All buttons functional
- [ ] All forms submit
- [ ] All animations play correctly
- [ ] No broken images

---

## Summary

This spec provides step-by-step implementation for CODER to bring Cartola Elifoot from 45% to 75%+ design system compliance. Each section includes:

- **Exact file paths** — know what to modify
- **Line numbers** — where to make changes
- **Code examples** — copy-paste ready
- **CSS variable names** — consistent naming
- **Testing steps** — verify correctness
- **Screen impact** — which pages affected

Follow phases in order (1 → 2 → 3). Don't skip verification steps.

**Estimated Total Effort: 50-70 hours**

---

**For Questions:** Review the design-system.md for full specifications  
**For Feedback:** Update this spec based on implementation discoveries  
**For Blocked Issues:** Escalate to PLANNER for re-spec of specific section

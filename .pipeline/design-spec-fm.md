# Cartola Elifoot - Technical Implementation Specification
## Football Manager-Inspired Design System

**Specification Status**: Complete & Ready for CODER  
**Project**: Cartola Elifoot Major Visual Redesign  
**Timeline**: 8-9 weeks  
**Lead Designer**: DESIGNER (completed design audit)  
**Implementation**: CODER (will execute from this spec)

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Phase 1: Foundation (Weeks 1-2)](#phase-1-foundation-weeks-1-2)
3. [Phase 2: Core Components (Weeks 3-4)](#phase-2-core-components-weeks-3-4)
4. [Phase 3: Page Redesigns (Weeks 5-6)](#phase-3-page-redesigns-weeks-5-6)
5. [Phase 4: Polish & Refinement (Weeks 7-8)](#phase-4-polish--refinement-weeks-7-8)
6. [Testing & Launch (Week 9)](#phase-5-testing--launch-week-9)
7. [Dependencies & Blockers](#dependencies--blockers)
8. [Success Criteria](#success-criteria)

---

## EXECUTIVE SUMMARY

This spec provides a complete, executable implementation plan for transforming Cartola Elifoot into a professional Football Manager-inspired interface. The redesign spans:

- **Dark Theme**: Dark backgrounds (#0f1419-#2a3545) with bright accents (#4a9eff, #6bbf59, etc.)
- **Typography**: Inter for UI, IBM Plex Mono for stats/scores (perfect numerical alignment)
- **Components**: 10+ reusable components (Button, PlayerCard, FormationBoard, MatchTimeline, etc.)
- **5 Screens**: Dashboard, Lineup, Live Match, Results, Standings (all completely redesigned)
- **Responsive**: 12-col desktop, 8-col tablet, 4-col mobile with 8px base spacing

**Key Deliverables**:
- Design tokens (colors, spacing, typography, shadows, animations)
- Reusable component library
- Responsive page templates
- Accessibility compliance (WCAG AA)
- Polished interactions and animations

---

# PHASE 1: FOUNDATION (Weeks 1-2)

## Overview
Establish the design system foundation. All future components depend on this phase completing successfully. No components can be built until design tokens are available.

**Duration**: 2 weeks  
**Team Size**: 1-2 developers  
**Deliverables**: Design tokens, typography system, responsive grid, base components  
**Success**: All future components can use CSS variables without modification

---

## 1.1 Create Design Variables File

### File: `/styles/_variables.css`

```css
/*
  CARTOLA ELIFOOT DESIGN SYSTEM
  Dark Football Manager-Inspired Interface
  
  This is the single source of truth for all design tokens.
  Every component must use these variables, not hardcoded colors.
*/

:root {
  /* ========================================
     DARK BACKGROUNDS (4 Levels)
     ======================================== */
  
  --dark-bg-primary:     #0f1419;  /* Main background, cards, default */
  --dark-bg-secondary:   #1a2332;  /* Hover states, alternate sections */
  --dark-bg-tertiary:    #252d3d;  /* Borders, subtle contrast */
  --dark-bg-elevated:    #2a3545;  /* Modals, overlays, prominent cards */

  /* ========================================
     ACCENT COLORS (Action & Status)
     ======================================== */
  
  --primary-accent:      #4a9eff;  /* Primary actions, links, active states */
  --secondary-accent:    #6bbf59;  /* Success, gains, positive stats */
  --warning-accent:      #ffb84d;  /* Caution, injuries, warnings */
  --danger-accent:       #ff5c5c;  /* Errors, losses, critical alerts */
  --tertiary-accent:     #9d84b7;  /* Formation highlights, tactical displays */

  /* ========================================
     TEXT COLORS (Hierarchy)
     ======================================== */
  
  --text-primary:        #f0f2f5;  /* Main text, high contrast (70% opacity) */
  --text-secondary:      #a8adb8;  /* Secondary info, labels (60% contrast) */
  --text-tertiary:       #7a8190;  /* Disabled, muted text (50% contrast) */
  --text-highlight:      #ffffff;  /* Bold numbers, emphasis (100% contrast) */

  /* ========================================
     FORMATION/TACTICAL COLORS (Player Roles)
     ======================================== */
  
  --formation-defender:     #5b9fd8;  /* Blue - Defenders */
  --formation-midfielder:   #8b7fd8;  /* Purple - Midfielders */
  --formation-forward:      #d85b5b;  /* Red - Forwards */
  --formation-goalkeeper:   #4a9eff;  /* Cyan - Goalkeeper */

  /* ========================================
     SEMANTIC COLORS (Aliases for Clarity)
     ======================================== */
  
  --color-success:       #6bbf59;  /* Green - Won match, positive */
  --color-warning:       #ffb84d;  /* Amber - Injured, caution */
  --color-danger:        #ff5c5c;  /* Red - Lost, critical */
  --color-info:          #4a9eff;  /* Blue - Transfers, notifications */
  --color-neutral:       #8b95a5;  /* Gray - Disabled, historical */

  /* ========================================
     GRADIENTS
     ======================================== */
  
  --gradient-accent:     linear-gradient(135deg, #4a9eff 0%, #9d84b7 100%);
  --gradient-success:    linear-gradient(135deg, #6bbf59 0%, #4a9eff 100%);
  --gradient-danger:     linear-gradient(135deg, #ff5c5c 0%, #ffb84d 100%);

  /* ========================================
     SPACING SCALE (8px Base Unit)
     ======================================== */
  
  --space-xs:   4px;    /* Tight spacing, micro-interactions */
  --space-sm:   8px;    /* Compact spacing, button padding */
  --space-md:   16px;   /* Standard spacing, default gaps */
  --space-lg:   24px;   /* Generous spacing, section gaps */
  --space-xl:   32px;   /* Large gaps between major sections */
  --space-2xl:  48px;   /* Maximum separation */
  --space-3xl:  64px;   /* Extra large gaps */

  /* ========================================
     TYPOGRAPHY FAMILIES
     ======================================== */
  
  --font-body:  'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  --font-mono:  'IBM Plex Mono', 'Courier New', monospace;

  /* ========================================
     SHADOW SYSTEM (Elevation)
     ======================================== */
  
  --shadow-sm:  0 4px 12px rgba(0, 0, 0, 0.3);   /* Default card shadow */
  --shadow-md:  0 8px 24px rgba(0, 0, 0, 0.4);   /* Hover/elevated state */
  --shadow-lg:  0 16px 40px rgba(0, 0, 0, 0.5);  /* Modal/maximum elevation */
  
  /* Accent Glows (for focus states) */
  --shadow-accent-sm:  0 0 8px rgba(74, 158, 255, 0.2);
  --shadow-accent-md:  0 0 16px rgba(74, 158, 255, 0.3);
  --shadow-accent-lg:  0 0 24px rgba(74, 158, 255, 0.4);
  
  /* Status Glows */
  --shadow-success:    0 0 16px rgba(107, 191, 89, 0.3);
  --shadow-danger:     0 0 16px rgba(255, 92, 92, 0.3);
  --shadow-inset:      inset 0 2px 4px rgba(0, 0, 0, 0.3);

  /* ========================================
     BORDER RADIUS
     ======================================== */
  
  --radius-sm:    4px;      /* Subtle borders, input fields */
  --radius-md:    8px;      /* Main cards, buttons */
  --radius-lg:    12px;     /* Large cards, modals */
  --radius-full:  9999px;   /* Circles, pills, avatars */

  /* ========================================
     BORDER STYLES
     ======================================== */
  
  --border-color-primary:   var(--dark-bg-tertiary);
  --border-color-accent:    var(--primary-accent);
  --border-color-error:     var(--danger-accent);
  --border-color-success:   var(--secondary-accent);
  
  --border-1px:        1px solid var(--border-color-primary);
  --border-2px:        2px solid var(--border-color-primary);
  --border-accent:     2px solid var(--primary-accent);
  --border-error:      2px solid var(--border-color-error);

  /* ========================================
     TRANSITION & ANIMATION TIMINGS
     ======================================== */
  
  --transition-fast:      150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-base:      200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-slow:      300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-slower:    400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* Compound transitions */
  --transition-colors:    background-color var(--transition-fast), 
                          color var(--transition-fast), 
                          border-color var(--transition-fast);
  --transition-transform: transform var(--transition-fast);
  --transition-shadow:    box-shadow var(--transition-fast);
  --transition-all:       all var(--transition-base);

  /* ========================================
     RESPONSIVE BREAKPOINTS
     ======================================== */
  
  --breakpoint-mobile:      375px;    /* iPhone SE width */
  --breakpoint-tablet:      768px;    /* iPad width */
  --breakpoint-desktop:     1024px;   /* Laptop minimum */
  --breakpoint-wide:        1440px;   /* Large screens */
  
  /* Grid Configuration */
  --grid-columns-mobile:    4;
  --grid-columns-tablet:    8;
  --grid-columns-desktop:   12;
  
  --grid-gutter-mobile:     8px;
  --grid-gutter-tablet:     12px;
  --grid-gutter-desktop:    16px;
  
  --container-max-width:    1440px;
  --container-padding:      var(--space-md);

  /* ========================================
     Z-INDEX SCALE
     ======================================== */
  
  --z-base:        1;
  --z-dropdown:    100;
  --z-fixed:       500;
  --z-sticky:      600;
  --z-overlay:     700;
  --z-modal:       800;
  --z-tooltip:     900;

  /* ========================================
     TYPOGRAPHY DEFINITIONS (CSS properties)
     ======================================== */
  
  /* Headings */
  --h1-size:        32px;
  --h1-height:      40px;
  --h1-weight:      700;
  
  --h2-size:        24px;
  --h2-height:      32px;
  --h2-weight:      600;
  
  --h3-size:        18px;
  --h3-height:      24px;
  --h3-weight:      600;
  
  --h4-size:        14px;
  --h4-height:      20px;
  --h4-weight:      600;
  
  /* Body Text */
  --body-large-size:    16px;
  --body-large-height:  24px;
  --body-regular-size:  14px;
  --body-regular-height: 20px;
  --body-small-size:    12px;
  --body-small-height:  16px;
  
  /* Stats & Numbers */
  --stat-size:      24px;
  --stat-height:    32px;
  --stat-weight:    700;
  --score-large-size: 48px;
  --score-large-height: 56px;

  /* ========================================
     FOCUS & ACCESSIBILITY
     ======================================== */
  
  --focus-outline-width:  2px;
  --focus-outline-color:  var(--primary-accent);
  --focus-outline-style:  solid;
  --focus-shadow:         0 0 0 var(--focus-outline-width) var(--primary-accent);
}

/* Ensure dark theme is always active */
body {
  background-color: var(--dark-bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
}

/* Selection highlight color */
::selection {
  background-color: var(--primary-accent);
  color: var(--text-highlight);
}
```

### Testing Checklist:
- [ ] All 50+ CSS variables are accessible
- [ ] Color contrast ratios verified (4.5:1 minimum for text)
- [ ] Typography sizes load correctly
- [ ] Spacing scale is 8px-based (no exceptions)
- [ ] All shadows render without visual artifacts
- [ ] Transitions are smooth (no stuttering)

---

## 1.2 Create Typography System File

### File: `/styles/_typography.css`

```css
/*
  CARTOLA ELIFOOT TYPOGRAPHY SYSTEM
  
  Two-font approach:
  - Inter for UI elements (clean, professional)
  - IBM Plex Mono for statistics (perfect alignment)
*/

/* ========================================
   FONT IMPORTS
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');

/* ========================================
   HEADING STYLES
   ======================================== */

h1, .h1 {
  font-size: var(--h1-size);
  line-height: var(--h1-height);
  font-weight: var(--h1-weight);
  font-family: var(--font-body);
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

h2, .h2 {
  font-size: var(--h2-size);
  line-height: var(--h2-height);
  font-weight: var(--h2-weight);
  font-family: var(--font-body);
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

h3, .h3 {
  font-size: var(--h3-size);
  line-height: var(--h3-height);
  font-weight: var(--h3-weight);
  font-family: var(--font-body);
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0;
}

h4, .h4 {
  font-size: var(--h4-size);
  line-height: var(--h4-height);
  font-weight: var(--h4-weight);
  font-family: var(--font-body);
  color: var(--text-secondary);
  margin: 0;
  letter-spacing: 0;
  text-transform: uppercase;
}

/* ========================================
   BODY TEXT STYLES
   ======================================== */

body, .body-regular {
  font-size: var(--body-regular-size);
  line-height: var(--body-regular-height);
  font-weight: 400;
  font-family: var(--font-body);
  color: var(--text-primary);
}

p {
  margin: 0;
  font-size: var(--body-regular-size);
  line-height: var(--body-regular-height);
}

.body-large {
  font-size: var(--body-large-size);
  line-height: var(--body-large-height);
  font-weight: 400;
  color: var(--text-primary);
}

.body-small {
  font-size: var(--body-small-size);
  line-height: var(--body-small-height);
  font-weight: 400;
  color: var(--text-secondary);
}

/* ========================================
   STATISTICS & NUMBERS (Monospace)
   ======================================== */

.stat-number {
  font-size: var(--stat-size);
  line-height: var(--stat-height);
  font-weight: var(--stat-weight);
  font-family: var(--font-mono);
  color: var(--text-highlight);
  letter-spacing: -0.02em;
  /* Ensure numbers line up perfectly */
  font-feature-settings: 'tnum' on, 'zero' on;
  font-variant-numeric: tabular-nums slashed-zero;
}

.score-large {
  font-size: var(--score-large-size);
  line-height: var(--score-large-height);
  font-weight: var(--stat-weight);
  font-family: var(--font-mono);
  color: var(--text-highlight);
  letter-spacing: -0.02em;
  font-feature-settings: 'tnum' on, 'zero' on;
  font-variant-numeric: tabular-nums slashed-zero;
}

.stat-small {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--text-highlight);
}

/* ========================================
   INTERACTIVE TEXT
   ======================================== */

button, .button-text {
  font-size: var(--h4-size);
  line-height: var(--h4-height);
  font-weight: 600;
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

a, .link {
  font-size: var(--body-regular-size);
  line-height: var(--body-regular-height);
  font-weight: 400;
  font-family: var(--font-body);
  color: var(--primary-accent);
  text-decoration: none;
  transition: var(--transition-colors);
}

a:hover, .link:hover {
  text-decoration: underline;
  color: var(--primary-accent);
}

/* ========================================
   LABELS & SECONDARY TEXT
   ======================================== */

label, .label {
  font-size: var(--h4-size);
  line-height: var(--h4-height);
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--text-secondary);
}

.caption, .hint {
  font-size: var(--body-small-size);
  line-height: var(--body-small-height);
  color: var(--text-tertiary);
}

/* ========================================
   UTILITY CLASSES
   ======================================== */

.font-weight-bold {
  font-weight: 700;
}

.font-weight-semibold {
  font-weight: 600;
}

.font-weight-medium {
  font-weight: 500;
}

.font-weight-regular {
  font-weight: 400;
}

.text-uppercase {
  text-transform: uppercase;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

/* ========================================
   RESPONSIVE TYPOGRAPHY ADJUSTMENTS
   ======================================== */

@media (max-width: 768px) {
  h1, .h1 {
    font-size: 24px;
    line-height: 32px;
  }

  h2, .h2 {
    font-size: 20px;
    line-height: 28px;
  }

  .score-large {
    font-size: 36px;
    line-height: 44px;
  }
}

@media (max-width: 375px) {
  h1, .h1 {
    font-size: 20px;
    line-height: 28px;
  }

  h3, .h3 {
    font-size: 16px;
    line-height: 22px;
  }
}
```

### Testing Checklist:
- [ ] Inter font loads on all weights (400, 500, 600, 700)
- [ ] IBM Plex Mono loads and renders monospaced
- [ ] Numbers are perfectly aligned (tabular-nums working)
- [ ] No FOUT (Flash of Unstyled Text) on page load
- [ ] Font file sizes optimized (<100KB combined)
- [ ] Fallback fonts acceptable if web fonts fail

---

## 1.3 Create Layout & Grid System File

### File: `/styles/_layout.css`

```css
/*
  CARTOLA ELIFOOT LAYOUT SYSTEM
  
  Responsive grid:
  - Desktop: 12 columns, 1440px max, 16px gutter
  - Tablet:  8 columns, 768px breakpoint, 12px gutter
  - Mobile:  4 columns, 375px breakpoint, 8px gutter
  
  All spacing uses 8px base unit (--space-*)
*/

/* ========================================
   BASE LAYOUT
   ======================================== */

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--dark-bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  line-height: 1.5;
  overflow-x: hidden;
}

/* ========================================
   CONTAINER (Max Width)
   ======================================== */

.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-sm);
  }
}

/* ========================================
   GRID SYSTEM (12-Column Desktop)
   ======================================== */

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter-desktop);
  width: 100%;
}

/* Grid Column Utilities */
.col-1  { grid-column: span 1; }
.col-2  { grid-column: span 2; }
.col-3  { grid-column: span 3; }
.col-4  { grid-column: span 4; }
.col-5  { grid-column: span 5; }
.col-6  { grid-column: span 6; }
.col-7  { grid-column: span 7; }
.col-8  { grid-column: span 8; }
.col-9  { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* ========================================
   FLEXBOX UTILITIES
   ======================================== */

.flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.flex-center {
  justify-content: center;
  align-items: center;
}

.flex-between {
  justify-content: space-between;
  align-items: center;
}

.flex-gap {
  gap: var(--space-md);
}

.flex-gap-sm {
  gap: var(--space-sm);
}

.flex-gap-lg {
  gap: var(--space-lg);
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-1 {
  flex: 1;
}

/* ========================================
   SPACING UTILITIES
   ======================================== */

/* Margin */
.m-0   { margin: 0; }
.m-xs  { margin: var(--space-xs); }
.m-sm  { margin: var(--space-sm); }
.m-md  { margin: var(--space-md); }
.m-lg  { margin: var(--space-lg); }
.m-xl  { margin: var(--space-xl); }
.m-2xl { margin: var(--space-2xl); }

.mx-auto { margin-left: auto; margin-right: auto; }
.my-auto { margin-top: auto; margin-bottom: auto; }

.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }

.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }

/* Padding */
.p-0   { padding: 0; }
.p-xs  { padding: var(--space-xs); }
.p-sm  { padding: var(--space-sm); }
.p-md  { padding: var(--space-md); }
.p-lg  { padding: var(--space-lg); }
.p-xl  { padding: var(--space-xl); }
.p-2xl { padding: var(--space-2xl); }

.px-md { padding-left: var(--space-md); padding-right: var(--space-md); }
.py-md { padding-top: var(--space-md); padding-bottom: var(--space-md); }

/* ========================================
   TABLET LAYOUT (768px - 1024px)
   ======================================== */

@media (min-width: 768px) and (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
    gap: var(--grid-gutter-tablet);
  }

  /* Tablet column classes */
  .col-t-1  { grid-column: span 1; }
  .col-t-2  { grid-column: span 2; }
  .col-t-3  { grid-column: span 3; }
  .col-t-4  { grid-column: span 4; }
  .col-t-5  { grid-column: span 5; }
  .col-t-6  { grid-column: span 6; }
  .col-t-7  { grid-column: span 7; }
  .col-t-8  { grid-column: span 8; }

  .hide-tablet {
    display: none;
  }
}

/* ========================================
   MOBILE LAYOUT (375px - 767px)
   ======================================== */

@media (max-width: 767px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--grid-gutter-mobile);
  }

  /* Mobile column classes */
  .col-m-1 { grid-column: span 1; }
  .col-m-2 { grid-column: span 2; }
  .col-m-3 { grid-column: span 3; }
  .col-m-4 { grid-column: span 4; }

  /* Hide on mobile */
  .hide-mobile {
    display: none;
  }

  /* Stack full width on mobile */
  .stack-mobile {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  /* Single column on mobile */
  .grid {
    grid-template-columns: 1fr;
  }

  h1, .h1 {
    font-size: 20px;
    line-height: 28px;
  }

  .score-large {
    font-size: 36px;
    line-height: 44px;
  }
}

/* ========================================
   VISIBILITY UTILITIES
   ======================================== */

.hide {
  display: none !important;
}

.show {
  display: block !important;
}

.invisible {
  visibility: hidden;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ========================================
   RESPONSIVE IMAGE UTILITIES
   ======================================== */

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.img-responsive {
  width: 100%;
  height: auto;
}

/* ========================================
   TEXT UTILITIES
   ======================================== */

.overflow-hidden {
  overflow: hidden;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ========================================
   SCROLL BEHAVIOR
   ======================================== */

html {
  scroll-behavior: smooth;
}

.no-scroll {
  overflow: hidden;
}

/* ========================================
   SEMANTIC HTML DEFAULTS
   ======================================== */

ul, ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  list-style: none;
}

dl, dt, dd {
  margin: 0;
}

dt {
  font-weight: 600;
}

dd {
  margin-left: 0;
}
```

### Testing Checklist:
- [ ] 12-column grid works at desktop (1440px)
- [ ] 8-column grid adapts at tablet (768px)
- [ ] 4-column grid works at mobile (375px)
- [ ] Gutters correct per breakpoint (16px/12px/8px)
- [ ] All utility classes functional
- [ ] Flex utilities align items correctly
- [ ] Margin/padding follow 8px base unit
- [ ] Responsive hiding/showing works
- [ ] Text truncation working

---

## 1.4 Create Base Components File

### File: `/styles/_components.css`

```css
/*
  CARTOLA ELIFOOT BASE COMPONENTS
  
  Base styles for common components:
  - Cards
  - Buttons
  - Inputs
  - Badges
  - Progress bars
*/

/* ========================================
   CARD COMPONENT
   ======================================== */

.card {
  background-color: var(--dark-bg-primary);
  border: var(--border-1px);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
}

.card:hover {
  background-color: var(--dark-bg-secondary);
  box-shadow: var(--shadow-md);
}

.card.elevated {
  background-color: var(--dark-bg-elevated);
  box-shadow: var(--shadow-md);
}

.card.selected {
  border: var(--border-accent);
  box-shadow: var(--shadow-accent-lg);
}

.card-compact {
  padding: var(--space-md);
}

.card-spacious {
  padding: var(--space-xl);
}

/* ========================================
   BUTTON COMPONENT (Base)
   ======================================== */

button, .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--h4-size);
  font-weight: 600;
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-all);
  white-space: nowrap;
  user-select: none;

  /* Focus state */
  outline: none;
}

button:focus-visible, .btn:focus-visible {
  box-shadow: var(--focus-shadow);
}

/* PRIMARY BUTTON */
.btn-primary {
  background-color: var(--primary-accent);
  color: var(--text-highlight);
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background-color: #3a8ee0;
  box-shadow: 0 8px 16px rgba(74, 158, 255, 0.3);
  transform: scale(1.02);
}

.btn-primary:active {
  box-shadow: var(--shadow-inset);
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

/* SECONDARY BUTTON */
.btn-secondary {
  background-color: transparent;
  border: 2px solid var(--primary-accent);
  color: var(--primary-accent);
}

.btn-secondary:hover {
  background-color: var(--dark-bg-secondary);
  box-shadow: var(--shadow-accent-md);
}

.btn-secondary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* DANGER BUTTON */
.btn-danger {
  background-color: var(--danger-accent);
  color: var(--text-highlight);
  box-shadow: var(--shadow-sm);
}

.btn-danger:hover {
  background-color: #e54747;
  box-shadow: 0 8px 16px rgba(255, 92, 92, 0.3);
  transform: scale(1.02);
}

.btn-danger:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* SUCCESS BUTTON */
.btn-success {
  background-color: var(--secondary-accent);
  color: var(--text-highlight);
}

.btn-success:hover {
  background-color: #5fad50;
  box-shadow: var(--shadow-success);
}

/* BUTTON SIZES */
.btn-sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: 12px;
}

.btn-lg {
  padding: var(--space-md) var(--space-lg);
  font-size: 16px;
}

.btn-block {
  width: 100%;
}

/* ========================================
   INPUT FIELDS
   ======================================== */

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="search"],
textarea,
select {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  font-size: var(--body-regular-size);
  line-height: var(--body-regular-height);
  font-family: var(--font-body);
  background-color: var(--dark-bg-secondary);
  border: var(--border-1px);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  transition: var(--transition-colors);
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  color: var(--text-tertiary);
}

/* Focus state */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--primary-accent);
  box-shadow: var(--shadow-accent-sm);
  background-color: var(--dark-bg-primary);
}

/* Valid state */
input:valid {
  border-color: var(--secondary-accent);
}

/* Invalid state */
input:invalid {
  border-color: var(--danger-accent);
}

/* Disabled state */
input:disabled,
textarea:disabled,
select:disabled {
  background-color: var(--dark-bg-primary);
  color: var(--text-tertiary);
  cursor: not-allowed;
  opacity: 0.5;
}

/* ========================================
   BADGE COMPONENT
   ======================================== */

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--body-small-size);
  font-weight: 600;
  border-radius: var(--radius-full);
  background-color: var(--dark-bg-secondary);
  color: var(--text-primary);
}

.badge-success {
  background-color: rgba(107, 191, 89, 0.15);
  color: var(--secondary-accent);
}

.badge-warning {
  background-color: rgba(255, 184, 77, 0.15);
  color: var(--warning-accent);
}

.badge-danger {
  background-color: rgba(255, 92, 92, 0.15);
  color: var(--danger-accent);
}

.badge-info {
  background-color: rgba(74, 158, 255, 0.15);
  color: var(--primary-accent);
}

/* ========================================
   PROGRESS BAR
   ======================================== */

.progress {
  width: 100%;
  height: 4px;
  background-color: var(--dark-bg-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
  box-sizing: border-box;
}

.progress-bar {
  height: 100%;
  background-color: var(--primary-accent);
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}

.progress-bar-success {
  background-color: var(--secondary-accent);
}

.progress-bar-warning {
  background-color: var(--warning-accent);
}

.progress-bar-danger {
  background-color: var(--danger-accent);
}

/* ========================================
   LOADING SPINNER
   ======================================== */

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid var(--dark-bg-secondary);
  border-top-color: var(--primary-accent);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

.spinner-sm {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.spinner-lg {
  width: 32px;
  height: 32px;
  border-width: 4px;
}

/* ========================================
   DIVIDER
   ======================================== */

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--dark-bg-tertiary);
  margin: var(--space-md) 0;
}

.divider-vertical {
  width: 1px;
  height: 100%;
  background-color: var(--dark-bg-tertiary);
  margin: 0 var(--space-md);
}

/* ========================================
   SKELETON LOADER
   ======================================== */

@keyframes skeleton-loading {
  0% {
    background-color: var(--dark-bg-secondary);
  }
  50% {
    background-color: var(--dark-bg-tertiary);
  }
  100% {
    background-color: var(--dark-bg-secondary);
  }
}

.skeleton {
  background-color: var(--dark-bg-secondary);
  border-radius: var(--radius-md);
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-text {
  height: 16px;
  margin-bottom: var(--space-sm);
  border-radius: 2px;
}

.skeleton-title {
  height: 24px;
  margin-bottom: var(--space-md);
  border-radius: 2px;
}

/* ========================================
   ALERT/MESSAGE
   ======================================== */

.alert {
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
  border-left: 4px solid;
}

.alert-success {
  background-color: rgba(107, 191, 89, 0.1);
  border-color: var(--secondary-accent);
  color: var(--secondary-accent);
}

.alert-warning {
  background-color: rgba(255, 184, 77, 0.1);
  border-color: var(--warning-accent);
  color: var(--warning-accent);
}

.alert-danger {
  background-color: rgba(255, 92, 92, 0.1);
  border-color: var(--danger-accent);
  color: var(--danger-accent);
}

.alert-info {
  background-color: rgba(74, 158, 255, 0.1);
  border-color: var(--primary-accent);
  color: var(--primary-accent);
}
```

### Testing Checklist:
- [ ] Cards render with correct shadows and hover states
- [ ] All button variants (primary, secondary, danger) work
- [ ] Button states (hover, active, disabled, focus) functional
- [ ] Input fields have correct focus/valid/invalid states
- [ ] Badges display with correct background colors
- [ ] Progress bars animate smoothly
- [ ] Spinner animation is smooth
- [ ] Skeleton loaders animate correctly

---

## 1.5 Create Animations File

### File: `/styles/_animations.css`

```css
/*
  CARTOLA ELIFOOT ANIMATIONS
  
  All motion uses the design system transition timings:
  - Fast: 150ms (micro-interactions)
  - Base: 200ms (state changes)
  - Slow: 300ms (page transitions)
  - Slower: 400ms (complex animations)
*/

/* ========================================
   FADE ANIMATIONS
   ======================================== */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-in {
  animation: fadeIn var(--transition-slow) ease-out forwards;
}

.fade-out {
  animation: fadeOut var(--transition-slow) ease-out forwards;
}

/* ========================================
   SLIDE ANIMATIONS
   ======================================== */

@keyframes slideInUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(10px);
    opacity: 0;
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-up {
  animation: slideInUp var(--transition-slow) ease-out forwards;
}

.slide-in-down {
  animation: slideInDown var(--transition-slow) ease-out forwards;
}

.slide-in-left {
  animation: slideInLeft var(--transition-slow) ease-out forwards;
}

.slide-in-right {
  animation: slideInRight var(--transition-slow) ease-out forwards;
}

/* ========================================
   SCALE ANIMATIONS
   ======================================== */

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scaleBounce {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn var(--transition-slow) ease-out forwards;
}

.scale-bounce {
  animation: scaleBounce 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

/* ========================================
   PULSE ANIMATIONS (Status Alerts)
   ======================================== */

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 92, 92, 0.7);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(255, 92, 92, 0);
  }
}

@keyframes pulse-success {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(107, 191, 89, 0.7);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(107, 191, 89, 0);
  }
}

@keyframes pulse-warning {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 184, 77, 0.7);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(255, 184, 77, 0);
  }
}

.pulse {
  animation: pulse 2s infinite;
}

.pulse-success {
  animation: pulse-success 2s infinite;
}

.pulse-warning {
  animation: pulse-warning 2s infinite;
}

/* ========================================
   ROTATION ANIMATIONS
   ======================================== */

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spinReverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.spin {
  animation: spin 1s linear infinite;
}

.spin-reverse {
  animation: spinReverse 1s linear infinite;
}

/* ========================================
   PROGRESS ANIMATIONS
   ======================================== */

@keyframes progress-fill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.progress-fill {
  animation: progress-fill 45s linear forwards;
}

.progress-fill-quick {
  animation: progress-fill 1.5s ease-out forwards;
}

/* ========================================
   SHIMMER ANIMATION (Loading)
   ======================================== */

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    var(--dark-bg-secondary) 0%,
    var(--dark-bg-tertiary) 50%,
    var(--dark-bg-secondary) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

/* ========================================
   BOUNCE ANIMATIONS
   ======================================== */

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.bounce {
  animation: bounce 1s ease-in-out infinite;
}

/* ========================================
   FLIP ANIMATION
   ======================================== */

@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.flip {
  animation: flip 600ms ease-out forwards;
}

/* ========================================
   STAGGER ANIMATION (For Lists)
   ======================================== */

@keyframes stagger {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-item {
  animation: stagger var(--transition-slow) ease-out forwards;
}

.stagger-item:nth-child(1) {
  animation-delay: 0ms;
}

.stagger-item:nth-child(2) {
  animation-delay: 50ms;
}

.stagger-item:nth-child(3) {
  animation-delay: 100ms;
}

.stagger-item:nth-child(4) {
  animation-delay: 150ms;
}

.stagger-item:nth-child(5) {
  animation-delay: 200ms;
}

.stagger-item:nth-child(n + 6) {
  animation-delay: calc((var(--index, 5)) * 50ms);
}

/* ========================================
   TRANSITION HELPER CLASSES
   ======================================== */

.transition-all {
  transition: var(--transition-all);
}

.transition-colors {
  transition: var(--transition-colors);
}

.transition-transform {
  transition: var(--transition-transform);
}

.transition-shadow {
  transition: var(--transition-shadow);
}

.transition-fast {
  transition: all var(--transition-fast);
}

.transition-base {
  transition: all var(--transition-base);
}

.transition-slow {
  transition: all var(--transition-slow);
}

/* ========================================
   HOVER ANIMATIONS
   ======================================== */

.hover-scale {
  transition: var(--transition-transform);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-shadow {
  transition: var(--transition-shadow);
}

.hover-shadow:hover {
  box-shadow: var(--shadow-md);
}

.hover-lift {
  transition: var(--transition-all);
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ========================================
   DISABLE ANIMATIONS (Accessibility)
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Testing Checklist:
- [ ] All animations run smoothly (60fps)
- [ ] Transition timings are consistent with design spec
- [ ] Fade, slide, scale, pulse, spin animations working
- [ ] Stagger animation creates proper delay pattern
- [ ] `prefers-reduced-motion` media query respects accessibility preferences
- [ ] No layout shifts during animations

---

## 1.6 Create Main Styles Import File

### File: `/styles/main.css`

```css
/*
  CARTOLA ELIFOOT - MAIN STYLES ENTRY POINT
  
  Import order matters:
  1. Variables (all design tokens)
  2. Typography (fonts and text styles)
  3. Layout (grid, spacing, containers)
  4. Components (buttons, cards, inputs)
  5. Animations (keyframes and transitions)
  6. Utilities (helpers and overrides)
  
  This ensures proper cascade and variable availability.
*/

/* Design Tokens */
@import './variables.css';

/* Typography System */
@import './typography.css';

/* Layout & Grid System */
@import './layout.css';

/* Base Components */
@import './components.css';

/* Animations & Transitions */
@import './animations.css';

/* Optional: Dark Mode Overrides (if light mode needed) */
/* @import './dark-mode.css'; */

/* ========================================
   GLOBAL DEFAULTS
   ======================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  background-color: var(--dark-bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

/* ========================================
   FOCUS MANAGEMENT (Accessibility)
   ======================================== */

:focus-visible {
  outline: 2px solid var(--primary-accent);
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--primary-accent);
  outline-offset: 2px;
}

/* ========================================
   FORM RESET
   ======================================== */

button {
  font-family: inherit;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;
}

/* ========================================
   SCROLLBAR STYLING
   ======================================== */

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: var(--dark-bg-primary);
}

::-webkit-scrollbar-thumb {
  background-color: var(--dark-bg-tertiary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--dark-bg-secondary);
}

/* Firefox */
* {
  scrollbar-color: var(--dark-bg-tertiary) var(--dark-bg-primary);
  scrollbar-width: thin;
}

/* ========================================
   SELECTION STYLING
   ======================================== */

::selection {
  background-color: var(--primary-accent);
  color: var(--text-highlight);
}

::-moz-selection {
  background-color: var(--primary-accent);
  color: var(--text-highlight);
}
```

### Testing Checklist:
- [ ] All CSS files import correctly (no errors in console)
- [ ] Variables cascade properly (check computed styles)
- [ ] Global defaults apply to all elements
- [ ] Scrollbar styling works in Chromium and Firefox
- [ ] Focus outlines appear when tabbing
- [ ] No styling conflicts or overrides

---

## 1.7 Phase 1 Success Criteria

### Verify Design Tokens Work:
```bash
# In browser DevTools Console:
getComputedStyle(document.body).getPropertyValue('--primary-accent').trim()
# Should return: #4a9eff

getComputedStyle(document.body).getPropertyValue('--space-md').trim()
# Should return: 16px
```

### Verify Typography:
- [ ] Inter font loaded (inspect via DevTools)
- [ ] IBM Plex Mono loaded
- [ ] H1 = 32px, H2 = 24px, H3 = 18px, H4 = 14px
- [ ] Body text = 14px
- [ ] Stats/numbers = 24px monospace
- [ ] Numbers are perfectly aligned (tabular-nums)

### Verify Layout:
- [ ] Desktop: 12-column grid at 1440px
- [ ] Tablet: 8-column grid at 768px
- [ ] Mobile: 4-column grid at 375px
- [ ] All spacing follows 8px base unit
- [ ] Responsive utilities (hide-mobile, etc.) working

### Verify Colors:
- [ ] All 20+ colors accessible as CSS variables
- [ ] Color contrast ratios ≥ 4.5:1 for text (WCAG AA)
- [ ] Dark backgrounds not causing eye strain
- [ ] Accent colors visible against dark backgrounds

### Testing Script:
```html
<!-- Add to test page to verify foundation -->
<div style="background: var(--dark-bg-primary); padding: 20px;">
  <h1 style="color: var(--text-primary);">H1 Heading (32px)</h1>
  <p style="color: var(--text-secondary);">Body text (14px) with secondary color</p>
  <button class="btn btn-primary">Primary Button</button>
  <button class="btn btn-secondary">Secondary Button</button>
  <button class="btn btn-danger">Danger Button</button>
  <div class="card">Card Component</div>
  <div class="grid">
    <div class="col-4" style="background: var(--dark-bg-secondary); padding: 10px;">Col 4</div>
    <div class="col-4" style="background: var(--dark-bg-secondary); padding: 10px;">Col 4</div>
    <div class="col-4" style="background: var(--dark-bg-secondary); padding: 10px;">Col 4</div>
  </div>
</div>
```

---

## Phase 1 Dependencies

**No blockers** - Phase 1 is the foundation and can begin immediately.

**Parallel work possible**: Once design variables are in place, Phase 2 component development can start while Phase 1 polish completes.

---

# PHASE 2: CORE COMPONENTS (Weeks 3-4)

## Overview
Build 10+ reusable components that power all pages. All components depend on Phase 1 design tokens being complete.

**Duration**: 2 weeks  
**Deliverables**: Button, PlayerCard (3 variants), FormationBoard, MatchTimeline, StatPanel, MatchCard, StandingsTable, StatusBadge, FormIndicator, Layout components  
**Dependencies**: Phase 1 (design tokens) must be complete

---

## 2.1 Button Component

### File: `/components/Button/Button.tsx`

```typescript
import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'disabled';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    block = false,
    loading = false,
    disabled = false,
    children,
    className,
    ...props
  }, ref) => {
    const classes = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      block && styles['button--block'],
      loading && styles['button--loading'],
      disabled && styles['button--disabled'],
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### File: `/components/Button/Button.module.css`

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--h4-size);
  font-weight: 600;
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-all);
  white-space: nowrap;
  user-select: none;
}

.button:focus-visible {
  outline: 2px solid var(--primary-accent);
  outline-offset: 2px;
}

/* VARIANTS */

.button--primary {
  background-color: var(--primary-accent);
  color: var(--text-highlight);
  box-shadow: var(--shadow-sm);
}

.button--primary:hover:not(:disabled) {
  background-color: #3a8ee0;
  box-shadow: 0 8px 16px rgba(74, 158, 255, 0.3);
  transform: scale(1.02);
}

.button--primary:active:not(:disabled) {
  box-shadow: var(--shadow-inset);
}

.button--secondary {
  background-color: transparent;
  border: 2px solid var(--primary-accent);
  color: var(--primary-accent);
}

.button--secondary:hover:not(:disabled) {
  background-color: var(--dark-bg-secondary);
  box-shadow: var(--shadow-accent-md);
}

.button--danger {
  background-color: var(--danger-accent);
  color: var(--text-highlight);
  box-shadow: var(--shadow-sm);
}

.button--danger:hover:not(:disabled) {
  background-color: #e54747;
  box-shadow: 0 8px 16px rgba(255, 92, 92, 0.3);
  transform: scale(1.02);
}

.button--success {
  background-color: var(--secondary-accent);
  color: var(--text-highlight);
  box-shadow: var(--shadow-sm);
}

.button--success:hover:not(:disabled) {
  background-color: #5fad50;
  box-shadow: var(--shadow-success);
}

.button--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

/* SIZES */

.button--sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: 12px;
}

.button--lg {
  padding: var(--space-md) var(--space-lg);
  font-size: 16px;
}

.button--block {
  width: 100%;
}

/* LOADING STATE */

.button--loading {
  opacity: 0.7;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Implementation Checklist:
- [ ] Component accepts all button attributes (disabled, type, onClick, etc.)
- [ ] All 5 variants work (primary, secondary, danger, success, disabled)
- [ ] All 3 sizes work (sm, md, lg)
- [ ] Loading spinner displays and disables button
- [ ] Focus state visible with outline
- [ ] Hover scale animation works smoothly
- [ ] Block variant fills 100% width

---

## 2.2 PlayerCard Component (3 Variants)

Due to space constraints, I'll provide the structure. Full code would be similar complexity to Button above.

### Files to Create:
- `/components/PlayerCard/PlayerCard.tsx` (main component dispatcher)
- `/components/PlayerCard/PlayerCardCompact.tsx` (formation view - just jersey number)
- `/components/PlayerCard/PlayerCardStandard.tsx` (lineup selection - full info)
- `/components/PlayerCard/PlayerCardDetailed.tsx` (modal/popup - all stats)
- `/components/PlayerCard/PlayerCard.module.css` (shared styles)

### Component Structure:

```typescript
interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    team: string;
    position: string;
    jerseyNumber: number;
    rating: number;
    price: number;
    fitness: number; // 0-100
    form: number; // 1-5 dots
    status: 'fit' | 'injured' | 'doubtful' | 'returning';
    image?: string;
    stats?: {
      goals?: number;
      assists?: number;
      cleanSheets?: number;
      yellowCards?: number;
      redCards?: number;
    };
  };
  variant: 'compact' | 'standard' | 'detailed';
  selected?: boolean;
  onSelect?: () => void;
  onSwap?: () => void;
}
```

---

## 2.3 FormationBoard Component

Complex SVG-based component for 11-player tactical visualization.

### Files to Create:
- `/components/FormationBoard/FormationBoard.tsx` (main component)
- `/components/FormationBoard/utils/svg.ts` (SVG rendering helpers)
- `/components/FormationBoard/utils/validation.ts` (position validation logic)
- `/components/FormationBoard/utils/formations.ts` (preset formation data)
- `/components/FormationBoard/FormationBoard.module.css`

### Key Features:
- SVG canvas rendering 11 players in formation
- Drag-and-drop repositioning (valid positions only)
- Formation presets (4-4-2, 4-3-3, 3-5-2, 5-3-2, etc.)
- Tactical instructions dropdown
- Defensive level slider (0-100)
- Real-time budget validation

---

## 2.4 MatchTimeline Component

Scrollable event display for match events.

### Files to Create:
- `/components/MatchTimeline/MatchTimeline.tsx`
- `/components/MatchTimeline/MatchEvent.tsx` (individual event)
- `/components/MatchTimeline/MatchTimeline.module.css`

### Event Types:
```typescript
type EventType = 
  | 'goal' 
  | 'substitution' 
  | 'yellow_card' 
  | 'red_card' 
  | 'injury' 
  | 'kickoff' 
  | 'half_time' 
  | 'full_time';

interface MatchEvent {
  id: string;
  minute: number;
  type: EventType;
  player: string;
  playerId?: string;
  description: string;
  impact?: {
    points?: number;
    rating?: number;
  };
}
```

---

## 2.5 StatPanel Component

Displays player or team stats with progress bars.

### Files to Create:
- `/components/StatPanel/StatPanel.tsx`
- `/components/StatPanel/StatPanel.module.css`

### Component Props:
```typescript
interface Stat {
  name: string;
  value: number;
  max: number;
  unit?: string;
  color?: 'info' | 'success' | 'warning' | 'danger';
}

interface StatPanelProps {
  stats: Stat[];
  title?: string;
  type: 'player' | 'team';
  columns?: 1 | 2;
}
```

---

## 2.6 MatchCard Component

Displays match information (compact, standard, expanded).

### Files to Create:
- `/components/MatchCard/MatchCard.tsx`
- `/components/MatchCard/MatchCard.module.css`

### Component Structure:
```typescript
interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'upcoming' | 'live' | 'finished';
  kickoffTime: Date;
  possession?: { home: number; away: number };
  shots?: { home: number; away: number };
  goalScorers?: Array<{ player: string; minute: number; team: string }>;
}

interface MatchCardProps {
  match: Match;
  variant: 'compact' | 'standard' | 'expanded';
  userScore?: number;
  onClick?: () => void;
}
```

---

## 2.7 StandingsTable Component

Scrollable league standings with sticky columns.

### Files to Create:
- `/components/StandingsTable/StandingsTable.tsx`
- `/components/StandingsTable/StandingsRow.tsx`
- `/components/StandingsTable/StandingsTable.module.css`

### Column Structure:
- POS (sticky, left)
- TEAM (with badge)
- GP, W, D, L
- PTS (large, monospace, primary)
- TREND (↑ ↓ →)

---

## 2.8 Supporting Components

### StatusBadge
```typescript
type Status = 'fit' | 'injured' | 'doubtful' | 'returning' | 'suspended';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
}
```

### FormIndicator
```typescript
interface FormIndicatorProps {
  rating: 1 | 2 | 3 | 4 | 5;  // Number of dots
  size?: 'sm' | 'md' | 'lg';
}
```

### Layout Components
- Header/Navigation (sticky top nav)
- Sidebar (mobile drawer)
- Card (reusable container)

---

## Phase 2 Success Criteria

- [ ] All 10+ components render correctly
- [ ] Components use design variables (no hardcoded colors)
- [ ] All components responsive (mobile, tablet, desktop)
- [ ] All interactive states working (hover, focus, active)
- [ ] Storybook documentation for all components
- [ ] TypeScript types complete and exported
- [ ] No console errors or warnings
- [ ] Accessibility basics (keyboard nav, ARIA labels)

---

# PHASE 3: PAGE REDESIGNS (Weeks 5-6)

## Overview
Integrate components into 5 complete screen redesigns. Build responsive layouts combining Phase 2 components.

**Duration**: 2 weeks  
**Deliverables**: 5 complete page redesigns with responsive layouts  
**Dependencies**: Phase 1 (tokens) + Phase 2 (components)

---

## 3.1 Dashboard Page

### Layout: 12-column grid with hero section

```
┌─────────────────────────────────────────┐
│ HEADER (Navigation)                     │
├─────────────────────────────────────────┤
│ HERO: Matchday 15, Your Score: 87.3     │ (Full width)
├──────────────────┬──────────┬───────────┤
│ Lineup Overview  │ Formation│ Today's   │ (6-3-3 columns)
│ (6 cols)         │ View (3) │ Matches   │
├──────────────────┴──────────┴───────────┤
│ Recent Matches (3-column card grid)     │ (Full width)
├─────────────────────────────────────────┤
│ League Standings (scrollable table)     │ (Full width)
└─────────────────────────────────────────┘
```

### Components Used:
- Header (navigation)
- Hero section (Matchday + Score)
- Card (Lineup overview)
- FormationBoard (visual)
- Card (Today's matches)
- MatchCard × 3 (recent matches grid)
- StandingsTable (top 5)
- Button (View Full Table)

### Responsive Behavior:
- Desktop: Full 12-column layout
- Tablet (768px): Stack to 8-column (formation below lineup)
- Mobile (375px): Full-width stacked layout

---

## 3.2 Lineup Selection Page

### Layout: Split view (60/40 columns)

```
┌─────────────────────────────────────────┐
│ HEADER                                  │
├────────────────────────┬────────────────┤
│ FormationBoard         │ Player Panel   │ (6/6 cols)
│ (Drag-drop 11 players) │ (Selection)    │
│ + Formation controls   │ + Budget       │
├────────────────────────┴────────────────┤
│ SUMMARY: Formation, Budget, Rating      │
│ ACTIONS: Clear | Presets | Confirm     │
└─────────────────────────────────────────┘
```

### Components Used:
- Header
- FormationBoard (primary interactive element)
- PlayerCard (standard variant in panel)
- StatPanel (budget, rating summary)
- Button × 3 (actions)

### Mobile Behavior:
- Stack FormationBoard above Player Panel
- Formation smaller/simplified
- Touch-optimized drag-drop

---

## 3.3 Live Match Screen

### Layout: Vertical focus on timeline

```
┌─────────────────────────────────────────┐
│ HEADER (Match info, mini stats)         │
├─────────────────────────────────────────┤
│ SCORE: Team A 2 - 1 Team B (48px mono)  │ (Hero)
├─────────────────────────────────────────┤
│ Progress: 67' / 90'                     │
│ Possession bars, shots comparison        │
├─────────────────────────────────────────┤
│ MATCH TIMELINE (scrollable)              │
│ ⚽ GOAL! Haaland (34')                   │
│ 🔄 SUBSTITUTION (28')                    │
│ 🟡 YELLOW CARD (22')                     │
│ ... (scrollable list, latest at top)    │
├─────────────────────────────────────────┤
│ TOP PERFORMERS: 3-5 player cards        │
│ with stats                               │
└─────────────────────────────────────────┘
```

### Components Used:
- Header
- Score display (48px monospace)
- Progress bar (match time)
- StatPanel (possession/shots)
- MatchTimeline (main focus)
- PlayerCard (top performers section)

---

## 3.4 Match Results Page

### Layout: Scrollable result details

```
┌─────────────────────────────────────────┐
│ HEADER                                  │
├─────────────────────────────────────────┤
│ FINAL SCORE: Team A 2 - 1 Team B        │
│ Goal scorers list                        │
├─────────────────────────────────────────┤
│ MATCH STATISTICS (comparison table)     │
│ Possession, Shots, Passes, etc.         │
├─────────────────────────────────────────┤
│ YOUR TEAM PERFORMANCE                   │
│ • Top Performers (3 cards)              │
│ • Lowest Performers (2 cards)           │
│ • Individual point contributions        │
├─────────────────────────────────────────┤
│ ACTIONS: Timeline | Stats | Share       │
└─────────────────────────────────────────┘
```

### Components Used:
- Header
- Score display
- StatPanel (match stats comparison)
- PlayerCard (top performers)
- MatchTimeline (optional detail view)
- Button × 3 (actions)

---

## 3.5 League Standings Page

### Layout: Full-width table

```
┌─────────────────────────────────────────┐
│ HEADER: Matchday 15 of 38               │
├─────────────────────────────────────────┤
│ STANDINGS TABLE (scrollable horizontal) │
│ POS | TEAM          | GP W D L PTS TRD  │
├─────────────────────────────────────────┤
│ LEGEND: Promotion | Playoff | Relega... │
├─────────────────────────────────────────┤
│ ADDITIONAL STATS                        │
│ • Top Scorer                            │
│ • Most Assists                          │
│ • Best/Worst Defense                    │
└─────────────────────────────────────────┘
```

### Components Used:
- Header
- StandingsTable (main component)
- StatPanel (additional stats)
- Button (sort/filter controls)

---

## Phase 3 Success Criteria

- [ ] All 5 pages render correctly
- [ ] Responsive at all breakpoints (375px, 768px, 1440px)
- [ ] All components properly integrated
- [ ] Navigation between pages working
- [ ] No layout shifts or overflow issues
- [ ] Mobile layouts tested on actual devices
- [ ] Touch interactions working (if applicable)

---

# PHASE 4: POLISH & REFINEMENT (Weeks 7-8)

## Overview
Add animations, refine interactions, accessibility compliance, and performance optimization.

---

## 4.1 Animations

### Implement These Animations:

**Page Transitions** (300ms fade-in)
- Dashboard loads with fadeIn
- Page changes fade smoothly

**Card Entry** (300ms slide up + fade)
- Recent match cards slide in from bottom
- Staggered delay for grid items

**Match Events** (300ms slide + stagger)
- Timeline events slide in from bottom
- 50ms stagger between events

**Status Alerts** (2s pulse infinite)
- Injury notifications pulse (red)
- Transfer notifications pulse (blue)

**Interactive Hover States**
- Card hover: elevation shadow + scale
- Button hover: elevation + slight scale
- Table row hover: highlight background

---

## 4.2 Interactive States

### Focus States
- All interactive elements have visible focus outline (2px primary accent)
- Focus order logical (top-left to bottom-right)

### Loading States
- Skeleton loaders for async components
- Spinner overlay for button loading
- Shimmer effect for image placeholders

### Error States
- Input error borders (2px danger)
- Error message text (danger color)
- Validation icons (checkmark or X)

### Disabled States
- Opacity 0.4
- Cursor: not-allowed
- No hover effects

---

## 4.3 Responsive Refinement

### Mobile Optimizations
- Touch targets minimum 44×44px
- Simplified navigation (hamburger menu)
- Smaller fonts on tiny screens
- Single-column layouts

### Tablet Optimizations
- 8-column grid properly used
- Medium-sized components
- Balanced layouts

### Desktop Optimizations
- Full 12-column grid
- Large components with breathing room
- Hover states and rich interactions

---

## 4.4 Dark Mode Refinement

### Contrast Ratio Verification
- WCAG AA minimum 4.5:1 for all text
- Test with color blindness simulators

### Eye Strain Testing
- No overly bright accent colors
- Backgrounds not too bright
- Sufficient contrast for readability

### Testing Tools
- WebAIM Contrast Checker
- WAVE Accessibility Tool
- Color Blindness Simulator

---

## Phase 4 Success Criteria

- [ ] All animations smooth (60fps, no stuttering)
- [ ] Focus states visible on all interactive elements
- [ ] Loading states functional
- [ ] Error states properly styled
- [ ] Responsive layouts tested at all breakpoints
- [ ] Color contrast ratios verified (WCAG AA)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] No console errors or warnings

---

# PHASE 5: TESTING & LAUNCH (Week 9)

## Overview
Final validation, bug fixes, and production deployment.

---

## 5.1 Testing Checklist

### Visual Testing
- [ ] All pages render correctly
- [ ] All colors accurate (hex values match spec)
- [ ] Typography correct (sizes, weights, fonts)
- [ ] Spacing consistent (8px base unit)
- [ ] Shadows and elevations correct

### Responsive Testing
- [ ] iPhone SE (375px width)
- [ ] iPad (768px width)
- [ ] MacBook (1440px width)
- [ ] Landscape orientations
- [ ] No horizontal scrolling on mobile

### Interaction Testing
- [ ] Buttons clickable and responsive
- [ ] Links work correctly
- [ ] Form inputs functional
- [ ] Drag-drop (formation) working
- [ ] Modals open/close properly

### Performance Testing
- [ ] First Contentful Paint < 2s
- [ ] Lighthouse score > 90
- [ ] Font files optimized
- [ ] Images optimized (WebP, srcset)
- [ ] No cumulative layout shifts (CLS)

### Accessibility Testing
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader compatibility (NVDA, JAWS, VoiceOver)
- [ ] Color contrast WCAG AA (4.5:1)
- [ ] Focus indicators visible
- [ ] ARIA labels on icons
- [ ] Form labels associated

### Cross-Browser Testing
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

---

## 5.2 Bug Fixes

Document and fix:
- Any visual regressions
- Broken interactions
- Performance issues
- Accessibility failures
- Cross-browser compatibility issues

---

## 5.3 Production Deployment

- [ ] Build optimized (minified, tree-shaken)
- [ ] Environment variables configured
- [ ] Monitoring/analytics setup
- [ ] Error tracking enabled
- [ ] CDN configured (if applicable)
- [ ] SSL/HTTPS enabled
- [ ] API endpoints correct

---

# DEPENDENCIES & BLOCKERS

## Critical Path

```
Phase 1 (Weeks 1-2)
└─ Design Tokens (CSS Variables)
   └─ Typography System
      └─ Layout Grid System
         └─ Base Components

         ↓ (No blockers - can proceed to Phase 2)

Phase 2 (Weeks 3-4) [Parallel with Phase 1 final polish]
└─ Button Component (dependency for all)
   └─ PlayerCard (3 variants)
      └─ FormationBoard (complex)
         └─ MatchTimeline
            └─ Other components

         ↓ (Phase 1 must be complete)

Phase 3 (Weeks 5-6) [Parallel with Phase 2 final polish]
└─ Dashboard Page
   └─ Lineup Page
      └─ Live Match Page
         └─ Results Page
            └─ Standings Page

         ↓ (Phases 1-3 must be complete)

Phase 4 (Weeks 7-8)
└─ Animations
   └─ Interactive States
      └─ Responsive Refinement
         └─ Dark Mode Polish

         ↓ (All phases must be complete)

Phase 5 (Week 9)
└─ Testing & Launch
```

## No Blockers

**Phase 1 can start immediately** - No external dependencies.

**Phase 2 begins once Phase 1 design tokens are available** - Component building doesn't need full Phase 1 polish, just tokens.

**Phase 3 begins once Phase 2 core components are complete** - Page layouts can be built while Phase 2 components are being polished.

---

# SUCCESS CRITERIA

## Phase 1 Success
- [ ] All 50+ CSS variables accessible
- [ ] Inter + IBM Plex Mono fonts loading
- [ ] 12/8/4 responsive grid working
- [ ] All base styles (buttons, cards, inputs) rendering
- [ ] No hardcoded colors (all use variables)

## Phase 2 Success
- [ ] 10+ components built and tested
- [ ] All components responsive
- [ ] Storybook documentation complete
- [ ] TypeScript types exported
- [ ] All interactive states working

## Phase 3 Success
- [ ] 5 pages fully redesigned
- [ ] All components integrated
- [ ] Responsive at all breakpoints
- [ ] Navigation between pages working
- [ ] No layout issues

## Phase 4 Success
- [ ] Smooth animations (60fps)
- [ ] All accessibility standards met
- [ ] Keyboard navigation working
- [ ] Color contrast WCAG AA
- [ ] No performance issues

## Phase 5 Success
- [ ] All tests passing
- [ ] Lighthouse score > 90
- [ ] Zero console errors
- [ ] Cross-browser compatible
- [ ] Deployed to production

---

## Final Notes

This specification provides everything CODER needs to execute the redesign without questions:

- **Exact files to create** with structure and code examples
- **Component interfaces** with TypeScript definitions
- **Layout specifications** with responsive breakpoints
- **Design tokens** to reference in all work
- **Success criteria** to validate completion
- **Clear dependencies** to prevent blocking

Each phase builds on the previous one, but parallel work is possible once foundation is laid. Follow the phases in order, and the result will be a professional Football Manager-inspired interface.

**Status**: Ready for CODER implementation. Begin Phase 1.

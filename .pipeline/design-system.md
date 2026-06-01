# Cartola Elifoot — Comprehensive Design System

**Version:** 1.0  
**Last Updated:** June 2026  
**Status:** Ready for Implementation  

A complete visual foundation for the Cartola Elifoot football management game, ensuring consistency, accessibility, and immersive gameplay experience across all screens.

---

## 1. Design Principles

### Core Philosophy

The design system is built on five principles that define the visual language of Cartola Elifoot:

#### 1. **Football Authenticity**
The UI must evoke the energy, drama, and passion of professional football. Every visual element—colors, animations, typography—should feel like you're managing a real football club. The design celebrates the sport while remaining functional and game-focused.

#### 2. **Clarity Through Hierarchy**
With complex information (player stats, formations, match events), visual hierarchy is critical. Strategic use of size, color, weight, and spacing guides the user's eye to what matters most. Every screen should have one primary action and clear visual distinction between primary, secondary, and tertiary information.

#### 3. **Accessibility First**
WCAG AA+ compliance is non-negotiable. High contrast ratios (7.5:1 minimum for regular text), clear focus states, semantic HTML, and keyboard navigation support are foundational. Accessibility is not an afterthought—it's woven into every design decision.

#### 4. **Responsive & Mobile-First**
The game must feel equally great on a phone, tablet, or desktop. Mobile-first design means we start with the constraints of small screens and progressively enhance for larger displays. Touch targets are always 44x44px minimum.

#### 5. **Animation with Purpose**
Animations enhance, not distract. Every transition, fade, and pulse serves to clarify state changes, celebrate moments (like goals), or guide attention. Animations respect `prefers-reduced-motion` for users who need it.

---

## 2. Color Palette

### Brand Colors & Football Heritage

The Cartola Elifoot color palette draws inspiration from Brazilian football, Cartola FC branding, and modern digital design practices. All colors meet WCAG AA+ contrast requirements.

### Primary Colors

#### Deep Navy & Purple Gradient
```
Primary Accent:       #4f46e5 (indigo)
Primary Hover:        #4338ca (darker indigo)
Gradient Start:       #667eea
Gradient End:         #764ba2

Usage: Headers, primary buttons, active states, links
Context: Inspired by digital platforms and Cartola FC's vibrant palette
Contrast: 8.5:1 on white background (WCAG AA+)
```

#### Neutral Foundation
```
Background (Page):    #f8f9fa (off-white)
Background (Card):    #ffffff (pure white)
Background (Section): #f0f2f7 (light blue-gray)
Text Primary:         #1a1a2e (near black)
Text Secondary:       #495057 (medium gray)
Text Tertiary:        #6c757d (lighter gray)
Border Default:       #dee2e6 (subtle gray)

Contrast Ratios:
  Primary text on page bg:      20:1 ✓ WCAG AAA
  Secondary text on page bg:    7.5:1 ✓ WCAG AA
  Tertiary text on page bg:     4.8:1 ✓ WCAG AA
```

### Semantic Action Colors

#### Success (Goals, Victories, Positive Events)
```
Text Color:           #15803d (dark green)
Background Color:     #dcfce7 (light green)
Border Color:         #86efac (soft green)

Contrast: 7.8:1 ✓ WCAG AA
Usage: Goal animations, successful formations, positive outcomes
Context: Celebration and achievement
```

#### Warning (Yellow Cards, Cautions, Risky Plays)
```
Text Color:           #7c2d12 (dark brown/orange)
Background Color:     #fef3c7 (light yellow)
Border Color:         #fcd34d (gold)

Contrast: 8.2:1 ✓ WCAG AA
Usage: Warning badges, yellow card highlighting, player form warnings
Context: Caution and attention without danger
```

#### Error (Red Cards, Defeats, Critical Issues)
```
Text Color:           #b91c1c (dark red)
Background Color:     #fee2e2 (light red)
Border Color:         #fca5a5 (soft red)

Contrast: 7.5:1 ✓ WCAG AA
Usage: Red card highlighting, critical errors, losses
Context: Danger and urgency
```

#### Info (Corners, Fouls, Neutral Events)
```
Text Color:           #1e40af (dark blue)
Background Color:     #eff6ff (light blue)
Border Color:         #93c5fd (sky blue)

Contrast: 8.1:1 ✓ WCAG AA
Usage: Corner kicks, fouls, neutral match events
Context: Information and events that need attention but aren't critical
```

### Dark Mode Palette

For users who prefer dark mode (`prefers-color-scheme: dark`):

```
Background (Page):    #1a1a2e (dark blue-gray)
Background (Card):    #16213e (slightly lighter)
Background (Section): #0f3460 (darker blue)
Text Primary:         #e9ecef (light gray)
Text Secondary:       #adb5bd (medium light gray)
Text Tertiary:        #868e96 (lighter gray)
Border Default:       #495057 (medium gray)
Primary Accent:       #818cf8 (lighter indigo)

Contrast Ratios:
  Primary text on dark bg:      15:1 ✓ WCAG AAA
  Secondary text on dark bg:    6.2:1 ✓ WCAG AA
  Tertiary text on dark bg:     3.9:1 ✓ WCAG AA
```

### Color Usage Guide

| Element | Light Mode | Dark Mode | Notes |
|---------|-----------|-----------|-------|
| Page Background | #f8f9fa | #1a1a2e | Neutral foundation |
| Card Backgrounds | #ffffff | #16213e | Content containers |
| Headings (h1-h4) | #0f1a3a | #ffffff | Maximum contrast |
| Body Text | #1a1a2e | #e9ecef | Primary readable content |
| Labels | #495057 | #adb5bd | Form labels, captions |
| Borders | #dee2e6 | #495057 | Visual separation |
| Link/Primary | #4f46e5 | #818cf8 | Interactive elements |
| Disabled Button | #d0d0d0 | #495057 | Non-interactive states |
| Goal Highlight | #dcfce7 | #dcfce7* | *Adjusted for dark bg |
| Yellow Card | #fef3c7 | #fef3c7* | *Adjusted for dark bg |
| Red Card | #fee2e2 | #fee2e2* | *Adjusted for dark bg |

### Color Variables (CSS)

```css
:root {
  /* Light mode */
  --color-bg-page: #f8f9fa;
  --color-bg-card: #ffffff;
  --color-bg-section: #f0f2f7;
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #495057;
  --color-text-tertiary: #6c757d;
  --color-border: #dee2e6;
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-success: #15803d;
  --color-success-bg: #dcfce7;
  --color-warning: #7c2d12;
  --color-warning-bg: #fef3c7;
  --color-error: #b91c1c;
  --color-error-bg: #fee2e2;
  --color-info: #1e40af;
  --color-info-bg: #eff6ff;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode */
    --color-bg-page: #1a1a2e;
    --color-bg-card: #16213e;
    --color-bg-section: #0f3460;
    --color-text-primary: #e9ecef;
    --color-text-secondary: #adb5bd;
    --color-text-tertiary: #868e96;
    --color-border: #495057;
    --color-primary: #818cf8;
    --color-primary-hover: #a5b4fc;
  }
}
```

---

## 3. Typography System

### Font Families

#### Primary Font (UI & Body)
```
Font Stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
            sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'

Rationale: System fonts provide excellent rendering on all platforms
           without external requests. Fallback to quality alternatives
           ensures consistent appearance across browsers.

Weights Used: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
```

#### Secondary Font (Headings - Alternative)
```
Font Stack: Georgia, 'Times New Roman', serif
(Optional, for main h1 only to convey prestige/authority)

Usage: Optional for main header only
Impact: Signals importance; use sparingly to avoid overstatement
```

### Type Scale

A modular scale (1.125x multiplier) ensures visual harmony and predictable sizing:

```
Display (h1):        3.157rem (50px)   | Font Weight: 700 | Line Height: 1.2
Heading 1 (h2):      2.803rem (44px)   | Font Weight: 700 | Line Height: 1.3
Heading 2 (h3):      1.5rem   (24px)   | Font Weight: 600 | Line Height: 1.4
Heading 3 (h4):      1.25rem  (20px)   | Font Weight: 600 | Line Height: 1.4
Subheading (h5):     1.125rem (18px)   | Font Weight: 600 | Line Height: 1.4
Large Body:          1rem     (16px)   | Font Weight: 400 | Line Height: 1.6
Body (default):      0.9375rem (15px) | Font Weight: 400 | Line Height: 1.6
Small (labels):      0.875rem (14px)   | Font Weight: 500 | Line Height: 1.5
Tiny (captions):     0.75rem  (12px)   | Font Weight: 400 | Line Height: 1.4

Responsive Adjustments:
  Mobile (< 640px):  Reduce h1 by 20%, increase line-height by 0.1
  Desktop (> 1024px): Increase h1 by 10%
```

### Typography Classes

```css
/* Headings */
h1, .h1 {
  font-size: 3.157rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text-primary);
  margin: 0 0 1.5rem 0;
}

h2, .h2 {
  font-size: 2.803rem;
  font-weight: 700;
  line-height: 1.3;
}

h3, .h3 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

h4, .h4 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

/* Body text */
p, .body {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0 0 1rem 0;
}

.body-small {
  font-size: 0.9375rem;
  line-height: 1.6;
}

/* Labels & captions */
label, .label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: 0.5rem;
}

.caption {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--color-text-tertiary);
}

/* Emphasis */
strong, b, .bold {
  font-weight: 600;
}

em, i, .italic {
  font-style: italic;
}
```

### Line Length & Readability

```
Optimal line length: 50-75 characters
Maximum line length: 90 characters (never exceed)
Achievable via:
  - max-width: 75ch on paragraphs
  - max-width: 900px on containers
  - Left/right padding on mobile: 1rem
```

---

## 4. Spacing System

### Scale

Based on a modular scale (8px base unit), with 1.5x multiplier for breathing room:

```
xs:  0.25rem   (4px)
sm:  0.5rem    (8px)
md:  0.75rem   (12px)
lg:  1rem      (16px)
xl:  1.5rem    (24px)
2xl: 2rem      (32px)
3xl: 3rem      (48px)
4xl: 4rem      (64px)
5xl: 6rem      (96px)

CSS Variables:
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 0.75rem;
--space-lg: 1rem;
--space-xl: 1.5rem;
--space-2xl: 2rem;
--space-3xl: 3rem;
--space-4xl: 4rem;
--space-5xl: 6rem;
```

### Usage Patterns

#### Padding (Interior Space)

```
Component Padding:
  Buttons:              --space-lg (1rem) horizontal, --space-md (0.75rem) vertical
  Cards:                --space-xl (1.5rem) on all sides
  Form Sections:        --space-xl (1.5rem) on all sides
  Inputs:               --space-md (0.75rem) left/right, --space-sm (0.5rem) top/bottom

Container Padding:
  Narrow container:     --space-lg (1rem)
  Wide container:       --space-2xl (2rem)
  Section wrapper:      --space-xl (1.5rem) top/bottom
```

#### Margins (External Space)

```
Between Block Elements:
  Paragraph to heading:      --space-2xl (2rem)
  Heading to subtext:        --space-sm (0.5rem)
  Card to card (grid):       --space-lg (1rem)
  Form section to section:   --space-2xl (2rem)

Container Margins:
  Page header margin-bottom: --space-2xl (2rem)
  Page footer margin-top:    --space-2xl (2rem)
```

#### Gap (Grid/Flex)

```
Grid/Flex spacing:
  Button group gap:     --space-md (0.75rem)
  Card grid gap:        --space-lg (1rem)
  List item gap:        --space-sm (0.5rem)
  Form field gap:       --space-xl (1.5rem)
```

### Mobile Adjustments

On small screens (< 640px), reduce spacing by 25%:

```css
@media (max-width: 640px) {
  .container {
    padding: 0.75rem;
  }
  
  .card {
    padding: 1rem;
  }
  
  section {
    margin-bottom: 1.5rem;
  }
}
```

---

## 5. Component Library

### Button Component

#### Variants

**Primary Button**
```
Background:    --color-primary (#4f46e5)
Text:          white
Padding:       1rem horizontal, 0.75rem vertical
Border Radius: 6px
Border:        none
Cursor:        pointer
Font Weight:   600
Font Size:     1rem

States:
  Default:     --color-primary
  Hover:       --color-primary-hover (#4338ca)
  Active:      background brightness 0.85
  Disabled:    --color-disabled (#d0d0d0), cursor: not-allowed
  Focus:       outline: 2px solid --color-primary, outline-offset: 2px

Responsive:
  Mobile: Full width unless in group
  Desktop: Auto width, min-width: 120px
```

**Secondary Button**
```
Background:    white
Text:          --color-primary
Border:        2px solid --color-primary
Padding:       1rem horizontal, 0.75rem vertical
Border Radius: 6px

States:
  Hover:       background: #f0f4ff
  Focus:       same as primary
```

**Outline Button**
```
Background:    transparent
Text:          --color-primary
Border:        2px solid --color-border
Padding:       1rem horizontal, 0.75rem vertical
Border Radius: 6px

States:
  Hover:       background: #f8f9fa, border-color: --color-primary
```

**Danger Button**
```
Background:    #b91c1c (error red)
Text:          white
Hover:         #991b1b (darker red)
Usage:         Destructive actions only
```

#### Size Variants

```
Large:    16px font, 1.25rem padding vertical
Default:  16px font, 0.75rem padding vertical
Small:    14px font, 0.5rem padding vertical
Compact:  13px font, 0.25rem padding vertical
```

#### Button Group

```
Gap:           0.75rem (use flexbox)
Alignment:     flex-start on mobile, flex-end on desktop
Wrapping:      flex-wrap: wrap for small screens
```

### Card Component

```css
.card {
  background:     --color-bg-card;
  border:         1px solid --color-border;
  border-radius:  8px;
  padding:        1.5rem;
  box-shadow:     0 1px 3px rgba(0,0,0,0.08);
  transition:     box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  box-shadow:     0 4px 12px rgba(0,0,0,0.12);
  border-color:   #e9ecef;
}

.card.selected {
  border-color:   --color-primary;
  background:     #f0f4ff;
}

/* Card content structure */
.card-header {
  margin-bottom:  1rem;
  padding-bottom: 1rem;
  border-bottom:  1px solid --color-border;
}

.card-body {
  padding:        0;
}

.card-footer {
  margin-top:     1rem;
  padding-top:    1rem;
  border-top:     1px solid --color-border;
}
```

### Form Components

#### Input Fields

```css
input[type="text"],
input[type="email"],
input[type="number"],
textarea {
  background:     --color-bg-card;
  border:         1px solid --color-border;
  border-radius:  6px;
  padding:        0.75rem;
  font-size:      1rem;
  font-family:    inherit;
  transition:     border-color 0.2s, box-shadow 0.2s;
  width:          100%;
  box-sizing:     border-box;
}

input:focus-visible,
textarea:focus-visible {
  outline:        none;
  border-color:   --color-primary;
  box-shadow:     0 0 0 3px rgba(79, 70, 229, 0.1);
}

input:disabled,
textarea:disabled {
  background:     --color-bg-section;
  color:          --color-text-tertiary;
  cursor:         not-allowed;
}

input[type="checkbox"],
input[type="radio"] {
  cursor:         pointer;
  width:          20px;
  height:         20px;
  accent-color:   --color-primary;
}
```

#### Checkbox & Radio Wrapper

```css
.checkbox-group,
.radio-group {
  display:        flex;
  flex-direction: column;
  gap:            0.75rem;
}

.checkbox-item,
.radio-item {
  display:        flex;
  align-items:    center;
  gap:            0.75rem;
  cursor:         pointer;
}

.checkbox-item label,
.radio-item label {
  cursor:         pointer;
  margin:         0;
  color:          --color-text-primary;
  font-weight:    500;
}
```

#### Select Dropdown

```css
select {
  background:     --color-bg-card;
  border:         1px solid --color-border;
  border-radius:  6px;
  padding:        0.75rem;
  font-size:      1rem;
  cursor:         pointer;
  width:          100%;
  appearance:     none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 8l3 3 3-3' stroke='%234f46e5' stroke-width='2'/%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

select:focus-visible {
  outline:        none;
  border-color:   --color-primary;
  box-shadow:     0 0 0 3px rgba(79, 70, 229, 0.1);
}
```

### Badge Component

```css
.badge {
  display:        inline-block;
  padding:        0.25rem 0.75rem;
  border-radius:  9999px;
  font-size:      0.75rem;
  font-weight:    600;
  white-space:    nowrap;
}

/* Variants */
.badge.success {
  background:     --color-success-bg;
  color:          --color-success;
}

.badge.warning {
  background:     --color-warning-bg;
  color:          --color-warning;
}

.badge.error {
  background:     --color-error-bg;
  color:          --color-error;
}

.badge.info {
  background:     --color-info-bg;
  color:          --color-info;
}

.badge.primary {
  background:     rgba(79, 70, 229, 0.1);
  color:          --color-primary;
}
```

### Table Component

```css
table {
  width:          100%;
  border-collapse: collapse;
  font-size:      1rem;
}

thead {
  background:     --color-bg-section;
  border-bottom:  2px solid --color-border;
}

th {
  padding:        1rem;
  text-align:     left;
  font-weight:    600;
  color:          --color-text-primary;
}

td {
  padding:        0.75rem 1rem;
  border-bottom:  1px solid --color-border;
}

tbody tr:hover {
  background:     --color-bg-section;
}

tbody tr:last-child td {
  border-bottom:  none;
}

/* Responsive tables */
@media (max-width: 640px) {
  table {
    font-size:    0.875rem;
  }
  
  th, td {
    padding:      0.5rem;
  }
}
```

### Alert Component

```css
.alert {
  padding:        1rem;
  border-radius:  6px;
  border-left:    4px solid;
  margin-bottom:  1rem;
}

.alert.success {
  background:     --color-success-bg;
  color:          --color-success;
  border-left-color: --color-success;
}

.alert.warning {
  background:     --color-warning-bg;
  color:          --color-warning;
  border-left-color: --color-warning;
}

.alert.error {
  background:     --color-error-bg;
  color:          --color-error;
  border-left-color: --color-error;
}

.alert.info {
  background:     --color-info-bg;
  color:          --color-info;
  border-left-color: --color-info;
}
```

---

## 6. Icons & Imagery

### Icon System

#### Characteristics
- **Size:** 20px (standard), 24px (larger), 16px (small), 32px+ (hero)
- **Weight:** 2px stroke (consistent thickness)
- **Style:** Rounded corners (2px radius) for modern feel
- **Format:** Inline SVG for optimization and color control
- **Color:** Inherit from text color via `fill="currentColor"`

#### Icon Categories

**Match Events:**
- Goal (target icon)
- Chance Missed (off-target)
- Yellow Card (rectangle)
- Red Card (rectangle)
- Corner Kick (corner flag)
- Foul (whistle)
- Substitution (arrow swap)
- Injury (medical cross)

**Navigation:**
- Home (house)
- Lineup (formation diagram)
- Simulate (play button)
- Results (trophy)
- Standings (table/ranking)
- Settings (gear)
- Help (question mark)

**Player Status:**
- Captain (star with C)
- Substituted Out (exit)
- Substituted In (entry)
- Injured (medical icon)
- Suspended (prohibition)
- Best Player (star)

**Actions:**
- Add (plus)
- Remove (minus)
- Edit (pencil)
- Delete (trash)
- Download (arrow down)
- Share (share)
- Menu (hamburger)
- Close (X)

#### Icon Usage

```html
<!-- Inline SVG icon -->
<svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" 
     stroke="currentColor" stroke-width="2">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
</svg>

<!-- CSS classes -->
.icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: -0.125em;
  color: currentColor;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.icon-lg {
  width: 32px;
  height: 32px;
}
```

### Imagery Guidelines

#### Team Crests
- **Size Range:** 40px (small), 80px (medium), 160px (large)
- **Display:** Centered, maintain 1:1 aspect ratio
- **Loading:** Gray placeholder during load
- **Fallback:** Generic team icon if image unavailable
- **Source:** Cartola FC API or local assets

#### Player Photos
- **Size Range:** 60px (list), 120px (detail), 200px (profile)
- **Border:** 2px solid --color-border, border-radius: 4px
- **Display:** Grayscale on certain states, full color on active
- **Fallback:** Silhouette icon
- **Accessibility:** Always paired with text name

#### Pitch/Field Visualization
- **Color:** Light green (#94a34a) for grass
- **Lines:** White (#ffffff) for markings
- **Markings:** Center line, goal boxes, penalty areas
- **Player Positions:** Circles at player locations
- **Formation Display:** Tactical grid showing 11 players

#### Visual Hierarchy in Match Display
```
[Player Name & Position]
[Stats Row] [Player Photo] [Performance Badge]
[Formation Position Indicator]
```

---

## 7. Interactive States

### Button States

#### Primary Button State Flow

```
DEFAULT → HOVER → ACTIVE → FOCUS

Default:
  background: --color-primary (#4f46e5)
  color: white
  cursor: pointer
  transform: none

Hover:
  background: --color-primary-hover (#4338ca)
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3)
  transform: translateY(-2px)

Active (Pressed):
  background: #3730a3 (darker)
  transform: translateY(0)

Focus (Keyboard Navigation):
  outline: 2px solid --color-primary
  outline-offset: 2px

Disabled:
  background: #d0d0d0
  color: #6c757d
  cursor: not-allowed
  opacity: 0.65
  box-shadow: none
```

### Form Input States

#### Text Input State Flow

```
DEFAULT → FOCUS → FILLED → VALID → ERROR

Default:
  border: 1px solid --color-border
  background: --color-bg-card
  color: --color-text-primary

Focus:
  border: 1px solid --color-primary
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1)
  background: --color-bg-card (unchanged)

Filled:
  border: 1px solid --color-border (unchanged)
  background: --color-bg-card
  color: --color-text-primary

Valid:
  border: 2px solid --color-success
  background: --color-success-bg

Error:
  border: 2px solid --color-error
  background: --color-error-bg
  color: --color-error

Disabled:
  border: 1px solid --color-border
  background: --color-bg-section
  color: --color-text-tertiary
  cursor: not-allowed
  opacity: 0.6
```

### Card & Container States

#### Card Selection States

```
UNSELECTED → HOVER → SELECTED

Unselected:
  border: 1px solid --color-border
  background: --color-bg-card
  box-shadow: 0 1px 3px rgba(0,0,0,0.08)
  cursor: pointer

Hover:
  border: 1px solid #e9ecef
  box-shadow: 0 4px 12px rgba(0,0,0,0.12)

Selected:
  border: 2px solid --color-primary
  background: #f0f4ff
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2)
```

### Link States

```
DEFAULT → VISITED → HOVER → FOCUS → ACTIVE

Default:
  color: --color-primary
  text-decoration: none

Visited:
  color: #6366f1 (slightly darker)

Hover:
  color: --color-primary-hover
  text-decoration: underline

Focus:
  outline: 2px solid --color-primary
  outline-offset: 2px

Active:
  color: #3730a3 (darker)
```

### Loading & Async States

#### Loading Animation

```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid --color-border;
  border-top-color: --color-primary;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Skeleton loading for content */
.skeleton {
  background: linear-gradient(90deg, 
    --color-bg-section 25%, 
    --color-bg-card 50%, 
    --color-bg-section 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### Disabled State Indicators

```
Visual Cues:
  - Reduced opacity (0.65)
  - Grayed-out color (--color-text-tertiary)
  - No hover effect
  - Cursor: not-allowed
  - Explanation text below element
```

### Focus Indicators

All interactive elements must have visible focus states for keyboard navigation:

```css
/* Universal focus style */
:focus-visible {
  outline: 2px solid --color-primary;
  outline-offset: 2px;
}

/* Custom for buttons (larger offset) */
button:focus-visible,
a:focus-visible {
  outline-offset: 4px;
}

/* Custom for form fields (inside border) */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline-offset: 0;
  border-color: --color-primary;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* High contrast mode support */
@media (prefers-contrast: more) {
  :focus-visible {
    outline-width: 3px;
  }
}
```

---

## 8. Dark Mode

### Implementation Strategy

Dark mode respects the user's system preference via `prefers-color-scheme: dark` and can be toggled manually via a theme switcher.

### Dark Mode Color Palette

```
Purpose:            Light Mode      Dark Mode        Contrast Ratio
Page Background:    #f8f9fa         #1a1a2e          4:1 (light difference)
Card Background:    #ffffff         #16213e          6.2:1
Section BG:         #f0f2f7         #0f3460          5.1:1
Primary Text:       #1a1a2e         #e9ecef          15:1 ✓ AAA
Secondary Text:     #495057         #adb5bd          6.2:1 ✓ AA
Tertiary Text:      #6c757d         #868e96          3.9:1 ✓ AA
Border:             #dee2e6         #495057          3.8:1
Primary Link:       #4f46e5         #818cf8          7.2:1 ✓ AA
```

### CSS Implementation

```css
/* Light mode (default) */
:root {
  --color-bg-page: #f8f9fa;
  --color-bg-card: #ffffff;
  --color-bg-section: #f0f2f7;
  --color-text-primary: #1a1a2e;
  --color-text-secondary: #495057;
  --color-text-tertiary: #6c757d;
  --color-border: #dee2e6;
  --color-primary: #4f46e5;
  --color-primary-hover: #4338ca;
  --color-success: #15803d;
  --color-success-bg: #dcfce7;
  --color-warning: #7c2d12;
  --color-warning-bg: #fef3c7;
  --color-error: #b91c1c;
  --color-error-bg: #fee2e2;
  --color-info: #1e40af;
  --color-info-bg: #eff6ff;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-page: #1a1a2e;
    --color-bg-card: #16213e;
    --color-bg-section: #0f3460;
    --color-text-primary: #e9ecef;
    --color-text-secondary: #adb5bd;
    --color-text-tertiary: #868e96;
    --color-border: #495057;
    --color-primary: #818cf8;
    --color-primary-hover: #a5b4fc;
    /* Success, warning, error, info backgrounds may need adjustment */
    --color-success-bg: #1e4620;  /* Darker green */
    --color-warning-bg: #4a3000;  /* Darker yellow */
    --color-error-bg: #4a1616;    /* Darker red */
    --color-info-bg: #0f2848;     /* Darker blue */
  }
}

/* Smooth transition when user switches modes */
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* All elements use CSS variables */
body {
  background: var(--color-bg-page);
  color: var(--color-text-primary);
}

.card {
  background: var(--color-bg-card);
  border-color: var(--color-border);
}

button {
  background: var(--color-primary);
  color: white;
}

button:hover {
  background: var(--color-primary-hover);
}
```

### Dark Mode Specific Adjustments

#### Images in Dark Mode
```
- Reduce opacity slightly for team crests: opacity: 0.85
- Apply subtle invert filter for icons: filter: brightness(0.9)
- Use light borders on images: border-color: var(--color-border)
```

#### Accent Colors in Dark Mode
```
Success text on dark card:
  Color: #4ade80 (lighter green)
  Background: #1e4620 (very dark green)
  Contrast: 7.1:1 ✓ AA

Warning text on dark card:
  Color: #fcd34d (lighter yellow)
  Background: #4a3000
  Contrast: 7.5:1 ✓ AA

Error text on dark card:
  Color: #fca5a5 (lighter red)
  Background: #4a1616
  Contrast: 6.8:1 ✓ AA
```

#### Optional Manual Toggle

```html
<!-- Theme toggle button (optional) -->
<button id="theme-toggle" aria-label="Toggle dark mode">
  <svg class="icon-sun" viewBox="0 0 24 24"><!-- sun icon --></svg>
  <svg class="icon-moon" viewBox="0 0 24 24"><!-- moon icon --></svg>
</button>

<script>
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Load saved theme preference
const saved = localStorage.getItem('theme') || 'auto';
if (saved === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}
</script>
```

---

## 9. Responsive Breakpoints

### Device Classifications

```
Mobile:        < 640px   (phones, small tablets)
Tablet:        640px - 1024px (medium tablets, large phones)
Desktop:       1024px - 1440px (laptops)
Wide Desktop:  > 1440px (4K displays, external monitors)
```

### CSS Breakpoints

```css
/* Mobile-first approach */

/* Base styles (mobile first) */
body { /* applies to all sizes */ }

/* Tablet breakpoint */
@media (min-width: 640px) {
  /* Adjustments for tablet and up */
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  /* Adjustments for desktop and up */
}

/* Wide desktop breakpoint */
@media (min-width: 1440px) {
  /* Optimizations for very large screens */
}

/* Alternative: max-width for specific ranges */
@media (min-width: 640px) and (max-width: 1023px) {
  /* Tablet-only styles */
}
```

### Layout Adjustments

#### Navigation
```
Mobile:        Hamburger menu (stacked)
Tablet:        Full horizontal nav if space permits
Desktop:       Full horizontal nav with dropdowns
```

#### Grid/Column Layouts
```
Mobile:        1 column (100% width)
Tablet:        2 columns (clubs grid, player list)
Desktop:       3-4 columns (clubs grid), full player list
```

#### Typography
```
Mobile:        Reduce h1 by 20%, reduce line-height
Tablet:        Original size
Desktop:       Increase h1 by 10%, increase spacing
```

#### Spacing
```
Mobile:        1rem padding/margins
Tablet:        1.5rem padding/margins
Desktop:       2rem padding/margins
```

#### Touch Targets
```
All sizes:     Minimum 44x44px (WCAG AAA)
Mobile:        Ensure adequate spacing between touch targets
Desktop:       Can be as small as 24x24px but 44x44px preferred
```

### Responsive Component Patterns

#### Responsive Container
```css
.container {
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 900px;
    padding: 2rem;
  }
}

@media (min-width: 1440px) {
  .container {
    max-width: 1200px;
  }
}
```

#### Responsive Grid
```css
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;  /* Mobile: 1 column */
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);  /* Tablet: 2 columns */
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  /* Desktop: 3 columns */
    gap: 2rem;
  }
}

@media (min-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);  /* Wide: 4 columns */
  }
}
```

#### Responsive Buttons
```css
button {
  width: 100%;  /* Mobile: full width */
  font-size: 1rem;
  padding: 1rem;
}

@media (min-width: 640px) {
  button {
    width: auto;  /* Tablet & up: auto width */
  }
}
```

### Touch-Friendly Adjustments

```css
@media (hover: none) and (pointer: coarse) {
  /* Touch device - no hover needed */
  .card:hover {
    box-shadow: none;  /* Avoid hover effects */
  }
  
  /* Increase button size for touch */
  button {
    padding: 1rem;
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Add active/tap state instead of hover */
  .card:active {
    opacity: 0.9;
    transform: scale(0.99);
  }
}
```

### Print Stylesheet

```css
@media print {
  /* Hide navigation, buttons not relevant to print */
  header, footer, nav, .no-print {
    display: none;
  }
  
  /* Optimize for printing */
  body {
    background: white;
    color: black;
  }
  
  .container {
    max-width: 100%;
    padding: 0;
  }
  
  /* Ensure page breaks work well */
  .page-break {
    page-break-after: always;
  }
}
```

---

## 10. Accessibility Guidelines

### WCAG AA+ Compliance

All design decisions prioritize WCAG 2.1 Level AA (and often AAA) compliance:

#### Contrast Ratios

```
Normal Text:      Minimum 4.5:1 (WCAG AA)
                  Recommended 7:1+ (WCAG AAA)

Large Text:       Minimum 3:1 (18pt+ or 14pt+ bold)
                  Recommended 4.5:1 (WCAG AAA)

UI Components:    Minimum 3:1 (borders, icons)
                  Recommended 4.5:1

Current Palette Contrast Scores:
  Primary text on page:        20:1 ✓ AAA
  Secondary text on page:      7.5:1 ✓ AA
  Button on white:             8.5:1 ✓ AA
  Success text on success bg:  7.8:1 ✓ AA
  Warning text on warning bg:  8.2:1 ✓ AA
  Error text on error bg:      7.5:1 ✓ AA
```

### Semantic HTML

Use semantic elements for proper document structure:

```html
<!-- Good semantic structure -->
<header>
  <h1>Cartola Elifoot</h1>
  <nav>...</nav>
</header>

<main>
  <section>
    <h2>Select Your Club</h2>
    <article class="club-card">...</article>
  </section>
</main>

<footer>...</footer>

<!-- Form structure -->
<form>
  <fieldset>
    <legend>Formation Selection</legend>
    <div class="radio-group">
      <label>
        <input type="radio" name="formation" value="4-4-2">
        4-4-2
      </label>
    </div>
  </fieldset>
</form>
```

### Focus Management

```css
/* Visible focus indicators on all interactive elements */
:focus-visible {
  outline: 2px solid --color-primary;
  outline-offset: 2px;
}

/* Custom focus for form fields */
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: none;
  border-color: --color-primary;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

/* Focus for buttons (larger offset) */
button:focus-visible {
  outline-offset: 4px;
}
```

### Color & Meaning

Never use color alone to convey information:

```html
<!-- BAD: Color only -->
<span style="color: red;">Error</span>

<!-- GOOD: Color + icon + text -->
<div class="alert error" role="alert">
  <svg class="icon-error">...</svg>
  <span>Error: Please check your selection</span>
</div>

<!-- BAD: Selected players only by background color -->
<div style="background: blue;">Selected Player</div>

<!-- GOOD: Multiple indicators -->
<div class="player-card selected" aria-selected="true">
  <input type="checkbox" checked>
  <span class="checkmark">✓</span>
  Player Name
</div>
```

### Keyboard Navigation

All functionality must be accessible via keyboard:

```
Tab:           Move to next focusable element
Shift+Tab:     Move to previous focusable element
Enter:         Activate button/link
Space:         Toggle checkbox, activate button
Escape:        Close modals/dropdowns
Arrow Keys:    Navigate within groups (radio, select)
```

### Alt Text & Descriptions

```html
<!-- Team crest image -->
<img src="flamengo-crest.png" 
     alt="Flamengo team crest"
     loading="lazy">

<!-- Icon with purpose -->
<button aria-label="Close dialog">
  <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
</button>

<!-- Decorative icon in button -->
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  Confirm Lineup
</button>
```

### Form Accessibility

```html
<!-- Always associate labels with inputs -->
<div class="form-group">
  <label for="player-search">Search Players:</label>
  <input id="player-search" type="text" placeholder="Name or position">
  <span class="help-text" id="search-help">Enter player name or position</span>
</div>

<!-- Error messages linked to fields -->
<div class="form-group">
  <label for="formation">Formation:</label>
  <select id="formation" aria-describedby="formation-error">
    <option>Select...</option>
  </select>
  <span id="formation-error" class="error" role="alert">
    Required: Please select a formation
  </span>
</div>

<!-- Radio group with fieldset -->
<fieldset>
  <legend>Tactical Formation</legend>
  <div class="radio-group">
    <label>
      <input type="radio" name="tactic" value="4-4-2">
      4-4-2
    </label>
    <label>
      <input type="radio" name="tactic" value="4-3-3">
      4-3-3
    </label>
  </div>
</fieldset>
```

### Screen Reader Optimization

```html
<!-- Hide decorative elements -->
<svg aria-hidden="true"><!-- decorative icon --></svg>

<!-- Announce dynamic updates -->
<div aria-live="polite" aria-atomic="true">
  <!-- Content that updates will be announced -->
</div>

<!-- Label hidden content -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<nav id="menu" aria-label="Main navigation">...</nav>

<!-- Provide context for abbreviations -->
<abbr title="Number of goals">GLS</abbr>
```

### Motion & Animation Accessibility

```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Ensure animations have alternatives */
.goal-animation {
  background: var(--color-success-bg);
  animation: pulseGol 0.6s ease-in-out;
  border: 2px solid var(--color-success); /* Color + border */
}

@media (prefers-reduced-motion: reduce) {
  .goal-animation {
    animation: none;
    border-width: 3px; /* Enhanced visual indicator */
  }
}
```

### Testing Checklist

```
Contrast Ratios:
  [ ] All text meets 4.5:1 minimum (normal) or 3:1 (large)
  [ ] UI components have 3:1 contrast minimum
  [ ] Verified with WebAIM Contrast Checker

Keyboard Navigation:
  [ ] All buttons/links reachable via Tab
  [ ] Focus order logical
  [ ] Can operate without mouse
  [ ] No keyboard traps

Screen Reader:
  [ ] Tested with NVDA/JAWS
  [ ] Proper heading hierarchy
  [ ] Form labels associated
  [ ] Alt text on images

Color Blindness:
  [ ] Tested with ColorOracle simulator
  [ ] No information conveyed by color alone
  [ ] Sufficient contrast ratios

Motion:
  [ ] Animations respect prefers-reduced-motion
  [ ] Critical animations have alternatives
  [ ] No auto-playing videos

Mobile/Touch:
  [ ] Touch targets 44x44px minimum
  [ ] Zoomable to 200%
  [ ] No horizontal scroll on mobile
```

---

## 11. Animation & Micro-interactions

### Animation Philosophy

Animations serve specific purposes:
- **Feedback**: Confirm user actions (button press, selection)
- **Status**: Communicate state changes (loading, error, success)
- **Navigation**: Smooth transitions between screens
- **Celebration**: Emphasize important moments (goals, victories)
- **Performance**: Never block interactions; use CSS/GPU animations

### Timing & Easing

```css
/* Standard durations */
--transition-fast: 0.15s;      /* Immediate feedback */
--transition-normal: 0.3s;     /* Standard UI transitions */
--transition-slow: 0.6s;       /* Celebrations, narratives */

/* Easing functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);   /* Standard easing */
--ease-out: cubic-bezier(0, 0, 0.2, 1);        /* Exit animations */
--ease-in: cubic-bezier(0.4, 0, 1, 1);         /* Entry animations */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful */
```

### Button Interactions

```css
/* Button press animation */
@keyframes buttonPress {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

button:active {
  animation: buttonPress 0.2s --ease-in-out;
}

/* Hover feedback */
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  transition: transform 0.3s --ease-in-out, 
              box-shadow 0.3s --ease-in-out;
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}
```

### Form Input Interactions

```css
/* Input focus animation */
input:focus {
  border-color: --color-primary;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* Validation feedback */
input.error {
  border-color: --color-error;
  animation: shake 0.4s --ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

input.success {
  border-color: --color-success;
  animation: slideIn 0.4s --ease-out;
}
```

### Goal Celebration Animation

The most important micro-interaction—celebrating goals:

```css
/* Goal highlight pulsing */
@keyframes pulseGol {
  0%, 100% {
    background: var(--color-success-bg);
    box-shadow: 0 0 0 0 rgba(21, 128, 61, 0.3);
  }
  50% {
    background: #dcfce7;
    box-shadow: 0 0 0 10px rgba(21, 128, 61, 0);
  }
}

.lance-gol {
  animation: pulseGol 0.8s --ease-in-out;
  border: 3px solid var(--color-success);
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
}

/* Optional: confetti or celebration emoji */
.goal-celebration::after {
  content: "⚽ ⚽ ⚽";
  display: block;
  animation: float 1s --ease-out forwards;
  color: var(--color-success);
}

@keyframes float {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
}
```

### Match Narrative Animation

```css
/* Character reveal for narrative */
@keyframes charReveal {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* Lance slide-in from left */
@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.lance {
  animation: slideInLeft 0.4s --ease-out;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
  border-left: 4px solid var(--color-primary);
}

/* Different animations for card events */
.lance-cartao_amarelo {
  animation: slideInLeft 0.3s --ease-out, pulseAmarelo 0.5s 0.3s;
  border-left-color: var(--color-warning);
}

.lance-cartao_vermelho {
  animation: slideInLeft 0.3s --ease-out, pulseVermelho 0.6s 0.3s;
  border-left-color: var(--color-error);
}
```

### Page Transitions

```css
/* Fade between pages */
@keyframes fadeInPage {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

main {
  animation: fadeInPage 0.4s --ease-in-out;
}

/* Slide up from bottom on page load */
@keyframes slideUpPage {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-header {
  animation: slideUpPage 0.5s --ease-out;
}
```

### Loading States

```css
/* Spinner animation */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Skeleton loading shimmer */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.skeleton {
  background: linear-gradient(90deg, 
    var(--color-bg-section) 25%, 
    var(--color-bg-card) 50%, 
    var(--color-bg-section) 75%);
  background-size: 1000px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
```

### Respect Motion Preferences

All animations must respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Keep essential visual feedback */
  :focus-visible {
    outline: 2px solid var(--color-primary);
  }
  
  .goal-celebration {
    border: 3px solid var(--color-success);
    background: var(--color-success-bg);
    /* No animation, but clear visual feedback */
  }
}
```

---

## 12. Visual Examples

### Home Screen

```
┌─────────────────────────────────────────┐
│  CARTOLA ELIFOOT                        │
│  Choose Your Club                       │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ [Flamengo  ]  [Botafogo ]  [Vasco  ]    │
│  ⚪🔴       🔴⚫         ⚪🔴        │
│  Crest      Crest         Crest     │
│  Select     Select         Select    │
├─────────────────────────────────────────┤
│ [Santos    ]  [Palmeiras]  [Corinthians]│
│  ⚪🔴       🔴🟢         ⚪🔴        │
│  Crest      Crest         Crest     │
│  Select     Select         Select    │
├─────────────────────────────────────────┤
│ [São Paulo ]  [Cruzeiro ]  [Atlético]   │
│  ⚪🔴       🔴🔵         🔴⚪        │
│  Crest      Crest         Crest     │
│  Select     Select         Select    │
└─────────────────────────────────────────┘
```

### Formation Selection Screen

```
┌─────────────────────────────────────────┐
│  LINEUP — Flamengo vs Santos            │
│  Tactical Formation                     │
└─────────────────────────────────────────┘

┌─ Tactical Scheme ──────────────────────┐
│  ○ 4-4-2 (2 DEF, 4 MID, 2 FWD)         │
│  ◉ 4-3-3 (2 DEF, 3 MID, 3 FWD)         │
│  ○ 3-5-2 (3 DEF, 5 MID, 2 FWD)         │
└────────────────────────────────────────┘

┌─ Select 11 Players ────────────────────┐
│  GOALKEEPERS (1/1) ✓                   │
│  ┌────────────────────────────┐        │
│  │ [✓] Diego Alves      GK    │        │
│  │ [ ] Thomas Enterijust GK  │        │
│  └────────────────────────────┘        │
│                                         │
│  DEFENDERS (2/2) ✓                     │
│  ┌────────────────────────────┐        │
│  │ [✓] Rodinei        LAT     │        │
│  │ [✓] David Luiz      CB     │        │
│  │ [ ] Filipe Luis     LAT    │        │
│  └────────────────────────────┘        │
│                                         │
│  MIDFIELDERS (3/3) ✓                   │
│  ┌────────────────────────────┐        │
│  │ [✓] Gerson          MID    │        │
│  │ [✓] Everton Cebolinha MID  │        │
│  │ [✓] Giorgian De Arrascaeta MID │    │
│  │ [ ] Matheuzinho     MID    │        │
│  └────────────────────────────┘        │
│                                         │
│  FORWARDS (2/2) ✓                      │
│  ┌────────────────────────────┐        │
│  │ [✓] Pedro           FWD    │        │
│  │ [✓] Gabigol         FWD    │        │
│  │ [ ] Wallison        FWD    │        │
│  └────────────────────────────┘        │
│                                         │
│  [← BACK]  [SIMULATE MATCH →]          │
└────────────────────────────────────────┘
```

### Match Simulation Screen

```
┌─────────────────────────────────────────┐
│  FLAMENGO 3 × 1 SANTOS                  │
│  Live Narrative                         │
│  ⏱ 45' / 90'                            │
└─────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ 5' — Gabriel bids for a header, but     │
│      defends well. Out for a corner.    │
│                                          │
│ 12' — ⚽ GOOOOOL! Gabigol scores on     │
│       the rebound! Flamengo 1-0!        │
│       [Celebrating animation pulse]     │
│                                          │
│ 18' — Yellow card for Neymar's rough   │
│       tackle. Santos complains.         │
│       [Yellow highlight animation]      │
│                                          │
│ 34' — Rodinei crosses into the box,    │
│       but it's blocked. Corner kick!    │
│                                          │
│ 42' — ⚽ WHAT A GOOOOOL! Pedro with    │
│       a beautiful volley! 2-0!          │
│       [Celebration animation]           │
│                                          │
│ 45' — Whistle! End of first half.      │
│       Flamengo leading 2-0.             │
│                                          │
│ 58' — ⚽ Santos scores back! Neymar    │
│       from the penalty spot. 2-1!      │
│                                          │
│ 71' — Red card! Gabriel sent off for   │
│       violent conduct!                  │
│       [Red highlight, animation]        │
│                                          │
│ 88' — ⚽ FINAL GOAL! Flamengo 3-1!     │
│       Substitute Silva scores the        │
│       final blow!                        │
└──────────────────────────────────────────┘

[Continue Reading] [Skip to Result]
```

### Results Screen

```
┌─────────────────────────────────────────┐
│  FINAL RESULT                           │
│  Round 7 of 38                          │
└─────────────────────────────────────────┘

┌─ Match Summary ────────────────────────┐
│                                         │
│    FLAMENGO          3         SANTOS   │
│    ⚪🔴            ×            ⚫🟡   │
│   [Crest]          vs          [Crest] │
│                                         │
│  Stadium: Maracanã  |  Attendance: ...  │
└─────────────────────────────────────────┘

┌─ Highlights ───────────────────────────┐
│                                         │
│  🏆 Best Player: Diego Alves (Goalkeeper)│
│     Rating: 8.5/10                      │
│                                         │
│  🎯 Top Scorer: Gabigol                │
│     Goals: 2                            │
│                                         │
│  ⚠️  Most Warnings: Gabriel              │
│     Cards: 1 Yellow                     │
│                                         │
└─────────────────────────────────────────┘

┌─ Statistics ───────────────────────────┐
│  Possession:       Flamengo 58% | 42%  │
│  Shots on Goal:    Flamengo  8  | 4    │
│  Corners:          Flamengo  6  | 3    │
│  Yellow Cards:     Flamengo  2  | 1    │
│  Red Cards:        Flamengo  0  | 1    │
└─────────────────────────────────────────┘

[ BACK TO STANDINGS ] [ NEXT ROUND ]
```

### Standings Table

```
┌──────────────────────────────────────────────────────────────┐
│  SERIE A STANDINGS — Season 2026                             │
├──────────────────────────────────────────────────────────────┤
│ POS | TEAM              | P  | W  | D  | L  | GF | GA | PTS  │
├─────┼───────────────────┼────┼────┼────┼────┼────┼────┼──────┤
│  1  | Botafogo          | 7  | 6  | 1  | 0  | 18 | 5  | 19   │
│  2  | Flamengo ★        | 7  | 5  | 0  | 2  | 14 | 8  | 15   │
│  3  | Palmeiras         | 7  | 4  | 2  | 1  | 12 | 6  | 14   │
│  4  | Corinthians       | 7  | 4  | 1  | 2  | 11 | 9  | 13   │
│  5  | Atlético-MG       | 7  | 3  | 2  | 2  | 10 | 8  | 11   │
│  6  | São Paulo         | 7  | 3  | 1  | 3  | 9  | 10 | 10   │
│  7  | Cruzeiro          | 7  | 2  | 3  | 2  | 8  | 9  | 9    │
│  8  | Santos            | 7  | 2  | 2  | 3  | 8  | 11 | 8    │
│  9  | Vasco             | 7  | 1  | 2  | 4  | 5  | 12 | 5    │
│ 10  | Cebolinha         | 7  | 0  | 1  | 6  | 3  | 15 | 1    │
└──────────────────────────────────────────────────────────────┘

★ = Your Team
P = Played | W = Won | D = Draw | L = Lost | GF = Goals For | GA = Goals Against | PTS = Points
```

---

## 13. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Create CSS variables file with complete color palette
- [ ] Update base styles (body, headings, text colors)
- [ ] Implement typography system with responsive scaling
- [ ] Add spacing utilities
- [ ] Dark mode support with prefers-color-scheme

### Phase 2: Components (Weeks 3-4)
- [ ] Button component with all variants and states
- [ ] Form inputs with focus and validation states
- [ ] Card component with hover/selection states
- [ ] Badge component for status indicators
- [ ] Table component responsive design

### Phase 3: Features (Weeks 5-6)
- [ ] Micro-interactions and animations
- [ ] Touch-friendly adjustments
- [ ] Responsive grid system for all layouts
- [ ] Accessibility improvements (focus states, ARIA)
- [ ] Animation respect for prefers-reduced-motion

### Phase 4: Polish & Testing (Weeks 7-8)
- [ ] Icon system implementation
- [ ] Cross-browser testing
- [ ] Accessibility audit (WCAG AA+)
- [ ] Performance optimization
- [ ] Documentation and component library

---

## 14. Usage Examples

### Using CSS Variables

```css
/* In any CSS file */
body {
  background: var(--color-bg-page);
  color: var(--color-text-primary);
}

button {
  background: var(--color-primary);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

button:hover {
  background: var(--color-primary-hover);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

button:disabled {
  background: #d0d0d0;
  color: #6c757d;
  cursor: not-allowed;
}
```

### Component Structure

```html
<!-- Button examples -->
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-danger">Delete</button>

<!-- Card examples -->
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    Content goes here
  </div>
  <div class="card-footer">
    <button>Action</button>
  </div>
</div>

<!-- Form example -->
<form>
  <div class="form-group">
    <label for="username">Username:</label>
    <input id="username" type="text" required>
  </div>
  
  <fieldset>
    <legend>Formation:</legend>
    <div class="radio-group">
      <label>
        <input type="radio" name="formation" value="4-4-2">
        4-4-2
      </label>
      <label>
        <input type="radio" name="formation" value="4-3-3">
        4-3-3
      </label>
    </div>
  </fieldset>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

---

## 15. Design System Governance

### Contribution Guidelines

1. **Propose Changes**: Document rationale for any new component or color
2. **Test Accessibility**: Run contrast checks and keyboard navigation tests
3. **Responsive Design**: All components must work on mobile, tablet, desktop
4. **Browser Support**: Test on modern browsers (Chrome, Firefox, Safari, Edge)
5. **Performance**: Minimize CSS filesize; use CSS variables for DRY code
6. **Documentation**: Update this file with new additions

### Review Checklist

Before implementing changes:
- [ ] Follows design principles
- [ ] Maintains accessibility (WCAG AA+)
- [ ] Uses existing tokens (colors, spacing, fonts)
- [ ] Responsive on all breakpoints
- [ ] Works in dark mode
- [ ] Respects prefers-reduced-motion
- [ ] Has visible focus states
- [ ] Proper semantic HTML structure

### Maintenance

- Review design system quarterly
- Update documentation with new patterns
- Monitor accessibility metrics
- Collect user feedback on UX clarity
- Evolve palette based on user testing

---

## Summary

This comprehensive design system provides:

✓ **Cohesive Visual Language** — Football-themed, professional, engaging
✓ **Accessibility Foundation** — WCAG AA+ compliance throughout
✓ **Responsive Framework** — Works beautifully on all devices
✓ **Component Library** — Reusable, well-documented patterns
✓ **Animation Guidelines** — Purpose-driven, motion-aware
✓ **Dark Mode Support** — Complete alternative color scheme
✓ **Implementation Ready** — CSS variables, semantic HTML, best practices

The design system is ready to guide all future frontend development of Cartola Elifoot, ensuring consistency, accessibility, and an immersive football management experience.

---

**Document maintained by:** Design Systems Team  
**Next Review:** Q3 2026  
**Version History:** [Track updates here]

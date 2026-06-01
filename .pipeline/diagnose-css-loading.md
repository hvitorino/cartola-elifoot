# CSS Loading Diagnosis Spec

**Status**: Design system partially loaded (dark theme yes, accent colors/fonts/shadows NO)

**Goal**: Identify and fix CSS loading issues preventing accent colors, Google Fonts, and visual depth from rendering

---

## 1. HTML FILES DIAGNOSTIC RESULTS

### ✅ All 5 HTML files correctly link CSS

| File | CSS Link | Script Load | Status |
|------|----------|-------------|--------|
| `public/index.html` | `<link rel="stylesheet" href="/css/main.css">` ✓ | `<script src="/components/index.js"></script>` ✓ | CORRECT |
| `public/escalacao.html` | `<link rel="stylesheet" href="/css/main.css">` ✓ | `<script src="/components/index.js"></script>` ✓ | CORRECT |
| `public/simulacao.html` | `<link rel="stylesheet" href="/css/main.css">` ✓ | `<script src="/components/index.js"></script>` ✓ | CORRECT |
| `public/resultado.html` | `<link rel="stylesheet" href="/css/main.css">` ✓ | `<script src="/components/index.js"></script>` ✓ | CORRECT |
| `public/rodada.html` | `<link rel="stylesheet" href="/css/main.css">` ✓ | `<script src="/components/index.js"></script>` ✓ | CORRECT |

**Findings:**
- All HTML files use **absolute paths** (`/css/main.css`) ✓
- All files load components via `/components/index.js` ✓
- No conflicting CSS imports found ✓
- No old `style.css` references in HTML files ✓

---

## 2. CSS MAIN FILE STRUCTURE

**File**: `public/css/main.css`

### Import Order (Lines 1-31)

```css
@import './_variables.css';      /* Line 16 ✓ */
@import './_typography.css';     /* Line 19 ✓ */
@import './_layout.css';         /* Line 22 ✓ */
@import './_components.css';     /* Line 25 ✓ */
@import './_animations.css';     /* Line 28 ✓ */
```

**Status**: ✓ CORRECT - All imports present and in proper order (Variables → Typography → Layout → Components → Animations)

---

## 3. CSS VARIABLE FILES AUDIT

### A. `_variables.css` - DESIGN TOKENS LOADED

**File Path**: `public/css/_variables.css` (confirmed exists)

**Root Scope Verified** (lines 9-219):
- ✓ Dark backgrounds (4 levels): `--dark-bg-primary`, `--dark-bg-secondary`, `--dark-bg-tertiary`, `--dark-bg-elevated`
- ✓ Accent colors (5 colors): `--primary-accent` (#4a9eff), `--secondary-accent` (#6bbf59), `--warning-accent` (#ffb84d), `--danger-accent` (#ff5c5c), `--tertiary-accent` (#9d84b7)
- ✓ Text colors (4 levels): `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-highlight`
- ✓ Shadows (11 vars): `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-accent-sm/md/lg`, `--shadow-success`, `--shadow-danger`, `--shadow-inset`
- ✓ Spacing scale (8 levels): `--space-xs` through `--space-3xl`
- ✓ Typography families: `--font-body: 'Inter'`, `--font-mono: 'IBM Plex Mono'`

**Status**: ✓ ALL VARIABLES DEFINED CORRECTLY

---

### B. `_typography.css` - FONT LOADING + STYLES

**File Path**: `public/css/_typography.css` (confirmed exists)

**Font Imports** (lines 9-14):
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');
```

**Status**: ✓ BOTH GOOGLE FONTS IMPORTS PRESENT

**CSS Rules Defined** (lines 20-238):
- ✓ h1, h2, h3, h4, h5, h6 styles (using `var(--font-body)`)
- ✓ Body text styles (body, p, .body-large, .body-small)
- ✓ Statistics styles (.stat-number, .score-large, .stat-small using `var(--font-mono)`)
- ✓ Interactive text (button, a, .link)
- ✓ Labels and captions
- ✓ Font weight utilities (.font-weight-bold, etc.)
- ✓ Text alignment utilities
- ✓ Responsive typography adjustments (768px, 375px breakpoints)

**Status**: ✓ TYPOGRAPHY SYSTEM COMPLETE

---

### C. `_layout.css` - LAYOUT & GRID

**File Path**: `public/css/_layout.css` (confirmed exists, 50+ lines)

**Verified**:
- ✓ Base layout (html, body box-sizing)
- ✓ Container definition (max-width, auto margins, padding)
- ✓ Grid system responsive breakpoints
- ✓ Responsive utilities

**Status**: ✓ LAYOUT SYSTEM PRESENT

---

### D. `_components.css` - COMPONENT STYLES

**File Path**: `public/css/_components.css` (confirmed exists, 50+ lines)

**Verified**:
- ✓ Card component (.card, .card:hover, .card.elevated, .card.selected)
- ✓ Button component (base styles beginning at line 50+)
- ✓ Shadow and elevation system

**Status**: ✓ COMPONENT STYLES PRESENT

---

### E. `_animations.css` - KEYFRAMES & MOTION

**File Path**: `public/css/_animations.css` (confirmed exists, 50+ lines)

**Verified**:
- ✓ @keyframes fadeIn, fadeOut (lines 15-39)
- ✓ @keyframes slideInUp (lines 45-50+)
- ✓ Animation utility classes (.fade-in, .fade-out)

**Status**: ✓ ANIMATIONS PRESENT

---

## 4. CRITICAL ISSUE: LEGACY CSS FILES CONFLICT

### Files That Should NOT Be Used

| File | Issue | Action |
|------|-------|--------|
| `public/css/style.css` | **OLD** - Uses outdated variable names (`--color-bg-page`, `--color-text-primary`) | DELETE |
| `public/css/variables.css` | **DUPLICATE** - Uses light mode variables (#f8f9fa, #1a1a2e). NOT in main.css imports. | DELETE |
| `public/css/animacoes.css` | **LEGACY** - Old Spanish animation names | DELETE |
| `public/css/responsivo.css` | **LEGACY** - Old responsive styles | DELETE |

**Why These Cause Issues**:
1. If ANY of these files are referenced in `<link>` tags (currently NOT, but check server!), they will:
   - Override main.css dark theme with light mode colors
   - Redefine variables with incompatible names
   - Break accent colors (light mode primary: #4f46e5 vs. dark accent: #4a9eff)

2. They use CONFLICTING variable names:
   - Legacy: `--color-bg-page` (light)
   - New: `--dark-bg-primary` (dark)
   - Result: CSS cascade issues

---

## 5. GOOGLE FONTS LOADING VERIFICATION

### Current Setup (in `_typography.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');
```

**Status**: ✓ CORRECT
- Inter font weights: 400, 500, 600, 700 ✓
- IBM Plex Mono weights: 400, 700 ✓
- display=swap ✓ (prevents FOIT - Flash of Invisible Text)

### What Could Prevent Loading

1. **CORS Issues**: Google Fonts blocked by firewall
   - Fix: Use system fonts fallback chain: `'Inter', 'Segoe UI', -apple-system...`

2. **CSP Headers**: Content Security Policy blocking external fonts
   - Verify: Check server response headers for `Content-Security-Policy`

3. **Network**: Dev environment offline
   - Fix: Load fonts locally in `/public/fonts/`

---

## 6. ACCENT COLOR APPLICATION CHECK

### Where Accent Colors Are Used

| Variable | CSS Rules | File | Status |
|----------|-----------|------|--------|
| `--primary-accent` (#4a9eff) | Focus outlines, button hover, link color, card borders | main.css line 65-72 | ✓ DEFINED |
| `--secondary-accent` (#6bbf59) | Success states, green status | _variables.css | ✓ DEFINED |
| `--danger-accent` (#ff5c5c) | Error states, red alerts | _variables.css | ✓ DEFINED |

### Check if Colors Actually Rendering

**Browser DevTools Test:**
1. Open Chrome Inspector → Elements tab
2. Select any button or card element
3. Look at "Computed" styles
4. **Should see** `color: rgb(74, 158, 255)` for --primary-accent
5. **If you see** `color: rgb(0, 0, 0)` → CSS not loading

---

## 7. VISUAL DEPTH (SHADOWS) VERIFICATION

### Shadow System Defined in `_variables.css`

```css
--shadow-sm:  0 4px 12px rgba(0, 0, 0, 0.3);
--shadow-md:  0 8px 24px rgba(0, 0, 0, 0.4);
--shadow-lg:  0 16px 40px rgba(0, 0, 0, 0.5);
--shadow-accent-sm:  0 0 8px rgba(74, 158, 255, 0.2);
--shadow-accent-md:  0 0 16px rgba(74, 158, 255, 0.3);
--shadow-accent-lg:  0 0 24px rgba(74, 158, 255, 0.4);
```

### Applied in `_components.css`

```css
.card {
  box-shadow: var(--shadow-sm);  /* 0 4px 12px rgba(0,0,0,0.3) */
}
.card:hover {
  box-shadow: var(--shadow-md);  /* 0 8px 24px rgba(0,0,0,0.4) */
}
.card.selected {
  box-shadow: var(--shadow-accent-lg);  /* Blue glow */
}
```

**Status**: ✓ SHADOW SYSTEM DEFINED AND APPLIED

---

## 8. ROOT CAUSE ANALYSIS

### Most Likely Cause of Partial Loading

**Symptom**: Dark background loads, but NO accent colors, fonts, shadows

**Diagnosis**:

1. **Dark backgrounds load** because:
   - `--dark-bg-primary: #0f1419` is defined early in `_variables.css`
   - Applied in `main.css` lines 51 and 222: `background-color: var(--dark-bg-primary);`

2. **Accent colors DON'T load** because:
   - **POSSIBILITY A**: CSS file loads partially (truncated on server)
   - **POSSIBILITY B**: `_components.css` not fully imported or contains syntax error
   - **POSSIBILITY C**: Variables cascade broken (accents used before definition)
   - **POSSIBILITY D**: minified CSS is corrupt
   - **POSSIBILITY E**: Server returns wrong MIME type (not text/css)

3. **Fonts DON'T load** because:
   - Google Fonts import fails (network/CORS)
   - System fonts used instead (Inter not available → serif fallback)

4. **Shadows DON'T render** because:
   - Shadow variables not applied in component CSS
   - OR CSS file truncated before shadow definitions

---

## 9. FIX INSTRUCTIONS

### Step 1: Verify CSS File Integrity

**Run in terminal:**

```bash
# Check file sizes (should be 1KB+ each)
wc -l /Users/hamonvitorino/workspace/cartola-elifoot/public/css/*.css

# Check for syntax errors (requires csso-cli or similar)
# Or manually inspect last line of each file
tail -5 /Users/hamonvitorino/workspace/cartola-elifoot/public/css/main.css
tail -5 /Users/hamonvitorino/workspace/cartola-elifoot/public/css/_components.css
tail -5 /Users/hamonvitorino/workspace/cartola-elifoot/public/css/_animations.css
```

**Expected Output:**
- main.css: ~131 lines
- _variables.css: ~233 lines
- _typography.css: ~238 lines
- _components.css: 50+ lines with button styles
- _layout.css: 50+ lines with container styles
- _animations.css: 50+ lines with @keyframes

### Step 2: Delete Legacy CSS Files

```bash
rm /Users/hamonvitorino/workspace/cartola-elifoot/public/css/style.css
rm /Users/hamonvitorino/workspace/cartola-elifoot/public/css/variables.css
rm /Users/hamonvitorino/workspace/cartola-elifoot/public/css/animacoes.css
rm /Users/hamonvitorino/workspace/cartola-elifoot/public/css/responsivo.css
```

**Reason**: Prevent any accidental references or caching issues

### Step 3: Verify CSS Path in Server

**If using Express/Node server:**

```javascript
// Ensure static files middleware is FIRST
app.use(express.static('public'));

// WRONG - serves nothing
app.get('/', (req, res) => res.sendFile('index.html'));
app.use(express.static('public'));

// CORRECT - serves public/css/main.css when GET /css/main.css
app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile('public/index.html'));
```

### Step 4: Add Font Fallback to `_typography.css`

**Modify line 81 in `_typography.css`:**

**BEFORE:**
```css
--font-body:  'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
```

**AFTER (add weight definitions):**
```css
--font-body: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
--font-mono: 'IBM Plex Mono', 'Courier New', monospace;
```

**Explanation**: Ensures fonts load with proper fallbacks if Google Fonts fails

### Step 5: Add Browser DevTools Verification

**Create test in `public/test-css-loading.html`:**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CSS Loading Test</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <div style="padding: 2rem;">
    <h1 style="color: var(--text-primary);">CSS Loading Test</h1>
    
    <!-- Test 1: Variables Loaded -->
    <div style="background-color: var(--dark-bg-primary); color: var(--text-primary); padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      ✓ Dark background: #0f1419 (should be very dark)
    </div>

    <!-- Test 2: Accent Colors -->
    <div style="background-color: var(--dark-bg-primary); color: var(--primary-accent); padding: 1rem; margin: 1rem 0; border-radius: 8px;">
      ✓ Primary Accent: #4a9eff (should be bright blue) - IF YOU SEE BLUE, ACCENTS LOAD
    </div>

    <!-- Test 3: Fonts -->
    <div style="font-family: var(--font-body); padding: 1rem; margin: 1rem 0;">
      ✓ Font Test: Inter (clean, modern font - NOT serif)
    </div>

    <!-- Test 4: Shadows -->
    <div style="background-color: var(--dark-bg-secondary); padding: 1rem; margin: 1rem 0; border-radius: 8px; box-shadow: var(--shadow-md);">
      ✓ Shadow Test: Should see depth/shadow on this box
    </div>

    <h2 style="margin-top: 2rem;">Diagnostic Output</h2>
    <pre id="diagnostic"></pre>
  </div>

  <script>
    const root = getComputedStyle(document.documentElement);
    const diagnostics = {
      primaryAccent: root.getPropertyValue('--primary-accent'),
      darkBg: root.getPropertyValue('--dark-bg-primary'),
      fontBody: root.getPropertyValue('--font-body'),
      shadowMd: root.getPropertyValue('--shadow-md'),
      textPrimary: root.getPropertyValue('--text-primary'),
    };
    document.getElementById('diagnostic').textContent = JSON.stringify(diagnostics, null, 2);
  </script>
</body>
</html>
```

**How to Use:**
1. Save file as `public/test-css-loading.html`
2. Navigate to `http://localhost:3000/test-css-loading.html`
3. Check if:
   - Blue text appears (Test 2) → Accents load ✓
   - Modern font visible (Test 3) → Fonts load ✓
   - Box has shadow (Test 4) → Depth loads ✓
   - Diagnostic output shows actual values

### Step 6: Server MIME Type Check

**If server returns wrong content-type:**

```javascript
// Node.js/Express
app.get('*.css', (req, res) => {
  res.type('text/css');
});
```

**Check in DevTools:**
1. Network tab
2. Click any .css file
3. Look at "Content-Type" header
4. Should be: `text/css; charset=utf-8`

### Step 7: CSS Minification (if applicable)

**If main.css is minified and broken:**

```bash
# Check for minification
head -1 /Users/hamonvitorino/workspace/cartola-elifoot/public/css/main.css

# If it's one long line, minification may be breaking imports
# Solution: Use source maps or unminified version
```

---

## 10. VERIFICATION CHECKLIST

After fixes, verify:

- [ ] **Variables Load**: Run DevTools test above, see blue accent in "Test 2"
- [ ] **Fonts Load**: Check if text uses Inter font (not serif), see "Test 3"
- [ ] **Shadows Render**: See depth on boxes in "Test 4"
- [ ] **No Conflicts**: Open DevTools, search for old `--color-bg-page` variables (should be 0 results)
- [ ] **Page Load**: Navigate to all 5 HTML pages
  - [ ] index.html shows accent blue on club cards
  - [ ] escalacao.html shows blue on buttons + shadows on cards
  - [ ] simulacao.html shows proper text styling
  - [ ] resultado.html shows card elevation
  - [ ] rodada.html shows professional typography
- [ ] **Network Tab Clean**: No 404 for `/css/main.css`
- [ ] **Console Clear**: No CSS syntax errors

---

## 11. SUMMARY

| Component | Status | Issue | Priority |
|-----------|--------|-------|----------|
| HTML CSS Links | ✓ OK | None | - |
| main.css Structure | ✓ OK | None | - |
| Variables (_variables.css) | ✓ OK | None | - |
| Typography (_typography.css) | ✓ OK | Google Fonts may not load if offline | MEDIUM |
| Components (_components.css) | ✓ OK | May be incomplete (need full file check) | LOW |
| Layout (_layout.css) | ✓ OK | None | - |
| Animations (_animations.css) | ✓ OK | None | - |
| **Legacy Files** | ⚠️ CONFLICT | style.css, variables.css still exist | **HIGH** |
| **Actual Rendering** | ❌ ISSUE | Accents/fonts/shadows missing | **CRITICAL** |

**Most Likely Root Causes (in order):**
1. **Legacy CSS files interfering** (style.css or variables.css loaded by server)
2. **Google Fonts not loading** (CORS/network issue)
3. **CSS file truncated/minified incorrectly** (check file size)
4. **_components.css incomplete** (need full file audit)
5. **Server MIME type wrong** (check Content-Type header)

---

## Next Steps

1. **Immediately**: Run Step 1-2 (verify integrity, delete legacy files)
2. **Then**: Run Step 3-5 (server check, test verification)
3. **Verify**: Use test page from Step 5 to confirm each fix
4. **Document**: Screenshot final result showing all design system working


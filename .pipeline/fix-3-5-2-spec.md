# Specification: Remove 3-5-2 Formation from MVP Phase 1

## Context
The 3-5-2 formation specification has a mathematical inconsistency: it requires 12 players (1 GK + 1 LAT + 3 ZAG + 5 MEI + 2 ATA) but the MVP mandates exactly 11 players. The review recommends removing 3-5-2 from Phase 1 and deferring it to Phase 2 roadmap.

## Solution
Remove all 3-5-2 references from the codebase, keeping only **4-4-2** and **4-3-3** formations.

---

## Files to Modify

### 1. `/public/escalacao.html`
**Lines to remove:**
- Line 30-35: The entire 3-5-2 radio button and label
```html
      <div style="margin: 1rem 0;">
        <label>
          <input type="radio" name="formacao" value="3-5-2">
          3-5-2 (1 GK, 1 LAT, 3 ZAG, 5 MEI, 2 ATA)
        </label>
      </div>
```

**Line to remove:**
- Line 68: Remove 3-5-2 from REQUERIMENTOS_FORMACAO object
```javascript
      '3-5-2': { 1: 1, 2: 1, 3: 3, 4: 5, 5: 2 }
```
After removal, the object contains only:
```javascript
    const REQUERIMENTOS_FORMACAO = {
      '4-4-2': { 1: 1, 2: 2, 3: 2, 4: 4, 5: 2 },
      '4-3-3': { 1: 1, 2: 2, 3: 2, 4: 3, 5: 3 }
    };
```

### 2. `.pipeline/browser-tests.js`
**Lines to remove:**
- Line 379-399: The entire test case "Can construct players for 3-5-2 formation positions"
```javascript
test('Can construct players for 3-5-2 formation positions', () => {
  // ... entire test block
});
```

This removes one test, bringing total from 40 tests to 39 tests.

### 3. `PROJECT.md`
**Line to modify:**
- Update the escalação section, line ~722 from:
```
  → Escolher esquema tático (4-4-2, 4-3-3, 3-5-2)
```
To:
```
  → Escolher esquema tático (4-4-2, 4-3-3)
```

### 4. `.pipeline/spec.md` (Documentation)
**Lines to update:**
- Line with "Formation selector": Change from `(4-4-2, 4-3-3, 3-5-2 radio buttons)` to `(4-4-2, 4-3-3 radio buttons)`
- Remove lines mentioning 3-5-2 position mappings
- Update table: Remove 3-5-2 row if present
- Line with "3-5-2: 1 GK, 3 DEF, 5 MID, 2 FW": Remove this line

### 5. `.pipeline/review.md` (Documentation)
No code changes needed, but annotate for future reference:
- Add note at end: "3-5-2 formation removed from Phase 1, deferred to Phase 2 roadmap per decision."

---

## What to Preserve

✓ **4-4-2 formation** - Fully functional, 11 players, validation working
✓ **4-3-3 formation** - Fully functional, 11 players, validation working
✓ All player selection UI and logic
✓ All state management in `estado.js`
✓ All simulation logic in `simulacao.js`
✓ All narrative logic in `narracao.js`
✓ Tests for 4-4-2 and 4-3-3 formations

---

## Tests to Update

### Tests to Remove:
- "Can construct players for 3-5-2 formation positions" (browser-tests.js line 379)

### Tests to Preserve:
- All 39 remaining tests pass without changes
- No modifications needed to 4-4-2 or 4-3-3 tests

### Post-Change Test Count:
- **Before:** 40 tests
- **After:** 39 tests
- **All passing:** Yes (removal doesn't break existing functionality)

---

## Validation After Changes

1. **Escalação form** should show only 2 radio buttons: 4-4-2 (default), 4-3-3
2. **Default formation** remains 4-4-2 (no change needed)
3. **Player selection validation** enforces:
   - 4-4-2: 1 GK + 2 LAT + 2 ZAG + 4 MEI + 2 ATA = 11 players
   - 4-3-3: 1 GK + 2 LAT + 2 ZAG + 3 MEI + 3 ATA = 11 players
4. **Both formations** accept exactly 11 players (no edge cases)
5. **Simulation/Narrative** works for both remaining formations

---

## Phase 2 Roadmap Note

When re-adding 3-5-2 in Phase 2:
- Decide whether to allow 12-player rosters (only for 3-5-2), OR
- Redefine 3-5-2 as 1 GK + 2 LAT + 2 ZAG + 3 MEI + 3 ATA (11 players)
- Update `REQUERIMENTOS_FORMACAO` with new 3-5-2 values
- Add radio button back to escalacao.html
- Add new test for 3-5-2 formation in browser-tests.js
- Update documentation (PROJECT.md, spec.md)

---

## Implementation Order

1. Update `/public/escalacao.html` (remove radio button and object entry)
2. Remove test from `.pipeline/browser-tests.js`
3. Update `PROJECT.md` documentation
4. Update `.pipeline/spec.md` documentation
5. Run tests to confirm 39 tests pass
6. Verify escalação.html renders correctly with only 2 radio buttons

---

## Success Criteria

✓ No references to 3-5-2 in executable code (HTML, JS, validation logic)
✓ 39/39 tests pass
✓ Escalação page shows only 4-4-2 and 4-3-3 options
✓ Both formations work with 11-player validation
✓ No user-facing validation errors (removed 12-player case)
✓ Documentation updated to reflect Phase 1 scope

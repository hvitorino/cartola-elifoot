# Feature Spec: Add Correct 3-5-2 Formation

## Overview

Add the correct 3-5-2 football formation to the game. This corrects a previous invalid implementation that had 12 players.

### Current Issue
The original 3-5-2 was defined as: "1 GK, 1 LAT, 3 ZAG, 5 MEI, 2 ATA" = **12 players** (INVALID)

### Solution
Correct definition: "1 GK, 3 ZAG, 5 MEI, 2 ATA" = **11 players** (NO LATERAIS)

---

## Files to Modify

### 1. `/public/escalacao.html`

**Current State:**
- Lines 18-30: Formation selector with radio buttons for "4-4-2" and "4-3-3"
- Lines 59-62: `REQUERIMENTOS_FORMACAO` object defines player requirements per formation

**Changes Required:**
1. Add new radio button option for 3-5-2 formation (after line 28)
   - Label text: "3-5-2 (1 GK, 3 ZAG, 5 MEI, 2 ATA)"
   - Input value: "3-5-2"

2. Add entry to `REQUERIMENTOS_FORMACAO` object (line 59-62)
   - Key: `'3-5-2'`
   - Value: `{ 1: 1, 2: 0, 3: 3, 4: 5, 5: 2 }`
   - Note: Position 2 (LAT) = 0, Position 3 (ZAG) = 3, Position 4 (MEI) = 5, Position 5 (ATA) = 2

**Specific Code Addition:**
```html
<div style="margin: 1rem 0;">
  <label>
    <input type="radio" name="formacao" value="3-5-2">
    3-5-2 (1 GK, 3 ZAG, 5 MEI, 2 ATA)
  </label>
</div>
```

**JavaScript Addition:**
```javascript
'3-5-2': { 1: 1, 2: 0, 3: 3, 4: 5, 5: 2 }
```

### 2. `/public/js/simulacao.js`

**Current State:**
- Lines 95-116: `calcularForca()` function calculates attack and defense strength
- Current calculation:
  - Attack: Average of position 5 (ATA)
  - Defense: Average of positions 2 (LAT) and 3 (ZAG)

**Impact Analysis:**
The simulation engine currently uses a simple defensive strength calculation based on lateral (2) and defender (3) positions. The 3-5-2 formation has NO laterals.

**Required Changes:**
1. **No algorithm changes needed** — The formation already works correctly because:
   - Attack force calculation uses only position 5 (ATA) → unchanged
   - Defense force calculation includes both position 2 (LAT) and 3 (ZAG)
   - With 0 LAT, defense strength will only consider 3 ZAG → mathematically valid
   - The calculation at lines 107-110 handles edge cases (if defensores.length === 0, defaults to 5)

2. **Verification needed:** Test that 0 LAT doesn't break the simulation
   - Ensure `defensores.filter()` still works when position 2 has 0 players
   - Confirm defensive strength calculation works with only ZAG (position 3)

### 3. `/PROJECT.md`

**Current State:**
- Line 60: Lists supported formations in the Escalação section: "4-4-2, 4-3-3"

**Changes Required:**
1. Update line 60 to: "4-4-2, 4-3-3, 3-5-2"
2. Consider adding a note in the Motor de Simulação section about formation flexibility
   - Optional: Add section "Formação e Força" explaining how formations affect simulation

**Suggested Addition (optional):**
```markdown
### Impacto da Formação na Simulação

Cada formação afeta a força defensiva do time:
- **4-4-2**: Defesa com 2 LAT + 2 ZAG (4 defensores)
- **4-3-3**: Defesa com 2 LAT + 2 ZAG (4 defensores)
- **3-5-2**: Defesa com 3 ZAG (3 defensores, sem LAT)

A força defensiva é a média dos ratings dos defensores escalados.
```

---

## Test Files to Modify/Create

### 1. Create `/public/js/escalacao.test.js` (NEW)

**Purpose:** Test formation validation logic in escalacao.html

**Test Cases to Implement:**

```javascript
describe('Escalação - Formation Validation', () => {
  describe('REQUERIMENTOS_FORMACAO', () => {
    it('should have 4-4-2 formation with correct player counts', () => {
      expect(REQUERIMENTOS_FORMACAO['4-4-2']).toEqual({ 1: 1, 2: 2, 3: 2, 4: 4, 5: 2 });
    });

    it('should have 4-3-3 formation with correct player counts', () => {
      expect(REQUERIMENTOS_FORMACAO['4-3-3']).toEqual({ 1: 1, 2: 2, 3: 2, 4: 3, 5: 3 });
    });

    it('should have 3-5-2 formation with correct player counts (11 total)', () => {
      expect(REQUERIMENTOS_FORMACAO['3-5-2']).toEqual({ 1: 1, 2: 0, 3: 3, 4: 5, 5: 2 });
    });

    it('should have exactly 11 players in 4-4-2', () => {
      const total = Object.values(REQUERIMENTOS_FORMACAO['4-4-2']).reduce((a, b) => a + b, 0);
      expect(total).toBe(11);
    });

    it('should have exactly 11 players in 4-3-3', () => {
      const total = Object.values(REQUERIMENTOS_FORMACAO['4-3-3']).reduce((a, b) => a + b, 0);
      expect(total).toBe(11);
    });

    it('should have exactly 11 players in 3-5-2', () => {
      const total = Object.values(REQUERIMENTOS_FORMACAO['3-5-2']).reduce((a, b) => a + b, 0);
      expect(total).toBe(11);
    });

    it('3-5-2 should have NO lateral players (LAT = 0)', () => {
      expect(REQUERIMENTOS_FORMACAO['3-5-2'][2]).toBe(0);
    });

    it('3-5-2 should require 3 defenders (ZAG)', () => {
      expect(REQUERIMENTOS_FORMACAO['3-5-2'][3]).toBe(3);
    });

    it('3-5-2 should require 5 midfielders (MEI)', () => {
      expect(REQUERIMENTOS_FORMACAO['3-5-2'][4]).toBe(5);
    });
  });

  describe('atualizarValidacao()', () => {
    // These would test the validation logic with mocked DOM and player selections
    // Implementation depends on refactoring atualizarValidacao() into an exportable function

    it('should validate 3-5-2 formation with correct player counts', () => {
      // Mock: 1 GK + 3 ZAG + 5 MEI + 2 ATA selected
      // Expect: validation passes
    });

    it('should fail 3-5-2 validation with 1 or more lateral players selected', () => {
      // Mock: 1 GK + 3 ZAG + 5 MEI + 2 ATA + 1 LAT selected (12 total)
      // Expect: validation fails
    });

    it('should fail 3-5-2 validation with insufficient midfielders', () => {
      // Mock: 1 GK + 3 ZAG + 4 MEI + 2 ATA (10 total)
      // Expect: validation fails
    });
  });
});
```

**Note:** Test file requires refactoring escalacao.html to export validation functions, or using DOM testing library (jsdom with Jest).

### 2. Update `/public/js/simulacao.js` - Add Test Case

**File:** Create or update test file (if `simulacao.test.js` doesn't exist)

**Test Cases for 3-5-2:**

```javascript
describe('Simulação - 3-5-2 Formation', () => {
  it('should calculate force for team with 3 ZAG and 0 LAT', () => {
    const escalacao = [
      { posicao_id: 1, media_num: 7.0, nome: 'GK' },
      { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
      { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
      { posicao_id: 3, media_num: 7.2, nome: 'ZAG3' },
      { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
      { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
      { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
      { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
      { posicao_id: 4, media_num: 7.0, nome: 'MEI5' },
      { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
      { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
    ];

    const forca = calcularForca(escalacao);
    
    // Attack: average of 2 ATA = (7.5 + 7.2) / 2 = 7.35
    expect(forca.forcaAtaque).toBeGreaterThan(5);
    
    // Defense: average of 3 ZAG only = (7.5 + 7.3 + 7.2) / 3 = 7.333...
    expect(forca.forcaDefesa).toBeGreaterThan(5);
  });

  it('should generate valid match simulation with 3-5-2 vs 4-4-2', () => {
    const escalacao352 = [...]; // 3-5-2 team
    const escalacao442 = [...]; // 4-4-2 team

    const resultado = gerarPartida(escalacao352, { escalacao: escalacao442 });

    expect(resultado.lances.length).toBeGreaterThanOrEqual(20);
    expect(resultado.lances.length).toBeLessThanOrEqual(28);
    expect(resultado.placar.casa).toBeGreaterThanOrEqual(0);
    expect(resultado.placar.visitante).toBeGreaterThanOrEqual(0);
  });

  it('should not break defensively with 0 lateral players', () => {
    // Edge case: team with only ZAG, no LAT
    const escalacao = [
      { posicao_id: 1, media_num: 8.0 },
      { posicao_id: 3, media_num: 7.5 },
      { posicao_id: 3, media_num: 7.4 },
      { posicao_id: 3, media_num: 7.3 },
      { posicao_id: 4, media_num: 6.5 }, // MEI
      { posicao_id: 4, media_num: 6.5 }, // MEI
      { posicao_id: 4, media_num: 6.5 }, // MEI
      { posicao_id: 4, media_num: 6.5 }, // MEI
      { posicao_id: 4, media_num: 6.5 }, // MEI
      { posicao_id: 5, media_num: 7.0 }, // ATA
      { posicao_id: 5, media_num: 7.0 }  // ATA
    ];

    const forca = calcularForca(escalacao);
    expect(forca.forcaDefesa).toBeGreaterThan(0);
    expect(isNaN(forca.forcaDefesa)).toBe(false);
  });
});
```

---

## Implementation Checklist

### Phase 1: UI Update (escalacao.html)
- [ ] Add 3-5-2 radio button to formation selector
- [ ] Add 3-5-2 entry to `REQUERIMENTOS_FORMACAO` object
- [ ] Verify radio button change handler works for new formation
- [ ] Test validation logic switches between formations (dev tools)

### Phase 2: Documentation Update (PROJECT.md)
- [ ] Update formation list in Escalação section
- [ ] (Optional) Add "Impacto da Formação na Simulação" section

### Phase 3: Testing
- [ ] Create `/public/js/escalacao.test.js` with formation validation tests
- [ ] Add test cases to simulacao.js for 3-5-2 edge case
- [ ] Run `npm test` to ensure all tests pass
- [ ] Test manually: Select 3-5-2, ensure it requires 0 LAT, 3 ZAG, 5 MEI, 2 ATA

### Phase 4: Simulation Verification
- [ ] Confirm `calcularForca()` works correctly with 0 LAT
- [ ] Simulate full match with 3-5-2 team vs other formations
- [ ] Verify no NaN/undefined errors occur

### Phase 5: Manual QA
- [ ] Navigate to escalacao.html
- [ ] Select 3-5-2 from dropdown
- [ ] Select 11 players (1 GK, 3 ZAG, 5 MEI, 2 ATA) — NO LAT
- [ ] Verify confirmation button enables
- [ ] Simulate match with 3-5-2 team
- [ ] Verify narração renders correctly (no null references)
- [ ] Check resultado.html displays placar without errors

---

## Potential Issues & Solutions

### Issue 1: Defense Calculation with 0 LAT
**Problem:** Current code filters positions 2 and 3. With 0 LAT (position 2), only ZAG contribute.

**Status:** ✅ **NO CHANGE NEEDED**
- Code at line 107-110 in simulacao.js handles this correctly
- `defensores.length > 0` check ensures valid average
- Edge case (length === 0) defaults to 5 — still safe

### Issue 2: Validation Blocking LAT Selection
**Problem:** Form validation should prevent selecting ANY LAT players when 3-5-2 is chosen.

**Status:** ✅ **HANDLED BY EXISTING LOGIC**
- `atualizarValidacao()` at lines 157-186 in escalacao.html checks exact position counts
- If LAT > 0 for 3-5-2, validation fails with "Faltam X ZAG" or similar
- User cannot enable confirmation button without exact counts

### Issue 3: Player Selection UI Clarity
**Problem:** Players might not understand why LAT players are unavailable in 3-5-2.

**Suggested Enhancement (Future):**
- Disable LAT checkboxes when 3-5-2 is selected
- Show message: "3-5-2 não requer laterais (LAT)"

---

## Regression Testing

After implementation, verify existing formations still work:

### 4-4-2 Validation
- [ ] Select 4-4-2 formation
- [ ] Select 1 GK + 2 LAT + 2 ZAG + 4 MEI + 2 ATA
- [ ] Verification button enables
- [ ] Simulation runs without errors

### 4-3-3 Validation
- [ ] Select 4-3-3 formation
- [ ] Select 1 GK + 2 LAT + 2 ZAG + 3 MEI + 3 ATA
- [ ] Verification button enables
- [ ] Simulation runs without errors

---

## Summary

- **Complexity:** LOW — UI changes only, no algorithm modifications
- **Risk:** MINIMAL — Edge case (0 LAT) already handled by existing defensive calculation
- **Files Modified:** 2 (escalacao.html, PROJECT.md)
- **Files Created:** 1 test file (escalacao.test.js)
- **Estimated Time:** 30-45 minutes (including tests and manual verification)
- **Breaking Changes:** None — all existing formations remain unchanged

# HTML/CSS Integration Fix Specification

**Status:** Critical Priority  
**Phase:** Design System Integration (Phase 3)  
**Objective:** Update all public HTML files to use new CSS design system and FM-inspired components

---

## Problem Statement

The application has a new professional design system (`public/css/main.css`) with FM-inspired dark theme, but the HTML files still reference the old CSS and don't load the new component library. Users see incomplete/inconsistent styling.

**Current State:**
- All HTML files link to `css/style.css` (old CSS)
- No component imports
- Old inline styles mixed with CSS variables
- No dark theme properly applied

**Target State:**
- All HTML files link to `css/main.css` (new design system)
- Component scripts imported and available
- Semantic HTML structure using design tokens
- Professional FM-inspired dark theme consistently applied

---

## Files to Modify

### 1. public/index.html (Club Selection Dashboard)

**Current Link:**
```html
<link rel="stylesheet" href="css/style.css">
```

**Change to:**
```html
<link rel="stylesheet" href="css/main.css">
<script src="components/index.js"></script>
```

**CSS Updates in `<head>`:**
- Replace old style.css with main.css
- Add components index.js script

**Semantic/Structure Updates:**
- Keep `<header>` as-is (maintained by main.css)
- Update club cards container class to match design tokens
- Replace inline styles with design token classes

**Specific Changes:**

In header (line 10-12):
```html
<!-- BEFORE -->
<header>
  <h1>Cartola Elifoot</h1>
  <p>Gerencie seu clube, escalações e partidas!</p>
</header>

<!-- AFTER: No changes needed - header styling handled by main.css -->
```

In clubs-grid container (line 22):
```html
<!-- Add semantic wrapper with design tokens -->
<div id="clubs-container" class="clubs-grid grid grid-cols-auto gap-lg"></div>
```

Each club card (lines 49-62):
```javascript
// Replace inline styles with design tokens
card.className = 'card card-elevated player-card hover:shadow-md transition-shadow';
card.style = ''; // Remove inline style

// Update card content structure
card.innerHTML = `
  <div class="card__icon" style="font-size: 2rem; margin-bottom: var(--space-md);">⚽</div>
  <div class="text-bold text-primary">${club.nome}</div>
  <div class="text-sm text-secondary">${club.abreviacao}</div>
`;
```

Error/Loading states (lines 18-20, 24):
```html
<!-- Add proper dark theme classes -->
<div id="loading" class="spinner" style="display: none;"></div>
<div id="error" class="error error-alert"></div>
<p id="fallback-text" class="text-secondary" style="display: none;">Escolha um clube da lista</p>
```

---

### 2. public/escalacao.html (Lineup Selection)

**Current Link:**
```html
<link rel="stylesheet" href="css/style.css">
```

**Change to:**
```html
<link rel="stylesheet" href="css/main.css">
<script src="components/index.js"></script>
```

**Semantic/Structure Updates:**

Header section (lines 10-13):
```html
<!-- No changes - main.css handles styling -->
```

Form section (lines 16-36):
```html
<!-- BEFORE: Raw inline styles -->
<div>
  <h3>Esquema Tático</h3>
  <div style="margin: 1rem 0;">
    <label>
      <input type="radio" name="formacao" value="4-4-2" checked>
      4-4-2 (1 GK, 2 LAT, 2 ZAG, 4 MEI, 2 ATA)
    </label>
  </div>
</div>

<!-- AFTER: Design tokens + semantic structure -->
<div class="form-section">
  <h3 class="form-section__title">Esquema Tático</h3>
  <div class="form-group">
    <label class="radio-label">
      <input type="radio" name="formacao" value="4-4-2" checked class="radio-input">
      <span class="radio-text">4-4-2 (1 GK, 2 LAT, 2 ZAG, 4 MEI, 2 ATA)</span>
    </label>
  </div>
  <div class="form-group">
    <label class="radio-label">
      <input type="radio" name="formacao" value="4-3-3" class="radio-input">
      <span class="radio-text">4-3-3 (1 GK, 2 LAT, 2 ZAG, 3 MEI, 3 ATA)</span>
    </label>
  </div>
  <div class="form-group">
    <label class="radio-label">
      <input type="radio" name="formacao" value="3-5-2" class="radio-input">
      <span class="radio-text">3-5-2 (1 GK, 3 ZAG, 5 MEI, 2 ATA)</span>
    </label>
  </div>
</div>
```

Players section (lines 38-42):
```html
<!-- BEFORE -->
<div>
  <h3>Selecione 11 Jogadores</h3>
  <div id="validation-message" style="color: #b91c1c; margin: 1rem 0;"></div>
  <div id="players-container" class="player-list"></div>
</div>

<!-- AFTER: Design tokens + better semantic structure -->
<div class="form-section">
  <h3 class="form-section__title">Selecione 11 Jogadores</h3>
  <div id="validation-message" class="validation-message validation-message--error"></div>
  <div id="players-container" class="players-grid grid grid-cols-2 gap-md"></div>
</div>
```

Button section (lines 44-48):
```html
<!-- BEFORE -->
<div style="text-align: center; margin: 2rem 0;">
  <button id="confirm-button" disabled onclick="confirmarEscalacao()">
    Confirmar & Simular
  </button>
</div>

<!-- AFTER: Design token spacing + proper button styling -->
<div class="flex flex-center" style="margin: var(--space-xl) 0;">
  <button id="confirm-button" class="btn btn-primary btn-lg" disabled onclick="confirmarEscalacao()">
    Confirmar & Simular
  </button>
</div>
```

Error display (line 50):
```html
<!-- Add design token class -->
<div id="error" class="error error-alert"></div>
```

Player card rendering in JavaScript (lines 124-157):
```javascript
// BEFORE: Inline styles mixed with CSS classes
card.innerHTML = `
  <div style="font-weight: bold; color: #1a1a2e;">${jogador.nome}</div>
  <div style="font-size: 0.9rem; color: #495057;">Média: ${jogador.media_num.toFixed(1)}</div>
`;

// AFTER: Design tokens and semantic classes
card.className = 'player-card card card-interactive';
card.innerHTML = `
  <div class="player-card__info">
    <div class="text-bold text-primary">${jogador.nome}</div>
    <div class="text-sm text-secondary">Média: ${jogador.media_num.toFixed(1)}</div>
  </div>
`;
```

---

### 3. public/simulacao.html (Live Match Simulation)

**Current Link:**
```html
<link rel="stylesheet" href="css/style.css">
```

**Change to:**
```html
<link rel="stylesheet" href="css/main.css">
<script src="components/index.js"></script>
```

**Semantic/Structure Updates:**

Header (lines 10-13):
```html
<!-- No changes - main.css handles styling -->
```

Score display (line 16):
```html
<!-- BEFORE -->
<div class="score" id="score">0 — 0</div>

<!-- AFTER: Design token sizing + typography -->
<div class="score score-large" id="score">0 — 0</div>
```

Match status (line 12):
```html
<!-- BEFORE -->
<div id="match-status" style="color: #fff;">Gerando simulação...</div>

<!-- AFTER: Design tokens for text color -->
<div id="match-status" class="text-highlight">Gerando simulação...</div>
```

Loading indicator (line 18):
```html
<!-- BEFORE: Inline style -->
<div id="match-indicator" class="spinner" style="text-align: center; margin: 1rem 0;"></div>

<!-- AFTER: Design tokens for spacing -->
<div id="match-indicator" class="spinner flex flex-center" style="margin: var(--space-md) 0;"></div>
```

Next button section (lines 22-26):
```html
<!-- BEFORE: Inline style -->
<div style="text-align: center; margin: 2rem 0;">
  <button id="next-button" onclick="irParaResultado()" style="display: none;">
    Ver Resultado >
  </button>
</div>

<!-- AFTER: Design tokens -->
<div class="flex flex-center" style="margin: var(--space-xl) 0;">
  <button id="next-button" class="btn btn-primary btn-lg" onclick="irParaResultado()" style="display: none;">
    Ver Resultado &gt;
  </button>
</div>
```

Narration display in JavaScript (lines 101-108):
```javascript
// BEFORE: CSS classes with inline styles in render
function adicionarNarracao(texto, tipo) {
  const narracaoDiv = document.getElementById('naracao');
  const div = document.createElement('div');
  div.className = `lance lance-${tipo}`;
  div.textContent = texto;
  narracaoDiv.appendChild(div);
  narracaoDiv.scrollTop = narracaoDiv.scrollHeight;
}

// AFTER: Design tokens + semantic classes
function adicionarNarracao(texto, tipo) {
  const narracaoDiv = document.getElementById('naracao');
  const div = document.createElement('div');
  div.className = `lance lance-${tipo} match-timeline__event text-sm text-secondary`;
  div.setAttribute('data-event-type', tipo);
  div.textContent = texto;
  narracaoDiv.appendChild(div);
  narracaoDiv.scrollTop = narracaoDiv.scrollHeight;
}
```

---

### 4. public/resultado.html (Match Results)

**Current Link:**
```html
<link rel="stylesheet" href="css/style.css">
```

**Change to:**
```html
<link rel="stylesheet" href="css/main.css">
<script src="components/index.js"></script>
```

**Semantic/Structure Updates:**

Final score (lines 11-13):
```html
<!-- BEFORE -->
<h1 id="final-score">0 — 0</h1>
<p id="match-info">Resultado da Partida</p>

<!-- AFTER: Keep as-is (main.css handles header styling) -->
```

Stats grid (lines 16-30):
```html
<!-- BEFORE: Raw inline styles -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div id="home-stats">
    <h3 id="home-name">Time da Casa</h3>
    <div>Jogadores: <span id="home-players">-</span></div>
  </div>
</div>

<!-- AFTER: Design token grid -->
<div class="grid grid-cols-2 gap-lg" style="margin: var(--space-xl) 0;">
  <div id="home-stats" class="card card-elevated">
    <h3 id="home-name" class="text-lg font-bold text-primary">Time da Casa</h3>
    <div class="stat-row">
      <span class="text-secondary">Jogadores:</span>
      <span id="home-players" class="text-highlight">-</span>
    </div>
    <div class="stat-row">
      <span class="text-secondary">Posse:</span>
      <span id="home-possession" class="text-highlight">-</span>%
    </div>
    <div class="stat-row">
      <span class="text-secondary">Artilheiros:</span>
      <span id="home-scorers" class="text-highlight">-</span>
    </div>
  </div>
  <div id="away-stats" class="card card-elevated">
    <h3 id="away-name" class="text-lg font-bold text-primary">Visitante</h3>
    <div class="stat-row">
      <span class="text-secondary">Jogadores:</span>
      <span id="away-players" class="text-highlight">-</span>
    </div>
    <div class="stat-row">
      <span class="text-secondary">Posse:</span>
      <span id="away-possession" class="text-highlight">-</span>%
    </div>
    <div class="stat-row">
      <span class="text-secondary">Artilheiros:</span>
      <span id="away-scorers" class="text-highlight">-</span>
    </div>
  </div>
</div>
```

Highlights section (lines 32-37):
```html
<!-- BEFORE: Raw inline styles with white background -->
<div style="background: white; padding: 1.5rem; border-radius: 6px; margin: 2rem 0;">
  <h3>Destaques</h3>
  <div id="highlights">
    <p>Carregando destaques...</p>
  </div>
</div>

<!-- AFTER: Design tokens - dark theme card -->
<div class="card card-elevated" style="margin: var(--space-xl) 0;">
  <h3 class="text-lg font-bold text-primary">Destaques</h3>
  <div id="highlights" class="highlights-list">
    <p class="text-secondary">Carregando destaques...</p>
  </div>
</div>
```

Button section (lines 39-41):
```html
<!-- BEFORE: Inline styles -->
<div style="text-align: center; margin: 2rem 0;">
  <button onclick="proximaRodada()">Próxima Rodada ></button>
</div>

<!-- AFTER: Design tokens -->
<div class="flex flex-center" style="margin: var(--space-xl) 0;">
  <button onclick="proximaRodada()" class="btn btn-primary btn-lg">
    Próxima Rodada &gt;
  </button>
</div>
```

Highlight rendering in JavaScript (lines 106-116):
```javascript
// BEFORE: Raw createElement with inline text
if (melhorJogadorCasa?.nome) {
  const p = document.createElement('p');
  p.textContent = `MVP (Casa): ${melhorJogadorCasa.nome} (Média: ${melhorJogadorCasa.media_num.toFixed(1)})`;
  highlightsDiv.appendChild(p);
}

// AFTER: Design tokens for styling
if (melhorJogadorCasa?.nome) {
  const p = document.createElement('p');
  p.className = 'highlight-item text-sm text-primary';
  p.textContent = `MVP (Casa): ${melhorJogadorCasa.nome} (Média: ${melhorJogadorCasa.media_num.toFixed(1)})`;
  highlightsDiv.appendChild(p);
}
```

---

### 5. public/rodada.html (Season Dashboard)

**Current Link:**
```html
<link rel="stylesheet" href="css/style.css">
```

**Change to:**
```html
<link rel="stylesheet" href="css/main.css">
<script src="components/index.js"></script>
```

**Semantic/Structure Updates:**

Header navigation (lines 10-18):
```html
<!-- BEFORE: Raw inline styles on nav -->
<header>
  <h1>Rodada Dashboard</h1>
  <nav style="margin-top: 0.5rem;">
    <a href="index.html" style="color: white; margin: 0 1rem; text-decoration: none;">Home</a>
  </nav>
</header>

<!-- AFTER: Design token spacing + semantic nav classes -->
<header>
  <h1>Rodada Dashboard</h1>
  <nav class="nav nav-horizontal" style="margin-top: var(--space-sm);">
    <a href="index.html" class="nav-link">Home</a>
    <a href="escalacao.html" class="nav-link">Escalação</a>
    <a href="simulacao.html" class="nav-link">Simulação</a>
    <a href="resultado.html" class="nav-link">Resultado</a>
  </nav>
</header>
```

Round info card (lines 22-39):
```html
<!-- BEFORE: Raw inline styles with white background -->
<div style="background: white; border-radius: 6px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
  <h2>Rodada <span id="rodadaNum">1</span></h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
    <div>
      <h3 style="margin-top: 0; color: #495057; font-size: 0.85rem; text-transform: uppercase;">Próximo Adversário</h3>
      <p id="proximoAdversario" style="font-size: 1.2rem; font-weight: bold; margin: 0.5rem 0; color: #1a1a2e;">Carregando...</p>
    </div>
  </div>
</div>

<!-- AFTER: Design tokens + semantic structure -->
<div class="card card-elevated" style="margin-bottom: var(--space-xl);">
  <h2 class="text-lg font-bold text-primary">Rodada <span id="rodadaNum">1</span></h2>
  <div class="grid grid-cols-auto gap-lg" style="margin-top: var(--space-md);">
    <div class="info-box">
      <h3 class="info-box__label text-uppercase text-secondary">Próximo Adversário</h3>
      <p id="proximoAdversario" class="text-lg font-bold text-primary">Carregando...</p>
      <p id="proximaPosicao" class="text-sm text-secondary">-</p>
    </div>
    <div class="info-box">
      <h3 class="info-box__label text-uppercase text-secondary">Sua Posição</h3>
      <p id="minhaposicao" class="text-lg font-bold text-primary">-</p>
      <p id="meuClube" class="text-sm text-secondary">-</p>
    </div>
    <div class="info-box">
      <button onclick="window.location.href='escalacao.html'" class="btn btn-primary btn-block">
        Ir para Escalação
      </button>
    </div>
  </div>
</div>
```

Standings container (lines 42-53):
```html
<!-- BEFORE: Generic div with inline styles -->
<div class="standings-grid">
  <div class="standings-container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h2 style="margin: 0;">Classificação</h2>
      <button id="btnRefresh" onclick="atualizarClassificacao()" style="padding: 0.5rem 1rem; font-size: 0.9rem;">↻ Atualizar</button>
    </div>
    <div id="tabelaContainer" style="overflow-x: auto;">
      <p>Carregando classificação...</p>
    </div>
    <p id="ultimaAtualizacao" style="font-size: 0.8rem; color: #495057; margin-top: 1rem;">-</p>
  </div>
</div>

<!-- AFTER: Design tokens + proper grid layout -->
<div class="standings-grid grid grid-cols-2 gap-lg">
  <div class="standings-container card card-elevated">
    <div class="flex justify-between align-center" style="margin-bottom: var(--space-md);">
      <h2 class="text-lg font-bold text-primary" style="margin: 0;">Classificação</h2>
      <button id="btnRefresh" onclick="atualizarClassificacao()" class="btn btn-secondary btn-sm">
        ↻ Atualizar
      </button>
    </div>
    <div id="tabelaContainer" class="table-wrapper">
      <p class="text-secondary">Carregando classificação...</p>
    </div>
    <p id="ultimaAtualizacao" class="text-xs text-tertiary" style="margin-top: var(--space-md);">-</p>
  </div>
```

Stats section (lines 56-76):
```html
<!-- BEFORE: Inline styles -->
<div class="stats-container">
  <h2 style="margin-top: 0;">Estatísticas da Temporada</h2>
  <div class="stats-summary">
    <div class="stat-box">
      <div class="label">Vitórias</div>
      <div class="value" id="statVitorias">0</div>
    </div>
  </div>
</div>

<!-- AFTER: Design tokens + card styling -->
<div class="stats-container card card-elevated">
  <h2 class="text-lg font-bold text-primary">Estatísticas da Temporada</h2>
  <div class="stats-summary grid grid-cols-4 gap-md">
    <div class="stat-box card card-secondary">
      <div class="stat-box__label text-secondary">Vitórias</div>
      <div class="stat-box__value text-lg font-bold text-success" id="statVitorias">0</div>
    </div>
    <div class="stat-box card card-secondary">
      <div class="stat-box__label text-secondary">Empates</div>
      <div class="stat-box__value text-lg font-bold text-info" id="statEmpates">0</div>
    </div>
    <div class="stat-box card card-secondary">
      <div class="stat-box__label text-secondary">Derrotas</div>
      <div class="stat-box__value text-lg font-bold text-danger" id="statDerrotas">0</div>
    </div>
    <div class="stat-box card card-secondary">
      <div class="stat-box__label text-secondary">Saldo</div>
      <div class="stat-box__value text-lg font-bold text-primary" id="statSaldo">0</div>
    </div>
  </div>
</div>
```

History section (lines 80-88):
```html
<!-- BEFORE: Inline styles -->
<div class="historia-container" style="margin-top: 2rem;">
  <h2>Histórico de Partidas</h2>
  <div id="historicoContainer">
    <p>Nenhuma partida jogada ainda.</p>
  </div>
  <div style="margin-top: 1rem; text-align: center;">
    <a href="resultado.html" style="color: #667eea; text-decoration: none; font-weight: bold;">Ver histórico completo →</a>
  </div>
</div>

<!-- AFTER: Design tokens -->
<div class="historia-container card card-elevated" style="margin-top: var(--space-xl);">
  <h2 class="text-lg font-bold text-primary">Histórico de Partidas</h2>
  <div id="historicoContainer">
    <p class="text-secondary">Nenhuma partida jogada ainda.</p>
  </div>
  <div class="flex flex-center" style="margin-top: var(--space-md);">
    <a href="resultado.html" class="link link-primary">Ver histórico completo →</a>
  </div>
</div>
```

---

## Design Tokens Reference

### Key Classes to Use

**Text Utilities:**
- `.text-primary` - Main text (#f0f2f5)
- `.text-secondary` - Secondary info (#a8adb8)
- `.text-tertiary` - Muted text (#7a8190)
- `.text-highlight` - Bold/emphasis (#ffffff)
- `.text-success` - Success color (#6bbf59)
- `.text-danger` - Danger/error color (#ff5c5c)
- `.text-warning` - Warning color (#ffb84d)
- `.text-info` - Info/primary accent (#4a9eff)

**Text Size:**
- `.text-xs` - 12px
- `.text-sm` - 14px
- `.text-md` - 16px (default)
- `.text-lg` - 20px
- `.text-xl` - 24px

**Font Weight:**
- `.font-normal` - 400
- `.font-semibold` - 600
- `.font-bold` - 700

**Spacing (8px base unit):**
- `var(--space-xs)` = 4px
- `var(--space-sm)` = 8px
- `var(--space-md)` = 16px
- `var(--space-lg)` = 24px
- `var(--space-xl)` = 32px

**Cards:**
- `.card` - Base card styling
- `.card-secondary` - Secondary card variant
- `.card-elevated` - Elevated card with shadow
- `.card-interactive` - Interactive/hoverable card

**Buttons:**
- `.btn` - Base button
- `.btn-primary` - Primary action
- `.btn-secondary` - Secondary action
- `.btn-danger` - Destructive action
- `.btn-success` - Positive action
- `.btn-outline` - Outline variant
- `.btn-sm`, `.btn-md`, `.btn-lg` - Sizes
- `.btn-block` - Full width

**Grid:**
- `.grid` - CSS grid container
- `.grid-cols-auto` - Auto columns
- `.grid-cols-2`, `.grid-cols-4` - Fixed columns
- `.gap-md`, `.gap-lg` - Gap sizes

**Flexbox:**
- `.flex` - Flex container
- `.flex-row`, `.flex-col` - Direction
- `.flex-center` - Center items
- `.justify-between`, `.align-center` - Alignment

---

## Implementation Checklist

For each HTML file:

- [ ] Replace `<link rel="stylesheet" href="css/style.css">` with `<link rel="stylesheet" href="css/main.css">`
- [ ] Add `<script src="components/index.js"></script>` in head (after CSS)
- [ ] Remove all inline `style="color: #..."` attributes
- [ ] Remove all inline `style="margin: ..."` - use `var(--space-*)`
- [ ] Replace hardcoded colors with design token classes
- [ ] Add `.card` or `.card-elevated` to container sections
- [ ] Add `.btn btn-primary` classes to all buttons
- [ ] Add `.text-*` classes for text hierarchy
- [ ] Update grid layouts to use `.grid grid-cols-*`
- [ ] Verify dark theme applied (dark backgrounds, light text)
- [ ] Test on mobile (responsive grid should work)
- [ ] Check all links render with proper text color

---

## CSS/Components Integration Details

### What main.css Provides

1. **Design Tokens** (`_variables.css`)
   - Color palette (dark backgrounds, accents, text hierarchy)
   - Spacing scale (4px base unit)
   - Typography families (Inter for body, IBM Plex Mono for code)
   - Shadow system (elevation levels)
   - Gradients for accents

2. **Base Styling** (`_layout.css`)
   - Global dark background
   - Typography defaults
   - Container max-width and padding
   - Grid system (12-column desktop, responsive)
   - Flexbox utilities

3. **Components** (`_components.css`)
   - `.card`, `.card-elevated`, `.card-secondary`
   - `.btn` with all variants and sizes
   - `.text-*` utility classes
   - Form elements (inputs, radios, checkboxes)
   - Tables and lists

4. **Animations** (`_animations.css`)
   - Smooth transitions
   - Hover states
   - Loading spinners
   - Fade-ins

### Component Scripts (optional, for advanced use)

All components in `/public/components/` are pre-built JavaScript classes:
- `Button` - Creates styled buttons programmatically
- `PlayerCard` - Renders player info with FM styling
- `MatchCard` - Match result cards
- `FormationBoard` - Tactical formation display
- `StandingsTable` - League table rendering
- `Layout.Header`, `.Sidebar`, `.Card` - Layout components

**For this phase:** HTML files use CSS classes directly. Component JS is available if dynamic rendering needed later.

---

## Success Criteria

1. All HTML files load `main.css` (not old `style.css`)
2. No hardcoded colors (#xxx) visible in HTML files
3. All spacing uses design tokens (`var(--space-*)`)
4. Dark theme properly applied (dark backgrounds, light text)
5. Buttons have proper styling (`.btn btn-primary` etc.)
6. Grid layouts responsive on mobile
7. Cards use `.card` or `.card-elevated`
8. Text hierarchy using `.text-primary`, `.text-secondary` etc.
9. No visual regressions in functionality
10. App maintains dark FM-inspired aesthetic across all pages

---

## Notes for Coder

- **Don't remove JavaScript functionality** - Only update HTML/CSS
- **Keep event handlers intact** - All `onclick`, module imports, etc. work as-is
- **Test responsiveness** - main.css has mobile breakpoints, verify they work
- **Check color contrast** - Dark theme should meet AA accessibility standards
- **CSS cascade** - main.css imports in correct order, no conflicts expected
- **Component library ready** - JavaScript components available if future phases need dynamic rendering

---

**Version:** 1.0  
**Created:** 2024-06  
**Priority:** Critical - Blocks professional design system rollout

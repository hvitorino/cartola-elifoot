# PHASE 3 PLANNER - Detailed Implementation Plan
**Role**: PLANNER  
**Status**: Ready for CODER  
**Timeline**: 1-2 days intensive refactor  

---

## EXECUTION STRATEGY

**Approach**: Full HTML/CSS/JS refactor using existing components + design tokens  
**Output**: 5 production-ready pages with Football Manager aesthetic  
**Testing**: Responsive (375/768/1440px), no console errors, <2s load  

---

## TASK BREAKDOWN

### TASK 1: Dashboard (index.html) - Homepage
**Component Dependencies**: FormationBoard, MatchCard, StandingsTable, Layout  
**Files to Create/Modify**:
- `public/index.html` (rewrite - ~200 lines)
- `public/js/dashboard.js` (new - ~300 lines)
- `public/css/dashboard.module.css` (new - ~150 lines)

**HTML Structure**:
```
<Layout>
  <header>
    <h1>Cartola Elifoot</h1>
    <section class="season-info">Season X | Matchday Y</section>
  </header>
  <main class="grid grid-3-col">
    <!-- Left: Formation (compact) -->
    <section class="formation-preview">
      <h2>Sua Escalação</h2>
      <FormationBoard compact={true} readonly={true} />
    </section>
    
    <!-- Center: Matches -->
    <section class="matches">
      <h2>Próximas Partidas</h2>
      <div id="matches-container">
        <!-- MatchCard instances -->
      </div>
    </section>
    
    <!-- Right: Standings -->
    <section class="standings">
      <h2>Classificação (Top 5)</h2>
      <StandingsTable limit={5} />
    </section>
  </main>
</Layout>
```

**Data Flow**:
1. Load from `/api/clubes` → set club context
2. Load lineup data → render FormationBoard
3. Load matches → render MatchCards
4. Load standings → render table

**Design Details**:
- Dark backgrounds: use var(--dark-bg-primary) for main, var(--dark-bg-secondary) for cards
- Spacing: var(--space-lg) gaps between sections
- Grid: CSS Grid 3 columns on desktop, 1 column on mobile
- Cards: use `.card.elevated` for visual depth

---

### TASK 2: Escalacao (escalacao.html) - Lineup Selection
**Component Dependencies**: FormationBoard (interactive), PlayerCard, Button, Layout  
**Files**:
- `public/escalacao.html` (rewrite - ~250 lines)
- `public/js/escalacao.js` (rewrite - ~500 lines)
- `public/css/escalacao.module.css` (new - ~200 lines)

**HTML Structure**:
```
<Layout>
  <header>
    <h1>Escalação</h1>
    <h2 id="club-name">Loading...</h2>
  </header>
  <main class="grid grid-2-col">
    <!-- Left: Formation Board (interactive) -->
    <section class="formation-editor">
      <div class="formation-controls">
        <select id="formation-select">
          <option value="4-3-3">4-3-3</option>
          <option value="4-2-4">4-2-4</option>
          ...
        </select>
      </div>
      <div id="formation-board"></div>
    </section>
    
    <!-- Right: Player Selection Panel -->
    <aside class="player-panel">
      <h3>Disponíveis ({N})</h3>
      <input type="search" id="player-search" placeholder="Buscar jogador...">
      <div id="players-list">
        <!-- PlayerCard instances -->
      </div>
    </aside>
  </main>
  <footer class="actions">
    <button class="btn btn-primary">Confirmar Escalação</button>
    <button class="btn btn-secondary">Cancelar</button>
  </footer>
</Layout>
```

**State Management**:
```javascript
// Track selected 11 players
const lineupState = {
  formation: '4-3-3',
  selectedPlayers: [...], // 11 players
  substitutes: [...]      // spare players
}
```

**Interactions**:
- Change formation → FormationBoard layout updates
- Click player → add/remove from formation
- Drag player → reorder positions (if drag-drop available)
- Confirm → save to localStorage, navigate to dashboard

---

### TASK 3: Simulacao (simulacao.html) - Live Match
**Component Dependencies**: MatchTimeline, StatPanel, Layout  
**Files**:
- `public/simulacao.html` (rewrite - ~200 lines)
- `public/js/simulacao.js` (rewrite - ~400 lines)
- `public/css/simulacao.module.css` (new - ~150 lines)

**HTML Structure**:
```
<Layout variant="fullscreen">
  <header class="match-header">
    <div class="team-home">
      <h2 id="home-team">...</h2>
    </div>
    <div class="score-display">
      <div class="score" id="score-home">0</div>
      <div class="separator">×</div>
      <div class="score" id="score-away">0</div>
    </div>
    <div class="team-away">
      <h2 id="away-team">...</h2>
    </div>
  </header>

  <main class="grid grid-2-col match-display">
    <!-- Left: Match Timeline -->
    <section class="timeline-section">
      <h3>Eventos</h3>
      <div id="match-timeline"></div>
    </section>
    
    <!-- Right: Stats & Formation -->
    <section class="stats-section">
      <h3>Estatísticas</h3>
      <div id="match-stats"></div>
      <h3>Formações</h3>
      <div class="formations-grid">
        <div id="home-formation"></div>
        <div id="away-formation"></div>
      </div>
    </section>
  </main>
</Layout>
```

**Real-time Simulation**:
- Update score every 3-5 seconds
- Add timeline events (goals, yellows, substitutions)
- Update stats live
- Progress bar showing match time (0-90 min)

---

### TASK 4: Resultado (resultado.html) - Match Results
**Component Dependencies**: MatchTimeline, StatPanel, PlayerCard, Layout  
**Files**:
- `public/resultado.html` (rewrite - ~220 lines)
- `public/js/resultado.js` (rewrite - ~350 lines)
- `public/css/resultado.module.css` (new - ~150 lines)

**HTML Structure**:
```
<Layout>
  <header class="result-header">
    <div class="final-score">
      <h1 id="home-team">...</h1>
      <div class="score-display">
        <div class="score" id="score-home">0</div>
        <div class="separator">×</div>
        <div class="score" id="score-away">0</div>
      </div>
      <h1 id="away-team">...</h1>
    </div>
  </header>

  <main class="grid grid-2-col">
    <!-- Left: Timeline + Stats -->
    <section>
      <h2>Resumo da Partida</h2>
      <div id="match-timeline"></div>
      <div id="match-stats"></div>
    </section>
    
    <!-- Right: Player Performance -->
    <section>
      <h2>Desempenho dos Jogadores</h2>
      <div id="top-performers">
        <!-- PlayerCard detailed variant -->
      </div>
    </section>
  </main>

  <footer class="actions">
    <button class="btn btn-primary">Ir para Rodada</button>
    <button class="btn btn-secondary">Próxima Partida</button>
  </footer>
</Layout>
```

---

### TASK 5: Rodada (rodada.html) - Season Dashboard
**Component Dependencies**: StandingsTable, MatchCard, Layout  
**Files**:
- `public/rodada.html` (rewrite - ~200 lines)
- `public/js/rodada.js` (rewrite - ~400 lines)
- `public/css/rodada.module.css` (new - ~150 lines)

**HTML Structure**:
```
<Layout>
  <header>
    <h1>Rodada {N}</h1>
    <p class="season-info">Temporada 2026</p>
  </header>

  <main class="grid grid-full">
    <!-- Standings Table -->
    <section class="standings-section">
      <div class="controls">
        <select id="sort-by">
          <option>Pontos</option>
          <option>Vitórias</option>
          <option>Saldo de Gols</option>
        </select>
      </div>
      <div class="zone-legend">
        <span class="zone zone-q">Libertadores</span>
        <span class="zone zone-europa">Copa do Brasil</span>
        <span class="zone zone-rebaixamento">Rebaixamento</span>
      </div>
      <div id="standings-table"></div>
    </section>

    <!-- Recent + Upcoming -->
    <div class="grid grid-2-col matches-section">
      <section>
        <h2>Últimos Resultados</h2>
        <div id="recent-matches"></div>
      </section>
      <section>
        <h2>Próximas Partidas</h2>
        <div id="upcoming-matches"></div>
      </section>
    </div>
  </main>
</Layout>
```

---

## SHARED REQUIREMENTS (All Pages)

### HTML Setup
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cartola Elifoot - [Page Title]</title>
  <!-- Design System -->
  <link rel="stylesheet" href="/css/main.css">
  <!-- Page Styles -->
  <link rel="stylesheet" href="/css/[page].module.css">
</head>
<body>
  <!-- Content -->
  <script type="module" src="/js/[page].js"></script>
</body>
</html>
```

### JavaScript Pattern
```javascript
// Each page follows this pattern:
class Page {
  constructor() {
    this.state = {};
    this.setupElements();
    this.attachListeners();
  }
  
  async init() {
    // Load data from API
    // Render components
    // Setup animations
  }
  
  setupElements() { /* DOM refs */ }
  attachListeners() { /* Event handlers */ }
  render() { /* Update UI */ }
  destroy() { /* Cleanup */ }
}

// Initialize on page load
const page = new Page();
page.init().catch(err => console.error('Error:', err));
```

### CSS Pattern
```css
/* Use design tokens, no hardcoded colors */
.page-section {
  background-color: var(--dark-bg-secondary);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

/* Responsive grid */
@media (max-width: 768px) {
  .grid-2-col { grid-template-columns: 1fr; }
}

@media (min-width: 1440px) {
  .grid-2-col { grid-template-columns: 1fr 1fr; }
}
```

---

## IMPLEMENTATION CHECKLIST

- [ ] Task 1: Dashboard complete & tested
- [ ] Task 2: Escalacao complete & tested
- [ ] Task 3: Simulacao complete & tested
- [ ] Task 4: Resultado complete & tested
- [ ] Task 5: Rodada complete & tested
- [ ] All pages responsive (375/768/1440px)
- [ ] No console errors on any page
- [ ] All components properly styled with design tokens
- [ ] Navigation between pages works
- [ ] API calls working with fallbacks
- [ ] Forms validating correctly
- [ ] Performance <2s load time

---

## ESTIMATED TIME

- Dashboard: 2 hours
- Escalacao: 2.5 hours
- Simulacao: 2 hours
- Resultado: 2 hours
- Rodada: 2 hours
- Integration + Testing: 1.5 hours
- **TOTAL**: ~12 hours

---

**Status**: ✅ READY FOR CODER  
**Next Step**: CODER implements all 5 pages using this plan

Generated: 2026-06-01

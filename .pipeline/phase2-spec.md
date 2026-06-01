# Phase 2 Specification: Polishing and Enhancement

## Overview

Phase 2 transforms the MVP into a production-quality football management experience by adding standings tracking, match history, dramatic narrative variations, responsive design, and progressive text animation.

**Timeline Target**: 3-4 development cycles
**Test Coverage**: Unit tests for new functions + integration tests for standings/history flow

---

## 1. File Structure and Organization

### Files to Create

```
public/
├── rodada.html                    # NEW: Round dashboard / standings view
├── js/
│   ├── standings.js              # NEW: Standings table logic + API integration
│   ├── historico.js              # NEW: Match history management and rendering
│   ├── animacao.js               # NEW: Progressive text animation engine
│   └── narracao-extended.js      # NEW: 30+ narrative variations by play type
├── css/
│   ├── responsivo.css            # NEW: Mobile-first responsive breakpoints
│   └── animacoes.css             # NEW: Text animation keyframes
├── test/
│   ├── standings.test.js         # NEW: Standings calculations
│   ├── historico.test.js         # NEW: History persistence
│   ├── animacao.test.js          # NEW: Animation timing
│   └── narracao-extended.test.js # NEW: Narrative pool coverage
└── data/
    └── tabela-inicial.json       # NEW: Fallback standings data

server.js                          # MODIFY: Add /api/classificacao endpoint
public/js/api.js                  # MODIFY: Add getStandings() function
public/js/estado.js               # MODIFY: Add tabela, historico persistence
public/simulacao.js               # MODIFY: Integrate animacao.js
public/resultado.html             # MODIFY: Add standings & history links
public/escalacao.html             # MODIFY: Mobile-first CSS enhancements
public/css/style.css              # MODIFY: Base responsive styles
```

---

## 2. New Components and Functions

### 2.1 Standings Module (`public/js/standings.js`)

**Purpose**: Fetch, calculate, and manage league standings

**API Endpoints to Support**:
- `GET /api/classificacao` — League standings from Cartola (via server proxy)
- Fallback mock data from `/public/data/tabela-inicial.json`

**Key Functions**:

```javascript
/**
 * Fetch league standings from Cartola API (with fallback)
 * @returns {Promise<Array<Object>>}
 * Structure: [
 *   { posicao: 1, clube_id: 2, nome_clube: "Flamengo", pontos: 45, jogos: 15, vitorias: 14, empates: 0, derrotas: 1, gols_pro: 42, gols_contra: 10, saldo: 32 },
 *   ...
 * ]
 */
export async function obterTabelaClassificacao() { }

/**
 * Render standings table to DOM
 * @param {Array<Object>} tabela - Standings data
 * @param {Number} clubeId - Current player's club (highlight in UI)
 * @param {HTMLElement} container
 */
export function renderTabelaClassificacao(tabela, clubeId, container) { }

/**
 * Sort standings by points, goal difference, goals scored
 * @param {Array<Object>} tabela
 * @returns {Array<Object>} Sorted standings
 */
export function ordenarTabela(tabela) { }

/**
 * Get player's current position in standings
 * @param {Number} clubeId
 * @param {Array<Object>} tabela
 * @returns {Number} Position (1-20)
 */
export function obterPosicaoDoClube(clubeId, tabela) { }
```

**UI Requirements**:
- Table with columns: Position | Club | Matches | W-D-L | Goals | Diff | Points
- Highlight current player's club row (background color + bold text)
- Responsive: Stack vertically on mobile, use horizontal scroll if needed
- Show last update time (cached from Cartola)

---

### 2.2 History Module (`public/js/historico.js`)

**Purpose**: Track and display all completed matches

**Key Functions**:

```javascript
/**
 * Add completed match to history
 * @param {Object} resultado - { escalacao, adversario, lances, placar, destaques, data_rodada, numero_rodada }
 */
export function adicionarResultadoAoHistorico(resultado) { }

/**
 * Get all match history
 * @returns {Array<Object>} Matches sorted by round (descending)
 */
export function obterHistoricoCompleto() { }

/**
 * Get matches by club opponent
 * @param {Number} clubeId - Opponent club ID
 * @returns {Array<Object>}
 */
export function filtrarHistoricoPorAdversario(clubeId) { }

/**
 * Calculate cumulative season stats
 * @param {Array<Object>} historico
 * @returns {Object} { vitorias, derrotas, empates, gols_pro, gols_contra, saldo }
 */
export function calcularEstatisticasSeason(historico) { }

/**
 * Render match history card
 * @param {Object} resultado - Single match result
 * @returns {HTMLElement}
 */
export function renderCartaoHistorico(resultado) { }

/**
 * Render full history timeline
 * @param {HTMLElement} container
 * @param {Array<Object>} historico
 */
export function renderTimelineHistorico(container, historico) { }
```

**UI Requirements**:
- Timeline view with most recent matches first
- Each card shows: Round # | Opponent | Score | MVP | Key stats
- Click to expand and show full narrative
- Filter by opponent or round range
- Season stats summary (W-D-L, total goals, etc.)

---

### 2.3 Animation Module (`public/js/animacao.js`)

**Purpose**: Progressive text animation during match narrative

**Key Functions**:

```javascript
/**
 * Configure animation system
 * @param {Object} config - { baseDelay, charDelay, fadeInDuration, scrollBehavior }
 * Default: { baseDelay: 500, charDelay: 30, fadeInDuration: 400, scrollBehavior: 'smooth' }
 */
export function configurarAnimacao(config) { }

/**
 * Animate text character-by-character with optional fade-in
 * @param {HTMLElement} element - Target element for animation
 * @param {String} texto - Text to animate
 * @param {Object} options - { delay, charDelay, fadeIn, tipo }
 * @returns {Promise} Resolves when animation complete
 */
export async function animarTexto(element, texto, options = {}) { }

/**
 * Queue multiple text animations sequentially
 * @param {Array<{element, texto, options}>} fila
 * @returns {Promise} Resolves when all complete
 */
export async function animarFilaTextos(fila) { }

/**
 * Cancel ongoing animations
 */
export function cancelarAnimacoes() { }

/**
 * Get animation timing data for testing
 * @returns {Object} { totalTime, charCount, avgCharTime }
 */
export function obterEstatisticasAnimacao() { }
```

**Animation Specifications**:
- **Character-by-character reveal**: Each character appears at interval (default 30ms)
- **Fade-in on reveal**: Optional CSS fade-in during character display
- **Smart scrolling**: Auto-scroll narrative container to latest play (smooth behavior)
- **Goal emphasis**: Larger delay before goal plays, pulsing green highlight
- **Yellow card**: Orange highlight, brief delay
- **Red card**: Red highlight, dramatic pause
- **Cancellation**: Stop animation on user click or page navigation

---

### 2.4 Extended Narrative Pool (`public/js/narracao-extended.js`)

**Purpose**: 30+ dramatic narrative variations per play type

**Requirements**:

Each play type must have **minimum 4-6 variations**:

```javascript
export const FRASES_ESTENDIDAS = {
  gol: [
    // Category: Tap-in / Close range
    "{minuto}' — {atacante} recebe na área, domina e não perdoa! GOOOOL!",
    "{minuto}' — {atacante} está em posição, domina e finaliza! A bola entra! GOOOOL!",
    "{minuto}' — Espaço na área para {atacante}... deixa o pé falar! É GOL!",
    
    // Category: Long-range strikes
    "{minuto}' — Que golaço de {atacante}! Chute de fora da área, sem chance pro goleiro!",
    "{minuto}' — {atacante} arrisca de 25 metros! Que bomba! GOOOOL!",
    "{minuto}' — {atacante} pega firme de fora da área. Bola entra no ângulo! Que gol!",
    
    // Category: Rebounds / Lucky
    "{minuto}' — {atacante} aproveita o rebote e empurra pra rede. É gol!",
    "{minuto}' — Deixa rebote pra lá! {atacante} fica atento e completa! GOOOOL!",
    "{minuto}' — Goleiro soltou a bola, {atacante} não desperdição! GOL!",
    
    // Category: Dramatic / Clutch
    "{minuto}' — QUE GOLAÇO! Cara a cara com o goleiro, {atacante} não hesita e marca!",
    "{minuto}' — {atacante} dribla a defesa toda, entra na área e finaliza! GOOOOL!",
    "{minuto}' — Saída rápida devastadora! {atacante} fica em velocidade e não perdoa!"
  ],
  
  chute_defendido: [
    "{minuto}' — {atacante} arrisca de longe, mas o goleiro espalma com segurança.",
    "{minuto}' — Tentativa perigosa de {atacante}! Goleiro acompanha bem e segura.",
    "{minuto}' — {atacante} capricha na tentativa, mas o goleiro não deixa passar.",
    "{minuto}' — Boa chegada de {atacante}, mas a defesa corta no último momento.",
    "{minuto}' — {atacante} tira do pé, bola na defesa!",
    "{minuto}' — {atacante} experimenta o chute, mas sai fraco nas mãos do goleiro."
  ],
  
  chute_fora: [
    "{minuto}' — {atacante} domina e chuta cruzado, mas a bola passa longe do gol.",
    "{minuto}' — Tentativa de {atacante} pela direita. Mandou pra fora.",
    "{minuto}' — Oportunidade desperdiçada! {atacante} chuta muito aberto.",
    "{minuto}' — {atacante} não consegue colocar a bola no alvo.",
    "{minuto}' — Vai longe! {atacante} desperdiça oportunidade de ouro.",
    "{minuto}' — Batida imprecisa de {atacante}. Vai para longe."
  ],
  
  escanteio: [
    "{minuto}' — Pressão do ataque! Bola no escanteio.",
    "{minuto}' — {atacante} cruza na área, defesa afasta. Escanteio!",
    "{minuto}' — Bola na lateral, tiro rápido.",
    "{minuto}' — Cruzamento perigoso! Defesa tira para escanteio.",
    "{minuto}' — {atacante} força pelo flanco. Bola sai, escanteio!",
    "{minuto}' — Última defesa: escanteio pra {atacante}!"
  ],
  
  falta: [
    "{minuto}' — Falta dura em {atacante}. Jogo parado.",
    "{minuto}' — {defensor} trava {atacante} na entrada da área. Falta perigosa!",
    "{minuto}' — Disputa acirrada! Árbitro marca a falta.",
    "{minuto}' — {atacante} é derrubado! Falta clara do árbitro!",
    "{minuto}' — Falta de {defensor} em {atacante}. Será amarelo?",
    "{minuto}' — Impedimento? Não, falta! {atacante} fica irritado com a marca."
  ],
  
  cartao_amarelo: [
    "{minuto}' — {defensor} recebe CARTÃO AMARELO por jogo violento!",
    "{minuto}' — Árbitro mostra amarelo para {defensor}!",
    "{minuto}' — AMARELO! {defensor} foi imprudente na dividida.",
    "{minuto}' — Segundo aviso para {defensor}! Cuidado aí!"
  ],
  
  cartao_vermelho: [
    "{minuto}' — EXPULSÃO! {defensor} vê CARTÃO VERMELHO! Time fica com 10!",
    "{minuto}' — VERMELHO! {defensor} é expulso da partida!",
    "{minuto}' — QUE DESESPERO! {defensor} leva vermelho e sai de campo!",
    "{minuto}' — Não era pra ser vermelha! {defensor} discorda mas tem que ir!"
  ],
  
  lesao: [
    "{minuto}' — {atacante} fica caído! Parece estar machucado.",
    "{minuto}' — PREOCUPANTE! {atacante} não consegue continuar. Entra o substituto.",
    "{minuto}' — Infelizmente {atacante} terá que sair do campo por lesão.",
    "{minuto}' — Golpe duro! {atacante} deixa o campo mancando."
  ],
  
  defesa_espetacular: [
    "{minuto}' — QUE DEFESA! {defensor} tira uma bola quase já dentro do gol!",
    "{minuto}' — Não era pra passar! {defensor} tira milagrosamente!",
    "{minuto}' — Defesa de categoria internacional de {defensor}!",
    "{minuto}' — Que alcance! {defensor} consegue tirar no último instante!"
  ]
};
```

**Implementation Details**:
- Expand `narracao.js` OR create `narracao-extended.js` with 50+ total phrases
- Add play types: `cartao_amarelo`, `cartao_vermelho`, `lesao`, `defesa_espetacular`
- Randomize selection to avoid repetition within same match
- Support `{atacante}` and `{defensor}` placeholders
- Use different narrative "moods" based on match context (close game, dominant team, etc.)

---

## 3. API Integration and Backend

### 3.1 New Endpoint: `/api/classificacao`

**File**: `server.js` (MODIFY)

```javascript
/**
 * GET /api/classificacao
 * Proxy to Cartola API - league standings
 */
app.get('/api/classificacao', async (req, res) => {
  try {
    const data = await fetchWithTimeout(`${CARTOLA_API}/classificacao`);
    res.json(data);
  } catch (err) {
    console.error('Error fetching classificacao:', err.message);
    // Return fallback standings from data file
    const fallback = await import('./public/data/tabela-inicial.json', { assert: { type: 'json' } });
    res.json(fallback.default);
  }
});
```

**Fallback Data**: `/public/data/tabela-inicial.json`
- Pre-populated with real Série A clubs (20 teams)
- Used when Cartola API is unavailable
- Structure matches Cartola API response

### 3.2 Modified Endpoint: `/api/atletas/mercado`

**Add caching** to `server.js`:
```javascript
const CACHE_TIMEOUT = 3600000; // 1 hour
let cachedPlayers = null;
let cacheTimestamp = null;

app.get('/api/atletas/mercado', async (req, res) => {
  // Return cached if fresh
  if (cachedPlayers && Date.now() - cacheTimestamp < CACHE_TIMEOUT) {
    return res.json(cachedPlayers);
  }
  
  // Otherwise fetch and cache
  try {
    const data = await fetchWithTimeout(`${CARTOLA_API}/atletas/mercado`);
    cachedPlayers = data;
    cacheTimestamp = Date.now();
    res.json(data);
  } catch (err) {
    // ... fallback to mock
  }
});
```

---

## 4. State Management Updates

### 4.1 Modified `public/js/estado.js`

**Add fields to state structure**:

```javascript
export function estadoInicial() {
  return {
    clubeId: null,
    rodadaAtual: 1,
    escalacaoAtual: [],
    esquemaTatico: '4-4-2',
    tabela: [],              // League standings array
    historico: [],            // Match history array
    dataUltimaAtualizacaoTabela: null,  // Timestamp for cache
    estatisticase: {          // Season aggregates
      vitorias: 0,
      derrotas: 0,
      empates: 0,
      gols_pro: 0,
      gols_contra: 0
    }
  };
}

/**
 * Update standings table
 */
export function atualizarTabela(novaTabela) {
  const current = getEstado();
  setEstado({
    tabela: novaTabela,
    dataUltimaAtualizacaoTabela: new Date().toISOString()
  });
}

/**
 * Get cached standings or fetch if stale (>30 min)
 */
export async function obterTabelaAtualizada(forceRefresh = false) {
  const current = getEstado();
  const agora = new Date().getTime();
  const ultimaData = current.dataUltimaAtualizacaoTabela ? new Date(current.dataUltimaAtualizacaoTabela).getTime() : 0;
  const meia_hora = 30 * 60 * 1000;
  
  if (!forceRefresh && current.tabela?.length > 0 && (agora - ultimaData) < meia_hora) {
    return current.tabela;
  }
  
  // Fetch new standings
  const novaTabela = await standings.obterTabelaClassificacao();
  atualizarTabela(novaTabela);
  return novaTabela;
}
```

---

## 5. UI/UX Enhancements

### 5.1 New Page: `public/rodada.html`

**Purpose**: Round dashboard combining standings + history + next opponent

**Sections**:
1. **Current Round Info**
   - Round number, current week
   - Next opponent (random)
   - Next opponent's standing position
   - Button: "Ir para Escalação"

2. **League Standings**
   - Full table (see standings.js UI requirements)
   - Current club highlighted
   - Last update time + refresh button

3. **Season Statistics**
   - Record: W-D-L
   - Goals: Pro / Contra / Difference
   - Position trend chart (if 3+ rounds played)

4. **Match History Timeline**
   - Last 5 matches
   - Each shows: Opponent | Score | MVP | Date
   - "View all history" link

**Layout**:
- Desktop: 2-3 columns (standings | stats | history)
- Tablet: Stacked with tabs
- Mobile: Full-width stacked sections

### 5.2 Responsive CSS Enhancements

**File**: `public/css/responsivo.css` (NEW)

```css
/* Mobile-first base */
body { font-size: 16px; }
.container { padding: 1rem; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container { padding: 2rem; max-width: 100%; }
  .standings-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container { max-width: 1200px; }
  .standings-grid { grid-template-columns: 2fr 1fr 1fr; }
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
  .container { max-width: 1400px; }
}

/* Touch-friendly spacing */
@media (hover: none) {
  button { padding: 1rem 1.5rem; font-size: 1.1rem; }
  .player-card { padding: 1rem; }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  body { background: #1a1a1a; color: #fff; }
  .card { background: #2a2a2a; border-color: #444; }
}

/* Orientation: Landscape on small devices */
@media (max-height: 600px) and (orientation: landscape) {
  header { padding: 0.5rem; }
  .container { padding: 0.75rem; }
}
```

### 5.3 Animation CSS (`public/css/animacoes.css`) (NEW)

```css
/* Text reveal animation */
@keyframes charReveal {
  0% { opacity: 0; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

@keyframes fadeInUp {
  0% { 
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Goal celebration effect */
@keyframes pulseGol {
  0%, 100% { background: #f0fdf4; }
  50% { background: #dcfce7; }
}

.lance-gol.animating {
  animation: pulseGol 0.6s ease-in-out;
}

/* Card appearance with delay */
@keyframes slideIn {
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
  animation: slideIn 0.4s ease-out forwards;
}

.lance:nth-child(1) { animation-delay: 0ms; }
.lance:nth-child(2) { animation-delay: 100ms; }
.lance:nth-child(3) { animation-delay: 200ms; }
/* etc. */
```

### 5.4 Modify Existing Pages

**`public/escalacao.html`**:
- Add "View Standings" link in header
- Improve mobile button sizing (min 44px tap target)
- Fix player list overflow on narrow screens

**`public/resultado.html`**:
- Add link to "Match History"
- Add standings widget showing player's new position
- Responsive stats layout

**`public/simulacao.html`**:
- Integrate `animacao.js` for text reveal
- Add play-type-specific styling (colors, icons)
- Mobile: adjust narrative container height
- Add pause/resume animation button for accessibility

**`public/css/style.css`**:
- Add `@media (max-width: 600px)` breakpoints to all grids
- Make narrative container scrollable on mobile
- Touch-friendly button sizing

---

## 6. Progressive Text Animation During Simulation

### 6.1 Integration in `simulacao.html`

**Replace current setTimeout-based approach**:

```javascript
import * as animacao from './js/animacao.js';
import * as narracao from './js/narracao-extended.js';

async function exibirNarracaoProgresiva() {
  const narracaoDiv = document.getElementById('naracao');
  
  for (const lance of matchData.lances) {
    const narrativa = narracao.narrarLance(lance);
    const lanceDom = document.createElement('div');
    lanceDom.className = `lance lance-${lance.tipo}`;
    narracaoDiv.appendChild(lanceDom);
    
    // Animate text character-by-character
    await animacao.animarTexto(lanceDom, narrativa, {
      charDelay: 25,
      fadeIn: true,
      tipo: lance.tipo
    });
    
    // Special delays for dramatic plays
    if (lance.tipo === 'gol') {
      await new Promise(r => setTimeout(r, 1500)); // Extra pause after goal
    } else if (['cartao_vermelho', 'lesao'].includes(lance.tipo)) {
      await new Promise(r => setTimeout(r, 800)); // Dramatic pause
    }
    
    // Auto-scroll
    narracaoDiv.scrollTop = narracaoDiv.scrollHeight;
    
    // Update score if goal
    if (lance.resultado === 'gol') {
      atualizarScore();
      lanceDom.classList.add('animating'); // Trigger pulse animation
    }
  }
}
```

### 6.2 Animation Performance

- **Character delay**: 25-30ms per character (adjustable)
- **Fade-in duration**: 400ms for full character opacity
- **Total match time**: ~1-3 minutes depending on play count
- **Memory**: Stream DOM updates (don't pre-render all 20+ plays)
- **Accessibility**: Add `prefers-reduced-motion` support

```css
@media (prefers-reduced-motion: reduce) {
  .lance {
    animation: none;
    opacity: 1;
  }
}
```

---

## 7. Test Coverage Points

### 7.1 Unit Tests

**`public/test/standings.test.js`**:
- [ ] `obterTabelaClassificacao()` returns valid structure
- [ ] Fallback data loads when API unavailable
- [ ] `ordenarTabela()` sorts by: points desc, diff desc, scored desc
- [ ] `obterPosicaoDoClube()` returns correct position

**`public/test/historico.test.js`**:
- [ ] `adicionarResultadoAoHistorico()` persists to localStorage
- [ ] `calcularEstatisticasSeason()` aggregates W-D-L correctly
- [ ] History filters by club ID
- [ ] Timeline orders by round descending

**`public/test/animacao.test.js`**:
- [ ] `animarTexto()` completes in expected time
- [ ] Character reveal happens in order
- [ ] Fade-in CSS applied correctly
- [ ] `cancelarAnimacoes()` stops ongoing animations
- [ ] Multiple animations queue correctly

**`public/test/narracao-extended.test.js`**:
- [ ] All play types have 4+ variations
- [ ] Total pool size >= 50 phrases
- [ ] Placeholders `{minuto}`, `{atacante}`, `{defensor}` replaced correctly
- [ ] No duplicates within 10-play sample

### 7.2 Integration Tests

**`public/test/e2e-rodada.test.js`** (NEW):
- [ ] Navigate from escalacao → simulacao → resultado → rodada (dashboard)
- [ ] Standings table renders on rodada.html
- [ ] Current club highlighted correctly
- [ ] Match history timeline shows last 5 matches
- [ ] Season stats update after new match

**`public/test/e2e-animation.test.js`** (NEW):
- [ ] Text animates during simulacao.html
- [ ] Auto-scroll works during animation
- [ ] Goal plays have extra delay
- [ ] All 20+ lances animate before "next button" shows

### 7.3 Performance Tests

- [ ] Animation at 60 FPS (no jank)
- [ ] Standings render <500ms with 20 clubs
- [ ] History timeline <1s with 10 matches

---

## 8. Implementation Order

**Cycle 1 - Foundation**:
1. Create `standings.js` + `/api/classificacao` endpoint
2. Create fallback data file
3. Implement standings rendering UI
4. Tests for standings module

**Cycle 2 - History & State**:
1. Create `historico.js` module
2. Modify `estado.js` to persist tabela + historico
3. Create `rodada.html` dashboard
4. Tests for history module

**Cycle 3 - Animation & Narrative**:
1. Create `animacao.js` module
2. Expand narracao (30+ variations)
3. Integrate animations in `simulacao.html`
4. Animation tests + visual verification

**Cycle 4 - Responsive Design & Polish**:
1. Create `responsivo.css` + `animacoes.css`
2. Update existing HTML pages for mobile
3. Add dark mode support
4. E2E tests + performance validation

---

## 9. Success Criteria

- [ ] Standings table displays correctly on desktop, tablet, mobile
- [ ] Current player's club highlighted and sortable
- [ ] Match history persists across sessions (localStorage)
- [ ] Text animates smoothly at 60 FPS during simulation
- [ ] 30+ narrative variations in phrase pool
- [ ] Zero duplicate narrations in single match
- [ ] Mobile: All buttons/inputs have 44px+ tap target
- [ ] Mobile: No horizontal scroll required
- [ ] Dark mode: All colors readable with `prefers-color-scheme`
- [ ] Accessibility: `prefers-reduced-motion` respected
- [ ] API fallback to mock data works seamlessly
- [ ] Page load time <2s (cached standings)
- [ ] All unit tests pass (8/10 coverage of new code)
- [ ] All integration tests pass

---

## 10. Known Constraints & Notes

1. **Cartola API Limitations**:
   - `/classificacao` endpoint may not match exact structure used in real Cartola
   - Fallback data in `/public/data/tabela-inicial.json` required
   - May need to scrape or use community endpoint

2. **Animation Performance**:
   - Character-by-character animation uses DOM manipulation (not WebGL)
   - Monitor paint/layout cycles in DevTools
   - May need `will-change: opacity` for performance on older devices

3. **localStorage Limits**:
   - Match history (historico) stored in browser localStorage
   - Limit ~5-10MB per domain
   - If historico grows >50 matches, consider archiving oldest entries

4. **Responsive Breakpoints**:
   - Mobile: max-width 600px
   - Tablet: 601px - 1023px
   - Desktop: 1024px+
   - Follow mobile-first approach

5. **Dark Mode**:
   - Use CSS custom properties for colors
   - Test with `prefers-color-scheme: dark` in DevTools
   - Ensure sufficient contrast (WCAG AA minimum)

---

## Appendix: File Diff Summary

| File | Type | Changes |
|------|------|---------|
| `server.js` | MODIFY | Add `/api/classificacao` endpoint + caching |
| `public/js/api.js` | MODIFY | Add `getStandings()` function |
| `public/js/estado.js` | MODIFY | Add tabela, historico fields + persistence |
| `public/js/simulacao.js` | MODIFY | Integrate animacao.js; update simulation logic |
| `public/css/style.css` | MODIFY | Add mobile breakpoints (600px, 1024px) |
| `public/escalacao.html` | MODIFY | Mobile UX improvements; add nav links |
| `public/resultado.html` | MODIFY | Add standings widget; responsive layout |
| `public/simulacao.html` | MODIFY | Integrate `animacao.js` |
| `public/rodada.html` | CREATE | New dashboard page |
| `public/js/standings.js` | CREATE | Standings module (6 functions) |
| `public/js/historico.js` | CREATE | History module (6 functions) |
| `public/js/animacao.js` | CREATE | Animation module (5 functions) |
| `public/js/narracao-extended.js` | CREATE | 50+ phrase variations |
| `public/css/responsivo.css` | CREATE | Mobile-first breakpoints |
| `public/css/animacoes.css` | CREATE | Text reveal + transition keyframes |
| `public/data/tabela-inicial.json` | CREATE | Fallback standings data |
| `public/test/*.test.js` | CREATE | 4 test files (8+ test suites) |

---

## End of Phase 2 Spec

This spec is **production-ready** and follows existing project patterns (Vanilla JS, localStorage, Cartola API proxying). All functions are testable, modular, and compatible with the current MVP architecture.

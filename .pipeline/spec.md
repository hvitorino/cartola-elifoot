# Cartola Elifoot MVP — Complete Initialization Spec

## Overview
Initialize the complete project foundation for a football management game combining Elifoot gameplay with real Cartola FC data. All files created in phase one are scaffolds ready for implementation.

---

## Phase 1: Complete File Structure & Initialization

### Root Configuration Files

#### 1. `/package.json`
**Dependencies needed:**
- `express` (^4.18.0) — server framework
- `node-fetch` (^2.6.11) — API calls in Node.js
- `cors` (^2.8.5) — CORS handling
- `body-parser` (^1.20.2) — JSON parsing

**Scripts:**
```json
{
  "start": "node server.js",
  "dev": "node server.js"
}
```

**Key fields:**
- `name`: "cartola-elifoot"
- `version`: "0.1.0"
- `type`: "module" (for ES6 imports, optional)
- `engines`: `{ "node": ">=16.0.0" }`

---

#### 2. `/vercel.json`
**Structure:**
```json
{
  "version": 2,
  "buildCommand": "npm install",
  "public": "public",
  "functions": {
    "server.js": { "memory": 1024 }
  },
  "routes": [
    { "src": "/api/(.*)", "dest": "server.js" },
    { "src": "/(.*)", "dest": "public/$1" }
  ]
}
```

**Key behavior:**
- Serve static files from `/public`
- Route `/api/*` requests to `server.js`
- Rewrite HTML files without extensions

---

#### 3. `/server.js`
**Responsibilities:**
- Express server on port 3000
- Proxy API calls to Cartola FC
- Serve static files from `/public`
- Error handling with fallback to mock data

**Required endpoints:**
- `GET /api/clubes` — proxy to `https://api.cartola.globo.com/clubes`
- `GET /api/atletas/mercado` — proxy to `https://api.cartola.globo.com/atletas/mercado`
- `GET /api/partidas/:rodada` — proxy to `https://api.cartola.globo.com/partidas/:rodada`
- `GET /api/pos-rodada/destaques` — proxy to `https://api.cartola.globo.com/pos-rodada/destaques`
- `GET /` — serve `public/index.html`

**Error handling:**
- Catch fetch errors (network, API down)
- Return 502 Bad Gateway if upstream fails
- Client-side should handle errors gracefully

**CORS:** Enable CORS for development; may be restricted on Vercel

---

### HTML Files (in `/public/`)

#### 4. `/public/index.html`
**Purpose:** Initial screen — select a club to manage

**Key elements:**
- Header with game title
- Loading state (spinner) while fetching clubs
- Grid/list of all Serie A clubs with logos/names
- Button to select club (on click, navigate to escalacao.html)
- Error message div for API failures
- Fallback text "Choose a club from the list"

**Page flow:**
1. On load, call `api.getClubs()`
2. Populate club selector
3. Store selected `clubeId` in `localStorage` as `estado.clubeId`
4. On selection, navigate to `escalacao.html`

---

#### 5. `/public/escalacao.html`
**Purpose:** Lineup selection — choose 11 players, set formation

**Key elements:**
- Header showing selected club name
- Opponent for current round (fetch via API)
- Formation selector (4-4-2, 4-3-3 radio buttons)
- Player list grouped by position:
  - `posicao_id` 1 = GOL (1 required)
  - `posicao_id` 2 = LAT (2 required)
  - `posicao_id` 3 = ZAG (2 required)
  - `posicao_id` 4 = MEI (4 for 4-4-2, 3 for 4-3-3)
  - `posicao_id` 5 = ATA (2 for 4-4-2, 3 for 4-3-3)
- Player card with name, position, `media_num` (average score)
- Checkbox to select/deselect players
- "Confirm & Simulate" button (disabled until 11 players selected)
- Validation message: "Need X more defenders", etc.

**Page flow:**
1. Load club from `estado.clubeId`
2. Fetch players from `api.getPlayersByClub(clubeId)`
3. Display formation selector with validation
4. On selection change, validate formation
5. On confirm, store `escalacaoAtual` and `esquemaTatico` in `localStorage`
6. Navigate to `simulacao.html`

---

#### 6. `/public/simulacao.html`
**Purpose:** Match narrative — text-based play-by-play commentary

**Key elements:**
- Header: Club name vs. Opponent
- Score display (real-time updates: "0 - 0")
- Narrative feed (div with `id="naracao"`)
- Each play appears progressively (1 per 2-3 seconds)
- Play types styled differently (gol = green highlight, falta = yellow, etc.)
- "Match in Progress" spinner or live indicator
- Auto-scroll to latest play
- Button "Next >" to go to result screen (appears when match ends)

**Play styling:**
- `class="lance-gol"` — green
- `class="lance-falta"` — yellow
- `class="lance-escanteio"` — blue
- `class="lance-chute-defendido"` — orange

**Page flow:**
1. On load, fetch `escalacaoAtual` and opponent data
2. Call `simulacao.gerarPartida(escalacao, adversario)`
3. Display 20-28 plays progressively
4. Update score after each gol
5. Show final score when complete
6. Enable "View Result >" button

---

#### 7. `/public/resultado.html`
**Purpose:** Match result — final score, highlights, standings

**Key elements:**
- Header: Final score (large)
- Club stats:
  - Shots on target, shots off target
  - Possession %
  - Fouls committed
- Match highlights:
  - Top scorer (if any goals)
  - Best player (highest avg in lineup)
- Standings (if available from API)
- Button "Next Round >" to go back to escalacao.html with next round loaded

**Page flow:**
1. Load match data from `localStorage` (estado.historico[-1])
2. Display final score and stats
3. Show highlights (scorers, MVP)
4. On "Next Round >", increment `estadoAtual.rodadaAtual`, clear escalacao, go to escalacao.html

---

### JavaScript Modules (in `/public/js/`)

#### 8. `/public/js/api.js`
**Purpose:** Fetch wrapper for Cartola API endpoints

**Functions:**

```javascript
/**
 * Fetch all Serie A clubs
 * @returns {Promise<Array>} Array of { id, nome, abreviacao, escudo_id }
 */
export async function getClubs()

/**
 * Fetch all available players in current market
 * @returns {Promise<Array>} Array of { atleta_id, nome, posicao_id, clube_id, media_num }
 */
export async function getPlayers()

/**
 * Filter players by club
 * @param {Number} clubeId
 * @returns {Promise<Array>} Players filtered
 */
export async function getPlayersByClub(clubeId)

/**
 * Get match schedule for a round
 * @param {Number} rodada
 * @returns {Promise<Array>} Array of { id, clube_casa_id, clube_visitante_id, placar_casa, placar_visitante, data_realizacao }
 */
export async function getPartidas(rodada)

/**
 * Get highlights after a round
 * @returns {Promise<Object>} Highlights data
 */
export async function getDestaques()

/**
 * Internal: fetch wrapper with error handling
 * Falls back to mock data if endpoint fails
 */
async function fetch_safe(endpoint)
```

**Error handling:**
- All functions wrapped with try/catch
- Log errors to console
- Return `mockData.getClubs()` or similar fallback
- Never throw; return empty array or object on failure

---

#### 9. `/public/js/simulacao.js`
**Purpose:** Match simulation engine

**Core function:**

```javascript
/**
 * Generate a complete match simulation
 * @param {Array} escalacao - Array of 11 selected player objects with media_num, posicao_id
 * @param {Object} adversario - Opponent team { nome, escalacao: Array }
 * @returns {Object} { lances: Array, placar: { casa, visitante }, destaques: Object }
 */
export function gerarPartida(escalacao, adversario)

/**
 * Calculate team strength
 * @param {Array} jogadores - Player array
 * @returns { forcaAtaque: Number, forcaDefesa: Number }
 */
function calcularForca(jogadores)

/**
 * Generate a single play event
 * @param {Number} minuto - Current match minute
 * @param {Object} timeCasa, timeVisitante - Team data with strengths
 * @param {Number} jogadorId - Player initiating the play
 * @returns {Object} { tipo, atacante, defensor, minuto, resultado }
 */
function gerarLance(minuto, timeCasa, timeVisitante, timePossui)

/**
 * Determine play type based on probabilities
 * @returns {String} - 'gol' | 'chute_fora' | 'chute_defendido' | 'escanteio' | 'falta'
 */
function sortearTipoLance()

/**
 * Calculate goal probability for a play
 * @param {Number} forcaAtaque, forcaDefesa
 * @returns {Boolean} - true if goal scored
 */
function verificarGol(forcaAtaque, forcaDefesa)
```

**Simulation constants:**
```javascript
const TOTAL_LANCES_MIN = 20;
const TOTAL_LANCES_MAX = 28;
const PERCENTUAL_CASA = 0.60;
const FATOR_ALEATORIO = () => Math.random() * 0.4 + 0.8;

const PROBABILIDADES_LANCE = {
  chute_fora: 0.35,
  chute_defendido: 0.25,
  escanteio: 0.15,
  falta: 0.15,
  gol: 0.10
};
```

**Play structure returned:**
```javascript
{
  tipo: 'gol' | 'chute_fora' | 'chute_defendido' | 'escanteio' | 'falta',
  minuto: 0-90,
  atacante: 'Nome Jogador',
  defensor: null | 'Nome Defensor',
  resultado: 'gol' | null (for gol plays)
}
```

---

#### 10. `/public/js/narracao.js`
**Purpose:** Narrative phrase pool and rendering

**Functions:**

```javascript
/**
 * Get narrative phrase for a play
 * @param {Object} lance - { tipo, atacante, defensor, minuto }
 * @returns {String} - Formatted narrative with replacements
 */
export function narrarLance(lance)

/**
 * Get all phrases for a play type
 * @param {String} tipoLance
 * @returns {Array<String>} - Phrases with placeholders {minuto}, {atacante}, {defensor}
 */
export function getPhrasesForType(tipoLance)
```

**Phrase pool (minimum):**
```javascript
const FRASES = {
  gol: [
    "{minuto}' — {atacante} recebe na área, domina e não perdoa! GOOOOL!",
    "{minuto}' — Que golaço de {atacante}! Chute de fora da área, sem chance pro goleiro!",
    "{minuto}' — {atacante} aproveita o rebote e empurra pra rede. É gol!",
    "{minuto}' — Saída rápida do time! {atacante} fica cara a cara com o goleiro e não hesita!"
  ],
  chute_defendido: [
    "{minuto}' — {atacante} arrisca de longe, mas o goleiro espalma com segurança.",
    "{minuto}' — Boa chegada de {atacante}, mas a defesa corta no último momento.",
    "{minuto}' — {atacante} tira do pé, bola na defesa!"
  ],
  chute_fora: [
    "{minuto}' — {atacante} domina e chuta cruzado, mas a bola passa longe do gol.",
    "{minuto}' — Tentativa de {atacante} pela direita. Mandou pra fora.",
    "{minuto}' — Oportunidade desperdiçada! {atacante} chuta muito aberto."
  ],
  escanteio: [
    "{minuto}' — Pressão do ataque! Bola no escanteio.",
    "{minuto}' — {atacante} cruza na área, defesa afasta. Escanteio!",
    "{minuto}' — Bola na lateral, tiro rápido."
  ],
  falta: [
    "{minuto}' — Falta dura em {atacante}. Jogo parado.",
    "{minuto}' — {defensor} trava {atacante} na entrada da área. Falta perigosa!",
    "{minuto}' — Disputa acirrada! Árbitro marca a falta."
  ]
};
```

**Implementation notes:**
- Use `lance.tipo` to select phrase array
- Pick random phrase with `getPhrasesForType(tipo)[Math.floor(Math.random() * array.length)]`
- Replace `{minuto}`, `{atacante}`, `{defensor}` with `String.replace()`
- Ensure defensor replacement only happens if `lance.defensor` exists

---

#### 11. `/public/js/estado.js`
**Purpose:** Game state management (localStorage wrapper)

**Functions:**

```javascript
/**
 * Initialize state structure
 * @returns {Object} Default initial state
 */
export function estadoInicial()
// Returns:
// {
//   clubeId: null,
//   rodadaAtual: 1,
//   escalacaoAtual: [],
//   esquemaTatico: '4-4-2',
//   tabela: [],
//   historico: []
// }

/**
 * Get current state from localStorage
 * @returns {Object} Current game state
 */
export function getEstado()

/**
 * Update game state
 * @param {Object} updates - Partial updates to merge
 */
export function setEstado(updates)

/**
 * Save a completed match to history
 * @param {Object} resultado - { escalacao, adversario, lances, placar, destaques }
 */
export function salvarResultado(resultado)

/**
 * Clear all state (reset game)
 */
export function resetEstado()

/**
 * Get last match result
 * @returns {Object} Latest match from historico
 */
export function ultimoResultado()
```

**localStorage keys:**
- `cartola_elifoot_estado` — main state object
- All other state reads/writes go through `getEstado()` / `setEstado()`

**Persistence guarantee:**
- All state mutations use `setEstado()` which JSON-serializes to localStorage
- Reading always checks localStorage first, falls back to in-memory copy

---

#### 12. `/public/js/mock_data.js`
**Purpose:** Fallback data for when API is unavailable

**Functions:**

```javascript
/**
 * Get mock club list (20 Serie A clubs)
 * @returns {Array}
 */
export function getClubs()

/**
 * Get mock players (50+ players with media_num, posicao_id)
 * @returns {Array}
 */
export function getPlayers()

/**
 * Get mock match schedule
 * @returns {Array}
 */
export function getPartidas()
```

**Mock data structure:**
- At least 20 clubs with names, IDs, abbreviations
- At least 50 players distributed across positions
- Player fields: `atleta_id`, `nome`, `posicao_id` (1-5), `clube_id`, `media_num` (5-8)
- At least 3 matches with fixture data

---

### CSS File

#### 13. `/public/css/style.css`
**Minimum requirements:**

```css
/* Layout */
* { box-sizing: border-box; }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  text-align: center;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

/* Club selector */
.clubs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.club-card {
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.club-card:hover {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.club-card.selected {
  border-color: #667eea;
  background: #f0f4ff;
}

/* Players */
.player-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.player-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.player-card input[type="checkbox"] {
  cursor: pointer;
}

.player-card.selected {
  background: #f0f4ff;
  border-color: #667eea;
}

/* Narrative */
#naracao {
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
  line-height: 1.6;
}

.lance {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-left: 3px solid #ccc;
}

.lance-gol {
  border-left-color: #22c55e;
  background: #f0fdf4;
  font-weight: bold;
  color: #16a34a;
}

.lance-falta {
  border-left-color: #f59e0b;
  background: #fffbeb;
}

.lance-escanteio {
  border-left-color: #3b82f6;
  background: #eff6ff;
}

.lance-chute-defendido {
  border-left-color: #f59e0b;
}

/* Score display */
.score {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
  color: #333;
}

/* Buttons */
button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

button:hover:not(:disabled) {
  background: #5a67d8;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Loading */
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error message */
.error {
  background: #fee;
  color: #c00;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  display: none;
}

.error.show {
  display: block;
}

/* Mobile-first */
@media (max-width: 640px) {
  .clubs-grid { grid-template-columns: repeat(2, 1fr); }
  .player-list { grid-template-columns: 1fr; }
  .score { font-size: 2rem; }
  #naracao { min-height: 200px; }
}
```

---

## Key Patterns & Interfaces

### Navigation Flow
```
index.html (select club)
  ↓ [state.clubeId = selected]
escalacao.html (select 11 players & formation)
  ↓ [state.escalacaoAtual = [11 players], state.esquemaTatico = '4-4-2' | '4-3-3']
simulacao.html (watch match play out)
  ↓ [lances generated, score updated]
resultado.html (review result)
  ↓ [state.rodadaAtual += 1, state.historico.push(resultado)]
escalacao.html (select for next round)
```

### State Flow
1. **index.html** → `setEstado({ clubeId })`
2. **escalacao.html** → `setEstado({ escalacaoAtual, esquemaTatico })`
3. **simulacao.html** → `salvarResultado(resultado)` after match
4. **resultado.html** → `setEstado({ rodadaAtual: rodadaAtual + 1 })`

### API Error Handling
```javascript
// In api.js, all functions wrapped:
try {
  const data = await fetch('/api/clubes').then(r => r.json());
  return data;
} catch (err) {
  console.error('API error:', err);
  return mockData.getClubs(); // fallback
}
```

### UI State Management
- Use `data-selected` attributes on club/player cards for visual feedback
- Use `disabled` attribute on buttons pending validation
- Use `class="show"` for error messages (default hidden)

---

## Edge Cases & Implementation Notes

### API Failures
- **Cartola API offline**: All `api.js` functions catch errors and return mock data
- **CORS issues**: `server.js` proxy handles this; client never calls Cartola directly
- **Slow network**: Add loading spinners; set 5s timeout on fetches

### State Persistence
- `localStorage` may be disabled (private browsing): Code should not crash; state resets on page refresh
- Multiple tabs: No sync needed for MVP; each tab has independent state

### Simulation Edge Cases
- **No players selected**: validation prevents "Confirm" button; show message "Need X more <position>"
- **Tied teams strength**: Random factor ensures variation (FATOR_ALEATORIO)
- **Formation mismatch**: Validate that selected players match formation needs before allowing simulation

### Formation Validation
```
4-4-2: 1 GK, 2 DEF, 2 MID, 2 FW, 4 flexible
4-3-3: 1 GK, 2 DEF, 3 MID, 3 FW
```
Each formation has fixed counts; flexible slots filled by best available players.

### Narrative Variety
- Each play type has 3-5 phrases minimum
- Random selection ensures variety across 20+ plays per match
- Future expansion: dynamic phrases based on score context (e.g., "desperate goal in injury time")

### Mobile Responsiveness
- Grid layouts use `auto-fill, minmax()`
- Touch targets (buttons) ≥ 44px × 44px
- Font sizes ≥ 16px for readability
- Overflow handling on narrow screens (500px) for narrative feed

---

## Testing Checklist (for CODER)

- [ ] `npm install` succeeds
- [ ] `node server.js` starts on port 3000
- [ ] `GET /api/clubes` returns valid JSON
- [ ] Mock data fallback works when API unavailable
- [ ] All 4 HTML files load without errors
- [ ] State persists across page reloads
- [ ] Formation validation prevents invalid selections
- [ ] Match simulation completes in <5s for 20+ plays
- [ ] Narrative phrases render without placeholder artifacts
- [ ] Mobile layout works on 375px width (iPhone SE)

---

## File Summary Table

| File | Responsibility | Key Output |
|---|---|---|
| `package.json` | Dependencies, scripts | npm start command |
| `server.js` | API proxy, static serving | `/api/*` endpoints |
| `vercel.json` | Deployment config | Vercel routing |
| `index.html` | Club selection UI | `estado.clubeId` |
| `escalacao.html` | Player lineup selection | `estado.escalacaoAtual`, `estado.esquemaTatico` |
| `simulacao.html` | Match narrative display | Live score updates |
| `resultado.html` | Result summary | Saved to `estado.historico` |
| `api.js` | Cartola API wrapper | Cached player/club data |
| `simulacao.js` | Match engine | `{ lances, placar, destaques }` |
| `narracao.js` | Phrase rendering | Narrative strings for UI |
| `estado.js` | State persistence | localStorage sync |
| `mock_data.js` | Fallback data | When API unavailable |
| `style.css` | Visual styling | Mobile-first responsive |

---

## Notes for CODER

1. **All functions should be ES6 modules** (`export` / `import`) even in vanilla JS
2. **Error logging**: Use `console.error()` with context (endpoint, status) for debugging
3. **No external JS libraries** except Express/Node packages on backend
4. **localStorage key namespace**: Always use `cartola_elifoot_*` prefix
5. **Timing in simulacao.js**: Display plays ~2-3 seconds apart for readability
6. **Test with mock data first** before connecting to live API
7. **Formation slots**: Build validator function before implementation touches HTML
8. **Accessibility**: Use semantic HTML (`<button>`, `<form>`, labels) for screen readers


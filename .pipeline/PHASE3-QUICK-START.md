# Phase 3 Implementation - Quick Start Guide

## Files Created: 25 Total

### Shared Infrastructure (9 files)
```
src/shared/
├── state/
│   ├── app-state.js (120 lines)           # Global app state
│   ├── match-state.js (129 lines)         # Live match state
│   └── lineup-state.js (154 lines)        # Lineup selection state
├── api/
│   ├── data-service.js (97 lines)         # API fetching with cache
│   └── websocket-service.js (133 lines)   # Real-time updates
├── utils/
│   ├── responsive.js (111 lines)          # Breakpoint detection
│   └── animations.js (125 lines)          # Animation utilities
├── constants/
│   └── formations.js (154 lines)          # 5 formation definitions
└── styles/
    └── responsive.css                     # Global responsive grid
```

### Pages (15 files × 3 per page = 5 pages)

**Dashboard (index.html)**
- 146 lines HTML + 410 lines JS + CSS module

**Escalacao (escalacao.html)**
- 133 lines HTML + 390 lines JS + CSS module

**Simulacao (simulacao.html)**
- 86 lines HTML + 383 lines JS + CSS module

**Resultado (resultado.html)**
- 87 lines HTML + 352 lines JS + CSS module

**Rodada (rodada.html)**
- 117 lines HTML + 400 lines JS + CSS module

---

## Quick Access Guide

### Access Pages
- Dashboard: `/src/pages/dashboard/index.html`
- Lineup: `/src/pages/escalacao/index.html`
- Live Match: `/src/pages/simulacao/index.html`
- Results: `/src/pages/resultado/index.html`
- Season: `/src/pages/rodada/index.html`

### Import Modules
```javascript
// State management
import { appState } from '/src/shared/state/app-state.js';
import { MatchState } from '/src/shared/state/match-state.js';
import { LineupState } from '/src/shared/state/lineup-state.js';

// API
import { dataService } from '/src/shared/api/data-service.js';
import { wsService } from '/src/shared/api/websocket-service.js';

// Utils
import { getCurrentBreakpoint } from '/src/shared/utils/responsive.js';
import { ANIMATION_DURATIONS } from '/src/shared/utils/animations.js';

// Constants
import { FORMATIONS } from '/src/shared/constants/formations.js';
```

---

## State Management Pattern

```javascript
// Subscribe to state changes
const unsubscribe = appState.subscribe((newState) => {
  console.log('State updated', newState);
});

// Update state
appState.setUser({ id: '1', email: 'user@example.com' });
appState.setTeam({ formation: '4-3-3', selectedPlayers: [] });

// Clean up
unsubscribe();
```

---

## API Usage Pattern

```javascript
// Fetch with automatic caching
const players = await dataService.getPlayers();
const standings = await dataService.getStandings();
const matches = await dataService.getMatches('all');

// Clear cache
dataService.clearCache('/players');  // Clear specific
dataService.clearCache();             // Clear all
```

---

## Responsive Breakpoints

```javascript
import { getCurrentBreakpoint } from '/src/shared/utils/responsive.js';

const breakpoint = getCurrentBreakpoint(); // 'mobile' | 'tablet' | 'desktop'

// Mobile: < 768px
// Tablet: 768px - 1440px
// Desktop: >= 1440px
```

---

## Design Tokens Used

### Colors
```css
--dark-bg-primary:     #0f1419
--dark-bg-secondary:   #1a2332
--dark-bg-tertiary:    #252d3d
--dark-bg-elevated:    #2a3545

--primary-accent:      #4a9eff   (blue)
--secondary-accent:    #6bbf59   (green - success)
--warning-accent:      #ffb84d   (amber)
--danger-accent:       #ff5c5c   (red)

--text-primary:        #f0f2f5   (70%)
--text-secondary:      #a8adb8   (60%)
--text-tertiary:       #7a8190   (50%)
--text-highlight:      #ffffff   (100%)
```

### Spacing (8px grid)
```
--space-xs:    4px
--space-sm:    8px
--space-md:    16px
--space-lg:    24px
--space-xl:    32px
--space-2xl:   48px
--space-3xl:   64px
```

### Typography
```
--h1-size:     32px / 700 weight
--h2-size:     24px / 600 weight
--h3-size:     18px / 600 weight
--body:        14px regular
--mono:        IBM Plex Mono / Courier New
```

---

## Navigation Map

```
Dashboard (Home)
├─ [EDIT LINEUP] → Escalacao
├─ [VIEW FULL TABLE] → Rodada
├─ Match Cards → Simulacao (live) or Resultado (past)
└─ Formation Click → Escalacao

Escalacao
├─ [CONFIRM] → Dashboard
└─ Back → Dashboard

Simulacao
├─ Match Ends → Resultado (auto)
└─ [BACK] → Dashboard

Resultado
├─ [GO TO LEAGUE] → Rodada
├─ [NEXT MATCH] → Simulacao
└─ Back → Dashboard

Rodada
├─ Match Cards → Resultado or Simulacao
└─ Back → Dashboard
```

---

## Component Integration

### FormationBoard Usage
```javascript
import { FormationBoard } from '/public/components/FormationBoard/FormationBoard.js';

const board = new FormationBoard({
  container: document.getElementById('formation-board'),
  formation: '4-3-3',
  players: selectedPlayers,
  compactMode: true,
  readOnly: true,
  showStats: false
});

board.render();
```

### MatchCard Usage
```javascript
import { MatchCard } from '/public/components/MatchCard/MatchCard.js';

const card = new MatchCard({
  match: matchData,
  variant: 'standard',  // or 'compact', 'expanded'
  onClick: () => navigate(`/resultado?matchId=${match.id}`)
});

container.appendChild(card.render());
```

### Button Component
```javascript
import Button from '/public/components/Button/Button.js';

const btn = new Button({
  text: 'Click Me',
  variant: 'primary',    // primary, secondary, danger, success, outline
  size: 'md',           // sm, md, lg
  onClick: () => alert('Clicked'),
  disabled: false,
  loading: false,
  block: false
});

container.appendChild(btn.render());
```

---

## Development Notes

### Local Testing
```bash
# Files are ES6 modules, must be served over HTTP
# Use a local server:
python3 -m http.server 8000

# Visit: http://localhost:8000/src/pages/dashboard/index.html
```

### Adding New Features
1. Create component or utility in shared/
2. Import in page that needs it
3. Update state if needed
4. Add styling with design tokens
5. Test at all breakpoints

### CSS Organization
- Design tokens in `/public/css/_variables.css`
- Responsive system in `/src/shared/styles/responsive.css`
- Page-specific in `/src/pages/{page}/{page}.module.css`
- No hardcoded colors anywhere

---

## Testing Checklist

### Each Page Should:
- [ ] Load in <2 seconds
- [ ] Display correctly at 375px, 768px, 1440px
- [ ] Show no console errors
- [ ] Navigation works (click all buttons)
- [ ] Responsive images work
- [ ] Buttons are keyboard accessible
- [ ] Focus outlines visible
- [ ] Dark theme applied
- [ ] Animations smooth (60fps)
- [ ] Touch targets min 44px

### Data Loading Should:
- [ ] Fallback gracefully if API fails
- [ ] Show loading states
- [ ] Display error messages
- [ ] Cache responses appropriately
- [ ] Update UI when state changes

---

## Performance Tips

### Optimize
- Use CSS Grid instead of nested flexbox
- GPU-accelerate animations with `will-change`
- Lazy-load images
- Cache API responses (5min default)
- Minimize repaints/reflows

### Monitor
- Check DevTools Performance tab
- Verify <2s load time on all pages
- Check for memory leaks (Chrome DevTools)
- Verify 60fps animations (Chrome DevTools)

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Modern features used:
- ES6 modules
- CSS Grid
- CSS Custom Properties
- Fetch API
- WebSocket API
- Map/Set data structures

---

## Next Steps (Phase 4)

1. Connect DataService to actual backend
2. Implement WebSocket real-time updates
3. Add drag-drop formation customization
4. Create player detail modals
5. Add advanced filtering/sorting
6. Implement team comparison
7. Add notification system
8. Performance optimization

---

Generated: June 1, 2026
Last Updated: Phase 3 Complete

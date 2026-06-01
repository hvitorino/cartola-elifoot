# CartolA Elifoot — Phase 2 Components Library

A comprehensive vanilla JavaScript component library for the CartolA Elifoot football manager game. Built with HTML, CSS, and JavaScript — no framework dependencies.

## Quick Start

### 1. Load Components

Add to your HTML `<head>`:

```html
<!-- Design tokens -->
<link rel="stylesheet" href="/css/_variables.css">

<!-- Component CSS -->
<link rel="stylesheet" href="/components/Button/Button.css">
<link rel="stylesheet" href="/components/FormIndicator/FormIndicator.css">
<link rel="stylesheet" href="/components/StatusBadge/StatusBadge.css">
<link rel="stylesheet" href="/components/PlayerCard/PlayerCard.css">
<link rel="stylesheet" href="/components/MatchCard/MatchCard.css">
<link rel="stylesheet" href="/components/FormationBoard/FormationBoard.css">
<link rel="stylesheet" href="/components/StatPanel/StatPanel.css">
<link rel="stylesheet" href="/components/MatchTimeline/MatchTimeline.css">
<link rel="stylesheet" href="/components/StandingsTable/StandingsTable.css">
<link rel="stylesheet" href="/components/Layout/Layout.css">
```

Before closing `</body>`:

```html
<!-- Component JS -->
<script src="/components/Button/Button.js"></script>
<script src="/components/FormIndicator/FormIndicator.js"></script>
<script src="/components/StatusBadge/StatusBadge.js"></script>
<script src="/components/PlayerCard/PlayerCard.js"></script>
<script src="/components/MatchCard/MatchCard.js"></script>
<script src="/components/FormationBoard/FormationBoard.js"></script>
<script src="/components/StatPanel/StatPanel.js"></script>
<script src="/components/MatchTimeline/MatchTimeline.js"></script>
<script src="/components/StandingsTable/StandingsTable.js"></script>
<script src="/components/Layout/Layout.js"></script>
```

### 2. Create Components

All components follow the same pattern:

```javascript
// Create instance with options
const component = new ComponentName({
  /* options */
});

// Render to DOM
const element = component.render();
document.body.appendChild(element);

// Or use the static helper
ComponentName.create(options, container);
```

---

## Components Reference

### Button
Primary action component with multiple variants and sizes.

```javascript
const button = new Button({
  variant: 'primary',    // primary | secondary | danger | success | outline
  size: 'md',           // sm | md | lg
  text: 'Click me',
  loading: false,
  disabled: false,
  block: false,
  icon: '✓',
  onClick: (e) => console.log('clicked'),
  ariaLabel: 'Submit button'
});
```

### FormIndicator
Visual form display with 5-dot rating and optional tooltip.

```javascript
const form = new FormIndicator({
  rating: 4,            // 1-5
  size: 'md',          // sm | md | lg
  showLabel: true,
  showTooltip: true,
  matchHistory: [
    {
      date: '2024-10-28',
      opponent: 'Chelsea',
      rating: 8.2,
      result: 'W'       // W | D | L
    }
  ]
});
```

### StatusBadge
Status indicator with icon and label.

```javascript
const badge = new StatusBadge({
  status: 'fit',        // fit | injured | doubtful | returning | suspended
  size: 'md',          // sm | md | lg
  showIcon: true,
  showLabel: true,
  pulsing: false,
  tooltip: 'Hamstring injury'
});
```

### PlayerCard
Three-variant player display component.

```javascript
// Compact (56×56px circle for formation board)
const compact = new PlayerCard({
  variant: 'compact',
  player: {
    id: '1',
    jerseyNumber: 7,
    name: 'Cristiano Ronaldo',
    team: 'Manchester United',
    position: 'FW',       // GK | DF | MF | FW
    rating: 8.7,
    price: 12.5,
    fitness: 95,
    form: 4,              // 1-5
    status: 'fit'
  },
  selected: false,
  onDragStart: (e) => {}
});

// Standard (280×320px lineup card)
const standard = new PlayerCard({
  variant: 'standard',
  player: {...},
  selected: false,
  onSwap: () => {},
  onInfo: () => {},
  onClick: () => {}
});

// Detailed (600px modal)
const detailed = new PlayerCard({
  variant: 'detailed',
  player: {
    ...basePlayer,
    stats: {
      goals: 15,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      cleanSheets: 8,
      appearances: 20,
      minutesPlayed: 1800
    },
    formHistory: [...],
    injuryRisk: 'low'     // low | medium | high
  },
  onClose: () => {},
  onSwap: () => {},
  onRemove: () => {},
  onViewStats: () => {}
});
```

### MatchCard
Match result card with score and statistics.

```javascript
const match = new MatchCard({
  variant: 'standard',   // compact | standard | expanded
  match: {
    homeTeam: 'Manchester United',
    awayTeam: 'Chelsea',
    homeScore: 2,
    awayScore: 1,
    homeShots: 12,
    awayShots: 8,
    homePossession: 55,
    awayPossession: 45
  },
  userScore: 42,
  status: 'final',       // upcoming | live | final | postponed
  onClose: () => {}
});
```

### FormationBoard
SVG-based tactical board with 5 formation presets.

```javascript
const board = new FormationBoard({
  players: [
    {
      id: '1',
      jerseyNumber: 1,
      name: 'De Gea',
      position: 'GK',
      rating: 7.5,
      price: 8.0,
      fitness: 90
    },
    // ... 10 more players
  ],
  selectedFormation: '4-3-3',  // or 4-4-2 | 4-2-3-1 | 3-5-2 | 5-3-2
  tactics: 'balanced',         // balanced | defensive | attacking | counter
  defensiveLevel: 50,          // 0-100
  readOnly: false,
  showStats: true,
  onFormationChange: (id) => {},
  onTacticsChange: (tactic) => {},
  onDefensiveLevel: (level) => {},
  onPlayerDrop: (playerId, position) => {}
});
```

### StatPanel
Statistics display with progress bars.

```javascript
const stats = new StatPanel({
  title: 'Player Stats',
  columns: 1,            // 1 | 2
  stats: [
    {
      name: 'Shots',
      value: 5,
      max: 10,
      unit: '',
      type: 'info',      // info | success | warning | danger | neutral
      color: '#4a9eff'
    },
    {
      name: 'Accuracy',
      value: 65,
      max: 100,
      unit: '%',
      type: 'success'
    }
  ],
  comparison: {
    team1: 'Man United',
    team2: 'Chelsea',
    stats: [
      { name: 'Shots', value1: 12, value2: 8, unit: '' },
      { name: 'Possession', value1: 55, value2: 45, unit: '%' }
    ]
  }
});
```

### MatchTimeline
Match event timeline.

```javascript
const timeline = new MatchTimeline({
  events: [
    {
      id: '1',
      minute: 45,
      type: 'goal',           // goal | yellow_card | red_card | substitution | injury | kickoff | half_time | full_time
      team: 'Manchester United',
      player: 'Cristiano Ronaldo',
      description: 'Header from close range',
      impact: { pointsAwarded: 5, ratingChange: 0.5 }
    }
  ],
  matchId: 'match-123',
  autoScroll: true,
  maxHeight: 500,
  showDetails: true,
  compact: false,
  onEventClick: (event) => {}
});
```

### StandingsTable
League standings table with sticky positioning.

```javascript
const table = new StandingsTable({
  rows: [
    {
      id: 'mnu',
      name: 'Manchester United',
      gamesPlayed: 10,
      wins: 7,
      draws: 2,
      losses: 1,
      points: 23,
      trend: 1                // -2 to +2
    },
    // ... more rows
  ],
  highlightTeam: 'mnu'       // highlight user's team
});
```

### Layout Components

#### Header
```javascript
const header = new Header({
  logo: 'CartolA',
  title: 'Football Manager',
  navItems: [
    { label: 'Home', href: '/', active: true },
    { label: 'Lineups', href: '/lineups' },
    { label: 'Standings', href: '/standings' }
  ]
});
```

#### Sidebar
```javascript
const sidebar = new Sidebar({
  items: [
    { label: 'Dashboard', href: '/', icon: '📊', active: true },
    { label: 'Teams', href: '/teams', icon: '👥' },
    { label: 'Matches', href: '/matches', icon: '⚽' }
  ]
});
```

#### Card
```javascript
const card = new Card({
  variant: 'standard',   // standard | elevated | compact
  title: 'Card Title',
  content: 'Card content here'
});
```

#### ContentArea
```javascript
const content = new ContentArea({
  columns: 2,
  gap: 'md',            // sm | md | lg
  children: [element1, element2]
});
```

#### Grid
```javascript
const grid = new Grid({
  columns: 'auto',      // auto | number (1-12)
  gap: 'md',
  children: [item1, item2, item3]
});
```

---

## Design System

All components use CSS variables from Phase 1:

### Colors
- Primary: `#4a9eff` (cyan)
- Success: `#6bbf59` (green)
- Warning: `#ffb84d` (amber)
- Danger: `#ff5c5c` (red)
- Dark BG: `#0f1419`

### Typography
- Heading: 18-32px, weight 600-700
- Body: 14px, weight 400-500
- Mono: IBM Plex Mono (stats, numbers)

### Spacing
Base unit: 8px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Responsive Breakpoints
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

---

## Accessibility

All components include:
- ARIA labels on icons
- Keyboard navigation support
- Focus states visible
- Color contrast ≥ 4.5:1 (WCAG AA)
- Touch targets ≥ 44×44px on mobile
- Screen reader compatible

---

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Android

---

## Performance

- Minimal bundle size (~17KB JS + CSS gzipped)
- No runtime dependencies
- CSS modules scoped (no global leaking)
- Efficient DOM manipulation
- Smooth 60fps animations

---

## Contributing

When modifying components:
1. Keep vanilla JavaScript (no frameworks)
2. Use CSS variables (no hardcoded colors)
3. Maintain responsive design
4. Update this README with examples
5. Test at all breakpoints (375px, 768px, 1440px)
6. Check accessibility (keyboard nav, ARIA labels)

---

## File Structure

```
components/
├── Button/
│   ├── Button.js
│   └── Button.css
├── FormIndicator/
│   ├── FormIndicator.js
│   └── FormIndicator.css
├── StatusBadge/
│   ├── StatusBadge.js
│   └── StatusBadge.css
├── PlayerCard/
│   ├── PlayerCard.js
│   └── PlayerCard.css
├── MatchCard/
│   ├── MatchCard.js
│   └── MatchCard.css
├── FormationBoard/
│   ├── FormationBoard.js
│   └── FormationBoard.css
├── StatPanel/
│   ├── StatPanel.js
│   └── StatPanel.css
├── MatchTimeline/
│   ├── MatchTimeline.js
│   └── MatchTimeline.css
├── StandingsTable/
│   ├── StandingsTable.js
│   └── StandingsTable.css
├── Layout/
│   ├── Layout.js
│   └── Layout.css
├── index.js
└── README.md (this file)
```

---

## License

CartolA Elifoot — Phase 2 Components  
© 2026 All rights reserved

---

For detailed implementation information, see [fm-phase2-changes.md](../.pipeline/fm-phase2-changes.md)

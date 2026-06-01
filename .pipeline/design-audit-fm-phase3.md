# Cartola Elifoot - Design Audit: Phase 3 - Page Redesigns
## Integration of Components into 5 Core Pages

**Audit Status**: Complete & Ready for DESIGNER/CODER  
**Phase**: 3 (Page Redesigns - Weeks 5-6)  
**Last Updated**: 2026-06-01  
**Scope**: Detailed specifications for integrating Phase 2 components into 5 pages with exact layouts, component placement, data flows, and interaction patterns

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Phase 3 Overview & Strategy](#phase-3-overview--strategy)
3. [Page 1: Dashboard (index.html)](#page-1-dashboard-indexhtml)
4. [Page 2: Lineup Selection (escalacao.html)](#page-2-lineup-selection-escalacaohtml)
5. [Page 3: Live Match (simulacao.html)](#page-3-live-match-simulacaohtml)
6. [Page 4: Results (resultado.html)](#page-4-results-resultadohtml)
7. [Page 5: Season Dashboard (rodada.html)](#page-5-season-dashboard-rodadahtml)
8. [Responsive Design Strategy](#responsive-design-strategy)
9. [Navigation & State Management](#navigation--state-management)
10. [Animations & Transitions](#animations--transitions)
11. [Implementation Checklist](#implementation-checklist)

---

## EXECUTIVE SUMMARY

Phase 3 integrates the 10 core components from Phase 2 into **5 main pages** that form the complete Cartola Elifoot application:

### Pages to Build:
1. **Dashboard** (index.html) - Home/matchday overview
2. **Lineup Selection** (escalacao.html) - Team selection with formation
3. **Live Match** (simulacao.html) - Match simulation/narrative
4. **Results** (resultado.html) - Post-match details & statistics
5. **Season Dashboard** (rodada.html) - League standings & history

### Key Success Criteria:
- **Component Reuse**: All Phase 2 components used effectively
- **Responsive Design**: Perfect layout at 375px, 768px, 1440px
- **Data Consistency**: Unified state management across pages
- **Professional Appearance**: Football Manager-inspired design throughout
- **Fast Navigation**: Any page reachable within 2-3 clicks
- **Accessibility**: WCAG AA compliance on all pages
- **Performance**: Page loads <2 seconds, smooth animations

### Estimated Timeline:
- **Week 5**: Dashboard + Lineup Selection (Days 1-5)
- **Week 6**: Live Match + Results + Season Dashboard (Days 1-5)

---

## PHASE 3 OVERVIEW & STRATEGY

### Component Usage Matrix

| Component | Dashboard | Lineup | Live Match | Results | Season |
|-----------|-----------|--------|-----------|---------|--------|
| **Button** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **PlayerCard** | - | ✓ (Standard) | - | ✓ (Detailed) | - |
| **FormationBoard** | ✓ (Compact) | ✓ (Main) | ✓ (Compact) | - | - |
| **MatchCard** | ✓ (Standard) | - | - | ✓ (Expanded) | ✓ (Compact) |
| **MatchTimeline** | - | - | ✓ | ✓ | - |
| **StatPanel** | - | - | ✓ | ✓ | - |
| **StandingsTable** | ✓ | - | - | - | ✓ |
| **StatusBadge** | - | ✓ | - | ✓ | - |
| **FormIndicator** | - | - | - | ✓ | - |
| **Layout** | ✓ | ✓ | ✓ | ✓ | ✓ |

### Design Token Compliance
All pages must:
- Use design tokens from Phase 1 (no hardcoded colors)
- Follow 8px baseline grid spacing
- Maintain typographic hierarchy
- Support dark mode exclusively
- Use CSS Grid for layout (no nested flexbox)

---

# PAGE 1: DASHBOARD (index.html)

## Purpose
Home/matchday overview showing today's match, current lineup status, league standings, and recent results. Entry point for all features.

## Visual Layout

### Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ◀ CARTOLA ELIFOOT                                                  ⚙ SETTINGS     │
├──────────────────────────────────────────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ LIVE MATCH │ RESULTS │ SEASON │ INFO                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  MATCHDAY 15 - SEASON 2024/25              Thursday, November 15, 2024           │
│  ═══════════════════════════════════════════════════════════════════════════════ │
│                                                                                   │
│  YOUR SCORE: 87.3 PTS  │  TEAM RANK: 4,234  │  CHANGE: +5 PTS  │  TEAM AVG: 7.8 │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  LINEUP OVERVIEW             FORMATION              TODAY'S MATCHES              │
│  ─────────────────────       ───────────            ─────────────────            │
│  11 Selected                 4-3-3                  Man Utd  vs  Arsenal         │
│  Fitness: 94% avg            Balanced               Kick-off: 20:00              │
│                                                     Status: Starting              │
│  Formation: 4-3-3            ┌──────────┐                                        │
│  Status: CONFIRMED ✓         │    GK    │           Liverpool vs Chelsea        │
│                              │   ◉      │           Kick-off: 17:30              │
│  Players Rating              │  / | \   │           Status: In Progress         │
│  Avg: 7.8                    │ ◉  ◉  ◉  │                                        │
│  Highest: 8.7                │  \ | /  │           City vs Newcastle           │
│  Lowest: 6.5                 │  ◉ ◉ ◉   │           Kick-off: 16:00              │
│  Injuries: 0                 │    ST    │           Status: Upcoming            │
│  Suspensions: 1              └──────────┘                                        │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  RECENT MATCHES (Last 5 Gameweeks)                                               │
│  ┌──────────────────────┬──────────────────────┬──────────────────────┐          │
│  │ Man Utd  2 - 1       │ Arsenal  1 - 1       │ Chelsea  3 - 0       │          │
│  │ Liverpool            │ Man City             │ Brighton             │          │
│  │                      │                      │                      │          │
│  │ Your Score: 51       │ Your Score: 38       │ Your Score: 62       │          │
│  │ ⚽⚽ Haaland (Pen)    │ ⚽ Saka, Tomiyasu     │ ⚽⚽⚽ Havertz         │          │
│  │    Bruno Fernandes   │                      │                      │          │
│  └──────────────────────┴──────────────────────┴──────────────────────┘          │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  LEAGUE STANDINGS - TOP 10                                                       │
│  ┌────┬───────────────────┬────┬────┬────┬────┬─────────┐                       │
│  │POS │ TEAM              │ GP │ W  │ D  │ L  │ POINTS  │                       │
│  ├────┼───────────────────┼────┼────┼────┼────┼─────────┤                       │
│  │ 1  │ Manchester City   │ 15 │ 13 │ 2  │ 0  │ 41   ↑  │                       │
│  │ 2  │ Arsenal           │ 15 │ 12 │ 2  │ 1  │ 38   ↓  │                       │
│  │ 3  │ Newcastle United  │ 15 │ 11 │ 3  │ 1  │ 36   →  │                       │
│  │ 4  │ Manchester United │ 15 │ 10 │ 2  │ 3  │ 32   ↑  │                       │
│  │ 5  │ Liverpool         │ 15 │ 10 │ 2  │ 3  │ 32   ↓  │                       │
│  │ ... │ ...               │... │ ...│ ...│ ...│ ...     │                       │
│  │ 10 │ Brighton          │ 15 │ 6  │ 4  │ 5  │ 22   →  │                       │
│  └────┴───────────────────┴────┴────┴────┴────┴─────────┘                       │
│                                                                                   │
│                          [VIEW FULL TABLE]  [NEXT OPPONENT]                      │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px)

```
┌──────────────────────────────────────────────┐
│ ☰ CARTOLA ELIFOOT              ⚙ SETTINGS   │
├──────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ MATCHES │ SEASON │ INFO │
├──────────────────────────────────────────────┤
│                                              │
│ MATCHDAY 15          Thursday, November 15   │
│ YOUR SCORE: 87.3 PTS │ RANK: 4,234          │
│                                              │
├──────────────────────────────────────────────┤
│ LINEUP OVERVIEW                              │
│ 11 Selected, Fitness: 94%                    │
│ Status: CONFIRMED ✓                          │
│ Rating: 7.8 avg                              │
├──────────────────────────────────────────────┤
│ FORMATION (4-3-3)                            │
│ ┌────────────────────────────┐              │
│ │      GK                    │              │
│ │     ◉                      │              │
│ │    / | \                   │              │
│ │   ◉  ◉  ◉                  │              │
│ │    \ | /                   │              │
│ │    ◉ ◉ ◉                   │              │
│ │      ST                    │              │
│ └────────────────────────────┘              │
├──────────────────────────────────────────────┤
│ TODAY'S MATCHES                              │
│ ┌──────────────────────────┐                │
│ │ Man Utd vs Arsenal       │                │
│ │ Kick-off: 20:00          │                │
│ └──────────────────────────┘                │
│ ┌──────────────────────────┐                │
│ │ Liverpool vs Chelsea     │                │
│ │ Kick-off: 17:30          │                │
│ └──────────────────────────┘                │
├──────────────────────────────────────────────┤
│ RECENT MATCHES                               │
│ ┌──────────────────────────┐                │
│ │ Man Utd 2 - 1 Liverpool  │                │
│ │ Your Score: 51           │                │
│ └──────────────────────────┘                │
│ ┌──────────────────────────┐                │
│ │ Arsenal 1 - 1 Man City   │                │
│ │ Your Score: 38           │                │
│ └──────────────────────────┘                │
├──────────────────────────────────────────────┤
│ LEAGUE STANDINGS                             │
│ Scroll table horizontally...                 │
│ [Full table with 20 rows]                    │
└──────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌──────────────────────────┐
│ ☰ CARTOLA  ELIFOOT   ⚙   │
├──────────────────────────┤
│ MATCHDAY 15              │
│ YOUR SCORE: 87.3 PTS     │
│ RANK: 4,234 | +5 PTS     │
├──────────────────────────┤
│ LINEUP OVERVIEW          │
│ 11 Selected              │
│ Fitness: 94% | FIT ✓     │
│ Rating: 7.8              │
├──────────────────────────┤
│ FORMATION 4-3-3          │
│     ◉ GK                 │
│    ◉ ◉ ◉ DF             │
│   ◉ ◉ ◉ MF              │
│      ◉ ◉ FW             │
├──────────────────────────┤
│ TODAY'S MATCHES          │
│                          │
│ Man Utd vs Arsenal       │
│ 20:00 | Starting         │
│                          │
│ Liverpool vs Chelsea     │
│ 17:30 | In Progress      │
│                          │
│ City vs Newcastle        │
│ 16:00 | Upcoming         │
├──────────────────────────┤
│ RECENT MATCHES           │
│                          │
│ Man Utd 2-1 Liverpool    │
│ ⚽⚽ Haaland              │
│ Score: 51 pts            │
│                          │
│ Arsenal 1-1 Man City     │
│ ⚽ Saka                  │
│ Score: 38 pts            │
├──────────────────────────┤
│ TOP STANDINGS            │
│ Swipe left to scroll     │
│ 1. Man City      41 pts  │
│ 2. Arsenal       38 pts  │
│ 3. Newcastle     36 pts  │
│ ... [scroll]             │
└──────────────────────────┘
```

## Component Breakdown

### Hero Section (32px height)
```
Component: Header (from Layout)
- Title: "CARTOLA ELIFOOT" (24px bold)
- Navigation: 5 main items (Dashboard, Lineup, Live Match, Results, Season)
- Right actions: Settings icon button

Layout: Sticky top, flex row, space-between
Background: dark-bg-secondary
Border-bottom: 2px primary-accent
```

### Matchday Info Section (80px)
```
Row 1: "MATCHDAY 15 - SEASON 2024/25"
  - Matchday number: 24px bold
  - Season: 14px secondary
  - Date: Right-aligned, 14px secondary
  
Content Grid:
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ YOUR SCORE   │ TEAM RANK    │ CHANGE       │ TEAM AVG     │
│ 87.3 PTS     │ 4,234        │ +5 PTS       │ 7.8          │
│ 32px mono    │ 32px mono    │ 24px mono    │ 24px mono    │
└──────────────┴──────────────┴──────────────┴──────────────┘

Spacing: 24px gaps
Values: Highlight white color (#f0f2f5)
Labels: Secondary text (14px)
```

### Main Content Area (3-column grid on desktop)

**Column 1: Lineup Overview (6 col)**
```
Component: Card (variant: standard)
Title: "LINEUP OVERVIEW" (18px bold)

Content:
├─ 11 Selected (14px)
├─ Fitness: 94% avg (14px)
├─ Formation: 4-3-3 (14px)
├─ Status: CONFIRMED ✓ (14px, success badge)
├─ ───────────────── (divider)
├─ Players Rating (12px secondary)
├─ Avg: 7.8 (18px mono)
├─ Highest: 8.7 (14px)
├─ Lowest: 6.5 (14px)
├─ Injuries: 0 (14px)
└─ Suspensions: 1 (14px)

Actions:
[EDIT LINEUP]  [CONFIRM]
```

**Column 2: Formation (3 col)**
```
Component: FormationBoard (variant: compact)
Type: Compact view-only, 300px width
Formation: 4-3-3 Balanced
Players: Circular indicators with jersey numbers
Size: 40px circles
No controls (read-only)
Drag: Disabled

Styling:
Background: dark-bg-primary
Border: 1px dark-bg-tertiary
Padding: 16px
Border-radius: 8px
```

**Column 3: Today's Matches (3 col)**
```
Component: Card (variant: standard)
Title: "TODAY'S MATCHES" (18px bold)

Content: 3 MatchCard (compact variant)
Each card shows:
├─ Teams: "Man Utd vs Arsenal"
├─ Time: "Kick-off: 20:00"
├─ Status: "Starting" | "In Progress" | "Upcoming"
├─ Result (if finished): "Man Utd 2 - 1 Liverpool"

Height: 80px per card
Spacing: 12px gap

Interactivity:
- Hover: Elevation + shadow increase
- Click: Navigate to Match Details
```

### Recent Matches Section (Full-width, 120px height)
```
Component: Card (variant: standard)
Title: "RECENT MATCHES (Last 5 Gameweeks)" (18px bold)

Layout: Horizontal scroll container
├─ MatchCard (standard) × 5
├─ Each: 320px width
├─ Gap: 16px
└─ Scrollbar: Custom styled

Responsive:
Desktop: 3 cards visible + scroll
Tablet: 2 cards visible + scroll
Mobile: 1 card visible + scroll

MatchCard shows:
├─ Date: "Matchday 15 | Oct 28"
├─ Score: "Man Utd 2 - 1 Liverpool"
├─ Scorers: "Haaland ⚽⚽, Fernandes ⚽"
├─ Your Score: "+51 pts"
└─ [View Details] button
```

### League Standings Section (Full-width, 600px height)
```
Component: StandingsTable
Type: Sticky header + sticky first column
Visible: Top 10 teams
Columns: POS, TEAM, GP, W, D, L, PTS, TREND

Actions:
├─ [VIEW FULL TABLE] → Navigate to Season page
└─ [NEXT OPPONENT] → Show opponent info modal

Responsive:
Desktop: 8 columns, 600px height
Tablet: 6 columns (hide GP), 500px height
Mobile: 4 columns (POS, TEAM, PTS, TREND), 400px height
```

## Data Flow

### Component Data Requirements

**Header Navigation**
- Current page: "dashboard"
- Navigation items: Array of {label, href, active}

**Matchday Info**
- matchday: number (15)
- season: string ("2024/25")
- userScore: number (87.3)
- userRank: number (4234)
- scoreChange: number (+5)
- teamAvgRating: number (7.8)

**Lineup Overview**
- selected: number (11)
- avgFitness: number (94)
- formation: string ("4-3-3")
- confirmed: boolean (true)
- players: Array of {rating, fitness}
- injuries: number (0)
- suspensions: number (1)

**Formation Board**
- selectedFormation: "4-3-3"
- players: Array of 11 PlayerData
- readOnly: true
- showStats: false
- compactMode: true

**Today's Matches**
- upcomingMatches: Array of 3 MatchData
  - Each: {teams, kickoff, status, result?}

**Recent Matches**
- recentMatches: Array of 5 MatchData
  - Each: {date, teams, score, scorers, userScore}

**League Standings**
- standings: Array of 10 TeamStanding
  - Each: {position, team, played, won, drawn, lost, points, trend}

---

# PAGE 2: LINEUP SELECTION (escalacao.html)

## Purpose
Team selection with formation visualization. Main interaction point for customizing team. Split layout: Formation board (left) + Player selection panel (right).

## Visual Layout

### Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ◀ LINEUP SELECTION                                                    SAVE      │
├──────────────────────────────────────────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ LIVE MATCH │ RESULTS │ SEASON │ INFO                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  FORMATION: 4-3-3 BALANCED                                                       │
│  Status: EDITABLE - Click players to change                                      │
│                                                                                   │
├───────────────────────────────────────────────────────────────────────────────┬──┤
│                                                                               │ST│
│  TACTICAL BOARD                        PLAYER SELECTION                       │A│
│  ┌──────────────────────────────────┐  ┌──────────────────────────────────┐ │T│
│  │       Henderson (GK)             │  │ GK SELECTED                      │ │U│
│  │            ◉                     │  │ David Henderson                  │ │S│
│  │            |                     │  │ Rating: 7.2                      │ │
│  │  Reece ◉        ◉ Stones        │  │ Price: 3.5M                      │ │
│  │      /   \  /      \             │  │ Team: Manchester United          │ │
│  │     /     \/        \            │  │ Fitness: 98%  ▓▓▓▓░             │ │
│  │    ◉      ◉          ◉ Walker   │  │ Status: FIT ✓                    │ │
│  │                                  │  │                                  │ │
│  │  Mount ◉ ◉ Rice ◉  Hojbjerg   │  │ [SWAP OUT]                       │ │
│  │       CM      CM                │  │                                  │ │
│  │                                  │  │ ST: Alternative Options:         │ │
│  │    ◉         ◉ Mahrez          │  │ ◆ Haaland (8.9)                 │ │
│  │  Grealish    RW                 │  │ ◆ Auba (8.1)                    │ │
│  │                                  │  │ ◆ Kane (8.5)                    │ │
│  │          ◉                       │  │ ◆ Firmino (7.9)                │ │
│  │     Haaland (ST)                │  │ (Scroll for more...)             │ │
│  │                                  │  │                                  │ │
│  └──────────────────────────────────┘  └──────────────────────────────────┘ │
│                                                                               │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  FORMATION CONTROLS                                                      │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Formation: 4-3-3 ▼                                                 │ │
│  │ Tactical Instructions: Balanced ▼                                  │ │
│  │ Defensive Level: [────────●────────] 50%                           │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  SUMMARY                                                                 │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ Formation: 4-3-3      │ Budget Used: 89.3M / 100M (89.3%)          │ │
│  │ Total Rating: 7.8     │ Fitness: 94% avg                           │ │
│  │ Players Selected: 11  │ Team Value: 89.3M                          │ │
│  │ Status: READY         │                                            │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  [CLEAR SELECTION]  [PRESET FORMATIONS▼]  [CONFIRM LINEUP]              │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px)

```
┌──────────────────────────────────────────────────────┐
│ ◀ LINEUP SELECTION                          SAVE     │
├──────────────────────────────────────────────────────┤
│ LINEUP │ FORMATIONS │ PLAYERS │ SUMMARY              │
├──────────────────────────────────────────────────────┤
│                                                      │
│ FORMATION: 4-3-3                                    │
│                                                      │
│ TACTICAL BOARD                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │         GK                                      │ │
│ │        ◉                                        │ │
│ │       / | \                                     │ │
│ │      ◉  ◉  ◉  (Defenders)                     │ │
│ │       \ | /                                     │ │
│ │        ◉ ◉ ◉  (Midfielders)                   │ │
│ │           ◉   (Forward)                        │ │
│ └────────────────────────────────────────────────┘ │
│                                                      │
│ PLAYER SELECTION                                    │
│                                                      │
│ ┌────────────────────────────────────────────────┐ │
│ │ GK: David Henderson [SWAP]                     │ │
│ └────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────┐ │
│ │ DF: Reece James (Rating: 7.5)    [SWAP]       │ │
│ └────────────────────────────────────────────────┘ │
│ ... [continue for all players]                     │
│                                                      │
│ FORMATION CONTROLS                                  │
│ Formation: 4-3-3 ▼                                 │
│ Tactical: Balanced ▼                               │
│                                                      │
│ SUMMARY                                             │
│ 11/11 Selected                                     │
│ Budget: 89.3M / 100M                              │
│ Avg Rating: 7.8                                    │
│                                                      │
│ [CONFIRM LINEUP]                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌──────────────────────────┐
│ ◀ LINEUP      SAVE       │
├──────────────────────────┤
│ FORMATION CONTROLS       │
│ Formation: 4-3-3 ▼       │
│ Tactical: Balanced ▼     │
│                          │
│ TACTICAL BOARD           │
│      GK ◉                │
│    DF ◉ ◉ ◉             │
│   MF ◉ ◉ ◉              │
│      FW ◉                │
├──────────────────────────┤
│ PLAYER LIST              │
│                          │
│ GK: D. Henderson (7.2)   │
│ Rating: FIT ✓            │
│ [SWAP]                   │
│                          │
│ DF: R. James (7.5)       │
│ Rating: FIT ✓            │
│ [SWAP]                   │
│                          │
│ DF: H. Maguire (7.3)     │
│ Rating: FIT ✓            │
│ [SWAP]                   │
│ ... [scroll]             │
├──────────────────────────┤
│ SUMMARY                  │
│ 11/11 Selected           │
│ Budget: 89.3M / 100M     │
│ Avg Rating: 7.8          │
│ Status: READY            │
├──────────────────────────┤
│ [CONFIRM LINEUP]         │
└──────────────────────────┘
```

## Component Breakdown

### Header Section
```
Component: Header
- Title: "LINEUP SELECTION"
- Right button: [SAVE] (Button variant: secondary)
- Navigation: Hidden on mobile, shown on tablet+
```

### Main Content Area (2-column grid on desktop)

**Left Column (6 cols): Formation Board**
```
Component: FormationBoard (full interactive)
- players: 11 selected PlayerData
- selectedFormation: Current formation ID
- readOnly: false
- showStats: true
- compactMode: false

Canvas:
- Draggable players
- Position validation
- Visual feedback on invalid drops
- Jersey numbers visible
- Hover tooltips: Player name + rating

Interactions:
- Drag to reposition
- Arrow keys to navigate
- Click to select
- Formation switch animates player movement
```

**Right Column (6 cols): Player Selection Panel**
```
Component: Card (variant: elevated)
Type: Sticky column, max-height: 600px, overflow-y: auto

Content by position:
┌─────────────────────────────────────┐
│ GK SELECTED                         │
│ David Henderson                     │
│ Rating: 7.2                         │
│ Price: 3.5M                         │
│ Team: Manchester United             │
│ Fitness: 98% ▓▓▓▓░                 │
│ Status: FIT ✓                       │
│ Form: ●●●●○                        │
│                                     │
│ [SWAP OUT]                          │
│                                     │
│ Alternative Options:                │
│ ◆ Alternative GK 1 (Rating 7.1)   │
│ ◆ Alternative GK 2 (Rating 7.3)   │
│ ◆ Alternative GK 3 (Rating 6.9)   │
└─────────────────────────────────────┘

Each section:
- Title: "GK SELECTED" (12px caps bold)
- Player info: 5 rows
- Button: [SWAP OUT] (variant: secondary, sm)
- Alternatives: List of 3-5 players

Styling:
- Section divider: 1px border
- Padding: 16px vertical gap between sections
- Scrolling: Smooth scroll within card
```

### Formation Controls (Full-width)
```
Component: FormationControls
Layout: Horizontal row with 3 controls

Control 1: Formation Dropdown
├─ Label: "Formation:" (12px secondary)
├─ Dropdown: 4-3-3 (currently selected)
├─ Options: 5 formation presets
└─ On change: Re-layout players on board

Control 2: Tactical Instructions
├─ Label: "Tactical Instructions:" (12px)
├─ Dropdown: Balanced (selected)
├─ Options: Defensive, Balanced, Attacking, Counter Attack
└─ Visual: Border color changes on board

Control 3: Defensive Level Slider
├─ Label: "Defensive Level: 50%" (12px)
├─ Range: 0-100%
├─ Gradient: Red (attack) → Blue (defense)
└─ On change: Updates visualization

Background: dark-bg-secondary
Padding: 16px
Border-radius: 8px
Spacing: 24px between controls
```

### Summary Section (Full-width)
```
Component: Card (variant: standard)
Layout: Grid, 2 rows × 2 columns (desktop) or single column (mobile)

Row 1:
├─ Formation: 4-3-3 (left)
├─ Budget Used: 89.3M / 100M (89.3%) (right)

Row 2:
├─ Total Rating: 7.8 (left)
├─ Fitness: 94% avg (right)

Values:
- Labels: 12px secondary
- Values: 18px mono bold highlight

Additional Info:
├─ Team Value: 89.3M (14px)
└─ Status: READY (14px, success badge)
```

### Action Buttons (Full-width)
```
Component: Button array (3 buttons)
Layout: Horizontal flex, equal width

Button 1: [CLEAR SELECTION]
- Variant: outline
- Size: lg
- Action: Reset all players (confirmation dialog)

Button 2: [PRESET FORMATIONS▼]
- Variant: secondary
- Size: lg
- Action: Dropdown menu of formation templates

Button 3: [CONFIRM LINEUP]
- Variant: primary
- Size: lg
- Action: Save lineup + navigate to dashboard

Spacing: 12px gap
Responsive: Stack vertically on mobile
```

## Data Flow

### State Management
```typescript
// Lineup page state
{
  selectedPlayers: Map<string, PlayerData>,  // 11 players
  selectedFormation: string,  // "4-3-3"
  tacticalInstructions: 'balanced' | 'defensive' | 'attacking' | 'counter',
  defensiveLevel: number,  // 0-100
  playerPositions: Map<string, {x, y}>,  // Positions on board
  isDirty: boolean,  // Changes made but not saved
  isLoading: boolean,  // Saving in progress
}

// Available players data
allPlayers: Array<PlayerData>  // 30+ players

// Formation definitions
formations: Array<Formation>  // 5 preset formations
```

### Key Interactions

**Drag Player on Formation Board**
1. User clicks + drags player circle
2. System validates target position (position-specific rules)
3. If valid: Visual feedback (green highlight), smooth move animation
4. If invalid: Shake animation + player returns to original position
5. State updates: playerPositions map

**Change Formation**
1. User selects new formation from dropdown
2. System reorganizes player positions
3. Animation: 250ms smooth transition of all circles
4. Layout updates: New formation shape displayed

**Swap Player Out**
1. User clicks [SWAP OUT] button next to player
2. Modal/drawer appears: Alternative players list
3. User clicks replacement player
4. Old player removed, new player added
5. Formation board updates to show new player

**Confirm Lineup**
1. User clicks [CONFIRM LINEUP]
2. Validation: All 11 positions filled, budget OK
3. POST request: Save lineup to backend
4. Success: Navigate to Dashboard
5. Error: Show toast notification with error message

---

# PAGE 3: LIVE MATCH (simulacao.html)

## Purpose
Real-time match simulation showing live events, score, match progress, and player statistics. Dynamic updates during match.

## Visual Layout

### Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ◀ LIVE MATCH                                              [PAUSE] [STATS]        │
├──────────────────────────────────────────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ LIVE MATCH │ RESULTS │ SEASON │ INFO                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│                    MANCHESTER UNITED 2 - 1 LIVERPOOL                              │
│                                                                                   │
│  Possession: 56% ▓▓▓▓▓▓░░░░  vs  44% ░░░░░▓▓▓▓                                 │
│  Shots: 18 ▓▓▓▓▓░░░░░░  vs  12 ▓▓▓░░░░░░░░░                                    │
│                                                                                   │
├──────────────────────────────────────────────────────────────────────────────────┤
│ MATCH TIME: 67' / 90'                             Half: 2nd | Status: LIVE ●    │
│                                                                                   │
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░                           Estimated finish: 20:45          │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  MATCH EVENTS (Latest at top)        │  YOUR PLAYERS PERFORMANCE               │
│  ┌──────────────────────────────────┤  ┌──────────────────────────────────┐    │
│  │ 67' ⚽ GOAL!                       │  │ Cristiano Ronaldo (ST)           │    │
│  │    Cristiano Ronaldo (Penalty)   │  │ Rating: 8.7  │  Goals: 1         │    │
│  │    Manchester United 2-1 Liverpool│  │ Shots: 5  │  Assists: 0         │    │
│  │    +8 pts, Rating: +2.5          │  │                                  │    │
│  │    │ Assist: Bruno Fernandes     │  │ Bruno Fernandes (CM)             │    │
│  │    └─ Penalty                    │  │ Rating: 8.4  │  Goals: 1         │    │
│  │                                  │  │ Tackles: 3  │  Assists: 1        │    │
│  │ 62' 🔄 SUBSTITUTION              │  │                                  │    │
│  │    OFF: Antony  ON: Sancho       │  │ David Henderson (GK)             │    │
│  │    Attacking move                │  │ Rating: 7.2  │  Saves: 3         │    │
│  │                                  │  │ Clean Sheet: At Risk             │    │
│  │ 58' ⚽ GOAL!                      │  └──────────────────────────────────┘    │
│  │    Mohamed Salah (Open play)     │                                          │
│  │    Assist: Trent Alexander-Arnold │                                          │
│  │    Manchester United 1-1 Liverpool│  FORMATION (Current)                    │
│  │    +7 pts, Rating: +1.8          │  ┌──────────────────────────────────┐    │
│  │                                  │  │         GK (7.2)                 │    │
│  │ 45' ⏱ HALF-TIME                  │  │            ◉                     │    │
│  │    Manchester United 1-0 Liverpool│  │          ◉ ◉ ◉                 │    │
│  │                                  │  │         ◉ ◉ ◉ ◉                │    │
│  │ 32' 🟡 YELLOW CARD               │  │            ◉ ◉                  │    │
│  │    Fred (Manchester United)      │  │                                  │    │
│  │    Rash challenge                │  │       4-3-3 BALANCED            │    │
│  │                                  │  │                                  │    │
│  │ 15' ⚽ GOAL!                      │  │ All 11 players shown by position│    │
│  │    Bruno Fernandes               │  │ with live rating updates         │    │
│  │    Assist: Rasmus Hojbjerg       │  └──────────────────────────────────┘    │
│  │    Manchester United 1-0 Liverpool│                                          │
│  │                                  │  MATCH CONTROLS                         │
│  │ 0' 🏁 KICKOFF                    │  [◀ REWIND] [PAUSE] [PLAY] [▶ SKIP]    │
│  │    Manchester United vs Liverpool│  [SPEED: 1x ▼] [SOUND: ON]              │
│  │                                  │                                          │
│  └──────────────────────────────────┘                                          │
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px)

```
┌──────────────────────────────────────────────────────┐
│ ◀ LIVE MATCH                           [PAUSE] [⋯]   │
├──────────────────────────────────────────────────────┤
│ LIVE MATCH │ TIMELINE │ STATS                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│ MAN UTD 2 - 1 LIVERPOOL                             │
│ Possession: 56% vs 44%                              │
│ Shots: 18 vs 12                                      │
│                                                      │
│ MATCH TIME: 67' / 90'  Status: LIVE ●               │
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░                              │
│                                                      │
├──────────────────────────────────────────────────────┤
│ RECENT EVENTS                                        │
│ ┌────────────────────────────────────────────────┐  │
│ │ 67' ⚽ GOAL! Cristiano Ronaldo (Penalty)       │  │
│ │ Man Utd 2-1 Liverpool | +8 pts                │  │
│ │ Assist: Bruno Fernandes                       │  │
│ └────────────────────────────────────────────────┘  │
│ ┌────────────────────────────────────────────────┐  │
│ │ 62' 🔄 SUBSTITUTION                            │  │
│ │ OFF: Antony  ON: Sancho                       │  │
│ └────────────────────────────────────────────────┘  │
│ [Scroll for more events...]                         │
├──────────────────────────────────────────────────────┤
│ YOUR PLAYERS                                         │
│ ┌────────────────────────────────────────────────┐  │
│ │ Cristiano Ronaldo (ST)                         │  │
│ │ Rating: 8.7  │  Goals: 1  │  Shots: 5         │  │
│ │ Bruno Fernandes (CM)                           │  │
│ │ Rating: 8.4  │  Assists: 1  │  Tackles: 3    │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
│ [FULL STATS]                                         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌──────────────────────────┐
│ ◀ LIVE MATCH    [⋯]      │
├──────────────────────────┤
│ MAN UTD 2 - 1 POOL       │
│ LIVE ● 67' / 90'         │
│                          │
│ Possession: 56% vs 44%   │
│ Shots: 18 vs 12          │
├──────────────────────────┤
│ EVENTS                   │
│                          │
│ 67' ⚽ GOAL!              │
│ Cristiano Ronaldo        │
│ Penalty | +8 pts         │
│ Assist: Fernandes        │
│                          │
│ 62' 🔄 SUBSTITUTION      │
│ OFF: Antony              │
│ ON: Sancho               │
│                          │
│ 58' ⚽ GOAL!              │
│ Mohamed Salah            │
│ +7 pts                   │
│ [Scroll for more...]     │
├──────────────────────────┤
│ TOP PERFORMERS           │
│                          │
│ Ronaldo (ST)             │
│ Rating: 8.7 ⭐           │
│ Goals: 1 | Score: +25    │
│                          │
│ Fernandes (CM)           │
│ Rating: 8.4 ⭐           │
│ Assists: 1 | Score: +22  │
├──────────────────────────┤
│ [FULL STATS] [TIMELINE]  │
│                          │
└──────────────────────────┘
```

## Component Breakdown

### Header
```
Component: Header
- Title: "LIVE MATCH" with live indicator (● blinking red)
- Right buttons: [PAUSE] [STATS]
- Navigation: Hidden on mobile
```

### Match Score Section (64px)
```
Layout: Centered, single row

Content:
┌─────────────────────────────────────┐
│ MANCHESTER UNITED 2 - 1 LIVERPOOL   │
│ 48px mono bold, centered            │
│                                     │
│ Possession: 56% vs 44%              │
│ Shots: 18 vs 12                     │
│ (Additional stats row)              │
└─────────────────────────────────────┘

Components:
- Score: 48px monospace, highlight color
- Team names: 16px primary
- Stats: 14px secondary with progress bars (4px height)

Visual:
- Left team 56% bar (green → full)
- "vs" center
- Right team 44% bar (gray → partial)
```

### Match Progress Section (48px)
```
Layout: Horizontal progress bar

Content:
┌─────────────────────────────────────────┐
│ MATCH TIME: 67' / 90'  Half: 2nd  LIVE │
│ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░                 │
│ Estimated finish: 20:45                 │
└─────────────────────────────────────────┘

Components:
- Time label: "67' / 90'" (18px mono bold)
- Progress bar: 744px width, 8px height
  - Fill: primary-accent (#4a9eff)
  - Background: dark-bg-tertiary
  - Fill % = (67 / 90) * 100 = 74.4%
- Status: "LIVE ●" with pulsing red dot
- Estimated finish time: 12px secondary

Animation: Fills continuously (linear animation)
```

### 2-Column Content Area (on desktop)

**Left Column: Match Timeline (6 cols)**
```
Component: MatchTimeline
- events: Array of 8-15 MatchEvent objects
- autoScroll: true (scroll to latest)
- maxHeight: 500px
- showDetails: true

Event Card Layout:
┌──────────────────────────────────────────┐
│ 67' ⚽ GOAL!                              │
│    Cristiano Ronaldo (Penalty)          │
│    Manchester United 2 - 1 Liverpool    │
│    +8 pts, Rating impact: +2.5          │
│    │ Assist: Bruno Fernandes            │
│    └─ Penalty (event type badge)        │
└──────────────────────────────────────────┘

Each event:
- Time: 12px mono, secondary
- Icon + Type: 14px bold, uppercase
- Description: 16px primary
- Details: 12px secondary, indented
- Impact: 12px mono, color-coded
- Borders: 4px left border, color per event type

Event Types & Colors:
- Goal (⚽): Red border #d85b5b
- Substitution (🔄): Purple #9d84b7
- Yellow Card (🟡): Amber #ffb84d
- Red Card (🔴): Red #ff5c5c, pulsing
- Injury (🏥): Red #ff5c5c
- Kickoff/Halftime (🏁): Blue #4a9eff

Scrolling: Smooth, momentum scrolling
```

**Right Column: Player Performance (6 cols)**
```
Component: Two parts - Top performers + Formation

Part 1: Top Performers (3 PlayerCard / DetailedVariant)
┌──────────────────────────────────────────┐
│ YOUR PLAYERS PERFORMANCE                 │
│ ═════════════════════════════════════════ │
│                                          │
│ ⭐ Cristiano Ronaldo (ST)                 │
│    Rating: 8.7  │  Goals: 1  Shots: 5   │
│    +25 pts contribution                  │
│                                          │
│ ⭐ Bruno Fernandes (CM)                   │
│    Rating: 8.4  │  Assists: 1  Tackles: 3│
│    +22 pts contribution                  │
│                                          │
│ ⭐ David Henderson (GK)                   │
│    Rating: 7.2  │  Saves: 3  |  Risk    │
│    Clean Sheet: At Risk                  │
│                                          │
└──────────────────────────────────────────┘

Layout:
- Title: 14px caps bold secondary
- Divider: 1px border
- Each player: 3 rows (name, stats, impact)
- Stars: ⭐ for top performers (rating > 8.0)
- Stats: 14px mono, color-coded (goals green, etc.)

Part 2: Formation Display (Compact)
┌──────────────────────────────────────────┐
│ FORMATION (Current)                      │
│ ┌────────────────────────────────────┐  │
│ │              GK (7.2)              │  │
│ │                ◉                   │  │
│ │              ◉ ◉ ◉                │  │
│ │            ◉ ◉ ◉ ◉               │  │
│ │              ◉ ◉                  │  │
│ │                                   │  │
│ │         4-3-3 BALANCED           │  │
│ └────────────────────────────────────┘  │
│                                          │
│ All 11 players shown in tactical         │
│ positions with live ratings displayed    │
│                                          │
└──────────────────────────────────────────┘

Component: FormationBoard (compact variant)
- Dimensions: 300×400px
- Circles: 32px diameter
- Jersey text: 16px
- No controls (read-only)
- Ratings shown below each position
```

### Match Controls (Desktop-only, bottom)
```
Component: Control buttons row
Layout: 5 buttons, centered

[◀ REWIND]  [PAUSE]  [PLAY]  [▶ SKIP]  [SPEED: 1x ▼]
Variant: secondary
Size: md

Actions:
- Rewind: Go back 5 minutes
- Pause: Stop match progression
- Play: Resume match (default)
- Skip: Jump forward 5 minutes
- Speed: 0.5x, 1x, 2x, 3x

Additional options:
- [SOUND: ON] toggle button (right side)
- Settings modal for detailed controls
```

## Data Flow

### Real-time State
```typescript
{
  matchId: string,
  homeTeam: string,
  awayTeam: string,
  homeScore: number,
  awayScore: number,
  homeStats: { possession, shots, shotsOnTarget, ... },
  awayStats: { ... },
  currentMinute: number,
  halfTime: number,  // 1 or 2
  status: 'live' | 'paused' | 'finished',
  events: MatchEvent[],  // Array of timeline events
  playerStats: Map<playerId, PlayerStats>,  // Live ratings
  estimatedFinishTime: Date,
}

// WebSocket updates every 30 seconds or on event
// Polling fallback every 5 seconds if WebSocket unavailable
```

### Key Interactions

**Event Updates**
1. WebSocket receives new event from backend
2. New MatchEvent added to timeline
3. Timeline auto-scrolls to show latest event
4. Animation: Slide in from bottom (300ms)
5. Player ratings updated if affected

**Match Time Progress**
1. System calculates elapsed time (linear)
2. Progress bar animates to new percentage
3. Status updates every minute
4. Estimated finish time recalculated

**Pause/Play**
1. Click pause: Match halts, button becomes Play
2. WebSocket subscription paused (no new events)
3. Click play: Resume, buttons update
4. Catch up missed events from backend

---

# PAGE 4: RESULTS (resultado.html)

## Purpose
Post-match details with final score, match statistics, player performance, timeline, and next match preview.

## Visual Layout

### Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ◀ MATCH RESULT                                                  Thursday, Nov 15 │
├──────────────────────────────────────────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ LIVE MATCH │ RESULTS │ SEASON │ INFO                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│                           FINAL SCORE                                             │
│                                                                                   │
│              MANCHESTER UNITED  2  -  1  LIVERPOOL                                │
│                                                                                   │
│  Goals:                    Goals:                                                 │
│  Ronaldo (15', 67' Pen)    Salah (58')                                           │
│  Fernandes (32')           TAA (Assist)                                          │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  MATCH STATISTICS                                                                │
│  ┌────────────────────┬──────────┬──────────┬────────────────┐                   │
│  │ Stat               │ Man Utd  │Liverpool │ Difference     │                   │
│  ├────────────────────┼──────────┼──────────┼────────────────┤                   │
│  │ Possession         │ 56%      │ 44%      │ +12%           │                   │
│  │ Shots              │ 18       │ 12       │ +6             │                   │
│  │ Shots on Target    │ 8        │ 5        │ +3             │                   │
│  │ Pass Accuracy      │ 89%      │ 87%      │ +2%            │                   │
│  │ Tackles            │ 26       │ 28       │ -2             │                   │
│  │ Fouls              │ 12       │ 14       │ -2             │                   │
│  │ Corners            │ 7        │ 4        │ +3             │                   │
│  │ Yellow Cards       │ 2        │ 1        │ +1             │                   │
│  │ Red Cards          │ 0        │ 0        │ 0              │                   │
│  └────────────────────┴──────────┴──────────┴────────────────┘                   │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  YOUR TEAM PERFORMANCE                                                            │
│                                                                                   │
│  Your Lineup Score: 87.3 pts  │  Gameweek Rank: 4,234  │  Change: +5 pts        │
│                                                                                   │
│  Top Performers:                                                                 │
│  ┌────────────────────────────────────────────────────────────┐                  │
│  │ ⭐ Cristiano Ronaldo (ST)                                   │                  │
│  │    Rating: 8.7  │  Goals: 1  Assists: 0  Shots: 5          │                  │
│  │    +25.3 pts contribution                                   │                  │
│  │    Form: ●●●●○  │  Price: 12.5M  │  Team: Manchester Utd  │                  │
│  │                                                              │                  │
│  │ ⭐ Bruno Fernandes (CM)                                     │                  │
│  │    Rating: 8.4  │  Goals: 1  Assists: 1  Tackles: 3        │                  │
│  │    +22.1 pts contribution                                   │                  │
│  │    Form: ●●●●●  │  Price: 11.2M  │  Team: Manchester Utd  │                  │
│  │                                                              │                  │
│  │ ⭐ David Henderson (GK)                                     │                  │
│  │    Rating: 7.2  │  Saves: 3  │  Clean Sheet: No            │                  │
│  │    +7.2 pts contribution                                    │                  │
│  │    Form: ●●●○○  │  Price: 3.5M  │  Team: Manchester Utd   │                  │
│  │                                                              │                  │
│  └────────────────────────────────────────────────────────────┘                  │
│                                                                                   │
│  Lowest Performers:                                                               │
│  ○ Jadon Sancho (RW)   Rating: 5.8  │  -2.1 pts                                  │
│  ○ Luke Shaw (LB)      Rating: 6.1  │  +1.8 pts                                  │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  MATCH TIMELINE (Detailed Play-by-Play)                                          │
│  ┌───────────────────────────────────────────────────────────┐                   │
│  │ 90' 🏁 FULL TIME                                           │                   │
│  │                                                            │                   │
│  │ 87' ⚽ GOAL! Cristiano Ronaldo (Penalty)                  │                   │
│  │    Manchester United 2 - 1 Liverpool                      │                   │
│  │                                                            │                   │
│  │ 82' 🔄 SUBSTITUTION                                        │                   │
│  │    OFF: Antony  ON: Sancho                               │                   │
│  │                                                            │                   │
│  │ ... [continue full timeline]                              │                   │
│  └───────────────────────────────────────────────────────────┘                   │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  NEXT MATCH PREVIEW                                                               │
│  ┌───────────────────────────────────────────────────────────┐                   │
│  │ Matchday 16                              Sunday, November 22│                   │
│  │                                                            │                   │
│  │      Manchester United  vs  Brighton & Hove Albion        │                   │
│  │             Man Utd                  Brighton             │                   │
│  │                                                            │                   │
│  │ Kick-off: 15:00 (UTC)                                     │                   │
│  │ Venue: Old Trafford                                       │                   │
│  │ Last H2H: Man Utd 3-1 Brighton (Oct 2024)                │                   │
│  │                                                            │                   │
│  │ [TEAM NEWS]  [ODDS]  [PREDICTIONS]                        │                   │
│  │                                                            │                   │
│  └───────────────────────────────────────────────────────────┘                   │
│                                                                                   │
│                    [SHARE RESULT]  [SEASON STATS]  [GO TO LEAGUE]                │
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px)

```
┌──────────────────────────────────────────────────────┐
│ ◀ MATCH RESULT                        Thursday, Nov 15│
├──────────────────────────────────────────────────────┤
│ RESULTS │ TIMELINE │ STATS                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│ FINAL SCORE                                          │
│ Man Utd 2 - 1 Liverpool                             │
│                                                      │
│ Ronaldo (15', 67' Pen)                              │
│ Fernandes (32')                                      │
│ Salah (58')                                          │
│                                                      │
├──────────────────────────────────────────────────────┤
│ MATCH STATISTICS                                     │
│ ┌────────────────────────────────────────────────┐  │
│ │ Possession    │ 56% vs 44%                     │  │
│ │ Shots         │ 18 vs 12                       │  │
│ │ Pass Accuracy │ 89% vs 87%                     │  │
│ │ Tackles       │ 26 vs 28                       │  │
│ └────────────────────────────────────────────────┘  │
│                                                      │
├──────────────────────────────────────────────────────┤
│ YOUR TEAM SCORE: 87.3 pts (Rank: 4,234)            │
│                                                      │
│ TOP PERFORMERS:                                      │
│ ⭐ Ronaldo (ST) - Rating: 8.7  +25.3 pts          │
│ ⭐ Fernandes (CM) - Rating: 8.4  +22.1 pts        │
│ ⭐ Henderson (GK) - Rating: 7.2  +7.2 pts         │
│                                                      │
├──────────────────────────────────────────────────────┤
│ MATCH TIMELINE                                       │
│ [Scrollable timeline - 8-15 events]                 │
│                                                      │
├──────────────────────────────────────────────────────┤
│ NEXT MATCH                                           │
│ Man Utd vs Brighton                                 │
│ Sunday, November 22 at 15:00                        │
│ [TEAM NEWS] [PREDICTIONS]                           │
│                                                      │
│ [SHARE] [SEASON STATS] [LEAGUE]                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌──────────────────────────┐
│ ◀ RESULT    Nov 15       │
├──────────────────────────┤
│ RESULT │ TIMELINE │STATS │
├──────────────────────────┤
│ FINAL SCORE              │
│ Man Utd  2 - 1           │
│        Liverpool         │
│                          │
│ Goals:                   │
│ ⚽ Ronaldo (15', 67'P)   │
│ ⚽ Fernandes (32')       │
│                          │
│ vs Salah (58')           │
├──────────────────────────┤
│ STATISTICS               │
│ Possession: 56% vs 44%   │
│ Shots: 18 vs 12          │
│ SoT: 8 vs 5              │
│ Pass %: 89% vs 87%       │
├──────────────────────────┤
│ YOUR SCORE: 87.3 pts     │
│ Rank: 4,234 | +5 pts     │
│                          │
│ TOP PERFORMERS:          │
│ ⭐ Ronaldo (ST)          │
│    Rating: 8.7           │
│    +25.3 pts             │
│                          │
│ ⭐ Fernandes (CM)        │
│    Rating: 8.4           │
│    +22.1 pts             │
│                          │
│ ⭐ Henderson (GK)        │
│    Rating: 7.2           │
│    +7.2 pts              │
├──────────────────────────┤
│ TIMELINE [9 events]      │
│ [Scroll to view all...]  │
│                          │
├──────────────────────────┤
│ NEXT: vs Brighton        │
│ Sun, Nov 22 @ 15:00      │
│                          │
│ [TEAM NEWS] [PREDICTIONS]│
│                          │
│ [SHARE] [STATS] [LEAGUE] │
│                          │
└──────────────────────────┘
```

## Component Breakdown

### Final Score Section (96px)
```
Component: MatchCard (variant: expanded)
Title: "FINAL SCORE" (18px bold secondary)

Main Score:
┌────────────────────────────────────────┐
│ MANCHESTER UNITED  2  -  1  LIVERPOOL   │
│ 56px mono bold, centered               │
└────────────────────────────────────────┘

Goal Details:
┌────────────────┬────────────────┐
│ Goals:         │ Goals:         │
│ Ronaldo (15')  │ Salah (58')    │
│ Ronaldo (67'P) │ TAA (Assist)   │
│ Fernandes (32')│                │
└────────────────┴────────────────┘

Layout:
- Two columns (team vs team)
- Scorers with minutes in parentheses
- Penalty notation: (P)
- Assist notation: (Assist)
- Font: 14px secondary
```

### Match Statistics Section (400px)
```
Component: StatPanel (variant: comparison)
Layout: Team vs Team comparison

Table Structure:
┌───────────┬──────────┬──────────┬──────────┐
│ Stat      │ Man Utd  │Liverpool │ Diff     │
├───────────┼──────────┼──────────┼──────────┤
│ Possession│ 56%      │ 44%      │ +12%     │
│ Shots     │ 18       │ 12       │ +6       │
│ ...       │ ...      │ ...      │ ...      │
└───────────┴──────────┴──────────┴──────────┘

Values:
- Left team: 14px mono right-aligned
- Center: 14px secondary
- Right team: 14px mono left-aligned
- Difference: 14px secondary (green if advantage, gray if tied)

Rows: 9 major stats
Scrollable if needed on mobile
```

### Your Team Performance Section
```
Component: Custom section (3 parts)

Part 1: Score Summary (24px height)
┌────────────────────────────────────────┐
│ Your Lineup Score: 87.3 pts            │
│ Gameweek Rank: 4,234  │ Change: +5 pts │
└────────────────────────────────────────┘

Part 2: Top Performers (3× PlayerCard / Detailed)
```

## Component: PlayerCard (variant: detailed) × 3
- Player name, position, team
- Rating (large, 24px)
- Stats: Goals, Assists, Shots, Tackles
- Points contribution (color-coded)
- Form indicator (●●●○○)
- Price + Team
- Border: Success color for top performers

```

Part 3: Lowest Performers (2 rows, text only)
- Player name + position
- Rating: 14px mono
- Points contribution: Color-coded (red if negative)
```

### Match Timeline Section
```
Component: MatchTimeline
- All events from match (15-20 events)
- Full details shown
- maxHeight: 400px (scrollable)
- autoScroll: false (user can scroll)

Event types: Goal, Substitution, Card, Injury, Kickoff, Halftime, Full Time
```

### Next Match Preview Section
```
Component: MatchCard (variant: standard)
Title: "NEXT MATCH PREVIEW" (18px bold)

Content:
┌────────────────────────────────────────┐
│ Matchday 16         Sunday, November 22 │
│ ════════════════════════════════════════ │
│                                         │
│ Manchester United vs Brighton           │
│        Man Utd             Brighton     │
│                                         │
│ Kick-off: 15:00 (UTC)                  │
│ Venue: Old Trafford, Manchester         │
│                                         │
│ Last H2H: Man Utd 3-1 Brighton (Oct 24)│
│                                         │
│ [TEAM NEWS]  [ODDS]  [PREDICTIONS]     │
│                                         │
└────────────────────────────────────────┘

Layout:
- Header: Date + Time
- Teams: Large, centered
- Venue info: Secondary text
- Historical context: Secondary text
- Action buttons: 3 secondary buttons
```

### Action Buttons (Bottom)
```
Component: Button array (3 buttons)
[SHARE RESULT]  [SEASON STATS]  [GO TO LEAGUE]
Variant: secondary
Size: lg
```

---

# PAGE 5: SEASON DASHBOARD (rodada.html)

## Purpose
League standings with current round info, match results history, upcoming matches, and team performance trends.

## Visual Layout

### Desktop (1440px)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ◀ LEAGUE STANDINGS                                                Season: 2024/25 │
├──────────────────────────────────────────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ LIVE MATCH │ RESULTS │ SEASON │ INFO                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  Matchday: 15 of 38                                                               │
│                                                                                   │
│  ┌────┬───────────────────┬─────┬────┬────┬────┬─────┬───────┐                  │
│  │POS │ TEAM              │ GP  │ W  │ D  │ L  │ PTS │ TREND │                  │
│  ├────┼───────────────────┼─────┼────┼────┼────┼─────┼───────┤                  │
│  │ 1  │ Manchester City   │ 15  │ 13 │ 2  │ 0  │ 41  │ ↑↑ +2 │                  │
│  │ 2  │ Arsenal           │ 15  │ 12 │ 2  │ 1  │ 38  │ ↓ -1  │                  │
│  │ 3  │ Newcastle United  │ 15  │ 11 │ 3  │ 1  │ 36  │ → 0   │                  │
│  │ 4  │ Manchester United │ 15  │ 10 │ 2  │ 3  │ 32  │ ↑ +1  │                  │
│  │ 5  │ Liverpool         │ 15  │ 10 │ 2  │ 3  │ 32  │ ↓ -1  │                  │
│  │ 6  │ Aston Villa       │ 15  │  9 │ 3  │ 3  │ 30  │ ↑ +1  │                  │
│  │ 7  │ Tottenham         │ 15  │  8 │ 3  │ 4  │ 27  │ ↓ -1  │                  │
│  │ 8  │ Bournemouth       │ 15  │  8 │ 2  │ 5  │ 26  │ ↑↑ +2 │                  │
│  │ 9  │ Fulham            │ 15  │  7 │ 3  │ 5  │ 24  │ → 0   │                  │
│  │ 10 │ Brighton          │ 15  │  6 │ 4  │ 5  │ 22  │ → 0   │                  │
│  │ ... │ ...               │ ... │ ...│ ...│ ...│ ... │ ...   │                  │
│  │ 20 │ Luton Town        │ 15  │  1 │ 2  │ 12 │ 5   │ ↓↓ -2 │                  │
│  └────┴───────────────────┴─────┴────┴────┴────┴─────┴───────┘                  │
│                                                                                   │
│  PROMOTION ZONE (1-4)  │  PLAYOFF ZONE (5-8)  │  RELEGATION (18-20)              │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  RECENT RESULTS (Matchday 14-15)                                                 │
│  ┌──────────────────┬──────────────────┬──────────────────┐                     │
│  │ Man Utd  2 - 1   │ Arsenal  1 - 1   │ Chelsea  3 - 0   │                     │
│  │ Liverpool        │ Man City         │ Brighton         │                     │
│  │                  │                  │                  │                     │
│  │ Your Score: 51   │ Your Score: 38   │ Your Score: 62   │                     │
│  │ [Details]        │ [Details]        │ [Details]        │                     │
│  └──────────────────┴──────────────────┴──────────────────┘                     │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  UPCOMING MATCHES (Matchday 16)                                                  │
│  ┌──────────────────┬──────────────────┬──────────────────┐                     │
│  │ Man Utd  vs      │ City  vs          │ Chelsea  vs      │                     │
│  │ Brighton         │ Liverpool         │ Fulham           │                     │
│  │ Sun, Nov 22      │ Sun, Nov 22       │ Mon, Nov 23      │                     │
│  │ 15:00            │ 17:30             │ 19:45            │                     │
│  │ [Team News]      │ [Team News]       │ [Team News]      │                     │
│  └──────────────────┴──────────────────┴──────────────────┘                     │
│                                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  SEASON STATISTICS                                                                │
│  ┌──────────────────────────────────────┐                                        │
│  │ Top Scorer:    Erling Haaland (Man City)  23 Goals                           │
│  │ Most Assists:  Kevin De Bruyne (Man City) 12 Assists                         │
│  │ Best Defense:  Manchester City            -3 Goal Diff                       │
│  │ Worst Defense: Southampton                -26 Goal Diff                      │
│  └──────────────────────────────────────┘                                        │
│                                                                                   │
│  [SORT BY: Points ▼]  [FILTER]  [PREDICTIONS]  [EXPORT]                         │
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘
```

### Tablet (768px) & Mobile (375px)
```
[Similar structure, simplified with fewer columns and smaller sizes]
```

## Component Breakdown

### Header Section
```
Component: Header
Title: "LEAGUE STANDINGS"
Subtitle: "Season: 2024/25"
Current Matchday: "Matchday: 15 of 38" (right-aligned)
```

### Standings Table Section
```
Component: StandingsTable
- All 20 teams
- Sticky header
- Sticky first column (POS + TEAM)
- Zone highlighting (green for top 4, purple for 5-8, red for 18-20)
- Columns: POS, TEAM, GP, W, D, L, PTS, TREND
- Click team: Show team details modal
- Max-height: 800px desktop, 600px tablet, 400px mobile
```

### Legend Section (Below Table)
```
Text: "PROMOTION ZONE (1-4) │ PLAYOFF ZONE (5-8) │ RELEGATION (18-20)"
Background: Subtle colored stripes matching zone colors
```

### Recent Results Section (480px)
```
Component: Card (variant: standard)
Title: "RECENT RESULTS (Matchday 14-15)"

Layout: Horizontal scroll (3 cards visible + scroll)
Each: MatchCard (compact variant)

Cards show:
├─ Teams: "Man Utd 2 - 1 Liverpool"
├─ Date: "Matchday 15"
├─ Your Score: "+51 pts"
└─ [Details] button
```

### Upcoming Matches Section (480px)
```
Component: Card (variant: standard)
Title: "UPCOMING MATCHES (Matchday 16)"

Layout: Horizontal scroll (3 cards visible + scroll)
Each: MatchCard (compact variant, upcoming style)

Cards show:
├─ Teams: "Man Utd vs Brighton"
├─ Date: "Sun, Nov 22"
├─ Time: "15:00"
└─ [Team News] button
```

### Season Statistics Section (240px)
```
Component: Card (variant: standard)
Title: "SEASON STATISTICS"

Layout: 4 rows × 2 columns
┌────────────────────────────────────────────┐
│ Top Scorer: Erling Haaland (Man City)     │
│ 23 Goals                                  │
│                                           │
│ Most Assists: Kevin De Bruyne (Man City)  │
│ 12 Assists                                │
│                                           │
│ Best Defense: Manchester City             │
│ -3 Goal Difference                        │
│                                           │
│ Worst Defense: Southampton                │
│ -26 Goal Difference                       │
└────────────────────────────────────────────┘

Values: 18px mono bold
Labels: 12px secondary
```

### Action Controls (Bottom)
```
Component: Button + Dropdown array
[SORT BY: Points ▼]  [FILTER]  [PREDICTIONS]  [EXPORT]

Dropdown options (Sort By):
- Points (default)
- Win %
- Goal Difference
- Form (last 5)
- Alphabetical
```

---

## RESPONSIVE DESIGN STRATEGY

### Breakpoints
```
Mobile:  375px (iPhone SE, small Android)
Tablet:  768px (iPad, large Android)
Desktop: 1440px (27" display, standard desktop)
```

### Key Responsive Changes

#### Dashboard
- Desktop: 3-column grid (Lineup | Formation | Today's Matches)
- Tablet: 2-column grid (stacked vertically after)
- Mobile: 1 column, all sections stack full-width

#### Lineup Selection
- Desktop: 2-column split (Formation left | Players right)
- Tablet: Full-width single column, sections toggle
- Mobile: Accordion-style sections, swipeable

#### Live Match
- Desktop: 2-column (Timeline left | Stats right)
- Tablet: Single column, tabs for Timeline/Stats
- Mobile: Full-width, scrollable sections

#### Results
- Desktop: Vertical sections (Score → Stats → Timeline → Next)
- Tablet: Same layout, narrower
- Mobile: Compact sections, statistics in modal

#### Season Dashboard
- Desktop: Full 20-team table with 8 columns
- Tablet: 6-column table (reduced stats)
- Mobile: 4-column table (POS, TEAM, PTS, TREND only)

### Touch Targets
- Minimum 44×44px on mobile
- All buttons padded for thumb interaction
- Swipe regions for navigation

### Typography Scaling
```
Headings:
- H1: 32px (desktop) → 28px (tablet) → 24px (mobile)
- H2: 24px → 20px → 18px

Body:
- Body Regular: 14px → 13px → 12px
- Body Large: 16px → 15px → 14px

Mono (numbers):
- 24px → 20px → 18px
```

---

## NAVIGATION & STATE MANAGEMENT

### Navigation Structure
```
Header Navigation (all pages):
├─ DASHBOARD (index.html)
├─ LINEUP (escalacao.html)
├─ LIVE MATCH (simulacao.html)
├─ RESULTS (resultado.html)
└─ SEASON (rodada.html)

Right Actions:
└─ SETTINGS

Mobile Menu (hamburger):
├─ [5 main nav items]
├─ ─────────────────
├─ Settings
├─ Help
└─ Logout
```

### State Architecture
```typescript
// Global app state
{
  user: {
    id: string,
    email: string,
    teamName: string,
  },
  season: {
    id: string,
    currentMatchday: number,
    totalMatchdays: number,
  },
  currentTeam: {
    players: Map<string, PlayerData>,
    formation: string,
    selectedPlayers: string[],  // 11 player IDs
    tacticalInstructions: TacticLevel,
    defensiveLevel: number,
  },
  matches: {
    current?: MatchData,
    past: MatchData[],
    upcoming: MatchData[],
  },
  standings: StandingData[],
}
```

### Page-to-Page Navigation
```
Dashboard
├─ Click [EDIT LINEUP] → Lineup Selection
├─ Click MatchCard → Live Match / Results
├─ Click [VIEW FULL TABLE] → Season Dashboard
└─ Click formation → Lineup Selection

Lineup Selection
├─ Back button → Dashboard
├─ [CONFIRM LINEUP] → Dashboard
└─ Navigation menu → Any page

Live Match
├─ Back button → Dashboard
├─ Click player → Player details modal
└─ Navigation menu → Any page

Results
├─ Back button → Dashboard
├─ [GO TO LEAGUE] → Season Dashboard
├─ [NEXT MATCH] → Upcoming/Live Match
└─ Navigation menu → Any page

Season Dashboard
├─ Back button → Dashboard
├─ Click team → Team details modal
├─ [Upcoming match card] → Match preview
└─ Navigation menu → Any page
```

---

## ANIMATIONS & TRANSITIONS

### Page Transitions
```
Fade + Slide:
- Duration: 300ms
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Direction: Outgoing fades, incoming slides up

Breakpoint:
- @media (prefers-reduced-motion: reduce) { duration: 0ms }
```

### Component Animations
```
Formation Board Player Move:
- Duration: 250ms
- Easing: cubic-bezier(0.4, 0.0, 0.2, 1)

Timeline Event Slide In:
- Duration: 300ms
- Stagger: 50ms between items
- Direction: Slide up from bottom

Match Progress Bar:
- Duration: Linear throughout match
- Color: Primary accent (#4a9eff)

Card Hover:
- Scale: 1 → 1.02
- Shadow: sm → md
- Duration: 150ms

Button Hover:
- Primary/Danger: Scale 1 → 1.02
- Secondary: No scale
- Duration: 150ms
```

---

## IMPLEMENTATION CHECKLIST

### Phase 3 Delivery Checklist

#### Page 1: Dashboard (Week 5, Days 1-2)
- [ ] Header navigation complete
- [ ] Matchday hero section
- [ ] Lineup overview card
- [ ] Formation board (compact, read-only)
- [ ] Today's matches section
- [ ] Recent matches carousel
- [ ] League standings table (sticky)
- [ ] All components integrated
- [ ] Responsive at 375/768/1440px
- [ ] Keyboard navigation working
- [ ] WCAG AA accessibility verified
- [ ] Page load <2 seconds
- [ ] Unit tests passing
- [ ] Storybook documentation

#### Page 2: Lineup Selection (Week 5, Days 3-4)
- [ ] Header with save button
- [ ] Formation board (full interactive)
- [ ] Drag-drop with validation
- [ ] Player selection panel (sticky)
- [ ] Formation controls (dropdown + slider)
- [ ] Summary section
- [ ] Action buttons (Clear, Presets, Confirm)
- [ ] Formation switching animation
- [ ] All components integrated
- [ ] Responsive layout
- [ ] Touch-friendly (mobile)
- [ ] Form validation
- [ ] State persistence (localStorage)
- [ ] Error handling
- [ ] Unit tests (>90% coverage)

#### Page 3: Live Match (Week 6, Days 1-2)
- [ ] Score display (48px mono)
- [ ] Match progress bar (animated)
- [ ] Match statistics section
- [ ] Timeline component (scrollable)
- [ ] Event cards (all 8 event types)
- [ ] Top performers section
- [ ] Formation display (current positions)
- [ ] Match controls (Pause, Play, Skip)
- [ ] WebSocket integration (or polling)
- [ ] Real-time updates
- [ ] Responsive layout
- [ ] All animations smooth (60fps)
- [ ] Unit tests
- [ ] Component tests (Timeline events)

#### Page 4: Results (Week 6, Days 2-3)
- [ ] Final score display (56px)
- [ ] Goal details section
- [ ] Match statistics table
- [ ] Your team performance section
- [ ] Top performers (3× PlayerCard detailed)
- [ ] Lowest performers list
- [ ] Full match timeline
- [ ] Next match preview card
- [ ] Action buttons
- [ ] All components integrated
- [ ] Responsive at all breakpoints
- [ ] Data loading states
- [ ] Error states
- [ ] Unit tests

#### Page 5: Season Dashboard (Week 6, Days 4-5)
- [ ] Standings table (sticky header + column)
- [ ] 20 teams displayed
- [ ] Zone highlighting (4 color zones)
- [ ] Trend indicators (arrows)
- [ ] Sort/filter controls
- [ ] Recent results carousel
- [ ] Upcoming matches carousel
- [ ] Season statistics panel
- [ ] Legend explanation
- [ ] Click interactions (team details)
- [ ] Responsive table (mobile: 4 cols)
- [ ] Sorting functionality
- [ ] Export button (CSV)
- [ ] Unit tests

### Cross-Page Verification
- [ ] Navigation works between all 5 pages
- [ ] Header/Sidebar consistent
- [ ] Dark theme applied everywhere
- [ ] Color contrast >4.5:1 verified
- [ ] Font sizes readable at all breakpoints
- [ ] Images optimized (WebP + fallback)
- [ ] No console errors/warnings
- [ ] Performance metrics:
  - [ ] Dashboard: <1.5s load
  - [ ] Lineup: <1.5s load
  - [ ] Live Match: <2s initial, <100ms updates
  - [ ] Results: <1.5s load
  - [ ] Season: <1.5s load
- [ ] Mobile navigation intuitive
- [ ] Tablet breakpoint optimal
- [ ] Desktop grid system consistent

### Accessibility Audit
- [ ] Keyboard navigation (Tab order)
- [ ] Focus indicators visible
- [ ] ARIA labels on icons
- [ ] Form labels associated
- [ ] Color not only method (icons + text)
- [ ] prefers-reduced-motion respected
- [ ] Dynamic content updates announced
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Landmark regions used

### Testing & Documentation
- [ ] All components have >80% unit test coverage
- [ ] Component interaction tests passing
- [ ] Page integration tests passing
- [ ] E2E tests (critical user journeys)
- [ ] Responsive design tested
- [ ] Storybook complete (50+ stories)
- [ ] README documentation complete
- [ ] TypeScript types exported
- [ ] JSDoc comments on complex functions

---

## SUMMARY

Phase 3 successfully integrates all Phase 2 components into **5 fully-functional pages** that deliver the complete Cartola Elifoot experience:

1. **Dashboard** - Home/overview with quick access to all features
2. **Lineup Selection** - Interactive team customization with formation
3. **Live Match** - Real-time match simulation with dynamic updates
4. **Results** - Post-match analysis with detailed statistics
5. **Season Dashboard** - League standings and historical data

**Key Success Metrics:**
- All 10 Phase 2 components properly utilized
- Responsive design at 375px, 768px, 1440px
- WCAG AA accessibility compliance
- Professional Football Manager aesthetic
- Fast navigation (2-3 clicks to any page)
- Smooth animations (60fps)
- Complete test coverage (>80%)

**Timeline:** Weeks 5-6 (10 development days)

**Status:** Ready for implementation. Begin with Dashboard (highest priority - entry point), followed by Lineup Selection (critical path), then Live Match/Results/Season in parallel.

---

**DESIGNER AUDIT COMPLETE**  
Ready for CODER implementation  
Last Updated: 2026-06-01

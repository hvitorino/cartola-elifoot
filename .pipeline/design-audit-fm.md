# Cartola Elifoot Design Audit
## Football Manager-Inspired Design System Implementation Guide

**Audit Status**: Ready for Implementation  
**Target**: Transform Cartola Elifoot into a professional Football Manager-inspired interface  
**Scope**: Visual design, component system, and technical specifications  
**Handoff**: To PLANNER for detailed technical implementation breakdown

---

## 1. Visual Requirements Checklist

### 1.1 Dark Theme Color Palette Implementation

**Core Color Variables to Create** (Priority: CRITICAL)

```
✓ Dark Backgrounds (4 levels)
  - DARK_BG_PRIMARY:     #0f1419  (Main background, cards)
  - DARK_BG_SECONDARY:   #1a2332  (Hover states, alternate sections)
  - DARK_BG_TERTIARY:    #252d3d  (Borders, subtle contrast)
  - DARK_BG_ELEVATED:    #2a3545  (Modals, overlays, prominent cards)

✓ Accent Colors (Action & Status)
  - PRIMARY_ACCENT:      #4a9eff  (Primary actions, links, active states)
  - SECONDARY_ACCENT:    #6bbf59  (Success, gains, positive stats)
  - WARNING_ACCENT:      #ffb84d  (Caution, injuries, warnings)
  - DANGER_ACCENT:       #ff5c5c  (Errors, losses, critical alerts)
  - TERTIARY_ACCENT:     #9d84b7  (Formation highlights, tactical displays)

✓ Semantic Colors (Consistent status meanings)
  - SUCCESS:             #6bbf59  (Green - Won match, positive metrics)
  - WARNING:             #ffb84d  (Amber - Injured player, caution)
  - DANGER:              #ff5c5c  (Red - Lost match, critical issues)
  - INFO:                #4a9eff  (Blue - Transfers, notifications)
  - NEUTRAL:             #8b95a5  (Gray - Disabled, historical data)

✓ Text Colors (High contrast for readability)
  - TEXT_PRIMARY:        #f0f2f5  (Main text, high contrast)
  - TEXT_SECONDARY:      #a8adb8  (Secondary info, labels)
  - TEXT_TERTIARY:       #7a8190  (Disabled, muted text)
  - TEXT_HIGHLIGHT:      #ffffff  (Bold numbers, emphasis)

✓ Formation/Tactical Colors (Role-specific)
  - FORMATION_DEFENDER:  #5b9fd8  (Blue - Defenders)
  - FORMATION_MIDFIELDER:#8b7fd8  (Purple - Midfielders)
  - FORMATION_FORWARD:   #d85b5b  (Red - Forwards)
  - FORMATION_GOALKEEPER:#4a9eff  (Cyan - Goalkeeper)

✓ Gradients
  - GRADIENT_ACCENT:     linear-gradient(135deg, #4a9eff 0%, #9d84b7 100%)
  - GRADIENT_SUCCESS:    linear-gradient(135deg, #6bbf59 0%, #4a9eff 100%)
  - GRADIENT_DANGER:     linear-gradient(135deg, #ff5c5c 0%, #ffb84d 100%)
```

**Implementation Location**: `/styles/_variables.css` or CSS-in-JS configuration

**Testing Checklist**:
- [ ] Color contrast ratios meet WCAG AA (4.5:1 minimum for normal text)
- [ ] All colors accessible for colorblind users (use tools like WebAIM)
- [ ] Dark backgrounds don't cause eye strain on extended viewing
- [ ] Accent colors maintain visibility against dark backgrounds

---

### 1.2 Typography System

**Font Stack Implementation**

```
✓ Primary Font: Inter (Clean, professional, 400/500/600/700 weights)
  - Import: Google Fonts or self-hosted
  - Fallback stack: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif
  - Usage: All UI text, labels, buttons, body content

✓ Number/Mono Font: IBM Plex Mono (For scores, stats, jersey numbers)
  - Import: Google Fonts or self-hosted
  - Fallback stack: 'Courier New', monospace
  - Usage: Exclusively for statistics, scores, player numbers (perfect alignment)
```

**Type Scale Definition**

```
HEADINGS
┌────────────────────────────────────────────────────────┐
│ H1 (Page Title)                                        │
│ 32px / 40px line-height | 700 weight | TEXT_PRIMARY   │
│ Usage: Dashboard, Lineup, Matches, League screens     │
│                                                        │
│ H2 (Section Header)                                    │
│ 24px / 32px line-height | 600 weight | TEXT_PRIMARY   │
│ Usage: Card headers, major sections within pages      │
│                                                        │
│ H3 (Card Title)                                        │
│ 18px / 24px line-height | 600 weight | TEXT_PRIMARY   │
│ Usage: Player cards, match cards, stats panels        │
│                                                        │
│ H4 (Label/Subtitle)                                    │
│ 14px / 20px line-height | 600 weight | TEXT_SECONDARY │
│ Usage: Formation names, status labels, mini-headers   │
└────────────────────────────────────────────────────────┘

BODY TEXT
┌────────────────────────────────────────────────────────┐
│ Body Large: 16px / 24px | 400 weight | TEXT_PRIMARY   │
│ → Match descriptions, detailed information            │
│                                                        │
│ Body Regular: 14px / 20px | 400 weight | TEXT_PRIMARY │
│ → Most content, card descriptions, team info         │
│                                                        │
│ Body Small: 12px / 16px | 400 weight | TEXT_SECONDARY │
│ → Secondary information, timestamps, hints           │
└────────────────────────────────────────────────────────┘

STATISTICS (Monospace - IBM Plex Mono)
┌────────────────────────────────────────────────────────┐
│ Stat Number: 24px / 32px | 700 weight | monospace    │
│ Letter-spacing: -0.02em | TEXT_HIGHLIGHT              │
│ → Points, goals, ratings, jersey numbers              │
│                                                        │
│ Score Large: 48px / 56px | 700 weight | monospace    │
│ → Match scores, final results (prominent display)     │
│                                                        │
│ Stat Small: 14px / 20px | 600 weight | monospace     │
│ → Player stats inline, mini metrics                   │
└────────────────────────────────────────────────────────┘

INTERACTIVE ELEMENTS
┌────────────────────────────────────────────────────────┐
│ Button Text: 14px / 20px | 600 weight | UPPERCASE    │
│ Letter-spacing: 0.05em | TEXT_PRIMARY                  │
│                                                        │
│ Link Text: 14px / 20px | 400 weight | PRIMARY_ACCENT  │
│ Text-decoration: underline on hover                    │
└────────────────────────────────────────────────────────┘
```

**Implementation Location**: `/styles/_typography.css`

**Testing Checklist**:
- [ ] Font files load without FOUT (Flash of Unstyled Text)
- [ ] Font weights (400, 500, 600, 700) all load correctly
- [ ] Monospace font aligns perfectly for numbers
- [ ] Line-heights create adequate spacing for readability
- [ ] Text is readable at all sizes (min 16px base)

---

### 1.3 Layout System

**Grid Foundation**

```
✓ Base Unit: 8px (all spacing must be multiples of 8)
  - xs:  4px    (tight spacing, micro-interactions)
  - sm:  8px    (compact spacing)
  - md:  16px   (standard spacing)
  - lg:  24px   (generous spacing)
  - xl:  32px   (large section gaps)
  - 2xl: 48px   (major section separation)

✓ Responsive Breakpoints
  Desktop: 12-column grid | 1440px max width | 16px gutter
  Tablet:  8-column grid  | 768px breakpoint | 12px gutter
  Mobile:  4-column grid  | 375px breakpoint | 8px gutter
```

**Card System Standards**

```
✓ Border Radius
  - 8px:  Main cards, buttons, standard components
  - 12px: Large cards, modals, prominent containers
  - 4px:  Subtle borders, input fields

✓ Shadows (Elevation system)
  - Base:        0 4px 12px rgba(0, 0, 0, 0.3)   (Default card shadow)
  - Hover:       0 8px 24px rgba(0, 0, 0, 0.4)   (Elevated on interaction)
  - Modal:       0 16px 40px rgba(0, 0, 0, 0.5)  (Maximum elevation)

✓ Padding & Spacing
  - Standard card padding: 20px
  - Compact padding:       16px
  - Spacious padding:      24px (featured cards)
```

**Layout Implementation Examples**

Desktop Dashboard (12 columns):
```
┌─────────────────────────────────────────────────────────────────┐
│ TOP NAV: Logo, Navigation, Settings                             │
├─────────────────────────────────────────────────────────────────┤
│ HERO SECTION: Matchday, Your Score, Rank (Full width)          │
├────────────────────┬──────────────────┬───────────────────────┤
│ Lineup Stats       │ Formation View   │ Today's Matches       │
│ (6 cols)           │ (3 cols)         │ (3 cols)              │
├────────────────────┴──────────────────┴───────────────────────┤
│ Recent Matches: 3-column card layout (12 cols)                │
├─────────────────────────────────────────────────────────────────┤
│ League Standings: Scrollable table (12 cols)                    │
└─────────────────────────────────────────────────────────────────┘
```

Mobile Dashboard (4 columns):
```
┌──────────────────────┐
│ TOP NAV: Logo [≡]    │
├──────────────────────┤
│ HERO SECTION         │
│ Matchday + Score     │
├──────────────────────┤
│ Lineup (4 cols full) │
├──────────────────────┤
│ Formation (4 cols)   │
├──────────────────────┤
│ Recent Matches:      │
│ ┌────────────────┐   │
│ │ Match 1 (full) │   │
│ └────────────────┘   │
│ ┌────────────────┐   │
│ │ Match 2 (full) │   │
│ └────────────────┘   │
├──────────────────────┤
│ Standings (scroll)   │
└──────────────────────┘
```

**Implementation Location**: `/styles/_layout.css` + `/styles/_grid.css`

**Testing Checklist**:
- [ ] Desktop layout renders correctly at 1440px width
- [ ] Tablet layout adapts properly at 768px breakpoint
- [ ] Mobile layout works at 375px (iPhone SE width)
- [ ] All spacing follows 8px base unit
- [ ] Cards have correct padding and margins
- [ ] Responsive images/placeholders scale correctly

---

### 1.4 Component Redesigns Required

#### Player Cards (3 Variants Needed)

**1. Compact Variant** (Lineup list, formation board)
```
┌────────────┐
│ ◉ 9        │ Jersey number overlay
│            │ Player in circular formation view
│            │ NO text labels (visual only)
└────────────┘
Implementation: SVG circle or div with position absolute
```

**2. Standard Variant** (Lineup selection)
```
┌──────────────────────────┐
│ ◉ Cristiano Ronaldo  ✕   │ Close button
│   Manchester United       │
│   ST | Rating: 8.7        │
│                           │
│   Fitness: 95% ▓▓▓░       │ Progress bar
│   Form: ●●●●○             │ Form indicator
│                           │
│   Goals: 12 | Asst: 4     │ Monospace stats
│   Status: Fit ✓           │
│                           │
│   [SUBSTITUTE ▼] [SELECT] │
└──────────────────────────┘
```

**3. Detailed Variant** (Player popup/modal)
```
Full stats, performance history, injury details, tactical data
Shown in modal overlay with all comprehensive information
```

**Technical Requirements**:
- [ ] Component props: player data, variant type, clickable state
- [ ] Images with fallback avatars
- [ ] Status badge (FIT/INJURED/DOUBTFUL/RETURNING)
- [ ] Form indicator dots (visual system)
- [ ] Monospace stats display
- [ ] Hover/selected states with border and glow effect

---

#### Formation Visualization (New Component)

**Interactive Tactical Board**

```
Requirements:
✓ Canvas or SVG-based 11-player positioning system
✓ Position roles: GK, CB, LB, RB, LWB, RWB, CM, CDM, CAM, LW, RW, ST, CF
✓ Player nodes with:
  - Jersey number + Player name
  - Role-specific color coding
  - Click to view stats
  - Drag to reposition (valid positions only)
  - Hover to highlight stats overlay

✓ Formation selector (preset buttons):
  - 4-4-2, 4-3-3, 3-5-2, 5-3-2, 3-4-3, 4-2-3-1, etc.

✓ Tactical instructions dropdown:
  - Balanced, Attacking, Defensive

✓ Defensive level slider:
  - Very Defensive → Neutral → Very Attacking

✓ Real-time data display:
  - Formation name
  - Current instructions
  - Defensive level
  - Budget/Price validation
```

**Technical Requirements**:
- [ ] Canvas-based or SVG rendering
- [ ] Touch support for mobile
- [ ] Drag-and-drop with snapping to valid positions
- [ ] Position validation logic
- [ ] Animated player movements
- [ ] Keyboard navigation support

---

#### Match Timeline Component (New)

**Event Display System**

```
Real-time match events in chronological order (latest at top)

Event Types to Support:
✓ Goals ⚽ (with penalty indicator, assists, rating impact, points)
✓ Substitutions 🔄 (OFF: Player → ON: Player)
✓ Yellow Cards 🟡 (with offense description)
✓ Red Cards 🔴 (with offense description)
✓ Injuries 🩹 (player name, type of injury)
✓ Match milestones 🏁 (kickoff, halftime, fulltime)

Display Format Per Event:
┌─────────────────────────────────────┐
│ 34' ⚽ GOAL! Haaland (Penalty)      │
│     +8 pts                          │ Points gained
│     [Manchester United lead 2-1]    │ Match status
└─────────────────────────────────────┘

Each event shows:
- Match minute (left-aligned)
- Icon (event type)
- Brief description (bold, large text)
- Impact/details (secondary text)
- Match status update (if applicable)
```

**Technical Requirements**:
- [ ] Real-time event updates (WebSocket or polling)
- [ ] Event filtering by type
- [ ] Staggered animation on event entry
- [ ] Timestamp accuracy
- [ ] Mobile-optimized scrolling
- [ ] Archive of all match events

---

#### Statistics Panels (New Component)

**Player & Team Stats Display**

```
Panel Structure:
┌──────────────────────────┐
│ PLAYER STATS             │ H4 header
├──────────────────────────┤
│                          │
│ Shots on Target:    8    │ Stat with progress bar
│ ▓▓▓▓░░░░░░ (80%)        │
│                          │
│ Pass Accuracy:     88%   │
│ ▓▓▓▓▓▓▓▓░░ (88%)        │
│                          │
│ Tackles Won:        6    │
│ ▓▓▓▓▓░░░░░ (60%)        │
│                          │
└──────────────────────────┘

Requirements:
✓ Stat name (left) | Value (monospace right)
✓ Horizontal progress bar with percentage
✓ Color-coded bars (varies by stat type)
✓ Stat range validation (0-10, 0-100, etc.)
✓ Responsive layout (stacks on mobile)
```

**Technical Requirements**:
- [ ] Data-driven stat configuration
- [ ] Progress bar calculations
- [ ] Responsive stat density
- [ ] Real-time updates
- [ ] Mobile-friendly layout

---

#### Match Cards (Redesign)

**Current State** → **New Design**

```
NEW MATCH CARD LAYOUT:

┌──────────────────────────────────────┐
│                                      │
│  Matchday 15                Fri, Oct 28│ (H4 date label)
│                                      │
│      Manchester United  2  -  1      │ Large monospace score
│       Man Utd              Liverpool  │
│    (Haaland 2)             (Salah)   │
│                                      │
│  Possession: 52% vs 48%              │ Stats comparison bars
│  Shots: 18 vs 12                     │
│                                      │
│  Your Score: +42 pts                 │ Impact on user's points
│  Formation: 4-3-3                    │
│                                      │
│  [WATCH HIGHLIGHTS]  [DETAILED STATS]│ Action buttons
│                                      │
└──────────────────────────────────────┘

Requirements:
✓ Score displayed in large monospace (48px)
✓ Team names with shortened codes
✓ Goal scorers listed below scores
✓ Key stats (possession, shots) with visual bars
✓ User's points gain prominently displayed
✓ Formation reference
✓ Quick action buttons
✓ Status indicator (Upcoming/In Progress/Finished)
```

**Technical Requirements**:
- [ ] Responsive card layout
- [ ] Real-time score updates
- [ ] Player stats parsing and display
- [ ] Points calculation and display
- [ ] Status indicators
- [ ] Click handlers for detailed view

---

#### League Standings Table (Redesign)

**Current State** → **New Design**

```
NEW TABLE LAYOUT:

┌────┬───────────────────┬─────┬────┬────┬────┬──────┬───────┐
│ POS│ TEAM              │ GP  │ W  │ D  │ L  │ PTS  │ TREND │
├────┼───────────────────┼─────┼────┼────┼────┼──────┼───────┤
│  1 │ Manchester City   │ 15  │ 13 │ 2  │ 0  │  41  │  ↑    │
│  2 │ Arsenal           │ 15  │ 12 │ 2  │ 1  │  38  │  ↓    │
│  3 │ Newcastle United  │ 15  │ 11 │ 3  │ 1  │  36  │  →    │
│  4 │ Manchester United │ 15  │ 10 │ 2  │ 3  │  32  │  ↑    │
│  5 │ Liverpool         │ 15  │ 10 │ 2  │ 3  │  32  │  ↓    │
│...│                   │     │    │    │    │      │       │
│ 20 │ Luton Town        │ 15  │  1 │ 2  │ 12 │   5  │  ↓    │
└────┴───────────────────┴─────┴────┴────┴────┴──────┴───────┘

Requirements:
✓ Scrollable horizontally on mobile
✓ Sticky header (position: sticky)
✓ Sticky position column (left side)
✓ Color zones (green = promotion, yellow = playoff, red = relegation)
✓ Trend indicators (↑ ↓ →)
✓ Monospace numbers for perfect alignment
✓ Hover states highlight entire row
✓ Click to expand team details
```

**Technical Requirements**:
- [ ] Virtual scrolling for 20+ teams
- [ ] Sortable columns
- [ ] Filter functionality
- [ ] Sticky positioning (modern browsers)
- [ ] Horizontal scroll on mobile
- [ ] Real-time standings updates
- [ ] Zone coloring logic

---

## 2. Screen-by-Screen Changes

### 2.1 Dashboard/Home Screen

**Current Issues** → **Changes Needed**

```
VISUAL CHANGES:
┌─────────────────────────────────────────┐
│ Before (Light/Mixed theme)              │
│ - Unclear visual hierarchy              │
│ - Inconsistent spacing                  │
│ - Poor contrast in some areas           │
│ - Outdated button styles                │
│                                         │
│ After (Dark FM-style)                   │
│ - Professional dark background          │
│ - Clear hero section (score, matchday)  │
│ - 3-column layout (Lineup | Formation | Today)
│ - Recent matches in grid                │
│ - League standings table below          │
│ - Smooth transitions                    │
└─────────────────────────────────────────┘

SPECIFIC CHANGES:
1. Hero Section (NEW)
   - Matchday label (H4)
   - Your Score in large monospace (48px)
   - Rank and change (+5 pts) displayed
   - Full-width, prominent positioning
   - Background: DARK_BG_SECONDARY

2. Lineup Overview Card (REDESIGNED)
   - Show: 11 Selected status
   - Average fitness percentage
   - Formation name
   - Status: CONFIRMED ✓ with success color
   - Average rating with visual indicators

3. Formation Visualization (NEW COMPONENT)
   - Interactive tactical board
   - Shows 11 players in current formation
   - Formation type selector
   - Position indicators (GK, CB, etc.)

4. Today's Matches Panel (NEW SECTION)
   - 3 upcoming matches in viewport
   - Minimal match cards (team names, time, status)
   - Scroll if more than 3 matches
   - Different styling for different statuses

5. Recent Matches Section (REDESIGNED)
   - Last 5 gameweeks in 3-column grid
   - Match cards with score, goals, your points
   - Monospace score display (24px)
   - Click to expand for details

6. League Standings (REDESIGNED)
   - Top 5 teams visible, scrollable
   - Zone coloring (promotion/playoff/relegation)
   - Trend indicators
   - Full table view button
```

**Layout Priority**: Desktop 12-col | Tablet 8-col | Mobile 4-col (stacked)

---

### 2.2 Lineup Selection Screen

**Current Issues** → **Changes Needed**

```
MAJOR REDESIGN:
Split-view layout: Tactical Board (LEFT) | Player Selection (RIGHT)

LEFT SIDE: Formation Visualization (60% width desktop)
- Interactive tactical board showing current 11 players
- Drag-and-drop to reposition (valid positions only)
- Click player to view/swap
- Formation preset buttons (4-4-2, 4-3-3, 3-5-2, etc.)
- Tactical instructions dropdown
- Defensive level slider

RIGHT SIDE: Player Selection Panel (40% width)
- Current selection summary
- Budget tracking (89.3M / 100M)
- Fitness status
- Rating distribution
- Available players by position
- Alternative options for selected player
- Quick-swap functionality

BOTTOM SECTION:
- Summary stats (Formation, Budget, Rating, Fitness)
- Action buttons: CLEAR SELECTION | PRESET FORMATIONS | CONFIRM LINEUP

CHANGES DETAILED:
1. Formation Board (NEW INTERACTIVE COMPONENT)
   - Canvas or SVG-based 11-player visualization
   - Position circles colored by role
   - Player name + rating on hover
   - Drag support for repositioning
   - Touch support for mobile
   - Keyboard navigation (arrow keys)

2. Player Stats Panel (NEW)
   - Quick stats for selected player
   - Price, fitness, status indicators
   - Form dots (●●●●○ system)
   - Alternative options section

3. Budget Display (REDESIGNED)
   - Large monospace numbers
   - Color: Green if under budget, Red if over
   - Remaining budget highlighted
   - Per-player price display

4. Summary Section (REDESIGNED)
   - Clear visual status
   - All key metrics at a glance
   - Mobile: stacked layout, collapsible summary
```

---

### 2.3 Match Simulation/Live Match Screen

**Current Issues** → **Changes Needed**

```
MAJOR REDESIGN:
Top-Down: Score | Match Progress | Event Timeline | Stats

TOP SECTION: Match Header
- Large score display (48px monospace)
- Team names with badges
- Match time (67' / 90')
- Half indicator
- Match status

MIDDLE SECTION: Match Progress
- Possession comparison (visual bars)
- Shots comparison
- Key stats bar
- Estimated finish time

TIMELINE SECTION: Match Events (MAIN FOCUS)
- Chronological events (latest at top)
- Each event: icon | time | description | impact
- Icons: ⚽ 🔄 🟡 🔴 🩹 🏁
- Color-coded by event type
- Staggered animation on entry

BOTTOM SECTION: Top Performers
- 3-5 best players this match
- Rating, goals, assists
- Your squad impact highlighted

CHANGES DETAILED:
1. Score Display (REDESIGNED)
   - Extra large monospace (56px)
   - Team names below scores
   - Color-coded (no longer neutral)

2. Match Timeline (NEW COMPONENT)
   - Real-time event updates
   - Scrollable event history
   - Filtering by event type
   - Archive all events

3. Progress Bars (REDESIGNED)
   - Visual possession/shots comparison
   - Color-coded by team
   - Percentage labels

4. Player Performance (NEW)
   - Top performers from both teams
   - Monospace stats
   - User's players highlighted

5. Mobile Layout
   - Stacked vertical
   - Timeline takes priority
   - Collapse stats sections
```

---

### 2.4 Match Results/Post-Match Screen

**Current Issues** → **Changes Needed**

```
MAJOR REDESIGN:
Full-width layout with scrollable content

TOP SECTION: Final Score
- Large monospace score display (56px)
- Team names
- Goal scorers list
- Highlighted user's team players

STATS SECTION: Match Statistics
- Comparison table (possession, shots, passes, etc.)
- Visual bars for each stat
- Percentage labels
- User's team highlighted

YOUR PERFORMANCE SECTION:
- Your team score (with rank impact)
- Top performers from your lineup
- Lowest performers
- Individual stat contributions (+25.3 pts, etc.)

BOTTOM SECTION: Actions
- Share result
- View detailed timeline
- View player statistics
- Next match info

CHANGES DETAILED:
1. Final Score (REDESIGNED)
   - Larger, more prominent (56px)
   - Color-coded team backgrounds
   - Player highlighting for user's squad

2. Stats Table (REDESIGNED)
   - Two-column layout (Team A vs Team B)
   - Visual comparison bars
   - Monospace numbers
   - Your team highlighted in primary accent

3. Player Performance (NEW COMPONENT)
   - Top performers card
   - Lowest performers card
   - Individual point contributions
   - Rating changes

4. Mobile Layout
   - Scrollable full-width
   - Collapsible sections
   - Full-width score display
```

---

### 2.5 League Standings Screen

**Current Issues** → **Changes Needed**

```
TABLE REDESIGN:
Full-width scrollable table with sticky elements

HEADER SECTION:
- Matchday indicator (15 of 38)
- Season year
- View options (sort, filter, export)

TABLE SECTION:
- Position column (sticky left)
- Team name with badge
- GP, W, D, L columns
- Points (large, monospace)
- Trend indicator (↑ ↓ →)
- Horizontal scroll on mobile
- Row hover effect
- Click to view team details

LEGEND/ZONES:
- Color zones: Green (promotion), Yellow (playoff), Red (relegation)
- Explained at bottom of table

ADDITIONAL INFO:
- Top scorer
- Most assists
- Best defense
- Worst defense
- Goal difference leaders

CHANGES DETAILED:
1. Table Layout (REDESIGNED)
   - Sticky position column
   - Scrollable stat columns
   - Better mobile experience
   - Virtual scrolling (if 20+ teams)

2. Zone Coloring (NEW)
   - Visual background coloring for zones
   - Legend clearly displayed
   - Accessible color contrast maintained

3. Sorting/Filtering (NEW)
   - Sort by: Points, GD, Form, etc.
   - Filter by: Zone, team name
   - Persistent state

4. Additional Stats (ADDED)
   - Card at bottom with league records
   - Top scorer, assists, defenses
   - Linked to player detail views
```

---

## 3. Component Library Needed

### Core Components to Create

#### 3.1 Button Component (`/components/Button/`)

```
Variants:
- Primary (bg-PRIMARY_ACCENT, white text)
- Secondary (border-PRIMARY_ACCENT, text-PRIMARY_ACCENT)
- Danger (bg-DANGER_ACCENT, white text)
- Disabled (opacity 0.4, cursor not-allowed)

States:
- Default: subtle shadow
- Hover: elevated shadow, 1.02 scale
- Active: inset shadow
- Focus: 2px border outline
- Loading: spinner overlay, disabled state

Sizes:
- Small: 12px font, 8px padding
- Medium: 14px font, 12px padding (default)
- Large: 16px font, 16px padding

Props: variant, size, disabled, loading, onClick, children
```

**File**: `/components/Button/Button.tsx` + `.module.css` + `.stories.tsx`

---

#### 3.2 PlayerCard Component (`/components/PlayerCard/`)

```
Variants:
1. Compact (Formation view)
   - Jersey number + circle
   - No text labels
   - Role color coding

2. Standard (Lineup list)
   - Image/avatar
   - Name, team, position
   - Rating, fitness bar
   - Form dots
   - Status badge
   - Action buttons

3. Detailed (Modal/popup)
   - Full player info
   - Complete stats
   - Injury history
   - Performance graph
   - Tactical data

Props:
- player (object with all data)
- variant ('compact' | 'standard' | 'detailed')
- selected (boolean)
- onSelect, onSwap callbacks
- hidePrice (boolean)

States:
- Selected: border-PRIMARY_ACCENT, glow shadow
- Hovering: elevated shadow, slight scale
- Dragging: opacity 0.8, large shadow
```

**Files**: `/components/PlayerCard/` (multiple variants)

---

#### 3.3 FormationBoard Component (`/components/FormationBoard/`)

```
Props:
- players (array of 11 player objects)
- formation (string: '4-4-2', '4-3-3', etc.)
- editable (boolean)
- onPlayerClick, onPositionChange callbacks

Features:
- Canvas/SVG rendering
- Position circles colored by role
- Jersey number + player name
- Drag-and-drop repositioning
- Position validation
- Formation preset selector
- Tactical instructions dropdown
- Defensive level slider
- Real-time budget validation

States:
- Editable: drag enabled, position feedback
- Locked: drag disabled, read-only
- Hovering: player stats overlay appears
- Invalid position: error indicator, snap back
```

**Files**: `/components/FormationBoard/FormationBoard.tsx` + utilities for SVG rendering

---

#### 3.4 MatchTimeline Component (`/components/MatchTimeline/`)

```
Props:
- events (array of match events)
- matchTime (current minute)
- status ('upcoming' | 'live' | 'finished')
- userPlayerIds (array for highlighting)

Event Types:
- GOAL (with penalty flag, assists, rating impact, points)
- SUBSTITUTION (OFF player, ON player)
- YELLOW_CARD (offense description)
- RED_CARD (offense description)
- INJURY
- KICKOFF
- HALF_TIME
- FULL_TIME

Features:
- Real-time event updates
- Staggered animation on new events
- Event filtering by type
- Chronological ordering (latest at top)
- Highlight user's players
- Show impact (points, rating change)
- Scrollable list

Display Per Event:
┌─────────────────────────────────┐
│ minute' icon DESCRIPTION        │
│         secondary text          │
│         [player highlight]      │
└─────────────────────────────────┘
```

**Files**: `/components/MatchTimeline/MatchTimeline.tsx` + event renderer components

---

#### 3.5 StatPanel Component (`/components/StatPanel/`)

```
Props:
- stats (array of {name, value, max, unit})
- type ('player' | 'team')
- title (H4 label)
- columns (1 or 2 column layout)

Features:
- Stat name | Value (monospace right-aligned)
- Progress bar below value
- Percentage label
- Color-coded bars by stat type
- Responsive layout (stacks on mobile)
- Real-time updates

Stat Configuration:
{
  name: "Shots on Target",
  value: 8,
  max: 10,
  unit: "shots",
  color: "info" // or custom hex
}
```

**Files**: `/components/StatPanel/StatPanel.tsx` + `.module.css`

---

#### 3.6 MatchCard Component (`/components/MatchCard/`)

```
Props:
- match (object with teams, score, stats, players)
- userTeamId (to highlight)
- userScore (points gained)
- size ('compact' | 'standard' | 'expanded')
- status ('upcoming' | 'live' | 'finished')
- onClick (expand details)

Variants:
1. Compact (List item)
   - Minimal display
   - Team names + score
   - Status indicator

2. Standard (Card)
   - Score (large monospace)
   - Team names
   - Goal scorers
   - Possession/shots bars
   - User's points
   - Action buttons

3. Expanded (Modal/full)
   - All match data
   - Timeline
   - Stats
   - Player performances

Features:
- Color-coded status (upcoming, live, finished)
- Real-time score updates
- Goal scorer parsing
- User's team highlighting
- Quick detail view
- Monospace score display
```

**Files**: `/components/MatchCard/MatchCard.tsx` + variants

---

#### 3.7 StandingsTable Component (`/components/StandingsTable/`)

```
Props:
- standings (array of teams with stats)
- userTeamId (highlight)
- maxHeight (for virtual scroll)
- sortBy ('points' | 'gd' | 'form' | etc.)
- onTeamClick (expand team details)

Features:
- Sticky position column (left)
- Horizontal scroll on mobile
- Sortable columns
- Filterable by zone/region
- Zone coloring (promotion/playoff/relegation)
- Trend indicators
- Virtual scrolling (20+ teams)
- Row hover effect
- Click to expand team

Display Columns:
- POS (sticky, left)
- TEAM (with badge)
- GP, W, D, L
- PTS (large, monospace, primary)
- TREND

Colors/Zones:
- Top 4: Green (#6bbf59 tint)
- 5-8: Yellow (#ffb84d tint)
- Bottom 3: Red (#ff5c5c tint)
```

**Files**: `/components/StandingsTable/StandingsTable.tsx` + column components

---

#### 3.8 StatusBadge Component (`/components/StatusBadge/`)

```
Props:
- status ('fit' | 'injured' | 'doubtful' | 'returning' | 'suspended')
- size ('sm' | 'md' | 'lg')

Display:
┌─────────────┐
│ ✓ FIT       │ Green
│ ⚠ DOUBTFUL  │ Amber
│ ✕ INJURED   │ Red
│ 🔄 RETURNING│ Blue
│ ⛔ SUSPENDED│ Gray
└─────────────┘

Features:
- Color-coded by status
- Icon + text
- Badge background
- WCAG AA contrast
```

**Files**: `/components/StatusBadge/StatusBadge.tsx`

---

#### 3.9 FormIndicator Component (`/components/FormIndicator/`)

```
Props:
- rating (1-5)
- size ('sm' | 'md' | 'lg')

Display:
●●●●●  Excellent (all filled)
●●●●○  Good
●●●○○  Average
●●○○○  Poor

Features:
- Visual dots (filled/empty)
- Color-coded (green-yellow-red gradient)
- No text, pure visual
- Responsive sizing
```

**Files**: `/components/FormIndicator/FormIndicator.tsx`

---

#### 3.10 Layout Components

**Header/Navigation** (`/components/Header/`)
```
Props: currentPage, onPageChange, onSettings

Features:
- Logo + app title left
- Navigation tabs center
- Settings icon right
- Tab active indicator (underline, bold)
- Mobile hamburger menu
- Sticky top positioning
```

**Sidebar Navigation** (Mobile only, `/components/Sidebar/`)
```
Props: isOpen, onClose, onNavigate

Features:
- Drawer overlay
- Menu items + icons
- Settings, Help, Logout
- Close on item selection
- Smooth slide animation
```

**Card Container** (`/components/Card/`)
```
Props: padding, elevated, selected, children

Features:
- Border radius (8px default)
- Shadow system
- Padding options
- Hover elevation
- Selected state styling
```

---

## 4. Implementation Priority Matrix

### Priority Level: HIGH (Foundation - Must Complete First)

```
ESTIMATED TIMELINE: 2-3 weeks

[ ] CSS Variables System
    └─ Colors, spacing, typography, shadows
    └─ Single source of truth for design tokens
    └─ Estimated: 3-4 days

[ ] Typography System
    └─ Font imports (Inter + IBM Plex Mono)
    └─ Type scale definitions (H1-H4, Body, Stats)
    └─ Font loading optimization
    └─ Estimated: 2-3 days

[ ] Layout & Grid System
    └─ 12/8/4 column responsive grid
    └─ Spacing scale (xs-2xl)
    └─ Breakpoint setup
    └─ Estimated: 2-3 days

[ ] Color Palette Implementation
    └─ All 20+ color variables
    └─ Dark theme backgrounds
    └─ Accent colors
    └─ Text colors by hierarchy
    └─ Formation role colors
    └─ Estimated: 1-2 days

[ ] Basic Button Component
    └─ All variants (Primary, Secondary, Danger, Disabled)
    └─ All states (Default, Hover, Active, Focus, Loading)
    └─ Sizes (Small, Medium, Large)
    └─ Estimated: 2-3 days

[ ] Form Inputs & Controls
    └─ Text input, select, checkbox, radio
    └─ All states (Default, Focus, Valid, Invalid, Disabled)
    └─ Estimated: 2-3 days

BLOCKERS: None - can start immediately
SUCCESS CRITERIA: Design tokens work across all future components
```

---

### Priority Level: MEDIUM (Core Components - Parallel Work Possible)

```
ESTIMATED TIMELINE: 3-4 weeks (parallel with HIGH priority)

[ ] PlayerCard Component (All Variants)
    └─ Compact: Formation board circles
    └─ Standard: Lineup selection cards
    └─ Detailed: Modal popup
    └─ Status badges, form indicators
    └─ Estimated: 4-5 days

[ ] FormationBoard Component
    └─ SVG/Canvas rendering
    └─ 11-player positioning
    └─ Drag-and-drop
    └─ Position validation
    └─ Touch support
    └─ Formation presets
    └─ Estimated: 5-7 days

[ ] MatchCard Component
    └─ Compact variant (list)
    └─ Standard variant (grid)
    └─ Score display (monospace 24-48px)
    └─ Goal scorers parsing
    └─ Stats bars
    └─ Estimated: 3-4 days

[ ] MatchTimeline Component
    └─ Event rendering
    └─ Real-time updates
    └─ Event filtering
    └─ Staggered animation
    └─ Estimated: 3-4 days

[ ] StatPanel Component
    └─ Stat rows with bars
    └─ Progress bar logic
    └─ Color coding
    └─ Responsive layout
    └─ Estimated: 2-3 days

[ ] StandingsTable Component
    └─ Table structure with sticky columns
    └─ Virtual scrolling (if needed)
    └─ Sorting/filtering
    └─ Zone coloring
    └─ Mobile horizontal scroll
    └─ Estimated: 4-5 days

[ ] Layout Components (Header, Sidebar, Card)
    └─ Navigation structure
    └─ Tab active states
    └─ Mobile hamburger
    └─ Card container variants
    └─ Estimated: 2-3 days

BLOCKERS: All HIGH priority items must be complete first
SUCCESS CRITERIA: All components render with design tokens, responsive layouts work
```

---

### Priority Level: LOW (Polish & Refinement)

```
ESTIMATED TIMELINE: 2-3 weeks (final phase)

[ ] Animation System
    └─ Fade in (page load) - 300ms
    └─ Slide up (card entry) - 300ms
    └─ Pulse (status alert) - 2s infinite
    └─ Progress fill (match time) - 45s linear
    └─ Scale bounce (goal scored) - 400ms
    └─ Rotation (spinner) - 1s infinite
    └─ Match event slide in - 300ms staggered
    └─ Formation player reposition - 250ms
    └─ Estimated: 3-4 days

[ ] Interactive States
    └─ Hover effects (cards, buttons, rows)
    └─ Focus states (keyboard navigation)
    └─ Selected states (with glow)
    └─ Loading states (spinners, placeholders)
    └─ Error states (borders, messages)
    └─ Estimated: 2-3 days

[ ] Responsive Design
    └─ Mobile layout testing (375px width)
    └─ Tablet layout testing (768px width)
    └─ Desktop testing (1440px width)
    └─ Touch optimization
    └─ Image responsive sizing
    └─ Estimated: 3-4 days

[ ] Dark Mode Refinement
    └─ Contrast ratio validation (WCAG AA minimum 4.5:1)
    └─ Eye strain testing
    └─ Color brightness adjustments if needed
    └─ Light mode fallback (if required)
    └─ Estimated: 1-2 days

[ ] Performance Optimization
    └─ Image optimization
    └─ CSS minification
    └─ Font subsetting
    └─ Virtual scrolling for long lists
    └─ Estimated: 2-3 days

[ ] Accessibility Audit
    └─ Keyboard navigation testing
    └─ Screen reader compatibility
    └─ Color contrast validation
    └─ Focus indicators
    └─ ARIA labels
    └─ Estimated: 2-3 days

BLOCKERS: All MEDIUM priority items should be complete
SUCCESS CRITERIA: Smooth, polished experience; full accessibility; responsive across devices
```

---

## 5. Design Tokens Required

### 5.1 Color Tokens

```css
/* CSS Variables Structure */

/* Dark Backgrounds */
--dark-bg-primary:     #0f1419;  /* Main background, cards */
--dark-bg-secondary:   #1a2332;  /* Hover states, alternate sections */
--dark-bg-tertiary:    #252d3d;  /* Borders, subtle contrast */
--dark-bg-elevated:    #2a3545;  /* Modals, overlays, prominent cards */

/* Accent Colors */
--primary-accent:      #4a9eff;  /* Primary actions, links, active states */
--secondary-accent:    #6bbf59;  /* Success, gains, positive stats */
--warning-accent:      #ffb84d;  /* Caution, injuries, warnings */
--danger-accent:       #ff5c5c;  /* Errors, losses, critical alerts */
--tertiary-accent:     #9d84b7;  /* Formation highlights, tactical displays */

/* Text Colors */
--text-primary:        #f0f2f5;  /* Main text, high contrast */
--text-secondary:      #a8adb8;  /* Secondary info, labels */
--text-tertiary:       #7a8190;  /* Disabled, muted text */
--text-highlight:      #ffffff;  /* Bold numbers, emphasis */

/* Formation Role Colors */
--formation-defender:  #5b9fd8;  /* Defenders */
--formation-midfielder:#8b7fd8;  /* Midfielders */
--formation-forward:   #d85b5b;  /* Forwards */
--formation-goalkeeper:#4a9eff;  /* Goalkeepers */

/* Semantic Colors (Aliases) */
--color-success:       #6bbf59;
--color-warning:       #ffb84d;
--color-danger:        #ff5c5c;
--color-info:          #4a9eff;
--color-neutral:       #8b95a5;

/* Gradients */
--gradient-accent:     linear-gradient(135deg, #4a9eff 0%, #9d84b7 100%);
--gradient-success:    linear-gradient(135deg, #6bbf59 0%, #4a9eff 100%);
--gradient-danger:     linear-gradient(135deg, #ff5c5c 0%, #ffb84d 100%);
```

**Verification Checklist**:
- [ ] All colors have WCAG AA contrast (4.5:1 minimum)
- [ ] Color naming is consistent and logical
- [ ] Aliases reduce confusion for developers
- [ ] Gradients work with all browser versions

---

### 5.2 Spacing Tokens

```css
/* 8px Base Unit System */

--space-xs:   4px;
--space-sm:   8px;
--space-md:   16px;
--space-lg:   24px;
--space-xl:   32px;
--space-2xl:  48px;
--space-3xl:  64px;

/* Commonly Used Pairs (margin/padding combinations) */
--spacing-tight:      4px;   /* Micro-interactions */
--spacing-compact:    8px;   /* Button padding, card gaps */
--spacing-standard:   16px;  /* Default spacing *)
--spacing-generous:   24px;  /* Section gaps *)
--spacing-large:      32px;  /* Large gaps *)
--spacing-xlarge:     48px;  /* Major separations *)
```

---

### 5.3 Typography Tokens

```css
/* Font Families */
--font-body:  'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono:  'IBM Plex Mono', 'Courier New', monospace;

/* Heading Styles */
--h1: {
  font-size: 32px;
  line-height: 40px;
  font-weight: 700;
  font-family: var(--font-body);
  color: var(--text-primary);
}

--h2: {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--text-primary);
}

--h3: {
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--text-primary);
}

--h4: {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--text-secondary);
}

/* Body Text Styles */
--body-large: {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  font-family: var(--font-body);
  color: var(--text-primary);
}

--body-regular: {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-family: var(--font-body);
  color: var(--text-primary);
}

--body-small: {
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  font-family: var(--font-body);
  color: var(--text-secondary);
}

/* Stat/Monospace Styles */
--stat-number: {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--text-highlight);
  letter-spacing: -0.02em;
}

--score-large: {
  font-size: 48px;
  line-height: 56px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--text-highlight);
  letter-spacing: -0.02em;
}

--stat-small: {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--text-highlight);
}

/* Button Text */
--button-text: {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  font-family: var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Link Text */
--link-text: {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  font-family: var(--font-body);
  color: var(--primary-accent);
  text-decoration: none;
}
--link-text:hover {
  text-decoration: underline;
}
```

---

### 5.4 Shadow & Elevation System

```css
/* Elevation Levels */
--shadow-sm:  0 4px 12px rgba(0, 0, 0, 0.3);   /* Default card */
--shadow-md:  0 8px 24px rgba(0, 0, 0, 0.4);   /* Hover/elevated */
--shadow-lg:  0 16px 40px rgba(0, 0, 0, 0.5);  /* Modal/highest */

/* Accent Glow (Hover States) */
--shadow-accent-sm:  0 0 8px rgba(74, 158, 255, 0.2);
--shadow-accent-md:  0 0 16px rgba(74, 158, 255, 0.3);
--shadow-accent-lg:  0 0 24px rgba(74, 158, 255, 0.4);

/* Success Glow */
--shadow-success-md:  0 0 16px rgba(107, 191, 89, 0.3);

/* Danger Glow */
--shadow-danger-md:   0 0 16px rgba(255, 92, 92, 0.3);

/* Inset Shadow (Pressed State) */
--shadow-inset:      inset 0 2px 4px rgba(0, 0, 0, 0.3);
```

---

### 5.5 Border & Corner Radius Tokens

```css
/* Border Radius */
--radius-sm:    4px;   /* Subtle borders, inputs */
--radius-md:    8px;   /* Main cards, buttons */
--radius-lg:    12px;  /* Large cards, modals */
--radius-full:  9999px; /* Circles, pills */

/* Border Styles */
--border-color-primary:   var(--dark-bg-tertiary);
--border-color-accent:    var(--primary-accent);
--border-color-error:     var(--danger-accent);
--border-color-success:   var(--secondary-accent);

--border-1px:  1px solid var(--border-color-primary);
--border-2px:  2px solid var(--border-color-primary);
--border-accent: 2px solid var(--primary-accent);
```

---

### 5.6 Animation & Transition Tokens

```css
/* Transition Timings */
--transition-fast:   150ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
--transition-base:   200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
--transition-slow:   300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
--transition-slower: 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Common Transition Properties */
--transition-colors: background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
--transition-transform: transform var(--transition-fast);
--transition-shadow: box-shadow var(--transition-fast);
--transition-all: all var(--transition-base);

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn var(--transition-slow);

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
animation: slideUp var(--transition-slow);

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 92, 92, 0.7); }
  70% { box-shadow: 0 0 0 12px rgba(255, 92, 92, 0); }
}
animation: pulse 2s infinite;

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
animation: spin 1s linear infinite;
```

---

### 5.7 Layout & Grid Tokens

```css
/* Grid System */
--grid-columns-desktop: 12;
--grid-columns-tablet:  8;
--grid-columns-mobile:  4;

--grid-gutter-desktop:  16px;
--grid-gutter-tablet:   12px;
--grid-gutter-mobile:   8px;

--container-max-width: 1440px;

/* Breakpoints */
--breakpoint-mobile:  375px;
--breakpoint-tablet:  768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide:    1440px;

/* Media Queries (SCSS or CSS-in-JS) */
@media (min-width: var(--breakpoint-mobile)) {
  /* Mobile styles - 4 cols, 8px gutter */
}
@media (min-width: var(--breakpoint-tablet)) {
  /* Tablet styles - 8 cols, 12px gutter */
}
@media (min-width: var(--breakpoint-desktop)) {
  /* Desktop styles - 12 cols, 16px gutter */
}
```

---

## 6. Handoff to PLANNER: Technical Specifications

### 6.1 File Structure to Create

```
/styles (or styled-components/Tailwind config)
├── _variables.css          (ALL color, spacing, typography tokens)
├── _typography.css         (Font imports, type scale, font stacks)
├── _layout.css             (Grid system, responsive layouts)
├── _components.css         (Base button, input, card styles)
├── _animations.css         (Keyframes, transitions)
├── _dark-mode.css          (Dark theme overrides, if separate)
└── main.css                (Import all above)

/components
├── Button/
│   ├── Button.tsx          (Component logic)
│   ├── Button.module.css   (Styles)
│   └── Button.stories.tsx  (Storybook)
├── PlayerCard/
│   ├── PlayerCard.tsx
│   ├── PlayerCardCompact.tsx
│   ├── PlayerCardStandard.tsx
│   ├── PlayerCardDetailed.tsx
│   └── PlayerCard.module.css
├── FormationBoard/
│   ├── FormationBoard.tsx  (Main component)
│   ├── FormationBoard.module.css
│   ├── utils/svg.ts        (SVG rendering logic)
│   └── utils/validation.ts (Position validation)
├── MatchTimeline/
│   ├── MatchTimeline.tsx
│   ├── MatchEvent.tsx      (Individual event component)
│   └── MatchTimeline.module.css
├── StatPanel/
│   ├── StatPanel.tsx
│   └── StatPanel.module.css
├── MatchCard/
│   ├── MatchCard.tsx
│   ├── MatchCardCompact.tsx
│   ├── MatchCardStandard.tsx
│   └── MatchCard.module.css
├── StandingsTable/
│   ├── StandingsTable.tsx
│   ├── StandingsRow.tsx    (Individual row)
│   └── StandingsTable.module.css
├── StatusBadge/
│   ├── StatusBadge.tsx
│   └── StatusBadge.module.css
├── FormIndicator/
│   ├── FormIndicator.tsx
│   └── FormIndicator.module.css
├── Layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx         (Mobile nav)
│   ├── Card.tsx            (Container)
│   └── Layout.module.css
└── ...other components

/pages (or /screens)
├── Dashboard.tsx           (Home/overview)
├── Lineup.tsx              (Lineup selection)
├── LiveMatch.tsx           (Match simulation)
├── Results.tsx             (Post-match)
├── Standings.tsx           (League table)
└── ...other pages
```

---

### 6.2 Component Implementation Checklist

**Phase 1: Foundation (Week 1-2)**
- [ ] Create `/styles/_variables.css` with all tokens
- [ ] Create `/styles/_typography.css` with type scale
- [ ] Create `/styles/_layout.css` with grid system
- [ ] Create `/styles/_components.css` with base styles
- [ ] Create `/styles/_animations.css` with keyframes
- [ ] Test all variables in components
- [ ] Verify responsive breakpoints
- [ ] Accessibility testing (contrast ratios)

**Phase 2: Core Components (Week 3-4)**
- [ ] Button component (all variants, states)
- [ ] PlayerCard (all 3 variants)
- [ ] FormationBoard (SVG, drag-drop)
- [ ] MatchCard (all 3 sizes)
- [ ] MatchTimeline (event rendering)
- [ ] StatPanel (stat rows, bars)
- [ ] StandingsTable (sticky, virtual scroll)
- [ ] Layout components (Header, Sidebar, Card)

**Phase 3: Page Integration (Week 5-6)**
- [ ] Dashboard page (6-column grid layout)
- [ ] Lineup selection page (split view)
- [ ] Live match screen (timeline focus)
- [ ] Results/post-match page
- [ ] Standings page
- [ ] Mobile layouts for all pages
- [ ] Tablet layouts for all pages

**Phase 4: Polish (Week 7-8)**
- [ ] Animations (fade, slide, pulse, spin)
- [ ] Interactive states (hover, focus, active)
- [ ] Loading states (spinners, skeletons)
- [ ] Error states (validation, messages)
- [ ] Dark mode refinement
- [ ] Performance optimization
- [ ] Accessibility audit (keyboard, screen reader)

**Phase 5: Testing & Launch (Week 9)**
- [ ] User testing
- [ ] Bug fixes
- [ ] Browser compatibility
- [ ] Mobile device testing
- [ ] Performance testing
- [ ] Production deployment

---

### 6.3 Technical Dependencies

**Frontend Framework** (Assumed React):
- React 18+ (hooks, suspense)
- CSS Modules or styled-components
- TypeScript (for type safety)
- Storybook (component documentation)

**Libraries to Consider**:
- `react-dnd` or `@dnd-kit/core` (drag-and-drop for formation board)
- `recharts` or `visx` (progress bars, simple charts)
- `framer-motion` or `react-spring` (animations)
- `headless-ui` or `radix-ui` (accessible components)
- `react-virtual` (virtual scrolling for long lists)
- `zustand` or `jotai` (state management)

**Performance Considerations**:
- Lazy-load FormationBoard and MatchTimeline
- Image optimization (WebP, srcset)
- CSS minification
- Font subsetting (Inter + IBM Plex Mono)
- Virtual scrolling for 20+ team standings

---

### 6.4 Component Dependencies Graph

```
Foundation (Must Complete First)
├── _variables.css (Colors, spacing, typography, shadows)
├── _typography.css (Font scale, weights)
├── _layout.css (Grid, spacing, responsive)
└── Button component (Used by all pages)

Depends on Foundation ↓

PlayerCard ← (Uses Button, StatusBadge, FormIndicator)
├── StatusBadge ← (Uses Colors, Typography)
└── FormIndicator ← (Uses Colors, Spacing)

FormationBoard ← (Uses Colors, Button, PlayerCard)
├── SVG utilities
└── Position validation

MatchTimeline ← (Uses Colors, Typography, PlayerCard)
├── Event rendering
└── Real-time updates

StatPanel ← (Uses Colors, Typography, Spacing)
└── Progress bars

MatchCard ← (Uses Colors, Typography, Button, MatchTimeline)

StandingsTable ← (Uses Colors, Typography, Button)
├── StandingsRow
└── Virtual scrolling

Layout Components ← (Uses Colors, Button, Spacing)
├── Header
├── Sidebar
└── Card

Pages (Depend on All Components Above) ↓
├── Dashboard ← (Lineup, Formation, MatchCard, StandingsTable, StatPanel)
├── Lineup ← (FormationBoard, PlayerCard, Button)
├── LiveMatch ← (Score display, MatchTimeline, StatPanel)
├── Results ← (MatchCard, StatPanel, PlayerCard)
└── Standings ← (StandingsTable, Button)
```

---

### 6.5 Design System Testing Checklist

**Color Accuracy**:
- [ ] All 20+ colors implemented
- [ ] Verify hex values match design spec
- [ ] Test contrast ratios (WCAG AA minimum 4.5:1)
- [ ] Colorblind simulation (Protanopia, Deuteranopia, Tritanopia)

**Typography**:
- [ ] Inter font loads correctly (400, 500, 600, 700 weights)
- [ ] IBM Plex Mono loads correctly (400, 700 weights)
- [ ] All sizes render correctly (12px - 48px)
- [ ] Line-heights are appropriate
- [ ] Monospace numbers align perfectly

**Layout**:
- [ ] 12-column desktop grid (1440px max)
- [ ] 8-column tablet grid (768px breakpoint)
- [ ] 4-column mobile grid (375px breakpoint)
- [ ] All spacing follows 8px base unit
- [ ] Cards have correct padding/margins
- [ ] Gutters are correct per breakpoint

**Components**:
- [ ] Buttons: all variants + states working
- [ ] Cards: shadow elevation, padding, radius correct
- [ ] Inputs: focus states, errors, disabled states
- [ ] All interactive states smooth (no janky transitions)
- [ ] Hover effects consistent

**Responsive Design**:
- [ ] Desktop: 1440px width optimal
- [ ] Tablet: 768px breakpoint works
- [ ] Mobile: 375px works (iPhone SE width)
- [ ] Landscape orientation handled
- [ ] Images responsive + performant
- [ ] Touch targets minimum 44x44px

**Accessibility**:
- [ ] Keyboard navigation all pages
- [ ] Tab order logical (top-left → bottom-right)
- [ ] Focus indicators visible (3px minimum)
- [ ] ARIA labels on icons
- [ ] Form labels properly associated
- [ ] Color not sole differentiator
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)

**Performance**:
- [ ] Font files optimized (<100KB combined)
- [ ] CSS <150KB (minified)
- [ ] First Contentful Paint <2s
- [ ] Lighthouse score >90
- [ ] No layout shifts
- [ ] Smooth 60fps animations

---

## Summary for PLANNER

### What Has Been Determined

1. **Complete Visual Specification**: Dark theme color palette (20+ colors), typography system (Inter + IBM Plex Mono), layout grid (12/8/4 responsive)

2. **Component Library Blueprint**: 10+ components needed (Button, PlayerCard, FormationBoard, MatchTimeline, StatPanel, MatchCard, StandingsTable, StatusBadge, FormIndicator, Layout)

3. **Screen-by-Screen Changes**: 5 major screens identified (Dashboard, Lineup, Live Match, Results, Standings) with specific layout and component requirements

4. **Implementation Roadmap**: 
   - Phase 1 (Weeks 1-2): Foundation & CSS variables
   - Phase 2 (Weeks 3-4): Core components
   - Phase 3 (Weeks 5-6): Page integration
   - Phase 4 (Weeks 7-8): Polish & animations
   - Phase 5 (Week 9): Testing & launch

5. **Technical Structure**: File organization, component dependencies, responsive breakpoints, animation timings, accessibility standards

### What PLANNER Must Do

1. **Create Design Tokens File** (`/styles/_variables.css`)
   - All 20+ color variables
   - Spacing scale (xs-2xl)
   - Typography scale
   - Shadows, transitions, border radius

2. **Build Component Scaffolding**
   - Create component folder structure
   - Implement base Button component first
   - Document component props/interfaces
   - Set up Storybook for visual testing

3. **Establish Page Templates**
   - Create responsive grid layouts
   - Implement Header/Navigation
   - Set up responsive breakpoints
   - Test mobile/tablet/desktop views

4. **Parallel Component Development**
   - PlayerCard variants (compact, standard, detailed)
   - FormationBoard (with SVG rendering)
   - MatchTimeline (with real-time updates)
   - Other components per priority matrix

5. **Integration & Testing**
   - Page composition using components
   - Responsive design testing
   - Accessibility audit
   - Performance optimization

### Critical Success Factors

- **Color Implementation First**: All design tokens must be CSS variables or equivalent, used consistently
- **Component Isolation**: Build components in Storybook to verify design before page integration
- **Responsive Testing**: Test all breakpoints (375px, 768px, 1440px) continuously
- **Accessibility Compliance**: WCAG AA minimum for all colors and interactions
- **Dark Theme Focus**: This is the primary theme, light mode is secondary
- **Performance**: Monitor font loading, animations, virtual scrolling

---

**Status**: AUDIT COMPLETE - Ready for PLANNER implementation phase

**Next Step**: PLANNER begins with Phase 1 (Foundation) implementation using this audit as technical specification.

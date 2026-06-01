# Cartola Elifoot - Design Audit: Phase 2 Core Components
## Implementation Roadmap for 10 Critical Components

**Audit Status**: Complete & Ready for CODER  
**Phase**: 2 (Core Components - Weeks 3-4)  
**Last Updated**: 2026-06-01  
**Scope**: Detailed specifications for all 10 components plus 2 supporting component families

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Component Priority Matrix](#component-priority-matrix)
3. [Component 1: Button Component](#component-1-button-component)
4. [Component 2: PlayerCard (3 Variants)](#component-2-playercard-3-variants)
5. [Component 3: FormationBoard](#component-3-formationboard)
6. [Component 4: MatchTimeline](#component-4-matchtimeline)
7. [Component 5: StatPanel](#component-5-statpanel)
8. [Component 6: MatchCard](#component-6-matchcard)
9. [Component 7: StandingsTable](#component-7-standingstable)
10. [Component 8: StatusBadge](#component-8-statusbadge)
11. [Component 9: FormIndicator](#component-9-formindicator)
12. [Component 10: Layout Components](#component-10-layout-components)
13. [Component Dependencies Matrix](#component-dependencies-matrix)
14. [Testing & Validation Strategy](#testing--validation-strategy)

---

## EXECUTIVE SUMMARY

This audit provides exact visual specifications for Phase 2 Core Components. All 10 components must:

- **Use design tokens** from Phase 1 (no hardcoded colors)
- **Support all breakpoints**: 375px (mobile), 768px (tablet), 1440px (desktop)
- **Follow interaction patterns**: hover, focus, active, disabled states
- **Implement accessibility**: WCAG AA contrast, keyboard navigation, ARIA labels
- **Be fully typed**: TypeScript interfaces exported and documented

**Build Order** (Critical Path):
1. Button (dependency for all)
2. FormIndicator + StatusBadge (simple, needed early)
3. PlayerCard (complex, needed for lineup pages)
4. FormationBoard (most complex, highest complexity)
5. MatchTimeline + StatPanel + MatchCard (parallel work)
6. StandingsTable (table-specific challenges)
7. Layout Components (finalize after others)

---

## COMPONENT PRIORITY MATRIX

| Component | Priority | Complexity | Est. Hours | Dependencies | Blocking |
|-----------|----------|-----------|-----------|---|---|
| Button | CRITICAL | Low | 3-4 | None | Yes |
| FormIndicator | HIGH | Low | 2-3 | None | No |
| StatusBadge | HIGH | Low | 2-3 | None | No |
| PlayerCard | CRITICAL | Medium | 8-10 | Button | Yes |
| StatPanel | HIGH | Medium | 5-6 | None | No |
| MatchCard | HIGH | Medium | 6-8 | Button, StatusBadge | No |
| MatchTimeline | HIGH | Medium | 8-10 | StatusBadge | No |
| FormationBoard | CRITICAL | Very High | 15-20 | Button, PlayerCard | Yes |
| StandingsTable | HIGH | Medium | 6-8 | None | No |
| Layout Components | MEDIUM | Medium | 8-10 | Button | No |

**Total Estimated Hours**: 60-75 hours (fits 2-week sprint with normal pace)

---

# COMPONENT 1: BUTTON COMPONENT

## Purpose
Universal button component powering all interactive actions across the interface. Used in modals, forms, cards, and toolbars.

## Visual Specifications

### Base Button Dimensions

```
┌──────────────────────────┐
│         CONFIRM          │  Height: 40px
│                          │  Padding: 8px (v) × 16px (h)
└──────────────────────────┘  Font: 14px, uppercase, 0.05em tracking
                              Border-radius: 8px (--radius-md)
                              Font-weight: 600 (semibold)
```

### Size Variants

| Size | Padding (V×H) | Font Size | Height | Use Case |
|------|---|---|---|---|
| **sm** | 4px × 8px | 12px | 28px | Compact inline actions |
| **md** (default) | 8px × 16px | 14px | 40px | Primary actions, toolbars |
| **lg** | 16px × 24px | 16px | 56px | Hero/call-to-action buttons |

### Color Variants (5 States)

#### PRIMARY Button
```
State      | Background    | Text Color        | Shadow              | Border
-----------|---------------|-------------------|---------------------|--------
Default    | #4a9eff       | #ffffff           | 0 4px 12px rgba(... | none
Hover      | #3a8ee0       | #ffffff           | 0 8px 16px rgba(... | none
           |               | (2px scale up)    | 74,158,255,0.3)     |
Active      | #2a7ed0       | #ffffff           | inset 0 2px 4px     | none
Disabled   | #4a9eff       | #ffffff           | none                | none
           | opacity: 40%  | opacity: 40%      |                     |
Focus      | #4a9eff       | #ffffff           | 0 0 0 2px + shadow  | outline
```

#### SECONDARY Button
```
State      | Background           | Border Color | Text Color      | Shadow
-----------|----------------------|--------------|-----------------|----------
Default    | transparent          | 2px #4a9eff  | #4a9eff         | none
Hover      | #1a2332              | 2px #4a9eff  | #4a9eff         | 0 0 16px rgba(...) 
           | (--dark-bg-secondary)|              |                 | 74,158,255,0.3
Active      | #252d3d              | 2px #4a9eff  | #4a9eff         | inset
Disabled   | transparent          | 2px #4a9eff  | #4a9eff         | none
           |                      |              | opacity: 40%    |
```

#### DANGER Button
```
State      | Background    | Text Color | Shadow
-----------|---------------|------------|------------------------
Default    | #ff5c5c       | #ffffff    | 0 4px 12px rgba(255,92,92,0.3)
Hover      | #e54747       | #ffffff    | 0 8px 16px rgba(255,92,92,0.3)
           | (2px scale)   |            |
Active     | #d53737       | #ffffff    | inset 0 2px 4px
Disabled   | #ff5c5c       | #ffffff    | none
           | opacity: 40%  |            |
```

#### SUCCESS Button
```
State      | Background    | Text Color | Shadow
-----------|---------------|------------|------------------------
Default    | #6bbf59       | #ffffff    | 0 4px 12px rgba(107,191,89,0.3)
Hover      | #5fad50       | #ffffff    | 0 0 16px rgba(107,191,89,0.3)
Active     | #539d48       | #ffffff    | inset 0 2px 4px
Disabled   | #6bbf59       | #ffffff    | none
           | opacity: 40%  |            |
```

#### OUTLINE Button (Alternative Secondary)
```
State      | Background | Border       | Text Color      | Shadow
-----------|------------|--------------|-----------------|--------
Default    | transparent| 1px #a8adb8  | #a8adb8         | none
Hover      | #252d3d    | 1px #f0f2f5  | #f0f2f5         | none
Active     | #1a2332    | 1px #f0f2f5  | #f0f2f5         | inset
Disabled   | transparent| 1px #a8adb8  | #a8adb8         | none
           |            |              | opacity: 40%    |
```

### States & Transitions

#### Default State
- All buttons use `--transition-fast: 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- No scale on secondary/outline buttons (visual stability)
- Text antialiased, no text-selection

#### Hover State
- Scale: `scale(1.02)` (primary, danger, success only - 2% increase)
- Shadow elevation increases
- Background color brightens (RGB shift)
- Cursor: pointer

#### Active State
- Inset shadow: `inset 0 2px 4px rgba(0, 0, 0, 0.3)`
- No scale (feel of pressing down)
- Slightly darker background

#### Focus State (Keyboard Navigation)
- 2px solid outline, 2px offset
- Outline color matches variant accent
- Works even when hover/active
- Visible on all browsers

#### Disabled State
- Opacity: 40%
- Cursor: not-allowed
- No hover effects (no shadow change)
- No transform
- Text not selectable

#### Loading State
- Spinner (16px × 16px circular) before text
- Button disabled (no clicks allowed)
- Opacity: 70%
- Spinner rotates infinitely: 1s linear
- Text remains visible but faded

### Block Variant
- Width: 100%
- Full-width container fill
- Maintains height/padding
- Used in forms and modals

### Icon Support
- Icons placed before text with `gap: var(--space-xs)` (4px)
- Icon size: 16px (for md button)
- Icon color inherits from text color
- Example: [CHECK] CONFIRM

### TypeScript Interface

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;        // default: 'primary'
  size?: ButtonSize;              // default: 'md'
  block?: boolean;                // default: false
  loading?: boolean;              // default: false
  icon?: React.ReactNode;         // Optional icon element
  children: React.ReactNode;      // Button text (required)
  
  // Standard HTML button attributes
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  aria-label?: string;            // For icon-only buttons
  aria-busy?: boolean;            // When loading
}
```

### Accessibility Requirements

- **Keyboard**: Tab focus, Enter/Space to activate
- **Focus Indicator**: 2px outline visible on all backgrounds
- **Color Alone**: Not sole method of differentiation (use icons + text)
- **Disabled**: `disabled` attribute, not just visual
- **Loading**: `aria-busy="true"` when loading
- **Icon-only**: Must have `aria-label` or title
- **Contrast**: 4.5:1 minimum text vs background

### Mobile Considerations

- Touch target minimum: 44×44px (all sizes meet this)
- No hover effects on touch devices (use @media (hover: none))
- Larger vertical padding on mobile for easier tapping
- Consider button width on small screens (block on mobile)

### Usage Examples

```tsx
// Primary action
<Button variant="primary">Confirm Lineup</Button>

// Secondary with icon
<Button variant="secondary" icon={<InfoIcon />}>View Details</Button>

// Danger action
<Button variant="danger" size="sm" onClick={handleDelete}>Remove</Button>

// Loading state
<Button loading disabled>Saving...</Button>

// Full width form button
<Button variant="primary" size="lg" block type="submit">
  Submit
</Button>

// Icon-only
<Button variant="outline" size="sm" aria-label="Close" onClick={onClose}>
  [X]
</Button>
```

### Build Files

- `/components/Button/Button.tsx` - React component
- `/components/Button/Button.module.css` - Component styles
- `/components/Button/Button.stories.tsx` - Storybook docs
- `/components/Button/Button.test.tsx` - Unit tests

---

# COMPONENT 2: PLAYERCARD (3 VARIANTS)

## Purpose
Display player information in three contexts:
1. **Compact**: Formation board (just jersey number in circle)
2. **Standard**: Lineup selection (name, position, rating, price, status)
3. **Detailed**: Modal/popup (full stats, form, history, actions)

## Visual Specifications

### Variant 1: COMPACT Card (Formation View)

```
     ┌─────┐
     │  7  │  Size: 56×56px circle
     │  ◉  │  Jersey number: 28px bold mono white
     └─────┘  Position color based on role
     
Color coding:
GK: #4a9eff (cyan)
DF: #5b9fd8 (blue)
MF: #8b7fd8 (purple)
FW: #d85b5b (red)
```

#### Specifications
| Property | Value |
|----------|-------|
| Shape | Circle |
| Diameter | 56px |
| Background | Position color (semi-transparent overlay) |
| Border | 2px solid when selected |
| Border Color (selected) | #4a9eff with glow |
| Glow (selected) | `0 0 16px rgba(74,158,255,0.5)` |
| Typography | 28px mono white, bold |
| Cursor | grab (draggable context) |
| Interaction | Drag to reposition, hover for tooltip |

#### Hover State (Formation)
```
Opacity: 100% -> 110% (slight brightening)
Shadow: Add 0 0 16px rgba(position_color, 0.4)
Border: 2px solid var(--primary-accent)
Scale: 1 -> 1.1
Tooltip: Shows player name + position + rating
```

---

### Variant 2: STANDARD Card (Lineup Selection)

```
┌─────────────────────────────┐
│ ┌──────────────────────────┐│
│ │ [7] Cristiano Ronaldo    ││  Overall container: 280×320px
│ │     Manchester United     ││  Card padding: 16px
│ │                          ││  
│ │  ST  Rating: 8.7         ││
│ │  #9                      ││
│ │                          ││
│ │  Fitness: 95% ▓▓▓░░░    ││  Progress bar: 4px height
│ │  Form: ●●●●○             ││  5-point form indicator
│ │                          ││
│ │  Price: 12.5M            ││
│ │  Status: FIT ✓           ││  Badge: Status indicator
│ │                          ││
│ │  [SWAP]  [INFO]          ││  Buttons: sm variant
│ └──────────────────────────┘│
│ ────────────────────────────│  Border-left: 3px thick
│ Selected / Highlighted      │  accent color when active
└─────────────────────────────┘
```

#### Container Layout
```css
width: 280px
min-height: 320px
background: var(--dark-bg-primary)
border: var(--border-1px)
border-radius: var(--radius-md)
padding: var(--space-md) /* 16px */
box-shadow: var(--shadow-sm)
```

#### Content Grid
```
Row 1 (spacing: 8px vertical)
├─ Jersey [7] + Name (Cristiano Ronaldo) - 18px bold
├─ Team + Position (Manchester United, ST) - 12px secondary
├─ Rating: 8.7 (24px mono, highlight)

Row 2 (spacing: 16px vertical gap)
├─ Fitness bar with % text
├─ Form indicator (5 dots)
├─ Price (14px mono)
├─ Status badge (using StatusBadge component)

Row 3 (spacing: 12px top gap)
├─ [SWAP] [INFO] buttons (two columns)
```

#### Selected State
```
border-left: 3px solid #4a9eff
border-right-color: #4a9eff (full border highlight)
box-shadow: 0 0 16px rgba(74,158,255,0.3)
background-color: var(--dark-bg-secondary)
```

#### Hover State
```
background-color: var(--dark-bg-secondary)
box-shadow: var(--shadow-md)
transform: translateY(-2px)
transition: var(--transition-all)
```

#### TypeScript Interface
```typescript
interface PlayerCardStandardProps {
  player: {
    id: string;
    jerseyNumber: number;
    name: string;
    team: string;
    position: 'GK' | 'DF' | 'MF' | 'FW';
    rating: number;              // 1-10
    price: number;               // in millions
    fitness: number;             // 0-100 percent
    form: 1 | 2 | 3 | 4 | 5;   // dots
    status: 'fit' | 'injured' | 'doubtful' | 'returning' | 'suspended';
    image?: string;              // Optional player image
  };
  selected?: boolean;
  onSwap?: () => void;           // Open swap modal
  onInfo?: () => void;           // Show details modal
  onClick?: () => void;          // Select player
}
```

---

### Variant 3: DETAILED Card (Modal/Popup)

```
┌──────────────────────────────────┐
│ Cristiano Ronaldo [CLOSE]        │ Header: 24px bold
│ ════════════════════════════════ │ Divider
│ Manchester United | ST | #9      │ Team, position, jersey
│ Rating: 8.7                      │
│                                  │
│ STATISTICS                       │ Section header: 14px caps
│ ────────────────────────────────│
│ Goals:           12              │ Two-column layout
│ Assists:          4              │
│ Yellow Cards:     1              │
│ Red Cards:        0              │
│ Clean Sheets:     N/A            │
│                                  │
│ FORM (Last 5 matches)            │
│ ────────────────────────────────│
│ [8.2] [7.9] [8.5] [8.1] [7.6]   │ Rating boxes with score
│                                  │
│ FITNESS & STATUS                 │
│ ────────────────────────────────│
│ Fitness:  95%  ▓▓▓▓░           │ Large progress bar
│ Status:   FIT ✓                  │ Color-coded badge
│ Injury Risk: Low                 │
│                                  │
│ ACTIONS                          │
│ [SWAP]  [REMOVE]  [VIEW STATS]  │ Three action buttons
└──────────────────────────────────┘
```

#### Container Dimensions
```
width: 100% (modal: 600px max, responsive)
max-height: 80vh
background: var(--dark-bg-elevated)
border-radius: var(--radius-lg)
padding: var(--space-lg)
box-shadow: var(--shadow-lg)
```

#### Content Sections

**Header Section**
- Player name: 24px bold, white
- Team | Position | Jersey: 14px secondary
- Rating: 18px mono, bold, highlight

**Statistics Grid**
- Two columns
- 6 stats shown
- Labels: 12px secondary
- Values: 18px mono, highlight
- No progress bars (space constraint)

**Form Display**
- Last 5 matches
- Individual boxes: 48×48px
- Centered rating inside
- Background: subtle color per rating (green=good, red=poor)
- Hover: show full date and opponent

**Fitness & Status**
- Progress bar: 100% width, 8px height
- Status badge using StatusBadge component
- Injury risk indicator: text + color code

**Action Buttons**
- Three buttons: [SWAP] [REMOVE] [VIEW STATS]
- Full width, equal columns
- Size: lg variant

#### TypeScript Interface
```typescript
interface PlayerCardDetailedProps {
  player: {
    // ... standard fields from previous variant
    stats: {
      goals: number;
      assists: number;
      yellowCards: number;
      redCards: number;
      cleanSheets?: number;
      appearances: number;
      minutesPlayed: number;
    };
    formHistory: Array<{
      date: string;
      opponent: string;
      rating: number;
      result: 'W' | 'D' | 'L';
    }>;
    injuryRisk: 'low' | 'medium' | 'high';
  };
  onClose: () => void;
  onSwap?: () => void;
  onRemove?: () => void;
  onViewStats?: () => void;
}
```

---

### Shared PlayerCard Component Logic

```typescript
interface BasePlayerProps {
  player: {
    id: string;
    jerseyNumber: number;
    name: string;
    team: string;
    position: 'GK' | 'DF' | 'MF' | 'FW';
    rating: number;
    price: number;
    fitness: number;
    form: 1 | 2 | 3 | 4 | 5;
    status: StatusType;
    image?: string;
  };
  variant: 'compact' | 'standard' | 'detailed';
}

// Position color mapping
const POSITION_COLORS = {
  GK: '#4a9eff',  // cyan
  DF: '#5b9fd8',  // blue
  MF: '#8b7fd8',  // purple
  FW: '#d85b5b',  // red
};
```

### Mobile Responsiveness

**Tablet (768px)**
- Standard card: 240×300px (slightly smaller)
- Detailed modal: 90vw max (wider for tablet)
- Grid: 2 columns of standard cards

**Mobile (375px)**
- Standard card: Full width minus padding (343px)
- Detailed modal: Full width minus 16px padding
- Stack all sections vertically
- Buttons: Full width stacked

### Build Files

- `/components/PlayerCard/PlayerCard.tsx` - Main dispatcher
- `/components/PlayerCard/PlayerCardCompact.tsx` - Formation variant
- `/components/PlayerCard/PlayerCardStandard.tsx` - Lineup variant
- `/components/PlayerCard/PlayerCardDetailed.tsx` - Modal variant
- `/components/PlayerCard/PlayerCard.module.css` - Shared styles
- `/components/PlayerCard/PlayerCard.stories.tsx` - Storybook

---

# COMPONENT 3: FORMATIONBOARD

## Purpose
SVG-based tactical visualization of 11 players in formation with drag-drop repositioning, formation presets, and real-time validation.

## Visual Specifications

### Canvas & Grid

```
┌─────────────────────────────────────────────────────┐
│                                                     │  Height: 400px (desktop)
│              Formation Visualization                │  Width: 100% max 600px
│                                                     │
│              ◉ (Goalkeeper)                         │
│              |                                      │
│        ◉           ◉           ◉  (Defenders)     │
│         \           |           /                  │
│            ◉     ◉   ◉    ◉  (Midfielders)       │
│              \  |   |   /                          │
│                ◉       ◉  (Forwards)              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Technical Specifications
```
SVG Viewbox: "0 0 100 130"  (normalized units)
Canvas Size: 600×780px desktop, responsive tablet/mobile
Pitch Green: #1a2332 (dark-bg-secondary)
Pitch Border: 1px #252d3d (dark-bg-tertiary)
Border-radius: 8px
Padding: 16px
Background: var(--dark-bg-primary)
```

### Player Position Nodes

#### Visual Style
```
Circle: 40px diameter
Fill: Position color with 80% opacity
Stroke: 2px, white/highlight, only when hovered/selected
Jersey Number: 20px mono bold white, centered

Position Colors:
┌─────────────────────────────┐
│ GK: #4a9eff (cyan)          │
│ DF: #5b9fd8 (blue)          │
│ MF: #8b7fd8 (purple)        │
│ FW: #d85b5b (red)           │
└─────────────────────────────┘
```

#### Interactive States

**Default (Rest)**
- Opacity: 80%
- Stroke: none
- Cursor: grab
- Shadow: none

**Hover (Mouse Over)**
- Opacity: 100%
- Stroke: 2px white
- Cursor: grab
- Shadow: `0 0 16px rgba(position_color, 0.4)`
- Tooltip: Player name, rating, position

**Dragging**
- Opacity: 100%
- Scale: 1.1
- Shadow: `0 4px 16px rgba(0,0,0,0.5)`
- Cursor: grabbing
- Z-index: 100
- Ghost image: 50% opacity trailing path (optional)

**Selected (After Drop)**
- Stroke: 3px #4a9eff
- Shadow: `0 0 24px rgba(74,158,255,0.4)`
- Cursor: grab
- Glow effect on selection

**Invalid Position**
- Border: 2px #ff5c5c (danger)
- Background shake: 200ms
- Tooltip: "Invalid position for this player"
- Revert on release

### Formation Presets

Dropdown showing 5 common formations:

```
Selected: 4-3-3 ▼
┌──────────────────┐
│ 4-3-3 (Selected) │ Most balanced
│ 4-4-2            │ Defensive classic
│ 4-2-3-1          │ Modern balanced
│ 3-5-2            │ Attacking flexible
│ 5-3-2            │ Ultra defensive
└──────────────────┘
```

#### Formation Data Structure
```typescript
interface Formation {
  id: string;
  name: string;
  description: string;
  layout: Array<{
    position: 'GK' | 'DF' | 'MF' | 'FW';
    x: number;  // Normalized 0-100
    y: number;  // Normalized 0-130
    count: number;  // How many positions in this row
  }>;
}

// Example: 4-3-3 formation
{
  id: '4-3-3',
  name: '4-3-3',
  description: 'Balanced attacking formation',
  layout: [
    { position: 'GK', x: 50, y: 10, count: 1 },
    { position: 'DF', x: 25, y: 30, count: 1 },
    { position: 'DF', x: 40, y: 25, count: 1 },
    { position: 'DF', x: 60, y: 25, count: 1 },
    { position: 'DF', x: 75, y: 30, count: 1 },
    // ... continuing through midfielders and forwards
  ]
}
```

### Control Panel (Below Formation)

```
┌──────────────────────────────────────┐
│ Formation: 4-3-3 ▼  [CHANGE]        │  Dropdown + quick change
│ Tactical Instructions:              │
│ ┌────────────────────────────────┐ │
│ │ Balanced (selected)            │ │  Dropdown showing:
│ │ Defensive                      │ │  • Balanced
│ │ Attacking                      │ │  • Defensive
│ │ Counter Attack                 │ │  • Attacking
│ └────────────────────────────────┘ │  • Counter Attack
│                                    │
│ Defensive Level: [────●────] 50%   │  Slider 0-100
│                                    │
│ Budget: 89.3M / 100M (88.3%)       │  Real-time calculation
│ Average Rating: 7.8                │  Team stats
│ Fitness: 94%                       │
└──────────────────────────────────────┘
```

#### Control Elements

**Formation Dropdown**
- Label: "Formation:"
- Default: First formation in list
- Trigger: Full board re-layout
- Animation: Player shuffle to new positions (250ms)

**Tactical Instructions**
- Label: "Tactical Instructions:"
- Type: Dropdown select
- Options: Balanced | Defensive | Attacking | Counter Attack
- Visual indicator: Color-coded border on board
- Defensive (border: #5b9fd8 blue)
- Balanced (border: #8b7fd8 purple)
- Attacking (border: #d85b5b red)

**Defensive Level Slider**
- Range: 0 (all-out attack) to 100 (all-out defense)
- Default: 50
- Visual: Standard range input styled
- Background: gradient from red to blue
- Label: "Defensive Level: [slider] %"

**Budget & Stats Display**
- Real-time updates as players are repositioned
- Budget: "89.3M / 100M (88.3%)"
- Average Rating: Calculated from selected players
- Average Fitness: Team fitness average
- Format: 14px secondary text

### Drag-Drop Implementation

#### Validation Rules
```typescript
interface PositionRule {
  position: 'GK' | 'DF' | 'MF' | 'FW';
  playerPositions: string[];  // Which positions can fill this slot
  maxDeviation: number;       // How far player can move in px
}

// Validation examples:
GK slot: Can only accept GK players (strict)
DF slot: Can accept GK (rare), DF (normal)
MF slot: Can accept DF (rare), MF (normal)
FW slot: Can accept MF (rare), FW (normal)
```

#### Drag Workflow
1. User presses mousedown on player circle
2. Clone appears at cursor (ghost image, 50% opacity)
3. User drags mouse (visual feedback at cursor)
4. Valid drop zones highlight (green border)
5. Invalid zones show red border
6. On valid drop: Player moves, animation 250ms
7. On invalid drop: Player returns, shake animation 200ms

#### Keyboard Alternative
```
Arrow Keys: Move selected player (5px per press)
Enter: Swap selected player with hovered position
Escape: Deselect player
Space: Select nearest valid position
```

### Mobile Responsiveness

**Tablet (768px)**
- Canvas height: 80% of width (maintain aspect)
- Player circles: 32px diameter
- Jersey number: 16px
- Control panel: Full width below
- Touch: Tap to select, drag to reposition

**Mobile (375px)**
- Canvas height: 100% of width (square)
- Player circles: 28px diameter
- Jersey number: 14px
- Font sizes reduced 20%
- Single-column control panel
- Drag slightly less sensitive (larger dead zone)

### TypeScript Interface

```typescript
interface FormationBoardProps {
  players: PlayerData[];           // 11 selected players
  selectedFormation: string;       // Formation ID
  onFormationChange: (id: string) => void;
  onTacticsChange: (tactics: TacticLevel) => void;
  onDefensiveLevel: (level: number) => void;
  onPlayerPositionChange: (playerId: string, position: XY) => void;
  readOnly?: boolean;              // View-only mode
  showStats?: boolean;             // Show budget/rating
  compactMode?: boolean;           // Hide controls for small screens
}

type TacticLevel = 'balanced' | 'defensive' | 'attacking' | 'counter';

interface PlayerData {
  id: string;
  jerseyNumber: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  rating: number;
  price: number;
  fitness: number;
}

interface XY {
  x: number;  // 0-100 normalized
  y: number;  // 0-130 normalized
}
```

### Build Files

- `/components/FormationBoard/FormationBoard.tsx` - Main component
- `/components/FormationBoard/FormationBoardCanvas.tsx` - SVG rendering
- `/components/FormationBoard/FormationControls.tsx` - Control panel
- `/components/FormationBoard/utils/formations.ts` - Formation definitions
- `/components/FormationBoard/utils/svg-helpers.ts` - SVG utilities
- `/components/FormationBoard/utils/drag-drop.ts` - Drag-drop logic
- `/components/FormationBoard/FormationBoard.module.css` - Styles
- `/components/FormationBoard/FormationBoard.stories.tsx` - Storybook

---

# COMPONENT 4: MATCHTIMELINE

## Purpose
Vertical scrollable display of match events in chronological reverse order (latest at top). Shows goals, cards, substitutions, injuries with visual indicators and point impacts.

## Visual Specifications

### Timeline Container

```
┌──────────────────────────────────────┐
│ ╔════════════════════════════════════║  Height: 500px (scrollable)
│ ║ 90' FINAL WHISTLE                  ║  Width: 100%
│ ║                                    ║  Overflow-y: auto
│ ║ 87' ⚽ GOAL!                        ║  Scrollbar: styled thin
│ ║    Haaland                         ║
│ ║    +8 pts                          ║
│ ║                                    ║
│ ║ 82' 🔄 SUBSTITUTION                ║
│ ║    OFF: Sancho  ON: Grealish       ║
│ ║                                    ║
│ ║ 78' 🟡 YELLOW CARD                 ║
│ ║    Fred (Manchester United)        ║
│ ║                                    ║
│ ║ ... (scrollable)                   ║
│ ╚════════════════════════════════════╝
└──────────────────────────────────────┘
```

### Event Types & Visual Indicators

#### GOAL Event
```
┌──────────────────────────────┐
│ 87' ⚽ GOAL!                  │  Icon: ⚽ (soccer ball emoji or SVG)
│    Cristiano Ronaldo         │  Background: Linear gradient
│    Penalty                   │  Red (goal) to transparent
│    Man United 2-1 Liverpool  │
│    +8 pts, Rating: +2.5      │
│    │ Assist: Bruno Fernandes │  Indent for details
│    └─ Penalty (type badge)   │
└──────────────────────────────┘

Color (Background): rgba(216, 91, 91, 0.1)  [FW color - red team]
Border-left: 4px #d85b5b
Accent: #d85b5b (red)
```

#### SUBSTITUTION Event
```
┌──────────────────────────────┐
│ 82' 🔄 SUBSTITUTION           │  Icon: 🔄 (arrows emoji or SVG)
│    OFF: Jadon Sancho         │  Background: Neutral gray
│    ON: Phil Foden            │  Fresh legs / tactical change
│    Attacking change expected │  Note: Optional description
│                              │
└──────────────────────────────┘

Color (Background): rgba(155, 132, 183, 0.1)  [Tertiary - neutral]
Border-left: 4px #9d84b7
Accent: #9d84b7 (purple)
```

#### YELLOW CARD Event
```
┌──────────────────────────────┐
│ 78' 🟡 YELLOW CARD           │  Icon: 🟡 (yellow circle emoji)
│    Fred (Manchester United)  │
│    Rash challenge            │  Offense description
│    Caution: 1 card           │  Card count tracker
│    (Next card = red)         │  Warning context
│                              │
└──────────────────────────────┘

Color (Background): rgba(255, 184, 77, 0.1)  [Warning - amber]
Border-left: 4px #ffb84d
Accent: #ffb84d (amber)
```

#### RED CARD Event
```
┌──────────────────────────────┐
│ 65' 🔴 RED CARD              │  Icon: 🔴 (red circle emoji)
│    Harry Maguire             │
│    Violent conduct           │  Serious offense
│    Player sent off           │  Immediate consequence
│                              │
└──────────────────────────────┘

Color (Background): rgba(255, 92, 92, 0.1)  [Danger - red]
Border-left: 4px #ff5c5c
Accent: #ff5c5c (danger)
Icon animation: Pulse 2s infinite
```

#### INJURY Event
```
┌──────────────────────────────┐
│ 45' 🏥 INJURY                │  Icon: 🏥 (medical/injury)
│    Luke Shaw (Left Back)     │
│    Hamstring                 │  Injury type
│    Expected out: 3-4 weeks   │  Severity estimate
│    Replacement: Luke Shaw    │
│                              │
└──────────────────────────────┘

Color (Background): rgba(255, 92, 92, 0.1)  [Danger]
Border-left: 4px #ff5c5c
Accent: #ff5c5c (red)
```

#### KICKOFF & HALFTIME Events
```
┌──────────────────────────────┐
│ 0' 🏁 KICKOFF                │  Icon: 🏁 (flag emoji)
│    Manchester United vs      │
│    Liverpool                 │  Match teams
│                              │
└──────────────────────────────┘

Color (Background): rgba(74, 158, 255, 0.05)  [Info - subtle]
Border-left: 4px #4a9eff
Accent: #4a9eff (info)
Text: Secondary text color (muted)
```

### Individual Event Card Specifications

#### Layout Grid
```
[Icon] [Time] [Event Type] [Details]
└─────────────────────────────────┘
 [Indented sub-details]
 [Additional info / impacts]
```

#### Dimensions
```
Width: 100%
Padding: 16px
Margin-bottom: 12px (gap between events)
Border-radius: 8px
Border-left: 4px solid (color per event type)
Background: Subtle overlay color
Min-height: 60px (varies by content)
```

#### Typography
```
Time (87'):              12px mono, secondary text
Event Type (GOAL):       14px bold, uppercase, accent color
Description (Haaland):   16px primary text, name bold
Details:                 12px secondary, indented
Impact text (+8 pts):    12px mono, success/danger color
```

#### Animation (Entry)
```
@keyframes slideInFromBottom {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

Duration: 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
Stagger: 50ms between items in rapid sequence
```

#### Hover State
```
Background: Slightly darker (opacity increase)
Border-left: Thicker (4px -> 5px)
Shadow: 0 4px 12px rgba(0,0,0,0.3)
Transition: var(--transition-fast)
Cursor: pointer (if clickable for details)
```

### Scroll Behavior

- **Initial Load**: Scroll to most recent event (top)
- **Auto-scroll**: New events appear at top with animation
- **Sticky Header**: Optional match info stays at top (time, score)
- **Momentum**: Native smooth scrolling
- **Scroll Spy**: Optional: highlight current match time section

### TypeScript Interface

```typescript
type EventType = 
  | 'goal' 
  | 'yellow_card' 
  | 'red_card' 
  | 'substitution' 
  | 'injury' 
  | 'kickoff' 
  | 'half_time' 
  | 'full_time';

interface MatchEvent {
  id: string;
  minute: number;
  type: EventType;
  team?: string;
  player: string;
  playerId?: string;
  description: string;
  
  // Event-specific data
  goal?: {
    isOwnGoal: boolean;
    isPenalty: boolean;
    assistPlayer?: string;
  };
  card?: {
    color: 'yellow' | 'red';
    offense: string;
  };
  substitution?: {
    playerOff: string;
    playerOn: string;
    reason?: string;
  };
  injury?: {
    type: string;
    severity: 'minor' | 'moderate' | 'severe';
    expectedOut?: string;
  };
  
  // Impact tracking
  impact?: {
    pointsAwarded?: number;
    ratingChange?: number;
    scoreImpact?: string;
  };
}

interface MatchTimelineProps {
  events: MatchEvent[];
  matchId: string;
  autoScroll?: boolean;
  maxHeight?: number;      // default: 500px
  showDetails?: boolean;   // Show full descriptions
  compact?: boolean;       // Compact view mode
  onEventClick?: (event: MatchEvent) => void;
}
```

### Mobile Responsiveness

**Tablet (768px)**
- Height: 400px (slightly smaller)
- Padding: 12px per event
- Font sizes: -10% reduction
- Full width minus 16px gutter

**Mobile (375px)**
- Height: 300px (prioritize screen space)
- Padding: 12px per event
- Margin-bottom: 8px
- Time moved to separate line
- Icon + event type on first line only
- Details collapsed initially (tap to expand)

### Build Files

- `/components/MatchTimeline/MatchTimeline.tsx` - Main component
- `/components/MatchTimeline/MatchEvent.tsx` - Individual event card
- `/components/MatchTimeline/EventIcon.tsx` - Event type icons
- `/components/MatchTimeline/MatchTimeline.module.css` - Styles
- `/components/MatchTimeline/MatchTimeline.stories.tsx` - Storybook

---

# COMPONENT 5: STATPANEL

## Purpose
Display individual player or team statistics with visual progress bars. Used in match details, team stats, and performance comparisons.

## Visual Specifications

### Panel Container

```
┌──────────────────────────────────────┐
│ PLAYER STATISTICS                    │  Header: 14px caps bold secondary
│ ══════════════════════════════════════│ Divider: 1px border
│                                      │
│ Goals:             12  ▓▓▓▓░░░░░░   │ Row format
│ Assists:            4  ▓▓░░░░░░░░   │ Left: label (14px secondary)
│ Shots on Target:    8  ▓▓▓▓▓░░░░░   │ Right: value (18px mono highlight)
│ Pass Accuracy:     88% ▓▓▓▓▓▓▓▓░░  │ Progress bar: max 10 units
│ Tackles Won:        6  ▓▓▓▓▓░░░░░   │ Bar width: dynamic per max value
│ Dribbles:          12  ▓▓▓▓▓▓░░░░   │
│ Possession Lost:    4  ▓░░░░░░░░░   │
│ Fouls Committed:    2  ░░░░░░░░░░   │ Empty bars for zero/low values
│                                      │
└──────────────────────────────────────┘
```

#### Container Specifications
```
Width: 100% (responsive, min 280px)
Background: var(--dark-bg-primary)
Border: var(--border-1px)
Border-radius: var(--radius-md)
Padding: var(--space-lg) /* 24px */
Box-shadow: var(--shadow-sm)
```

### Stat Row Layout

```
┌────────────────────────────────────┐
│ Pass Accuracy:     88% ▓▓▓▓▓▓░░░░  │
│ ├─ Label (14px)   │   Value        │
│ │                 │   (18px mono)  │
│ │                 └─ Progress bar  │
│ └─ Gap: 16px
```

#### Row Anatomy
```css
display: grid;
grid-template-columns: 1fr 80px;  /* Label | Value+Bar */
gap: var(--space-md);  /* 16px */
padding: var(--space-md) 0;  /* 16px vertical */
border-bottom: 1px #252d3d (except last);
align-items: center;
```

#### Label Styles
```
Font-size: 14px
Color: #a8adb8 (secondary text)
Font-weight: 400
Text-align: left
Text-transform: none
```

#### Value Styles
```
Font-size: 18px
Font-family: IBM Plex Mono
Font-weight: 700
Color: #ffffff (highlight)
Text-align: right
Width: 80px
```

### Progress Bar Design

#### Visual
```
Value: 88%
┌──────────────────┐  Container: 4px height
│▓▓▓▓▓▓▓▓░░░░░░░░│  Background: #252d3d (dark-bg-tertiary)
└──────────────────┘  Fill: Colored per stat type
Width: 100%          Border-radius: 2px
```

#### Fill Colors (5 Category Types)

| Category | Use Case | Color | Example |
|----------|----------|-------|---------|
| **Info** | Neutral stats | #4a9eff | Goals, Assists, Shots |
| **Success** | Positive (higher=better) | #6bbf59 | Pass Accuracy, Possession |
| **Warning** | Caution (mid-range) | #ffb84d | Yellow Cards, Fouls |
| **Danger** | Negative (lower=better) | #ff5c5c | Losses, Errors |
| **Neutral** | Context-dependent | #8b95a5 | Set pieces |

#### Maximum Value Scaling

Progress bars scale to show meaningful % of max observed value.

```typescript
// For Goals (player game):
max: 5 (realistic max in single match)
88% = 4.4 goals shown

// For Pass Accuracy:
max: 100% (percentage)
88% = 88% shown

// For Possession Loss:
max: 20 (typical game)
4 = 20% shown
```

### Single vs. Double Column Layout

#### Single Column (Default)
```
Used when: Compact space, mobile
─────────────────────────────────
Stat 1
Stat 2
Stat 3
```

#### Double Column
```
Used when: Wide container (600px+)
─────────────────────────────────
Stat 1    │    Stat 2
Stat 3    │    Stat 4
Stat 5    │    Stat 6
```

### Variant: Team vs. Team Comparison

```
┌──────────────────────────────────────────────────────┐
│ TEAM STATISTICS (COMPARISON)                         │
│ ════════════════════════════════════════════════════ │
│                                                      │
│ Man Utd │ Possession:         │ 56% │ Liverpool     │
│         │ ▓▓▓▓▓░░░░ vs ░░░░░  │     │ 44%          │
│         │                    │     │              │
│ Man Utd │ Shots on Target:    │  8  │ Liverpool    │
│         │ ▓▓▓▓▓░░░░ vs ░░░░   │  5  │              │
│         │                    │     │              │
│ Man Utd │ Pass Accuracy:      │ 89% │ Liverpool    │
│         │ ▓▓▓▓▓▓▓░░ vs ▓▓▓▓   │ 87% │              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### Comparison Layout
```
grid-template-columns: 1fr 150px 1fr 60px 1fr
Columns: [Team 1] [Stat Name] [Value] [Comparison] [Value]
Progress bars: Back-to-back facing left/right
Larger font for values
```

### TypeScript Interface

```typescript
interface Stat {
  name: string;                    // "Goals", "Assists", etc.
  value: number;                   // Actual value
  max?: number;                    // Max for scaling
  unit?: string;                   // "%", "", "cards", etc.
  type?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  color?: string;                  // Override default color
  description?: string;            // Tooltip hint
}

interface StatPanelProps {
  title?: string;                  // "Player Statistics"
  stats: Stat[];                   // Array of stats to display
  columns?: 1 | 2;                // Single or double column (default: 1)
  type?: 'player' | 'team';       // Style variant
  comparison?: {                   // Optional comparison data
    team1: string;
    team2: string;
    stats: Array<{
      name: string;
      value1: number;
      value2: number;
      unit?: string;
    }>;
  };
  compact?: boolean;               // Reduce padding/gaps
  showDividers?: boolean;          // Row dividers (default: true)
}
```

### Mobile Responsiveness

**Tablet (768px)**
- Padding: 16px (reduced from 24px)
- Gap: 12px (reduced from 16px)
- Two-column layout available (if width > 500px)

**Mobile (375px)**
- Padding: 12px
- Gap: 8px
- Single column always
- Font sizes: 12px labels, 16px values
- Progress bar height: 3px
- Stat name: stack-able, abbreviations (e.g., "SOT" vs "Shots on Target")

### Build Files

- `/components/StatPanel/StatPanel.tsx` - Main component
- `/components/StatPanel/StatRow.tsx` - Individual stat row
- `/components/StatPanel/ProgressBar.tsx` - Progress bar component
- `/components/StatPanel/StatPanel.module.css` - Styles
- `/components/StatPanel/StatPanel.stories.tsx` - Storybook

---

# COMPONENT 6: MATCHCARD

## Purpose
Compact display of match information (score, teams, result) in three complexity levels for different contexts.

## Visual Specifications

### Variant 1: COMPACT Card (Result List)

```
┌────────────────────────────────────┐
│ Matchday 15   |   Oct 28, 2024    │  Header: 12px secondary
│                                   │
│   Man Utd  2  -  1  Liverpool    │  Score: 32px mono bold
│   (Haaland 2)    (Salah)         │  Scorers: 12px secondary
│                                   │
│ Your Score: +42 pts               │  User impact
│                                   │
└────────────────────────────────────┘

Width: 280px
Height: 120px
Padding: 16px
Background: var(--dark-bg-primary)
Border: 1px #252d3d
Border-radius: 8px
Box-shadow: 0 4px 12px rgba(0,0,0,0.3)
```

#### Layout
```
Row 1: Matchday | Date (12px secondary, space-between)
Row 2: HOME TEAM │ SCORE │ AWAY TEAM (centered, 32px score)
Row 3: Scorers (12px secondary, centered)
Row 4: Your Score (14px info color)
```

#### Interaction
- Hover: `box-shadow: 0 8px 24px rgba(0,0,0,0.4)`, `transform: translateY(-2px)`
- Click: Navigate to match details
- Cursor: pointer

---

### Variant 2: STANDARD Card (Dashboard Featured Match)

```
┌──────────────────────────────────────┐
│ Matchday 15   │ Friday, Oct 28       │
│ ═════════════════════════════════════ │
│                                      │
│    Manchester United  2  -  1       │  Teams + Score
│           Man Utd            Liverpool
│                                      │
│ Possession: 52% vs 48%              │  Stats comparison
│ Shots: 18 vs 12                     │
│ Corners: 7 vs 4                     │
│                                      │
│ Goals: Haaland (15', 67' Pen)       │
│        Salah (58')                  │
│                                      │
│ Your Score: +42 pts  Formation: ▼   │
│                                      │
│  [WATCH HIGHLIGHTS]  [DETAILED STATS]│  Action buttons
│                                      │
└──────────────────────────────────────┘

Width: 380px
Height: 280px
Padding: 20px
Background: var(--dark-bg-elevated)
Box-shadow: 0 8px 24px rgba(0,0,0,0.4)
```

#### Content Grid
```
Header: Matchday + Date (12px secondary)
Divider: 1px border
Score Section: 40px mono, centered
Stats: Two-column comparison
Goals: Indented list with times
Your Score: 16px mono bold
Actions: Two buttons full width
```

#### Interactive States
- Hover: Subtle background color shift, shadow elevation
- Selected: Border 2px #4a9eff, glow shadow
- Click: Expand to detailed view or navigate

---

### Variant 3: EXPANDED Card (Full Match Details)

```
┌──────────────────────────────────────────────────┐
│ MATCH DETAILS                                    │
│ Manchester United vs Liverpool - Finished       │
│ ═══════════════════════════════════════════════ │
│                                                  │
│           MANCHESTER UNITED 2 - 1 LIVERPOOL    │
│           (Final Score)                        │
│                                                  │
│ ┌──────────────────┐      ┌──────────────────┐ │
│ │ Man Utd          │      │ Liverpool        │ │
│ │                  │      │                  │ │
│ │ Goals: 2         │      │ Goals: 1         │ │
│ │ • Haaland (15')  │      │ • Salah (58')    │ │
│ │ • Haaland (67' P)│      │ • Assist: TAA    │ │
│ │                  │      │                  │ │
│ │ Possession: 52%  │      │ Possession: 48%  │ │
│ │ Shots: 18        │      │ Shots: 12        │ │
│ │ SoT: 8           │      │ SoT: 5           │ │
│ │ Passes: 542      │      │ Passes: 487      │ │
│ │ Pass Acc: 89%    │      │ Pass Acc: 87%    │ │
│ └──────────────────┘      └──────────────────┘ │
│                                                  │
│ Match Timeline: [SEE TIMELINE]                  │
│ Top Performers:                                  │
│ • Cristiano Ronaldo (8.7) - 2 goals             │
│ • Bruno Fernandes (8.4) - 1 goal, 1 assist     │
│ • Mohamed Salah (7.9) - 1 goal                 │
│                                                  │
│ [SHARE]  [TIMELINE]  [FULL STATS]  [COMPARE]   │
│                                                  │
└──────────────────────────────────────────────────┘

Width: 100% max 700px
Height: auto (scrollable if needed)
Padding: 24px
Background: var(--dark-bg-elevated)
Box-shadow: 0 16px 40px rgba(0,0,0,0.5)
```

#### Content Sections
1. Header: Match info (teams, status, date/time)
2. Final Score: 48px mono, bold, centered
3. Side-by-side team stats boxes
4. Goal details with times
5. Top performers section
6. Action buttons

---

### Shared Match Card Properties

#### Status Indicators
```
Upcoming:   "SCHEDULED" badge, countdown timer
Live:       "LIVE" badge with pulse animation
Finished:   "FINAL" badge, gray
Postponed:  "POSTPONED" badge, warning color
```

#### Team Colors/Badges
- Home team: Left side
- Away team: Right side
- Optional: Club badge image
- Club name with primary team color accent

#### Score Display
- Format: "HOME 2 - 1 AWAY" (monospace)
- Font: 32px (compact), 40px (standard), 48px (expanded)
- Color: Highlight white (#ffffff)
- If home winning: Left side green glow
- If away winning: Right side green glow
- If draw: Center accent color glow

#### Interactivity
```typescript
interface MatchCardProps {
  match: MatchData;
  variant: 'compact' | 'standard' | 'expanded';
  userScore?: number;         // User's points from this match
  onClick?: () => void;       // Open detailed view
  onShare?: () => void;       // Share result
  showUserScore?: boolean;    // Show user points (default: true)
  showActions?: boolean;      // Show buttons (default: true)
}
```

### Mobile Responsiveness

**Tablet (768px)**
- Compact: 240×100px (smaller padding)
- Standard: 100% width minus 16px
- Expanded: 100% width minus 16px

**Mobile (375px)**
- Compact: 100% width (full width card)
- Standard: 100% width, stacked layout
- Expanded: 100% width, vertical sections
- Single column team stats
- Button: Full width stacked

### Build Files

- `/components/MatchCard/MatchCard.tsx` - Main dispatcher
- `/components/MatchCard/MatchCardCompact.tsx` - Compact variant
- `/components/MatchCard/MatchCardStandard.tsx` - Standard variant
- `/components/MatchCard/MatchCardExpanded.tsx` - Expanded variant
- `/components/MatchCard/MatchCard.module.css` - Shared styles
- `/components/MatchCard/MatchCard.stories.tsx` - Storybook

---

# COMPONENT 7: STANDINGSTABLE

## Purpose
League standings with sticky header and first column, trend indicators, and optional zone highlighting for promotion/relegation.

## Visual Specifications

### Table Structure

```
╔════╦═══════════════════╦════╦════╦════╦════╦═════╦═════╗
║ POS║ TEAM              ║ GP ║ W  ║ D  ║ L  ║ PTS ║ TRD ║
╠════╬═══════════════════╬════╬════╬════╬════╬═════╬═════╣
║ 1  ║ Manchester City   ║ 15 ║ 13 ║ 2  ║ 0  ║ 41  ║ ↑ +2║
║ 2  ║ Arsenal           ║ 15 ║ 12 ║ 2  ║ 1  ║ 38  ║ ↓ -1║
║ 3  ║ Newcastle United  ║ 15 ║ 11 ║ 3  ║ 1  ║ 36  ║ → 0 ║
║ 4  ║ Manchester United ║ 15 ║ 10 ║ 2  ║ 3  ║ 32  ║ ↑ +1║
║ 5  ║ Liverpool         ║ 15 ║ 10 ║ 2  ║ 3  ║ 32  ║ ↓ -1║
║ ... (scrollable)
║ 20 ║ Luton Town        ║ 15 ║ 1  ║ 2  ║ 12 ║ 5   ║ ↓↓-2║
╚════╩═══════════════════╩════╩════╩════╩════╩═════╩═════╝
```

#### Column Specifications

| Column | Header | Width | Content | Alignment | Sticky |
|--------|--------|-------|---------|-----------|--------|
| POS | Position | 50px | Number (1-20) | Center | Left |
| TEAM | Team Name | 200px | Club name + badge | Left | Left |
| GP | Games Played | 50px | Number (mono) | Center | No |
| W | Wins | 40px | Number (mono) | Center | No |
| D | Draws | 40px | Number (mono) | Center | No |
| L | Losses | 40px | Number (mono) | Center | No |
| PTS | Points | 60px | **Bold 24px mono** | Center | No |
| TRD | Trend | 60px | Arrow + change | Center | No |

#### Sticky Behavior
- **Header Row**: Sticky-top (always visible when scrolling down)
- **POS + TEAM Columns**: Sticky-left (always visible when scrolling right)
- Both stickies work together in corners
- Z-index: Header row 10, POS column 10, corner (both) 20

### Header Row Styling

```
┌─────────────────────────────────┐
│ POS │ TEAM         │ GP W D L PTS│
├─────────────────────────────────┤
│ Background: #1a2332 (dark-bg-secondary)
│ Border-bottom: 2px #4a9eff (primary accent)
│ Text: 12px uppercase, bold, secondary color
│ Padding: 12px
│ Z-index: 10 (above rows)
│ Position: sticky top 0
└─────────────────────────────────┘
```

### Data Rows

#### Visual
```
┌────┬──────────────────┬────┬────┬────┬────┬─────┬─────┐
│ 1  │ Manchester City  │ 15 │ 13 │ 2  │ 0  │ 41  │ ↑ +2│
├────┼──────────────────┼────┼────┼────┼────┼─────┼─────┤
│ Position: 2 │ Team with badge │ Stats (14px mono) │ Trend
│ Height: 48px
│ Padding: 12px
│ Border-bottom: 1px #252d3d
│ Hover: Background #252d3d, shadow elevation
└────┴──────────────────┴────┴────┴────┴────┴─────┴─────┘
```

#### Position Number Style
```
Font: 18px bold mono
Color: #f0f2f5 (primary text)
Width: 50px
Center alignment
Precedence indicator (visual weight)
```

#### Team Name Style
```
Layout: [Badge] [Team Name]
Badge: 32px × 32px circle with club colors
Gap: 8px
Team: 16px regular weight, primary text
Subtext (optional): 12px secondary (city/nickname)
```

#### Statistics Style
```
Font: 14px mono (normal)
Font: 24px mono (Points column only - bold)
Color: Highlight white
Alignment: Center
Gap between columns: 8px
```

#### Trend Indicator

Arrows and movement indicators:

```
Arrow │ Change │ Meaning
──────┼────────┼─────────────────────────
↑↑    │ +2     │ Up 2 positions
↑     │ +1     │ Up 1 position
→     │ 0      │ No change
↓     │ -1     │ Down 1 position
↓↓    │ -2     │ Down 2 positions
```

Styling:
```
Font: 12px mono bold
Positive change: #6bbf59 (success green)
Neutral (→): #a8adb8 (secondary gray)
Negative change: #ff5c5c (danger red)
Double arrow: Emphasis (larger movement)
```

### Zone Highlighting

Optional background coloring for league zones:

```
Rows 1-4:   Background: rgba(107, 191, 89, 0.05)  [Green - Promotion]
Rows 5-8:   Background: rgba(155, 132, 183, 0.05) [Purple - Playoff]
Rows 17-20: Background: rgba(255, 92, 92, 0.05)   [Red - Relegation]

Legend: Show at table bottom explaining zones
```

### Sorting & Filtering

#### Controls (Above Table)
```
Sort by: Points ▼
Filter: Team... | Country...
Show: All (20) | Top Half (10) | Bottom Half (10)
```

#### Sortable Columns
- Points (default)
- Win Percentage
- Goal Difference
- Form (last 5 matches)
- Position (a-z)

### Table Container

```
┌──────────────────────────────────────┐
│ LEAGUE STANDINGS                     │  Title: 24px bold
│ Matchday 15 of 38                    │  Subtitle: 12px secondary
│ ══════════════════════════════════════│  Divider
│                                      │
│ [Scrollable Table Area]              │  Max-height: 600px
│ ┌──────────────────────────────────┐ │  Overflow-y: auto
│ │ POS │ TEAM          │ ... │ ...  │ │  Scrollbar: styled
│ ├──────────────────────────────────┤ │
│ │ 1   │ Man City      │ ... │ ...  │ │
│ │ 2   │ Arsenal       │ ... │ ...  │ │
│ │ ... (20 rows total)                │
│ └──────────────────────────────────┘ │
│                                      │
│ LEGEND:                              │  Bottom legend
│ Top 4: Champions League             │
│ 5-8: Europa League                  │
│ 18-20: Relegation ↓                 │
└──────────────────────────────────────┘
```

### TypeScript Interface

```typescript
interface TeamStanding {
  position: number;
  team: string;
  teamId?: string;
  badge?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalFor: number;
  goalAgainst: number;
  goalDifference: number;
  form?: Array<'W' | 'D' | 'L'>;  // Last 5
  trend?: number;                  // Movement from previous
}

interface StandingsTableProps {
  standings: TeamStanding[];
  matchday?: number;
  season?: string;
  maxHeight?: number;         // default: 600px
  showZones?: boolean;        // Highlight promotion/relegation (default: true)
  sortBy?: 'points' | 'goalDiff' | 'form';
  onTeamClick?: (teamId: string) => void;
  highlightTeam?: string;     // Highlight user's team
  showLegend?: boolean;       // Show bottom legend (default: true)
}
```

### Mobile Responsiveness

**Tablet (768px)**
- Height: 500px (smaller)
- POS column: 40px
- TEAM column: 140px
- Font sizes: -10%
- Hide GP/W/D/L (show only in expanded view)

**Mobile (375px)**
- Height: 400px (priority screen space)
- Simplified columns: POS | TEAM | PTS | TRD only
- Other stats: Tap row to expand detail view
- Font: 12px (header), 12px (data)
- Horizontal scroll with thumb indicator

### Build Files

- `/components/StandingsTable/StandingsTable.tsx` - Main component
- `/components/StandingsTable/StandingsRow.tsx` - Individual row
- `/components/StandingsTable/StandingsTable.module.css` - Styles
- `/components/StandingsTable/StandingsTable.stories.tsx` - Storybook

---

# COMPONENT 8: STATUSBADGE

## Purpose
Small status indicator showing player/team condition (Fit, Injured, Doubtful, Returning, Suspended).

## Visual Specifications

### Badge Container

```
┌─────────────┐
│ ✓ FIT       │  Height: 24px (md size)
│ color: #6bbf59
└─────────────┘
```

#### Sizes

| Size | Height | Padding | Font | Use Case |
|------|--------|---------|------|----------|
| **sm** | 20px | 3px 8px | 11px | Inline, compact |
| **md** (default) | 24px | 4px 12px | 12px | Cards, lists |
| **lg** | 32px | 6px 16px | 14px | Modals, features |

### Status Types & Styling

#### FIT (Ready to Play)
```
Icon: ✓ (checkmark)
Background: rgba(107, 191, 89, 0.15)  [Success 15% opacity]
Text Color: #6bbf59 (success green)
Dot: Green circle before text
Label: "FIT"
Usage: Player available, full fitness
```

#### INJURED (Not Available)
```
Icon: × (cross) or 🏥
Background: rgba(255, 92, 92, 0.15)   [Danger 15% opacity]
Text Color: #ff5c5c (danger red)
Dot: Red circle before text
Label: "INJURED"
Pulsing: Optional pulse animation (2s)
Usage: Player unavailable
```

#### DOUBTFUL (Uncertain Availability)
```
Icon: ? (question mark)
Background: rgba(255, 184, 77, 0.15)  [Warning 15% opacity]
Text Color: #ffb84d (warning amber)
Dot: Amber circle before text
Label: "DOUBTFUL"
Animation: None (stable state)
Usage: Player status uncertain for upcoming match
```

#### RETURNING (Comeback)
```
Icon: ← (arrow)
Background: rgba(74, 158, 255, 0.15)  [Info 15% opacity]
Text Color: #4a9eff (info blue)
Dot: Blue circle before text
Label: "RETURNING"
Animation: Optional subtle pulse
Usage: Player returning from injury
```

#### SUSPENDED (Red Card Ban)
```
Icon: 🔴 (red circle)
Background: rgba(157, 132, 183, 0.15) [Tertiary 15% opacity]
Text Color: #9d84b7 (tertiary purple)
Dot: Purple circle before text
Label: "SUSPENDED"
Animation: None
Usage: Disciplinary suspension
```

### Badge Composition

```
┌──────────────────────┐
│ [●] STATUS TEXT      │
│ │   │   │            │
│ Dot Text  (optional subtitle)
│ 6px 8px  (16px from right)
└──────────────────────┘

dot-size: 8px circle (sm), 10px (md), 12px (lg)
gap: 6px (dot to text)
border-radius: 12px (pill shape, --radius-full)
```

### TypeScript Interface

```typescript
type StatusType = 'fit' | 'injured' | 'doubtful' | 'returning' | 'suspended';
type BadgeSize = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  status: StatusType;
  size?: BadgeSize;                   // default: 'md'
  showIcon?: boolean;                 // default: true
  showLabel?: boolean;                // default: true
  pulsing?: boolean;                  // For injured/doubtful (default: false)
  tooltip?: string;                   // Additional info on hover
  className?: string;
}
```

### States & Interactions

#### Hover State (Optional Tooltip)
```
Show: Detailed status information
Example: "Doubtful - Hamstring injury, 50% chance to play"
Tooltip: Appear above badge, 200ms delay
Dark background: #2a3545
Text: 12px secondary
Arrow pointing to badge
Fade in: 150ms
```

#### Active/Selected State
```
Border: 2px solid (status color)
Shadow: 0 0 16px rgba(status_color, 0.3)
Slightly larger text weight
```

### Mobile Responsiveness

All sizes responsive:
- Desktop: All sizes (sm, md, lg)
- Tablet: Mostly md size
- Mobile: sm or md only

### Placement Examples

```
In PlayerCard:
┌──────────────────┐
│ Player Name      │
│ Position | Rating│
│ Price: $12.5M    │
│ ✓ FIT            │  <-- StatusBadge
│ [SWAP] [INFO]    │
└──────────────────┘

In MatchTimeline:
65' RED CARD                 <-- Event title
Harry Maguire
🔴 SUSPENDED                 <-- StatusBadge after event

In Player List:
[Badge] Player Name    ✓ FIT  <-- Inline placement
```

### Build Files

- `/components/StatusBadge/StatusBadge.tsx` - Component
- `/components/StatusBadge/StatusBadge.module.css` - Styles
- `/components/StatusBadge/StatusBadge.stories.tsx` - Storybook

---

# COMPONENT 9: FORMINDICATOR

## Purpose
Visual representation of player form using 5 dots (last 5 matches). Dots filled based on rating or result.

## Visual Specifications

### Indicator Container

```
Rating: 8.2     ●●●●○
Form: Good      (4 of 5 filled)
                Space: 4px between dots

Dimension: 5 × 16px (circles × gap)
Total: 5×8px circles + 4×4px gaps = 56px
Height: 8px
```

#### Dot Styles

| Fill Status | Filled | Empty | Color |
|-------------|--------|-------|-------|
| **Excellent** (5/5) | ●●●●● | - | #6bbf59 (success green) |
| **Good** (4/5) | ●●●●○ | 1 | #6bbf59 (success) + #8b95a5 (neutral) |
| **Average** (3/5) | ●●●○○ | 2 | #ffb84d (warning amber) |
| **Poor** (2/5) | ●●○○○ | 2 | #ffb84d (warning) + #8b95a5 (neutral) |
| **Very Poor** (1/5) | ●○○○○ | 4 | #ff5c5c (danger red) |

### Visual Representation

#### By Last 5 Results
```
Example 1: W-W-D-W-L
Ratings: 8.2, 8.5, 7.8, 8.1, 6.9
Display: ●●●●○ (4 strong/acceptable, 1 loss)

Example 2: L-D-D-L-D
Ratings: 6.5, 7.2, 7.0, 6.8, 7.3
Display: ●●●○○ (3 acceptable, 2 losses)

Example 3: W-W-W-W-W
Ratings: 8.8, 8.9, 8.7, 8.6, 8.5
Display: ●●●●● (5 excellent)
```

### Hover State

```
Tooltip appears on hover (200ms delay)
Shows: Last 5 match details
┌─────────────────────────────────┐
│ Last 5 Matches                  │
│ ─────────────────────────────── │
│ Match 1: 8.2 (W vs Chelsea)    │
│ Match 2: 8.5 (W vs Arsenal)    │
│ Match 3: 7.8 (D vs Liverpool)  │
│ Match 4: 8.1 (W vs Brighton)   │
│ Match 5: 6.9 (L vs Man City)   │
└─────────────────────────────────┘

Position: Above indicator
Background: #2a3545
Text: 12px secondary
Fade in: 150ms
```

### TypeScript Interface

```typescript
interface FormIndicatorProps {
  rating: 1 | 2 | 3 | 4 | 5;         // Number of filled dots
  size?: 'sm' | 'md' | 'lg';         // default: 'md'
  color?: string;                     // Override dot color
  showTooltip?: boolean;              // default: true
  matchHistory?: Array<{              // Optional detailed data
    date: string;
    opponent: string;
    rating: number;
    result: 'W' | 'D' | 'L';
  }>;
  label?: boolean;                    // Show "Form: Good" text
}

// Dot sizes per variant
sizes = {
  sm: { dot: 6, gap: 3 },    // 6px dots, 3px gap
  md: { dot: 8, gap: 4 },    // 8px dots, 4px gap
  lg: { dot: 10, gap: 5 },   // 10px dots, 5px gap
}
```

### Placement Examples

```
In PlayerCard (Standard):
Cristiano Ronaldo
Rating: 8.7
Form: ●●●●○            <-- FormIndicator

In StandingsTable:
(Additional column - optional)
Man City    ●●●●●

In Match Result:
Top Performer: Ronaldo (8.7)
Recent Form: ●●●●○
```

### Build Files

- `/components/FormIndicator/FormIndicator.tsx` - Component
- `/components/FormIndicator/FormIndicator.module.css` - Styles
- `/components/FormIndicator/FormIndicator.stories.tsx` - Storybook

---

# COMPONENT 10: LAYOUT COMPONENTS

## Purpose
Structural components for page layout: Header, Sidebar, Card wrapper, ContentArea.

## Visual Specifications

### 10.1 Header Component

```
┌──────────────────────────────────────────────────────┐
│ ◀ CARTOLA ELIFOOT              MENU ⚙ SETTINGS      │
├──────────────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ MATCHES │ LEAGUE │ INFO         │
└──────────────────────────────────────────────────────┘
```

#### Header Container
```
Height: 64px
Background: var(--dark-bg-secondary)
Border-bottom: 2px #4a9eff (active indicator)
Padding: 0 var(--space-lg)
Position: sticky top 0
Z-index: 600 (--z-sticky)
Box-shadow: 0 4px 12px rgba(0,0,0,0.2)
```

#### Navigation Items
```
Layout: Horizontal flex row, gap 32px
Font: 14px uppercase bold
Color: var(--text-secondary)
Active: var(--text-highlight) + underline
Hover: var(--text-primary)
Transition: var(--transition-fast)

Mobile: Hamburger menu (three lines)
```

#### TypeScript
```typescript
interface HeaderProps {
  title?: string;                // "CARTOLA ELIFOOT"
  navItems?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
    active?: boolean;
  }>;
  rightActions?: React.ReactNode;  // Settings, menu, etc.
  onNavClick?: (item: string) => void;
  sticky?: boolean;              // default: true
}
```

---

### 10.2 Sidebar Component

```
┌──────────────┐
│ ☰ CARTOLA   │  Header: 56px
├──────────────┤
│ ◆ Dashboard │  Nav items: 48px height
│   Lineup    │  Padding: 8px 16px
│   Matches   │  Font: 14px
│   League    │  Icons: 20px left
│   Info      │
│              │
│ ─────────── │  Divider: 1px border
│   Settings  │
│   Help      │
│   Logout    │
└──────────────┘
```

#### Mobile Drawer Behavior
```
Width: 280px (or 80vw, whichever is smaller)
Position: Fixed left, z-index 700
Animation: Slide in from left 300ms
Backdrop: Overlay 50% opacity, click to close
Mobile breakpoint: < 768px
```

#### TypeScript
```typescript
interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  navItems?: NavigationItem[];
  secondaryItems?: NavigationItem[];
  currentPath?: string;
}
```

---

### 10.3 Card Wrapper Component

```
┌──────────────────────────────────────┐
│ CARD TITLE                           │
├──────────────────────────────────────┤
│                                      │
│ Card Content Here                    │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

#### Variants
```
Standard:
- Background: var(--dark-bg-primary)
- Border: 1px #252d3d
- Padding: 20px
- Border-radius: 8px
- Shadow: 0 4px 12px rgba(0,0,0,0.3)

Elevated:
- Background: var(--dark-bg-elevated)
- Shadow: 0 8px 24px rgba(0,0,0,0.4)

Compact:
- Padding: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.2)
```

#### TypeScript
```typescript
interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'standard' | 'elevated' | 'compact';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  className?: string;
}
```

---

### 10.4 ContentArea Component

```
┌───────────────────────────────────────────┐
│ Container (max-width: 1440px, centered)   │
│ ┌─────────────────────────────────────┐   │
│ │ Page Content (responsive grid)      │   │
│ │ - 12 columns desktop                │   │
│ │ - 8 columns tablet                  │   │
│ │ - 4 columns mobile                  │   │
│ │                                     │   │
│ └─────────────────────────────────────┘   │
└───────────────────────────────────────────┘
```

#### TypeScript
```typescript
interface ContentAreaProps {
  children: React.ReactNode;
  columns?: 'auto' | 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;  // Ignore max-width constraint
}
```

---

### 10.5 Grid Layout Component

Wrapper for responsive grid system:

```typescript
interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  responsive?: boolean;  // Auto-adjust per breakpoint
  as?: 'div' | 'section' | 'article';
}
```

### Build Files

- `/components/Layout/Header.tsx` - Header component
- `/components/Layout/Sidebar.tsx` - Sidebar component
- `/components/Layout/Card.tsx` - Card wrapper
- `/components/Layout/ContentArea.tsx` - Content area
- `/components/Layout/Grid.tsx` - Grid layout
- `/components/Layout/Layout.module.css` - All layout styles
- `/components/Layout/Layout.stories.tsx` - Storybook

---

## COMPONENT DEPENDENCIES MATRIX

### Build Order (Dependency Graph)

```
┌─────────────────────────────────────────┐
│ PHASE 2A: Foundation Components (Week 1)│
├─────────────────────────────────────────┤
│ 1. Button (no dependencies)             │
│ 2. FormIndicator (no dependencies)      │
│ 3. StatusBadge (no dependencies)        │
│ 4. Layout Components (Button dependency)│
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ PHASE 2B: Complex Components (Week 2)  │
├─────────────────────────────────────────┤
│ 5. PlayerCard (uses Button)             │
│ 6. StatPanel (no dependencies)          │
│ 7. MatchCard (uses Button)              │
│ 8. FormationBoard (uses Button, complex)│
│ 9. MatchTimeline (uses StatusBadge)     │
│ 10. StandingsTable (no dependencies)    │
└─────────────────────────────────────────┘
```

### Detailed Dependency List

| Component | Depends On | Required For |
|-----------|-----------|---|
| Button | None | PlayerCard, MatchCard, FormationBoard, Layout |
| FormIndicator | None | PlayerCard, Standings |
| StatusBadge | None | PlayerCard, MatchTimeline, MatchCard |
| Layout | Button | All pages |
| PlayerCard | Button, StatusBadge, FormIndicator | Dashboard, Lineup |
| StatPanel | None | MatchCard, Match Results, Team pages |
| MatchCard | Button, StatusBadge | Dashboard, Matches |
| FormationBoard | Button, PlayerCard | Lineup page |
| MatchTimeline | StatusBadge | Match pages |
| StandingsTable | None | Dashboard, League page |

---

## TESTING & VALIDATION STRATEGY

### Unit Testing Requirements

Each component needs:
- **Rendering**: Component renders without errors
- **Props**: All props work as documented
- **States**: All visual states (hover, active, disabled, focus) functional
- **Accessibility**: WCAG AA compliance, keyboard nav, ARIA labels
- **Responsive**: Works at 375px, 768px, 1440px breakpoints
- **Interactions**: Click, hover, keyboard events work

### Storybook Stories

Each component needs 5+ stories:
1. **Default** - Basic usage with minimal props
2. **All Variants** - Every visual variant documented
3. **Interactive** - Demo all interactive states
4. **Responsive** - Show at different breakpoints
5. **Accessibility** - Focus states, keyboard nav
6. **Edge Cases** - Long text, empty states, loading

### Component Checklist

```
For each component:

Visual Validation
[ ] Matches design spec exactly
[ ] Colors correct (hex values)
[ ] Spacing correct (8px multiples)
[ ] Typography matches (sizes, weights, fonts)
[ ] Shadows/elevations correct
[ ] Border-radius values match
[ ] Animations smooth (60fps)

Interaction Validation
[ ] Hover effects work
[ ] Focus states visible
[ ] Active states visual
[ ] Disabled states functional
[ ] Loading states work
[ ] Error states show correctly

Responsive Validation
[ ] 375px (mobile) layout correct
[ ] 768px (tablet) layout correct
[ ] 1440px (desktop) layout correct
[ ] No horizontal scrolling on mobile
[ ] Touch targets ≥ 44×44px
[ ] Images scale responsively

Accessibility Validation
[ ] Keyboard navigation works (Tab, Enter, Escape, arrows)
[ ] ARIA labels on icons
[ ] Form labels associated
[ ] Color contrast ≥ 4.5:1
[ ] Focus outline visible
[ ] Screen reader compatible
[ ] prefers-reduced-motion respected

Performance Validation
[ ] Rendering <100ms
[ ] No layout shifts (CLS)
[ ] CSS optimized (no redundant rules)
[ ] File size <50KB (minified)
[ ] No memory leaks (React.memo if needed)

TypeScript Validation
[ ] All props typed
[ ] No 'any' types
[ ] Interfaces exported
[ ] JSDoc comments for complex props
[ ] Events properly typed
```

### Build Quality Gate

Component is "done" when:
- All unit tests passing (>90% coverage)
- Storybook stories show all variants
- Lighthouse accessibility score = 100
- No TypeScript errors
- No console warnings
- Responsive at all breakpoints
- Keyboard navigation working
- WCAG AA contrast verified

---

## SUMMARY & NEXT STEPS

### Phase 2 Deliverables (Weeks 3-4)

Build 10 core components in this order:
1. **Week 3 Early** (Days 1-3): Button, FormIndicator, StatusBadge
2. **Week 3 Late** (Days 4-5): Layout, PlayerCard begins
3. **Week 4 Early** (Days 1-2): PlayerCard finalization
4. **Week 4 Middle** (Days 3-4): StatPanel, MatchCard, MatchTimeline
5. **Week 4 Late** (Days 5): FormationBoard (complex), StandingsTable polish

### Quality Checklist Before "Done"
- [ ] 10 components fully built
- [ ] All TypeScript types exported
- [ ] Storybook documentation complete
- [ ] All unit tests passing
- [ ] Mobile responsive verified
- [ ] Accessibility compliant (WCAG AA)
- [ ] No console errors/warnings
- [ ] Code reviewed by peer
- [ ] Performance optimized (<50KB per component)

### Phase 3 Readiness
Once Phase 2 complete, Phase 3 (Page Redesigns) can begin immediately using these components.

---

**STATUS**: Design Audit Complete. Ready for CODER implementation.
**NEXT STEP**: Begin Phase 2 component development (start with Button).

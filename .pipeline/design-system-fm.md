# Cartola Elifoot Design System
## Professional Football Management Aesthetic

Inspired by Football Manager's interface design – a proven, professional approach to sports management software UI/UX.

---

## 1. Design Philosophy

**Core Principles:**
- **Information Hierarchy**: Critical data (stats, scores, formations) always visible and prominent
- **Professional Simplicity**: No clutter, every element serves a purpose
- **Dark Aesthetic**: Reduces eye strain during extended play sessions, conveys professionalism
- **Rapid Navigation**: Users must reach any screen within 2-3 clicks
- **Data Clarity**: Numbers and metrics must be instantly readable and comparable
- **Micro-interactions**: Smooth, purposeful animations that don't distract
- **Accessibility**: High contrast ratios, clear visual states, readable at all sizes

**Design Language**: 
Modern professional management interface – serious, efficient, trusted. Similar visual language to Football Manager, Figma's dark mode, and professional web applications.

---

## 2. Color Palette

### Primary Backgrounds
```
DARK_BG_PRIMARY:     #0f1419  (Main background, cards)
DARK_BG_SECONDARY:   #1a2332  (Hover states, alternate sections)
DARK_BG_TERTIARY:    #252d3d  (Borders, subtle contrast)
DARK_BG_ELEVATED:    #2a3545  (Modals, overlays, prominent cards)
```

### Accent Colors (Action & Status)
```
PRIMARY_ACCENT:      #4a9eff  (Primary actions, links, active states)
SECONDARY_ACCENT:    #6bbf59  (Success, gains, positive stats)
WARNING_ACCENT:      #ffb84d  (Caution, injuries, warnings)
DANGER_ACCENT:       #ff5c5c  (Errors, losses, critical alerts)
TERTIARY_ACCENT:     #9d84b7  (Formation highlights, tactical displays)
```

### Semantic Colors
```
SUCCESS:             #6bbf59  (Green - Won match, positive metrics)
WARNING:             #ffb84d  (Amber - Injured player, caution)
DANGER:              #ff5c5c  (Red - Lost match, critical issues)
INFO:                #4a9eff  (Blue - Transfers, notifications)
NEUTRAL:             #8b95a5  (Gray - Disabled, historical data)
```

### Text Colors
```
TEXT_PRIMARY:        #f0f2f5  (Main text, high contrast)
TEXT_SECONDARY:      #a8adb8  (Secondary info, labels)
TEXT_TERTIARY:       #7a8190  (Disabled, muted text)
TEXT_HIGHLIGHT:      #ffffff  (Bold numbers, emphasis)
```

### Formation/Tactical Colors
```
FORMATION_DEFENDER:  #5b9fd8  (Blue - Defenders)
FORMATION_MIDFIELDER:#8b7fd8  (Purple - Midfielders)
FORMATION_FORWARD:   #d85b5b  (Red - Forwards)
FORMATION_GOALKEEPER:#4a9eff  (Cyan - Goalkeeper)
```

### Gradients
```
GRADIENT_ACCENT:     linear-gradient(135deg, #4a9eff 0%, #9d84b7 100%)
GRADIENT_SUCCESS:    linear-gradient(135deg, #6bbf59 0%, #4a9eff 100%)
GRADIENT_DANGER:     linear-gradient(135deg, #ff5c5c 0%, #ffb84d 100%)
```

---

## 3. Typography

### Font Stack
```
Primary Font:  'Inter', 'Segoe UI', -apple-system, sans-serif
              (Clean, professional, excellent readability at all sizes)
Fallback:     -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

Number Font:   'IBM Plex Mono', 'Courier New', monospace
              (For statistics, scores, jersey numbers - perfect alignment)
```

### Type Scale

**Headings**
```
H1 - Page Title:        32px / 40px line-height, 700 weight, TEXT_PRIMARY
     Usage: Main page titles (Dashboard, Lineup, Matches)
     
H2 - Section Header:    24px / 32px line-height, 600 weight, TEXT_PRIMARY
     Usage: Card headers, major sections
     
H3 - Card Title:        18px / 24px line-height, 600 weight, TEXT_PRIMARY
     Usage: Player cards, match cards, stats panels
     
H4 - Label/Subtitle:    14px / 20px line-height, 600 weight, TEXT_SECONDARY
     Usage: Formation names, status labels, mini-headers
```

**Body Text**
```
Body Large:   16px / 24px line-height, 400 weight, TEXT_PRIMARY
            Usage: Match descriptions, detailed information

Body Regular: 14px / 20px line-height, 400 weight, TEXT_PRIMARY
            Usage: Most content, card descriptions, team info

Body Small:   12px / 16px line-height, 400 weight, TEXT_SECONDARY
            Usage: Secondary information, timestamps, hints
```

**Numbers (Stats, Scores, Ratings)**
```
Stat Number:  24px / 32px line-height, 700 weight, TEXT_HIGHLIGHT, monospace
            Usage: Points, goals, ratings, jersey numbers
            Letter-spacing: -0.02em (tighter for numbers)

Score Large:  48px / 56px line-height, 700 weight, TEXT_HIGHLIGHT, monospace
            Usage: Match scores, final results
            
Stat Small:   14px / 20px line-height, 600 weight, TEXT_HIGHLIGHT, monospace
            Usage: Player stats inline, mini metrics
```

**Interactive Elements**
```
Button Text:  14px / 20px line-height, 600 weight, TEXT_PRIMARY, uppercase
            Letter-spacing: 0.05em
            Usage: All buttons

Link Text:    14px / 20px line-height, 400 weight, PRIMARY_ACCENT
            Text-decoration: underline on hover
```

### Text Hierarchy Example
```
                    Dashboard
                    ═══════════════════════════
   
   Matchday 15                                    Nov 15, 2024
   
   Your Score: 87.3 pts                           Rank: 4,234
   
   Team Stats: 5W 2D 1L  |  42 scored  |  18 against
```

---

## 4. Layout System

### Grid Foundation
- **Base Unit**: 8px (all spacing multiples of 8)
- **Desktop Grid**: 12 columns, 1440px max width
- **Tablet Grid**: 8 columns, 768px breakpoint
- **Mobile Grid**: 4 columns, 375px breakpoint
- **Gutter**: 16px (desktop), 12px (tablet), 8px (mobile)

### Spacing Scale
```
xs:  4px    (tight spacing, micro-interactions)
sm:  8px    (compact spacing)
md:  16px   (standard spacing)
lg:  24px   (generous spacing)
xl:  32px   (large section gaps)
2xl: 48px   (major section separation)
```

### Card System
```
Border Radius:    8px (main cards, buttons)
               12px (large cards, modals)
               4px  (subtle borders, inputs)

Card Elevation:   Shadow 0 4px 12px rgba(0, 0, 0, 0.3)
Hover Elevation:  Shadow 0 8px 24px rgba(0, 0, 0, 0.4)
Modal Elevation:  Shadow 0 16px 40px rgba(0, 0, 0, 0.5)

Card Padding:     20px (standard)
               16px (compact)
               24px (spacious - featured cards)
```

### Responsive Layout Examples

**Dashboard - Desktop (12 columns)**
```
┌─────────────────────────────────────────────┐
│  CARTOLA ELIFOOT                     Settings│
├─────────────────────────────────────────────┤
│                                             │
│  Matchday 15     Your Score: 87.3   Season │
│                                             │
├──────────────────┬──────────────────┬──────┤
│                  │                  │      │
│   Lineup Stats   │  Formation       │ Info │
│   (6 cols)       │  (3 cols)        │(3 c) │
│                  │                  │      │
├──────────────────┴──────────────────┴──────┤
│                                             │
│  Recent Matches (12 cols)                   │
│  ┌──────────┬──────────┬──────────┐        │
│  │ Match 1  │ Match 2  │ Match 3  │        │
│  └──────────┴──────────┴──────────┘        │
│                                             │
├─────────────────────────────────────────────┤
│  League Standings (12 cols)                 │
│  Table with 10 cols visible, horizontal... │
│                                             │
└─────────────────────────────────────────────┘
```

**Dashboard - Mobile (4 columns)**
```
┌──────────────────┐
│ CARTOLA ELIFOOT  │ [≡]
├──────────────────┤
│ Matchday 15      │
│ Your Score: 87.3 │
├──────────────────┤
│  Lineup (4 cols) │
│                  │
├──────────────────┤
│  Formation (4)   │
│                  │
├──────────────────┤
│  Recent Matches  │
│  ┌────────────┐  │
│  │  Match 1   │  │
│  └────────────┘  │
│  ┌────────────┐  │
│  │  Match 2   │  │
│  └────────────┘  │
├──────────────────┤
│ Standings scroll │
└──────────────────┘
```

---

## 5. Component System

### 5.1 Player Card
Professional player card showing essential information at a glance.

```
┌─────────────────────────────┐
│ ┌──┐  Cristiano Ronaldo  ╳ │
│ │  │  Manchester United     │
│ │  │  ST | Rating: 8.7      │
│ │  │                        │
│ │  │  Fitness: 95%   ▓▓▓░   │
│ │  │  Form: ●●●●○            │
│ │  │                        │
│ │ J├──────────────────────┤ │
│ │ER│ Goals: 12  |  Asst: 4 │ │
│ │S│ Rating: 8.7           │ │
│ │  │ Status: Fit ✓         │ │
│ │  │                        │
│ │  │ ◀ SUBSTITUTE ▶         │
│ │  │ [SELECT]  [INFO]       │
│ │  │                        │
│ └──┘─────────────────────┘ │
└─────────────────────────────┘
```

**Variations:**
- **Compact (Lineup List)**: Jersey + Name + Position + Rating, minimal
- **Detailed (Popup)**: Full stats, performance graph, injuries, form
- **Formation View**: Just jersey number and position, no text (circular, positioned on field)

### 5.2 Formation Visualization
Tactical board showing 11 players in formation with real-time data.

```
                    GK: Dave Henderson (84)
                            ◉
                            |
              DF: Reece James   DF: Harry Maguire
              ◉               ◉
            /                   \
        ◉   ◉ DF: John Stones      ◉
      RWB   CB                  CB  LWB
   Trentin Santos              Kyle Walker-Peters
    
        ◉         ◉         ◉
      CM     CM      CM
   Rice   Hojbjerg  Mount
   
        ◉              ◉
      LW            RW
   Grealish      Mahrez
   
            ◉
           ST
        Haaland (9.2)


┌────────────────────────────────┐
│ Formation: 3-4-3               │
│ Instructions: Balanced         │
│ Defensive Level: Normal        │
└────────────────────────────────┘
```

**Interactions:**
- Click player → Opens quick stats popup
- Drag player → Reposition on field (valid positions only)
- Hover → Highlight player stats overlay
- Formation buttons → Switch between preset formations (4-4-2, 4-3-3, 3-5-2, etc)

### 5.3 Match Event Display
Real-time match events shown in timeline format.

```
┌─────────────────────────────────────┐
│ Live Match: Man Utd 2-1 Liverpool   │
│ 35' of 90' | Half-time approaching  │
├─────────────────────────────────────┤
│                                     │
│  34' ⚽ GOAL! Haaland (Penalty)    │
│      +8 pts                         │
│      [Manchester United lead 2-1]   │
│                                     │
│  28' 🟡 Yellow Card: Salah          │
│      Unsporting behavior            │
│                                     │
│  22' 🔄 Substitution                │
│      OFF: Antony  →  ON: Sancho    │
│                                     │
│  15' ⚽ GOAL! Salah (Assist: TAA)  │
│      +7 pts                         │
│      [Liverpool equalize 1-1]       │
│                                     │
│  8'  🔄 Substitution                │
│      OFF: Neville → ON: De Gea      │
│                                     │
│  0'  🏁 Match Kickoff               │
│      Manchester United vs Liverpool │
│                                     │
└─────────────────────────────────────┘
```

### 5.4 Statistics Panel
Compact display of key player and team metrics.

```
┌─────────────────────────┐
│ PLAYER STATS            │
├─────────────────────────┤
│                         │
│ Shots on Target:    8   │ ▓▓▓▓░░░░░░
│ Pass Accuracy:     88%  │ ▓▓▓▓▓▓▓▓░░
│ Tackles Won:        6   │ ▓▓▓▓▓░░░░░
│ Dribbles:          12   │ ▓▓▓▓▓▓░░░░
│ Possession Lost:    4   │ ▓░░░░░░░░░
│ Fouls Committed:    2   │ ░░░░░░░░░░
│                         │
└─────────────────────────┘

┌─────────────────────────┐
│ TEAM STATS              │
├─────────────────────────┤
│ Possession:    48%      │ ▓▓▓▓░░░░░░
│ Shots:          15      │ ▓▓▓▓░░░░░░
│ Corners:         3      │ ▓░░░░░░░░░
│ Passes:        542      │ ▓▓▓▓▓░░░░░
│ Tackles:        28      │ ▓▓▓░░░░░░░
│ Clearances:     16      │ ▓▓░░░░░░░░
│                         │
└─────────────────────────┘
```

### 5.5 Match Card (Results/Upcoming)
Compact match information with essential details.

```
┌──────────────────────────────────────┐
│                                      │
│  Matchday 15                Fri, Oct 28│
│                                      │
│      Manchester United  2  -  1      │
│            Man Utd               Liverpool
│           (Haaland 2)        (Salah)
│                                      │
│  Possession: 52% vs 48%              │
│  Shots: 18 vs 12                     │
│  Your Score: +42 pts     Formation: ▼
│                                      │
│  [WATCH HIGHLIGHTS]  [DETAILED STATS]│
│                                      │
└──────────────────────────────────────┘
```

### 5.6 League Standings Card
Compact league table entry with key information.

```
┌─────────────────────────────────────────────────┐
│ POS │ TEAM              │ GP │ W  D  L  PTS      │
├─────────────────────────────────────────────────┤
│  1  │ Manchester City   │ 15 │ 13 2  0  41   ↑  │
│  2  │ Arsenal           │ 15 │ 12 2  1  38   →  │
│  3  │ Newcastle United  │ 15 │ 11 3  1  36   ↓  │
│  4  │ Manchester United │ 15 │ 10 2  3  32   ←  │
│  5  │ Liverpool         │ 15 │ 10 2  3  32   =  │
│  ... │ ...               │ ... │       ...  ...  │
│  20 │ Luton Town        │ 15 │  1  2 12   5   ↓ │
│                                                  │
└─────────────────────────────────────────────────┘

Legend: ↑ Up (promoted)  ↓ Down (relegated)  → Same  ← Injury
```

### 5.7 Buttons & Interactive Elements

**Button Variants:**

Primary Button (Main Actions)
```
┌─────────────────────┐
│  CONFIRM LINEUP     │ Dark mode: bg-PRIMARY_ACCENT, text-white
└─────────────────────┘
Hover:   shadow 0 8px 16px rgba(74, 158, 255, 0.3)
Active:  shadow inset, slightly darker
```

Secondary Button (Alternative Actions)
```
┌─────────────────────┐
│  VIEW DETAILS       │ Dark mode: border-PRIMARY_ACCENT, text-PRIMARY_ACCENT
└─────────────────────┘
Hover:   bg-DARK_BG_SECONDARY
```

Danger Button (Destructive)
```
┌─────────────────────┐
│  REMOVE PLAYER      │ Dark mode: bg-DANGER_ACCENT, text-white
└─────────────────────┘
Hover:   shadow 0 8px 16px rgba(255, 92, 92, 0.3)
```

Disabled Button
```
┌─────────────────────┐
│  LOCKED             │ Muted, no interaction
└─────────────────────┘
```

**Input Fields:**

```
Formation Name
┌──────────────────────────────────┐
│ 4-3-3 Balanced                   │  Label above, bg-DARK_BG_SECONDARY
└──────────────────────────────────┘
  Border: 1px DARK_BG_TERTIARY
  Focus: border-PRIMARY_ACCENT, shadow glow
  Error: border-DANGER_ACCENT
```

### 5.8 Navigation Elements

**Top Navigation Bar:**
```
┌──────────────────────────────────────────────────────┐
│ ◀ CARTOLA ELIFOOT                          ⚙ SETTINGS│
├──────────────────────────────────────────────────────┤
│  Dashboard  │  Lineup  │  Matches  │  League  │ Info  │
│  ◊          │          │           │          │       │
└──────────────────────────────────────────────────────┘

Active indicator: Underline in PRIMARY_ACCENT, bold text
Hover: bg-DARK_BG_SECONDARY, smooth transition
```

**Sidebar Navigation (Mobile):**
```
┌──────────────────┐
│ ☰ CARTOLA  ⚙    │
├──────────────────┤
│ ◊ Dashboard      │
│   Lineup         │
│   Matches        │
│   League         │
│   Info           │
│                  │
│ ─────────────── │
│   Settings       │
│   Help           │
│   Logout         │
└──────────────────┘
```

### 5.9 Status Badges & Tags

**Status Indicators:**
```
✓ FIT         (bg-SUCCESS, green dot)
⚠ DOUBTFUL    (bg-WARNING, amber dot)
✕ INJURED     (bg-DANGER, red dot)
🔄 RETURNING  (bg-INFO, blue dot)
```

**Form Indicators:**
```
Excellent   ●●●●●  (all green)
Good        ●●●●○  (4 green, 1 gray)
Average     ●●●○○  (3 green, 2 gray)
Poor        ●●○○○  (2 green, 3 gray)
```

---

## 6. Visual Hierarchy

### Information Priority Levels

**Level 1 - Critical/Immediate Actions**
- Large, bold numbers (scores, points)
- Bright accent colors
- Primary buttons
- Current player name in formation

**Level 2 - Important Context**
- Secondary headers
- Key statistics
- Active/hover states
- Secondary information

**Level 3 - Supporting Details**
- Small labels
- Historical data
- Disabled states
- Muted text

**Level 4 - Background/Reference**
- Very small text
- Timestamps
- Source attribution
- Low opacity elements

### Layout Hierarchy
```
Hierarchy Depth:
1. Hero Section (Dashboard score, formation)
   ↓
2. Primary Panels (Lineup, Stats, Recent Matches)
   ↓
3. Secondary Information (Details, History)
   ↓
4. Meta Information (Settings, Help, Timestamps)
```

---

## 7. Dark Mode (Primary)

Football Manager uses dark mode exclusively for good reason:
- Reduces eye strain during extended sessions
- Conveys professionalism and sophistication
- Numbers and bright colors stand out better
- Better battery life on OLED screens

**Implementation:**
- All backgrounds use DARK_BG_* palette
- All text uses TEXT_* palette with appropriate contrast ratios (WCAG AA minimum 4.5:1)
- Accent colors maintain high saturation for visibility
- Borders use DARK_BG_TERTIARY for subtle definition

**Light Mode (Not Recommended):**
If light mode is needed:
- Invert backgrounds (white/light gray instead of dark)
- Use darker text (charcoal instead of light gray)
- Reduce accent color saturation slightly
- Maintain same structure and spacing

---

## 8. Interactive States

### Button States
```
Default:   bg-PRIMARY_ACCENT, text-white, shadow subtle
Hover:     shadow 0 8px 16px rgba(74, 158, 255, 0.3), transform scale(1.02)
Active:    shadow inset 0 2px 4px rgba(0, 0, 0, 0.3)
Focus:     border 2px PRIMARY_ACCENT, outline none
Disabled:  opacity 0.4, cursor not-allowed, no shadow
Loading:   animated spinner overlay, disabled state
```

### Card States
```
Default:   bg-DARK_BG_PRIMARY, border-DARK_BG_TERTIARY
Hover:     bg-DARK_BG_SECONDARY, shadow elevation up
Selected:  border-PRIMARY_ACCENT 2px, shadow PRIMARY_ACCENT glow
Focus:     same as selected (for keyboard navigation)
Disabled:  opacity 0.5, no shadow
```

### Form Input States
```
Default:    bg-DARK_BG_SECONDARY, border-DARK_BG_TERTIARY, text-TEXT_PRIMARY
Hover:      border-DARK_BG_TERTIARY (slightly lighter)
Focus:      border-PRIMARY_ACCENT 2px, shadow glow PRIMARY_ACCENT
Filled:     bg-DARK_BG_SECONDARY, text-TEXT_PRIMARY
Valid:      border-SUCCESS, green checkmark
Invalid:    border-DANGER, red error icon, error message below
Disabled:   bg-DARK_BG_PRIMARY, text-TEXT_TERTIARY, opacity 0.5
Loading:    animated background gradient
```

### Player Card States (in Lineup)
```
Unselected: opacity 0.7, grayscale subtle
Available:  normal opacity, ready to select
Selected:   border-PRIMARY_ACCENT 3px, glow effect, elevated shadow
Hovering:   shadow elevated, slight scale increase (1.05)
Dragging:   opacity 0.8, shadow 0 16px 32px, cursor grab-active
```

---

## 9. Animations & Motion

**Design Principle**: Animations should feel smooth but never distract. They confirm user actions and provide feedback.

### Transition Timings
```
Micro-interactions (hover, focus):      150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
State changes (show/hide):              200ms same easing
Page transitions (fade):                300ms same easing
Complex animations (match events):      400-600ms for full sequence
```

### Common Animations

**Fade In (Page Load)**
```
opacity: 0 → 1, duration: 300ms, easing: ease-out
```

**Slide Up (Card Entry)**
```
transform: translateY(10px) → translateY(0)
opacity: 0 → 1
duration: 300ms, easing: ease-out
```

**Pulse (Status Alert)**
```
@keyframes pulse {
  0%   { box-shadow: 0 0 0 0 rgba(255, 92, 92, 0.7) }
  70%  { box-shadow: 0 0 0 12px rgba(255, 92, 92, 0) }
  100% { box-shadow: 0 0 0 0 rgba(255, 92, 92, 0) }
}
Duration: 2s, repeat: infinite
Usage: Injury alerts, critical notifications
```

**Progress Fill (Match Time)**
```
width: 0% → 100%
duration: 45s linear (for full match)
duration: 1.5s ease-out (for match event bar)
```

**Scale Bounce (Goal Scored)**
```
transform: scale(0.95) → scale(1.1) → scale(1)
duration: 400ms, easing: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

**Rotation (Loading Spinner)**
```
@keyframes spin {
  0%   { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
Duration: 1s, linear, infinite
```

**Match Event Slide In**
```
transform: translateY(100%) → translateY(0)
opacity: 0 → 1
duration: 300ms ease-out
StaggerChildren: 50ms (for multiple events)
```

**Formation Player Reposition**
```
transform: translate(x, y)
duration: 250ms cubic-bezier(0.4, 0.0, 0.2, 1)
(Smooth, responsive feel)
```

---

## 10. Visual Examples

### Example 1: Home/Dashboard Screen

```
┌─────────────────────────────────────────────────────────────────┐
│ ◀ CARTOLA ELIFOOT                                    ⚙ SETTINGS │
├─────────────────────────────────────────────────────────────────┤
│ DASHBOARD │ LINEUP │ MATCHES │ LEAGUE │ INFO                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MATCHDAY 15 - SEASON 2024/25              Thursday, November 15│
│                                                                  │
│  YOUR SCORE: 87.3 PTS  │  TEAM RANK: 4,234  │  CHANGE: +5 PTS  │
│                                                                  │
├──────────────────────────┬──────────────┬───────────────────────┤
│                          │              │                       │
│  LINEUP OVERVIEW         │ FORMATION    │  TODAY'S MATCHES      │
│  ─────────────────       │ ───────────  │  ──────────────────   │
│  11 Selected             │ 4-3-3        │                       │
│  Fitness: 94% avg        │ Balanced     │  Man Utd  vs  Arsenal │
│                          │              │  Kick-off: 20:00      │
│  Formation: 4-3-3        │     GK       │  Status: Starting     │
│  Status: CONFIRMED ✓     │   ◉          │                       │
│                          │  / | \       │  Liverpool vs Chelsea │
│  ◆ Players Rating        │ ◉  ◉  ◉     │  Kick-off: 17:30      │
│    Avg: 7.8              │  \ | /      │  Status: In Progress  │
│    Highest: 8.7          │   ◉ ◉ ◉    │                       │
│    Lowest: 6.5           │    ST        │  City vs Newcastle    │
│                          │              │  Kick-off: 16:00      │
├──────────────────────────┴──────────────┴───────────────────────┤
│                                                                  │
│  RECENT MATCHES (Last 5 Gameweeks)                              │
│  ┌──────────────────┬──────────────────┬──────────────────┐     │
│  │ Man Utd  2 - 1   │ Arsenal  1 - 1   │ Chelsea  3 - 0   │     │
│  │ Liverpool        │ Man City         │ Brighton         │     │
│  │                  │                  │                  │     │
│  │ Your Score: 51   │ Your Score: 38   │ Your Score: 62   │     │
│  │ ⚽⚽ Haaland      │ ⚽ Saka, Tomiyasu│ ⚽⚽⚽ Havertz    │     │
│  │    (Penalty)     │                  │                  │     │
│  └──────────────────┴──────────────────┴──────────────────┘     │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LEAGUE STANDINGS - TOP 5                                       │
│  ┌────┬───────────────────┬────┬────┬────┬────┬─────┐          │
│  │ POS│ TEAM              │ GP │ W  │ D  │ L  │ PTS │          │
│  ├────┼───────────────────┼────┼────┼────┼────┼─────┤          │
│  │  1 │ Manchester City   │ 15 │ 13 │ 2  │ 0  │ 41  │ ↑ +2    │
│  │  2 │ Arsenal           │ 15 │ 12 │ 2  │ 1  │ 38  │ ↓ -1    │
│  │  3 │ Newcastle United  │ 15 │ 11 │ 3  │ 1  │ 36  │ → Same  │
│  │  4 │ Manchester United │ 15 │ 10 │ 2  │ 3  │ 32  │ ↑ +1    │
│  │  5 │ Liverpool         │ 15 │ 10 │ 2  │ 3  │ 32  │ ↓ -1    │
│  └────┴───────────────────┴────┴────┴────┴────┴─────┘          │
│                                                                  │
│                    [VIEW FULL TABLE]  [PREDICTIONS]             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Example 2: Lineup Selection with Formation

```
┌─────────────────────────────────────────────────────────────────┐
│ ◀ LINEUP SELECTION                                  [HELP] [SAVE]│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FORMATION: 4-3-3 BALANCED                                      │
│  Status: EDITABLE - Click players to change                     │
│                                                                  │
├───────────────────────────────────────────────────────────────┬─┤
│                                                               │S│
│  Tactical Board                       Player Selection        │T│
│  ┌──────────────────────────────┐    ┌──────────────────┐   │A│
│  │         Henderson (GK)       │    │ GK SELECTED      │   │T│
│  │              ◉               │    │ David Henderson  │   │U│
│  │              |               │    │ Rating: 7.2      │   │S│
│  │    Reece ◉      ◉ Stones    │    │ Price: 3.5M      │   │
│  │        / James   CB  \       │    │ Fitness: 98%     │   │
│  │       /           \          │    │ Status: FIT ✓    │   │
│  │      ◉             ◉ Walker│    │                  │   │
│  │    Mount  ◉ Rice ◉  Hojbjerg│    │ [SWAPOUT]        │   │
│  │           CM  CM  CM         │    │                  │   │
│  │         (Click to swap)      │    │ ST: Alternative  │   │
│  │      ◉         ◉ Mahrez     │    │ Options:         │   │
│  │   Grealish    LW     RW      │    │ ◆ Harland (8.9)  │   │
│  │      LW                      │    │ ◆ Haaland (8.8)  │   │
│  │            ◉                 │    │ ◆ Kane (8.5)     │   │
│  │         Haaland (ST)         │    │ ◆ Auba (7.9)     │   │
│  │                              │    │                  │   │
│  └──────────────────────────────┘    └──────────────────┘   │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  SUMMARY                                                    │
│  Formation: 4-3-3        Budget Used: 89.3M / 100M          │
│  Total Rating: 7.8       Fitness: 94%  avg                  │
│  Avg Price: 5.2M         Team Value: 89.3M                  │
│                                                              │
│  ────────────────────────────────────────────────────────   │
│                                                              │
│  [CLEAR SELECTION]  [PRESET FORMATIONS▼]  [CONFIRM LINEUP] │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Example 3: Match Simulation (Play-by-Play)

```
┌─────────────────────────────────────────────────────────────────┐
│ ◀ LIVE MATCH                                    [STATS] [PAUSE] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│              MANCHESTER UNITED 2 - 1 LIVERPOOL                  │
│                                                                  │
│  Possession: 56% ▓▓▓▓▓▓░░░░  vs  44% ░░░░░▓▓▓▓                 │
│  Shots: 18 ▓▓▓▓▓░░░░░░  vs  12 ▓▓▓░░░░░░░░░                   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  MATCH TIME: 67' / 90'                          Half: 2nd      │
│                                                                  │
│  ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░ Estimated finish: 20:45                │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RECENT EVENTS (Latest at top)                                 │
│                                                                  │
│  67' ⚽ GOAL!                                                    │
│      Cristiano Ronaldo (Penalty)                                │
│      Manchester United 2 - 1 Liverpool                          │
│      │ Player Rating Impact: +2.5                              │
│      │ Team Score: +8 pts                                       │
│                                                                  │
│  62' 🔄 SUBSTITUTION                                            │
│      OFF: Antony          ON: Sancho                            │
│      Manchester United attacking move                           │
│      │ Fresh legs incoming                                     │
│                                                                  │
│  58' ⚽ GOAL!                                                    │
│      Mohamed Salah (Open play)                                  │
│      Assist: Trent Alexander-Arnold                            │
│      Manchester United 1 - 1 Liverpool                          │
│      │ Player Rating Impact: +1.8                              │
│      │ Team Score: +7 pts                                       │
│                                                                  │
│  45' ⏱ HALF-TIME                                                │
│      Manchester United 1 - 0 Liverpool                          │
│      Half-time stats visible                                   │
│                                                                  │
│  32' 🟡 YELLOW CARD                                             │
│      Fred (Manchester United)                                   │
│      Rash challenge                                             │
│      │ Caution - next card is red                              │
│                                                                  │
│  15' ⚽ GOAL!                                                    │
│      Bruno Fernandes                                            │
│      Manchester United 1 - 0 Liverpool                          │
│      │ Assist: Rasmus Hojbjerg                                 │
│      │ Rating: 8.1                                             │
│      │ Team Score: +8 pts                                       │
│                                                                  │
│  0' 🏁 KICKOFF                                                  │
│      Manchester United 0 - 0 Liverpool                          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PLAYER PERFORMANCE (Top performers)                            │
│  ┌─────────────┬─────────────┬─────────────┐                   │
│  │ Ronaldo     │ Fernandes   │ Salah       │                   │
│  │ ST          │ CM          │ LW          │                   │
│  │ Rating: 8.7 │ Rating: 8.4 │ Rating: 7.9 │                   │
│  │ Goals: 1    │ Assists: 1  │ Goals: 1    │                   │
│  │ Shots: 5    │ Tackles: 3  │ Shots: 4    │                   │
│  └─────────────┴─────────────┴─────────────┘                   │
│                                                                  │
│          [CONTINUE WATCHING]  [FULL STATS]  [TIMELINE]         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Example 4: Results & Statistics (Post-Match)

```
┌─────────────────────────────────────────────────────────────────┐
│ ◀ MATCH RESULT                                 Thursday, Nov 15│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                    FINAL SCORE                                  │
│                                                                  │
│          MANCHESTER UNITED  2  -  1  LIVERPOOL                  │
│                                                                  │
│  Goals:                    Goals:                               │
│  Ronaldo (15', 67' Pen)    Salah (58')                          │
│  Fernandes (32')           TAA (Assist)                         │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  MATCH STATISTICS                                               │
│  ┌───────────────────┬──────────┬──────────┬────────────────┐   │
│  │ Stat              │ Man Utd  │ Liverpool│ Difference     │   │
│  ├───────────────────┼──────────┼──────────┼────────────────┤   │
│  │ Possession        │ 56%      │ 44%      │ +12%           │   │
│  │ Shots             │ 18       │ 12       │ +6             │   │
│  │ Shots on Target   │ 8        │ 5        │ +3             │   │
│  │ Pass Accuracy     │ 89%      │ 87%      │ +2%            │   │
│  │ Tackles           │ 26       │ 28       │ -2             │   │
│  │ Fouls             │ 12       │ 14       │ -2             │   │
│  │ Corners           │ 7        │ 4        │ +3             │   │
│  │ Yellow Cards      │ 2        │ 1        │ +1             │   │
│  │ Red Cards         │ 0        │ 0        │ 0              │   │
│  └───────────────────┴──────────┴──────────┴────────────────┘   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  YOUR TEAM PERFORMANCE                                          │
│                                                                  │
│  Your Lineup Score: 87.3 pts  │  Gameweek Rank: 4,234         │
│                                                                  │
│  Top Performers:                                                │
│  ┌──────────────────────────────────────┐                      │
│  │ ⭐ Cristiano Ronaldo (ST)             │                      │
│  │    Rating: 8.7  │  Goals: 1  Assists: 0│                      │
│  │    +25.3 pts contribution             │                      │
│  │                                      │                      │
│  │ ⭐ Bruno Fernandes (CM)               │                      │
│  │    Rating: 8.4  │  Goals: 1  Assists: 1│                      │
│  │    +22.1 pts contribution             │                      │
│  │                                      │                      │
│  │ ○ David Henderson (GK)                │                      │
│  │    Rating: 7.2  │  Clean Sheet: No   │                      │
│  │    +7.2 pts contribution              │                      │
│  └──────────────────────────────────────┘                      │
│                                                                  │
│  Lowest Performers:                                             │
│  ○ Jadon Sancho (RW)   Rating: 5.8  │  -2.1 pts                │
│  ○ Luke Shaw (LB)      Rating: 6.1  │  +1.8 pts                │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [MATCH TIMELINE]  [PLAYER STATS]  [SHARE RESULT]  [NEXT MATCH]│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Example 5: Season Standings

```
┌─────────────────────────────────────────────────────────────────┐
│ ◀ LEAGUE STANDINGS                                Season: 2024/25│
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Matchday: 15 of 38                                             │
│                                                                  │
│  ┌────┬───────────────────┬─────┬────┬────┬────┬─────┬───────┐ │
│  │POS │ TEAM              │ GP  │ W  │ D  │ L  │ PTS │ TREND │ │
│  ├────┼───────────────────┼─────┼────┼────┼────┼─────┼───────┤ │
│  │ 1  │ Manchester City   │ 15  │ 13 │ 2  │ 0  │ 41  │ ↑↑    │ │
│  │ 2  │ Arsenal           │ 15  │ 12 │ 2  │ 1  │ 38  │ ↓     │ │
│  │ 3  │ Newcastle United  │ 15  │ 11 │ 3  │ 1  │ 36  │ →     │ │
│  │ 4  │ Manchester United │ 15  │ 10 │ 2  │ 3  │ 32  │ ↑     │ │
│  │ 5  │ Liverpool         │ 15  │ 10 │ 2  │ 3  │ 32  │ ↓     │ │
│  │ 6  │ Aston Villa       │ 15  │  9 │ 3  │ 3  │ 30  │ ↑     │ │
│  │ 7  │ Tottenham         │ 15  │  8 │ 3  │ 4  │ 27  │ ↓     │ │
│  │ 8  │ Bournemouth       │ 15  │  8 │ 2  │ 5  │ 26  │ ↑↑    │ │
│  │ 9  │ Fulham            │ 15  │  7 │ 3  │ 5  │ 24  │ →     │ │
│  │ 10 │ Brighton          │ 15  │  6 │ 4  │ 5  │ 22  │ →     │ │
│  │ 11 │ Brentford         │ 15  │  6 │ 3  │ 6  │ 21  │ ↓     │ │
│  │ 12 │ Chelsea           │ 15  │  5 │ 3  │ 7  │ 18  │ ↓     │ │
│  │ 13 │ West Ham          │ 15  │  4 │ 5  │ 6  │ 17  │ ↑     │ │
│  │ 14 │ Crystal Palace    │ 15  │  4 │ 3  │ 8  │ 15  │ ↓     │ │
│  │ 15 │ Everton           │ 15  │  3 │ 3  │ 9  │ 12  │ ↓     │ │
│  │ 16 │ Nottingham Forest │ 15  │  2 │ 4  │ 9  │ 10  │ ↓↓    │ │
│  │ 17 │ Ipswich Town      │ 15  │  2 │ 3  │ 10 │ 9   │ ↓     │ │
│  │ 18 │ Wolverhampton     │ 15  │  1 │ 3  │ 11 │ 6   │ ↓     │ │
│  │ 19 │ Southampton       │ 15  │  1 │ 2  │ 12 │ 5   │ ↓     │ │
│  │ 20 │ Luton Town        │ 15  │  1 │ 2  │ 12 │ 5   │ ↓↓    │ │
│  └────┴───────────────────┴─────┴────┴────┴────┴─────┴───────┘ │
│                                                                  │
│  PROMOTION ZONE (Top 4)                                         │
│  CHAMPIONSHIP PLAYOFF ZONE (5-8)                                │
│  RELEGATION ZONE (Bottom 3)          ⬇ ⬇ ⬇ DANGER             │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ADDITIONAL STATISTICS                                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Top Scorer: Erling Haaland (Manchester City)    23 Goals │   │
│  │ Most Assists: Kevin De Bruyne (Man City)        12 Asst  │   │
│  │ Team Goal Difference: +15 (Top)                          │   │
│  │ Worst Defense: Southampton (-26)                         │   │
│  │ Best Defense: Manchester City (-3)                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  [SORT BY: Points ▼]  [FILTER]  [PREDICTIONS]  [EXPORT]         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Implement color system as CSS variables
- [ ] Set up typography system (font loads, scale, weights)
- [ ] Create base layout grid and spacing system
- [ ] Build button and form component library

### Phase 2: Core Components (Weeks 3-4)
- [ ] Player cards (all variants)
- [ ] Formation visualization
- [ ] Match cards and events display
- [ ] Statistics panels

### Phase 3: Pages (Weeks 5-6)
- [ ] Dashboard/Home page
- [ ] Lineup selection with formation
- [ ] Match simulation interface
- [ ] Results and standings pages

### Phase 4: Polish (Weeks 7-8)
- [ ] Animations and transitions
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode refinement
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG AA compliance)

### Phase 5: Testing & Launch (Week 9)
- [ ] User testing and feedback
- [ ] Bug fixes and refinements
- [ ] Performance testing
- [ ] Production deployment

---

## 12. Technical Implementation Notes

### CSS Structure
```
/styles
  ├── _variables.css       (Colors, spacing, typography)
  ├── _typography.css      (Font stacks, scales, weights)
  ├── _layout.css          (Grid, spacing, flexbox patterns)
  ├── _components.css      (Button, card, input styles)
  ├── _animations.css      (Transitions, keyframes)
  ├── _dark-mode.css       (Dark theme overrides if needed)
  └── main.css             (Import all above)
```

### Component Library Structure
```
/components
  ├── PlayerCard/
  │   ├── PlayerCard.tsx
  │   ├── PlayerCard.module.css
  │   └── PlayerCard.stories.tsx
  ├── FormationBoard/
  ├── MatchCard/
  ├── StatPanel/
  ├── Button/
  ├── Navigation/
  └── ... (other components)
```

### Performance Considerations
- Lazy-load heavy components (formation board, match timeline)
- Optimize images and use SVG for icons
- Use CSS Grid for layout (better than nested flexbox)
- Implement virtual scrolling for long lists (standings, match history)
- Debounce hover states on formation board

### Browser Support
- Modern browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- CSS Grid, Flexbox, CSS Variables support required
- No IE11 support (aligns with Football Manager audience)

---

## 13. Accessibility Guidelines

### Color Contrast
- All text vs background: minimum 4.5:1 ratio (WCAG AA)
- Large text (18px+): minimum 3:1 ratio
- Focus indicators: 3px border or outline, high contrast

### Keyboard Navigation
- All interactive elements keyboard accessible (Tab order: top-left → bottom-right)
- Formation board: arrow keys to select players, Enter to swap
- Dropdown menus: arrow keys to navigate, Enter to select
- Escape key closes modals and dropdowns

### Screen Readers
- All icons have aria-labels or alternative text
- Form labels properly associated with inputs
- List structure preserved in tables (no visual-only layouts)
- Loading states announced via aria-live regions

### Responsive Text
- Minimum 16px base font size
- Line-height minimum 1.5 for body text
- Letter-spacing adequate for readability

---

## 14. Design Tokens Summary

Quick reference for developers:

```javascript
// Colors
const colors = {
  dark: {
    bg: { primary: '#0f1419', secondary: '#1a2332', tertiary: '#252d3d' },
    accent: { primary: '#4a9eff', success: '#6bbf59', warning: '#ffb84d', danger: '#ff5c5c' },
    text: { primary: '#f0f2f5', secondary: '#a8adb8', tertiary: '#7a8190' }
  }
}

// Spacing
const spacing = { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' }

// Typography
const fonts = {
  body: "'Inter', 'Segoe UI', sans-serif",
  mono: "'IBM Plex Mono', 'Courier New', monospace"
}

// Shadows
const shadows = {
  sm: '0 4px 12px rgba(0, 0, 0, 0.3)',
  md: '0 8px 24px rgba(0, 0, 0, 0.4)',
  lg: '0 16px 40px rgba(0, 0, 0, 0.5)'
}

// Transitions
const transitions = {
  fast: '150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  base: '200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  slow: '300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
}
```

---

## 15. Visual Inspiration References

While creating components, reference these professional designs:

- **Football Manager 2024/2025**: Tactical board, player cards, match statistics
- **Figma**: Dark mode UI, card-based layouts, clear typography hierarchy
- **Linear**: Minimal, professional interface with excellent use of white space
- **Stripe Dashboard**: Clean data presentation, status indicators
- **GitHub Insights**: Data visualization, accessible charts

---

## Conclusion

This design system provides a complete blueprint for transforming Cartola Elifoot into a professional, Football Manager-inspired football management simulation. The dark theme, clear typography, card-based layouts, and thoughtful interactive states create an interface that is both beautiful and functional.

Key success metrics:
- Professional appearance comparable to Football Manager
- Fast navigation (any screen within 2-3 clicks)
- Clear visual hierarchy (important data stands out)
- Smooth, polished interactions (no jarring animations)
- Responsive design (works on mobile, tablet, desktop)
- WCAG AA accessibility compliance

The implementation should prioritize Phase 1 foundation work before building components, ensuring consistency across the entire interface. Regular user testing will validate design decisions and guide refinements.

**Status**: Ready for development. Begin with Phase 1: Foundation implementation.

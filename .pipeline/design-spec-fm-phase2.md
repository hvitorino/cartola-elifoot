# Cartola Elifoot - Phase 2 Implementation Specification
## Core Components Build Guide (10 Components, 60-75 Hours, 2 Weeks)

**Created By**: PLANNER Agent  
**Based On**: Design Audit Phase 2 (Design Finalized)  
**Implementation Timeline**: 10 days (Days 1-5: Week 1 Critical Path | Days 6-10: Week 2 Integration)  
**Status**: Ready for CODER Implementation  
**Last Updated**: 2026-06-01

---

## TABLE OF CONTENTS

1. [Implementation Timeline](#implementation-timeline)
2. [Week 1 Critical Path (Days 1-5)](#week-1-critical-path-days-1-5)
3. [Week 2 Integration (Days 6-10)](#week-2-integration-days-6-10)
4. [Component 1: Button](#component-1-button)
5. [Component 2: FormIndicator](#component-2-formindicator)
6. [Component 3: StatusBadge](#component-3-statusbadge)
7. [Component 4: PlayerCard](#component-4-playercard)
8. [Component 5: FormationBoard](#component-5-formationboard)
9. [Component 6: StatPanel](#component-6-statpanel)
10. [Component 7: MatchTimeline](#component-7-matchtimeline)
11. [Component 8: MatchCard](#component-8-matchcard)
12. [Component 9: StandingsTable](#component-9-standingstable)
13. [Component 10: Layout Components](#component-10-layout-components)
14. [Testing Strategy & Validation](#testing-strategy--validation)
15. [Success Criteria](#success-criteria)

---

## IMPLEMENTATION TIMELINE

### Overview

```
WEEK 1 (Days 1-5) - Critical Path Foundation
├─ Day 1-2: Button (3-4h) + FormIndicator (2-3h) + StatusBadge (2-3h)
├─ Day 3-4: Layout Components (8-10h) + PlayerCard start (4-5h)
├─ Day 5: PlayerCard polish + MatchCard (4-5h)
│
WEEK 2 (Days 6-10) - Complex & Integration
├─ Day 6-7: FormationBoard (10-15h) + StatPanel (2-3h)
├─ Day 8-9: MatchTimeline (6-8h) + StandingsTable (4-6h)
└─ Day 10: Full integration test + responsive refinement + polish

Total: 60-75 hours (achievable in 2-week sprint)
```

### Parallelization Opportunities

**Can be done in parallel**:
- FormIndicator & StatusBadge (both independent, Days 1-2)
- StatPanel & MatchTimeline (different components, Days 8-9)
- Unit tests for early components (while building later ones)

**Must be sequential**:
- Button → All components that depend on it
- PlayerCard → Required before FormationBoard
- Layout → Needed for page integration

---

## WEEK 1: CRITICAL PATH (Days 1-5)

### Day 1-2: Foundation Components (7-10 hours)

#### Goals
- Establish design token usage across all new components
- Create reusable patterns for state management
- Build Button component (blocks all others)
- Build FormIndicator + StatusBadge (simple, can be done in parallel)

#### Deliverables
```
/components/Button/
├─ Button.tsx                  ✓ Main component
├─ Button.module.css           ✓ All variants + states
├─ Button.test.tsx             ✓ Unit tests
└─ Button.stories.tsx          ✓ Storybook (6+ stories)

/components/FormIndicator/
├─ FormIndicator.tsx           ✓ Main component
├─ FormIndicator.module.css    ✓ Styles
├─ FormIndicator.test.tsx      ✓ Unit tests
└─ FormIndicator.stories.tsx   ✓ Storybook

/components/StatusBadge/
├─ StatusBadge.tsx             ✓ Main component
├─ StatusBadge.module.css      ✓ All status types
├─ StatusBadge.test.tsx        ✓ Unit tests
└─ StatusBadge.stories.tsx     ✓ Storybook
```

#### Key Implementation Notes
- Use design tokens from Phase 1 (no hardcoded colors)
- All components must support 375px, 768px, 1440px breakpoints
- Export TypeScript interfaces for external use
- Create utility constants for reusable values

---

### Day 3-4: Layout Foundation + PlayerCard Start (12-15 hours)

#### Goals
- Build complete layout component system
- Start PlayerCard (will finish Day 5)
- Ensure responsive grid system ready for all pages

#### Deliverables

**Layout Components:**
```
/components/Layout/
├─ Header.tsx                  ✓ Sticky header with nav
├─ Sidebar.tsx                 ✓ Mobile drawer + desktop
├─ Card.tsx                    ✓ Card wrapper (3 variants)
├─ ContentArea.tsx             ✓ Centered max-width container
├─ Grid.tsx                    ✓ Responsive grid system
├─ Layout.module.css           ✓ All layout styles
├─ Layout.test.tsx             ✓ Unit tests
└─ Layout.stories.tsx          ✓ Storybook
```

**PlayerCard Start:**
```
/components/PlayerCard/
├─ PlayerCard.tsx              ✓ Dispatcher component
├─ PlayerCardCompact.tsx       ✓ Formation variant (56×56px)
├─ PlayerCardStandard.tsx      (WIP - finish Day 5)
├─ PlayerCardDetailed.tsx      (WIP - finish Day 5)
├─ PlayerCard.module.css       (WIP - complete Day 5)
└─ types.ts                    ✓ All TypeScript interfaces
```

#### Key Implementation Notes
- Layout uses CSS Grid for responsive system
- Header sticky at top with z-index: 600
- Sidebar responsive: desktop fixed, mobile drawer
- Card variants: standard, elevated, compact
- Grid: auto-responsive or explicit column counts

---

### Day 5: PlayerCard Polish + MatchCard (9-13 hours)

#### Goals
- Complete all PlayerCard variants
- Build MatchCard component
- Ensure both components fully tested

#### Deliverables

**PlayerCard Complete:**
```
/components/PlayerCard/
├─ PlayerCard.tsx              ✓ All variants working
├─ PlayerCardCompact.tsx       ✓ Formation board variant
├─ PlayerCardStandard.tsx      ✓ Lineup selection variant
├─ PlayerCardDetailed.tsx      ✓ Modal variant with full stats
├─ PlayerCard.module.css       ✓ All styles complete
├─ PlayerCard.test.tsx         ✓ Full unit test coverage
└─ PlayerCard.stories.tsx      ✓ 8+ stories (all variants)
```

**MatchCard New:**
```
/components/MatchCard/
├─ MatchCard.tsx               ✓ Dispatcher (3 variants)
├─ MatchCardCompact.tsx        ✓ Result list variant
├─ MatchCardStandard.tsx       ✓ Dashboard featured variant
├─ MatchCardExpanded.tsx       ✓ Full details variant
├─ MatchCard.module.css        ✓ All styles
├─ MatchCard.test.tsx          ✓ Unit tests
└─ MatchCard.stories.tsx       ✓ Storybook
```

#### Key Implementation Notes
- PlayerCard uses position colors from design token
- All three PlayerCard variants use same base interfaces
- MatchCard supports dynamic score/status updates
- Button component used in action buttons

---

## WEEK 2: INTEGRATION (Days 6-10)

### Day 6-7: FormationBoard (15-20 hours) - Most Complex

#### Goals
- Build SVG-based formation visualization
- Implement drag-drop with validation
- Integrate with PlayerCard
- Create formation presets system

#### Deliverables
```
/components/FormationBoard/
├─ FormationBoard.tsx          ✓ Main orchestrator component
├─ FormationBoardCanvas.tsx    ✓ SVG rendering (60-70 lines)
├─ FormationControls.tsx       ✓ Control panel (dropdown, slider)
├─ DragDropEngine.ts           ✓ Drag-drop logic with validation
├─ formations.ts               ✓ 5 formation presets
├─ svg-helpers.ts              ✓ SVG utility functions
├─ useFormationState.ts        ✓ Custom hook for state
├─ FormationBoard.module.css   ✓ All styles (positioning, animation)
├─ FormationBoard.test.tsx     ✓ Unit tests (rendering, drag logic)
└─ FormationBoard.stories.tsx  ✓ Storybook (4+ stories)
```

#### SVG Specifications
```
viewBox: "0 0 100 130"          (Normalized pitch)
Pitch color: #1a2332           (dark-bg-secondary)
Player circles: 40px diameter   (scales responsively)
Jersey text: 20px mono bold     (centers in circle)
Grid spacing: 8px gutters       (standardized)
```

#### Drag-Drop Validation
```typescript
// Position rules
GK slot: Only GK players
DF slot: GK (rare), DF (normal)
MF slot: DF (rare), MF (normal)
FW slot: MF (rare), FW (normal)

// Animations
Valid drop: 250ms smooth move
Invalid drop: 200ms shake + revert
Hover: Highlight valid zones (green), invalid (red)
```

#### Key Implementation Notes
- Use React.useRef for drag tracking
- State: selected player, current positions, formation ID
- Real-time budget/rating calculation
- Formation switching auto-animates player shuffle
- Keyboard support: arrow keys, Enter, Escape

---

### Day 8-9: Complex Components Phase 2 (14-18 hours)

#### Goals
- Build StatPanel with comparison mode
- Build MatchTimeline with event system
- Polish StandingsTable with sticky headers
- Achieve 90%+ responsive coverage

#### Deliverables

**StatPanel:**
```
/components/StatPanel/
├─ StatPanel.tsx               ✓ Main component
├─ StatRow.tsx                 ✓ Individual stat row
├─ ProgressBar.tsx             ✓ Reusable progress bar
├─ StatPanel.module.css        ✓ Single + double column
├─ StatPanel.test.tsx          ✓ Unit tests
└─ StatPanel.stories.tsx       ✓ Storybook (player + team + comparison)
```

**MatchTimeline:**
```
/components/MatchTimeline/
├─ MatchTimeline.tsx           ✓ Main container (scrollable)
├─ MatchEvent.tsx              ✓ Individual event card
├─ EventIcon.tsx               ✓ Event type icon system
├─ MatchTimeline.module.css    ✓ Event colors, animations
├─ MatchTimeline.test.tsx      ✓ Unit tests (rendering, scroll)
└─ MatchTimeline.stories.tsx   ✓ Storybook (all event types)
```

**StandingsTable:**
```
/components/StandingsTable/
├─ StandingsTable.tsx          ✓ Main table component
├─ StandingsRow.tsx            ✓ Individual table row
├─ StandingsTable.module.css   ✓ Sticky headers + columns
├─ StandingsTable.test.tsx     ✓ Unit tests
└─ StandingsTable.stories.tsx  ✓ Storybook (sorted, zones highlighted)
```

#### Key Implementation Notes
- StatPanel: Grid system for single/double column, color-coded bars
- MatchTimeline: Event type → icon/color mapping, scroll-to-latest
- StandingsTable: CSS sticky positioning for header + left columns
- All three fully responsive (mobile: simplified view)

---

### Day 10: Integration & Polish (6-8 hours)

#### Goals
- Run full component integration suite
- Verify all responsive breakpoints
- Final accessibility audit
- Polish animations and transitions

#### Deliverables
```
Integration Tests:
✓ All components render without errors
✓ PropTypes match documentation
✓ Cross-component dependencies work (Button, etc.)
✓ Responsive: 375px, 768px, 1440px all correct

Accessibility Audit:
✓ Keyboard navigation works (Tab, Enter, Escape, arrows)
✓ Focus states visible on all components
✓ ARIA labels on icons
✓ Color contrast ≥ 4.5:1 verified
✓ Screen reader compatible

Performance Check:
✓ No console errors/warnings
✓ No memory leaks (React.memo where needed)
✓ CSS optimized (no redundant rules)
✓ Component sizes <50KB minified

Documentation:
✓ All TypeScript interfaces exported
✓ JSDoc comments on complex props
✓ Storybook complete with 50+ stories
✓ README files for each component group
```

---

## COMPONENT 1: BUTTON

### File Structure
```
/components/Button/
├─ Button.tsx
├─ Button.module.css
├─ Button.test.tsx
├─ Button.stories.tsx
└─ types.ts (if reused)
```

### TypeScript Interface
```typescript
// Button.tsx
import React from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;        // default: 'primary'
  size?: ButtonSize;              // default: 'md'
  block?: boolean;                // default: false
  loading?: boolean;              // default: false
  icon?: React.ReactNode;         // Icon element (before text)
  children: React.ReactNode;      // Button label (required)
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;          // For icon-only buttons
  'aria-busy'?: boolean;          // When loading
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  icon,
  children,
  disabled,
  className,
  ...rest
}) => {
  const classNames = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    block && styles.block,
    loading && styles.loading,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <span className={styles.spinner} />}
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export type { ButtonProps, ButtonVariant, ButtonSize };
```

### CSS Module (Button.module.css)
```css
/* Base styles */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs); /* 4px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: var(--radius-md); /* 8px */
  cursor: pointer;
  transition: var(--transition-fast); /* 150ms ease */
  user-select: none;
  font-family: inherit;
}

/* Size variants */
.size-sm {
  padding: 4px 8px;
  font-size: 12px;
  height: 28px;
  min-width: 28px;
}

.size-md {
  padding: 8px 16px;
  font-size: 14px;
  height: 40px;
  min-width: 40px;
}

.size-lg {
  padding: 16px 24px;
  font-size: 16px;
  height: 56px;
  min-width: 56px;
}

/* Primary variant */
.variant-primary {
  background-color: #4a9eff;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
}

.variant-primary:hover:not(:disabled) {
  background-color: #3a8ee0;
  box-shadow: 0 8px 16px rgba(74, 158, 255, 0.3);
  transform: scale(1.02);
}

.variant-primary:active:not(:disabled) {
  background-color: #2a7ed0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  transform: none;
}

.variant-primary:focus {
  outline: 2px solid #4a9eff;
  outline-offset: 2px;
}

/* Secondary variant */
.variant-secondary {
  background-color: transparent;
  border: 2px solid #4a9eff;
  color: #4a9eff;
}

.variant-secondary:hover:not(:disabled) {
  background-color: #1a2332;
  box-shadow: 0 0 16px rgba(74, 158, 255, 0.3);
}

.variant-secondary:active:not(:disabled) {
  background-color: #252d3d;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Danger variant */
.variant-danger {
  background-color: #ff5c5c;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(255, 92, 92, 0.3);
}

.variant-danger:hover:not(:disabled) {
  background-color: #e54747;
  box-shadow: 0 8px 16px rgba(255, 92, 92, 0.3);
  transform: scale(1.02);
}

.variant-danger:active:not(:disabled) {
  background-color: #d53737;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  transform: none;
}

/* Success variant */
.variant-success {
  background-color: #6bbf59;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(107, 191, 89, 0.3);
}

.variant-success:hover:not(:disabled) {
  background-color: #5fad50;
  box-shadow: 0 8px 16px rgba(107, 191, 89, 0.3);
  transform: scale(1.02);
}

.variant-success:active:not(:disabled) {
  background-color: #539d48;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Outline variant */
.variant-outline {
  background-color: transparent;
  border: 1px solid #a8adb8;
  color: #a8adb8;
}

.variant-outline:hover:not(:disabled) {
  background-color: #252d3d;
  border-color: #f0f2f5;
  color: #f0f2f5;
}

.variant-outline:active:not(:disabled) {
  background-color: #1a2332;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Block variant */
.block {
  width: 100%;
  display: flex;
}

/* Disabled state */
.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading state */
.loading {
  opacity: 0.7;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
}

/* Touch targets (mobile) */
@media (hover: none) {
  .button {
    min-width: 44px;
    min-height: 44px;
  }
}
```

### Test Suite (Button.test.tsx)
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('variant-primary');

    rerender(<Button variant="danger">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('variant-danger');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('size-sm');

    rerender(<Button size="lg">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('size-lg');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled');
  });

  it('handles loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('loading');
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with icon', () => {
    render(<Button icon={<span data-testid="icon">🔥</span>}>Action</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies block class for full width', () => {
    render(<Button block>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('block');
  });

  it('supports aria-label for icon-only buttons', () => {
    render(<Button aria-label="Close">×</Button>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });
});
```

### Storybook Stories (Button.stories.tsx)
```typescript
import React from 'react';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Primary Button', variant: 'primary' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const BlockWidth: Story = {
  args: { children: 'Full Width Button', block: true },
};

export const WithIcon: Story = {
  args: { children: 'Submit', icon: '✓' },
};

export const Interactive: Story = {
  args: { children: 'Click me' },
  render: (args) => {
    const [clicks, setClicks] = React.useState(0);
    return (
      <div>
        <Button {...args} onClick={() => setClicks(clicks + 1)}>
          Clicked {clicks} times
        </Button>
      </div>
    );
  },
};
```

### Success Criteria
- [ ] All 5 variants render correctly (primary, secondary, danger, success, outline)
- [ ] All 3 sizes work (sm, md, lg)
- [ ] Loading spinner appears and disables button
- [ ] Disabled state: opacity 40%, no hover effects
- [ ] Focus outline visible on all backgrounds
- [ ] Hover scale (1.02) on primary/danger/success only
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Icon properly sized and positioned
- [ ] Unit tests passing (100% coverage)
- [ ] Storybook stories showing all states
- [ ] Keyboard accessible (Tab, Enter)

---

## COMPONENT 2: FORMINDICATOR

### File Structure
```
/components/FormIndicator/
├─ FormIndicator.tsx
├─ FormIndicator.module.css
├─ FormIndicator.test.tsx
└─ FormIndicator.stories.tsx
```

### TypeScript Interface
```typescript
// FormIndicator.tsx
import React from 'react';
import styles from './FormIndicator.module.css';

type FormRating = 1 | 2 | 3 | 4 | 5;
type IndicatorSize = 'sm' | 'md' | 'lg';

interface FormIndicatorProps {
  rating: FormRating;              // Number of filled dots (1-5)
  size?: IndicatorSize;            // default: 'md'
  color?: string;                  // Override dot color
  showTooltip?: boolean;           // default: true
  matchHistory?: Array<{
    date: string;
    opponent: string;
    rating: number;
    result: 'W' | 'D' | 'L';
  }>;
  label?: boolean;                 // Show "Form: Good" text
  className?: string;
}

const SIZE_CONFIG = {
  sm: { dot: 6, gap: 3 },
  md: { dot: 8, gap: 4 },
  lg: { dot: 10, gap: 5 },
};

const FORM_LABELS = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

const FORM_COLORS = {
  1: '#ff5c5c', // danger - very poor
  2: '#ffb84d', // warning - poor
  3: '#ffb84d', // warning - average
  4: '#6bbf59', // success - good
  5: '#6bbf59', // success - excellent
};

export const FormIndicator: React.FC<FormIndicatorProps> = ({
  rating,
  size = 'md',
  color,
  showTooltip = true,
  matchHistory,
  label = false,
  className,
}) => {
  const config = SIZE_CONFIG[size];
  const dotColor = color || FORM_COLORS[rating];
  const formLabel = FORM_LABELS[rating];
  
  const dots = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div
        className={styles.indicator}
        style={{
          '--dot-size': `${config.dot}px`,
          '--gap': `${config.gap}px`,
          '--dot-color': dotColor,
        } as React.CSSProperties}
      >
        {dots.map((filled, i) => (
          <div
            key={i}
            className={`${styles.dot} ${filled ? styles.filled : styles.empty}`}
          />
        ))}
      </div>
      
      {label && <span className={styles.label}>{formLabel}</span>}
      
      {showTooltip && matchHistory && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipTitle}>Last 5 Matches</div>
          {matchHistory.map((match, i) => (
            <div key={i} className={styles.tooltipRow}>
              <span className={styles.tooltipMatch}>
                {match.opponent}
              </span>
              <span className={`${styles.tooltipRating} ${styles[`result-${match.result}`]}`}>
                {match.rating.toFixed(1)} ({match.result})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export type { FormIndicatorProps, FormRating };
```

### CSS Module (FormIndicator.module.css)
```css
.container {
  display: flex;
  align-items: center;
  gap: var(--space-xs); /* 4px */
  position: relative;
}

.indicator {
  display: flex;
  gap: var(--gap);
  align-items: center;
}

.dot {
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  transition: background-color var(--transition-fast);
}

.dot.filled {
  background-color: var(--dot-color);
}

.dot.empty {
  background-color: #8b95a5;
  opacity: 0.4;
}

.label {
  font-size: 12px;
  color: #a8adb8;
  margin-left: var(--space-xs);
  white-space: nowrap;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #2a3545;
  border-radius: var(--radius-md);
  padding: 12px;
  font-size: 12px;
  color: #a8adb8;
  z-index: 1000;
  min-width: 200px;
  display: none;
  opacity: 0;
  transition: opacity var(--transition-fast);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.container:hover .tooltip {
  display: block;
  opacity: 1;
  pointer-events: auto;
}

.tooltipTitle {
  font-weight: 600;
  margin-bottom: 8px;
  color: #f0f2f5;
}

.tooltipRow {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 4px 0;
}

.tooltipMatch {
  flex-grow: 1;
}

.tooltipRating {
  font-family: 'IBM Plex Mono';
  font-weight: 600;
}

.tooltipRating.result-W {
  color: #6bbf59;
}

.tooltipRating.result-D {
  color: #ffb84d;
}

.tooltipRating.result-L {
  color: #ff5c5c;
}

/* Responsive sizes handled via size prop and SIZE_CONFIG */
@media (max-width: 768px) {
  .label {
    display: none; /* Hide label on mobile to save space */
  }
}
```

### Test Suite (FormIndicator.test.tsx)
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormIndicator } from './FormIndicator';

describe('FormIndicator Component', () => {
  it('renders correct number of filled dots', () => {
    const { container } = render(<FormIndicator rating={3} />);
    const dots = container.querySelectorAll('.dot');
    expect(dots).toHaveLength(5);
    
    const filledDots = container.querySelectorAll('.dot.filled');
    expect(filledDots).toHaveLength(3);
  });

  it('renders 1 filled dot for rating 1', () => {
    const { container } = render(<FormIndicator rating={1} />);
    const filledDots = container.querySelectorAll('.dot.filled');
    expect(filledDots).toHaveLength(1);
  });

  it('renders 5 filled dots for rating 5', () => {
    const { container } = render(<FormIndicator rating={5} />);
    const filledDots = container.querySelectorAll('.dot.filled');
    expect(filledDots).toHaveLength(5);
  });

  it('applies correct size classes', () => {
    const { container, rerender } = render(<FormIndicator rating={3} size="sm" />);
    expect(container.firstChild).toBeInTheDocument();
    
    rerender(<FormIndicator rating={3} size="lg" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('shows label when requested', () => {
    render(<FormIndicator rating={4} label={true} />);
    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('does not show label by default', () => {
    render(<FormIndicator rating={4} />);
    expect(screen.queryByText('Good')).not toBeInTheDocument();
  });
});
```

### Storybook Stories (FormIndicator.stories.tsx)
```typescript
import React from 'react';
import { FormIndicator } from './FormIndicator';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FormIndicator> = {
  title: 'Components/FormIndicator',
  component: FormIndicator,
};

export default meta;
type Story = StoryObj<typeof FormIndicator>;

export const AllRatings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {[1, 2, 3, 4, 5].map(rating => (
        <div key={rating}>
          <p>Rating {rating}:</p>
          <FormIndicator rating={rating as any} />
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <FormIndicator rating={4} size="sm" />
      <FormIndicator rating={4} size="md" />
      <FormIndicator rating={4} size="lg" />
    </div>
  ),
};

export const WithLabel: Story = {
  args: { rating: 4, label: true },
};

export const WithTooltip: Story = {
  args: {
    rating: 4,
    matchHistory: [
      { date: '2024-10-28', opponent: 'Chelsea', rating: 8.2, result: 'W' },
      { date: '2024-10-21', opponent: 'Arsenal', rating: 8.5, result: 'W' },
      { date: '2024-10-14', opponent: 'Liverpool', rating: 7.8, result: 'D' },
      { date: '2024-10-07', opponent: 'Brighton', rating: 8.1, result: 'W' },
      { date: '2024-09-30', opponent: 'Man City', rating: 6.9, result: 'L' },
    ],
  },
};
```

### Success Criteria
- [ ] Renders 5 dots (filled + empty)
- [ ] Correct fill count matches rating (1-5)
- [ ] All sizes work (sm, md, lg)
- [ ] Label shows correct form description
- [ ] Tooltip displays on hover with match history
- [ ] Color changes based on rating (green for good, red for poor)
- [ ] Unit tests passing
- [ ] Storybook stories complete
- [ ] No console warnings

---

## COMPONENT 3: STATUSBADGE

### File Structure
```
/components/StatusBadge/
├─ StatusBadge.tsx
├─ StatusBadge.module.css
├─ StatusBadge.test.tsx
└─ StatusBadge.stories.tsx
```

### TypeScript Interface
```typescript
// StatusBadge.tsx
import React from 'react';
import styles from './StatusBadge.module.css';

type StatusType = 'fit' | 'injured' | 'doubtful' | 'returning' | 'suspended';
type BadgeSize = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  status: StatusType;
  size?: BadgeSize;                // default: 'md'
  showIcon?: boolean;              // default: true
  showLabel?: boolean;             // default: true
  pulsing?: boolean;               // For injured/doubtful (default: false)
  tooltip?: string;
  className?: string;
}

const STATUS_CONFIG = {
  fit: {
    icon: '✓',
    label: 'FIT',
    color: '#6bbf59', // success green
    bgColor: 'rgba(107, 191, 89, 0.15)',
  },
  injured: {
    icon: '×',
    label: 'INJURED',
    color: '#ff5c5c', // danger red
    bgColor: 'rgba(255, 92, 92, 0.15)',
  },
  doubtful: {
    icon: '?',
    label: 'DOUBTFUL',
    color: '#ffb84d', // warning amber
    bgColor: 'rgba(255, 184, 77, 0.15)',
  },
  returning: {
    icon: '←',
    label: 'RETURNING',
    color: '#4a9eff', // info blue
    bgColor: 'rgba(74, 158, 255, 0.15)',
  },
  suspended: {
    icon: '🔴',
    label: 'SUSPENDED',
    color: '#9d84b7', // tertiary purple
    bgColor: 'rgba(157, 132, 183, 0.15)',
  },
};

const SIZE_CONFIG = {
  sm: { height: '20px', padding: '3px 8px', fontSize: '11px', dotSize: '6px' },
  md: { height: '24px', padding: '4px 12px', fontSize: '12px', dotSize: '8px' },
  lg: { height: '32px', padding: '6px 16px', fontSize: '14px', dotSize: '10px' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  showLabel = true,
  pulsing = false,
  tooltip,
  className,
}) => {
  const config = STATUS_CONFIG[status];
  const sizeConfig = SIZE_CONFIG[size];

  return (
    <span
      className={`
        ${styles.badge}
        ${styles[`status-${status}`]}
        ${pulsing ? styles.pulsing : ''}
        ${className || ''}
      `}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        height: sizeConfig.height,
        padding: sizeConfig.padding,
        fontSize: sizeConfig.fontSize,
        '--dot-size': sizeConfig.dotSize,
      } as React.CSSProperties}
      title={tooltip}
    >
      {showIcon && (
        <span className={styles.icon}>
          <span className={styles.dot} />
          {config.icon}
        </span>
      )}
      {showLabel && <span className={styles.label}>{config.label}</span>}
    </span>
  );
};

export type { StatusBadgeProps, StatusType, BadgeSize };
```

### CSS Module (StatusBadge.module.css)
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--radius-full); /* 12px pill shape */
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  transition: all var(--transition-fast);
  letter-spacing: 0.5px;
}

.icon {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot {
  display: inline-block;
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background-color: currentColor;
}

.label {
  line-height: 1;
}

/* Status-specific styles */
.status-fit {
  border: 1px solid rgba(107, 191, 89, 0.3);
}

.status-injured {
  border: 1px solid rgba(255, 92, 92, 0.3);
}

.status-doubtful {
  border: 1px solid rgba(255, 184, 77, 0.3);
}

.status-returning {
  border: 1px solid rgba(74, 158, 255, 0.3);
}

.status-suspended {
  border: 1px solid rgba(157, 132, 183, 0.3);
}

/* Pulsing animation for injured/critical status */
.pulsing {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Hover effect with tooltip context */
.badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Active/selected state */
.badge:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* Responsive text */
@media (max-width: 768px) {
  .badge {
    font-size: 10px;
  }
}
```

### Test Suite (StatusBadge.test.tsx)
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge Component', () => {
  it('renders all status types', () => {
    const statuses = ['fit', 'injured', 'doubtful', 'returning', 'suspended'] as const;
    
    statuses.forEach(status => {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(status.toUpperCase())).toBeInTheDocument();
      unmount();
    });
  });

  it('renders correct icon for each status', () => {
    const { rerender } = render(<StatusBadge status="fit" />);
    expect(screen.getByText('✓')).toBeInTheDocument();

    rerender(<StatusBadge status="injured" />);
    expect(screen.getByText('×')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container, rerender } = render(<StatusBadge status="fit" size="sm" />);
    expect(container.querySelector('.badge')).toBeInTheDocument();

    rerender(<StatusBadge status="fit" size="lg" />);
    expect(container.querySelector('.badge')).toBeInTheDocument();
  });

  it('hides icon when showIcon is false', () => {
    const { container } = render(<StatusBadge status="fit" showIcon={false} />);
    expect(container.querySelector('.icon')).not toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<StatusBadge status="fit" showLabel={false} />);
    expect(screen.queryByText('FIT')).not toBeInTheDocument();
  });

  it('applies pulsing animation when injured', () => {
    const { container } = render(<StatusBadge status="injured" pulsing={true} />);
    expect(container.querySelector('.pulsing')).toBeInTheDocument();
  });

  it('supports tooltip attribute', () => {
    render(<StatusBadge status="doubtful" tooltip="Hamstring injury" />);
    const badge = screen.getByTitle('Hamstring injury');
    expect(badge).toBeInTheDocument();
  });
});
```

### Storybook Stories (StatusBadge.stories.tsx)
```typescript
import React from 'react';
import { StatusBadge } from './StatusBadge';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <StatusBadge status="fit" />
      <StatusBadge status="injured" />
      <StatusBadge status="doubtful" />
      <StatusBadge status="returning" />
      <StatusBadge status="suspended" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <StatusBadge status="fit" size="sm" />
      <StatusBadge status="fit" size="md" />
      <StatusBadge status="fit" size="lg" />
    </div>
  ),
};

export const InjuredWithPulsing: Story = {
  args: { status: 'injured', pulsing: true },
};

export const IconOnly: Story = {
  args: { status: 'fit', showLabel: false },
};

export const WithTooltip: Story = {
  args: {
    status: 'doubtful',
    tooltip: 'Hamstring injury - 50% chance to play',
  },
};
```

### Success Criteria
- [ ] All 5 status types render (fit, injured, doubtful, returning, suspended)
- [ ] All 3 sizes work (sm, md, lg)
- [ ] Icon displays correctly with dot indicator
- [ ] Label text uppercase and correct
- [ ] Pulsing animation on injured status when enabled
- [ ] Hover effect (slight elevation)
- [ ] Tooltip attribute supported
- [ ] Color matches design spec for each status
- [ ] Unit tests passing
- [ ] Storybook stories complete

---

## COMPONENT 4: PLAYERCARD

### File Structure
```
/components/PlayerCard/
├─ PlayerCard.tsx              (Dispatcher)
├─ PlayerCardCompact.tsx       (Formation variant)
├─ PlayerCardStandard.tsx      (Lineup variant)
├─ PlayerCardDetailed.tsx      (Modal variant)
├─ types.ts                    (Shared interfaces)
├─ PlayerCard.module.css       (All styles)
├─ PlayerCard.test.tsx         (All variants)
└─ PlayerCard.stories.tsx      (8+ stories)
```

### TypeScript Interfaces (types.ts)
```typescript
// types.ts
export type PlayerPosition = 'GK' | 'DF' | 'MF' | 'FW';
export type PlayerStatus = 'fit' | 'injured' | 'doubtful' | 'returning' | 'suspended';
export type PlayerCardVariant = 'compact' | 'standard' | 'detailed';

export interface BasePlayerData {
  id: string;
  jerseyNumber: number;
  name: string;
  team: string;
  position: PlayerPosition;
  rating: number;
  price: number;
  fitness: number;
  form: 1 | 2 | 3 | 4 | 5;
  status: PlayerStatus;
  image?: string;
}

export interface PlayerCardCompactProps {
  player: BasePlayerData;
  selected?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
}

export interface PlayerCardStandardProps {
  player: BasePlayerData;
  selected?: boolean;
  onSwap?: () => void;
  onInfo?: () => void;
  onClick?: () => void;
}

export interface PlayerCardDetailedProps {
  player: BasePlayerData & {
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

export interface PlayerCardProps {
  player: BasePlayerData;
  variant: PlayerCardVariant;
  selected?: boolean;
  onSwap?: () => void;
  onInfo?: () => void;
  onClick?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
}

export const POSITION_COLORS: Record<PlayerPosition, string> = {
  GK: '#4a9eff',  // cyan
  DF: '#5b9fd8',  // blue
  MF: '#8b7fd8',  // purple
  FW: '#d85b5b',  // red
};
```

### Dispatcher Component (PlayerCard.tsx)
```typescript
// PlayerCard.tsx
import React from 'react';
import { PlayerCardCompact } from './PlayerCardCompact';
import { PlayerCardStandard } from './PlayerCardStandard';
import { PlayerCardDetailed } from './PlayerCardDetailed';
import type { PlayerCardProps } from './types';

export const PlayerCard: React.FC<PlayerCardProps> = ({
  variant,
  ...props
}) => {
  switch (variant) {
    case 'compact':
      return <PlayerCardCompact {...(props as any)} />;
    case 'standard':
      return <PlayerCardStandard {...(props as any)} />;
    case 'detailed':
      return <PlayerCardDetailed {...(props as any)} />;
    default:
      return <PlayerCardStandard {...(props as any)} />;
  }
};

export * from './types';
export { PlayerCardCompact, PlayerCardStandard, PlayerCardDetailed };
```

### Compact Variant (PlayerCardCompact.tsx)
```typescript
// PlayerCardCompact.tsx
import React from 'react';
import styles from './PlayerCard.module.css';
import { POSITION_COLORS } from './types';
import type { PlayerCardCompactProps } from './types';

export const PlayerCardCompact: React.FC<PlayerCardCompactProps> = ({
  player,
  selected,
  onDragStart,
}) => {
  const color = POSITION_COLORS[player.position];

  return (
    <div
      className={`${styles.compactContainer} ${selected ? styles.selected : ''}`}
      style={{
        backgroundColor: `${color}cc`, // 80% opacity
        borderColor: selected ? '#4a9eff' : 'transparent',
      }}
      draggable
      onDragStart={onDragStart}
      title={`${player.name} - ${player.position} (Rating: ${player.rating})`}
    >
      <span className={styles.compactJersey}>{player.jerseyNumber}</span>
    </div>
  );
};
```

### Standard Variant (PlayerCardStandard.tsx)
```typescript
// PlayerCardStandard.tsx
import React from 'react';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import { FormIndicator } from '../FormIndicator';
import styles from './PlayerCard.module.css';
import { POSITION_COLORS } from './types';
import type { PlayerCardStandardProps } from './types';

export const PlayerCardStandard: React.FC<PlayerCardStandardProps> = ({
  player,
  selected,
  onSwap,
  onInfo,
  onClick,
}) => {
  return (
    <div
      className={`${styles.standardContainer} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.jerseyName}>
          <span className={styles.jersey}>[{player.jerseyNumber}]</span>
          <span className={styles.name}>{player.name}</span>
        </div>
      </div>

      <div className={styles.subheader}>
        <span>{player.team}</span>
        <span>•</span>
        <span>{player.position}</span>
      </div>

      <div className={styles.ratingSection}>
        <span className={styles.rating}>{player.rating.toFixed(1)}</span>
      </div>

      <div className={styles.fitnessSection}>
        <div className={styles.fitnessBar}>
          <div
            className={styles.fitnessFill}
            style={{ width: `${player.fitness}%` }}
          />
        </div>
        <span className={styles.fitnessText}>{player.fitness}%</span>
      </div>

      <div className={styles.formSection}>
        <FormIndicator rating={player.form} size="sm" />
      </div>

      <div className={styles.priceStatus}>
        <span className={styles.price}>${player.price}M</span>
        <StatusBadge status={player.status} size="sm" />
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={onSwap}>
          Swap
        </Button>
        <Button variant="outline" size="sm" onClick={onInfo}>
          Info
        </Button>
      </div>
    </div>
  );
};
```

### Detailed Variant (PlayerCardDetailed.tsx)
```typescript
// PlayerCardDetailed.tsx
import React from 'react';
import { Button } from '../Button';
import { StatusBadge } from '../StatusBadge';
import styles from './PlayerCard.module.css';
import type { PlayerCardDetailedProps } from './types';

export const PlayerCardDetailed: React.FC<PlayerCardDetailedProps> = ({
  player,
  onClose,
  onSwap,
  onRemove,
  onViewStats,
}) => {
  const statsList = [
    { label: 'Goals', value: player.stats.goals },
    { label: 'Assists', value: player.stats.assists },
    { label: 'Yellow Cards', value: player.stats.yellowCards },
    { label: 'Red Cards', value: player.stats.redCards },
  ];

  return (
    <div className={styles.detailedContainer}>
      <div className={styles.detailedHeader}>
        <h2>{player.name}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </Button>
      </div>

      <div className={styles.detailedSubheader}>
        <span>{player.team}</span>
        <span>•</span>
        <span>{player.position}</span>
        <span>•</span>
        <span>#{player.jerseyNumber}</span>
      </div>

      <div className={styles.detailedRating}>
        <span>Rating: {player.rating.toFixed(1)}</span>
      </div>

      <div className={styles.sectionTitle}>Statistics</div>
      <div className={styles.statisticsGrid}>
        {statsList.map((stat) => (
          <div key={stat.label} className={styles.statRow}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.sectionTitle}>Form (Last 5)</div>
      <div className={styles.formHistory}>
        {player.formHistory.map((match, i) => (
          <div
            key={i}
            className={styles.formBox}
            title={`vs ${match.opponent} - ${match.result}`}
          >
            {match.rating.toFixed(1)}
          </div>
        ))}
      </div>

      <div className={styles.sectionTitle}>Fitness & Status</div>
      <div className={styles.fitnessLarge}>
        <span>Fitness: {player.fitness}%</span>
        <div className={styles.fitnessBarLarge}>
          <div
            className={styles.fitnessFill}
            style={{ width: `${player.fitness}%` }}
          />
        </div>
      </div>
      <div className={styles.statusLarge}>
        <StatusBadge status={player.status} size="md" />
        <span>Injury Risk: {player.injuryRisk}</span>
      </div>

      <div className={styles.detailedActions}>
        <Button variant="secondary" size="lg" onClick={onSwap} block>
          Swap
        </Button>
        <Button variant="danger" size="lg" onClick={onRemove} block>
          Remove
        </Button>
        <Button variant="outline" size="lg" onClick={onViewStats} block>
          View Stats
        </Button>
      </div>
    </div>
  );
};
```

### CSS Module (PlayerCard.module.css) - Key Styles
```css
/* Compact */
.compactContainer {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  border: 2px solid transparent;
  transition: all var(--transition-fast);
}

.compactContainer:hover {
  opacity: 100%;
  border-color: #4a9eff;
}

.compactContainer.selected {
  border: 3px solid #4a9eff;
  box-shadow: 0 0 24px rgba(74, 158, 255, 0.4);
}

.compactJersey {
  font-size: 28px;
  font-weight: bold;
  color: white;
  font-family: 'IBM Plex Mono';
}

/* Standard */
.standardContainer {
  width: 280px;
  min-height: 320px;
  background: var(--dark-bg-primary);
  border: 1px #252d3d solid;
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.standardContainer:hover {
  background-color: var(--dark-bg-secondary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.standardContainer.selected {
  border-left: 3px solid #4a9eff;
  box-shadow: 0 0 16px rgba(74, 158, 255, 0.3);
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.jersey {
  font-weight: bold;
  color: #4a9eff;
}

.name {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.ratingSection {
  display: flex;
  justify-content: center;
}

.rating {
  font-size: 24px;
  font-family: 'IBM Plex Mono';
  font-weight: bold;
  color: #4a9eff;
}

.fitnessBar {
  height: 4px;
  background-color: #252d3d;
  border-radius: 2px;
  overflow: hidden;
}

.fitnessFill {
  height: 100%;
  background-color: #6bbf59;
  transition: width var(--transition-fast);
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 8px;
}

/* Detailed */
.detailedContainer {
  background: var(--dark-bg-elevated);
  border-radius: var(--radius-lg);
  padding: 24px;
  max-width: 600px;
  width: 100%;
}

.detailedHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.detailedHeader h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.sectionTitle {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #a8adb8;
  margin-top: 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid #252d3d;
  padding-bottom: 8px;
}

.statisticsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.statRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statLabel {
  font-size: 12px;
  color: #a8adb8;
}

.statValue {
  font-size: 18px;
  font-family: 'IBM Plex Mono';
  font-weight: bold;
  color: #ffffff;
}

.formHistory {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.formBox {
  width: 48px;
  height: 48px;
  background: var(--dark-bg-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  font-family: 'IBM Plex Mono';
  cursor: pointer;
}

.detailedActions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .standardContainer {
    width: 100%;
  }

  .detailedContainer {
    max-width: 100%;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .statisticsGrid {
    grid-template-columns: 1fr;
  }
}
```

### Test Suite (PlayerCard.test.tsx)
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PlayerCard } from './PlayerCard';
import type { BasePlayerData } from './types';

const mockPlayer: BasePlayerData = {
  id: '1',
  jerseyNumber: 7,
  name: 'Cristiano Ronaldo',
  team: 'Manchester United',
  position: 'FW',
  rating: 8.7,
  price: 12.5,
  fitness: 95,
  form: 4,
  status: 'fit',
};

describe('PlayerCard Component', () => {
  it('renders compact variant', () => {
    render(<PlayerCard player={mockPlayer} variant="compact" />);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders standard variant with all info', () => {
    render(<PlayerCard player={mockPlayer} variant="standard" />);
    expect(screen.getByText('Cristiano Ronaldo')).toBeInTheDocument();
    expect(screen.getByText('8.7')).toBeInTheDocument();
    expect(screen.getByText('Manchester United')).toBeInTheDocument();
  });

  it('calls onSwap when Swap button clicked', () => {
    const handleSwap = jest.fn();
    render(
      <PlayerCard
        player={mockPlayer}
        variant="standard"
        onSwap={handleSwap}
      />
    );
    fireEvent.click(screen.getByText('Swap'));
    expect(handleSwap).toHaveBeenCalled();
  });

  it('shows fitness percentage', () => {
    render(<PlayerCard player={mockPlayer} variant="standard" />);
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('applies selected styling', () => {
    const { container } = render(
      <PlayerCard player={mockPlayer} variant="standard" selected={true} />
    );
    expect(container.querySelector('.selected')).toBeInTheDocument();
  });
});
```

### Storybook Stories (PlayerCard.stories.tsx)
```typescript
import React from 'react';
import { PlayerCard } from './PlayerCard';
import type { Meta } from '@storybook/react';

const mockPlayer = {
  id: '1',
  jerseyNumber: 7,
  name: 'Cristiano Ronaldo',
  team: 'Manchester United',
  position: 'FW' as const,
  rating: 8.7,
  price: 12.5,
  fitness: 95,
  form: 4 as const,
  status: 'fit' as const,
};

const meta: Meta<typeof PlayerCard> = {
  title: 'Components/PlayerCard',
  component: PlayerCard,
};

export default meta;

export const Compact = {
  args: { player: mockPlayer, variant: 'compact' },
};

export const Standard = {
  args: { player: mockPlayer, variant: 'standard' },
};

export const AllPositions = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
      <PlayerCard player={{ ...mockPlayer, position: 'GK' }} variant="compact" />
      <PlayerCard player={{ ...mockPlayer, position: 'DF' }} variant="compact" />
      <PlayerCard player={{ ...mockPlayer, position: 'MF' }} variant="compact" />
      <PlayerCard player={{ ...mockPlayer, position: 'FW' }} variant="compact" />
    </div>
  ),
};
```

### Success Criteria
- [ ] Compact variant renders 56×56px circle
- [ ] Standard variant shows all 7 information sections
- [ ] Detailed variant shows stats, form history, injuries
- [ ] Selected state visibly highlights (border + glow)
- [ ] Position colors correct (GK cyan, DF blue, MF purple, FW red)
- [ ] All three buttons work (Swap, Info, Remove)
- [ ] Responsive at 375px, 768px, 1440px
- [ ] FormIndicator and StatusBadge integrated
- [ ] Unit tests pass (>90% coverage)
- [ ] Storybook stories complete (8+ variations)

---

## COMPONENT 5: FORMATIONBOARD

### File Structure
```
/components/FormationBoard/
├─ FormationBoard.tsx
├─ FormationBoardCanvas.tsx
├─ FormationControls.tsx
├─ useFormationState.ts
├─ formations.ts
├─ svg-helpers.ts
├─ drag-drop.ts
├─ FormationBoard.module.css
├─ FormationBoard.test.tsx
└─ FormationBoard.stories.tsx
```

### Core TypeScript Interfaces
```typescript
// FormationBoard.tsx interfaces
export interface Formation {
  id: string;
  name: string;
  description: string;
  layout: Array<{
    position: 'GK' | 'DF' | 'MF' | 'FW';
    x: number;
    y: number;
    count: number;
  }>;
}

export interface PlayerData {
  id: string;
  jerseyNumber: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  rating: number;
  price: number;
  fitness: number;
}

export interface XY {
  x: number;
  y: number;
}

export type TacticLevel = 'balanced' | 'defensive' | 'attacking' | 'counter';

export interface FormationBoardProps {
  players: PlayerData[];
  selectedFormation: string;
  onFormationChange: (id: string) => void;
  onTacticsChange: (tactics: TacticLevel) => void;
  onDefensiveLevel: (level: number) => void;
  onPlayerPositionChange: (playerId: string, position: XY) => void;
  readOnly?: boolean;
  showStats?: boolean;
  compactMode?: boolean;
}

export const FormationBoard: React.FC<FormationBoardProps> = ({
  players,
  selectedFormation,
  onFormationChange,
  onTacticsChange,
  onDefensiveLevel,
  onPlayerPositionChange,
  readOnly = false,
  showStats = true,
  compactMode = false,
}) => {
  const [draggedPlayer, setDraggedPlayer] = React.useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = React.useState<string | null>(null);
  const [tactics, setTactics] = React.useState<TacticLevel>('balanced');
  const [defensiveLevel, setDefensiveLevel] = React.useState(50);

  const formation = FORMATIONS.find(f => f.id === selectedFormation);
  if (!formation) return null;

  const handleFormationChange = (id: string) => {
    onFormationChange(id);
  };

  const handleTacticsChange = (newTactics: TacticLevel) => {
    setTactics(newTactics);
    onTacticsChange(newTactics);
  };

  const totalBudget = players.reduce((sum, p) => sum + p.price, 0);
  const avgRating = (players.reduce((sum, p) => sum + p.rating, 0) / players.length).toFixed(1);
  const avgFitness = Math.round(players.reduce((sum, p) => sum + p.fitness, 0) / players.length);

  return (
    <div className={`${styles.container} ${compactMode ? styles.compact : ''}`}>
      <FormationBoardCanvas
        players={players}
        formation={formation}
        selectedPlayer={selectedPlayer}
        draggedPlayer={draggedPlayer}
        tactics={tactics}
        onPlayerSelect={setSelectedPlayer}
        onPlayerDragStart={(id) => setDraggedPlayer(id)}
        onPlayerDrop={(id, position) => {
          onPlayerPositionChange(id, position);
          setDraggedPlayer(null);
        }}
        readOnly={readOnly}
      />

      {!compactMode && (
        <FormationControls
          selectedFormation={selectedFormation}
          tactics={tactics}
          defensiveLevel={defensiveLevel}
          totalBudget={totalBudget}
          avgRating={parseFloat(avgRating)}
          avgFitness={avgFitness}
          onFormationChange={handleFormationChange}
          onTacticsChange={handleTacticsChange}
          onDefensiveLevel={(level) => {
            setDefensiveLevel(level);
            onDefensiveLevel(level);
          }}
        />
      )}
    </div>
  );
};
```

### SVG Canvas Component (FormationBoardCanvas.tsx)
```typescript
// FormationBoardCanvas.tsx
import React from 'react';
import { POSITION_COLORS } from '../PlayerCard/types';
import styles from './FormationBoard.module.css';
import type { Formation, PlayerData, XY, TacticLevel } from './FormationBoard';

interface FormationBoardCanvasProps {
  players: PlayerData[];
  formation: Formation;
  selectedPlayer: string | null;
  draggedPlayer: string | null;
  tactics: TacticLevel;
  onPlayerSelect: (id: string | null) => void;
  onPlayerDragStart: (id: string) => void;
  onPlayerDrop: (id: string, position: XY) => void;
  readOnly?: boolean;
}

export const FormationBoardCanvas: React.FC<FormationBoardCanvasProps> = ({
  players,
  formation,
  selectedPlayer,
  draggedPlayer,
  tactics,
  onPlayerSelect,
  onPlayerDragStart,
  onPlayerDrop,
  readOnly = false,
}) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [positions, setPositions] = React.useState<Record<string, XY>>(() => {
    // Initialize positions from formation
    const result: Record<string, XY> = {};
    players.forEach((p, i) => {
      result[p.id] = { x: 50 + (i % 2) * 20 - 10, y: 20 + Math.floor(i / 2) * 15 };
    });
    return result;
  });

  const handleMouseDown = (playerId: string) => {
    if (readOnly) return;
    onPlayerDragStart(playerId);
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggedPlayer || !svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 130;

    setPositions(prev => ({
      ...prev,
      [draggedPlayer]: { x, y },
    }));

    onPlayerDrop(draggedPlayer, { x, y });
  };

  const tacticBorderColor = {
    defensive: '#5b9fd8',
    balanced: '#8b7fd8',
    attacking: '#d85b5b',
    counter: '#ffb84d',
  }[tactics];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 130"
      className={styles.canvas}
      style={{ borderColor: tacticBorderColor }}
      onMouseUp={handleMouseUp}
    >
      {/* Pitch background */}
      <rect x="0" y="0" width="100" height="130" fill="#1a2332" stroke="#252d3d" strokeWidth="1" />

      {/* Center line */}
      <line x1="50" y1="0" x2="50" y2="130" stroke="#252d3d" strokeWidth="1" strokeDasharray="5,5" />

      {/* Players */}
      {players.map((player) => {
        const pos = positions[player.id] || { x: 50, y: 65 };
        const isSelected = selectedPlayer === player.id;
        const isDragging = draggedPlayer === player.id;
        const color = POSITION_COLORS[player.position];

        return (
          <g key={player.id}>
            {/* Player circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r="5"
              fill={color}
              opacity={isDragging ? 1 : 0.8}
              stroke={isSelected ? 'white' : 'none'}
              strokeWidth={isSelected ? 2 : 0}
              style={{
                filter: isSelected ? `drop-shadow(0 0 8px ${color})` : 'none',
                cursor: readOnly ? 'default' : 'grab',
              }}
              onMouseDown={() => handleMouseDown(player.id)}
              onClick={() => onPlayerSelect(isSelected ? null : player.id)}
            />

            {/* Jersey number */}
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="3"
              fontWeight="bold"
              fill="white"
              fontFamily="monospace"
              pointerEvents="none"
            >
              {player.jerseyNumber}
            </text>

            {/* Tooltip on hover */}
            {isSelected && (
              <title>{`${player.name} - ${player.position} (${player.rating}★)`}</title>
            )}
          </g>
        );
      })}
    </svg>
  );
};
```

### Formations Data (formations.ts)
```typescript
// formations.ts
import type { Formation } from './FormationBoard';

export const FORMATIONS: Formation[] = [
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
      { position: 'MF', x: 30, y: 55, count: 1 },
      { position: 'MF', x: 50, y: 60, count: 1 },
      { position: 'MF', x: 70, y: 55, count: 1 },
      { position: 'FW', x: 35, y: 100, count: 1 },
      { position: 'FW', x: 50, y: 110, count: 1 },
      { position: 'FW', x: 65, y: 100, count: 1 },
    ],
  },
  {
    id: '4-4-2',
    name: '4-4-2',
    description: 'Defensive classic formation',
    layout: [
      { position: 'GK', x: 50, y: 10, count: 1 },
      { position: 'DF', x: 25, y: 30, count: 1 },
      { position: 'DF', x: 40, y: 25, count: 1 },
      { position: 'DF', x: 60, y: 25, count: 1 },
      { position: 'DF', x: 75, y: 30, count: 1 },
      { position: 'MF', x: 25, y: 55, count: 1 },
      { position: 'MF', x: 40, y: 60, count: 1 },
      { position: 'MF', x: 60, y: 60, count: 1 },
      { position: 'MF', x: 75, y: 55, count: 1 },
      { position: 'FW', x: 40, y: 105, count: 1 },
      { position: 'FW', x: 60, y: 105, count: 1 },
    ],
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1',
    description: 'Modern balanced formation',
    layout: [
      { position: 'GK', x: 50, y: 10, count: 1 },
      { position: 'DF', x: 25, y: 30, count: 1 },
      { position: 'DF', x: 40, y: 25, count: 1 },
      { position: 'DF', x: 60, y: 25, count: 1 },
      { position: 'DF', x: 75, y: 30, count: 1 },
      { position: 'MF', x: 35, y: 50, count: 1 },
      { position: 'MF', x: 65, y: 50, count: 1 },
      { position: 'MF', x: 25, y: 70, count: 1 },
      { position: 'MF', x: 50, y: 75, count: 1 },
      { position: 'MF', x: 75, y: 70, count: 1 },
      { position: 'FW', x: 50, y: 110, count: 1 },
    ],
  },
  // ... 3-5-2 and 5-3-2 formations
];
```

### Controls Component (FormationControls.tsx)
```typescript
// FormationControls.tsx
import React from 'react';
import styles from './FormationBoard.module.css';
import { FORMATIONS } from './formations';
import type { TacticLevel } from './FormationBoard';

interface FormationControlsProps {
  selectedFormation: string;
  tactics: TacticLevel;
  defensiveLevel: number;
  totalBudget: number;
  avgRating: number;
  avgFitness: number;
  onFormationChange: (id: string) => void;
  onTacticsChange: (tactics: TacticLevel) => void;
  onDefensiveLevel: (level: number) => void;
}

export const FormationControls: React.FC<FormationControlsProps> = ({
  selectedFormation,
  tactics,
  defensiveLevel,
  totalBudget,
  avgRating,
  avgFitness,
  onFormationChange,
  onTacticsChange,
  onDefensiveLevel,
}) => {
  return (
    <div className={styles.controls}>
      <div className={styles.controlRow}>
        <label>Formation:</label>
        <select value={selectedFormation} onChange={(e) => onFormationChange(e.target.value)}>
          {FORMATIONS.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.controlRow}>
        <label>Tactical Instructions:</label>
        <select value={tactics} onChange={(e) => onTacticsChange(e.target.value as TacticLevel)}>
          <option value="defensive">Defensive</option>
          <option value="balanced">Balanced</option>
          <option value="attacking">Attacking</option>
          <option value="counter">Counter Attack</option>
        </select>
      </div>

      <div className={styles.controlRow}>
        <label>Defensive Level: {defensiveLevel}%</label>
        <input
          type="range"
          min="0"
          max="100"
          value={defensiveLevel}
          onChange={(e) => onDefensiveLevel(parseInt(e.target.value))}
          className={styles.slider}
        />
      </div>

      <div className={styles.statsDisplay}>
        <div>Budget: {totalBudget.toFixed(1)}M / 100M ({((totalBudget / 100) * 100).toFixed(1)}%)</div>
        <div>Average Rating: {avgRating.toFixed(1)}</div>
        <div>Average Fitness: {avgFitness}%</div>
      </div>
    </div>
  );
};
```

### CSS Module (FormationBoard.module.css)
```css
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.canvas {
  width: 100%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 100 / 130;
  background-color: var(--dark-bg-primary);
  border: 1px solid #252d3d;
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-sm);
}

.canvas {
  border: 2px solid transparent;
  transition: border-color var(--transition-fast);
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--dark-bg-primary);
  border: 1px #252d3d solid;
  border-radius: var(--radius-md);
  padding: 20px;
}

.controlRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.controlRow label {
  font-size: 14px;
  color: #a8adb8;
  flex-shrink: 0;
}

.controlRow select,
.slider {
  flex: 1;
  padding: 8px 12px;
  background: var(--dark-bg-secondary);
  border: 1px solid #252d3d;
  border-radius: 4px;
  color: #ffffff;
  font-size: 14px;
}

.slider {
  height: 6px;
  padding: 0;
}

.statsDisplay {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  font-size: 12px;
  color: #a8adb8;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #252d3d;
}

/* Responsive */
@media (max-width: 768px) {
  .canvas {
    max-width: 100%;
  }

  .statsDisplay {
    grid-template-columns: 1fr;
  }
}

.compact {
  max-width: 100%;
}
```

### Success Criteria
- [ ] SVG canvas renders 11 players as circles
- [ ] Drag-drop repositions players with visual feedback
- [ ] Formation dropdown changes player layout
- [ ] Tactical instructions update border color
- [ ] Defensive level slider works (0-100%)
- [ ] Real-time budget/rating/fitness display updates
- [ ] Keyboard support (arrow keys, Enter, Escape)
- [ ] Fully responsive (375px, 768px, 1440px)
- [ ] Unit tests pass (drag logic, validation)
- [ ] Storybook shows all formations + tactics

---

## COMPONENT 6: STATPANEL

### File Structure
```
/components/StatPanel/
├─ StatPanel.tsx
├─ StatRow.tsx
├─ ProgressBar.tsx
├─ StatPanel.module.css
├─ StatPanel.test.tsx
└─ StatPanel.stories.tsx
```

### TypeScript Interfaces
```typescript
// StatPanel.tsx
interface Stat {
  name: string;
  value: number;
  max?: number;
  unit?: string;
  type?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  color?: string;
  description?: string;
}

interface StatPanelProps {
  title?: string;
  stats: Stat[];
  columns?: 1 | 2;
  type?: 'player' | 'team';
  comparison?: {
    team1: string;
    team2: string;
    stats: Array<{
      name: string;
      value1: number;
      value2: number;
      unit?: string;
    }>;
  };
  compact?: boolean;
  showDividers?: boolean;
}

export const StatPanel: React.FC<StatPanelProps> = ({
  title,
  stats,
  columns = 1,
  type = 'player',
  comparison,
  compact = false,
  showDividers = true,
}) => {
  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      
      {comparison ? (
        <div className={styles.comparisonGrid}>
          {comparison.stats.map((stat) => (
            <ComparisonRow key={stat.name} stat={stat} />
          ))}
        </div>
      ) : (
        <div className={`${styles.grid} ${styles[`columns-${columns}`]}`}>
          {stats.map((stat) => (
            <StatRow key={stat.name} stat={stat} showDivider={showDividers} />
          ))}
        </div>
      )}
    </div>
  );
};
```

### StatRow Component (StatRow.tsx)
```typescript
// StatRow.tsx
import React from 'react';
import { ProgressBar } from './ProgressBar';
import styles from './StatPanel.module.css';
import type { Stat } from './StatPanel';

interface StatRowProps {
  stat: Stat;
  showDivider?: boolean;
}

export const StatRow: React.FC<StatRowProps> = ({ stat, showDivider }) => {
  const color = stat.color || {
    info: '#4a9eff',
    success: '#6bbf59',
    warning: '#ffb84d',
    danger: '#ff5c5c',
    neutral: '#8b95a5',
  }[stat.type || 'info'];

  return (
    <div className={`${styles.row} ${showDivider ? styles.divider : ''}`}>
      <span className={styles.label}>{stat.name}</span>
      <div className={styles.valueContainer}>
        <span className={styles.value}>{stat.value}{stat.unit || ''}</span>
        {stat.max && (
          <ProgressBar
            value={stat.value}
            max={stat.max}
            color={color}
          />
        )}
      </div>
    </div>
  );
};
```

### ProgressBar Component (ProgressBar.tsx)
```typescript
// ProgressBar.tsx
import React from 'react';
import styles from './StatPanel.module.css';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = '#4a9eff',
  height = 4,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={styles.progressBar}
      style={{ height: `${height}px` }}
    >
      <div
        className={styles.progressFill}
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
```

### CSS Module (StatPanel.module.css)
```css
.container {
  width: 100%;
  background: var(--dark-bg-primary);
  border: 1px solid #252d3d;
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.title {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #a8adb8;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #252d3d;
}

.grid {
  display: grid;
  gap: 0;
}

.columns-1 {
  grid-template-columns: 1fr;
}

.columns-2 {
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 16px;
  padding: 16px 0;
  align-items: center;
}

.row.divider {
  border-bottom: 1px solid #252d3d;
}

.row:last-child.divider {
  border-bottom: none;
}

.label {
  font-size: 14px;
  color: #a8adb8;
  text-align: left;
}

.valueContainer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}

.value {
  font-size: 18px;
  font-family: 'IBM Plex Mono';
  font-weight: 700;
  color: #ffffff;
  text-align: right;
}

.progressBar {
  width: 100%;
  background-color: #252d3d;
  border-radius: 2px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  transition: width var(--transition-fast);
}

/* Comparison styles */
.comparisonGrid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .columns-2 {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 12px 0;
  }

  .label {
    font-size: 12px;
  }

  .value {
    font-size: 16px;
  }
}
```

### Test Suite & Storybook (Follow similar pattern to previous components)

### Success Criteria
- [ ] Single and double column layouts work
- [ ] Progress bars calculate and display correctly
- [ ] Color-coding per stat type (info, success, warning, danger)
- [ ] Comparison mode shows side-by-side stats
- [ ] Responsive at 375px, 768px, 1440px
- [ ] Unit tests passing
- [ ] Storybook stories show player, team, comparison variants

---

## COMPONENT 7: MATCHTIMELINE

### File Structure
```
/components/MatchTimeline/
├─ MatchTimeline.tsx
├─ MatchEvent.tsx
├─ EventIcon.tsx
├─ MatchTimeline.module.css
├─ MatchTimeline.test.tsx
└─ MatchTimeline.stories.tsx
```

### Key Implementation Points
- Scrollable container with max-height: 500px
- Events render in reverse chronological order (latest at top)
- Color-coded event types (goal red, substitution purple, card amber, etc.)
- Entry animation (slideInFromBottom, 300ms staggered)
- Optional hover tooltips with full match details
- Responsive: hide details on mobile, show only icons + time

### TypeScript Interface
```typescript
type EventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'injury' | 'kickoff' | 'half_time' | 'full_time';

interface MatchEvent {
  id: string;
  minute: number;
  type: EventType;
  team?: string;
  player: string;
  description: string;
  impact?: { pointsAwarded?: number; ratingChange?: number };
  // ... type-specific fields
}

interface MatchTimelineProps {
  events: MatchEvent[];
  matchId: string;
  autoScroll?: boolean;
  maxHeight?: number;
  showDetails?: boolean;
  compact?: boolean;
  onEventClick?: (event: MatchEvent) => void;
}
```

### CSS Highlights
- Border-left: 4px per event type (color-coded)
- Background: subtle overlay at 10% opacity of accent color
- Hover: opacity increase, shadow elevation
- Scroll: smooth, native momentum
- Animation: stagger 50ms per event

### Success Criteria
- [ ] All 8 event types render correctly
- [ ] Events sorted in reverse chronological order
- [ ] Colors match design spec
- [ ] Animations smooth and performant
- [ ] Responsive (mobile: compact view, tablet/desktop: full)
- [ ] Click handlers work
- [ ] Unit tests passing
- [ ] Storybook shows all event types

---

## COMPONENT 8: MATCHCARD

### File Structure (3 Variants)
```
/components/MatchCard/
├─ MatchCard.tsx               (Dispatcher)
├─ MatchCardCompact.tsx        (Result list)
├─ MatchCardStandard.tsx       (Dashboard featured)
├─ MatchCardExpanded.tsx       (Full details)
├─ MatchCard.module.css
├─ MatchCard.test.tsx
└─ MatchCard.stories.tsx
```

### Key Variant Differences

**Compact**: 280×120px | Score + user points only | Hover elevates
**Standard**: 380×280px | Stats comparison + goals listed | Featured styling
**Expanded**: 700×auto | Full team stats + performer list | Detailed modal

### Success Criteria
- [ ] Compact variant renders 280×120px
- [ ] Standard shows stats comparison grid
- [ ] Expanded has full team sections with performer list
- [ ] All variants show correct score format
- [ ] Status badge integrated (Upcoming, Live, Final, Postponed)
- [ ] User score display working
- [ ] Responsive layouts for mobile
- [ ] Unit tests passing (all 3 variants)

---

## COMPONENT 9: STANDINGSTABLE

### File Structure
```
/components/StandingsTable/
├─ StandingsTable.tsx
├─ StandingsRow.tsx
├─ StandingsTable.module.css
├─ StandingsTable.test.tsx
└─ StandingsTable.stories.tsx
```

### Key Features
- Sticky header (top) + sticky left columns (POS, TEAM)
- 8 columns: POS, TEAM, GP, W, D, L, PTS, TRD
- Zone highlighting: green (top 4), purple (5-8), red (18-20)
- Trend indicators: ↑↑ (+2), ↑ (+1), → (0), ↓ (-1), ↓↓ (-2)
- Points column: 24px bold mono (emphasis)
- Optional team highlight (user's team)

### CSS Highlights
```css
/* Sticky positioning */
position: sticky;
top: 0; /* Header */
left: 0; /* POS + TEAM columns */
z-index: 10; /* Header */
z-index: 20; /* Corner both sticky */

/* Zone backgrounds */
.zone-promotion { background: rgba(107, 191, 89, 0.05); }
.zone-playoff { background: rgba(155, 132, 183, 0.05); }
.zone-relegation { background: rgba(255, 92, 92, 0.05); }
```

### Success Criteria
- [ ] Table renders 20 rows + header
- [ ] Sticky header always visible on scroll
- [ ] Sticky left columns (POS, TEAM) visible on horizontal scroll
- [ ] Zone highlighting correct (rows 1-4, 5-8, 17-20)
- [ ] Trend arrows colored (green up, red down, gray neutral)
- [ ] Points column bolded (24px)
- [ ] Responsive: mobile simplified view (POS, TEAM, PTS, TRD only)
- [ ] Click handlers on rows
- [ ] Unit tests passing

---

## COMPONENT 10: LAYOUT COMPONENTS

### File Structure
```
/components/Layout/
├─ Header.tsx
├─ Sidebar.tsx
├─ Card.tsx
├─ ContentArea.tsx
├─ Grid.tsx
├─ Layout.module.css
├─ Layout.test.tsx
└─ Layout.stories.tsx
```

### 5 Sub-Components

**Header**
- Sticky top (z-index 600)
- 64px height
- Navigation items horizontally aligned
- Logo + title on left
- Settings/menu on right
- Mobile: hamburger menu toggle

**Sidebar**
- Desktop: Fixed left (280px)
- Mobile: Drawer overlay (280px max, slide from left)
- Navigation items + secondary section
- Current path highlighting
- Mobile backdrop (click to close)

**Card**
- 3 variants: standard, elevated, compact
- Padding: 20px (standard), 12px (compact)
- Border + shadow (standard) or elevated shadow
- Optional title/header section
- Hoverable effect

**ContentArea**
- Max-width: 1440px
- Centered with responsive padding
- Optional column grid system
- Gap customizable (sm/md/lg)

**Grid**
- Responsive columns (1-12)
- Auto-responsive mode (adapts per breakpoint)
- Gap customizable

### Success Criteria
- [ ] Header sticky at top
- [ ] Sidebar responsive (fixed desktop, drawer mobile)
- [ ] Card supports all 3 variants
- [ ] ContentArea centers and constrains width
- [ ] Grid responsive columns work
- [ ] All components accept className prop
- [ ] Navigation items clickable
- [ ] Mobile hamburger menu functions
- [ ] Unit tests passing

---

## TESTING STRATEGY & VALIDATION

### Unit Testing Checklist

Each component must have:

```typescript
✓ Rendering test: Component renders without errors
✓ Props test: All props work as documented
✓ State test: Visual states (hover, active, disabled, focus) functional
✓ Accessibility: Keyboard nav, ARIA labels, tabindex
✓ Responsive: Works at 375px, 768px, 1440px

// Example test structure
describe('ComponentName', () => {
  it('renders without errors');
  it('renders with required props');
  it('applies variant classes correctly');
  it('handles click events');
  it('supports keyboard navigation');
  it('has accessible ARIA attributes');
  it('responds to media queries');
});
```

### Storybook Requirements

Each component needs 5+ stories:

```typescript
1. **Default** - Basic usage
2. **All Variants** - Every visual variant
3. **Interactive** - Click, hover, focus states
4. **Responsive** - 375px, 768px, 1440px views
5. **Accessibility** - Focus states, keyboard nav
6. **Edge Cases** - Empty, long text, loading
```

### Responsive Validation Checklist

```
Mobile (375px)
├─ No horizontal scrolling
├─ Touch targets ≥ 44×44px
├─ Typography readable (min 12px)
├─ Buttons full-width on forms
└─ Modals full-screen minus padding

Tablet (768px)
├─ Two-column layout where applicable
├─ Increased padding from mobile
├─ Dropdowns functional
└─ Touch-friendly spacing

Desktop (1440px)
├─ Full-width utilized
├─ Multi-column layouts active
├─ Hover effects present
└─ Max-width constraints observed
```

### Accessibility Validation Checklist

```
WCAG AA Compliance:
✓ Color contrast ≥ 4.5:1 (normal text)
✓ Color contrast ≥ 3:1 (large text)
✓ Focus indicators visible (2px outline)
✓ Keyboard navigation works (Tab, Enter, Escape, arrows)
✓ ARIA labels on icons
✓ Form labels associated with inputs
✓ No reliance on color alone
✓ Motion respects prefers-reduced-motion
✓ Screen reader compatible
```

---

## SUCCESS CRITERIA

### Per-Component Completion

Each component is "done" when:

```
Visual
✓ Matches design spec exactly (colors, spacing, typography)
✓ All variants render correctly
✓ Responsive at all breakpoints
✓ Animations smooth (60fps)
✓ No visual glitches or layout shifts

Functional
✓ All props work as documented
✓ Events fire correctly (onClick, onChange, etc.)
✓ State updates reflected immediately
✓ Loading/error states work
✓ Disabled states functional

Code Quality
✓ Full TypeScript types (no 'any')
✓ No console errors/warnings
✓ Tests passing (≥90% coverage)
✓ File size <50KB minified
✓ No memory leaks

Accessibility
✓ Keyboard navigation works
✓ Focus states visible
✓ WCAG AA contrast
✓ ARIA labels present
✓ Screen reader compatible

Documentation
✓ JSDoc comments on complex props
✓ Storybook stories (5+)
✓ README with usage examples
✓ TypeScript types exported
```

### Phase 2 Completion Checklist

```
Build
✓ 10 components fully implemented
✓ All TypeScript interfaces exported
✓ All CSS modules complete

Testing
✓ Unit tests for all components (>90% coverage)
✓ Storybook complete (50+ stories)
✓ Manual testing at 375px, 768px, 1440px
✓ Accessibility audit (WCAG AA)

Integration
✓ Component dependencies verified
✓ Button works in all dependent components
✓ Layout renders all components correctly
✓ No circular dependencies

Documentation
✓ README files updated
✓ Storybook deploying
✓ TypeScript types exportable
✓ Usage examples in stories

Quality
✓ No console errors/warnings
✓ No test failures
✓ No TypeScript errors
✓ Lighthouse accessibility: 100
✓ Performance: FCP <1.5s, LCP <2.5s
```

---

## IMPLEMENTATION NOTES

### Design Tokens (Phase 1 - Use These)

```css
Colors:
--dark-bg-primary: #0f1419
--dark-bg-secondary: #1a2332
--dark-bg-tertiary: #252d3d
--dark-bg-elevated: #2a3545
--text-primary: #f0f2f5
--text-secondary: #a8adb8
--text-highlight: #4a9eff
--primary-accent: #4a9eff
--success-color: #6bbf59
--warning-color: #ffb84d
--danger-color: #ff5c5c

Spacing:
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px

Radius:
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 16px
--radius-full: 12px (pill)

Transitions:
--transition-fast: 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
--transition-all: all 200ms ease-in-out

Shadows:
--shadow-sm: 0 4px 12px rgba(0,0,0,0.3)
--shadow-md: 0 8px 24px rgba(0,0,0,0.4)
--shadow-lg: 0 16px 40px rgba(0,0,0,0.5)
```

### File Naming Conventions

```
/components/ComponentName/
├─ ComponentName.tsx          (Main export)
├─ ComponentName.module.css   (Styles - scoped)
├─ ComponentName.test.tsx     (Unit tests)
├─ ComponentName.stories.tsx  (Storybook)
├─ types.ts                   (Interfaces, if shared)
├─ utils.ts                   (Helpers, if needed)
└─ hooks/useCustomHook.ts    (Custom hooks, if needed)
```

### Git Commit Strategy

```
Day 1-2: 
  git commit -m "feat: add Button component (primary, secondary, danger, success, outline variants)"
  git commit -m "feat: add FormIndicator component (5-dot form display)"
  git commit -m "feat: add StatusBadge component (5 status types)"

Day 3-4:
  git commit -m "feat: add Layout components (Header, Sidebar, Card, ContentArea, Grid)"
  git commit -m "feat: add PlayerCard component (compact, standard, detailed variants)"

Day 5:
  git commit -m "feat: complete PlayerCard with full tests + Storybook"
  git commit -m "feat: add MatchCard component (compact, standard, expanded)"

Day 6-7:
  git commit -m "feat: add FormationBoard with SVG canvas and drag-drop"
  git commit -m "feat: add StatPanel with progress bars and comparison mode"

Day 8-9:
  git commit -m "feat: add MatchTimeline with 8 event types"
  git commit -m "feat: add StandingsTable with sticky positioning"

Day 10:
  git commit -m "test: comprehensive integration testing + accessibility audit"
  git commit -m "fix: responsive refinement (375px, 768px, 1440px)"
  git commit -m "docs: phase 2 complete - 10 components ready for production"
```

---

## CODER HANDOFF NOTES

### Getting Started
1. Create branch: `git checkout -b feature/phase2-components`
2. Start with Day 1 components (Button first - blocking dependency)
3. Run tests after each component: `npm test`
4. Update Storybook: `npm run storybook`
5. Check responsive: Dev tools at 375px, 768px, 1440px

### Daily Checkpoint
Each end-of-day (Days 1-10):
- [ ] All unit tests passing
- [ ] Storybook building without warnings
- [ ] No console errors
- [ ] Responsive verified
- [ ] Commit with clear message

### Questions/Blockers
- Design token not found? Check `/styles/variables.css`
- Component not rendering? Verify TypeScript types
- Responsive issue? Use `@media (max-width: 768px)` + `@media (max-width: 375px)`
- Build failing? Clear cache: `rm -rf node_modules/.cache`

### Success Indicators
- Day 5 end: 6 components done (Button, FormIndicator, StatusBadge, Layout, PlayerCard, MatchCard)
- Day 10 end: All 10 components + 50+ Storybook stories + passing tests

---

**STATUS**: Specification Complete. Ready for CODER Implementation.

**NEXT**: Begin Day 1 - Build Button component.

---

*Generated by PLANNER Agent based on design-audit-fm-phase2.md*  
*Implementation Timeline: 10 days (60-75 hours)*  
*Target Completion: End of Week 2*

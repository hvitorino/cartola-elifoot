/**
 * CartolA Elifoot — Phase 2 Components Index
 * All 10 components with vanilla JavaScript
 *
 * Components:
 * 1. Button - 5 variants (primary, secondary, danger, success, outline), 3 sizes
 * 2. FormIndicator - 5-dot form display (1-5 rating)
 * 3. StatusBadge - 5 status types (fit, injured, doubtful, returning, suspended)
 * 4. PlayerCard - 3 variants (compact, standard, detailed)
 * 5. MatchCard - 3 variants (compact, standard, expanded)
 * 6. FormationBoard - SVG tactical visualization with drag-drop
 * 7. StatPanel - Stats display with progress bars, single/double column
 * 8. MatchTimeline - Timeline of 8 event types
 * 9. StandingsTable - League table with sticky positioning
 * 10. Layout - Header, Sidebar, Card, ContentArea, Grid
 */

// Import all components
// Note: In a real project, these would be ES6 imports
// For vanilla JS, load via <script> tags in HTML

const COMPONENTS = {
  Button,
  FormIndicator,
  StatusBadge,
  PlayerCard,
  MatchCard,
  FormationBoard,
  StatPanel,
  MatchTimeline,
  StandingsTable,
  Layout: {
    Header,
    Sidebar,
    Card,
    ContentArea,
    Grid
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COMPONENTS;
}

// Global namespace
if (typeof window !== 'undefined') {
  window.COMPONENTS = COMPONENTS;
}

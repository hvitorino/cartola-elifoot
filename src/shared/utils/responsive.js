/**
 * Responsive design utilities
 * Breakpoint detection and responsive calculations
 */

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
};

/**
 * Get current breakpoint
 * @returns {'mobile' | 'tablet' | 'desktop'}
 */
export function getCurrentBreakpoint() {
  const width = window.innerWidth;
  if (width < BREAKPOINTS.tablet) return 'mobile';
  if (width < BREAKPOINTS.desktop) return 'tablet';
  return 'desktop';
}

/**
 * Check if viewport matches breakpoint
 * @param {string} breakpoint
 * @returns {boolean}
 */
export function isBreakpoint(breakpoint) {
  return getCurrentBreakpoint() === breakpoint;
}

/**
 * Get number of columns for current breakpoint
 * @param {string} layout - 'standard' | 'wide'
 * @returns {number}
 */
export function getColumnCount(layout = 'standard') {
  const breakpoint = getCurrentBreakpoint();
  const colMap = {
    standard: { mobile: 1, tablet: 2, desktop: 3 },
    wide: { mobile: 1, tablet: 3, desktop: 4 },
  };
  return colMap[layout][breakpoint];
}

/**
 * Get responsive font size
 * @param {number} desktopSize - Size in px at desktop
 * @returns {number} Adjusted size for current breakpoint
 */
export function getResponsiveFontSize(desktopSize) {
  const breakpoint = getCurrentBreakpoint();
  const scale = {
    mobile: 0.75,
    tablet: 0.88,
    desktop: 1,
  };
  return Math.round(desktopSize * scale[breakpoint]);
}

/**
 * Get responsive spacing
 * @param {number} desktopSpacing - Base 8px grid units
 * @returns {number} Spacing in pixels
 */
export function getResponsiveSpacing(units) {
  const breakpoint = getCurrentBreakpoint();
  const unitSize = 8; // 8px baseline grid
  const scale = {
    mobile: 0.75,
    tablet: 0.88,
    desktop: 1,
  };
  return unitSize * units * scale[breakpoint];
}

/**
 * Listen for responsive changes
 * @param {Function} callback
 * @returns {Function} Unsubscribe function
 */
export function onResponsiveChange(callback) {
  const handleResize = () => {
    callback(getCurrentBreakpoint());
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}

/**
 * Get grid template for current breakpoint
 * @param {string} layout - 'standard' | 'equal'
 * @returns {string} CSS grid-template-columns value
 */
export function getGridTemplate(layout = 'standard') {
  const breakpoint = getCurrentBreakpoint();
  const templates = {
    standard: {
      mobile: '1fr',
      tablet: '1fr 1fr',
      desktop: '1fr 1fr 1fr',
    },
    equal: {
      mobile: '1fr',
      tablet: 'repeat(2, 1fr)',
      desktop: 'repeat(3, 1fr)',
    },
  };
  return templates[layout][breakpoint];
}

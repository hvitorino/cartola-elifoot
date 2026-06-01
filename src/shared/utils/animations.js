/**
 * Animation and transition utilities
 * Consistent motion across all pages
 */

export const ANIMATION_DURATIONS = {
  fast: 150,      // ms - hover effects
  normal: 300,    // ms - page transitions
  slow: 500,      // ms - complex animations
};

export const EASING_CURVES = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
};

/**
 * Create smooth transition CSS
 * @param {string} property - CSS property to transition
 * @param {number} duration - Duration in ms
 * @param {string} easing - Easing curve name
 * @returns {string} CSS transition value
 */
export function transition(property = 'all', duration = ANIMATION_DURATIONS.normal, easing = 'easeInOut') {
  return `${property} ${duration}ms ${EASING_CURVES[easing]}`;
}

/**
 * Respect prefers-reduced-motion
 * Returns duration 0 if user prefers reduced motion
 * @param {number} duration - Duration in ms
 * @returns {number} Adjusted duration
 */
export function respectMotionPreference(duration) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 0;
  }
  return duration;
}

/**
 * Animate value from start to end
 * @param {Function} update - Called with current value
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Duration in ms
 * @param {string} easing - Easing curve name
 */
export function animateValue(update, start, end, duration, easing = 'easeInOut') {
  const startTime = performance.now();
  const totalDistance = end - start;
  const easingFn = getEasingFunction(easing);

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easingFn(progress);
    const current = start + totalDistance * eased;

    update(current);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/**
 * Get easing function by name
 * @param {string} name
 * @returns {Function}
 */
function getEasingFunction(name) {
  const easing = {
    easeIn: (t) => t * t,
    easeOut: (t) => 1 - (1 - t) ** 2,
    easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    smooth: (t) => t * t * (3 - 2 * t),
  };
  return easing[name] || easing.easeInOut;
}

/**
 * Stagger animation for arrays
 * @param {number} baseDelay - Base delay in ms
 * @param {number} index - Element index
 * @param {number} staggerAmount - Delay between items in ms
 * @returns {number} Calculated delay for this item
 */
export function staggerDelay(baseDelay, index, staggerAmount = 50) {
  return baseDelay + index * staggerAmount;
}

/**
 * Create pulse animation for elements
 * @param {HTMLElement} element
 * @param {number} duration - Animation duration
 */
export function pulse(element, duration = ANIMATION_DURATIONS.slow) {
  const actualDuration = respectMotionPreference(duration);
  element.style.animation = `pulse ${actualDuration}ms infinite`;
}

/**
 * Create bounce animation
 * @param {HTMLElement} element
 * @param {number} distance - Bounce distance in px
 */
export function bounce(element, distance = 10) {
  const keyframes = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-${distance}px); }
    }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.textContent = keyframes;
  document.head.appendChild(styleSheet);

  element.style.animation = `bounce ${ANIMATION_DURATIONS.slow}ms ease-in-out`;
}

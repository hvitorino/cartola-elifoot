/**
 * Progressive text animation engine for match narratives
 */

let animationConfig = {
  baseDelay: 500,
  charDelay: 30,
  fadeInDuration: 400,
  scrollBehavior: 'smooth'
};

let animationStats = {
  totalTime: 0,
  charCount: 0,
  avgCharTime: 0
};

let ongoingAnimations = [];
let animationCancelled = false;

/**
 * Configure animation system
 * @param {Object} config - { baseDelay, charDelay, fadeInDuration, scrollBehavior }
 * Default: { baseDelay: 500, charDelay: 30, fadeInDuration: 400, scrollBehavior: 'smooth' }
 */
export function configurarAnimacao(config) {
  if (config && typeof config === 'object') {
    animationConfig = { ...animationConfig, ...config };
  }
}

/**
 * Animate text character-by-character with optional fade-in
 * @param {HTMLElement} element - Target element for animation
 * @param {String} texto - Text to animate
 * @param {Object} options - { delay, charDelay, fadeIn, tipo }
 * @returns {Promise} Resolves when animation complete
 */
export async function animarTexto(element, texto, options = {}) {
  return new Promise((resolve) => {
    if (!element || !texto) {
      resolve();
      return;
    }

    const delay = options.delay || animationConfig.baseDelay;
    const charDelay = options.charDelay || animationConfig.charDelay;
    const fadeIn = options.fadeIn !== false;
    const tipo = options.tipo || 'default';

    // Reset element
    element.textContent = '';
    element.style.opacity = '1';

    // Add special classes for styling
    if (tipo) {
      element.classList.add(`lance-${tipo}`);
    }

    // Store animation tracking
    const animationId = Math.random();
    ongoingAnimations.push(animationId);

    // Wait initial delay
    setTimeout(() => {
      if (animationCancelled || !ongoingAnimations.includes(animationId)) {
        resolve();
        return;
      }

      let charIndex = 0;
      const startTime = Date.now();

      const animateChar = () => {
        if (animationCancelled || !ongoingAnimations.includes(animationId)) {
          resolve();
          return;
        }

        if (charIndex < texto.length) {
          const char = texto[charIndex];
          const span = document.createElement('span');
          span.textContent = char;

          if (fadeIn) {
            span.style.opacity = '0';
            span.style.animation = `charReveal ${animationConfig.fadeInDuration}ms ease-out forwards`;
          }

          element.appendChild(span);
          charIndex++;

          setTimeout(animateChar, charDelay);
        } else {
          // Animation complete
          const endTime = Date.now();
          const totalTime = endTime - startTime;

          animationStats.totalTime = totalTime;
          animationStats.charCount = texto.length;
          animationStats.avgCharTime = totalTime / texto.length;

          // Remove from ongoing
          ongoingAnimations = ongoingAnimations.filter(id => id !== animationId);

          resolve();
        }
      };

      animateChar();
    }, delay);
  });
}

/**
 * Queue multiple text animations sequentially
 * @param {Array<{element, texto, options}>} fila
 * @returns {Promise} Resolves when all complete
 */
export async function animarFilaTextos(fila) {
  if (!Array.isArray(fila) || fila.length === 0) {
    return Promise.resolve();
  }

  for (const item of fila) {
    if (animationCancelled) {
      break;
    }

    await animarTexto(item.element, item.texto, item.options || {});
  }
}

/**
 * Cancel ongoing animations
 */
export function cancelarAnimacoes() {
  animationCancelled = true;
  ongoingAnimations = [];

  // Reset for next animation
  setTimeout(() => {
    animationCancelled = false;
  }, 100);
}

/**
 * Get animation timing data for testing
 * @returns {Object} { totalTime, charCount, avgCharTime }
 */
export function obterEstatisticasAnimacao() {
  return { ...animationStats };
}

/**
 * Get current configuration
 * @returns {Object}
 */
export function obterConfiguracao() {
  return { ...animationConfig };
}

/**
 * Check if animations are running
 * @returns {Boolean}
 */
export function temAnimacaoEmAndamento() {
  return ongoingAnimations.length > 0;
}

/**
 * Reset animation stats
 */
export function resetarEstatisticas() {
  animationStats = {
    totalTime: 0,
    charCount: 0,
    avgCharTime: 0
  };
}

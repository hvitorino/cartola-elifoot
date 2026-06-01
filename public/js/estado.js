/**
 * Game state management (localStorage wrapper)
 */

const STATE_KEY = 'cartola_elifoot_estado';

/**
 * Initialize state structure
 * @returns {Object} Default initial state
 */
export function estadoInicial() {
  return {
    clubeId: null,
    rodadaAtual: 1,
    escalacaoAtual: [],
    esquemaTatico: '4-4-2',
    tabela: [],
    historico: []
  };
}

/**
 * Get current state from localStorage
 * @returns {Object} Current game state
 */
export function getEstado() {
  try {
    const stored = localStorage.getItem(STATE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Error reading state from localStorage:', err);
  }

  return estadoInicial();
}

/**
 * Update game state
 * @param {Object} updates - Partial updates to merge
 */
export function setEstado(updates) {
  try {
    const current = getEstado();
    const updated = { ...current, ...updates };
    localStorage.setItem(STATE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error writing state to localStorage:', err);
  }
}

/**
 * Save a completed match to history
 * @param {Object} resultado - { escalacao, adversario, lances, placar, destaques }
 */
export function salvarResultado(resultado) {
  try {
    const current = getEstado();
    const historico = [...(current.historico || []), resultado];
    setEstado({ historico });
  } catch (err) {
    console.error('Error saving resultado:', err);
  }
}

/**
 * Clear all state (reset game)
 */
export function resetEstado() {
  try {
    localStorage.removeItem(STATE_KEY);
  } catch (err) {
    console.error('Error resetting state:', err);
  }
}

/**
 * Get last match result
 * @returns {Object} Latest match from historico
 */
export function ultimoResultado() {
  const estado = getEstado();
  if (estado.historico && estado.historico.length > 0) {
    return estado.historico[estado.historico.length - 1];
  }
  return null;
}

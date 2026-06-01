import * as mockData from './mock_data.js';

const API_BASE = '/api';

/**
 * Fetch all Serie A clubs
 * @returns {Promise<Array>} Array of { id, nome, abreviacao, escudo_id }
 */
export async function getClubs() {
  return fetch_safe(`${API_BASE}/clubes`);
}

/**
 * Fetch all available players in current market
 * @returns {Promise<Array>} Array of { atleta_id, nome, posicao_id, clube_id, media_num }
 */
export async function getPlayers() {
  return fetch_safe(`${API_BASE}/atletas/mercado`);
}

/**
 * Filter players by club
 * @param {Number} clubeId
 * @returns {Promise<Array>} Players filtered
 */
export async function getPlayersByClub(clubeId) {
  try {
    const players = await getPlayers();
    return players.filter(p => p.clube_id === clubeId);
  } catch (err) {
    console.error('Error filtering players by club:', err);
    const allPlayers = mockData.getPlayers();
    return allPlayers.filter(p => p.clube_id === clubeId);
  }
}

/**
 * Get match schedule for a round
 * @param {Number} rodada
 * @returns {Promise<Array>} Array of { id, clube_casa_id, clube_visitante_id, placar_casa, placar_visitante, data_realizacao }
 */
export async function getPartidas(rodada) {
  return fetch_safe(`${API_BASE}/partidas/${rodada}`);
}

/**
 * Get highlights after a round
 * @returns {Promise<Object>} Highlights data
 */
export async function getDestaques() {
  return fetch_safe(`${API_BASE}/pos-rodada/destaques`);
}

/**
 * Internal: fetch wrapper with error handling
 * Falls back to mock data if endpoint fails
 * @param {String} endpoint
 * @returns {Promise<any>}
 */
async function fetch_safe(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`API error at ${endpoint}:`, err.message);

    // Return mock data based on endpoint
    if (endpoint.includes('/clubes')) {
      return mockData.getClubs();
    } else if (endpoint.includes('/atletas/mercado')) {
      return mockData.getPlayers();
    } else if (endpoint.includes('/partidas')) {
      return mockData.getPartidas();
    } else if (endpoint.includes('/destaques')) {
      return { destaques: [] };
    }

    return [];
  }
}

/**
 * Centralized API data fetching
 * Handles all backend communication
 */

export class DataService {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  // Fetch with cache
  async fetch(endpoint, options = {}) {
    const cacheKey = endpoint;

    // Return cached data if available and not expired
    if (this.cache.has(cacheKey)) {
      const { data, timestamp } = this.cache.get(cacheKey);
      if (Date.now() - timestamp < this.cacheExpiry) {
        return data;
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }

  // Get user data
  async getUser() {
    return this.fetch('/user');
  }

  // Get season info
  async getSeason() {
    return this.fetch('/season');
  }

  // Get all players
  async getPlayers() {
    return this.fetch('/players');
  }

  // Get current team lineup
  async getLineup() {
    return this.fetch('/team/lineup');
  }

  // Save lineup
  async saveLineup(lineup) {
    return this.fetch('/team/lineup', {
      method: 'POST',
      body: JSON.stringify(lineup),
    });
  }

  // Get matches (current/past/upcoming)
  async getMatches(filter = 'all') {
    return this.fetch(`/matches?filter=${filter}`);
  }

  // Get specific match
  async getMatch(matchId) {
    return this.fetch(`/matches/${matchId}`);
  }

  // Get league standings
  async getStandings() {
    return this.fetch('/standings');
  }

  // Clear cache
  clearCache(endpoint = null) {
    if (endpoint) {
      this.cache.delete(endpoint);
    } else {
      this.cache.clear();
    }
  }
}

export const dataService = new DataService();

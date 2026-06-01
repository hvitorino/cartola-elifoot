/**
 * Central application state manager
 * Provides reactive updates across pages
 */

export class AppState {
  constructor() {
    this.user = {
      id: '',
      email: '',
      teamName: '',
    };
    this.season = {
      id: '',
      currentMatchday: 1,
      totalMatchdays: 38,
    };
    this.currentTeam = {
      players: new Map(),        // playerId → PlayerData
      formation: '4-3-3',
      selectedPlayers: [],       // 11 player IDs
      tacticalInstructions: 'balanced',
      defensiveLevel: 50,
    };
    this.matches = {
      current: null,             // Current/live match
      past: [],                  // MatchData[]
      upcoming: [],              // MatchData[]
    };
    this.standings = [];         // StandingData[]
    this.isLoading = false;
    this.errors = [];

    this.listeners = new Set();
  }

  // Subscribe to state changes
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all subscribers
  notify() {
    this.listeners.forEach(cb => cb(this));
  }

  // Update user profile
  setUser(userData) {
    this.user = { ...this.user, ...userData };
    this.notify();
  }

  // Update season info
  setSeason(seasonData) {
    this.season = { ...this.season, ...seasonData };
    this.notify();
  }

  // Set current team lineup
  setTeam(teamData) {
    this.currentTeam = { ...this.currentTeam, ...teamData };
    this.notify();
  }

  // Update player in current team
  setPlayer(playerId, playerData) {
    this.currentTeam.players.set(playerId, {
      ...this.currentTeam.players.get(playerId),
      ...playerData,
    });
    this.notify();
  }

  // Set selected 11 players
  setSelectedPlayers(playerIds) {
    if (playerIds.length !== 11) {
      throw new Error('Exactly 11 players must be selected');
    }
    this.currentTeam.selectedPlayers = playerIds;
    this.notify();
  }

  // Update matches list
  setMatches(matchesData) {
    this.matches = matchesData;
    this.notify();
  }

  // Set current match (for live match page)
  setCurrentMatch(matchData) {
    this.matches.current = matchData;
    this.notify();
  }

  // Update standings
  setStandings(standingsData) {
    this.standings = standingsData;
    this.notify();
  }

  // Reset state to initial
  reset() {
    this.user = { id: '', email: '', teamName: '' };
    this.season = { id: '', currentMatchday: 1, totalMatchdays: 38 };
    this.currentTeam = {
      players: new Map(),
      formation: '4-3-3',
      selectedPlayers: [],
      tacticalInstructions: 'balanced',
      defensiveLevel: 50,
    };
    this.matches = { current: null, past: [], upcoming: [] };
    this.standings = [];
    this.notify();
  }
}

// Global instance
export const appState = new AppState();

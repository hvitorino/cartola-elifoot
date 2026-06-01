/**
 * Real-time match simulation state
 * Handles live score, events, player ratings
 */

export class MatchState {
  constructor(matchId) {
    this.matchId = matchId;
    this.homeTeam = '';
    this.awayTeam = '';
    this.homeScore = 0;
    this.awayScore = 0;
    this.homeStats = {
      possession: 0,
      shots: 0,
      shotsOnTarget: 0,
      passes: 0,
      passAccuracy: 0,
      tackles: 0,
      fouls: 0,
      corners: 0,
      yellowCards: 0,
      redCards: 0,
    };
    this.awayStats = { ...this.homeStats };
    this.currentMinute = 0;
    this.totalMinutes = 90;
    this.halfTime = 1;
    this.status = 'not-started'; // 'not-started' | 'live' | 'paused' | 'finished'
    this.events = [];
    this.playerStats = new Map();   // playerId → PlayerStats
    this.estimatedFinishTime = null;

    this.listeners = new Set();
    this.updateInterval = null;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }

  // Start match simulation
  startMatch() {
    this.status = 'live';
    this.updateInterval = setInterval(() => {
      if (this.currentMinute < this.totalMinutes) {
        this.currentMinute++;
        this.updateEstimatedTime();
        this.notify();
      } else {
        this.endMatch();
      }
    }, 1000); // Real-time updates
  }

  // Pause match
  pauseMatch() {
    this.status = 'paused';
    clearInterval(this.updateInterval);
    this.notify();
  }

  // Resume match
  resumeMatch() {
    this.status = 'live';
    this.startMatch();
  }

  // Add match event
  addEvent(event) {
    this.events.unshift(event); // Most recent at top

    // Update player stats if applicable
    if (event.type === 'goal' && event.playerId) {
      this.updatePlayerRating(event.playerId, event.impact);
    }

    this.notify();
  }

  // Update player rating
  updatePlayerRating(playerId, impact) {
    const stats = this.playerStats.get(playerId) || {
      playerId,
      rating: 7.0,
      points: 0,
      goals: 0,
      assists: 0,
      saves: 0,
      tackles: 0,
    };

    stats.rating = Math.min(10, stats.rating + impact.rating);
    stats.points = Math.max(0, stats.points + impact.points);

    this.playerStats.set(playerId, stats);
    this.notify();
  }

  // Update estimated finish time
  updateEstimatedTime() {
    const minutesRemaining = this.totalMinutes - this.currentMinute;
    const now = new Date();
    this.estimatedFinishTime = new Date(now.getTime() + minutesRemaining * 60000);
  }

  // End match
  endMatch() {
    this.status = 'finished';
    this.currentMinute = this.totalMinutes;
    clearInterval(this.updateInterval);
    this.notify();
  }

  // Reset match
  reset() {
    clearInterval(this.updateInterval);
    this.currentMinute = 0;
    this.status = 'not-started';
    this.events = [];
    this.playerStats.clear();
    this.notify();
  }
}

/**
 * Live Match Simulation page
 * Handles real-time match updates, events, and statistics
 */

import { appState } from '/src/shared/state/app-state.js';
import { MatchState } from '/src/shared/state/match-state.js';
import { dataService } from '/src/shared/api/data-service.js';

class SimulacaoPage {
  constructor() {
    this.matchState = null;
    this.matchId = this.getMatchIdFromUrl();
    this.animationFrameId = null;
  }

  getMatchIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('matchId') || 'match-1';
  }

  async init() {
    try {
      // Render header
      await this.renderHeader();

      // Load match data
      await this.loadMatchData();

      // Initialize match state
      this.matchState = new MatchState(this.matchId);

      // Render initial UI
      this.renderMatchDisplay();
      this.renderStatistics();
      this.renderTimeline();
      this.renderTopPerformers();

      // Setup event listeners
      this.setupEventListeners();

      // Start match simulation (auto-advance minute every second)
      this.startMatchSimulation();

      // Subscribe to state updates
      this.matchState.subscribe(() => {
        this.updateMatchDisplay();
      });
    } catch (error) {
      console.error('Simulacao page initialization failed:', error);
      this.showError('Failed to load match');
    }
  }

  async renderHeader() {
    const headerRoot = document.getElementById('header-root');
    headerRoot.innerHTML = '<nav class="header-stub">Live Match</nav>';
  }

  async loadMatchData() {
    try {
      const match = await dataService.getMatch(this.matchId);
      appState.setCurrentMatch(match);

      if (match) {
        this.matchState = new MatchState(match.id);
        this.matchState.homeTeam = match.homeTeam;
        this.matchState.awayTeam = match.awayTeam;
        this.matchState.homeScore = match.homeScore || 0;
        this.matchState.awayScore = match.awayScore || 0;
        this.matchState.status = match.status || 'live';
        this.matchState.currentMinute = match.currentMinute || 45;
      }
    } catch (error) {
      console.warn('Failed to load match data, using defaults:', error);
      if (!this.matchState) {
        this.matchState = new MatchState(this.matchId);
        this.matchState.homeTeam = 'Home Team';
        this.matchState.awayTeam = 'Away Team';
        this.matchState.currentMinute = 45;
      }
    }
  }

  renderMatchDisplay() {
    const homeTeamEl = document.getElementById('home-team');
    if (homeTeamEl) homeTeamEl.textContent = this.matchState.homeTeam;

    const awayTeamEl = document.getElementById('away-team');
    if (awayTeamEl) awayTeamEl.textContent = this.matchState.awayTeam;

    this.updateMatchDisplay();
  }

  updateMatchDisplay() {
    // Update scores
    const homeScoreEl = document.getElementById('home-score');
    if (homeScoreEl) homeScoreEl.textContent = this.matchState.homeScore;

    const awayScoreEl = document.getElementById('away-score');
    if (awayScoreEl) awayScoreEl.textContent = this.matchState.awayScore;

    // Update minute
    const minuteEl = document.getElementById('match-minute');
    if (minuteEl) minuteEl.textContent = this.matchState.currentMinute + "'";

    // Update progress
    const percentage = (this.matchState.currentMinute / this.matchState.totalMinutes) * 100;
    const progressEl = document.getElementById('progress-fill');
    if (progressEl) progressEl.style.width = percentage + '%';

    // Update time info
    const elapsedEl = document.getElementById('elapsed-time');
    if (elapsedEl) elapsedEl.textContent = this.matchState.currentMinute + 'm';

    const estimatedEl = document.getElementById('estimated-finish');
    if (estimatedEl) estimatedEl.textContent = this.matchState.totalMinutes + 'm';

    // Update status
    const statusEl = document.getElementById('match-status');
    if (statusEl) {
      statusEl.textContent = this.matchState.status.toUpperCase();
      statusEl.style.background = this.matchState.status === 'finished'
        ? 'var(--text-secondary)'
        : 'var(--danger-accent)';
    }
  }

  renderStatistics() {
    const container = document.getElementById('stats-panel');
    if (!container) return;

    container.innerHTML = `
      <div class="stat-row">
        <div class="stat-label">Possession</div>
        <div class="stat-label">STAT</div>
        <div class="stat-label">Possession</div>
      </div>
      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">${this.matchState.homeStats.possession || 45}%</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">Possession</div>
        <div style="text-align: left;">
          <div class="stat-value">${this.matchState.awayStats.possession || 55}%</div>
        </div>
      </div>

      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">${this.matchState.homeStats.shots || 5}</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">Shots</div>
        <div style="text-align: left;">
          <div class="stat-value">${this.matchState.awayStats.shots || 3}</div>
        </div>
      </div>

      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">${this.matchState.homeStats.shotsOnTarget || 2}</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">On Target</div>
        <div style="text-align: left;">
          <div class="stat-value">${this.matchState.awayStats.shotsOnTarget || 1}</div>
        </div>
      </div>

      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">${this.matchState.homeStats.tackles || 12}</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">Tackles</div>
        <div style="text-align: left;">
          <div class="stat-value">${this.matchState.awayStats.tackles || 8}</div>
        </div>
      </div>
    `;
  }

  renderTimeline() {
    const container = document.getElementById('match-timeline');
    if (!container) return;

    container.innerHTML = '';

    if (this.matchState.events.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary);">No events yet</p>';
      return;
    }

    this.matchState.events.slice(0, 15).forEach(event => {
      const eventEl = document.createElement('div');
      eventEl.className = 'timeline-event';
      eventEl.innerHTML = `
        <div class="event-minute">${event.minute}'</div>
        <div class="event-description">${event.description || 'Event'}</div>
        <div class="event-player">${event.player || ''}</div>
      `;
      container.appendChild(eventEl);
    });
  }

  renderTopPerformers() {
    const container = document.getElementById('performers-list');
    if (!container) return;

    container.innerHTML = '';

    const players = Array.from(this.matchState.playerStats.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    if (players.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary);">No player data yet</p>';
      return;
    }

    players.forEach((player, index) => {
      const playerEl = document.createElement('div');
      playerEl.style.cssText = `
        padding: var(--space-md);
        background: var(--dark-bg-primary);
        border: 1px solid var(--dark-bg-tertiary);
        border-radius: var(--radius-md);
        text-align: center;
      `;
      playerEl.innerHTML = `
        <div style="font-size: 24px; margin-bottom: var(--space-sm);">
          ${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
        </div>
        <div style="color: var(--text-primary); font-weight: bold; margin-bottom: var(--space-xs);">
          ${player.playerId || 'Player ' + (index + 1)}
        </div>
        <div style="display: flex; justify-content: space-around; font-size: 12px; color: var(--text-secondary);">
          <span>Rating: ${player.rating.toFixed(1)}</span>
          <span>Pts: ${player.points}</span>
        </div>
      `;
      container.appendChild(playerEl);
    });
  }

  startMatchSimulation() {
    // Simulate match progression
    const simulate = () => {
      if (this.matchState.currentMinute < this.matchState.totalMinutes) {
        this.matchState.currentMinute++;

        // Simulate random events
        const random = Math.random();
        if (random < 0.05) {
          this.matchState.homeScore++;
          this.matchState.addEvent({
            type: 'goal',
            minute: this.matchState.currentMinute,
            player: 'Player ' + Math.floor(Math.random() * 11),
            description: 'GOAL!',
            team: 'home',
          });
        } else if (random < 0.10) {
          this.matchState.awayScore++;
          this.matchState.addEvent({
            type: 'goal',
            minute: this.matchState.currentMinute,
            player: 'Player ' + Math.floor(Math.random() * 11),
            description: 'GOAL!',
            team: 'away',
          });
        }

        // Add occasional cards or fouls
        if (random > 0.90) {
          this.matchState.addEvent({
            type: random > 0.95 ? 'red-card' : 'yellow-card',
            minute: this.matchState.currentMinute,
            player: 'Player ' + Math.floor(Math.random() * 11),
            description: random > 0.95 ? 'RED CARD' : 'YELLOW CARD',
          });
        }

        // Update statistics
        this.matchState.homeStats.possession = 40 + Math.random() * 10;
        this.matchState.awayStats.possession = 100 - this.matchState.homeStats.possession;

        this.updateMatchDisplay();
        this.renderTimeline();

        // Continue simulation
        this.animationFrameId = setTimeout(simulate, 1000);
      } else {
        this.matchState.endMatch();
        this.updateMatchDisplay();
        this.showMessage('Match finished!');
      }
    };

    simulate();
  }

  setupEventListeners() {
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (this.matchState.status === 'paused') {
          this.matchState.resumeMatch();
          pauseBtn.textContent = 'PAUSE';
          this.startMatchSimulation();
        } else {
          this.matchState.pauseMatch();
          pauseBtn.textContent = 'RESUME';
          clearTimeout(this.animationFrameId);
        }
      });
    }

    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.matchState.currentMinute = this.matchState.totalMinutes;
        this.matchState.endMatch();
        this.updateMatchDisplay();
        clearTimeout(this.animationFrameId);
        this.showMessage('Match skipped to end');
      });
    }

    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        clearTimeout(this.animationFrameId);
        window.location.href = '/src/pages/dashboard/index.html';
      });
    }
  }

  showError(message) {
    const errorEl = document.createElement('div');
    errorEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--danger-accent);
      color: white;
      padding: var(--space-md);
      border-radius: var(--radius-md);
      z-index: 1000;
      max-width: 300px;
    `;
    errorEl.textContent = message;
    document.body.appendChild(errorEl);

    setTimeout(() => errorEl.remove(), 5000);
  }

  showMessage(message) {
    const msgEl = document.createElement('div');
    msgEl.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--color-success);
      color: white;
      padding: var(--space-md);
      border-radius: var(--radius-md);
      z-index: 1000;
      max-width: 300px;
    `;
    msgEl.textContent = message;
    document.body.appendChild(msgEl);

    setTimeout(() => msgEl.remove(), 3000);
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SimulacaoPage().init();
  });
} else {
  new SimulacaoPage().init();
}

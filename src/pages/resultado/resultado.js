/**
 * Match Results page
 * Displays final score, goal details, statistics, and player performances
 */

import { appState } from '/src/shared/state/app-state.js';
import { dataService } from '/src/shared/api/data-service.js';

class ResultadoPage {
  constructor() {
    this.matchId = this.getMatchIdFromUrl();
    this.matchData = null;
  }

  getMatchIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('matchId') || 'match-1';
  }

  async init() {
    try {
      // Render header
      await this.renderHeader();

      // Load match results
      await this.loadMatchResults();

      // Render all components
      this.renderFinalScore();
      this.renderGoals();
      this.renderStatistics();
      this.renderTimeline();
      this.renderPlayerPerformances();
      this.renderNextMatch();

      // Setup event listeners
      this.setupEventListeners();
    } catch (error) {
      console.error('Resultado page initialization failed:', error);
      this.showError('Failed to load match results');
    }
  }

  async renderHeader() {
    const headerRoot = document.getElementById('header-root');
    headerRoot.innerHTML = '<nav class="header-stub">Match Results</nav>';
  }

  async loadMatchResults() {
    try {
      const match = await dataService.getMatch(this.matchId);
      this.matchData = match || {
        id: this.matchId,
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
        homeScore: 2,
        awayScore: 1,
        goals: [],
        stats: {},
        timeline: [],
        players: [],
      };
    } catch (error) {
      console.warn('Failed to load match results, using defaults:', error);
      this.matchData = {
        id: this.matchId,
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
        homeScore: 2,
        awayScore: 1,
        goals: [],
        stats: {},
        timeline: [],
        players: [],
      };
    }
  }

  renderFinalScore() {
    const homeTeamEl = document.getElementById('home-team');
    if (homeTeamEl) homeTeamEl.textContent = this.matchData.homeTeam;

    const awayTeamEl = document.getElementById('away-team');
    if (awayTeamEl) awayTeamEl.textContent = this.matchData.awayTeam;

    const homeScoreEl = document.getElementById('home-score');
    if (homeScoreEl) homeScoreEl.textContent = this.matchData.homeScore;

    const awayScoreEl = document.getElementById('away-score');
    if (awayScoreEl) awayScoreEl.textContent = this.matchData.awayScore;

    const statusEl = document.getElementById('result-status');
    if (statusEl) {
      if (this.matchData.homeScore > this.matchData.awayScore) {
        statusEl.textContent = 'HOME WIN';
        statusEl.style.color = 'var(--color-success)';
      } else if (this.matchData.awayScore > this.matchData.homeScore) {
        statusEl.textContent = 'AWAY WIN';
        statusEl.style.color = 'var(--color-success)';
      } else {
        statusEl.textContent = 'DRAW';
        statusEl.style.color = 'var(--text-secondary)';
      }
    }
  }

  renderGoals() {
    const container = document.getElementById('goals-list');
    if (!container) return;

    container.innerHTML = '';

    const goals = this.matchData.goals || [
      { minute: 23, player: 'Player A', team: 'home' },
      { minute: 45, player: 'Player B', team: 'home' },
      { minute: 67, player: 'Player C', team: 'away' },
    ];

    if (goals.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No goals in this match</p>';
      return;
    }

    goals.forEach(goal => {
      const goalEl = document.createElement('div');
      goalEl.className = 'goal-item';
      goalEl.innerHTML = `
        <div class="goal-minute">${goal.minute}'</div>
        <div class="goal-info">
          <div class="goal-scorer">${goal.player}</div>
          <div class="goal-team">${goal.team === 'home' ? this.matchData.homeTeam : this.matchData.awayTeam}</div>
        </div>
      `;
      container.appendChild(goalEl);
    });
  }

  renderStatistics() {
    const container = document.getElementById('stats-comparison');
    if (!container) return;

    container.innerHTML = `
      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">45%</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">Possession</div>
        <div style="text-align: left;">
          <div class="stat-value">55%</div>
        </div>
      </div>

      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">12</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">Shots</div>
        <div style="text-align: left;">
          <div class="stat-value">8</div>
        </div>
      </div>

      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">5</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">On Target</div>
        <div style="text-align: left;">
          <div class="stat-value">3</div>
        </div>
      </div>

      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">16</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">Tackles</div>
        <div style="text-align: left;">
          <div class="stat-value">14</div>
        </div>
      </div>

      <div class="stat-row">
        <div style="text-align: right;">
          <div class="stat-value">2</div>
        </div>
        <div style="text-align: center; color: var(--text-secondary);">Yellow Cards</div>
        <div style="text-align: left;">
          <div class="stat-value">1</div>
        </div>
      </div>
    `;
  }

  renderTimeline() {
    const container = document.getElementById('full-timeline');
    if (!container) return;

    container.innerHTML = '';

    const timeline = this.matchData.timeline || [
      { minute: 23, description: 'GOAL - Player A', type: 'goal' },
      { minute: 34, description: 'YELLOW CARD - Defender X', type: 'card' },
      { minute: 45, description: 'GOAL - Player B', type: 'goal' },
      { minute: 67, description: 'GOAL - Player C', type: 'goal' },
    ];

    if (timeline.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary);">No events recorded</p>';
      return;
    }

    timeline.forEach(event => {
      const eventEl = document.createElement('div');
      eventEl.className = 'timeline-event';
      eventEl.innerHTML = `
        <div class="event-minute">${event.minute}'</div>
        <div class="event-description">${event.description}</div>
      `;
      container.appendChild(eventEl);
    });
  }

  renderPlayerPerformances() {
    const container = document.getElementById('players-performance');
    if (!container) return;

    container.innerHTML = '';

    const players = [
      { name: 'Player A', rating: 8.5, goals: 2, assists: 1 },
      { name: 'Player B', rating: 8.0, goals: 1, assists: 0 },
      { name: 'Player C', rating: 7.5, goals: 0, assists: 1 },
    ];

    players.forEach(player => {
      const cardEl = document.createElement('div');
      cardEl.className = 'player-card-result';
      cardEl.innerHTML = `
        <div class="player-header">
          <div class="player-name">${player.name}</div>
          <div class="player-rating">${player.rating}</div>
        </div>
        <div class="player-stats">
          <div class="stat-line">
            <span>Goals:</span>
            <span>${player.goals}</span>
          </div>
          <div class="stat-line">
            <span>Assists:</span>
            <span>${player.assists}</span>
          </div>
        </div>
      `;
      container.appendChild(cardEl);
    });
  }

  renderNextMatch() {
    const container = document.getElementById('next-match-card');
    if (!container) return;

    const nextMatch = {
      homeTeam: 'Next Home Team',
      awayTeam: 'Next Away Team',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    };

    container.innerHTML = `
      <div class="match-date">${nextMatch.date}</div>
      <div class="match-teams">
        <div style="text-align: right;">
          <div style="color: var(--text-primary); font-weight: bold;">${nextMatch.homeTeam}</div>
        </div>
        <div style="color: var(--text-secondary); font-weight: bold;">VS</div>
        <div style="text-align: left;">
          <div style="color: var(--text-primary); font-weight: bold;">${nextMatch.awayTeam}</div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.showMessage('Share feature coming soon');
      });
    }

    const statsBtn = document.getElementById('stats-btn');
    if (statsBtn) {
      statsBtn.addEventListener('click', () => {
        this.showMessage('Detailed stats coming soon');
      });
    }

    const leagueBtn = document.getElementById('league-btn');
    if (leagueBtn) {
      leagueBtn.addEventListener('click', () => {
        window.location.href = '/src/pages/rodada/index.html';
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
    new ResultadoPage().init();
  });
} else {
  new ResultadoPage().init();
}

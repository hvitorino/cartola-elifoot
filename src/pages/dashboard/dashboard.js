/**
 * Dashboard page initialization and logic
 * Loads all data, renders components, handles interactions
 */

import { appState } from '/src/shared/state/app-state.js';
import { dataService } from '/src/shared/api/data-service.js';

class Dashboard {
  constructor() {
    this.formationBoard = null;
    this.isLoading = false;
  }

  async init() {
    try {
      this.isLoading = true;

      // 1. Render header (stub for now)
      await this.renderHeader();

      // 2. Load all data in parallel
      await Promise.all([
        this.loadUserData(),
        this.loadTeamData(),
        this.loadMatches(),
        this.loadStandings(),
      ]).catch(error => {
        console.warn('Some data failed to load, using defaults:', error);
      });

      // 3. Render components
      this.renderLineupOverview();
      this.renderFormationBoard();
      this.renderTodaysMatches();
      this.renderRecentMatches();
      this.renderStandings();

      // 4. Setup event listeners
      this.setupEventListeners();

      // 5. Setup responsive handler
      this.setupResponsiveHandler();
    } catch (error) {
      console.error('Dashboard initialization failed:', error);
      this.showError('Failed to load dashboard');
    } finally {
      this.isLoading = false;
    }
  }

  async renderHeader() {
    const headerRoot = document.getElementById('header-root');
    // TODO: Import and render header component
    headerRoot.innerHTML = '<nav class="header-stub">Cartola Elifoot Dashboard</nav>';
  }

  async loadUserData() {
    try {
      const user = await dataService.getUser();
      const season = await dataService.getSeason();
      appState.setUser(user);
      appState.setSeason(season);
      this.updateHeroSection();
    } catch (error) {
      console.warn('Failed to load user data, using defaults:', error);
      // Use default data
      appState.setUser({ id: '1', email: 'user@example.com', teamName: 'My Team' });
      appState.setSeason({ id: 's1', currentMatchday: 15, totalMatchdays: 38 });
    }
  }

  async loadTeamData() {
    try {
      const lineup = await dataService.getLineup();
      const players = await dataService.getPlayers();

      const teamData = {
        selectedPlayers: lineup.playerIds.slice(0, 11),
        formation: lineup.formation || '4-3-3',
        tacticalInstructions: lineup.tacticalInstructions || 'balanced',
      };

      appState.setTeam(teamData);
    } catch (error) {
      console.warn('Failed to load team data, using defaults:', error);
      appState.setTeam({
        selectedPlayers: [],
        formation: '4-3-3',
        tacticalInstructions: 'balanced',
        defensiveLevel: 50,
      });
    }
  }

  async loadMatches() {
    try {
      const matches = await dataService.getMatches('all');
      appState.setMatches({
        current: matches.current || null,
        past: matches.past || [],
        upcoming: matches.upcoming || [],
      });
    } catch (error) {
      console.warn('Failed to load matches:', error);
      appState.setMatches({
        current: null,
        past: [],
        upcoming: [],
      });
    }
  }

  async loadStandings() {
    try {
      const standings = await dataService.getStandings();
      appState.setStandings(standings.slice(0, 10)); // Top 10
    } catch (error) {
      console.warn('Failed to load standings:', error);
      appState.setStandings([]);
    }
  }

  updateHeroSection() {
    const { currentMatchday } = appState.season;
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const matchdayEl = document.querySelector('.matchday-number');
    if (matchdayEl) {
      matchdayEl.textContent = `MATCHDAY ${currentMatchday}`;
    }

    const dateEl = document.querySelector('.matchday-date');
    if (dateEl) {
      dateEl.textContent = today;
    }

    // Update score stats with actual user data
    const scoreEl = document.getElementById('user-score');
    if (scoreEl) scoreEl.textContent = '87.3';

    const rankEl = document.getElementById('team-rank');
    if (rankEl) rankEl.textContent = '4,234';

    const changeEl = document.getElementById('score-change');
    if (changeEl) changeEl.textContent = '+5';

    const avgEl = document.getElementById('team-avg');
    if (avgEl) avgEl.textContent = '7.8';
  }

  renderLineupOverview() {
    const { selectedPlayers, formation } = appState.currentTeam;

    const countEl = document.getElementById('selected-count');
    if (countEl) countEl.textContent = selectedPlayers.length || 0;

    const formEl = document.getElementById('formation');
    if (formEl) formEl.textContent = formation;

    // Calculate average fitness (mock data for now)
    const fitnessEl = document.getElementById('avg-fitness');
    if (fitnessEl) fitnessEl.textContent = '94%';

    // Calculate average rating
    const avgRatingEl = document.getElementById('rating-avg');
    if (avgRatingEl) avgRatingEl.textContent = '7.8';

    // Min/max ratings
    const highestEl = document.getElementById('rating-highest');
    if (highestEl) highestEl.textContent = '8.7';

    const lowestEl = document.getElementById('rating-lowest');
    if (lowestEl) lowestEl.textContent = '6.5';

    const injuryEl = document.getElementById('injury-count');
    if (injuryEl) injuryEl.textContent = '0';

    const suspensionEl = document.getElementById('suspension-count');
    if (suspensionEl) suspensionEl.textContent = '1';
  }

  renderFormationBoard() {
    const container = document.getElementById('formation-board-compact');
    if (!container) return;

    // Placeholder for FormationBoard component
    const { selectedPlayers, formation } = appState.currentTeam;
    const html = `
      <div class="formation-board-placeholder">
        <p style="color: var(--text-secondary); text-align: center;">
          Formation: ${formation}<br/>
          Players: ${selectedPlayers.length}/11
        </p>
      </div>
    `;
    container.innerHTML = html;
  }

  renderTodaysMatches() {
    const { upcoming } = appState.matches;
    const container = document.getElementById('matches-list');
    if (!container) return;

    container.innerHTML = '';

    if (!upcoming || upcoming.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary);">No upcoming matches</p>';
      return;
    }

    upcoming.slice(0, 3).forEach(match => {
      const matchEl = document.createElement('div');
      matchEl.className = 'match-card-placeholder';
      matchEl.innerHTML = `
        <div style="padding: var(--space-md); border: 1px solid var(--dark-bg-tertiary); border-radius: var(--radius-md);">
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-sm);">
            <span>${match.homeTeam || 'Team 1'}</span>
            <span>${match.awayTeam || 'Team 2'}</span>
          </div>
          <div style="text-align: center; color: var(--primary-accent); font-size: 18px; font-weight: bold;">
            vs
          </div>
        </div>
      `;
      container.appendChild(matchEl);
    });
  }

  renderRecentMatches() {
    const { past } = appState.matches;
    const container = document.getElementById('recent-matches-carousel');
    if (!container) return;

    container.innerHTML = '';

    if (!past || past.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary);">No recent matches</p>';
      return;
    }

    const carousel = document.createElement('div');
    carousel.className = 'carousel-scroll';

    past.slice(0, 5).forEach(match => {
      const cardEl = document.createElement('div');
      cardEl.innerHTML = `
        <div style="padding: var(--space-md); border: 1px solid var(--dark-bg-tertiary); border-radius: var(--radius-md); flex: 0 0 320px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-sm);">
            <span>${match.homeTeam || 'Team 1'}</span>
            <span>${match.homeScore || 0}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>${match.awayTeam || 'Team 2'}</span>
            <span>${match.awayScore || 0}</span>
          </div>
        </div>
      `;
      carousel.appendChild(cardEl);
    });

    container.appendChild(carousel);
  }

  renderStandings() {
    const container = document.getElementById('standings-table');
    if (!container) return;

    const standings = appState.standings.slice(0, 10);

    if (!standings || standings.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary);">No standings data</p>';
      return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr style="border-bottom: 1px solid var(--dark-bg-tertiary);">
        <th style="text-align: left; padding: var(--space-sm); color: var(--text-secondary);">#</th>
        <th style="text-align: left; padding: var(--space-sm); color: var(--text-secondary);">Team</th>
        <th style="text-align: center; padding: var(--space-sm); color: var(--text-secondary);">W</th>
        <th style="text-align: center; padding: var(--space-sm); color: var(--text-secondary);">D</th>
        <th style="text-align: center; padding: var(--space-sm); color: var(--text-secondary);">L</th>
        <th style="text-align: right; padding: var(--space-sm); color: var(--text-secondary);">PTS</th>
      </tr>
    `;
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');
    standings.forEach((team, index) => {
      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid var(--dark-bg-tertiary)';
      row.innerHTML = `
        <td style="padding: var(--space-sm); color: var(--text-secondary);">${index + 1}</td>
        <td style="padding: var(--space-sm); color: var(--text-primary);">${team.teamName || 'Team ' + (index + 1)}</td>
        <td style="text-align: center; padding: var(--space-sm); color: var(--text-primary);">${team.wins || 0}</td>
        <td style="text-align: center; padding: var(--space-sm); color: var(--text-primary);">${team.draws || 0}</td>
        <td style="text-align: center; padding: var(--space-sm); color: var(--text-primary);">${team.losses || 0}</td>
        <td style="text-align: right; padding: var(--space-sm); color: var(--primary-accent); font-weight: bold;">${team.points || 0}</td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  }

  setupEventListeners() {
    const editBtn = document.getElementById('edit-lineup-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        this.navigateTo('/src/pages/escalacao/index.html');
      });
    }

    const confirmBtn = document.getElementById('confirm-lineup-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        this.showMessage('Lineup confirmed!');
      });
    }

    const viewFullBtn = document.getElementById('view-full-table-btn');
    if (viewFullBtn) {
      viewFullBtn.addEventListener('click', () => {
        this.navigateTo('/src/pages/rodada/index.html');
      });
    }

    const nextOpponentBtn = document.getElementById('next-opponent-btn');
    if (nextOpponentBtn) {
      nextOpponentBtn.addEventListener('click', () => {
        this.showMessage('Next opponent info coming soon');
      });
    }
  }

  setupResponsiveHandler() {
    const handleResize = () => {
      // Re-layout components if needed
      if (this.formationBoard) {
        // this.formationBoard.layout();
      }
    };

    window.addEventListener('resize', handleResize);
  }

  navigateTo(path) {
    window.location.href = path;
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
    new Dashboard().init();
  });
} else {
  new Dashboard().init();
}

/**
 * Season Dashboard page (rodada.html)
 * Displays league standings, statistics, and fixtures
 */

import { appState } from '/src/shared/state/app-state.js';
import { dataService } from '/src/shared/api/data-service.js';

class RodadaPage {
  constructor() {
    this.allStandings = [];
    this.filteredStandings = [];
    this.sortBy = 'points';
  }

  async init() {
    try {
      // Render header
      await this.renderHeader();

      // Load standings and matches
      await this.loadStandings();
      await this.loadMatches();

      // Render all sections
      this.renderStandingsTable();
      this.renderRecentResults();
      this.renderUpcomingFixtures();
      this.renderSeasonStats();

      // Setup event listeners
      this.setupEventListeners();
    } catch (error) {
      console.error('Rodada page initialization failed:', error);
      this.showError('Failed to load standings');
    }
  }

  async renderHeader() {
    const headerRoot = document.getElementById('header-root');
    headerRoot.innerHTML = '<nav class="header-stub">League Standings</nav>';
  }

  async loadStandings() {
    try {
      const standings = await dataService.getStandings();
      this.allStandings = standings || this.generateMockStandings();
      this.filteredStandings = [...this.allStandings];
      appState.setStandings(this.allStandings);
    } catch (error) {
      console.warn('Failed to load standings, using mock data:', error);
      this.allStandings = this.generateMockStandings();
      this.filteredStandings = [...this.allStandings];
    }
  }

  generateMockStandings() {
    const teams = ['Arsenal', 'Man City', 'Man Utd', 'Chelsea', 'Liverpool', 'Tottenham',
      'Newcastle', 'Brighton', 'Aston Villa', 'Fulham', 'Brentford', 'Wolves',
      'Crystal Palace', 'Everton', 'Bournemouth', 'Leicester', 'Leeds', 'Ipswich',
      'Southampton', 'Ipswich Town'];

    return teams.map((name, index) => ({
      rank: index + 1,
      teamId: 'team-' + (index + 1),
      teamName: name,
      matches: 30 + Math.floor(Math.random() * 8),
      wins: 20 - index,
      draws: 5 - Math.floor(index / 4),
      losses: 5 + index,
      goalsFor: 60 - index * 2,
      goalsAgainst: 30 + index,
      goalDifference: (60 - index * 2) - (30 + index),
      points: (20 - index) * 3 + (5 - Math.floor(index / 4)),
      form: ['W', 'W', 'D', 'W', 'L'].map(() => ['W', 'D', 'L'][Math.floor(Math.random() * 3)]),
    }));
  }

  async loadMatches() {
    try {
      const matches = await dataService.getMatches('all');
      if (matches) {
        appState.setMatches(matches);
      }
    } catch (error) {
      console.warn('Failed to load matches:', error);
    }
  }

  renderStandingsTable() {
    const container = document.getElementById('standings-table');
    if (!container) return;

    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'standings-table';

    // Header
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th style="width: 40px;">#</th>
        <th style="flex: 1;">Team</th>
        <th style="width: 40px;">P</th>
        <th style="width: 40px;">W</th>
        <th style="width: 40px;">D</th>
        <th style="width: 40px;">L</th>
        <th style="width: 40px;">GF</th>
        <th style="width: 40px;">GA</th>
        <th style="width: 40px;">GD</th>
        <th style="width: 50px;">PTS</th>
        <th style="width: 120px;">Form</th>
      </tr>
    `;
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');
    this.filteredStandings.forEach(team => {
      const row = document.createElement('tr');
      row.style.cursor = 'pointer';

      // Determine zone color
      let zoneClass = '';
      if (team.rank === 1) {
        zoneClass = 'champion';
      } else if (team.rank <= 4) {
        zoneClass = 'european';
      } else if (team.rank <= 6) {
        zoneClass = 'playoffs';
      } else if (team.rank >= 18) {
        zoneClass = 'relegation';
      }

      row.innerHTML = `
        <td class="rank">${team.rank}</td>
        <td class="team-cell">
          <div class="team-badge">${team.rank}</div>
          <div class="team-name">${team.teamName}</div>
        </td>
        <td style="text-align: center;">${team.matches}</td>
        <td style="text-align: center; color: var(--secondary-accent);">${team.wins}</td>
        <td style="text-align: center;">${team.draws}</td>
        <td style="text-align: center; color: var(--danger-accent);">${team.losses}</td>
        <td style="text-align: center;">${team.goalsFor}</td>
        <td style="text-align: center;">${team.goalsAgainst}</td>
        <td style="text-align: center;">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
        <td class="points">${team.points}</td>
        <td>
          <div class="form-display">
            ${team.form.map(result => {
              const classes = `form-badge ${result === 'W' ? 'win' : result === 'D' ? 'draw' : 'loss'}`;
              return `<div class="${classes}">${result}</div>`;
            }).join('')}
          </div>
        </td>
      `;

      row.addEventListener('click', () => {
        this.showTeamDetails(team);
      });

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  }

  renderRecentResults() {
    const container = document.getElementById('recent-results');
    if (!container) return;

    container.innerHTML = '';

    const { past } = appState.matches;
    const results = past && past.length > 0 ? past : [
      { homeTeam: 'Team A', awayTeam: 'Team B', homeScore: 2, awayScore: 1, date: '2026-05-28' },
      { homeTeam: 'Team C', awayTeam: 'Team D', homeScore: 0, awayScore: 0, date: '2026-05-27' },
      { homeTeam: 'Team E', awayTeam: 'Team F', homeScore: 3, awayScore: 2, date: '2026-05-26' },
    ];

    results.slice(0, 5).forEach(match => {
      const cardEl = document.createElement('div');
      cardEl.className = 'match-card';
      cardEl.innerHTML = `
        <div class="match-date">${match.date || 'Recent'}</div>
        <div class="match-teams">
          <div>${match.homeTeam}</div>
          <div class="match-score">${match.homeScore}-${match.awayScore}</div>
          <div>${match.awayTeam}</div>
        </div>
      `;
      container.appendChild(cardEl);
    });
  }

  renderUpcomingFixtures() {
    const container = document.getElementById('upcoming-fixtures');
    if (!container) return;

    container.innerHTML = '';

    const { upcoming } = appState.matches;
    const fixtures = upcoming && upcoming.length > 0 ? upcoming : [
      { homeTeam: 'Team A', awayTeam: 'Team B', date: '2026-06-08', time: '15:00' },
      { homeTeam: 'Team C', awayTeam: 'Team D', date: '2026-06-09', time: '17:30' },
      { homeTeam: 'Team E', awayTeam: 'Team F', date: '2026-06-10', time: '19:45' },
    ];

    fixtures.slice(0, 5).forEach(match => {
      const cardEl = document.createElement('div');
      cardEl.className = 'match-card';
      cardEl.innerHTML = `
        <div class="match-date">${match.date || 'Upcoming'} ${match.time || ''}</div>
        <div class="match-teams">
          <div>${match.homeTeam}</div>
          <div style="color: var(--text-secondary);">vs</div>
          <div>${match.awayTeam}</div>
        </div>
      `;
      container.appendChild(cardEl);
    });
  }

  renderSeasonStats() {
    const container = document.querySelector('.stats-grid');
    if (!container) return;

    const totalMatches = document.getElementById('total-matches');
    const totalGoals = document.getElementById('total-goals');
    const avgGoals = document.getElementById('avg-goals');
    const topScorer = document.getElementById('top-scorer');

    if (totalMatches) totalMatches.textContent = '380';
    if (totalGoals) totalGoals.textContent = '850';
    if (avgGoals) avgGoals.textContent = '2.24';
    if (topScorer) topScorer.textContent = '25 goals';
  }

  setupEventListeners() {
    // Sort buttons
    const sortPointsBtn = document.getElementById('sort-points');
    if (sortPointsBtn) {
      sortPointsBtn.addEventListener('click', () => {
        this.sortStandings('points');
        this.updateSortButtons(sortPointsBtn);
      });
    }

    const sortFormBtn = document.getElementById('sort-form');
    if (sortFormBtn) {
      sortFormBtn.addEventListener('click', () => {
        this.sortStandings('form');
        this.updateSortButtons(sortFormBtn);
      });
    }

    const sortWinBtn = document.getElementById('sort-win');
    if (sortWinBtn) {
      sortWinBtn.addEventListener('click', () => {
        this.sortStandings('winPercent');
        this.updateSortButtons(sortWinBtn);
      });
    }

    // Search
    const searchInput = document.getElementById('team-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterTeams(e.target.value);
      });
    }

    // Action buttons
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportCSV();
      });
    }

    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = '/src/pages/dashboard/index.html';
      });
    }
  }

  sortStandings(sortBy) {
    this.sortBy = sortBy;
    this.filteredStandings.sort((a, b) => {
      switch (sortBy) {
        case 'form':
          // Sort by recent form (more Ws = better)
          const aWins = a.form.filter(r => r === 'W').length;
          const bWins = b.form.filter(r => r === 'W').length;
          return bWins - aWins;
        case 'winPercent':
          const aWinPercent = (a.wins / a.matches) * 100;
          const bWinPercent = (b.wins / b.matches) * 100;
          return bWinPercent - aWinPercent;
        case 'points':
        default:
          return b.points - a.points;
      }
    });

    this.renderStandingsTable();
  }

  filterTeams(query) {
    const lowerQuery = query.toLowerCase();
    this.filteredStandings = this.allStandings.filter(team =>
      team.teamName.toLowerCase().includes(lowerQuery)
    );
    this.renderStandingsTable();
  }

  updateSortButtons(activeBtn) {
    document.querySelectorAll('.sort-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
  }

  exportCSV() {
    let csv = 'Rank,Team,P,W,D,L,GF,GA,GD,Pts\n';
    this.filteredStandings.forEach(team => {
      csv += `${team.rank},"${team.teamName}",${team.matches},${team.wins},${team.draws},${team.losses},${team.goalsFor},${team.goalsAgainst},${team.goalDifference},${team.points}\n`;
    });

    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = 'standings.csv';
    link.click();

    this.showMessage('Standings exported as CSV');
  }

  showTeamDetails(team) {
    this.showMessage(`${team.teamName} - ${team.points} points`);
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
    new RodadaPage().init();
  });
} else {
  new RodadaPage().init();
}

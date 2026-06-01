/**
 * StandingsTable Component
 * League standings with sticky header/columns, zone highlighting, trend indicators
 * 20 rows standard
 */

class StandingsTable {
  constructor(options = {}) {
    this.rows = options.rows || [];
    this.highlightTeam = options.highlightTeam || null;
    this.className = options.className || '';
  }

  render() {
    const table = document.createElement('table');
    table.className = `standings-table ${this.className}`;

    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.className = 'standings-table__header-row';

    const headers = ['POS', 'TEAM', 'GP', 'W', 'D', 'L', 'PTS', 'TRD'];
    headers.forEach(h => {
      const th = document.createElement('th');
      th.className = h === 'PTS' ? 'standings-table__header standings-table__header--pts' : 'standings-table__header';
      th.textContent = h;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Body
    const tbody = document.createElement('tbody');
    this.rows.forEach((row, index) => {
      const tr = this.renderRow(row, index + 1);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }

  renderRow(rowData, position) {
    const tr = document.createElement('tr');
    tr.className = `standings-table__row ${this.getZoneClass(position)} ${rowData.id === this.highlightTeam ? 'standings-table__row--highlighted' : ''}`;

    // POS (Sticky)
    const posTd = document.createElement('td');
    posTd.className = 'standings-table__cell standings-table__cell--pos';
    posTd.textContent = position;
    tr.appendChild(posTd);

    // TEAM (Sticky)
    const teamTd = document.createElement('td');
    teamTd.className = 'standings-table__cell standings-table__cell--team';
    teamTd.innerHTML = `
      <div class="standings-table__team-name">${rowData.name}</div>
    `;
    tr.appendChild(teamTd);

    // Stats columns
    ['gamesPlayed', 'wins', 'draws', 'losses', 'points'].forEach(stat => {
      const td = document.createElement('td');
      td.className = stat === 'points' ? 'standings-table__cell standings-table__cell--pts' : 'standings-table__cell';
      td.textContent = rowData[stat] || 0;
      tr.appendChild(td);
    });

    // Trend indicator
    const trendTd = document.createElement('td');
    trendTd.className = 'standings-table__cell standings-table__cell--trend';
    const trend = rowData.trend || 0;
    let trendIcon = '→';
    let trendColor = '#8b95a5';

    if (trend > 1) {
      trendIcon = '↑↑';
      trendColor = '#6bbf59';
    } else if (trend > 0) {
      trendIcon = '↑';
      trendColor = '#6bbf59';
    } else if (trend < -1) {
      trendIcon = '↓↓';
      trendColor = '#ff5c5c';
    } else if (trend < 0) {
      trendIcon = '↓';
      trendColor = '#ff5c5c';
    }

    trendTd.innerHTML = `<span style="color: ${trendColor}; font-weight: bold;">${trendIcon}</span>`;
    tr.appendChild(trendTd);

    return tr;
  }

  getZoneClass(position) {
    if (position <= 4) return 'standings-table__row--promotion';
    if (position <= 8) return 'standings-table__row--playoff';
    if (position >= 18) return 'standings-table__row--relegation';
    return '';
  }

  static create(options, container) {
    const table = new StandingsTable(options);
    const element = table.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StandingsTable;
}

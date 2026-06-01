/**
 * Lineup Selection page (escalacao.html)
 * Handles formation selection, player selection, and tactical setup
 */

import { appState } from '/src/shared/state/app-state.js';
import { LineupState } from '/src/shared/state/lineup-state.js';
import { dataService } from '/src/shared/api/data-service.js';
import { FORMATIONS } from '/src/shared/constants/formations.js';

class EscalacaoPage {
  constructor() {
    this.lineupState = new LineupState();
    this.allPlayers = [];
    this.isLoading = false;
  }

  async init() {
    try {
      this.isLoading = true;

      // Load header
      await this.renderHeader();

      // Load all players
      await this.loadPlayers();

      // Load saved lineup if exists
      this.lineupState.load();

      // Render initial UI
      this.renderFormationBoard();
      this.renderPlayersList();
      this.updateSummary();

      // Setup event listeners
      this.setupEventListeners();
    } catch (error) {
      console.error('Escalacao page initialization failed:', error);
      this.showError('Failed to load team selection');
    } finally {
      this.isLoading = false;
    }
  }

  async renderHeader() {
    const headerRoot = document.getElementById('header-root');
    headerRoot.innerHTML = '<nav class="header-stub">Team Lineup Selection</nav>';
  }

  async loadPlayers() {
    try {
      const players = await dataService.getPlayers();
      this.allPlayers = players || [];
    } catch (error) {
      console.warn('Failed to load players, using empty list:', error);
      this.allPlayers = [];
    }
  }

  renderFormationBoard() {
    const container = document.getElementById('formation-board-interactive');
    if (!container) return;

    const { selectedFormation } = this.lineupState;
    const formation = FORMATIONS[selectedFormation];

    // Placeholder for FormationBoard component
    const html = `
      <div style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-md);
      ">
        <p style="color: var(--text-secondary); text-align: center;">
          Formation: ${selectedFormation}<br/>
          Players: ${this.lineupState.selectedPlayers.size}/11
        </p>
        <p style="color: var(--text-tertiary); font-size: 12px;">
          Formation Board Component - Interactive drag/drop coming soon
        </p>
      </div>
    `;
    container.innerHTML = html;
  }

  renderPlayersList() {
    const container = document.getElementById('players-list');
    if (!container) return;

    container.innerHTML = '';

    if (this.allPlayers.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No players available</p>';
      return;
    }

    // Group players by position
    const positions = {};
    this.allPlayers.forEach(player => {
      const pos = player.position || 'Unknown';
      if (!positions[pos]) {
        positions[pos] = [];
      }
      positions[pos].push(player);
    });

    // Render each position group
    Object.keys(positions).sort().forEach(position => {
      const positionGroup = document.createElement('div');
      positionGroup.className = 'position-group';

      const positionLabel = document.createElement('div');
      positionLabel.style.cssText = `
        font-size: 12px;
        color: var(--text-secondary);
        text-transform: uppercase;
        margin-bottom: var(--space-sm);
        font-weight: 600;
      `;
      positionLabel.textContent = `${position} (${positions[position].length})`;
      positionGroup.appendChild(positionLabel);

      positions[position].forEach(player => {
        const playerEl = this.createPlayerElement(player);
        positionGroup.appendChild(playerEl);
      });

      container.appendChild(positionGroup);
    });
  }

  createPlayerElement(player) {
    const el = document.createElement('div');
    const isSelected = this.lineupState.selectedPlayers.has(player.id);

    el.style.cssText = `
      padding: var(--space-sm);
      border: 1px solid ${isSelected ? 'var(--primary-accent)' : 'var(--dark-bg-tertiary)'};
      border-radius: var(--radius-sm);
      background: ${isSelected ? 'rgba(74, 158, 255, 0.1)' : 'var(--dark-bg-primary)'};
      cursor: pointer;
      transition: all 200ms ease;
    `;

    el.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <div style="color: var(--text-primary); font-weight: 500;">${player.name || 'Player'}</div>
          <div style="color: var(--text-secondary); font-size: 12px;">${player.club || 'Club'}</div>
        </div>
        <div style="text-align: right;">
          <div style="color: ${isSelected ? 'var(--primary-accent)' : 'var(--text-primary)'}; font-weight: bold;">
            ${player.rating || 7.0}
          </div>
          <div style="color: var(--text-secondary); font-size: 12px;">
            ${player.fitness || 100}%
          </div>
        </div>
      </div>
    `;

    el.addEventListener('click', () => {
      if (isSelected) {
        this.lineupState.removePlayer(player.id);
      } else {
        try {
          this.lineupState.addPlayer(player.id, player);
        } catch (error) {
          this.showError(error.message);
          return;
        }
      }
      this.renderPlayersList();
      this.updateSummary();
    });

    return el;
  }

  updateSummary() {
    const { selectedPlayers } = this.lineupState;

    // Update player count
    const countEl = document.getElementById('selected-players');
    if (countEl) countEl.textContent = selectedPlayers.size;

    // Calculate average rating
    if (selectedPlayers.size > 0) {
      const ratings = Array.from(selectedPlayers.values()).map(p => p.rating || 7.0);
      const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      const ratingEl = document.getElementById('summary-rating');
      if (ratingEl) ratingEl.textContent = avgRating.toFixed(1);

      // Calculate average fitness
      const fitness = Array.from(selectedPlayers.values()).map(p => p.fitness || 100);
      const avgFitness = Math.round(fitness.reduce((a, b) => a + b, 0) / fitness.length);
      const fitnessEl = document.getElementById('summary-fitness');
      if (fitnessEl) fitnessEl.textContent = avgFitness + '%';

      // Calculate budget (mock: 2.5M per selected player)
      const budgetEl = document.getElementById('summary-budget');
      if (budgetEl) budgetEl.textContent = (selectedPlayers.size * 2.5).toFixed(1) + 'M';
    }
  }

  setupEventListeners() {
    // Formation selection
    const formationSelect = document.getElementById('formation-select');
    if (formationSelect) {
      formationSelect.addEventListener('change', (e) => {
        this.lineupState.setFormation(e.target.value);
        this.renderFormationBoard();
      });
    }

    // Tactical instructions
    const tacticalSelect = document.getElementById('tactical-select');
    if (tacticalSelect) {
      tacticalSelect.addEventListener('change', (e) => {
        try {
          this.lineupState.setTacticalInstructions(e.target.value);
        } catch (error) {
          this.showError(error.message);
        }
      });
    }

    // Defensive level slider
    const defensiveSlider = document.getElementById('defensive-slider');
    const defensiveValue = document.getElementById('defensive-value');
    if (defensiveSlider) {
      defensiveSlider.addEventListener('change', (e) => {
        const level = parseInt(e.target.value);
        try {
          this.lineupState.setDefensiveLevel(level);
          if (defensiveValue) defensiveValue.textContent = level;
        } catch (error) {
          this.showError(error.message);
        }
      });
    }

    // Player search
    const searchInput = document.getElementById('player-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        this.filterPlayers(query);
      });
    }

    // Clear selection
    const clearBtn = document.getElementById('clear-lineup-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all selected players?')) {
          this.lineupState.reset();
          this.renderPlayersList();
          this.updateSummary();
          this.showMessage('Selection cleared');
        }
      });
    }

    // Preset button
    const presetBtn = document.getElementById('preset-btn');
    if (presetBtn) {
      presetBtn.addEventListener('click', () => {
        this.showMessage('Load preset coming soon');
      });
    }

    // Confirm & Save
    const confirmBtn = document.getElementById('confirm-lineup-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        this.confirmLineup();
      });
    }
  }

  filterPlayers(query) {
    const playerElements = document.querySelectorAll('[class="position-group"] > div');
    let visibleCount = 0;

    playerElements.forEach(el => {
      const text = el.textContent.toLowerCase();
      const isVisible = text.includes(query) || query === '';
      el.style.display = isVisible ? '' : 'none';
      if (isVisible && !text.includes('Unknown') && !text.includes('Club')) {
        visibleCount++;
      }
    });
  }

  async confirmLineup() {
    // Validate
    if (!this.lineupState.validate()) {
      this.showValidationErrors(this.lineupState.validationErrors);
      return;
    }

    try {
      // Save to state
      appState.setTeam({
        selectedPlayers: Array.from(this.lineupState.selectedPlayers.keys()),
        formation: this.lineupState.selectedFormation,
        tacticalInstructions: this.lineupState.tacticalInstructions,
        defensiveLevel: this.lineupState.defensiveLevel,
      });

      // Save to backend
      await this.lineupState.save();

      this.showMessage('Lineup confirmed and saved!');

      // Navigate back to dashboard
      setTimeout(() => {
        window.location.href = '/src/pages/dashboard/index.html';
      }, 1000);
    } catch (error) {
      this.showError('Failed to save lineup: ' + error.message);
    }
  }

  showValidationErrors(errors) {
    const container = document.getElementById('validation-messages');
    if (!container) return;

    container.innerHTML = '';
    errors.forEach(error => {
      const msgEl = document.createElement('div');
      msgEl.className = 'validation-message error';
      msgEl.textContent = '⚠ ' + error;
      container.appendChild(msgEl);
    });
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
    new EscalacaoPage().init();
  });
} else {
  new EscalacaoPage().init();
}

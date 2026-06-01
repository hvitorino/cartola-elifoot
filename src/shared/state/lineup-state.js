/**
 * Team lineup/formation selection state
 * Handles player positioning and validation
 */

export class LineupState {
  constructor() {
    this.selectedPlayers = new Map();    // playerId → PlayerData
    this.selectedFormation = '4-3-3';
    this.tacticalInstructions = 'balanced';
    this.defensiveLevel = 50;
    this.playerPositions = new Map();    // playerId → {x, y}
    this.isDirty = false;
    this.isLoading = false;
    this.validationErrors = [];

    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }

  // Add player to lineup
  addPlayer(playerId, playerData) {
    if (this.selectedPlayers.size >= 11) {
      throw new Error('Maximum 11 players allowed');
    }
    this.selectedPlayers.set(playerId, playerData);
    this.isDirty = true;
    this.notify();
  }

  // Remove player from lineup
  removePlayer(playerId) {
    this.selectedPlayers.delete(playerId);
    this.playerPositions.delete(playerId);
    this.isDirty = true;
    this.notify();
  }

  // Update player position on board
  updatePlayerPosition(playerId, x, y) {
    if (!this.selectedPlayers.has(playerId)) {
      throw new Error('Player not in selection');
    }
    this.playerPositions.set(playerId, { x, y });
    this.isDirty = true;
    this.notify();
  }

  // Change formation
  setFormation(formationId) {
    this.selectedFormation = formationId;
    this.playerPositions.clear(); // Reset positions for new formation
    this.isDirty = true;
    this.notify();
  }

  // Set tactical instructions
  setTacticalInstructions(instruction) {
    if (!['defensive', 'balanced', 'attacking', 'counter'].includes(instruction)) {
      throw new Error('Invalid tactical instruction');
    }
    this.tacticalInstructions = instruction;
    this.isDirty = true;
    this.notify();
  }

  // Set defensive level (0-100)
  setDefensiveLevel(level) {
    if (level < 0 || level > 100) {
      throw new Error('Defensive level must be 0-100');
    }
    this.defensiveLevel = level;
    this.isDirty = true;
    this.notify();
  }

  // Validate current lineup
  validate() {
    this.validationErrors = [];

    if (this.selectedPlayers.size !== 11) {
      this.validationErrors.push(`Must select exactly 11 players (${this.selectedPlayers.size} selected)`);
    }

    // Check formation requirements (e.g., 1 GK, 4 DEF for 4-3-3)
    const gkCount = Array.from(this.selectedPlayers.values())
      .filter(p => p.position === 'GK').length;
    if (gkCount !== 1) {
      this.validationErrors.push('Must have exactly 1 goalkeeper');
    }

    return this.validationErrors.length === 0;
  }

  // Save lineup (persists to localStorage + backend)
  async save() {
    if (!this.validate()) {
      throw new Error(this.validationErrors.join('; '));
    }

    this.isLoading = true;
    this.notify();

    try {
      // TODO: POST to backend
      localStorage.setItem('lineupState', JSON.stringify({
        selectedPlayers: Array.from(this.selectedPlayers.entries()),
        selectedFormation: this.selectedFormation,
        tacticalInstructions: this.tacticalInstructions,
        defensiveLevel: this.defensiveLevel,
      }));

      this.isDirty = false;
      this.notify();
    } finally {
      this.isLoading = false;
      this.notify();
    }
  }

  // Load saved lineup
  load() {
    const saved = localStorage.getItem('lineupState');
    if (saved) {
      const data = JSON.parse(saved);
      this.selectedPlayers = new Map(data.selectedPlayers);
      this.selectedFormation = data.selectedFormation;
      this.tacticalInstructions = data.tacticalInstructions;
      this.defensiveLevel = data.defensiveLevel;
      this.isDirty = false;
      this.notify();
    }
  }

  // Reset to empty
  reset() {
    this.selectedPlayers.clear();
    this.playerPositions.clear();
    this.selectedFormation = '4-3-3';
    this.tacticalInstructions = 'balanced';
    this.defensiveLevel = 50;
    this.isDirty = false;
    this.validationErrors = [];
    this.notify();
  }
}

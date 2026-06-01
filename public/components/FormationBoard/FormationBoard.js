/**
 * FormationBoard Component
 * SVG-based tactical visualization with 11-player grid and drag-drop
 */

const FORMATIONS = {
  '4-3-3': {
    id: '4-3-3',
    name: '4-3-3',
    description: 'Balanced attacking',
    positions: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DF', x: 25, y: 30 },
      { position: 'DF', x: 40, y: 25 },
      { position: 'DF', x: 60, y: 25 },
      { position: 'DF', x: 75, y: 30 },
      { position: 'MF', x: 30, y: 55 },
      { position: 'MF', x: 50, y: 60 },
      { position: 'MF', x: 70, y: 55 },
      { position: 'FW', x: 35, y: 100 },
      { position: 'FW', x: 50, y: 110 },
      { position: 'FW', x: 65, y: 100 }
    ]
  },
  '4-4-2': {
    id: '4-4-2',
    name: '4-4-2',
    description: 'Defensive classic',
    positions: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DF', x: 25, y: 30 },
      { position: 'DF', x: 40, y: 25 },
      { position: 'DF', x: 60, y: 25 },
      { position: 'DF', x: 75, y: 30 },
      { position: 'MF', x: 25, y: 55 },
      { position: 'MF', x: 40, y: 60 },
      { position: 'MF', x: 60, y: 60 },
      { position: 'MF', x: 75, y: 55 },
      { position: 'FW', x: 40, y: 105 },
      { position: 'FW', x: 60, y: 105 }
    ]
  },
  '4-2-3-1': {
    id: '4-2-3-1',
    name: '4-2-3-1',
    description: 'Modern balanced',
    positions: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DF', x: 25, y: 30 },
      { position: 'DF', x: 40, y: 25 },
      { position: 'DF', x: 60, y: 25 },
      { position: 'DF', x: 75, y: 30 },
      { position: 'MF', x: 35, y: 50 },
      { position: 'MF', x: 65, y: 50 },
      { position: 'MF', x: 25, y: 70 },
      { position: 'MF', x: 50, y: 75 },
      { position: 'MF', x: 75, y: 70 },
      { position: 'FW', x: 50, y: 110 }
    ]
  },
  '3-5-2': {
    id: '3-5-2',
    name: '3-5-2',
    description: 'Wing focus',
    positions: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DF', x: 30, y: 30 },
      { position: 'DF', x: 50, y: 25 },
      { position: 'DF', x: 70, y: 30 },
      { position: 'MF', x: 15, y: 55 },
      { position: 'MF', x: 40, y: 60 },
      { position: 'MF', x: 60, y: 60 },
      { position: 'MF', x: 85, y: 55 },
      { position: 'FW', x: 40, y: 105 },
      { position: 'FW', x: 60, y: 105 }
    ]
  },
  '5-3-2': {
    id: '5-3-2',
    name: '5-3-2',
    description: 'Defensive width',
    positions: [
      { position: 'GK', x: 50, y: 10 },
      { position: 'DF', x: 20, y: 30 },
      { position: 'DF', x: 35, y: 25 },
      { position: 'DF', x: 50, y: 25 },
      { position: 'DF', x: 65, y: 25 },
      { position: 'DF', x: 80, y: 30 },
      { position: 'MF', x: 30, y: 60 },
      { position: 'MF', x: 50, y: 65 },
      { position: 'MF', x: 70, y: 60 },
      { position: 'FW', x: 40, y: 105 },
      { position: 'FW', x: 60, y: 105 }
    ]
  }
};

const POSITION_COLORS = {
  'GK': '#4a9eff',
  'DF': '#5b9fd8',
  'MF': '#8b7fd8',
  'FW': '#d85b5b'
};

class FormationBoard {
  constructor(options = {}) {
    this.players = options.players || [];
    this.selectedFormation = options.selectedFormation || '4-3-3';
    this.tactics = options.tactics || 'balanced';
    this.defensiveLevel = options.defensiveLevel || 50;
    this.readOnly = options.readOnly || false;
    this.onFormationChange = options.onFormationChange || null;
    this.onTacticsChange = options.onTacticsChange || null;
    this.onDefensiveLevel = options.onDefensiveLevel || null;
    this.onPlayerDrop = options.onPlayerDrop || null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'formation-board';

    // Canvas
    const canvas = this.renderCanvas();
    container.appendChild(canvas);

    // Controls
    if (!this.readOnly) {
      const controls = this.renderControls();
      container.appendChild(controls);
    }

    return container;
  }

  renderCanvas() {
    const svgContainer = document.createElement('div');
    svgContainer.className = 'formation-board__canvas-container';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 130');
    svg.className = 'formation-board__canvas';
    const tacticColors = {
      defensive: '#5b9fd8',
      balanced: '#8b7fd8',
      attacking: '#d85b5b',
      counter: '#ffb84d'
    };
    svg.style.borderColor = tacticColors[this.tactics] || '#8b7fd8';

    // Pitch
    const pitch = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    pitch.setAttribute('x', '0');
    pitch.setAttribute('y', '0');
    pitch.setAttribute('width', '100');
    pitch.setAttribute('height', '130');
    pitch.setAttribute('fill', '#1a2332');
    pitch.setAttribute('stroke', '#252d3d');
    pitch.setAttribute('stroke-width', '1');
    svg.appendChild(pitch);

    // Center line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '50');
    line.setAttribute('y1', '0');
    line.setAttribute('x2', '50');
    line.setAttribute('y2', '130');
    line.setAttribute('stroke', '#252d3d');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', '5,5');
    svg.appendChild(line);

    // Players
    const formation = FORMATIONS[this.selectedFormation] || FORMATIONS['4-3-3'];
    this.players.forEach((player, i) => {
      if (i >= formation.positions.length) return;
      const pos = formation.positions[i];
      const color = POSITION_COLORS[player.position] || '#4a9eff';

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x);
      circle.setAttribute('cy', pos.y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', color);
      circle.setAttribute('opacity', '0.8');
      circle.setAttribute('style', 'cursor: grab;');
      g.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', pos.x);
      text.setAttribute('y', pos.y);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('font-size', '3');
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-family', 'monospace');
      text.setAttribute('pointer-events', 'none');
      text.textContent = player.jerseyNumber;
      g.appendChild(text);

      svg.appendChild(g);
    });

    svgContainer.appendChild(svg);
    return svgContainer;
  }

  renderControls() {
    const controls = document.createElement('div');
    controls.className = 'formation-board__controls';

    // Formation select
    const formGroup = document.createElement('div');
    formGroup.className = 'formation-board__control-row';
    formGroup.innerHTML = '<label>Formation:</label>';
    const select = document.createElement('select');
    select.className = 'formation-board__select';
    Object.values(FORMATIONS).forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.name;
      if (f.id === this.selectedFormation) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', (e) => {
      if (this.onFormationChange) this.onFormationChange(e.target.value);
    });
    formGroup.appendChild(select);
    controls.appendChild(formGroup);

    // Tactics
    const tacticsGroup = document.createElement('div');
    tacticsGroup.className = 'formation-board__control-row';
    tacticsGroup.innerHTML = '<label>Tactics:</label>';
    const tacticsSelect = document.createElement('select');
    tacticsSelect.className = 'formation-board__select';
    ['defensive', 'balanced', 'attacking', 'counter'].forEach(tactic => {
      const opt = document.createElement('option');
      opt.value = tactic;
      opt.textContent = tactic.charAt(0).toUpperCase() + tactic.slice(1);
      if (tactic === this.tactics) opt.selected = true;
      tacticsSelect.appendChild(opt);
    });
    tacticsSelect.addEventListener('change', (e) => {
      if (this.onTacticsChange) this.onTacticsChange(e.target.value);
    });
    tacticsGroup.appendChild(tacticsSelect);
    controls.appendChild(tacticsGroup);

    // Defensive level slider
    const sliderGroup = document.createElement('div');
    sliderGroup.className = 'formation-board__control-row';
    sliderGroup.innerHTML = `<label>Defensive Level: ${this.defensiveLevel}%</label>`;
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = this.defensiveLevel;
    slider.className = 'formation-board__slider';
    slider.addEventListener('change', (e) => {
      if (this.onDefensiveLevel) this.onDefensiveLevel(parseInt(e.target.value));
    });
    sliderGroup.appendChild(slider);
    controls.appendChild(sliderGroup);

    // Stats display
    const totalBudget = this.players.reduce((sum, p) => sum + p.price, 0);
    const avgRating = (this.players.reduce((sum, p) => sum + p.rating, 0) / this.players.length).toFixed(1);
    const avgFitness = Math.round(this.players.reduce((sum, p) => sum + p.fitness, 0) / this.players.length);

    const stats = document.createElement('div');
    stats.className = 'formation-board__stats-display';
    stats.innerHTML = `
      <div>Budget: ${totalBudget.toFixed(1)}M</div>
      <div>Avg Rating: ${avgRating}</div>
      <div>Avg Fitness: ${avgFitness}%</div>
    `;
    controls.appendChild(stats);

    return controls;
  }

  static create(options, container) {
    const board = new FormationBoard(options);
    const element = board.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormationBoard;
}

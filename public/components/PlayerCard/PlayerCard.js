/**
 * PlayerCard Component
 * 3 variants: compact (56x56), standard (280x320), detailed (600+ modal)
 * Compact: Formation board variant
 * Standard: Lineup selection variant
 * Detailed: Full modal variant with stats
 */

const POSITION_COLORS = {
  'GK': '#4a9eff',
  'DF': '#5b9fd8',
  'MF': '#8b7fd8',
  'FW': '#d85b5b'
};

class PlayerCardCompact {
  constructor(options = {}) {
    this.player = options.player;
    this.selected = options.selected || false;
    this.onDragStart = options.onDragStart || null;
  }

  render() {
    const container = document.createElement('div');
    container.className = `player-card-compact ${this.selected ? 'selected' : ''}`;

    const color = POSITION_COLORS[this.player.position] || '#4a9eff';
    container.style.backgroundColor = `${color}cc`;
    container.style.borderColor = this.selected ? '#4a9eff' : 'transparent';

    container.draggable = true;
    container.title = `${this.player.name} - ${this.player.position} (Rating: ${this.player.rating})`;

    const jersey = document.createElement('span');
    jersey.className = 'player-card-compact__jersey';
    jersey.textContent = this.player.jerseyNumber;

    container.appendChild(jersey);

    if (this.onDragStart) {
      container.addEventListener('dragstart', this.onDragStart);
    }

    return container;
  }
}

class PlayerCardStandard {
  constructor(options = {}) {
    this.player = options.player;
    this.selected = options.selected || false;
    this.onSwap = options.onSwap || null;
    this.onInfo = options.onInfo || null;
    this.onClick = options.onClick || null;
  }

  render() {
    const container = document.createElement('div');
    container.className = `player-card-standard ${this.selected ? 'selected' : ''}`;

    // Header
    const header = document.createElement('div');
    header.className = 'player-card-standard__header';

    const jerseyName = document.createElement('div');
    jerseyName.className = 'player-card-standard__jersey-name';

    const jersey = document.createElement('span');
    jersey.className = 'player-card-standard__jersey';
    jersey.textContent = `[${this.player.jerseyNumber}]`;

    const name = document.createElement('span');
    name.className = 'player-card-standard__name';
    name.textContent = this.player.name;

    jerseyName.appendChild(jersey);
    jerseyName.appendChild(name);
    header.appendChild(jerseyName);

    // Subheader
    const subheader = document.createElement('div');
    subheader.className = 'player-card-standard__subheader';
    subheader.innerHTML = `<span>${this.player.team}</span><span>•</span><span>${this.player.position}</span>`;

    // Rating
    const ratingSection = document.createElement('div');
    ratingSection.className = 'player-card-standard__rating-section';
    const rating = document.createElement('span');
    rating.className = 'player-card-standard__rating';
    rating.textContent = this.player.rating.toFixed(1);
    ratingSection.appendChild(rating);

    // Fitness bar
    const fitnessSection = document.createElement('div');
    fitnessSection.className = 'player-card-standard__fitness-section';
    const fitnessBar = document.createElement('div');
    fitnessBar.className = 'player-card-standard__fitness-bar';
    const fitnessFill = document.createElement('div');
    fitnessFill.className = 'player-card-standard__fitness-fill';
    fitnessFill.style.width = `${this.player.fitness}%`;
    fitnessBar.appendChild(fitnessFill);
    fitnessSection.appendChild(fitnessBar);
    const fitnessText = document.createElement('span');
    fitnessText.className = 'player-card-standard__fitness-text';
    fitnessText.textContent = `${this.player.fitness}%`;
    fitnessSection.appendChild(fitnessText);

    // Form indicator
    const formSection = document.createElement('div');
    formSection.className = 'player-card-standard__form-section';
    const formIndicator = new FormIndicator({ rating: this.player.form, size: 'sm' });
    formSection.appendChild(formIndicator.render());

    // Price & Status
    const priceStatus = document.createElement('div');
    priceStatus.className = 'player-card-standard__price-status';
    const price = document.createElement('span');
    price.className = 'player-card-standard__price';
    price.textContent = `$${this.player.price}M`;
    const statusBadge = new StatusBadge({ status: this.player.status, size: 'sm' });
    priceStatus.appendChild(price);
    priceStatus.appendChild(statusBadge.render());

    // Actions
    const actions = document.createElement('div');
    actions.className = 'player-card-standard__actions';

    const swapBtn = new Button({
      variant: 'secondary',
      size: 'sm',
      text: 'Swap',
      onClick: this.onSwap
    });
    const infoBtn = new Button({
      variant: 'outline',
      size: 'sm',
      text: 'Info',
      onClick: this.onInfo
    });

    actions.appendChild(swapBtn.render());
    actions.appendChild(infoBtn.render());

    container.appendChild(header);
    container.appendChild(subheader);
    container.appendChild(ratingSection);
    container.appendChild(fitnessSection);
    container.appendChild(formSection);
    container.appendChild(priceStatus);
    container.appendChild(actions);

    if (this.onClick) {
      container.addEventListener('click', this.onClick);
    }

    return container;
  }
}

class PlayerCardDetailed {
  constructor(options = {}) {
    this.player = options.player;
    this.onClose = options.onClose || null;
    this.onSwap = options.onSwap || null;
    this.onRemove = options.onRemove || null;
    this.onViewStats = options.onViewStats || null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'player-card-detailed';

    // Header
    const header = document.createElement('div');
    header.className = 'player-card-detailed__header';
    const title = document.createElement('h2');
    title.textContent = this.player.name;
    const closeBtn = new Button({
      variant: 'outline',
      size: 'sm',
      text: '×',
      onClick: this.onClose,
      ariaLabel: 'Close'
    });
    header.appendChild(title);
    header.appendChild(closeBtn.render());

    // Subheader
    const subheader = document.createElement('div');
    subheader.className = 'player-card-detailed__subheader';
    subheader.innerHTML = `
      <span>${this.player.team}</span>
      <span>•</span>
      <span>${this.player.position}</span>
      <span>•</span>
      <span>#${this.player.jerseyNumber}</span>
    `;

    // Rating
    const ratingSection = document.createElement('div');
    ratingSection.className = 'player-card-detailed__rating';
    ratingSection.textContent = `Rating: ${this.player.rating.toFixed(1)}`;

    // Statistics
    const statsTitle = document.createElement('div');
    statsTitle.className = 'player-card-detailed__section-title';
    statsTitle.textContent = 'Statistics';

    const statsGrid = document.createElement('div');
    statsGrid.className = 'player-card-detailed__statistics-grid';
    const stats = [
      { label: 'Goals', value: this.player.stats.goals },
      { label: 'Assists', value: this.player.stats.assists },
      { label: 'Yellow Cards', value: this.player.stats.yellowCards },
      { label: 'Red Cards', value: this.player.stats.redCards }
    ];
    stats.forEach(stat => {
      const row = document.createElement('div');
      row.className = 'player-card-detailed__stat-row';
      row.innerHTML = `
        <span class="player-card-detailed__stat-label">${stat.label}</span>
        <span class="player-card-detailed__stat-value">${stat.value}</span>
      `;
      statsGrid.appendChild(row);
    });

    // Form history
    const formTitle = document.createElement('div');
    formTitle.className = 'player-card-detailed__section-title';
    formTitle.textContent = 'Form (Last 5)';

    const formHistory = document.createElement('div');
    formHistory.className = 'player-card-detailed__form-history';
    this.player.formHistory.forEach(match => {
      const box = document.createElement('div');
      box.className = 'player-card-detailed__form-box';
      box.title = `vs ${match.opponent} - ${match.result}`;
      box.textContent = match.rating.toFixed(1);
      formHistory.appendChild(box);
    });

    // Fitness & Status
    const fitnessTitle = document.createElement('div');
    fitnessTitle.className = 'player-card-detailed__section-title';
    fitnessTitle.textContent = 'Fitness & Status';

    const fitnessLarge = document.createElement('div');
    fitnessLarge.className = 'player-card-detailed__fitness-large';
    const fitnessLabel = document.createElement('span');
    fitnessLabel.textContent = `Fitness: ${this.player.fitness}%`;
    const fitnessBar = document.createElement('div');
    fitnessBar.className = 'player-card-detailed__fitness-bar-large';
    const fitnessFill = document.createElement('div');
    fitnessFill.className = 'player-card-detailed__fitness-fill';
    fitnessFill.style.width = `${this.player.fitness}%`;
    fitnessBar.appendChild(fitnessFill);
    fitnessLarge.appendChild(fitnessLabel);
    fitnessLarge.appendChild(fitnessBar);

    const statusLarge = document.createElement('div');
    statusLarge.className = 'player-card-detailed__status-large';
    const statusBadge = new StatusBadge({ status: this.player.status, size: 'md' });
    const injuryRisk = document.createElement('span');
    injuryRisk.textContent = `Injury Risk: ${this.player.injuryRisk}`;
    statusLarge.appendChild(statusBadge.render());
    statusLarge.appendChild(injuryRisk);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'player-card-detailed__actions';

    const swapBtn = new Button({
      variant: 'secondary',
      size: 'lg',
      text: 'Swap',
      block: true,
      onClick: this.onSwap
    });
    const removeBtn = new Button({
      variant: 'danger',
      size: 'lg',
      text: 'Remove',
      block: true,
      onClick: this.onRemove
    });
    const statsBtn = new Button({
      variant: 'outline',
      size: 'lg',
      text: 'View Stats',
      block: true,
      onClick: this.onViewStats
    });

    actions.appendChild(swapBtn.render());
    actions.appendChild(removeBtn.render());
    actions.appendChild(statsBtn.render());

    container.appendChild(header);
    container.appendChild(subheader);
    container.appendChild(ratingSection);
    container.appendChild(statsTitle);
    container.appendChild(statsGrid);
    container.appendChild(formTitle);
    container.appendChild(formHistory);
    container.appendChild(fitnessTitle);
    container.appendChild(fitnessLarge);
    container.appendChild(statusLarge);
    container.appendChild(actions);

    return container;
  }
}

// Dispatcher component
class PlayerCard {
  constructor(options = {}) {
    this.variant = options.variant || 'standard';
    this.options = options;
  }

  render() {
    switch (this.variant) {
      case 'compact':
        return new PlayerCardCompact(this.options).render();
      case 'detailed':
        return new PlayerCardDetailed(this.options).render();
      case 'standard':
      default:
        return new PlayerCardStandard(this.options).render();
    }
  }

  static create(options, container) {
    const card = new PlayerCard(options);
    const element = card.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PlayerCard, PlayerCardCompact, PlayerCardStandard, PlayerCardDetailed };
}

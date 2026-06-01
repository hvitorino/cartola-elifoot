/**
 * FormIndicator Component
 * 5-dot form display showing player form (1-5)
 * Sizes: sm (6px), md (8px), lg (10px)
 * Features: label, tooltip with match history
 */

class FormIndicator {
  constructor(options = {}) {
    this.rating = options.rating || 3; // 1-5
    this.size = options.size || 'md';
    this.showLabel = options.showLabel || false;
    this.showTooltip = options.showTooltip || false;
    this.matchHistory = options.matchHistory || null;
    this.className = options.className || '';
  }

  getSizeConfig() {
    const configs = {
      sm: { dot: 6, gap: 3 },
      md: { dot: 8, gap: 4 },
      lg: { dot: 10, gap: 5 }
    };
    return configs[this.size] || configs.md;
  }

  getFormLabel() {
    const labels = {
      1: 'Very Poor',
      2: 'Poor',
      3: 'Average',
      4: 'Good',
      5: 'Excellent'
    };
    return labels[this.rating] || 'Unknown';
  }

  getFormColor() {
    const colors = {
      1: '#ff5c5c', // danger
      2: '#ffb84d', // warning
      3: '#ffb84d', // warning
      4: '#6bbf59', // success
      5: '#6bbf59'  // success
    };
    return colors[this.rating] || '#4a9eff';
  }

  render() {
    const container = document.createElement('div');
    container.className = `form-indicator ${this.className}`;

    const config = this.getSizeConfig();
    const dotColor = this.getFormColor();

    // Create indicator
    const indicator = document.createElement('div');
    indicator.className = 'form-indicator__dots';
    indicator.style.setProperty('--dot-size', `${config.dot}px`);
    indicator.style.setProperty('--gap', `${config.gap}px`);

    // Create dots
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('div');
      dot.className = `form-indicator__dot ${i < this.rating ? 'filled' : 'empty'}`;
      dot.style.setProperty('--dot-color', dotColor);
      indicator.appendChild(dot);
    }

    container.appendChild(indicator);

    // Add label if requested
    if (this.showLabel) {
      const label = document.createElement('span');
      label.className = 'form-indicator__label';
      label.textContent = this.getFormLabel();
      container.appendChild(label);
    }

    // Add tooltip if requested and match history provided
    if (this.showTooltip && this.matchHistory && this.matchHistory.length > 0) {
      const tooltip = document.createElement('div');
      tooltip.className = 'form-indicator__tooltip';

      const title = document.createElement('div');
      title.className = 'form-indicator__tooltip-title';
      title.textContent = 'Last 5 Matches';
      tooltip.appendChild(title);

      this.matchHistory.slice(0, 5).forEach(match => {
        const row = document.createElement('div');
        row.className = 'form-indicator__tooltip-row';

        const opponent = document.createElement('span');
        opponent.className = 'form-indicator__tooltip-match';
        opponent.textContent = match.opponent;

        const rating = document.createElement('span');
        rating.className = `form-indicator__tooltip-rating result-${match.result}`;
        rating.textContent = `${match.rating.toFixed(1)} (${match.result})`;

        row.appendChild(opponent);
        row.appendChild(rating);
        tooltip.appendChild(row);
      });

      container.appendChild(tooltip);
    }

    return container;
  }

  static create(options, container) {
    const indicator = new FormIndicator(options);
    const element = indicator.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FormIndicator;
}

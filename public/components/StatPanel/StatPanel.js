/**
 * StatPanel Component
 * Display stats with progress bars, single/double column, comparison mode
 */

class StatPanel {
  constructor(options = {}) {
    this.title = options.title || null;
    this.stats = options.stats || [];
    this.columns = options.columns || 1;
    this.comparison = options.comparison || null;
    this.className = options.className || '';
  }

  render() {
    const container = document.createElement('div');
    container.className = `stat-panel ${this.className}`;

    if (this.title) {
      const titleEl = document.createElement('h3');
      titleEl.className = 'stat-panel__title';
      titleEl.textContent = this.title;
      container.appendChild(titleEl);
    }

    if (this.comparison) {
      const grid = document.createElement('div');
      grid.className = 'stat-panel__comparison-grid';
      this.comparison.stats.forEach(stat => {
        const row = document.createElement('div');
        row.className = 'stat-panel__comparison-row';
        row.innerHTML = `
          <span class="stat-panel__label">${stat.name}</span>
          <div class="stat-panel__comparison-values">
            <span>${stat.value1}${stat.unit || ''}</span>
            <span class="stat-panel__vs">vs</span>
            <span>${stat.value2}${stat.unit || ''}</span>
          </div>
        `;
        grid.appendChild(row);
      });
      container.appendChild(grid);
    } else {
      const grid = document.createElement('div');
      grid.className = `stat-panel__grid stat-panel__grid--${this.columns}`;
      this.stats.forEach(stat => {
        const row = document.createElement('div');
        row.className = 'stat-panel__row';

        const color = stat.color || this.getColorForType(stat.type);

        let content = `<span class="stat-panel__label">${stat.name}</span>
          <div class="stat-panel__value-container">
            <span class="stat-panel__value">${stat.value}${stat.unit || ''}</span>`;

        if (stat.max) {
          const percentage = Math.min((stat.value / stat.max) * 100, 100);
          content += `
            <div class="stat-panel__progress-bar">
              <div class="stat-panel__progress-fill" style="width: ${percentage}%; background-color: ${color};"></div>
            </div>`;
        }

        content += '</div>';
        row.innerHTML = content;
        grid.appendChild(row);
      });
      container.appendChild(grid);
    }

    return container;
  }

  getColorForType(type) {
    const colors = {
      info: '#4a9eff',
      success: '#6bbf59',
      warning: '#ffb84d',
      danger: '#ff5c5c',
      neutral: '#8b95a5'
    };
    return colors[type] || colors.info;
  }

  static create(options, container) {
    const panel = new StatPanel(options);
    const element = panel.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StatPanel;
}

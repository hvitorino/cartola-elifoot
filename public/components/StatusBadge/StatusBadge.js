/**
 * StatusBadge Component
 * 5 status types: fit, injured, doubtful, returning, suspended
 * 3 sizes: sm, md, lg
 * Features: icon, label, pulsing animation
 */

class StatusBadge {
  constructor(options = {}) {
    this.status = options.status || 'fit';
    this.size = options.size || 'md';
    this.showIcon = options.showIcon !== false;
    this.showLabel = options.showLabel !== false;
    this.pulsing = options.pulsing || false;
    this.tooltip = options.tooltip || null;
    this.className = options.className || '';
  }

  getStatusConfig() {
    const configs = {
      fit: {
        icon: '✓',
        label: 'FIT',
        color: '#6bbf59',
        bgColor: 'rgba(107, 191, 89, 0.15)'
      },
      injured: {
        icon: '×',
        label: 'INJURED',
        color: '#ff5c5c',
        bgColor: 'rgba(255, 92, 92, 0.15)'
      },
      doubtful: {
        icon: '?',
        label: 'DOUBTFUL',
        color: '#ffb84d',
        bgColor: 'rgba(255, 184, 77, 0.15)'
      },
      returning: {
        icon: '←',
        label: 'RETURNING',
        color: '#4a9eff',
        bgColor: 'rgba(74, 158, 255, 0.15)'
      },
      suspended: {
        icon: '🔴',
        label: 'SUSPENDED',
        color: '#9d84b7',
        bgColor: 'rgba(157, 132, 183, 0.15)'
      }
    };
    return configs[this.status] || configs.fit;
  }

  getSizeConfig() {
    const configs = {
      sm: { height: '20px', padding: '3px 8px', fontSize: '11px', dotSize: '6px' },
      md: { height: '24px', padding: '4px 12px', fontSize: '12px', dotSize: '8px' },
      lg: { height: '32px', padding: '6px 16px', fontSize: '14px', dotSize: '10px' }
    };
    return configs[this.size] || configs.md;
  }

  render() {
    const badge = document.createElement('span');
    const config = this.getStatusConfig();
    const sizeConfig = this.getSizeConfig();

    badge.className = `status-badge status-${this.status} ${this.pulsing ? 'pulsing' : ''} ${this.className}`;
    badge.style.backgroundColor = config.bgColor;
    badge.style.color = config.color;
    badge.style.height = sizeConfig.height;
    badge.style.padding = sizeConfig.padding;
    badge.style.fontSize = sizeConfig.fontSize;
    badge.setAttribute('--dot-size', sizeConfig.dotSize);

    if (this.tooltip) {
      badge.title = this.tooltip;
    }

    let content = '';

    if (this.showIcon) {
      content += `<span class="status-badge__icon">
        <span class="status-badge__dot" style="--dot-size: ${sizeConfig.dotSize}"></span>
        ${config.icon}
      </span>`;
    }

    if (this.showLabel) {
      content += `<span class="status-badge__label">${config.label}</span>`;
    }

    badge.innerHTML = content;
    return badge;
  }

  static create(options, container) {
    const badge = new StatusBadge(options);
    const element = badge.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = StatusBadge;
}

/**
 * Button Component
 * 5 variants: primary, secondary, danger, success, outline
 * 3 sizes: sm, md, lg
 * 4 states: default, hover, active, disabled
 * Features: loading spinner, icon support, block width
 */

class Button {
  constructor(options = {}) {
    this.variant = options.variant || 'primary';
    this.size = options.size || 'md';
    this.text = options.text || 'Button';
    this.disabled = options.disabled || false;
    this.loading = options.loading || false;
    this.block = options.block || false;
    this.icon = options.icon || null;
    this.onClick = options.onClick || null;
    this.type = options.type || 'button';
    this.ariaLabel = options.ariaLabel || null;
    this.className = options.className || '';
  }

  render() {
    const button = document.createElement('button');

    // Build class list
    const classes = [
      'btn',
      `btn-${this.variant}`,
      `btn-size-${this.size}`,
      this.block && 'btn-block',
      this.loading && 'btn-loading',
      this.disabled && 'btn-disabled',
      this.className
    ].filter(Boolean).join(' ');

    button.className = classes;
    button.type = this.type;
    button.disabled = this.disabled || this.loading;

    if (this.ariaLabel) {
      button.setAttribute('aria-label', this.ariaLabel);
    }

    if (this.loading) {
      button.setAttribute('aria-busy', 'true');
    }

    // Content
    let content = '';
    if (this.loading) {
      content += '<span class="btn-spinner"></span>';
    }
    if (this.icon) {
      content += `<span class="btn-icon">${this.icon}</span>`;
    }
    content += `<span class="btn-text">${this.text}</span>`;

    button.innerHTML = content;

    if (this.onClick) {
      button.addEventListener('click', this.onClick);
    }

    return button;
  }

  // Static helper to create and inject button
  static create(options, container) {
    const btn = new Button(options);
    const element = btn.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Button;
}

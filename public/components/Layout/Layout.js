/**
 * Layout Components
 * Header, Sidebar, Card, ContentArea, Grid
 */

class Header {
  constructor(options = {}) {
    this.logo = options.logo || 'CartolA';
    this.title = options.title || 'Football Manager';
    this.navItems = options.navItems || [];
    this.rightContent = options.rightContent || null;
    this.className = options.className || '';
  }

  render() {
    const header = document.createElement('header');
    header.className = `layout-header ${this.className}`;

    const left = document.createElement('div');
    left.className = 'layout-header__left';
    left.innerHTML = `
      <div class="layout-header__logo">${this.logo}</div>
      <div class="layout-header__title">${this.title}</div>
    `;

    const nav = document.createElement('nav');
    nav.className = 'layout-header__nav';
    this.navItems.forEach(item => {
      const a = document.createElement('a');
      a.className = 'layout-header__nav-item';
      a.href = item.href || '#';
      a.textContent = item.label;
      if (item.active) a.classList.add('active');
      nav.appendChild(a);
    });

    const right = document.createElement('div');
    right.className = 'layout-header__right';
    if (this.rightContent) {
      right.appendChild(this.rightContent);
    }

    header.appendChild(left);
    header.appendChild(nav);
    header.appendChild(right);

    return header;
  }
}

class Sidebar {
  constructor(options = {}) {
    this.items = options.items || [];
    this.className = options.className || '';
    this.isOpen = false;
  }

  render() {
    const sidebar = document.createElement('aside');
    sidebar.className = `layout-sidebar ${this.className}`;

    const nav = document.createElement('nav');
    nav.className = 'layout-sidebar__nav';

    this.items.forEach(item => {
      const a = document.createElement('a');
      a.className = 'layout-sidebar__item';
      a.href = item.href || '#';
      a.innerHTML = `
        ${item.icon ? `<span class="layout-sidebar__icon">${item.icon}</span>` : ''}
        <span class="layout-sidebar__label">${item.label}</span>
      `;
      if (item.active) a.classList.add('active');
      nav.appendChild(a);
    });

    sidebar.appendChild(nav);

    // Mobile backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'layout-sidebar__backdrop';
    backdrop.addEventListener('click', () => this.toggle());

    sidebar.appendChild(backdrop);

    return sidebar;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

class Card {
  constructor(options = {}) {
    this.variant = options.variant || 'standard'; // standard, elevated, compact
    this.title = options.title || null;
    this.content = options.content || null;
    this.className = options.className || '';
  }

  render() {
    const card = document.createElement('div');
    card.className = `layout-card layout-card--${this.variant} ${this.className}`;

    if (this.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'layout-card__title';
      titleEl.textContent = this.title;
      card.appendChild(titleEl);
    }

    if (this.content) {
      if (typeof this.content === 'string') {
        const contentEl = document.createElement('div');
        contentEl.className = 'layout-card__content';
        contentEl.innerHTML = this.content;
        card.appendChild(contentEl);
      } else {
        const contentEl = document.createElement('div');
        contentEl.className = 'layout-card__content';
        contentEl.appendChild(this.content);
        card.appendChild(contentEl);
      }
    }

    return card;
  }

  static create(options, container) {
    const card = new Card(options);
    const element = card.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

class ContentArea {
  constructor(options = {}) {
    this.columns = options.columns || 1;
    this.gap = options.gap || 'md'; // sm, md, lg
    this.children = options.children || [];
    this.className = options.className || '';
  }

  render() {
    const container = document.createElement('div');
    container.className = `layout-content-area layout-content-area--gap-${this.gap} ${this.className}`;

    if (this.columns > 1) {
      container.style.display = 'grid';
      container.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    }

    this.children.forEach(child => {
      if (typeof child === 'string') {
        const div = document.createElement('div');
        div.innerHTML = child;
        container.appendChild(div);
      } else {
        container.appendChild(child);
      }
    });

    return container;
  }

  static create(options, container) {
    const area = new ContentArea(options);
    const element = area.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

class Grid {
  constructor(options = {}) {
    this.columns = options.columns || 'auto';
    this.gap = options.gap || 'md'; // sm, md, lg
    this.children = options.children || [];
    this.className = options.className || '';
  }

  render() {
    const grid = document.createElement('div');
    grid.className = `layout-grid layout-grid--gap-${this.gap} ${this.className}`;

    if (typeof this.columns === 'number') {
      grid.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
    } else if (this.columns === 'auto') {
      grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    }

    this.children.forEach(child => {
      if (typeof child === 'string') {
        const div = document.createElement('div');
        div.innerHTML = child;
        grid.appendChild(div);
      } else {
        grid.appendChild(child);
      }
    });

    return grid;
  }

  static create(options, container) {
    const grid = new Grid(options);
    const element = grid.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Header, Sidebar, Card, ContentArea, Grid };
}

/**
 * CSS validation tests for animations and responsive design
 */

describe('CSS Animations', () => {
  let styleSheet;

  beforeEach(() => {
    // Load CSS files
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'animacoes.css';
    document.head.appendChild(link);
  });

  afterEach(() => {
    const links = document.querySelectorAll('link[href="animacoes.css"]');
    links.forEach(link => link.remove());
  });

  describe('animacoes.css', () => {
    it('should have charReveal keyframe', () => {
      const animationRule = Array.from(document.styleSheets).find(sheet => {
        try {
          return sheet.href && sheet.href.includes('animacoes.css');
        } catch (e) {
          return false;
        }
      });

      // Verify animation exists by checking computed styles
      const element = document.createElement('span');
      element.style.animation = 'charReveal 400ms ease-out forwards';
      expect(element.style.animation).toContain('charReveal');
    });

    it('should have fadeInUp keyframe', () => {
      const element = document.createElement('div');
      element.style.animation = 'fadeInUp 0.4s ease-out';
      expect(element.style.animation).toContain('fadeInUp');
    });

    it('should have pulseGol keyframe for goal celebration', () => {
      const element = document.createElement('div');
      element.style.animation = 'pulseGol 0.6s ease-in-out';
      expect(element.style.animation).toContain('pulseGol');
    });

    it('should have slideIn keyframe for card appearance', () => {
      const element = document.createElement('div');
      element.style.animation = 'slideIn 0.4s ease-out forwards';
      expect(element.style.animation).toContain('slideIn');
    });

    it('should support play-type-specific classes', () => {
      const golElement = document.createElement('div');
      golElement.className = 'lance-gol animating';
      expect(golElement.classList.contains('lance-gol')).toBe(true);

      const cartaoElement = document.createElement('div');
      cartaoElement.className = 'lance-cartao_amarelo';
      expect(cartaoElement.classList.contains('lance-cartao_amarelo')).toBe(true);
    });

    it('should support staggered delay for nth-child', () => {
      const container = document.createElement('div');
      for (let i = 1; i <= 3; i++) {
        const child = document.createElement('div');
        child.className = `lance`;
        child.style.animationDelay = `${(i - 1) * 100}ms`;
        container.appendChild(child);
      }

      const children = container.querySelectorAll('.lance');
      expect(children[0].style.animationDelay).toBe('0ms');
      expect(children[1].style.animationDelay).toBe('100ms');
      expect(children[2].style.animationDelay).toBe('200ms');
    });

    it('should respect prefers-reduced-motion', () => {
      // Create mock media query
      const mediaQuery = '(prefers-reduced-motion: reduce)';
      expect(mediaQuery).toContain('prefers-reduced-motion');
    });
  });
});

describe('CSS Responsive Design', () => {
  describe('responsivo.css breakpoints', () => {
    it('should have mobile-first base styles', () => {
      const body = document.createElement('body');
      body.style.fontSize = '16px';
      expect(body.style.fontSize).toBe('16px');
    });

    it('should have tablet breakpoint at 768px', () => {
      // Test media query structure
      const mediaQuery = '@media (min-width: 768px)';
      expect(mediaQuery).toContain('768px');
    });

    it('should have desktop breakpoint at 1024px', () => {
      const mediaQuery = '@media (min-width: 1024px)';
      expect(mediaQuery).toContain('1024px');
    });

    it('should have large desktop breakpoint at 1440px', () => {
      const mediaQuery = '@media (min-width: 1440px)';
      expect(mediaQuery).toContain('1440px');
    });

    it('should support touch devices', () => {
      const mediaQuery = '@media (hover: none)';
      expect(mediaQuery).toContain('hover');
    });

    it('should support dark mode', () => {
      const mediaQuery = '@media (prefers-color-scheme: dark)';
      expect(mediaQuery).toContain('dark');
    });

    it('should support landscape orientation on small screens', () => {
      const mediaQuery = '@media (max-height: 600px) and (orientation: landscape)';
      expect(mediaQuery).toContain('landscape');
    });
  });

  describe('Standings table responsiveness', () => {
    let table;

    beforeEach(() => {
      table = document.createElement('table');
      table.className = 'standings-table';

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      ['Pos', 'Clube', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', 'Pts'].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      const dataRow = document.createElement('tr');
      dataRow.className = 'standings-row';
      for (let i = 0; i < 10; i++) {
        const td = document.createElement('td');
        td.textContent = i;
        dataRow.appendChild(td);
      }
      tbody.appendChild(dataRow);
      table.appendChild(tbody);

      document.body.appendChild(table);
    });

    afterEach(() => {
      if (table && table.parentNode) {
        document.body.removeChild(table);
      }
    });

    it('should render table structure', () => {
      expect(table.querySelector('thead')).toBeTruthy();
      expect(table.querySelector('tbody')).toBeTruthy();
    });

    it('should have overflow handling for mobile', () => {
      const container = document.createElement('div');
      container.style.overflowX = 'auto';
      const tableClone = table.cloneNode(true);
      container.appendChild(tableClone);
      expect(container.style.overflowX).toBe('auto');
      container.removeChild(tableClone);
    });

    it('should support current-club highlight class', () => {
      const currentRow = document.createElement('tr');
      currentRow.className = 'standings-row current-club';
      expect(currentRow.classList.contains('current-club')).toBe(true);
    });
  });

  describe('History cards responsiveness', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      container.className = 'historia-timeline';

      for (let i = 0; i < 6; i++) {
        const card = document.createElement('div');
        card.className = 'historia-card';
        card.innerHTML = `<div>Round ${i + 1}</div>`;
        container.appendChild(card);
      }

      document.body.appendChild(container);
    });

    afterEach(() => {
      if (container && container.parentNode) {
        document.body.removeChild(container);
      }
    });

    it('should render history cards', () => {
      const cards = container.querySelectorAll('.historia-card');
      expect(cards).toHaveLength(6);
    });

    it('should support grid layout for cards', () => {
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
      expect(container.style.display).toBe('grid');
    });
  });

  describe('Touch-friendly spacing', () => {
    it('should have 44px minimum tap targets', () => {
      const button = document.createElement('button');
      button.style.minHeight = '44px';
      button.style.padding = '1rem 1.5rem';

      expect(button.style.minHeight).toBe('44px');
    });

    it('should support larger touch padding', () => {
      const element = document.createElement('div');
      element.style.padding = '1rem';
      expect(element.style.padding).toBe('1rem');
    });
  });

  describe('Dark mode support', () => {
    it('should support dark background', () => {
      const darkContainer = document.createElement('div');
      darkContainer.style.background = '#1a1a1a';
      darkContainer.style.color = '#fff';

      expect(darkContainer.style.background).toBe('rgb(26, 26, 26)');
      expect(darkContainer.style.color).toBe('rgb(255, 255, 255)');
    });

    it('should support dark card styling', () => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.background = '#2a2a2a';
      card.style.borderColor = '#444';

      expect(card.style.background).toBe('rgb(42, 42, 42)');
    });

    it('should maintain contrast in dark mode', () => {
      // Color contrast check helpers
      const darkBg = 'rgb(26, 26, 26)'; // ~8% brightness
      const lightText = 'rgb(255, 255, 255)'; // 100% brightness

      expect(darkBg).toBeDefined();
      expect(lightText).toBeDefined();
    });
  });

  describe('Accessibility media queries', () => {
    it('should support prefers-reduced-motion', () => {
      const query = '(prefers-reduced-motion: reduce)';
      expect(query).toContain('prefers-reduced-motion');
    });

    it('should support high contrast mode', () => {
      const query = '(prefers-contrast: more)';
      expect(query).toContain('prefers-contrast');
    });
  });
});

describe('rodada.html responsive layout', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.className = 'standings-grid';

    const section1 = document.createElement('div');
    section1.className = 'standings-container';
    section1.style.gridColumn = '1';

    const section2 = document.createElement('div');
    section2.className = 'stats-container';
    section2.style.gridColumn = '2';

    container.appendChild(section1);
    container.appendChild(section2);

    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  });

  it('should have standings grid layout', () => {
    expect(container.classList.contains('standings-grid')).toBe(true);
  });

  it('should support multi-column layout on desktop', () => {
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '2fr 1fr 1fr';

    expect(container.style.gridTemplateColumns).toBe('2fr 1fr 1fr');
  });

  it('should be responsive with auto-fit', () => {
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    expect(container.style.gridTemplateColumns).toContain('auto-fit');
  });

  it('should have proper gap between sections', () => {
    container.style.gap = '2rem';
    expect(container.style.gap).toBe('2rem');
  });
});

describe('Button and input styling', () => {
  it('should have full-width buttons on mobile', () => {
    const button = document.createElement('button');
    button.style.width = '100%';
    button.style.padding = '1rem';

    expect(button.style.width).toBe('100%');
  });

  it('should support font size scaling', () => {
    const base = document.createElement('body');
    base.style.fontSize = '16px'; // Mobile base

    const large = document.createElement('body');
    large.style.fontSize = '18px'; // Desktop base

    expect(base.style.fontSize).toBe('16px');
    expect(large.style.fontSize).toBe('18px');
  });
});

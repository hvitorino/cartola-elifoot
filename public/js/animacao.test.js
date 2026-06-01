/**
 * Unit tests for animation module
 */

import {
  configurarAnimacao,
  animarTexto,
  animarFilaTextos,
  cancelarAnimacoes,
  obterEstatisticasAnimacao,
  obterConfiguracao,
  temAnimacaoEmAndamento,
  resetarEstatisticas
} from './animacao.js';

describe('Animation Module', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
    resetarEstatisticas();
  });

  afterEach(() => {
    if (element && element.parentNode) {
      document.body.removeChild(element);
    }
    cancelarAnimacoes();
    resetarEstatisticas();
  });

  describe('configurarAnimacao()', () => {
    it('should set custom animation config', () => {
      const customConfig = {
        baseDelay: 100,
        charDelay: 10,
        fadeInDuration: 200,
        scrollBehavior: 'auto'
      };

      configurarAnimacao(customConfig);
      const config = obterConfiguracao();

      expect(config.baseDelay).toBe(100);
      expect(config.charDelay).toBe(10);
      expect(config.fadeInDuration).toBe(200);
      expect(config.scrollBehavior).toBe('auto');
    });

    it('should merge partial config with defaults', () => {
      resetarEstatisticas(); // Reset before test
      configurarAnimacao({ baseDelay: 200 });
      const config = obterConfiguracao();

      expect(config.baseDelay).toBe(200);
      expect(typeof config.charDelay).toBe('number'); // Should have some default
    });

    it('should handle null config gracefully', () => {
      expect(() => configurarAnimacao(null)).not.toThrow();
      expect(() => configurarAnimacao(undefined)).not.toThrow();
    });
  });

  describe('animarTexto()', () => {
    it('should return a promise', async () => {
      const promise = animarTexto(element, 'Test', { charDelay: 1, delay: 0 });
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    });

    it('should add play-type class to element', async () => {
      const promise = animarTexto(element, 'Goal', { tipo: 'gol', charDelay: 1, delay: 0 });
      await promise;
      expect(element.classList.contains('lance-gol')).toBe(true);
    });

    it('should handle empty text gracefully', async () => {
      const promise = animarTexto(element, '', { charDelay: 1, delay: 0 });
      await promise;
      expect(element.textContent).toBe('');
    });

    it('should handle null element gracefully', async () => {
      const promise = animarTexto(null, 'Text', { charDelay: 1, delay: 0 });
      await promise;
      expect(promise).resolves.toBeUndefined();
    });

    it('should clear element before animating', async () => {
      element.textContent = 'Old text';
      const promise = animarTexto(element, 'New', { charDelay: 1, delay: 0 });
      await promise;
      // Element should have been cleared and animated
      expect(element.querySelector('span')).toBeTruthy();
    });

    it('should apply fade-in animation when enabled', async () => {
      const promise = animarTexto(element, 'Test', { fadeIn: true, charDelay: 1, delay: 0 });
      await promise;
      const chars = element.querySelectorAll('span');
      if (chars.length > 0) {
        expect(chars[0].style.animation).toContain('charReveal');
      }
    });

    it('should not apply animation when fadeIn is false', async () => {
      const promise = animarTexto(element, 'Test', { fadeIn: false, charDelay: 1, delay: 0 });
      await promise;
      const chars = element.querySelectorAll('span');
      if (chars.length > 0) {
        expect(chars[0].style.animation).toBe('');
      }
    });
  });

  describe('animarFilaTextos()', () => {
    it('should return a promise for empty fila', async () => {
      const promise = animarFilaTextos([]);
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    });

    it('should handle null fila gracefully', async () => {
      const promise = animarFilaTextos(null);
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    });

    it('should accept array of animation items', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const fila = [
        { element: elem, texto: 'Test', options: { charDelay: 1, delay: 0 } }
      ];

      const promise = animarFilaTextos(fila);
      await promise;
      expect(promise).resolves.toBeUndefined();

      document.body.removeChild(elem);
    });
  });

  describe('cancelarAnimacoes()', () => {
    it('should be a callable function', () => {
      expect(typeof cancelarAnimacoes).toBe('function');
    });

    it('should not throw when called', () => {
      expect(() => cancelarAnimacoes()).not.toThrow();
    });
  });

  describe('obterEstatisticasAnimacao()', () => {
    it('should return stats object', () => {
      const stats = obterEstatisticasAnimacao();
      expect(typeof stats).toBe('object');
      expect(stats).toHaveProperty('totalTime');
      expect(stats).toHaveProperty('charCount');
      expect(stats).toHaveProperty('avgCharTime');
    });

    it('should initialize with zero values', () => {
      resetarEstatisticas();
      const stats = obterEstatisticasAnimacao();
      expect(stats.totalTime).toBe(0);
      expect(stats.charCount).toBe(0);
      expect(stats.avgCharTime).toBe(0);
    });
  });

  describe('temAnimacaoEmAndamento()', () => {
    it('should return boolean', () => {
      const result = temAnimacaoEmAndamento();
      expect(typeof result).toBe('boolean');
    });

    it('should return false initially', () => {
      resetarEstatisticas();
      cancelarAnimacoes();
      expect(temAnimacaoEmAndamento()).toBe(false);
    });
  });

  describe('resetarEstatisticas()', () => {
    it('should reset all stats to zero', () => {
      resetarEstatisticas();
      const stats = obterEstatisticasAnimacao();
      expect(stats.totalTime).toBe(0);
      expect(stats.charCount).toBe(0);
      expect(stats.avgCharTime).toBe(0);
    });

    it('should be callable multiple times', () => {
      expect(() => {
        resetarEstatisticas();
        resetarEstatisticas();
        resetarEstatisticas();
      }).not.toThrow();
    });
  });

  describe('configurarAnimacao()', () => {
    it('should set custom config values', () => {
      const config = {
        baseDelay: 250,
        charDelay: 15
      };
      configurarAnimacao(config);
      const current = obterConfiguracao();
      expect(current.baseDelay).toBe(250);
      expect(current.charDelay).toBe(15);
    });
  });

  describe('obterConfiguracao()', () => {
    it('should return config object', () => {
      const config = obterConfiguracao();
      expect(typeof config).toBe('object');
      expect(config).toHaveProperty('baseDelay');
      expect(config).toHaveProperty('charDelay');
      expect(config).toHaveProperty('fadeInDuration');
      expect(config).toHaveProperty('scrollBehavior');
    });
  });
});

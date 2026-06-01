/**
 * Unit tests for history module
 */

import {
  adicionarResultadoAoHistorico,
  obterHistoricoCompleto,
  filtrarHistoricoPorAdversario,
  calcularEstatisticasSeason,
  renderCartaoHistorico,
  renderTimelineHistorico,
  obterUltimosResultados
} from './historico.js';

describe('History Module', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('adicionarResultadoAoHistorico()', () => {
    it('should add match to localStorage', () => {
      const match = {
        numero_rodada: 1,
        placar: { casa: 2, visitante: 1 },
        adversario: { clube_id: 2, nome: 'Flamengo' },
        data_rodada: '2025-06-01'
      };

      adicionarResultadoAoHistorico(match);

      const stored = JSON.parse(localStorage.getItem('cartola_historico'));
      expect(stored).toHaveLength(1);
      expect(stored[0].numero_rodada).toBe(1);
      expect(stored[0].timestamp).toBeDefined();
    });

    it('should append to existing history', () => {
      const match1 = { numero_rodada: 1, placar: { casa: 2, visitante: 1 } };
      const match2 = { numero_rodada: 2, placar: { casa: 1, visitante: 1 } };

      adicionarResultadoAoHistorico(match1);
      adicionarResultadoAoHistorico(match2);

      const stored = JSON.parse(localStorage.getItem('cartola_historico'));
      expect(stored).toHaveLength(2);
    });

    it('should add timestamp to result', () => {
      const match = { numero_rodada: 1 };
      const beforeTime = new Date();

      adicionarResultadoAoHistorico(match);

      const stored = JSON.parse(localStorage.getItem('cartola_historico'));
      const addedTime = new Date(stored[0].timestamp);

      expect(addedTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });

    it('should handle null/undefined gracefully', () => {
      expect(() => adicionarResultadoAoHistorico(null)).not.toThrow();
      expect(() => adicionarResultadoAoHistorico(undefined)).not.toThrow();
      expect(obterHistoricoCompleto()).toHaveLength(0);
    });

    it('should preserve match data completely', () => {
      const match = {
        numero_rodada: 5,
        placar: { casa: 3, visitante: 2 },
        adversario: { clube_id: 10, nome: 'Test Club' },
        data_rodada: '2025-06-15',
        destaques: { melhor_jogador: { casa: { nome: 'Player' } } }
      };

      adicionarResultadoAoHistorico(match);

      const stored = JSON.parse(localStorage.getItem('cartola_historico'));
      expect(stored[0].numero_rodada).toBe(5);
      expect(stored[0].placar.visitante).toBe(2);
      expect(stored[0].destaques.melhor_jogador.casa.nome).toBe('Player');
    });
  });

  describe('obterHistoricoCompleto()', () => {
    it('should return empty array when no history', () => {
      expect(obterHistoricoCompleto()).toEqual([]);
    });

    it('should return stored history', () => {
      const matches = [
        { numero_rodada: 1, placar: { casa: 2, visitante: 1 } },
        { numero_rodada: 2, placar: { casa: 1, visitante: 1 } }
      ];
      localStorage.setItem('cartola_historico', JSON.stringify(matches));

      expect(obterHistoricoCompleto()).toEqual(matches);
    });

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('cartola_historico', 'invalid json');
      expect(obterHistoricoCompleto()).toEqual([]);
    });

    it('should return array even if stored as object', () => {
      localStorage.setItem('cartola_historico', JSON.stringify({ not: 'array' }));
      expect(obterHistoricoCompleto()).toEqual([]);
    });
  });

  describe('filtrarHistoricoPorAdversario()', () => {
    beforeEach(() => {
      const matches = [
        { numero_rodada: 1, adversario: { clube_id: 2, nome: 'Flamengo' }, placar: { casa: 2, visitante: 1 } },
        { numero_rodada: 2, adversario: { clube_id: 3, nome: 'Vasco' }, placar: { casa: 1, visitante: 1 } },
        { numero_rodada: 3, adversario: { clube_id: 2, nome: 'Flamengo' }, placar: { casa: 0, visitante: 2 } }
      ];
      localStorage.setItem('cartola_historico', JSON.stringify(matches));
    });

    it('should filter by clube_id', () => {
      const filtered = filtrarHistoricoPorAdversario(2);
      expect(filtered).toHaveLength(2);
      expect(filtered.every(m => m.adversario.clube_id === 2)).toBe(true);
    });

    it('should handle missing adversario field', () => {
      const matches = [
        { numero_rodada: 1 },
        { numero_rodada: 2, adversario: { clube_id: 2 } }
      ];
      localStorage.setItem('cartola_historico', JSON.stringify(matches));

      const filtered = filtrarHistoricoPorAdversario(2);
      expect(filtered).toHaveLength(1);
    });

    it('should return empty array for non-existent opponent', () => {
      const filtered = filtrarHistoricoPorAdversario(999);
      expect(filtered).toEqual([]);
    });

    it('should support both clube_id and id fields', () => {
      const matches = [
        { numero_rodada: 1, adversario: { clube_id: 5 } },
        { numero_rodada: 2, adversario: { id: 5 } }
      ];
      localStorage.setItem('cartola_historico', JSON.stringify(matches));

      const filtered = filtrarHistoricoPorAdversario(5);
      expect(filtered).toHaveLength(2);
    });
  });

  describe('calcularEstatisticasSeason()', () => {
    it('should calculate wins, draws, losses', () => {
      const historico = [
        { placar: { casa: 2, visitante: 1 } }, // win
        { placar: { casa: 1, visitante: 1 } }, // draw
        { placar: { casa: 0, visitante: 2 } }  // loss
      ];

      const stats = calcularEstatisticasSeason(historico);
      expect(stats.vitorias).toBe(1);
      expect(stats.empates).toBe(1);
      expect(stats.derrotas).toBe(1);
    });

    it('should sum goals for and against', () => {
      const historico = [
        { placar: { casa: 3, visitante: 1 } },
        { placar: { casa: 2, visitante: 2 } }
      ];

      const stats = calcularEstatisticasSeason(historico);
      expect(stats.gols_pro).toBe(5);
      expect(stats.gols_contra).toBe(3);
    });

    it('should calculate goal difference', () => {
      const historico = [
        { placar: { casa: 5, visitante: 2 } },
        { placar: { casa: 1, visitante: 3 } }
      ];

      const stats = calcularEstatisticasSeason(historico);
      expect(stats.saldo).toBe(1); // (5+1) - (2+3)
    });

    it('should handle empty history', () => {
      const stats = calcularEstatisticasSeason([]);
      expect(stats.vitorias).toBe(0);
      expect(stats.derrotas).toBe(0);
      expect(stats.empates).toBe(0);
      expect(stats.gols_pro).toBe(0);
      expect(stats.gols_contra).toBe(0);
      expect(stats.saldo).toBe(0);
    });

    it('should handle invalid input', () => {
      expect(calcularEstatisticasSeason(null)).toBeDefined();
      expect(calcularEstatisticasSeason(undefined)).toBeDefined();
      expect(calcularEstatisticasSeason('not array')).toBeDefined();
    });

    it('should handle missing placar field', () => {
      const historico = [
        { numero_rodada: 1 },
        { placar: { casa: 2, visitante: 1 } }
      ];

      const stats = calcularEstatisticasSeason(historico);
      expect(stats.gols_pro).toBe(2);
      expect(stats.vitorias).toBe(1);
    });
  });

  describe('renderCartaoHistorico()', () => {
    it('should create div element with correct class', () => {
      const match = {
        numero_rodada: 1,
        placar: { casa: 2, visitante: 1 },
        adversario: { nome: 'Flamengo' }
      };

      const card = renderCartaoHistorico(match);
      expect(card.tagName).toBe('DIV');
      expect(card.className).toBe('historia-card');
    });

    it('should display round number', () => {
      const match = {
        numero_rodada: 5,
        placar: { casa: 1, visitante: 1 },
        adversario: {}
      };

      const card = renderCartaoHistorico(match);
      expect(card.innerHTML).toContain('Rodada 5');
    });

    it('should display result class correctly', () => {
      const win = { numero_rodada: 1, placar: { casa: 2, visitante: 1 }, adversario: {} };
      const loss = { numero_rodada: 2, placar: { casa: 0, visitante: 2 }, adversario: {} };
      const draw = { numero_rodada: 3, placar: { casa: 1, visitante: 1 }, adversario: {} };

      expect(renderCartaoHistorico(win).innerHTML).toContain('win');
      expect(renderCartaoHistorico(loss).innerHTML).toContain('loss');
      expect(renderCartaoHistorico(draw).innerHTML).toContain('draw');
    });

    it('should display score', () => {
      const match = {
        numero_rodada: 1,
        placar: { casa: 3, visitante: 2 },
        adversario: { nome: 'Test' }
      };

      const card = renderCartaoHistorico(match);
      expect(card.innerHTML).toContain('3');
      expect(card.innerHTML).toContain('2');
    });

    it('should display opponent name', () => {
      const match = {
        numero_rodada: 1,
        placar: { casa: 1, visitante: 1 },
        adversario: { nome: 'Flamengo' }
      };

      const card = renderCartaoHistorico(match);
      expect(card.innerHTML).toContain('Flamengo');
    });

    it('should handle missing data fields', () => {
      const match = {};
      expect(() => renderCartaoHistorico(match)).not.toThrow();
      const card = renderCartaoHistorico(match);
      expect(card.innerHTML).toContain('-');
    });
  });

  describe('renderTimelineHistorico()', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should render content', () => {
      const historico = [];
      renderTimelineHistorico(container, historico);
      // Should have rendered something
      expect(container.innerHTML.length).toBeGreaterThan(0);
    });

    it('should render all matches', () => {
      const historico = [
        { numero_rodada: 1, placar: { casa: 2, visitante: 1 }, adversario: { nome: 'A' } },
        { numero_rodada: 2, placar: { casa: 1, visitante: 1 }, adversario: { nome: 'B' } }
      ];

      renderTimelineHistorico(container, historico);
      expect(container.querySelectorAll('.historia-card')).toHaveLength(2);
    });

    it('should sort by round descending (most recent first)', () => {
      const historico = [
        { numero_rodada: 1, placar: { casa: 2, visitante: 1 }, adversario: {} },
        { numero_rodada: 3, placar: { casa: 1, visitante: 1 }, adversario: {} },
        { numero_rodada: 2, placar: { casa: 0, visitante: 2 }, adversario: {} }
      ];

      renderTimelineHistorico(container, historico);
      const cards = container.querySelectorAll('.historia-card');
      expect(cards[0].innerHTML).toContain('Rodada 3');
      expect(cards[1].innerHTML).toContain('Rodada 2');
      expect(cards[2].innerHTML).toContain('Rodada 1');
    });

    it('should show message when no history', () => {
      renderTimelineHistorico(container, []);
      expect(container.innerHTML).toContain('Nenhum histórico');
    });

    it('should clear previous content', () => {
      container.innerHTML = '<p>Old content</p>';
      renderTimelineHistorico(container, []);
      expect(container.innerHTML).not.toContain('Old content');
    });

    it('should handle null container gracefully', () => {
      expect(() => renderTimelineHistorico(null, [])).not.toThrow();
    });
  });

  describe('obterUltimosResultados()', () => {
    beforeEach(() => {
      const matches = [
        { numero_rodada: 1, placar: { casa: 2, visitante: 1 } },
        { numero_rodada: 2, placar: { casa: 1, visitante: 1 } },
        { numero_rodada: 3, placar: { casa: 0, visitante: 2 } },
        { numero_rodada: 4, placar: { casa: 3, visitante: 1 } },
        { numero_rodada: 5, placar: { casa: 1, visitante: 1 } },
        { numero_rodada: 6, placar: { casa: 2, visitante: 2 } }
      ];
      localStorage.setItem('cartola_historico', JSON.stringify(matches));
    });

    it('should return last 5 matches by default', () => {
      const results = obterUltimosResultados();
      expect(results).toHaveLength(5);
      expect(results[0].numero_rodada).toBe(6); // Most recent first
    });

    it('should return specified limit', () => {
      const results = obterUltimosResultados(3);
      expect(results).toHaveLength(3);
      expect(results[0].numero_rodada).toBe(6);
    });

    it('should return all if fewer matches exist', () => {
      const results = obterUltimosResultados(100);
      expect(results).toHaveLength(6);
    });

    it('should return empty for empty history', () => {
      localStorage.clear();
      const results = obterUltimosResultados();
      expect(results).toEqual([]);
    });

    it('should sort by round descending', () => {
      const results = obterUltimosResultados(3);
      expect(results[0].numero_rodada).toBeGreaterThan(results[1].numero_rodada);
      expect(results[1].numero_rodada).toBeGreaterThan(results[2].numero_rodada);
    });
  });
});

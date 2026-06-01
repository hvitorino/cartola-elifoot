/**
 * Unit tests for standings module
 */

import {
  renderTabelaClassificacao,
  ordenarTabela,
  obterPosicaoDoClube
} from './standings.js';

describe('Standings Module', () => {
  describe('ordenarTabela()', () => {
    const unsorted = [
      { posicao: 1, clube_id: 2, nome_clube: 'Flamengo', pontos: 45, gols_pro: 42, gols_contra: 10, saldo: 32 },
      { posicao: 2, clube_id: 3, nome_clube: 'Vasco', pontos: 45, gols_pro: 40, gols_contra: 15, saldo: 25 },
      { posicao: 3, clube_id: 1, nome_clube: 'Palmeiras', pontos: 50, gols_pro: 48, gols_contra: 8, saldo: 40 },
      { posicao: 4, clube_id: 4, nome_clube: 'Botafogo', pontos: 40, gols_pro: 35, gols_contra: 20, saldo: 15 }
    ];

    it('should sort by points descending', () => {
      const sorted = ordenarTabela(unsorted);
      expect(sorted[0].pontos).toBe(50);
      expect(sorted[sorted.length - 1].pontos).toBe(40);
    });

    it('should sort by goal difference when points are equal', () => {
      const tied = [
        { clube_id: 1, nome_clube: 'A', pontos: 45, gols_pro: 40, gols_contra: 10, saldo: 30 },
        { clube_id: 2, nome_clube: 'B', pontos: 45, gols_pro: 42, gols_contra: 15, saldo: 27 },
        { clube_id: 3, nome_clube: 'C', pontos: 45, gols_pro: 45, gols_contra: 5, saldo: 40 }
      ];
      const sorted = ordenarTabela(tied);
      expect(sorted[0].gols_pro).toBe(45);
      expect(sorted[1].gols_pro).toBe(40);
    });

    it('should sort by goals scored when points and saldo are equal', () => {
      const veryTied = [
        { clube_id: 1, nome_clube: 'A', pontos: 45, gols_pro: 30, gols_contra: 10, saldo: 20 },
        { clube_id: 2, nome_clube: 'B', pontos: 45, gols_pro: 35, gols_contra: 15, saldo: 20 },
        { clube_id: 3, nome_clube: 'C', pontos: 45, gols_pro: 40, gols_contra: 20, saldo: 20 }
      ];
      const sorted = ordenarTabela(veryTied);
      expect(sorted[0].gols_pro).toBe(40);
      expect(sorted[1].gols_pro).toBe(35);
      expect(sorted[2].gols_pro).toBe(30);
    });

    it('should return empty array for invalid input', () => {
      expect(ordenarTabela(null)).toEqual([]);
      expect(ordenarTabela(undefined)).toEqual([]);
      expect(ordenarTabela('not array')).toEqual([]);
    });

    it('should not mutate original array', () => {
      const original = [...unsorted];
      ordenarTabela(unsorted);
      expect(unsorted).toEqual(original);
    });

    it('should handle missing fields with defaults', () => {
      const incomplete = [
        { clube_id: 1, nome_clube: 'A' },
        { clube_id: 2, nome_clube: 'B', pontos: 10 }
      ];
      const sorted = ordenarTabela(incomplete);
      expect(sorted).toHaveLength(2);
    });
  });

  describe('obterPosicaoDoClube()', () => {
    const tabela = [
      { posicao: 1, clube_id: 2, nome_clube: 'Flamengo' },
      { posicao: 2, clube_id: 3, nome_clube: 'Vasco' },
      { posicao: 3, clube_id: 1, nome_clube: 'Palmeiras' }
    ];

    it('should return position for valid club', () => {
      expect(obterPosicaoDoClube(2, tabela)).toBe(1);
      expect(obterPosicaoDoClube(3, tabela)).toBe(2);
      expect(obterPosicaoDoClube(1, tabela)).toBe(3);
    });

    it('should return null for club not in standings', () => {
      expect(obterPosicaoDoClube(999, tabela)).toBeNull();
    });

    it('should return null for invalid clubeId', () => {
      expect(obterPosicaoDoClube(null, tabela)).toBeNull();
      expect(obterPosicaoDoClube(undefined, tabela)).toBeNull();
    });

    it('should return null for invalid tabela', () => {
      expect(obterPosicaoDoClube(1, null)).toBeNull();
      expect(obterPosicaoDoClube(1, undefined)).toBeNull();
      expect(obterPosicaoDoClube(1, 'not array')).toBeNull();
    });
  });

  describe('renderTabelaClassificacao()', () => {
    let container;
    const tabela = [
      { posicao: 1, clube_id: 2, nome_clube: 'Flamengo', jogos: 15, vitorias: 14, empates: 0, derrotas: 1, gols_pro: 42, gols_contra: 10, saldo: 32, pontos: 45 },
      { posicao: 2, clube_id: 3, nome_clube: 'Vasco', jogos: 15, vitorias: 13, empates: 1, derrotas: 1, gols_pro: 40, gols_contra: 15, saldo: 25, pontos: 40 }
    ];

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      if (container && container.parentNode) {
        document.body.removeChild(container);
      }
    });

    it('should render standings table with correct columns', () => {
      renderTabelaClassificacao(tabela, null, container);
      expect(container.innerHTML).toContain('<table');
      expect(container.innerHTML).toContain('Pos');
      expect(container.innerHTML).toContain('Clube');
      expect(container.innerHTML).toContain('Pts');
    });

    it('should highlight current club row', () => {
      renderTabelaClassificacao(tabela, 2, container);
      expect(container.innerHTML).toContain('current-club');
    });

    it('should render all clubs', () => {
      renderTabelaClassificacao(tabela, null, container);
      expect(container.innerHTML).toContain('Flamengo');
      expect(container.innerHTML).toContain('Vasco');
    });

    it('should display stats correctly', () => {
      renderTabelaClassificacao(tabela, null, container);
      expect(container.innerHTML).toContain('42'); // goals for
      expect(container.innerHTML).toContain('10'); // goals against
      expect(container.innerHTML).toContain('45'); // points
    });

    it('should show message for empty table', () => {
      renderTabelaClassificacao([], null, container);
      expect(container.innerHTML).toContain('Nenhuma classificação');
    });

    it('should handle null container gracefully', () => {
      expect(() => renderTabelaClassificacao(tabela, null, null)).not.toThrow();
    });

    it('should handle missing fields with defaults', () => {
      const incompleteTabela = [
        { posicao: 1, clube_id: 1, nome_clube: 'Test' }
      ];
      renderTabelaClassificacao(incompleteTabela, null, container);
      expect(container.innerHTML).toContain('Test');
      expect(container.innerHTML).toContain('0'); // defaults
    });

    it('should calculate saldo when not provided', () => {
      const tabelaSemSaldo = [
        { posicao: 1, clube_id: 1, nome_clube: 'Test', gols_pro: 30, gols_contra: 10 }
      ];
      renderTabelaClassificacao(tabelaSemSaldo, null, container);
      expect(container.innerHTML).toContain('20'); // calculated saldo
    });
  });
});

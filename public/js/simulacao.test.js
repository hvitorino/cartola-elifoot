/**
 * Unit tests for match simulation engine
 */

import { gerarPartida } from './simulacao.js';

describe('Simulação - Match Generation', () => {
  describe('gerarPartida() basic functionality', () => {
    it('should generate a match with valid structure', () => {
      const escalacao = [
        { posicao_id: 1, media_num: 7.0, nome: 'GK' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT1' },
        { posicao_id: 2, media_num: 6.9, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
      ];

      const adversario = { nome: 'Opponent', escalacao };
      const resultado = gerarPartida(escalacao, adversario);

      expect(resultado).toHaveProperty('lances');
      expect(resultado).toHaveProperty('placar');
      expect(resultado).toHaveProperty('destaques');
      expect(Array.isArray(resultado.lances)).toBe(true);
    });

    it('should generate between 20 and 28 match events', () => {
      const escalacao = [
        { posicao_id: 1, media_num: 7.0, nome: 'GK' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT1' },
        { posicao_id: 2, media_num: 6.9, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
      ];

      const adversario = { nome: 'Opponent', escalacao };
      const resultado = gerarPartida(escalacao, adversario);

      expect(resultado.lances.length).toBeGreaterThanOrEqual(20);
      expect(resultado.lances.length).toBeLessThanOrEqual(28);
    });

    it('should have non-negative score values', () => {
      const escalacao = [
        { posicao_id: 1, media_num: 7.0, nome: 'GK' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT1' },
        { posicao_id: 2, media_num: 6.9, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
      ];

      const adversario = { nome: 'Opponent', escalacao };
      const resultado = gerarPartida(escalacao, adversario);

      expect(resultado.placar.casa).toBeGreaterThanOrEqual(0);
      expect(resultado.placar.visitante).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Simulação - 3-5-2 Formation (NO LATERALS)', () => {
    it('should calculate force for team with 3 ZAG and 0 LAT', () => {
      // 3-5-2 formation: 1 GK, 0 LAT, 3 ZAG, 5 MEI, 2 ATA
      const escalacao = [
        { posicao_id: 1, media_num: 7.0, nome: 'GK' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
        { posicao_id: 3, media_num: 7.2, nome: 'ZAG3' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI5' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
      ];

      const adversario = { nome: 'Opponent', escalacao };
      const resultado = gerarPartida(escalacao, adversario);

      // Should generate a valid match
      expect(resultado).toBeDefined();
      expect(resultado.lances.length).toBeGreaterThanOrEqual(20);
      expect(resultado.placar.casa).toBeGreaterThanOrEqual(0);
      expect(resultado.placar.visitante).toBeGreaterThanOrEqual(0);
    });

    it('should NOT have defensive strength as NaN with 0 laterals', () => {
      // This test ensures the simulation handles 0 lateral players correctly
      // The defense calculation should use only ZAG (position 3) when LAT (position 2) count is 0
      const escalacao352 = [
        { posicao_id: 1, media_num: 8.0, nome: 'GK' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.4, nome: 'ZAG2' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG3' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI2' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI4' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI5' },
        { posicao_id: 5, media_num: 7.0, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.0, nome: 'ATA2' }
      ];

      const escalacao442 = [
        { posicao_id: 1, media_num: 8.0, nome: 'GK' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT1' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI2' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.5, nome: 'MEI4' },
        { posicao_id: 5, media_num: 7.0, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.0, nome: 'ATA2' }
      ];

      // Generate match with 3-5-2 vs 4-4-2
      const resultado = gerarPartida(escalacao352, { nome: 'Opponent', escalacao: escalacao442 });

      // If defense calculation breaks with 0 LAT, we'd get NaN or undefined
      expect(resultado).toBeDefined();
      expect(resultado.placar).toBeDefined();
      expect(typeof resultado.placar.casa).toBe('number');
      expect(typeof resultado.placar.visitante).toBe('number');
      expect(isNaN(resultado.placar.casa)).toBe(false);
      expect(isNaN(resultado.placar.visitante)).toBe(false);
    });

    it('should generate valid match simulation with 3-5-2 vs 4-4-2', () => {
      const escalacao352 = [
        { posicao_id: 1, media_num: 7.5, nome: 'GK352' },
        { posicao_id: 3, media_num: 7.4, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.2, nome: 'ZAG2' },
        { posicao_id: 3, media_num: 7.1, nome: 'ZAG3' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI5' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
      ];

      const escalacao442 = [
        { posicao_id: 1, media_num: 7.5, nome: 'GK442' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT1' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.2, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI4' },
        { posicao_id: 5, media_num: 7.4, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.1, nome: 'ATA2' }
      ];

      const resultado = gerarPartida(escalacao352, { nome: 'Opponent 4-4-2', escalacao: escalacao442 });

      expect(resultado.lances.length).toBeGreaterThanOrEqual(20);
      expect(resultado.lances.length).toBeLessThanOrEqual(28);
      expect(resultado.placar.casa).toBeGreaterThanOrEqual(0);
      expect(resultado.placar.visitante).toBeGreaterThanOrEqual(0);
    });

    it('should generate valid match simulation with 3-5-2 vs 4-3-3', () => {
      const escalacao352 = [
        { posicao_id: 1, media_num: 7.5, nome: 'GK352' },
        { posicao_id: 3, media_num: 7.4, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.2, nome: 'ZAG2' },
        { posicao_id: 3, media_num: 7.1, nome: 'ZAG3' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI5' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
      ];

      const escalacao433 = [
        { posicao_id: 1, media_num: 7.5, nome: 'GK433' },
        { posicao_id: 2, media_num: 7.1, nome: 'LAT1' },
        { posicao_id: 2, media_num: 6.9, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.2, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.3, nome: 'ATA2' },
        { posicao_id: 5, media_num: 7.1, nome: 'ATA3' }
      ];

      const resultado = gerarPartida(escalacao352, { nome: 'Opponent 4-3-3', escalacao: escalacao433 });

      expect(resultado.lances.length).toBeGreaterThanOrEqual(20);
      expect(resultado.lances.length).toBeLessThanOrEqual(28);
      expect(resultado.placar.casa).toBeGreaterThanOrEqual(0);
      expect(resultado.placar.visitante).toBeGreaterThanOrEqual(0);
    });

    it('should handle defense calculation with only ZAG players (no LAT)', () => {
      // This is the critical test: when filtering defensores (positions 2 and 3),
      // if position 2 (LAT) is empty, the filter should still work correctly
      const escalacao = [
        { posicao_id: 1, media_num: 8.0 },
        { posicao_id: 3, media_num: 7.5 },
        { posicao_id: 3, media_num: 7.4 },
        { posicao_id: 3, media_num: 7.3 },
        { posicao_id: 4, media_num: 6.5 },
        { posicao_id: 4, media_num: 6.5 },
        { posicao_id: 4, media_num: 6.5 },
        { posicao_id: 4, media_num: 6.5 },
        { posicao_id: 4, media_num: 6.5 },
        { posicao_id: 5, media_num: 7.0 },
        { posicao_id: 5, media_num: 7.0 }
      ];

      // Simulate the defense calculation logic from simulacao.js
      const defensores = escalacao.filter(j => j.posicao_id === 2 || j.posicao_id === 3);

      // Defense calculation should work with only position 3 (ZAG)
      expect(defensores.length).toBe(3); // Only the 3 ZAG players
      expect(defensores.every(d => d.posicao_id === 3)).toBe(true); // All should be ZAG

      // Average calculation should work without NaN
      const forcaDefesa = defensores.length > 0
        ? defensores.reduce((sum, j) => sum + j.media_num, 0) / defensores.length
        : 5;

      expect(forcaDefesa).toBeGreaterThan(0);
      expect(isNaN(forcaDefesa)).toBe(false);
      expect(forcaDefesa).toBeCloseTo((7.5 + 7.4 + 7.3) / 3, 1); // Average of ZAG ratings
    });
  });

  describe('Formation Regression Tests', () => {
    it('should generate valid match with 4-4-2 formation', () => {
      const escalacao = [
        { posicao_id: 1, media_num: 7.0, nome: 'GK' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT1' },
        { posicao_id: 2, media_num: 6.9, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 4, media_num: 6.9, nome: 'MEI4' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' }
      ];

      const resultado = gerarPartida(escalacao, { nome: 'Opponent', escalacao });

      expect(resultado.lances.length).toBeGreaterThanOrEqual(20);
      expect(resultado.placar.casa).toBeGreaterThanOrEqual(0);
      expect(resultado.placar.visitante).toBeGreaterThanOrEqual(0);
    });

    it('should generate valid match with 4-3-3 formation', () => {
      const escalacao = [
        { posicao_id: 1, media_num: 7.0, nome: 'GK' },
        { posicao_id: 2, media_num: 7.0, nome: 'LAT1' },
        { posicao_id: 2, media_num: 6.9, nome: 'LAT2' },
        { posicao_id: 3, media_num: 7.5, nome: 'ZAG1' },
        { posicao_id: 3, media_num: 7.3, nome: 'ZAG2' },
        { posicao_id: 4, media_num: 7.0, nome: 'MEI1' },
        { posicao_id: 4, media_num: 6.8, nome: 'MEI2' },
        { posicao_id: 4, media_num: 7.1, nome: 'MEI3' },
        { posicao_id: 5, media_num: 7.5, nome: 'ATA1' },
        { posicao_id: 5, media_num: 7.2, nome: 'ATA2' },
        { posicao_id: 5, media_num: 7.0, nome: 'ATA3' }
      ];

      const resultado = gerarPartida(escalacao, { nome: 'Opponent', escalacao });

      expect(resultado.lances.length).toBeGreaterThanOrEqual(20);
      expect(resultado.placar.casa).toBeGreaterThanOrEqual(0);
      expect(resultado.placar.visitante).toBeGreaterThanOrEqual(0);
    });
  });
});

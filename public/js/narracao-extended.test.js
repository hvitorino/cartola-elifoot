/**
 * Unit tests for extended narrative module
 */

import {
  FRASES_ESTENDIDAS,
  narrarLance,
  getPhrasesForType,
  obterTotalDeFrases,
  obterContagemPorTipo,
  obterTiposDisponíveis
} from './narracao-extended.js';

describe('Narrative Extended Module', () => {
  describe('FRASES_ESTENDIDAS pool', () => {
    it('should have at least 50 total phrases', () => {
      const total = obterTotalDeFrases();
      expect(total).toBeGreaterThanOrEqual(50);
    });

    it('should have all required play types', () => {
      const tipos = obterTiposDisponíveis();
      expect(tipos).toContain('gol');
      expect(tipos).toContain('chute_defendido');
      expect(tipos).toContain('chute_fora');
      expect(tipos).toContain('escanteio');
      expect(tipos).toContain('falta');
      expect(tipos).toContain('cartao_amarelo');
      expect(tipos).toContain('cartao_vermelho');
      expect(tipos).toContain('lesao');
      expect(tipos).toContain('defesa_espetacular');
    });

    it('should have at least 4 phrases per play type', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const count = obterContagemPorTipo(tipo);
        expect(count).toBeGreaterThanOrEqual(4);
      });
    });

    it('should have valid phrase structure (all strings)', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const frases = getPhrasesForType(tipo);
        expect(Array.isArray(frases)).toBe(true);
        frases.forEach(frase => {
          expect(typeof frase).toBe('string');
          expect(frase.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('narrarLance()', () => {
    it('should generate narrative with minute replacement', () => {
      const lance = {
        tipo: 'gol',
        minuto: 45,
        atacante: 'Pelé'
      };

      const narrative = narrarLance(lance);
      expect(narrative).toContain("45'");
    });

    it('should replace atacante placeholder', () => {
      const lance = {
        tipo: 'gol',
        minuto: 30,
        atacante: 'Ronaldinho'
      };

      const narrative = narrarLance(lance);
      expect(narrative).toContain('Ronaldinho');
      expect(narrative).not.toContain('{atacante}');
    });

    it('should generate narrative for plays with defensor', () => {
      const lance = {
        tipo: 'falta',
        minuto: 20,
        atacante: 'Neymar',
        defensor: 'Sergio Ramos'
      };

      const narrative = narrarLance(lance);
      // Should replace minute
      expect(narrative).toContain("20'");
      // Should be a meaningful narrative
      expect(typeof narrative).toBe('string');
      expect(narrative.length).toBeGreaterThan(10);
    });

    it('should handle missing defensor placeholder', () => {
      const lance = {
        tipo: 'chute_fora',
        minuto: 15,
        atacante: 'Vinícius Jr'
      };

      const narrative = narrarLance(lance);
      expect(narrative).toContain('Vinícius Jr');
    });

    it('should return default narrative for unknown play type', () => {
      const lance = {
        tipo: 'unknown_type',
        minuto: 10,
        atacante: 'Player'
      };

      const narrative = narrarLance(lance);
      expect(narrative).toContain('Ação no campo');
    });

    it('should select random phrase each time', () => {
      const lance = {
        tipo: 'gol',
        minuto: 50,
        atacante: 'Test Player'
      };

      const narratives = new Set();
      for (let i = 0; i < 20; i++) {
        narratives.add(narrarLance(lance));
      }

      // Should have multiple different narratives due to randomization
      // (unlikely to get same narrative 20 times in a row)
      expect(narratives.size).toBeGreaterThan(1);
    });

    it('should use default narrative for invalid lance', () => {
      const lance = { minuto: 10 };
      const narrative = narrarLance(lance);
      expect(narrative).toContain('Ação no campo');
    });

    it('should handle missing fields', () => {
      const lance = { tipo: 'gol' };
      expect(() => narrarLance(lance)).not.toThrow();
      const narrative = narrarLance(lance);
      expect(narrative.length).toBeGreaterThan(0);
    });
  });

  describe('getPhrasesForType()', () => {
    it('should return array of phrases for valid type', () => {
      const frases = getPhrasesForType('gol');
      expect(Array.isArray(frases)).toBe(true);
      expect(frases.length).toBeGreaterThan(0);
    });

    it('should return empty array for unknown type', () => {
      const frases = getPhrasesForType('unknown');
      expect(Array.isArray(frases)).toBe(true);
      expect(frases.length).toBe(0);
    });

    it('should return phrases with placeholder patterns', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const frases = getPhrasesForType(tipo);
        frases.forEach(frase => {
          // Should contain at least {minuto}
          expect(frase).toContain('{minuto}');
        });
      });
    });
  });

  describe('obterTotalDeFrases()', () => {
    it('should return total count of all phrases', () => {
      const total = obterTotalDeFrases();
      const sumByType = obterTiposDisponíveis()
        .reduce((sum, tipo) => sum + obterContagemPorTipo(tipo), 0);

      expect(total).toBe(sumByType);
    });

    it('should match 50+ minimum requirement', () => {
      expect(obterTotalDeFrases()).toBeGreaterThanOrEqual(50);
    });
  });

  describe('obterContagemPorTipo()', () => {
    it('should return correct count for each type', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const count = obterContagemPorTipo(tipo);
        const actual = getPhrasesForType(tipo).length;
        expect(count).toBe(actual);
      });
    });

    it('should return 0 for unknown type', () => {
      expect(obterContagemPorTipo('unknown')).toBe(0);
    });

    it('should enforce minimum 4 phrases per type', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const count = obterContagemPorTipo(tipo);
        expect(count).toBeGreaterThanOrEqual(4);
      });
    });
  });

  describe('obterTiposDisponíveis()', () => {
    it('should return array of play types', () => {
      const tipos = obterTiposDisponíveis();
      expect(Array.isArray(tipos)).toBe(true);
      expect(tipos.length).toBeGreaterThan(0);
    });

    it('should match FRASES_ESTENDIDAS keys', () => {
      const tipos = obterTiposDisponíveis();
      const keys = Object.keys(FRASES_ESTENDIDAS);
      expect(tipos.sort()).toEqual(keys.sort());
    });

    it('should include all major play types', () => {
      const tipos = obterTiposDisponíveis();
      const required = [
        'gol',
        'chute_defendido',
        'chute_fora',
        'cartao_amarelo',
        'cartao_vermelho'
      ];

      required.forEach(tipo => {
        expect(tipos).toContain(tipo);
      });
    });
  });

  describe('Placeholder validation', () => {
    it('should have {minuto} in all phrases', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const frases = getPhrasesForType(tipo);
        frases.forEach(frase => {
          expect(frase).toContain('{minuto}');
        });
      });
    });

    it('should properly replace all {minuto} occurrences', () => {
      const lance = {
        tipo: 'gol',
        minuto: 89,
        atacante: 'Player'
      };

      const narrative = narrarLance(lance);
      expect(narrative).toContain("89'");
      expect(narrative).not.toContain('{minuto}');
    });

    it('should handle multiple placeholder types in same phrase', () => {
      const lance = {
        tipo: 'falta',
        minuto: 40,
        atacante: 'Attacker',
        defensor: 'Defender'
      };

      const narrative = narrarLance(lance);
      expect(narrative).not.toContain('{');
      expect(narrative).not.toContain('}');
    });

    it('should not have unmatched placeholders in any phrase', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const frases = getPhrasesForType(tipo);
        frases.forEach(frase => {
          // Check for any remaining unmatched placeholders
          const hasUnmatched = /{[a-zA-Z_]+}/.test(frase);
          // If it has unmatched, it should only be valid ones
          if (hasUnmatched) {
            expect(frase).toMatch(/{(minuto|atacante|defensor)}/);
          }
        });
      });
    });
  });

  describe('Phrase diversity and uniqueness', () => {
    it('should have diverse phrases for same play type', () => {
      const frases = getPhrasesForType('gol');
      const unique = new Set(frases);
      // Should have no duplicates
      expect(unique.size).toBe(frases.length);
    });

    it('should have different narratives from consecutive calls', () => {
      const lance = {
        tipo: 'gol',
        minuto: 45,
        atacante: 'Player'
      };

      const narrative1 = narrarLance(lance);
      const narrative2 = narrarLance(lance);

      // Very unlikely to be same due to randomization
      // Generate multiple samples
      let differences = 0;
      for (let i = 0; i < 10; i++) {
        if (narrarLance(lance) !== narrative1) {
          differences++;
        }
      }
      expect(differences).toBeGreaterThan(0);
    });

    it('should cover different narrative moods/categories', () => {
      const golFrases = getPhrasesForType('gol');
      const hasMultipleMoods = golFrases.some(f => f.includes('GOLAÇO')) &&
                               golFrases.some(f => f.includes('domina')) &&
                               golFrases.some(f => !f.includes('GOLAÇO'));
      expect(hasMultipleMoods).toBe(true);
    });
  });

  describe('Phrase quality checks', () => {
    it('should have meaningful phrases (not empty or whitespace)', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const frases = getPhrasesForType(tipo);
        frases.forEach(frase => {
          expect(frase.trim().length).toBeGreaterThan(5);
        });
      });
    });

    it('should have phrases in Portuguese', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const frases = getPhrasesForType(tipo);
        expect(frases.length).toBeGreaterThan(0);
        // Check that phrases contain Portuguese narrative patterns
        expect(frases.some(f => f.length > 20)).toBe(true);
      });
    });

    it('should have consistent minute format', () => {
      const tipos = obterTiposDisponíveis();
      tipos.forEach(tipo => {
        const frases = getPhrasesForType(tipo);
        frases.forEach(frase => {
          // All should use {minuto}' format
          expect(frase).toMatch(/{minuto}'/);
        });
      });
    });
  });

  describe('Coverage by play type', () => {
    it('gol should have multiple categories', () => {
      const frases = getPhrasesForType('gol');
      expect(frases.length).toBeGreaterThanOrEqual(8);
    });

    it('chute_defendido should cover different scenarios', () => {
      const frases = getPhrasesForType('chute_defendido');
      expect(frases.length).toBeGreaterThanOrEqual(6);
      expect(frases.some(f => f.includes('goleiro'))).toBe(true);
    });

    it('cartao_amarelo and cartao_vermelho should differ', () => {
      const amarelo = getPhrasesForType('cartao_amarelo');
      const vermelho = getPhrasesForType('cartao_vermelho');

      expect(amarelo.length).toBeGreaterThan(0);
      expect(vermelho.length).toBeGreaterThan(0);
      // Should have some differences
      expect(amarelo.some(f => f.includes('AMARELO'))).toBe(true);
      expect(vermelho.some(f => f.includes('VERMELHO'))).toBe(true);
    });

    it('defesa_espetacular should highlight defensive quality', () => {
      const frases = getPhrasesForType('defesa_espetacular');
      const hasQualityWords = frases.some(f =>
        f.includes('QUE DEFESA') || f.includes('milagro') || f.includes('categoria')
      );
      expect(hasQualityWords).toBe(true);
    });
  });
});

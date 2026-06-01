/**
 * Browser-side module tests for Cartola Elifoot
 * Tests client-side JavaScript modules: estado, simulacao, narracao, mock_data
 *
 * Note: These tests import ES6 modules directly since they don't use DOM APIs
 * Mock localStorage for Node.js environment
 */

import assert from 'assert';

// Mock localStorage for Node.js environment
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, value) => {
    mockStorage[key] = String(value);
  },
  removeItem: (key) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const key in mockStorage) {
      delete mockStorage[key];
    }
  }
};

// Import the modules we're testing
import * as estado from '../public/js/estado.js';
import * as mockData from '../public/js/mock_data.js';
import * as simulacao from '../public/js/simulacao.js';
import * as narracao from '../public/js/narracao.js';

let passCount = 0;
let failCount = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log(`✓ ${name}`);
  } catch (err) {
    failCount++;
    failures.push(`${name}: ${err.message}`);
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
  }
}

async function runTests() {
  console.log('\n=== CARTOLA ELIFOOT BROWSER MODULE TEST SUITE ===\n');

  // ===== MOCK DATA TESTS =====
  console.log('Mock Data Tests:');

  test('mockData.getClubs() returns 20 clubs', () => {
    const clubs = mockData.getClubs();
    assert(Array.isArray(clubs), 'Should return array');
    assert(clubs.length === 20, `Expected 20 clubs, got ${clubs.length}`);
  });

  test('Each club has required fields', () => {
    const clubs = mockData.getClubs();
    clubs.forEach((club, idx) => {
      assert(typeof club.id === 'number', `Club ${idx} id should be number`);
      assert(typeof club.nome === 'string', `Club ${idx} nome should be string`);
      assert(typeof club.abreviacao === 'string', `Club ${idx} abreviacao should be string`);
    });
  });

  test('mockData.getPlayers() returns 50+ players', () => {
    const players = mockData.getPlayers();
    assert(Array.isArray(players), 'Should return array');
    assert(players.length >= 50, `Expected 50+ players, got ${players.length}`);
  });

  test('Each player has required fields', () => {
    const players = mockData.getPlayers();
    players.forEach((player, idx) => {
      assert(typeof player.atleta_id === 'number', `Player ${idx} atleta_id should be number`);
      assert(typeof player.nome === 'string', `Player ${idx} nome should be string`);
      assert(typeof player.posicao_id === 'number', `Player ${idx} posicao_id should be number`);
      assert(typeof player.clube_id === 'number', `Player ${idx} clube_id should be number`);
      assert(typeof player.media_num === 'number', `Player ${idx} media_num should be number`);
    });
  });

  test('Players distributed across positions 1-5', () => {
    const players = mockData.getPlayers();
    const positions = new Set(players.map(p => p.posicao_id));
    assert(positions.has(1), 'Should have position 1 (GOL)');
    assert(positions.has(2), 'Should have position 2 (LAT)');
    assert(positions.has(3), 'Should have position 3 (ZAG)');
    assert(positions.has(4), 'Should have position 4 (MEI)');
    assert(positions.has(5), 'Should have position 5 (ATA)');
  });

  test('mockData.getPartidas() returns at least 3 matches', () => {
    const partidas = mockData.getPartidas();
    assert(Array.isArray(partidas), 'Should return array');
    assert(partidas.length >= 3, `Expected 3+ matches, got ${partidas.length}`);
  });

  test('Each match has required fields', () => {
    const partidas = mockData.getPartidas();
    partidas.forEach((match, idx) => {
      assert(typeof match.id === 'number', `Match ${idx} id should be number`);
      assert(typeof match.clube_casa_id === 'number', `Match ${idx} clube_casa_id should be number`);
      assert(typeof match.clube_visitante_id === 'number', `Match ${idx} clube_visitante_id should be number`);
    });
  });

  // ===== STATE MANAGEMENT TESTS =====
  console.log('\nState Management Tests:');

  test('estadoInicial() returns correct default structure', () => {
    const state = estado.estadoInicial();
    assert(state.clubeId === null, 'clubeId should be null');
    assert(state.rodadaAtual === 1, 'rodadaAtual should be 1');
    assert(Array.isArray(state.escalacaoAtual), 'escalacaoAtual should be array');
    assert(state.esquemaTatico === '4-4-2', 'esquemaTatico should be 4-4-2');
    assert(Array.isArray(state.tabela), 'tabela should be array');
    assert(Array.isArray(state.historico), 'historico should be array');
  });

  test('setEstado() and getEstado() persist data', () => {
    estado.resetEstado();
    estado.setEstado({ clubeId: 5 });
    const state = estado.getEstado();
    assert(state.clubeId === 5, 'clubeId should be persisted');
  });

  test('setEstado() merges updates with existing state', () => {
    estado.resetEstado();
    estado.setEstado({ clubeId: 3, rodadaAtual: 2 });
    estado.setEstado({ esquemaTatico: '4-3-3' });
    const state = estado.getEstado();
    assert(state.clubeId === 3, 'clubeId should be retained');
    assert(state.rodadaAtual === 2, 'rodadaAtual should be retained');
    assert(state.esquemaTatico === '4-3-3', 'esquemaTatico should be updated');
  });

  test('salvarResultado() appends to historico', () => {
    estado.resetEstado();
    const resultado1 = { placar: { casa: 1, visitante: 0 }, lances: [] };
    const resultado2 = { placar: { casa: 2, visitante: 2 }, lances: [] };
    estado.salvarResultado(resultado1);
    estado.salvarResultado(resultado2);
    const state = estado.getEstado();
    assert(state.historico.length === 2, 'Should have 2 results');
    assert(state.historico[0].placar.casa === 1, 'First result preserved');
    assert(state.historico[1].placar.casa === 2, 'Second result added');
  });

  test('ultimoResultado() returns last match from history', () => {
    estado.resetEstado();
    estado.salvarResultado({ placar: { casa: 1, visitante: 0 } });
    estado.salvarResultado({ placar: { casa: 3, visitante: 1 } });
    const ultimo = estado.ultimoResultado();
    assert(ultimo.placar.casa === 3, 'Should return last result');
  });

  test('ultimoResultado() returns null when no history', () => {
    estado.resetEstado();
    const ultimo = estado.ultimoResultado();
    assert(ultimo === null, 'Should return null when no history');
  });

  test('resetEstado() clears all state', () => {
    estado.setEstado({ clubeId: 99, rodadaAtual: 5 });
    estado.resetEstado();
    const state = estado.getEstado();
    assert(state.clubeId === null, 'clubeId should be reset');
    assert(state.rodadaAtual === 1, 'rodadaAtual should be reset');
  });

  // ===== SIMULATION TESTS =====
  console.log('\nSimulation Tests:');

  test('gerarPartida() generates match with 20-28 plays', () => {
    const escalacao = mockData.getPlayers().filter(p => p.clube_id === 1).slice(0, 11);
    const adversario = {
      nome: 'Visitante',
      escalacao: mockData.getPlayers().filter(p => p.clube_id === 2).slice(0, 11)
    };
    const partida = simulacao.gerarPartida(escalacao, adversario);

    assert(Array.isArray(partida.lances), 'Should have lances array');
    assert(partida.lances.length >= 20, `Should have at least 20 plays, got ${partida.lances.length}`);
    assert(partida.lances.length <= 28, `Should have at most 28 plays, got ${partida.lances.length}`);
  });

  test('gerarPartida() returns valid placar', () => {
    const escalacao = mockData.getPlayers().slice(0, 11);
    const adversario = {
      nome: 'Visitante',
      escalacao: mockData.getPlayers().slice(11, 22)
    };
    const partida = simulacao.gerarPartida(escalacao, adversario);

    assert(typeof partida.placar.casa === 'number', 'placar.casa should be number');
    assert(typeof partida.placar.visitante === 'number', 'placar.visitante should be number');
    assert(partida.placar.casa >= 0, 'placar.casa should be >= 0');
    assert(partida.placar.visitante >= 0, 'placar.visitante should be >= 0');
  });

  test('gerarPartida() returns destaques with highlights', () => {
    const escalacao = mockData.getPlayers().slice(0, 11);
    const adversario = {
      nome: 'Visitante',
      escalacao: mockData.getPlayers().slice(11, 22)
    };
    const partida = simulacao.gerarPartida(escalacao, adversario);

    assert(partida.destaques, 'Should have destaques');
    assert(partida.destaques.placar_final, 'Should have placar_final');
    assert(Array.isArray(partida.destaques.artilheiros.casa), 'Should have casa scorers');
    assert(Array.isArray(partida.destaques.artilheiros.visitante), 'Should have visitante scorers');
    assert(partida.destaques.melhor_jogador.casa, 'Should have casa MVP');
    assert(partida.destaques.melhor_jogador.visitante, 'Should have visitante MVP');
  });

  test('Each play has required fields', () => {
    const escalacao = mockData.getPlayers().slice(0, 11);
    const adversario = {
      nome: 'Visitante',
      escalacao: mockData.getPlayers().slice(11, 22)
    };
    const partida = simulacao.gerarPartida(escalacao, adversario);

    partida.lances.forEach((lance, idx) => {
      assert(typeof lance.tipo === 'string', `Play ${idx} tipo should be string`);
      assert(typeof lance.minuto === 'number', `Play ${idx} minuto should be number`);
      assert(typeof lance.atacante === 'string', `Play ${idx} atacante should be string`);
      assert(lance.minuto >= 0 && lance.minuto <= 90, `Play ${idx} minuto should be 0-90`);
      assert(['gol', 'chute_fora', 'chute_defendido', 'escanteio', 'falta'].includes(lance.tipo), `Play ${idx} invalid tipo`);
    });
  });

  test('Goals in plays match placar total', () => {
    const escalacao = mockData.getPlayers().slice(0, 11);
    const adversario = {
      nome: 'Visitante',
      escalacao: mockData.getPlayers().slice(11, 22)
    };
    const partida = simulacao.gerarPartida(escalacao, adversario);

    const goalCount = partida.lances.filter(l => l.tipo === 'gol').length;
    const totalGoals = partida.placar.casa + partida.placar.visitante;
    assert(goalCount === totalGoals, `Goal count ${goalCount} should match placar total ${totalGoals}`);
  });

  test('gerarPartida() handles empty escalacao gracefully', () => {
    const escalacao = [];
    const adversario = {
      nome: 'Visitante',
      escalacao: mockData.getPlayers().slice(0, 11)
    };
    const partida = simulacao.gerarPartida(escalacao, adversario);

    assert(partida.lances, 'Should generate lances even with empty escalacao');
    assert(Array.isArray(partida.lances), 'lances should be array');
  });

  test('Match times vary across 0-90 minutes', () => {
    const escalacao = mockData.getPlayers().slice(0, 11);
    const adversario = {
      nome: 'Visitante',
      escalacao: mockData.getPlayers().slice(11, 22)
    };
    const partida = simulacao.gerarPartida(escalacao, adversario);

    const minutes = new Set(partida.lances.map(l => l.minuto));
    assert(minutes.size > 1, 'Match should have plays at different times');
  });

  // ===== NARRATIVE TESTS =====
  console.log('\nNarrative Tests:');

  test('narrarLance() returns string for all play types', () => {
    const tipos = ['gol', 'chute_fora', 'chute_defendido', 'escanteio', 'falta'];
    tipos.forEach(tipo => {
      const lance = { tipo, minuto: 45, atacante: 'Test Player', defensor: 'Defender' };
      const narrative = narracao.narrarLance(lance);
      assert(typeof narrative === 'string', `narrarLance for ${tipo} should return string`);
      assert(narrative.length > 0, `narrarLance for ${tipo} should not be empty`);
    });
  });

  test('narrarLance() replaces placeholders', () => {
    const lance = { tipo: 'gol', minuto: 30, atacante: 'Pelé', defensor: null };
    const narrative = narracao.narrarLance(lance);

    assert(narrative.includes('30'), 'Should include minuto');
    assert(narrative.includes('Pelé'), 'Should include atacante');
    assert(!narrative.includes('{'), 'Should not have unreplaced placeholders');
  });

  test('narrarLance() handles defensor placeholder for falta', () => {
    // Test multiple times since phrases are random
    let foundWithAtacante = false;
    for (let i = 0; i < 10; i++) {
      const lance = { tipo: 'falta', minuto: 60, atacante: 'Ronaldo', defensor: 'Ramos' };
      const narrative = narracao.narrarLance(lance);
      assert(!narrative.includes('{defensor}'), 'Should not have unreplaced placeholders');
      if (narrative.includes('Ronaldo')) {
        foundWithAtacante = true;
      }
    }
    assert(foundWithAtacante, 'At least one falta phrase should include atacante');
  });

  test('getPhrasesForType() returns array for valid types', () => {
    const tipos = ['gol', 'chute_fora', 'chute_defendido', 'escanteio', 'falta'];
    tipos.forEach(tipo => {
      const frases = narracao.getPhrasesForType(tipo);
      assert(Array.isArray(frases), `getPhrasesForType for ${tipo} should return array`);
      assert(frases.length > 0, `getPhrasesForType for ${tipo} should not be empty`);
    });
  });

  test('getPhrasesForType() returns empty array for unknown type', () => {
    const frases = narracao.getPhrasesForType('unknown');
    assert(Array.isArray(frases), 'Should return array');
    assert(frases.length === 0, 'Should return empty array for unknown type');
  });

  test('narrarLance() provides fallback for unknown type', () => {
    const lance = { tipo: 'unknown_type', minuto: 50, atacante: 'Player', defensor: null };
    const narrative = narracao.narrarLance(lance);
    assert(typeof narrative === 'string', 'Should still return string');
    assert(narrative.length > 0, 'Should return fallback narrative');
  });

  // ===== FORMATION VALIDATION TESTS =====
  console.log('\nFormation Validation Tests:');

  test('Can construct 4-4-2 formation (1 GK, 2 LAT, 2 ZAG, 4 MEI, 2 ATA)', () => {
    const players = mockData.getPlayers();
    const positions = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    players.forEach(p => {
      if (positions[p.posicao_id]) {
        positions[p.posicao_id].push(p);
      }
    });

    const formation = [
      ...positions[1].slice(0, 1),
      ...positions[2].slice(0, 2),
      ...positions[3].slice(0, 2),
      ...positions[4].slice(0, 4),
      ...positions[5].slice(0, 2)
    ];

    assert(formation.length === 11, `Expected 11 players, got ${formation.length}`);
  });

  test('Can construct 4-3-3 formation (1 GK, 2 LAT, 2 ZAG, 3 MEI, 3 ATA)', () => {
    const players = mockData.getPlayers();
    const positions = { 1: [], 2: [], 3: [], 4: [], 5: [] };
    players.forEach(p => {
      if (positions[p.posicao_id]) {
        positions[p.posicao_id].push(p);
      }
    });

    const formation = [
      ...positions[1].slice(0, 1),
      ...positions[2].slice(0, 2),
      ...positions[3].slice(0, 2),
      ...positions[4].slice(0, 3),
      ...positions[5].slice(0, 3)
    ];

    assert(formation.length === 11, `Expected 11 players, got ${formation.length}`);
  });

  // ===== RESULTS =====
  console.log(`\n=== TEST RESULTS ===`);
  console.log(`Passed: ${passCount}`);
  console.log(`Failed: ${failCount}`);

  if (failCount > 0) {
    console.log('\n=== FAILURES ===');
    failures.forEach((f, i) => {
      console.log(`${i + 1}. ${f}`);
    });
  }

  return failCount === 0;
}

// Run all tests
(async () => {
  try {
    const passed = await runTests();
    process.exit(passed ? 0 : 1);
  } catch (err) {
    console.error('Test suite error:', err);
    process.exit(1);
  }
})();

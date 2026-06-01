/**
 * Match simulation engine
 */

const TOTAL_LANCES_MIN = 20;
const TOTAL_LANCES_MAX = 28;
const PERCENTUAL_CASA = 0.60;
const FATOR_ALEATORIO = () => Math.random() * 0.4 + 0.8;

const PROBABILIDADES_LANCE = {
  chute_fora: 0.35,
  chute_defendido: 0.25,
  escanteio: 0.15,
  falta: 0.15,
  gol: 0.10
};

/**
 * Generate a complete match simulation
 * @param {Array} escalacao - Array of 11 selected player objects with media_num, posicao_id
 * @param {Object} adversario - Opponent team { nome, escalacao: Array }
 * @returns {Object} { lances: Array, placar: { casa, visitante }, destaques: Object }
 */
export function gerarPartida(escalacao, adversario) {
  // Calculate team strengths
  const timeCasa = {
    nome: escalacao[0]?.time_nome || 'Time da Casa',
    escalacao: escalacao,
    ...calcularForca(escalacao)
  };

  const timeVisitante = {
    nome: adversario?.nome || 'Visitante',
    escalacao: adversario?.escalacao || [],
    ...calcularForca(adversario?.escalacao || [])
  };

  // Generate match
  const totalLances = Math.floor(Math.random() * (TOTAL_LANCES_MAX - TOTAL_LANCES_MIN + 1)) + TOTAL_LANCES_MIN;
  const lances = [];
  let placar = { casa: 0, visitante: 0 };
  const scorers = { casa: {}, visitante: {} };

  for (let i = 0; i < totalLances; i++) {
    // 60% chance home team has possession
    const timePossui = Math.random() < PERCENTUAL_CASA ? 'casa' : 'visitante';
    const timeAtaca = timePossui === 'casa' ? timeCasa : timeVisitante;
    const timeDefende = timePossui === 'casa' ? timeVisitante : timeCasa;

    // Vary minutes across match (0-90)
    const minuto = Math.floor((i / totalLances) * 90) + Math.floor(Math.random() * 5);

    const lance = gerarLance(minuto, timeAtaca, timeDefende, timePossui);

    if (lance.tipo === 'gol') {
      if (timePossui === 'casa') {
        placar.casa++;
        scorers.casa[lance.atacante] = (scorers.casa[lance.atacante] || 0) + 1;
      } else {
        placar.visitante++;
        scorers.visitante[lance.atacante] = (scorers.visitante[lance.atacante] || 0) + 1;
      }
    }

    lances.push(lance);
  }

  // Generate highlights
  const destaques = {
    placar_final: { ...placar },
    artilheiros: {
      casa: Object.entries(scorers.casa).map(([nome, gols]) => ({ nome, gols })),
      visitante: Object.entries(scorers.visitante).map(([nome, gols]) => ({ nome, gols }))
    },
    melhor_jogador: {
      casa: timeCasa.escalacao.reduce((best, current) =>
        (current.media_num > (best.media_num || 0)) ? current : best, {}),
      visitante: timeVisitante.escalacao.reduce((best, current) =>
        (current.media_num > (best.media_num || 0)) ? current : best, {})
    }
  };

  return {
    lances,
    placar,
    destaques
  };
}

/**
 * Calculate team strength
 * @param {Array} jogadores - Player array
 * @returns { forcaAtaque: Number, forcaDefesa: Number }
 */
function calcularForca(jogadores) {
  if (!jogadores || jogadores.length === 0) {
    return { forcaAtaque: 5, forcaDefesa: 5 };
  }

  // Attack: average of forward players (posicao_id 5)
  const atacantes = jogadores.filter(j => j.posicao_id === 5);
  const forcaAtaque = atacantes.length > 0
    ? atacantes.reduce((sum, j) => sum + j.media_num, 0) / atacantes.length
    : 5;

  // Defense: average of defensive players (posicao_id 2 and 3)
  const defensores = jogadores.filter(j => j.posicao_id === 2 || j.posicao_id === 3);
  const forcaDefesa = defensores.length > 0
    ? defensores.reduce((sum, j) => sum + j.media_num, 0) / defensores.length
    : 5;

  return {
    forcaAtaque: forcaAtaque * FATOR_ALEATORIO(),
    forcaDefesa: forcaDefesa * FATOR_ALEATORIO()
  };
}

/**
 * Generate a single play event
 * @param {Number} minuto - Current match minute
 * @param {Object} timeCasa, timeVisitante - Team data with strengths
 * @param {Number} timePossui - 'casa' or 'visitante'
 * @returns {Object} { tipo, atacante, defensor, minuto, resultado }
 */
function gerarLance(minuto, timeAtaca, timeDefende, timePossui) {
  const tipo = sortearTipoLance();

  // Pick random attacker
  const atacante = timeAtaca.escalacao[Math.floor(Math.random() * timeAtaca.escalacao.length)];
  const nomAtacante = atacante?.nome || 'Jogador';

  // Pick random defender (if applicable)
  const defensor = timeDefende.escalacao[Math.floor(Math.random() * timeDefende.escalacao.length)];
  const nomDefensor = defensor?.nome || 'Defensor';

  const lance = {
    tipo,
    minuto: Math.min(minuto, 90),
    atacante: nomAtacante,
    defensor: tipo === 'falta' ? nomDefensor : null,
    resultado: null
  };

  // Check for goal
  if (tipo === 'gol') {
    const gol = verificarGol(timeAtaca.forcaAtaque, timeDefende.forcaDefesa);
    if (gol) {
      lance.resultado = 'gol';
    } else {
      lance.tipo = 'chute_defendido';
    }
  }

  return lance;
}

/**
 * Determine play type based on probabilities
 * @returns {String} - 'gol' | 'chute_fora' | 'chute_defendido' | 'escanteio' | 'falta'
 */
function sortearTipoLance() {
  const rand = Math.random();
  let cumulative = 0;

  for (const [tipo, prob] of Object.entries(PROBABILIDADES_LANCE)) {
    cumulative += prob;
    if (rand < cumulative) {
      return tipo;
    }
  }

  return 'chute_defendido';
}

/**
 * Calculate goal probability for a play
 * @param {Number} forcaAtaque, forcaDefesa
 * @returns {Boolean} - true if goal scored
 */
function verificarGol(forcaAtaque, forcaDefesa) {
  // Goal probability increases with attack strength and decreases with defense
  const probabilidade = (forcaAtaque / 10) * (1 - (forcaDefesa / 10) * 0.5);
  return Math.random() < probabilidade;
}

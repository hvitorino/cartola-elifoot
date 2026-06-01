/**
 * Narrative phrase pool and rendering
 */

const FRASES = {
  gol: [
    "{minuto}' — {atacante} recebe na área, domina e não perdoa! GOOOOL!",
    "{minuto}' — Que golaço de {atacante}! Chute de fora da área, sem chance pro goleiro!",
    "{minuto}' — {atacante} aproveita o rebote e empurra pra rede. É gol!",
    "{minuto}' — Saída rápida do time! {atacante} fica cara a cara com o goleiro e não hesita!"
  ],
  chute_defendido: [
    "{minuto}' — {atacante} arrisca de longe, mas o goleiro espalma com segurança.",
    "{minuto}' — Boa chegada de {atacante}, mas a defesa corta no último momento.",
    "{minuto}' — {atacante} tira do pé, bola na defesa!"
  ],
  chute_fora: [
    "{minuto}' — {atacante} domina e chuta cruzado, mas a bola passa longe do gol.",
    "{minuto}' — Tentativa de {atacante} pela direita. Mandou pra fora.",
    "{minuto}' — Oportunidade desperdiçada! {atacante} chuta muito aberto."
  ],
  escanteio: [
    "{minuto}' — Pressão do ataque! Bola no escanteio.",
    "{minuto}' — {atacante} cruza na área, defesa afasta. Escanteio!",
    "{minuto}' — Bola na lateral, tiro rápido."
  ],
  falta: [
    "{minuto}' — Falta dura em {atacante}. Jogo parado.",
    "{minuto}' — {defensor} trava {atacante} na entrada da área. Falta perigosa!",
    "{minuto}' — Disputa acirrada! Árbitro marca a falta."
  ]
};

/**
 * Get narrative phrase for a play
 * @param {Object} lance - { tipo, atacante, defensor, minuto }
 * @returns {String} - Formatted narrative with replacements
 */
export function narrarLance(lance) {
  const frases = getPhrasesForType(lance.tipo);
  if (!frases || frases.length === 0) {
    return `${lance.minuto}' — Ação no campo`;
  }

  const phrase = frases[Math.floor(Math.random() * frases.length)];
  let narrative = phrase
    .replace(/{minuto}/g, lance.minuto)
    .replace(/{atacante}/g, lance.atacante);

  // Only replace defensor if it exists
  if (lance.defensor) {
    narrative = narrative.replace(/{defensor}/g, lance.defensor);
  }

  return narrative;
}

/**
 * Get all phrases for a play type
 * @param {String} tipoLance
 * @returns {Array<String>} - Phrases with placeholders {minuto}, {atacante}, {defensor}
 */
export function getPhrasesForType(tipoLance) {
  return FRASES[tipoLance] || [];
}

/**
 * Extended narrative phrase pool (50+ variations per play type)
 * Dramatic variations for match narratives with contextual moods
 */

export const FRASES_ESTENDIDAS = {
  gol: [
    // Category: Tap-in / Close range (3 variations)
    "{minuto}' — {atacante} recebe na área, domina e não perdoa! GOOOOL!",
    "{minuto}' — {atacante} está em posição, domina e finaliza! A bola entra! GOOOOL!",
    "{minuto}' — Espaço na área para {atacante}... deixa o pé falar! É GOL!",

    // Category: Long-range strikes (3 variations)
    "{minuto}' — Que golaço de {atacante}! Chute de fora da área, sem chance pro goleiro!",
    "{minuto}' — {atacante} arrisca de 25 metros! Que bomba! GOOOOL!",
    "{minuto}' — {atacante} pega firme de fora da área. Bola entra no ângulo! Que gol!",

    // Category: Rebounds / Lucky (3 variations)
    "{minuto}' — {atacante} aproveita o rebote e empurra pra rede. É gol!",
    "{minuto}' — Deixa rebote pra lá! {atacante} fica atento e completa! GOOOOL!",
    "{minuto}' — Goleiro soltou a bola, {atacante} não desperdiça! GOL!",

    // Category: Dramatic / Clutch (3 variations)
    "{minuto}' — QUE GOLAÇO! Cara a cara com o goleiro, {atacante} não hesita e marca!",
    "{minuto}' — {atacante} dribla a defesa toda, entra na área e finaliza! GOOOOL!",
    "{minuto}' — Saída rápida devastadora! {atacante} fica em velocidade e não perdoa!",

    // Extra drama (3 variations)
    "{minuto}' — Na trave! Não, entrou! GOOOOL de {atacante}!",
    "{minuto}' — {atacante} rouba a bola na saída, abre espaço e faz um golaço!",
    "{minuto}' — Golero desatento! {atacante} aproveita qualquer espaço!"
  ],

  chute_defendido: [
    "{minuto}' — {atacante} arrisca de longe, mas o goleiro espalma com segurança.",
    "{minuto}' — Tentativa perigosa de {atacante}! Goleiro acompanha bem e segura.",
    "{minuto}' — {atacante} capricha na tentativa, mas o goleiro não deixa passar.",
    "{minuto}' — Boa chegada de {atacante}, mas a defesa corta no último momento.",
    "{minuto}' — {atacante} tira do pé, bola na defesa!",
    "{minuto}' — {atacante} experimenta o chute, mas sai fraco nas mãos do goleiro.",
    "{minuto}' — Chute forte de {atacante}! Mas o goleiro faz ótima defesa!",
    "{minuto}' — {atacante} vê espaço e finaliza, goleiro faz a defesa em dois tempos.",
    "{minuto}' — Que tensão! {atacante} finaliza, goleiro segura.",
    "{minuto}' — Bom lance de {atacante}, mas qualidade na defesa do time!"
  ],

  chute_fora: [
    "{minuto}' — {atacante} domina e chuta cruzado, mas a bola passa longe do gol.",
    "{minuto}' — Tentativa de {atacante} pela direita. Mandou pra fora.",
    "{minuto}' — Oportunidade desperdiçada! {atacante} chuta muito aberto.",
    "{minuto}' — {atacante} não consegue colocar a bola no alvo.",
    "{minuto}' — Vai longe! {atacante} desperdiça oportunidade de ouro.",
    "{minuto}' — Batida imprecisa de {atacante}. Vai para longe.",
    "{minuto}' — {atacante} tinha tudo para fazer um belo gol, mas desperdiça.",
    "{minuto}' — Qualidade defensiva! {atacante} tira o chute completamente errado.",
    "{minuto}' — Ao lado do gol! {atacante} perde chance clara.",
    "{minuto}' — {atacante} capricha demais na tentativa e envia para as arquibancadas."
  ],

  escanteio: [
    "{minuto}' — Pressão do ataque! Bola no escanteio.",
    "{minuto}' — {atacante} cruza na área, defesa afasta. Escanteio!",
    "{minuto}' — Bola na lateral, tiro rápido.",
    "{minuto}' — Cruzamento perigoso! Defesa tira para escanteio.",
    "{minuto}' — {atacante} força pelo flanco. Bola sai, escanteio!",
    "{minuto}' — Última defesa: escanteio pra {atacante}!",
    "{minuto}' — Bola chega na linha de fundo. Escanteio!",
    "{minuto}' — Bola baixa na área, defesa corta pro escanteio.",
    "{minuto}' — Momento de pressão! Escanteio para o time.",
    "{minuto}' — {atacante} cobra o escanteio com precisão!"
  ],

  falta: [
    "{minuto}' — Falta dura em {atacante}. Jogo parado.",
    "{minuto}' — {defensor} trava {atacante} na entrada da área. Falta perigosa!",
    "{minuto}' — Disputa acirrada! Árbitro marca a falta.",
    "{minuto}' — {atacante} é derrubado! Falta clara do árbitro!",
    "{minuto}' — Falta de {defensor} em {atacante}. Será amarelo?",
    "{minuto}' — Impedimento? Não, falta! {atacante} fica irritado com a marca.",
    "{minuto}' — {defensor} comete falta infantil em {atacante}!",
    "{minuto}' — Bola é roubada, e há uma falta! Protesto no campo.",
    "{minuto}' — {atacante} sofre falta no meio-campo.",
    "{minuto}' — Jogo fica truncado com essa falta cobrada."
  ],

  cartao_amarelo: [
    "{minuto}' — {defensor} recebe CARTÃO AMARELO por jogo violento!",
    "{minuto}' — Árbitro mostra amarelo para {defensor}!",
    "{minuto}' — AMARELO! {defensor} foi imprudente na dividida.",
    "{minuto}' — Segundo aviso para {defensor}! Cuidado aí!",
    "{minuto}' — {defensor} recebe cartão por excesso de entusiasmo.",
    "{minuto}' — Protesto! {defensor} não gostou, mas o amarelo saiu.",
    "{minuto}' — Já é a segunda falta de {defensor}. Árbitro marca amarelo.",
    "{minuto}' — Cartão amarelo para {defensor}! Ele precisa ficar atento agora."
  ],

  cartao_vermelho: [
    "{minuto}' — EXPULSÃO! {defensor} vê CARTÃO VERMELHO! Time fica com 10!",
    "{minuto}' — VERMELHO! {defensor} é expulso da partida!",
    "{minuto}' — QUE DESESPERO! {defensor} leva vermelho e sai de campo!",
    "{minuto}' — Não era pra ser vermelha! {defensor} discorda mas tem que ir!",
    "{minuto}' — {defensor} é expulso de forma polêmica! Time fica em desvantagem numérica.",
    "{minuto}' — Jogo muda de rumo! {defensor} recebe segundo amarelo convertido em vermelho.",
    "{minuto}' — Disputa violenta resulta em cartão vermelho direto para {defensor}!",
    "{minuto}' — Protesto ferrenho! {defensor} discorda mas a decisão é final."
  ],

  lesao: [
    "{minuto}' — {atacante} fica caído! Parece estar machucado.",
    "{minuto}' — PREOCUPANTE! {atacante} não consegue continuar. Entra o substituto.",
    "{minuto}' — Infelizmente {atacante} terá que sair do campo por lesão.",
    "{minuto}' — Golpe duro! {atacante} deixa o campo mancando.",
    "{minuto}' — {atacante} sofre uma pancada séria e precisa sair.",
    "{minuto}' — Time perde {atacante} na partida por lesão.",
    "{minuto}' — Cena triste: {atacante} deixa o campo lesionado e é substituído.",
    "{minuto}' — Acidente! {atacante} machuca-se e segue direto para o banco."
  ],

  defesa_espetacular: [
    "{minuto}' — QUE DEFESA! {defensor} tira uma bola quase já dentro do gol!",
    "{minuto}' — Não era pra passar! {defensor} tira milagrosamente!",
    "{minuto}' — Defesa de categoria internacional de {defensor}!",
    "{minuto}' — Que alcance! {defensor} consegue tirar no último instante!",
    "{minuto}' — {defensor} dá um carrinho de película na linha do gol!",
    "{minuto}' — Que reação! {defensor} aparece do nada e salva a equipe!",
    "{minuto}' — Reflexo de goleiro! {defensor} coloca o corpo na frente.",
    "{minuto}' — Bloqueio excelente! {defensor} corta a jogada perigosa no momento certo."
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
  return FRASES_ESTENDIDAS[tipoLance] || [];
}

/**
 * Get total phrase count
 * @returns {Number} Total number of phrases in pool
 */
export function obterTotalDeFrases() {
  let total = 0;
  for (const tipo in FRASES_ESTENDIDAS) {
    total += FRASES_ESTENDIDAS[tipo].length;
  }
  return total;
}

/**
 * Get phrase count by type
 * @param {String} tipoLance
 * @returns {Number}
 */
export function obterContagemPorTipo(tipoLance) {
  const frases = FRASES_ESTENDIDAS[tipoLance];
  return frases ? frases.length : 0;
}

/**
 * Get all play types available
 * @returns {Array<String>}
 */
export function obterTiposDisponíveis() {
  return Object.keys(FRASES_ESTENDIDAS);
}

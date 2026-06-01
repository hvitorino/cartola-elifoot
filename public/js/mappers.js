/**
 * Data shape adapters between API/mock data and component expected interfaces
 */

const POSICAO_MAP = { 1: 'GK', 2: 'DF', 3: 'DF', 4: 'MF', 5: 'FW' };
const POSICAO_LABEL = { 1: 'GOL', 2: 'LAT', 3: 'ZAG', 4: 'MEI', 5: 'ATA' };
const LANCE_TIPO_MAP = {
  gol: 'goal',
  chute: 'goal',
  falta: 'yellow_card',
  defesa: 'goal',
  escanteio: 'kickoff',
  lateral: 'kickoff',
  impedimento: 'yellow_card',
  substituicao: 'substitution',
  inicio: 'kickoff',
  fim: 'full_time',
  intervalo: 'half_time',
};

export function mapPlayerToCard(player, clubs = []) {
  const club = clubs.find(c => c.id === player.clube_id);
  return {
    id: player.atleta_id,
    name: player.nome,
    position: POSICAO_MAP[player.posicao_id] || 'MF',
    positionLabel: POSICAO_LABEL[player.posicao_id] || 'MEI',
    team: club ? club.nome : `Clube ${player.clube_id}`,
    teamAbbr: club ? club.abreviacao : '???',
    rating: Math.round((player.media_num || 5) * 10) / 10,
    price: player.preco_num || Math.floor(Math.random() * 20 + 5),
    fitness: Math.floor(Math.random() * 30 + 70),
    status: 'fit',
    formHistory: Array.from({ length: 5 }, () => Math.floor(Math.random() * 3 + 3)),
    goals: player.gols || 0,
    assists: player.assistencias || 0,
    yellowCards: player.cartoes_amarelos || 0,
    redCards: player.cartoes_vermelhos || 0,
  };
}

export function mapPlayerToFormationSlot(player, clubs = []) {
  const mapped = mapPlayerToCard(player, clubs);
  return {
    ...mapped,
    number: player.atleta_id % 99 || 9,
    isSelected: true,
  };
}

export function mapStandingsRow(clube, position) {
  return {
    id: clube.clube_id,
    name: clube.nome_clube || clube.nome || 'Clube',
    gamesPlayed: clube.jogos || 0,
    wins: clube.vitorias || 0,
    draws: clube.empates || 0,
    losses: clube.derrotas || 0,
    points: clube.pontos || 0,
    trend: Math.floor(Math.random() * 5 - 2),
  };
}

export function mapLanceToTimelineEvent(lance, index, minutoBase = 0) {
  const tipo = LANCE_TIPO_MAP[lance.tipo] || 'kickoff';
  const minute = Math.min(90, minutoBase + index * 3);
  return {
    type: tipo,
    minute,
    player: lance.jogador || null,
    team: lance.time || null,
    description: lance.narracao || lance.descricao || '',
  };
}

export function buildMockStandings(clubs) {
  return clubs.map((club, i) => ({
    clube_id: club.id,
    nome_clube: club.nome,
    posicao: i + 1,
    jogos: 15,
    vitorias: Math.max(0, 14 - i * 1.5 | 0),
    empates: 2,
    derrotas: Math.min(13, i * 1.5 | 0),
    pontos: Math.max(5, 45 - i * 3),
    gols_pro: Math.max(5, 40 - i * 3),
    gols_contra: Math.min(40, 10 + i * 2),
    saldo: Math.max(-20, 30 - i * 5),
  }));
}

/**
 * Match history management and rendering
 */

/**
 * Add completed match to history
 * @param {Object} resultado - { escalacao, adversario, lances, placar, destaques, data_rodada, numero_rodada }
 */
export function adicionarResultadoAoHistorico(resultado) {
  if (!resultado) return;

  try {
    const historico = obterHistoricoCompleto();
    historico.push({
      ...resultado,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('cartola_historico', JSON.stringify(historico));
  } catch (err) {
    console.error('Error adding result to history:', err.message);
  }
}

/**
 * Get all match history
 * @returns {Array<Object>} Matches sorted by round (descending)
 */
export function obterHistoricoCompleto() {
  try {
    const historico = localStorage.getItem('cartola_historico');
    if (!historico) {
      return [];
    }
    const matches = JSON.parse(historico);
    return Array.isArray(matches) ? matches : [];
  } catch (err) {
    console.error('Error retrieving history:', err.message);
    return [];
  }
}

/**
 * Get matches by club opponent
 * @param {Number} clubeId - Opponent club ID
 * @returns {Array<Object>}
 */
export function filtrarHistoricoPorAdversario(clubeId) {
  const historico = obterHistoricoCompleto();
  return historico.filter(match => {
    const adversario = match.adversario || {};
    return adversario.clube_id === clubeId || adversario.id === clubeId;
  });
}

/**
 * Calculate cumulative season stats
 * @param {Array<Object>} historico
 * @returns {Object} { vitorias, derrotas, empates, gols_pro, gols_contra, saldo }
 */
export function calcularEstatisticasSeason(historico) {
  if (!Array.isArray(historico)) {
    historico = [];
  }

  const stats = {
    vitorias: 0,
    derrotas: 0,
    empates: 0,
    gols_pro: 0,
    gols_contra: 0
  };

  historico.forEach(match => {
    const placar = match.placar || {};
    const casa = placar.casa || 0;
    const visitante = placar.visitante || 0;

    // Assume home team is always the player's team
    stats.gols_pro += casa;
    stats.gols_contra += visitante;

    if (casa > visitante) {
      stats.vitorias++;
    } else if (casa < visitante) {
      stats.derrotas++;
    } else {
      stats.empates++;
    }
  });

  stats.saldo = stats.gols_pro - stats.gols_contra;
  return stats;
}

/**
 * Render match history card
 * @param {Object} resultado - Single match result
 * @returns {HTMLElement}
 */
export function renderCartaoHistorico(resultado) {
  const div = document.createElement('div');
  div.className = 'historia-card';

  const placar = resultado.placar || {};
  const casa = placar.casa || 0;
  const visitante = placar.visitante || 0;
  const adversario = resultado.adversario || {};
  const destaques = resultado.destaques || {};
  const melhorJogador = destaques.melhor_jogador || {};
  const melhorTime = melhorJogador.casa || {};

  const resultadoTexto = casa > visitante ? 'Vitória' : casa < visitante ? 'Derrota' : 'Empate';
  const resultadoClass = casa > visitante ? 'win' : casa < visitante ? 'loss' : 'draw';

  div.innerHTML = `
    <div class="historia-card-header">
      <div class="round">Rodada ${resultado.numero_rodada || ''}</div>
      <div class="resultado ${resultadoClass}">${resultadoTexto}</div>
    </div>
    <div class="historia-card-score">
      <div class="team">
        <span class="team-name">${adversario.nome || 'Visitante'}</span>
      </div>
      <div class="score">
        <span class="goals-home">${casa}</span>
        <span class="separator">-</span>
        <span class="goals-away">${visitante}</span>
      </div>
      <div class="team away">
        <span class="team-name">Visitante</span>
      </div>
    </div>
    <div class="historia-card-stats">
      <div class="stat">
        <span class="label">MVP</span>
        <span class="value">${melhorTime.nome || '-'}</span>
      </div>
      <div class="stat">
        <span class="label">Data</span>
        <span class="value">${resultado.data_rodada ? new Date(resultado.data_rodada).toLocaleDateString('pt-BR') : '-'}</span>
      </div>
    </div>
  `;

  return div;
}

/**
 * Render full history timeline
 * @param {HTMLElement} container
 * @param {Array<Object>} historico
 */
export function renderTimelineHistorico(container, historico) {
  if (!container) return;

  container.innerHTML = '';

  if (!historico || historico.length === 0) {
    container.innerHTML = '<p class="no-history">Nenhum histórico de partidas</p>';
    return;
  }

  // Sort by round descending (most recent first)
  const sorted = [...historico].sort((a, b) => {
    const rodadaB = b.numero_rodada || 0;
    const rodadaA = a.numero_rodada || 0;
    return rodadaB - rodadaA;
  });

  const timeline = document.createElement('div');
  timeline.className = 'historia-timeline';

  sorted.forEach(match => {
    const card = renderCartaoHistorico(match);
    timeline.appendChild(card);
  });

  container.appendChild(timeline);
}

/**
 * Get last N matches
 * @param {Number} limit - Number of matches to return
 * @returns {Array<Object>}
 */
export function obterUltimosResultados(limit = 5) {
  const historico = obterHistoricoCompleto();
  const sorted = [...historico].sort((a, b) => {
    const rodadaB = b.numero_rodada || 0;
    const rodadaA = a.numero_rodada || 0;
    return rodadaB - rodadaA;
  });
  return sorted.slice(0, limit);
}

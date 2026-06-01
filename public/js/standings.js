/**
 * League standings management
 * Fetch, calculate, and manage league standings from Cartola API
 */

/**
 * Fetch league standings from Cartola API (with fallback)
 * @returns {Promise<Array<Object>>}
 * Structure: [
 *   { posicao: 1, clube_id: 2, nome_clube: "Flamengo", pontos: 45, jogos: 15, vitorias: 14, empates: 0, derrotas: 1, gols_pro: 42, gols_contra: 10, saldo: 32 },
 *   ...
 * ]
 */
export async function obterTabelaClassificacao() {
  try {
    const response = await fetch('/api/classificacao');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : data.tabela || [];
  } catch (err) {
    console.error('Error fetching standings, using fallback:', err.message);
    try {
      const response = await fetch('/data/tabela-inicial.json');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (fallbackErr) {
      console.error('Error loading fallback standings:', fallbackErr.message);
      return [];
    }
  }
}

/**
 * Render standings table to DOM
 * @param {Array<Object>} tabela - Standings data
 * @param {Number} clubeId - Current player's club (highlight in UI)
 * @param {HTMLElement} container
 */
export function renderTabelaClassificacao(tabela, clubeId, container) {
  if (!container) return;

  // Clear container
  container.innerHTML = '';

  if (!tabela || tabela.length === 0) {
    container.innerHTML = '<p>Nenhuma classificação disponível</p>';
    return;
  }

  // Create table
  const tableHtml = `
    <table class="standings-table">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Clube</th>
          <th>J</th>
          <th>V</th>
          <th>E</th>
          <th>D</th>
          <th>GP</th>
          <th>GC</th>
          <th>SG</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        ${tabela.map(clube => {
          const isCurrentClub = clubeId && clube.clube_id === clubeId;
          const rowClass = isCurrentClub ? 'standings-row current-club' : 'standings-row';
          return `
            <tr class="${rowClass}">
              <td class="pos">${clube.posicao}</td>
              <td class="nome">${clube.nome_clube || 'Desconhecido'}</td>
              <td>${clube.jogos || 0}</td>
              <td>${clube.vitorias || 0}</td>
              <td>${clube.empates || 0}</td>
              <td>${clube.derrotas || 0}</td>
              <td>${clube.gols_pro || 0}</td>
              <td>${clube.gols_contra || 0}</td>
              <td>${clube.saldo !== undefined ? clube.saldo : (clube.gols_pro || 0) - (clube.gols_contra || 0)}</td>
              <td class="pontos">${clube.pontos || 0}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = tableHtml;
}

/**
 * Sort standings by points, goal difference, goals scored
 * @param {Array<Object>} tabela
 * @returns {Array<Object>} Sorted standings
 */
export function ordenarTabela(tabela) {
  if (!Array.isArray(tabela)) {
    return [];
  }

  return [...tabela].sort((a, b) => {
    // Sort by points descending
    if ((b.pontos || 0) !== (a.pontos || 0)) {
      return (b.pontos || 0) - (a.pontos || 0);
    }

    // Then by goal difference descending
    const saldoA = (a.saldo !== undefined) ? a.saldo : ((a.gols_pro || 0) - (a.gols_contra || 0));
    const saldoB = (b.saldo !== undefined) ? b.saldo : ((b.gols_pro || 0) - (b.gols_contra || 0));
    if (saldoB !== saldoA) {
      return saldoB - saldoA;
    }

    // Finally by goals scored descending
    return (b.gols_pro || 0) - (a.gols_pro || 0);
  });
}

/**
 * Get player's current position in standings
 * @param {Number} clubeId
 * @param {Array<Object>} tabela
 * @returns {Number} Position (1-20)
 */
export function obterPosicaoDoClube(clubeId, tabela) {
  if (!Array.isArray(tabela) || !clubeId) {
    return null;
  }

  const clube = tabela.find(c => c.clube_id === clubeId);
  return clube ? clube.posicao : null;
}

/**
 * Mock data for when API is unavailable
 */

/**
 * Get mock club list (20 Serie A clubs)
 * @returns {Array}
 */
export function getClubs() {
  return [
    { id: 1, nome: 'Flamengo', abreviacao: 'FLA', escudo_id: 1 },
    { id: 2, nome: 'Palmeiras', abreviacao: 'PAL', escudo_id: 2 },
    { id: 3, nome: 'São Paulo', abreviacao: 'SPA', escudo_id: 3 },
    { id: 4, nome: 'Corinthians', abreviacao: 'COR', escudo_id: 4 },
    { id: 5, nome: 'Atlético Mineiro', abreviacao: 'CAM', escudo_id: 5 },
    { id: 6, nome: 'Botafogo', abreviacao: 'BOT', escudo_id: 6 },
    { id: 7, nome: 'Vasco da Gama', abreviacao: 'VAS', escudo_id: 7 },
    { id: 8, nome: 'Internacional', abreviacao: 'INT', escudo_id: 8 },
    { id: 9, nome: 'Grêmio', abreviacao: 'GRE', escudo_id: 9 },
    { id: 10, nome: 'Fluminense', abreviacao: 'FLU', escudo_id: 10 },
    { id: 11, nome: 'Bahia', abreviacao: 'BAH', escudo_id: 11 },
    { id: 12, nome: 'Fortaleza', abreviacao: 'FOR', escudo_id: 12 },
    { id: 13, nome: 'Cebolinha FC', abreviacao: 'CEP', escudo_id: 13 },
    { id: 14, nome: 'Cruzeiro', abreviacao: 'CRU', escudo_id: 14 },
    { id: 15, nome: 'América Mineiro', abreviacao: 'AMI', escudo_id: 15 },
    { id: 16, nome: 'Santos', abreviacao: 'SAN', escudo_id: 16 },
    { id: 17, nome: 'Red Bull Bragantino', abreviacao: 'RBB', escudo_id: 17 },
    { id: 18, nome: 'Cuiabá', abreviacao: 'CUI', escudo_id: 18 },
    { id: 19, nome: 'Goiás', abreviacao: 'GOI', escudo_id: 19 },
    { id: 20, nome: 'Juventude', abreviacao: 'JUV', escudo_id: 20 }
  ];
}

/**
 * Get mock players (50+ players with media_num, posicao_id)
 * @returns {Array}
 */
export function getPlayers() {
  return [
    // Flamengo
    { atleta_id: 1, nome: 'Gabriel Diego', posicao_id: 1, clube_id: 1, media_num: 6.5 },
    { atleta_id: 2, nome: 'Matheuzinho', posicao_id: 2, clube_id: 1, media_num: 5.8 },
    { atleta_id: 3, nome: 'David Luiz', posicao_id: 3, clube_id: 1, media_num: 6.2 },
    { atleta_id: 4, nome: 'Pablo', posicao_id: 3, clube_id: 1, media_num: 6.0 },
    { atleta_id: 5, nome: 'Thiaguinho', posicao_id: 2, clube_id: 1, media_num: 5.9 },
    { atleta_id: 6, nome: 'Gerson', posicao_id: 4, clube_id: 1, media_num: 6.1 },
    { atleta_id: 7, nome: 'De Arrascaeta', posicao_id: 4, clube_id: 1, media_num: 7.0 },
    { atleta_id: 8, nome: 'Ayrton Lucas', posicao_id: 4, clube_id: 1, media_num: 5.7 },
    { atleta_id: 9, nome: 'Vitinho', posicao_id: 4, clube_id: 1, media_num: 5.5 },
    { atleta_id: 10, nome: 'Luiz Araújo', posicao_id: 5, clube_id: 1, media_num: 6.3 },
    { atleta_id: 11, nome: 'Gabriel Barbosa', posicao_id: 5, clube_id: 1, media_num: 7.2 },

    // Palmeiras
    { atleta_id: 12, nome: 'Weverton', posicao_id: 1, clube_id: 2, media_num: 6.8 },
    { atleta_id: 13, nome: 'Mayke', posicao_id: 2, clube_id: 2, media_num: 5.9 },
    { atleta_id: 14, nome: 'Piquerez', posicao_id: 2, clube_id: 2, media_num: 6.0 },
    { atleta_id: 15, nome: 'Gomez', posicao_id: 3, clube_id: 2, media_num: 6.4 },
    { atleta_id: 16, nome: 'Murilo', posicao_id: 3, clube_id: 2, media_num: 6.3 },
    { atleta_id: 17, nome: 'Richard Rios', posicao_id: 4, clube_id: 2, media_num: 6.2 },
    { atleta_id: 18, nome: 'Athanasios Rantos', posicao_id: 4, clube_id: 2, media_num: 5.8 },
    { atleta_id: 19, nome: 'Zé Rafael', posicao_id: 4, clube_id: 2, media_num: 6.0 },
    { atleta_id: 20, nome: 'Maurício', posicao_id: 4, clube_id: 2, media_num: 5.6 },
    { atleta_id: 21, nome: 'Dudu', posicao_id: 5, clube_id: 2, media_num: 6.7 },
    { atleta_id: 22, nome: 'Raphael Veiga', posicao_id: 5, clube_id: 2, media_num: 6.5 },

    // São Paulo
    { atleta_id: 23, nome: 'Rafael', posicao_id: 1, clube_id: 3, media_num: 6.4 },
    { atleta_id: 24, nome: 'Rafinha', posicao_id: 2, clube_id: 3, media_num: 5.7 },
    { atleta_id: 25, nome: 'Ferraresi', posicao_id: 3, clube_id: 3, media_num: 6.1 },
    { atleta_id: 26, nome: 'Diego Costa', posicao_id: 3, clube_id: 3, media_num: 6.2 },
    { atleta_id: 27, nome: 'Welington', posicao_id: 2, clube_id: 3, media_num: 5.9 },
    { atleta_id: 28, nome: 'Pablo Maia', posicao_id: 4, clube_id: 3, media_num: 6.0 },
    { atleta_id: 29, nome: 'Galoppo', posicao_id: 4, clube_id: 3, media_num: 5.8 },
    { atleta_id: 30, nome: 'Benilson', posicao_id: 4, clube_id: 3, media_num: 5.5 },
    { atleta_id: 31, nome: 'Bustos', posicao_id: 4, clube_id: 3, media_num: 5.4 },
    { atleta_id: 32, nome: 'Calleri', posicao_id: 5, clube_id: 3, media_num: 6.8 },
    { atleta_id: 33, nome: 'Luciano', posicao_id: 5, clube_id: 3, media_num: 6.6 },

    // Corinthians
    { atleta_id: 34, nome: 'Cássio', posicao_id: 1, clube_id: 4, media_num: 6.3 },
    { atleta_id: 35, nome: 'Fagner', posicao_id: 2, clube_id: 4, media_num: 5.6 },
    { atleta_id: 36, nome: 'André Luis', posicao_id: 3, clube_id: 4, media_num: 6.0 },
    { atleta_id: 37, nome: 'Balbuena', posicao_id: 3, clube_id: 4, media_num: 5.9 },
    { atleta_id: 38, nome: 'Matheus Bidu', posicao_id: 2, clube_id: 4, media_num: 5.7 },
    { atleta_id: 39, nome: 'Renato Augusto', posicao_id: 4, clube_id: 4, media_num: 6.2 },
    { atleta_id: 40, nome: 'Du Queiroz', posicao_id: 4, clube_id: 4, media_num: 5.5 },
    { atleta_id: 41, nome: 'Xavier', posicao_id: 4, clube_id: 4, media_num: 5.4 },
    { atleta_id: 42, nome: 'Róger Guedes', posicao_id: 5, clube_id: 4, media_num: 6.4 },
    { atleta_id: 43, nome: 'Yuri Alberto', posicao_id: 5, clube_id: 4, media_num: 6.5 },

    // Atlético Mineiro
    { atleta_id: 44, nome: 'Everson', posicao_id: 1, clube_id: 5, media_num: 6.6 },
    { atleta_id: 45, nome: 'Guga', posicao_id: 2, clube_id: 5, media_num: 5.8 },
    { atleta_id: 46, nome: 'Réver', posicao_id: 3, clube_id: 5, media_num: 6.3 },
    { atleta_id: 47, nome: 'Lyanco', posicao_id: 3, clube_id: 5, media_num: 6.1 },
    { atleta_id: 48, nome: 'Saravia', posicao_id: 2, clube_id: 5, media_num: 5.9 },
    { atleta_id: 49, nome: 'Alan Franco', posicao_id: 4, clube_id: 5, media_num: 6.0 },
    { atleta_id: 50, nome: 'Zaracho', posicao_id: 4, clube_id: 5, media_num: 6.5 },
    { atleta_id: 51, nome: 'Sasha', posicao_id: 4, clube_id: 5, media_num: 5.9 },
    { atleta_id: 52, nome: 'Nacho Fernández', posicao_id: 4, clube_id: 5, media_num: 5.7 },
    { atleta_id: 53, nome: 'Hulk', posicao_id: 5, clube_id: 5, media_num: 7.1 },
    { atleta_id: 54, nome: 'Keno', posicao_id: 5, clube_id: 5, media_num: 6.4 }
  ];
}

/**
 * Get mock match schedule
 * @returns {Array}
 */
export function getPartidas() {
  return [
    {
      id: 1,
      clube_casa_id: 1,
      clube_visitante_id: 2,
      placar_casa: 0,
      placar_visitante: 0,
      data_realizacao: '2024-05-20T20:00:00'
    },
    {
      id: 2,
      clube_casa_id: 3,
      clube_visitante_id: 4,
      placar_casa: 0,
      placar_visitante: 0,
      data_realizacao: '2024-05-20T20:30:00'
    },
    {
      id: 3,
      clube_casa_id: 5,
      clube_visitante_id: 6,
      placar_casa: 0,
      placar_visitante: 0,
      data_realizacao: '2024-05-21T19:00:00'
    }
  ];
}

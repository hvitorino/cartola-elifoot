export default function handler(req, res) {
  const clubs = [
    { id: 1, nome: 'Flamengo', abreviacao: 'FLA', escudo: '🔴' },
    { id: 2, nome: 'Palmeiras', abreviacao: 'PAL', escudo: '💚' },
    { id: 3, nome: 'São Paulo', abreviacao: 'SPA', escudo: '⚪' },
    { id: 4, nome: 'Corinthians', abreviacao: 'COR', escudo: '🟤' },
    { id: 5, nome: 'Santos', abreviacao: 'SAN', escudo: '⚽' },
    { id: 6, nome: 'Botafogo', abreviacao: 'BOT', escudo: '⭐' },
    { id: 7, nome: 'Vasco', abreviacao: 'VAS', escudo: '⚫' },
    { id: 8, nome: 'Fluminense', abreviacao: 'FLU', escudo: '🔵' },
    { id: 9, nome: 'Cruzeiro', abreviacao: 'CRU', escudo: '🔷' },
    { id: 10, nome: 'Atlético MG', abreviacao: 'CAM', escudo: '🖤' },
    { id: 11, nome: 'Gremio', abreviacao: 'GRE', escudo: '💙' },
    { id: 12, nome: 'Internacional', abreviacao: 'INT', escudo: '❤️' },
    { id: 13, nome: 'Bahia', abreviacao: 'BAH', escudo: '🔴' },
    { id: 14, nome: 'Cebolinha', abreviacao: 'CEP', escudo: '🟡' },
    { id: 15, nome: 'Chapecoense', abreviacao: 'CHA', escudo: '🟢' },
    { id: 16, nome: 'Cuiaba', abreviacao: 'CUI', escudo: '🟨' },
    { id: 17, nome: 'Goias', abreviacao: 'GOI', escudo: '💛' },
    { id: 18, nome: 'RB Bragantino', abreviacao: 'RBB', escudo: '❤️' },
    { id: 19, nome: 'Fortaleza', abreviacao: 'FOR', escudo: '🔵' },
    { id: 20, nome: 'Vitoria', abreviacao: 'VIT', escudo: '❤️' }
  ];

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(clubs);
}

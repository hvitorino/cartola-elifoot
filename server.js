import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Mock data for fallback
const mockClubs = [
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

// API Routes
app.get('/api/clubes', (req, res) => {
  try {
    res.json(mockClubs);
  } catch (err) {
    console.error('Error in /api/clubes:', err);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

app.get('/api/atletas/mercado', (req, res) => {
  try {
    const players = generateMockPlayers();
    res.json(players);
  } catch (err) {
    console.error('Error in /api/atletas/mercado:', err);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

app.get('/api/partidas/:rodada', (req, res) => {
  try {
    const matches = generateMockMatches(parseInt(req.params.rodada));
    res.json(matches);
  } catch (err) {
    console.error('Error in /api/partidas:', err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// Helper functions
function generateMockPlayers() {
  const posicoes = [
    { id: 1, nome: 'Goleiro' },
    { id: 2, nome: 'Lateral' },
    { id: 3, nome: 'Zagueiro' },
    { id: 4, nome: 'Meia' },
    { id: 5, nome: 'Atacante' }
  ];

  const players = [];
  for (let i = 1; i <= 50; i++) {
    const posicao = posicoes[Math.floor(Math.random() * posicoes.length)];
    players.push({
      atleta_id: i,
      nome: `Jogador ${i}`,
      posicao_id: posicao.id,
      clube_id: Math.floor(Math.random() * 20) + 1,
      media_num: parseFloat((Math.random() * 5 + 3).toFixed(2)),
      preco_num: parseFloat((Math.random() * 20 + 5).toFixed(2)),
      form: Math.floor(Math.random() * 5) + 1
    });
  }
  return players;
}

function generateMockMatches(round = 1) {
  const matches = [];
  for (let i = 1; i <= 10; i++) {
    matches.push({
      rodada: round,
      mandante_id: Math.floor(Math.random() * 20) + 1,
      visitante_id: Math.floor(Math.random() * 20) + 1,
      placar_mandante: Math.floor(Math.random() * 4),
      placar_visitante: Math.floor(Math.random() * 4),
      status: 'finalizado'
    });
  }
  return matches;
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Cartola Elifoot API running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   - GET /api/clubes`);
  console.log(`   - GET /api/atletas/mercado`);
  console.log(`   - GET /api/partidas/:rodada`);
  console.log(`   - GET /health`);
});

export default app;

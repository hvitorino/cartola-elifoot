import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Mock clubs data
const clubs = [
  { id: 1, nome: 'Flamengo', abreviacao: 'FLA' },
  { id: 2, nome: 'Palmeiras', abreviacao: 'PAL' },
  { id: 3, nome: 'São Paulo', abreviacao: 'SPA' },
  { id: 4, nome: 'Corinthians', abreviacao: 'COR' },
  { id: 5, nome: 'Santos', abreviacao: 'SAN' },
  { id: 6, nome: 'Botafogo', abreviacao: 'BOT' },
  { id: 7, nome: 'Vasco', abreviacao: 'VAS' },
  { id: 8, nome: 'Fluminense', abreviacao: 'FLU' },
  { id: 9, nome: 'Cruzeiro', abreviacao: 'CRU' },
  { id: 10, nome: 'Atlético MG', abreviacao: 'CAM' },
  { id: 11, nome: 'Gremio', abreviacao: 'GRE' },
  { id: 12, nome: 'Internacional', abreviacao: 'INT' },
  { id: 13, nome: 'Bahia', abreviacao: 'BAH' },
  { id: 14, nome: 'Cebolinha', abreviacao: 'CEP' },
  { id: 15, nome: 'Chapecoense', abreviacao: 'CHA' },
  { id: 16, nome: 'Cuiaba', abreviacao: 'CUI' },
  { id: 17, nome: 'Goias', abreviacao: 'GOI' },
  { id: 18, nome: 'RB Bragantino', abreviacao: 'RBB' },
  { id: 19, nome: 'Fortaleza', abreviacao: 'FOR' },
  { id: 20, nome: 'Vitoria', abreviacao: 'VIT' }
];

// API Routes
app.get('/api/clubes', (req, res) => {
  console.log('📡 GET /api/clubes');
  res.json(clubs);
});

// Serve index.html for root
app.get('/', (req, res) => {
  console.log('📡 GET /');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  console.log(`⚠️ 404: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Cartola Elifoot API running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   - GET /api/clubes`);
  console.log(`   - GET /\n`);
});

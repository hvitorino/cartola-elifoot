import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const CARTOLA_API = 'https://api.cartola.globo.com';
const FETCH_TIMEOUT = 5000; // 5 seconds
const CACHE_TIMEOUT = 3600000; // 1 hour

// Cache for /api/atletas/mercado
let cachedPlayers = null;
let cacheTimestamp = null;

/**
 * Wrapper to fetch with timeout and error handling
 */
async function fetchWithTimeout(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err.message);
    throw err;
  }
}

/**
 * GET /api/clubes
 * Proxy to Cartola API - get all Serie A clubs
 */
app.get('/api/clubes', async (req, res) => {
  try {
    const data = await fetchWithTimeout(`${CARTOLA_API}/clubes`);
    res.json(data);
  } catch (err) {
    console.error('Error fetching clubes:', err.message);
    res.status(502).json({ error: 'Failed to fetch clubs', message: err.message });
  }
});

/**
 * GET /api/atletas/mercado
 * Proxy to Cartola API - get all available players in current market
 * (with caching to reduce API load)
 */
app.get('/api/atletas/mercado', async (req, res) => {
  // Return cached if fresh
  if (cachedPlayers && Date.now() - cacheTimestamp < CACHE_TIMEOUT) {
    return res.json(cachedPlayers);
  }

  try {
    const data = await fetchWithTimeout(`${CARTOLA_API}/atletas/mercado`);
    cachedPlayers = data;
    cacheTimestamp = Date.now();
    res.json(data);
  } catch (err) {
    console.error('Error fetching atletas/mercado:', err.message);
    if (cachedPlayers) {
      // Return stale cache on error
      return res.json(cachedPlayers);
    }
    res.status(502).json({ error: 'Failed to fetch players', message: err.message });
  }
});

/**
 * GET /api/partidas/:rodada
 * Proxy to Cartola API - get match schedule for a round
 */
app.get('/api/partidas/:rodada', async (req, res) => {
  try {
    const { rodada } = req.params;
    const data = await fetchWithTimeout(`${CARTOLA_API}/partidas/${rodada}`);
    res.json(data);
  } catch (err) {
    console.error(`Error fetching partidas/${req.params.rodada}:`, err.message);
    res.status(502).json({ error: 'Failed to fetch matches', message: err.message });
  }
});

/**
 * GET /api/pos-rodada/destaques
 * Proxy to Cartola API - get highlights after a round
 */
app.get('/api/pos-rodada/destaques', async (req, res) => {
  try {
    const data = await fetchWithTimeout(`${CARTOLA_API}/pos-rodada/destaques`);
    res.json(data);
  } catch (err) {
    console.error('Error fetching pos-rodada/destaques:', err.message);
    res.status(502).json({ error: 'Failed to fetch highlights', message: err.message });
  }
});

/**
 * GET /api/classificacao
 * Proxy to Cartola API - league standings
 */
app.get('/api/classificacao', async (req, res) => {
  try {
    const data = await fetchWithTimeout(`${CARTOLA_API}/classificacao`);
    res.json(data);
  } catch (err) {
    console.error('Error fetching classificacao:', err.message);
    // Return fallback standings from data file
    try {
      const fallback = await import('./public/data/tabela-inicial.json', { assert: { type: 'json' } });
      return res.json(fallback.default);
    } catch (fallbackErr) {
      console.error('Error loading fallback standings:', fallbackErr.message);
      res.status(502).json({ error: 'Failed to fetch standings', message: err.message });
    }
  }
});

/**
 * GET /
 * Serve index.html
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

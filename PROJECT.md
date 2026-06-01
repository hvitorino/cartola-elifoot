# Elifoot Cartola — Plano de Projeto

## Conceito

Jogo de gerenciamento de futebol inspirado no Elifoot, usando dados reais da API do Cartola FC (Série A do Brasileirão). O jogador gerencia um clube real, escala 11 jogadores a cada rodada e acompanha a partida via narração textual, exatamente como no Cartola FC — mas com simulação de jogo.

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Frontend | HTML + CSS + Vanilla JS |
| Backend | Node.js + Express |
| Dados | API pública do Cartola FC |
| Simulação | Algoritmo JS client-side |
| Deploy | Vercel |

---

## Estrutura de Pastas

```
elifoot-cartola/
├── public/
│   ├── index.html          # Tela inicial (escolher clube)
│   ├── escalacao.html      # Tela de escalação
│   ├── simulacao.html      # Narração da partida
│   ├── resultado.html      # Resultado + tabela
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── api.js          # Chamadas à API do Cartola
│       ├── simulacao.js    # Motor de simulação
│       ├── narracao.js     # Pool de frases narrativas
│       └── estado.js       # Gerenciamento de estado do jogo
├── server.js               # Express server + proxy da API Cartola
├── package.json
├── vercel.json
└── CLAUDE.md               # Este arquivo
```

---

## Telas e Fluxo

```
[Tela Inicial]
  → Escolher clube para gerenciar
  → Carregar elenco via API Cartola

[Painel da Rodada]
  → Ver adversário da rodada
  → Ver escalação atual
  → Botão para ir à escalação

[Escalação]
  → Listar jogadores disponíveis do elenco
  → Selecionar 11 titulares por posição
  → Escolher esquema tático (4-4-2, 4-3-3, 3-5-2)
  → Confirmar e simular

[Simulação]
  → Narração textual lance a lance
  → Animação de texto progressiva (1 lance por vez)
  → Tipos de lance: chute, falta, escanteio, gol, defesa, cartão

[Resultado]
  → Placar final
  → Destaques da partida (artilheiro, melhor jogador)
  → Tabela de classificação atualizada
  → Próxima rodada
```

---

## API do Cartola FC

Base URL: `https://api.cartola.globo.com`

### Endpoints principais

| Endpoint | Uso |
|---|---|
| `/clubes` | Lista todos os clubes da Série A |
| `/atletas/mercado` | Jogadores disponíveis com estatísticas |
| `/partidas/{rodada}` | Confrontos da rodada |
| `/pos-rodada/destaques` | Destaques após a rodada |

### Proxy no server.js

A API do Cartola não permite CORS direto do browser. O `server.js` precisa fazer proxy das chamadas:

```javascript
app.get('/api/clubes', async (req, res) => {
  const response = await fetch('https://api.cartola.globo.com/clubes');
  const data = await response.json();
  res.json(data);
});
```

---

## Motor de Simulação

### Atributos dos jogadores (vindos do Cartola)

- `media_num` — Média de pontuação do atleta
- `posicao_id` — 1=GOL, 2=LAT, 3=ZAG, 4=MEI, 5=ATA, 6=TEC
- `clube_id` — Clube atual

### Fórmula de força por time

```javascript
// Força de ataque = média dos MEIs + ATAs escalados
const forcaAtaque = media([...meias, ...atacantes]);

// Força de defesa = média do GOL + ZAGs + LATs
const forcaDefesa = media([goleiro, ...zagueiros, ...laterais]);
```

### Probabilidade de gol por lance

```javascript
// Chance de gol num lance ofensivo
const chanceGol = (forcaAtaque / (forcaAtaque + forcaDefesaAdversario)) * FATOR_ALEATORIO;

// FATOR_ALEATORIO = Math.random() * 0.4 + 0.8  (entre 0.8 e 1.2)
```

### Distribuição de lances por partida

- Total de lances: 20 a 28 por partida
- ~60% dos lances são do time da casa
- Tipos de lance e probabilidades:
  - `chute_fora` — 35%
  - `chute_defendido` — 25%
  - `escanteio` — 15%
  - `falta` — 15%
  - `gol` — 10% (condicionado à força de ataque)

---

## Narração Textual

### Estrutura de um lance

```javascript
const lance = {
  tipo: 'gol',           // tipo do evento
  atacante: 'Hulk',      // jogador principal
  defensor: 'Renan',     // jogador adversário (opcional)
  minuto: 37             // minuto do jogo
};
```

### Pool de frases por tipo (exemplos)

```javascript
const frases = {
  gol: [
    "{minuto}' — {atacante} recebe na área, domina e não perdoa! GOOOOL!",
    "{minuto}' — Que golaço de {atacante}! Chute de fora da área, sem chance pro goleiro!",
    "{minuto}' — {atacante} aproveita o rebote e empurra pra rede. É gol!"
  ],
  chute_defendido: [
    "{minuto}' — {atacante} arrisca de longe, mas o goleiro espalma com segurança.",
    "{minuto}' — Boa chegada de {atacante}, mas a defesa corta no último momento."
  ],
  chute_fora: [
    "{minuto}' — {atacante} domina e chuta cruzado, mas a bola passa longe do gol.",
    "{minuto}' — Tentativa de {atacante} pela direita. Mandou pra fora."
  ],
  escanteio: [
    "{minuto}' — Pressão do ataque! Bola no escanteio.",
    "{minuto}' — {atacante} cruza na área, defesa afasta. Escanteio!"
  ],
  falta: [
    "{minuto}' — Falta dura em {atacante}. Jogo parado.",
    "{minuto}' — {defensor} trava {atacante} na entrada da área. Falta perigosa!"
  ]
};
```

---

## Gerenciamento de Estado

Armazenar em `localStorage` para persistir entre telas:

```javascript
const estadoInicial = {
  clubeId: null,           // Clube escolhido pelo jogador
  rodadaAtual: 1,
  escalacaoAtual: [],      // Array de atleta_ids
  esquemaTatico: '4-4-2',
  tabela: [],              // Classificação da Série A
  historico: []            // Rodadas jogadas
};
```

---

## Fases de Desenvolvimento

### Fase 1 — MVP jogável

- [ ] `server.js` com proxy da API Cartola
- [ ] Tela de seleção de clube
- [ ] Tela de escalação com jogadores reais
- [ ] Motor de simulação básico
- [ ] Narração textual (15+ tipos de lance)
- [ ] Tela de resultado com placar

### Fase 2 — Polimento

- [ ] Tabela de classificação da temporada
- [ ] Histórico de rodadas jogadas
- [ ] Narração mais rica (30+ lances com variação dramática)
- [ ] Visual responsivo e mobile-first
- [ ] Animação de texto progressiva na simulação

### Fase 3 — Profundidade

- [ ] Moral/forma dos jogadores afeta a simulação
- [ ] Lesões e suspensões entre rodadas
- [ ] Estatísticas acumuladas por temporada
- [ ] Modo carreira (múltiplas temporadas)

---

## Regras de Desenvolvimento

- Manter tudo em **Vanilla JS** — sem frameworks no frontend
- Toda lógica de simulação fica no **client-side** (`/public/js/`)
- O `server.js` serve apenas como **proxy da API** e arquivos estáticos
- Usar `localStorage` para persistência de estado entre telas
- A API do Cartola pode estar **fora do ar** ou **bloqueada fora de temporada** — sempre tratar erros e ter dados mockados de fallback em `/public/js/mock_data.js`
- Mobile-first: o jogo deve funcionar bem em tela de celular

---

## Comandos Úteis

```bash
# Instalar dependências
npm install

# Rodar localmente
node server.js

# Deploy
vercel --prod
```

---

## Referências

- API Cartola (não oficial): `https://api.cartola.globo.com`
- Documentação da API (community): `https://github.com/wgenial/cartrolandos`
- Elifoot original: referência de gameplay e narração textual
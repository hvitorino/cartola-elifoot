/**
 * MatchCard Component
 * 3 variants: compact (280x120), standard (380x280), expanded (700px+ modal)
 */

class MatchCardCompact {
  constructor(options = {}) {
    this.match = options.match;
    this.userScore = options.userScore || 0;
    this.status = options.status || 'upcoming';
  }

  render() {
    const card = document.createElement('div');
    card.className = 'match-card-compact';

    const teamA = document.createElement('div');
    teamA.className = 'match-card-compact__team';
    teamA.innerHTML = `
      <div class="match-card-compact__team-name">${this.match.homeTeam}</div>
      <div class="match-card-compact__team-score">${this.match.homeScore || '-'}</div>
    `;

    const vs = document.createElement('div');
    vs.className = 'match-card-compact__vs';
    vs.textContent = 'vs';

    const teamB = document.createElement('div');
    teamB.className = 'match-card-compact__team';
    teamB.innerHTML = `
      <div class="match-card-compact__team-score">${this.match.awayScore || '-'}</div>
      <div class="match-card-compact__team-name">${this.match.awayTeam}</div>
    `;

    const userPoints = document.createElement('div');
    userPoints.className = 'match-card-compact__user-points';
    userPoints.textContent = `You: ${this.userScore}pts`;

    card.appendChild(teamA);
    card.appendChild(vs);
    card.appendChild(teamB);
    card.appendChild(userPoints);

    return card;
  }
}

class MatchCardStandard {
  constructor(options = {}) {
    this.match = options.match;
    this.userScore = options.userScore || 0;
    this.status = options.status || 'upcoming';
  }

  render() {
    const card = document.createElement('div');
    card.className = 'match-card-standard';

    const header = document.createElement('div');
    header.className = 'match-card-standard__header';
    const badge = new StatusBadge({
      status: this.status === 'live' ? 'fit' : 'fit',
      size: 'sm',
      showLabel: true
    });
    header.appendChild(badge.render());

    const score = document.createElement('div');
    score.className = 'match-card-standard__score';
    score.innerHTML = `
      <div class="match-card-standard__team">
        <div class="match-card-standard__team-name">${this.match.homeTeam}</div>
        <div class="match-card-standard__goals">${this.match.homeScore || '-'}</div>
      </div>
      <div class="match-card-standard__vs">vs</div>
      <div class="match-card-standard__team">
        <div class="match-card-standard__goals">${this.match.awayScore || '-'}</div>
        <div class="match-card-standard__team-name">${this.match.awayTeam}</div>
      </div>
    `;

    const stats = document.createElement('div');
    stats.className = 'match-card-standard__stats';
    stats.innerHTML = `
      <div class="match-card-standard__stat">
        <span>Shots</span>
        <span>${this.match.homeShots || 0} - ${this.match.awayShots || 0}</span>
      </div>
      <div class="match-card-standard__stat">
        <span>Possession</span>
        <span>${this.match.homePossession || 0}% - ${this.match.awayPossession || 0}%</span>
      </div>
    `;

    const userSection = document.createElement('div');
    userSection.className = 'match-card-standard__user-score';
    userSection.innerHTML = `
      <span class="match-card-standard__label">Your Score</span>
      <span class="match-card-standard__points">${this.userScore} points</span>
    `;

    card.appendChild(header);
    card.appendChild(score);
    card.appendChild(stats);
    card.appendChild(userSection);

    return card;
  }
}

class MatchCardExpanded {
  constructor(options = {}) {
    this.match = options.match;
    this.userScore = options.userScore || 0;
    this.status = options.status || 'upcoming';
    this.onClose = options.onClose || null;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'match-card-expanded';

    const header = document.createElement('div');
    header.className = 'match-card-expanded__header';
    header.innerHTML = `
      <div class="match-card-expanded__title">${this.match.homeTeam} vs ${this.match.awayTeam}</div>
      <button class="match-card-expanded__close" aria-label="Close">×</button>
    `;

    const score = document.createElement('div');
    score.className = 'match-card-expanded__score';
    score.innerHTML = `
      <div class="match-card-expanded__team">
        <h3>${this.match.homeTeam}</h3>
        <div class="match-card-expanded__big-score">${this.match.homeScore || 0}</div>
      </div>
      <div class="match-card-expanded__vs">vs</div>
      <div class="match-card-expanded__team">
        <div class="match-card-expanded__big-score">${this.match.awayScore || 0}</div>
        <h3>${this.match.awayTeam}</h3>
      </div>
    `;

    const stats = document.createElement('div');
    stats.className = 'match-card-expanded__stats';
    stats.innerHTML = `
      <div class="match-card-expanded__stat">
        <span class="stat-label">Shots</span>
        <span class="stat-value">${this.match.homeShots || 0}</span>
        <div class="stat-bar">
          <div class="stat-bar-fill" style="width: ${(this.match.homeShots / (this.match.homeShots + this.match.awayShots || 1)) * 100}%"></div>
        </div>
        <span class="stat-value">${this.match.awayShots || 0}</span>
      </div>
      <div class="match-card-expanded__stat">
        <span class="stat-label">Possession</span>
        <span class="stat-value">${this.match.homePossession || 0}%</span>
        <div class="stat-bar">
          <div class="stat-bar-fill" style="width: ${this.match.homePossession || 0}%"></div>
        </div>
        <span class="stat-value">${this.match.awayPossession || 0}%</span>
      </div>
    `;

    const userSection = document.createElement('div');
    userSection.className = 'match-card-expanded__user-score';
    userSection.innerHTML = `
      <h4>Your Performance</h4>
      <div class="match-card-expanded__points">${this.userScore} points</div>
    `;

    card.appendChild(header);
    card.appendChild(score);
    card.appendChild(stats);
    card.appendChild(userSection);

    const closeBtn = card.querySelector('.match-card-expanded__close');
    if (closeBtn && this.onClose) {
      closeBtn.addEventListener('click', this.onClose);
    }

    return card;
  }
}

// Dispatcher
class MatchCard {
  constructor(options = {}) {
    this.variant = options.variant || 'standard';
    this.options = options;
  }

  render() {
    switch (this.variant) {
      case 'compact':
        return new MatchCardCompact(this.options).render();
      case 'expanded':
        return new MatchCardExpanded(this.options).render();
      case 'standard':
      default:
        return new MatchCardStandard(this.options).render();
    }
  }

  static create(options, container) {
    const card = new MatchCard(options);
    const element = card.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MatchCard, MatchCardCompact, MatchCardStandard, MatchCardExpanded };
}

/**
 * MatchTimeline Component
 * Timeline of match events: goal, yellow_card, red_card, substitution, injury, kickoff, half_time, full_time
 */

const EVENT_CONFIG = {
  goal: { icon: '⚽', color: '#d85b5b', label: 'Goal' },
  yellow_card: { icon: '🟨', color: '#ffb84d', label: 'Yellow Card' },
  red_card: { icon: '🟥', color: '#ff5c5c', label: 'Red Card' },
  substitution: { icon: '🔄', color: '#8b7fd8', label: 'Substitution' },
  injury: { icon: '🏥', color: '#ffb84d', label: 'Injury' },
  kickoff: { icon: '⏱', color: '#4a9eff', label: 'Kick Off' },
  half_time: { icon: '⏸', color: '#8b95a5', label: 'Half Time' },
  full_time: { icon: '⏹', color: '#6bbf59', label: 'Full Time' }
};

class MatchTimeline {
  constructor(options = {}) {
    this.events = options.events || [];
    this.matchId = options.matchId || '';
    this.autoScroll = options.autoScroll !== false;
    this.maxHeight = options.maxHeight || 500;
    this.showDetails = options.showDetails !== false;
    this.compact = options.compact || false;
    this.onEventClick = options.onEventClick || null;
  }

  render() {
    const container = document.createElement('div');
    container.className = `match-timeline ${this.compact ? 'match-timeline--compact' : ''}`;
    container.style.maxHeight = `${this.maxHeight}px`;

    // Sort events in reverse chronological order
    const sortedEvents = [...this.events].sort((a, b) => b.minute - a.minute);

    sortedEvents.forEach((event, index) => {
      const eventEl = this.renderEvent(event, index);
      container.appendChild(eventEl);
    });

    return container;
  }

  renderEvent(event, index) {
    const config = EVENT_CONFIG[event.type] || EVENT_CONFIG.kickoff;

    const eventEl = document.createElement('div');
    eventEl.className = `match-timeline__event match-timeline__event--${event.type}`;
    eventEl.style.setProperty('--event-color', config.color);
    eventEl.style.animationDelay = `${index * 50}ms`;

    eventEl.innerHTML = `
      <div class="match-timeline__event-left">
        <div class="match-timeline__event-time">${event.minute}'</div>
      </div>
      <div class="match-timeline__event-center">
        <div class="match-timeline__event-dot" title="${config.label}">
          ${config.icon}
        </div>
      </div>
      <div class="match-timeline__event-content">
        <div class="match-timeline__event-type">${config.label}</div>
        ${this.showDetails ? `
          <div class="match-timeline__event-player">${event.player}</div>
          ${event.team ? `<div class="match-timeline__event-team">${event.team}</div>` : ''}
          ${event.description ? `<div class="match-timeline__event-description">${event.description}</div>` : ''}
        ` : ''}
      </div>
    `;

    if (this.onEventClick) {
      eventEl.style.cursor = 'pointer';
      eventEl.addEventListener('click', () => this.onEventClick(event));
    }

    return eventEl;
  }

  static create(options, container) {
    const timeline = new MatchTimeline(options);
    const element = timeline.render();
    if (container) {
      container.appendChild(element);
    }
    return element;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MatchTimeline;
}

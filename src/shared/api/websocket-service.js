/**
 * Real-time WebSocket connection manager
 * Handles live match updates and events
 */

export class WebSocketService {
  constructor(url = `${window.location.protocol.replace('http', 'ws')}//${window.location.host}/ws`) {
    this.url = url;
    this.ws = null;
    this.connected = false;
    this.listeners = new Map();      // event → Set of callbacks
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  // Connect to WebSocket
  connect() {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.connected = true;
          this.reconnectAttempts = 0;
          this.emit('connected');
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.emit(message.type, message.data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.emit('error', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('WebSocket disconnected');
          this.connected = false;
          this.emit('disconnected');
          this.reconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  // Reconnect with exponential backoff
  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.connect().catch(() => {});
    }, delay);
  }

  // Subscribe to event
  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType).add(callback);

    return () => this.listeners.get(eventType).delete(callback);
  }

  // Emit event to all listeners
  emit(eventType, data) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in listener for ${eventType}:`, error);
        }
      });
    }
  }

  // Send message to server
  send(type, data = {}) {
    if (!this.connected) {
      console.warn('WebSocket not connected, queuing message');
      return false;
    }

    try {
      this.ws.send(JSON.stringify({ type, data }));
      return true;
    } catch (error) {
      console.error('Failed to send WebSocket message:', error);
      return false;
    }
  }

  // Subscribe to live match
  watchMatch(matchId) {
    this.send('subscribe_match', { matchId });
  }

  // Unsubscribe from match
  unwatchMatch(matchId) {
    this.send('unsubscribe_match', { matchId });
  }

  // Disconnect gracefully
  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      this.connected = false;
    }
  }
}

export const wsService = new WebSocketService();

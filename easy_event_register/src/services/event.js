const { all, get, run } = require('./db');

// PUBLIC_INTERFACE
class EventService {
  /** Get all events */
  // PUBLIC_INTERFACE
  async listEvents() {
    return all('SELECT id, name, date, location, description FROM events ORDER BY date ASC');
  }

  /** Get single event (for registration validation) */
  // PUBLIC_INTERFACE
  async getEventById(eventId) {
    return get('SELECT id, name, date, location, description FROM events WHERE id = ?', [eventId]);
  }

  /** Add new event (ADMIN/optional, not exposed in task) */
  // Optionally add this in future if admin functionality needed.
}

module.exports = new EventService();

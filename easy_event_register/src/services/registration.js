const { run, all, get } = require('./db');
const eventService = require('./event');

// PUBLIC_INTERFACE
class RegistrationService {
  /** Register a user for an event */
  // PUBLIC_INTERFACE
  async registerForEvent({ eventId, name, email }) {
    // Check event exists
    const event = await eventService.getEventById(eventId);
    if (!event) throw new Error('Event not found');

    const registeredAt = new Date().toISOString();
    const result = await run(
      'INSERT INTO registrations (event_id, name, email, registered_at) VALUES (?, ?, ?, ?)',
      [eventId, name, email, registeredAt]
    );
    return { id: result.lastID, eventId, name, email, registeredAt };
  }

  /** Get all registrations for an event (for demonstration, not secure, but no auth needed in this app) */
  // PUBLIC_INTERFACE
  async getRegistrationsForEvent(eventId) {
    return all(
      'SELECT id, name, email, registered_at FROM registrations WHERE event_id = ? ORDER BY registered_at DESC',
      [eventId]
    );
  }
}

module.exports = new RegistrationService();

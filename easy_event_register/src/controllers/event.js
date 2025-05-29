const eventService = require('../services/event');

// PUBLIC_INTERFACE
class EventController {
  /** List all events */
  // PUBLIC_INTERFACE
  async listEvents(req, res, next) {
    try {
      const events = await eventService.listEvents();
      res.status(200).json({ events });
    } catch (error) {
      next(error);
    }
  }

  /** Get single event (can be used for registration UI) */
  // PUBLIC_INTERFACE
  async getEvent(req, res, next) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.status(200).json({ event });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();

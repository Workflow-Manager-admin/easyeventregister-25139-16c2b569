const registrationService = require('../services/registration');

// PUBLIC_INTERFACE
class RegistrationController {
  /** Register a user for an event */
  // PUBLIC_INTERFACE
  async register(req, res, next) {
    try {
      const { eventId, name, email } = req.body;
      if (!eventId || !name || !email) {
        return res.status(400).json({ message: 'eventId, name, and email are required' });
      }
      const registration = await registrationService.registerForEvent({ eventId, name, email });
      res.status(201).json({ registration });
    } catch (error) {
      // Application errors bubbled for event not found or DB error
      if (error.message === 'Event not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  /** (Optional) List all registrations for an event (for demo) */
  // PUBLIC_INTERFACE
  async listRegistrations(req, res, next) {
    try {
      const { eventId } = req.params;
      if (!eventId) return res.status(400).json({ message: 'eventId param is required' });
      const regs = await registrationService.getRegistrationsForEvent(eventId);
      res.status(200).json({ registrations: regs });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RegistrationController();

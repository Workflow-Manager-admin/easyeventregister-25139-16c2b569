const express = require('express');
const eventController = require('../controllers/event');
const registrationController = require('../controllers/registration');

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get list of all events
 *     responses:
 *       200:
 *         description: List of events
 */
router.get('/', eventController.listEvents.bind(eventController));

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get details for a single event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get('/:id', eventController.getEvent.bind(eventController));

/**
 * @swagger
 * /events/{eventId}/registrations:
 *   get:
 *     summary: Get all registrations for a specific event
 *     responses:
 *       200:
 *         description: List of registrations for the event
 */
router.get('/:eventId/registrations', registrationController.listRegistrations.bind(registrationController));

module.exports = router;

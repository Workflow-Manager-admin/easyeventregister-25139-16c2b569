const express = require('express');
const registrationController = require('../controllers/registration');

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register for an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - eventId
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Registration successful
 *       404:
 *         description: Event not found
 *       400:
 *         description: Validation error
 */
router.post('/', registrationController.register.bind(registrationController));

module.exports = router;

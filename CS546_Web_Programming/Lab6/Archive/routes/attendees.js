// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import helper from '../helpers.js';
import { attendeeData } from '../data/index.js';
import express from 'express';

const router = express.Router();

router
  .route('/:eventId')
  .get(async (req, res) => {
    try {
      req.params.eventId = helper.checkId(req.params.eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      await helper.checkIfEventIdExists(req.params.eventId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }

    try {
      const attendee = await attendeeData.getAllAttendees(req.params.eventId);
      res.json(attendee);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    const eventDocument = req.body;
    let attendeeParams;

    try {
      req.params.eventId = helper.checkId(req.params.eventId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      await helper.checkIfEventIdExists(req.params.eventId);
    } catch (e) {
      return res.status(404).json({ error: e });
    }

    if (!eventDocument || Object.keys(eventDocument).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }

    const expectedParams = ['firstName', 'lastName', 'emailAddress'];

    const unexpectedParams = Object.keys(eventDocument).filter(param => !expectedParams.includes(param));

    if (unexpectedParams.length > 0) {
      return res.status(400).json({ error: `Unexpected parameters: ${unexpectedParams.join(', ')}` });
    }

    try {
      attendeeParams = helper.validateAttendeeParams(eventDocument.firstName, eventDocument.lastName, eventDocument.emailAddress);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      await helper.validateMaxCapacityAndDuplicateEmails(req.params.eventId, attendeeParams);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const attendee = await attendeeData.createAttendee(req.params.eventId, attendeeParams.firstName, attendeeParams.lastName, attendeeParams.emailAddress);
      return res.json(attendee);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    try {
      req.params.attendeeId = helper.checkId(req.params.attendeeId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const attendee = await attendeeData.getAttendee(req.params.attendeeId);
      return res.json(attendee);
    } catch (e) {
      return res.status(404).json({ error: e });
    }

  })
  .delete(async (req, res) => {
    try {
      req.params.attendeeId = helper.checkId(req.params.attendeeId);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const attendee = await attendeeData.removeAttendee(req.params.attendeeId);
      return res.json(attendee);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });

export default router;

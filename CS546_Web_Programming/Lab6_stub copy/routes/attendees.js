// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import helper from '../helpers.js';
import {attendeeData} from '../data/index.js';
import express from 'express';
import { ObjectId } from 'mongodb';

const router = express.Router();

router
  .route('/:eventId')
  .get(async (req, res) => {
    let eventId;
    try {
      eventId = new ObjectId(helper.checkId(req.params.eventId));
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      helper.checkIfEventIdExists(eventId);
    } catch (e) {
      return res.status(404).json({error: e});
    }

    try {
      const attendee = await attendeeData.getAllAttendees(eventId);
      res.json(attendee);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    const eventDocument = req.body;
    let attendeeParams;
    //make sure there is something present in the req.body
    if (!eventDocument|| Object.keys(eventDocument).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }

    try {
      attendeeParams = helper.validateAttendeeParams(eventDocument.firstName, eventDocument.lastName, eventDocument.emailAddress);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    let eventId;

    try {
      eventId = new ObjectId(helper.checkId(req.params.eventId));
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      helper.checkIfEventIdExists(eventId);
    } catch (e) {
      return res.status(404).json({error: e});
    }

    try {
      const attendee = await attendeeData.createAttendee(eventId, attendeeParams.firstName, attendeeParams.lastName, attendeeParams.emailAddress);
      return res.json(attendee);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    let attendeeId;

    try {
      attendeeId = new ObjectId(helper.checkId(req.params.attendeeId));
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const attendee = await attendeeData.getAttendee(attendeeId);
      return res.json(attendee);
    } catch (e) {
      return res.status(404).json({error: e});
    }

  })
  .delete(async (req, res) => {
    let attendeeId;

    try {
      attendeeId = new ObjectId(helper.checkId(req.params.attendeeId));
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const attendee = await attendeeData.removeAttendee(attendeeId);
      return res.json(attendee);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

  export default router;

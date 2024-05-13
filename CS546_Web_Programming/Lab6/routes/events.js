// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import helper from '../helpers.js';
import { eventData } from '../data/index.js';
import express from 'express';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const eventList = await eventData.getAll();
      return res.json(eventList);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const eventDocument = req.body;
    let eventParams;
    //make sure there is something present in the req.body
    if (!eventDocument || Object.keys(eventDocument).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }

    const expectedParams = ['eventName', 'description', 'eventLocation', 'contactEmail', 'maxCapacity', 'priceOfAdmission', 'eventDate', 'startTime', 'endTime', 'publicEvent'];

    const unexpectedParams = Object.keys(eventDocument).filter(param => !expectedParams.includes(param));

    if (unexpectedParams.length > 0) {
      return res.status(400).json({ error: `Unexpected parameters: ${unexpectedParams.join(', ')}` });
    }

    try {
      eventParams = helper.validateEventParams(eventDocument.eventName, eventDocument.description, eventDocument.eventLocation, eventDocument.contactEmail, eventDocument.maxCapacity, eventDocument.priceOfAdmission, eventDocument.eventDate, eventDocument.startTime, eventDocument.endTime, eventDocument.publicEvent);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    //insert the event
    try {
      const newEvent = await eventData.create(eventParams.eventName, eventParams.eventDescription, eventParams.eventLocation, eventParams.contactEmail, eventParams.maxCapacity, eventParams.priceOfAdmission, eventParams.eventDate, eventParams.startTime, eventParams.endTime, eventParams.publicEvent);
      return res.json(newEvent);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

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
      const event = await eventData.get(req.params.eventId);
      return res.json(event);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .delete(async (req, res) => {
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
      const deletedEvent = await eventData.remove(req.params.eventId);
      return res.json(deletedEvent);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    let eventParams;
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

    const eventDocument = req.body;
    //make sure there is something present in the req.body
    if (!eventDocument || Object.keys(eventDocument).length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no fields in the request body' });
    }

    const expectedParams = ['eventName', 'description', 'eventLocation', 'contactEmail', 'maxCapacity', 'priceOfAdmission', 'eventDate', 'startTime', 'endTime', 'publicEvent'];

    const unexpectedParams = Object.keys(eventDocument).filter(param => !expectedParams.includes(param));

    if (unexpectedParams.length > 0) {
      return res.status(400).json({ error: `Unexpected parameters: ${unexpectedParams.join(', ')}` });
    }

    try {
      eventParams = helper.validateEventParams(eventDocument.eventName, eventDocument.description, eventDocument.eventLocation, eventDocument.contactEmail, eventDocument.maxCapacity, eventDocument.priceOfAdmission, eventDocument.eventDate, eventDocument.startTime, eventDocument.endTime, eventDocument.publicEvent);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    //insert the event
    try {
      const newEvent = await eventData.update(req.params.eventId, eventParams.eventName, eventParams.eventDescription, eventParams.eventLocation, eventParams.contactEmail, eventParams.maxCapacity, eventParams.priceOfAdmission, eventParams.eventDate, eventParams.startTime, eventParams.endTime, eventParams.publicEvent);
      return res.json(newEvent);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });

export default router;

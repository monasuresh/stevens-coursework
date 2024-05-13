// This data file should export all functions using the ES6 standard as shown in the lecture code
import date from 'date-fns';
import state from 'usa-state-validator';
import { events } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import helper from '../helpers.js';

const exportedMethods = {

};
const create = async (
  eventName,
  eventDescription,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  let eventParams = helper.validateEventParams(eventName, eventDescription, eventLocation, contactEmail, maxCapacity, priceOfAdmission, eventDate, startTime, endTime, publicEvent);

  const newEvent = {
    eventName: eventParams.eventName,
    description: eventParams.eventDescription,
    eventLocation: eventParams.eventLocation,
    contactEmail: eventParams.contactEmail,
    maxCapacity: eventParams.maxCapacity,
    priceOfAdmission: eventParams.priceOfAdmission,
    eventDate: eventParams.eventDate,
    startTime: eventParams.startTime,
    endTime: eventParams.endTime,
    publicEvent: eventParams.publicEvent,
    attendees: [],
    totalNumberOfAttendees: 0
  };

  const eventCollection = await events();
  const insertInfo = await eventCollection.insertOne(newEvent);

  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add event';

  const newId = insertInfo.insertedId.toString();

  const event = await get(newId);
  event._id = event._id.toString();
  return event;
};

const getAll = async () => {
  const eventCollection = await events();
  const eventList = await eventCollection.find({}, { projection: { _id: 1, eventName: 1 } }).toArray();

  if (!eventList) throw 'Could not get all events';

  return eventList;
};

const get = async (eventId) => {
  if (!eventId) throw 'You must provide an id to search for';
  if (typeof eventId !== 'string') throw 'Id must be a string';
  if (eventId.trim().length === 0)
    throw 'id cannot be an empty string or just spaces';
  eventId = eventId.trim();
  if (!ObjectId.isValid(eventId)) throw 'invalid object ID';

  await helper.checkIfEventIdExists(eventId);
  
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: new ObjectId(eventId) });
  if (!event) throw 'No event with that id';
  event._id = event._id.toString();
  return event;
};

const remove = async (eventId) => {
  if (!eventId) throw 'You must provide an id to search for';
  if (typeof eventId !== 'string') throw 'Id must be a string';
  if (eventId.trim().length === 0)
    throw 'id cannot be an empty string or just spaces';
  eventId = eventId.trim();
  if (!ObjectId.isValid(eventId)) throw 'invalid object ID';
  await helper.checkIfEventIdExists(eventId);
  const eventCollection = await events();
  const deletionInfo = await eventCollection.findOneAndDelete({
    _id: new ObjectId(eventId)
  });

  if (!deletionInfo) {
    throw `Could not delete event with id of ${eventId}`;
  }

  return { eventName: deletionInfo.eventName, deleted: true };
};

const update = async (
  eventId,
  eventName,
  eventDescription,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  if (!eventId) throw 'You must provide an id to search for';
  if (typeof eventId !== 'string') throw 'Id must be a string';
  if (eventId.trim().length === 0)
    throw 'id cannot be an empty string or just spaces';
  eventId = eventId.trim();
  if (!ObjectId.isValid(eventId)) throw 'invalid object ID';

  let eventParams = helper.validateEventParams(eventName, eventDescription, eventLocation, contactEmail, maxCapacity, priceOfAdmission, eventDate, startTime, endTime, publicEvent);

  const updatedEvent = {
    eventName: eventParams.eventName,
    description: eventParams.eventDescription,
    eventLocation: eventParams.eventLocation,
    contactEmail: eventParams.contactEmail,
    maxCapacity: eventParams.maxCapacity,
    priceOfAdmission: eventParams.priceOfAdmission,
    eventDate: eventParams.eventDate,
    startTime: eventParams.startTime,
    endTime: eventParams.endTime,
    publicEvent: eventParams.publicEvent
  };

  await helper.checkIfEventIdExists(eventId);

  const eventCollection = await events();

  const updatedInfo = await eventCollection.findOneAndUpdate(
    {_id: new ObjectId(eventId)},
    {$set: updatedEvent},
    {returnDocument: 'after'}
  );

  if (!updatedInfo) {
    throw 'could not update event successfully';
  }
  return updatedInfo;
};

export default {
  create,
  getAll,
  get,
  remove,
  update
};

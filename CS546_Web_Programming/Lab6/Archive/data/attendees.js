// This data file should export all functions using the ES6 standard as shown in the lecture code
import helper from '../helpers.js';
import { events } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import eventHelper from './events.js';

const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  eventId = helper.checkId(eventId);

  let attendeeParams = helper.validateAttendeeParams(firstName, lastName, emailAddress);

  const eventCollection = await events();

  await helper.checkIfEventIdExists(eventId);

  await helper.validateMaxCapacityAndDuplicateEmails(eventId, attendeeParams);

  let newId = new ObjectId();

  const newAttendee = {
    _id: newId,
    firstName: attendeeParams.firstName,
    lastName: attendeeParams.lastName,
    emailAddress: attendeeParams.emailAddress
  };

  const updateResult1 = await eventCollection.updateOne({ _id: new ObjectId(eventId) }, { $push: { attendees: newAttendee } });
  const updateResult2 = await eventCollection.updateOne({ _id: new ObjectId(eventId) }, { $inc: { 'totalNumberOfAttendees': 1 } });

  if (!updateResult1 || !updateResult2) {
    throw 'Could not update event successfully';
  }

  let eventToReturn = await eventHelper.get(eventId);
  
  eventToReturn._id = new ObjectId(eventId);
  return eventToReturn;
};


const getAllAttendees = async (eventId) => {
  eventId = helper.checkId(eventId);
  const eventCollection = await events();

  await helper.checkIfEventIdExists(eventId);

  const eventList = await eventCollection.findOne({ _id: new ObjectId(eventId) }, { projection: { _id: 0, attendees: 1 } });
  if (!eventList) {
    throw 'Could not find attendee';
  }

  const attendees = eventList && eventList.attendees ? eventList.attendees : [];

  return attendees;
};

const getAttendee = async (attendeeId) => {
  await helper.checkId(attendeeId);
  const eventCollection = await events();
  const foundAttendee = await eventCollection.findOne(
    { 'attendees._id': new ObjectId(attendeeId) },
    { projection: { _id: 0, 'attendees.$': 1 } }
  );

  if (!foundAttendee) {
    throw 'No attendee found for the provided id';
  }

  return foundAttendee.attendees[0];
};

const removeAttendee = async (attendeeId) => {
  attendeeId = helper.checkId(attendeeId);
  const eventCollection = await events();

  const eventByAttendeeId = await eventCollection.findOne({
    'attendees._id': new ObjectId(attendeeId)
  });

  if (!eventByAttendeeId) {
    throw 'No attendee found for the provided id.';
  }

  await eventCollection.updateOne(
    { "attendees._id": new ObjectId(attendeeId) },
    { $pull: { attendees: { _id: new ObjectId(attendeeId) } } }
  );

  await eventCollection.updateOne({ _id: eventByAttendeeId._id }, { $inc: { 'totalNumberOfAttendees': -1 } });

  let attendeeToReturn = await eventHelper.get(eventByAttendeeId._id.toString());
  attendeeToReturn._id = eventByAttendeeId._id;
  return attendeeToReturn;
};

export default {
  createAttendee,
  getAllAttendees,
  getAttendee,
  removeAttendee
};

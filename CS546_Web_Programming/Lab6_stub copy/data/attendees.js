// This data file should export all functions using the ES6 standard as shown in the lecture code
import helper from '../helpers.js';
import { events } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import eventHelper from './events.js';

/*const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  if (!eventId || !firstName || !lastName || !emailAddress) {
    throw 'All fields need to have valid values.';
  }

  eventId = helper.checkId(eventId);

  if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof emailAddress !== 'string') {
    throw 'All fields need to be of type string.';
  }

  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.trim();

  if (firstName.length === 0 || lastName.length === 0 || emailAddress.length === 0) {
    throw 'The fields must have characters other than spaces.';
  }

  // Validate contactEmail format
  const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(emailAddress)) {
    throw "Invalid email format.";
  }
  
  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: new ObjectId(eventId) });
  if (!event) throw 'No event with that id';
  
  const newAttendee = {
    _id: v4(),
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress
  };

  await eventCollection.updateOne({_id: eventId}, {$push: {attendees: newAttendee}});
  const updatedInfo = await eventCollection.updateOne({_id: eventId}, {$inc: {totalNumberOfAttendees: 1}});
  
  if (!updatedInfo) {
    throw 'could not update event successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
}; */

const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  eventId = helper.checkId(eventId);

  let attendeeParams = helper.validateAttendeeParams(firstName, lastName, emailAddress);

  const eventCollection = await events();

  const eventToModify = await eventCollection.findOne({ _id: eventId });

  if (eventToModify.totalNumberOfAttendees >= eventToModify.maxCapacity) {
    throw 'You have exceeded the max capacity.';
  }

  const event = await eventCollection.findOne({ _id: eventId });
  if (!event) throw 'No event with that id';

  let newId = new ObjectId();

  const newAttendee = {
    _id: newId,
    firstName: attendeeParams.firstName,
    lastName: attendeeParams.lastName,
    emailAddress: attendeeParams.emailAddress
  };

  const updateResult1 = await eventCollection.updateOne({ _id: eventId }, { $push: { attendees: newAttendee } });
  const updateResult2 = await eventCollection.updateOne({ _id: eventId }, { $inc: { 'totalNumberOfAttendees': 1 } });

  if (!updateResult1 || !updateResult2) {
    throw 'Could not update event successfully';
  }

  return eventHelper.get(eventId);
};


const getAllAttendees = async (eventId) => {
  eventId = helper.checkId(eventId);
  const eventCollection = await events();
  const eventList = await eventCollection.findOne({ _id: eventId }, { projection: { _id: 0, attendees: 1 } });
  if (!eventList) {
    throw 'Could not find attendee';
  }

  const attendees = eventList && eventList.attendees ? eventList.attendees : [];

  return attendees;
};

const getAttendee = async (attendeeId) => {
  if (!attendeeId) throw 'You must provide a name for the reviewer';
  const eventCollection = await events();
  const foundAttendee = await eventCollection.findOne(
    { 'attendees._id': attendeeId },
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
  // removes all matching array entry; remember, if you add
  // you can use $pullAll to pull multiple entries
  //await eventCollection.updateOne({ _id: new ObjectId(eventId) }, { $pull: { attendees: { _id: new ObjectId(attendeeId) } } });

  const eventByAttendeeId = await eventCollection.findOne({
    'attendees._id': attendeeId
  });



  await eventCollection.updateOne(
    { "attendees._id": attendeeId },
    { $pull: { attendees: { _id: attendeeId } } }
  );

  await eventCollection.updateOne({ _id: eventByAttendeeId._id }, { $inc: { 'totalNumberOfAttendees': -1 } });

  return await eventHelper.get(eventByAttendeeId._id);
};

export default {
  createAttendee,
  getAllAttendees,
  getAttendee,
  removeAttendee
};

// TODO: Export and implement the following functions in ES6 format
//import date from 'date-and-time';
import date from 'date-fns';
import state from 'usa-state-validator';
import { events } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import helper from '../helpers.js';

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
  if (!eventName || !eventDescription || !eventLocation || !contactEmail || maxCapacity === undefined || maxCapacity === null ||
    priceOfAdmission === undefined || priceOfAdmission === null || !eventDate || !startTime || !endTime || publicEvent === undefined || publicEvent === null) {
    throw 'All fields need to have valid values';
  }

  if (typeof eventName !== 'string' || typeof eventDescription !== 'string' || typeof contactEmail !== 'string' ||
    typeof eventDate !== 'string' || typeof startTime !== 'string' || typeof endTime !== 'string') {
    throw 'One or more inputs are not of type string';
  }

  eventName = eventName.trim();
  eventDescription = eventDescription.trim();

  helper.isObj(eventLocation);

  contactEmail = contactEmail.trim();
  eventDate = eventDate.trim();
  startTime = startTime.trim();
  endTime = endTime.trim();

  if (eventName === '' || eventDescription === '' || contactEmail === '' ||
    eventDate === '' || startTime === '' || endTime === '') {
    throw 'One or more strings are empty';
  }

  if (eventName.length < 5) {
    throw 'event name must be equal to or more than 5 chars';
  }

  if (eventDescription.length < 25) {
    throw 'event description must be equal to or more than 25 chars';
  }

  // Validate contactEmail format
  const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(contactEmail)) {
    throw "Invalid email format.";
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(eventDate) || !date.isValid(date.parse(eventDate, 'MM/dd/yyyy', new Date()))) {
    throw "Invalid event date format.";
  }


  let startDateFormat = date.parse(eventDate + ' ' + startTime, 'MM/dd/yyyy hh:mma', new Date());
  const currentDate = new Date();

  if (startDateFormat <= currentDate) {
    throw "not a future date.";
  }

  let endDateFormat = date.parse(eventDate + ' ' + endTime, 'MM/dd/yyyy hh:mma', new Date());

  const isStartDateAfterEndDate = date.isAfter(startDateFormat, endDateFormat);

  if (isStartDateAfterEndDate) {
    throw 'Start time cannot be later than the end time / end time cannot be earlier than start time.';
  }

  const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/i;

  if (!timePattern.test(startTime)) {
    throw "Invalid start time.";
  }

  if (!timePattern.test(endTime)) {
    throw "Invalid end time.";
  }

  if (date.differenceInMinutes(startDateFormat, endDateFormat) > -30) {
    throw 'The end time should be at least 30 minutes later than the start time.';
  }

  if (typeof publicEvent !== "boolean") {
    throw 'The type of public event must be a boolean';
  }

  if (helper.isNotValidNumber(maxCapacity) || helper.isNotValidNumber(priceOfAdmission)) {
    throw 'The maximum capacity or price of admission are not of type number';
  }

  if (maxCapacity <= 0 || !Number.isInteger(maxCapacity)) {
    throw 'The max capacity must be a positive, whole number.';
  }

  if (priceOfAdmission < 0 ||
    (priceOfAdmission * 100) % 1 !== 0
  ) {
    throw 'Invalid price of admission';
  }

  if (!eventLocation['streetAddress'] || !eventLocation['city'] || !eventLocation['state'] || !eventLocation['zip']) {
    throw 'The event location must contain a street address, city, state, and zipcode.';
  }

  // Trim eventLocation
  for (const key in eventLocation) {
    if (typeof eventLocation[key] === "string") {
      eventLocation[key] = eventLocation[key].trim();
    }
  }

  if (!helper.isValidString(eventLocation['streetAddress']) || !helper.isValidString(eventLocation['city']) || !helper.isValidString(eventLocation['state']) || !helper.isValidString(eventLocation['zip'])) {
    throw 'Not a valid string.';
  }

  if (eventLocation['streetAddress'].length < 3 || eventLocation['city'].length < 3) {
    throw 'The street address and city must be 3 or more chars';
  }

  if (!state.isValidStateAbbreviation(eventLocation['state'])) {
    throw 'Not a valid state.';
  }

  if (!helper.isValidZipCode(eventLocation['zip'])) {
    throw 'Not a valid zip code.';
  }

  const newEvent = {
    eventName: eventName,
    description: eventDescription,
    eventLocation: eventLocation,
    contactEmail: contactEmail,
    maxCapacity: maxCapacity,
    priceOfAdmission: priceOfAdmission,
    eventDate: eventDate,
    startTime: startTime,
    endTime: endTime,
    publicEvent: publicEvent
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
  let eventList = await eventCollection.find({}).toArray();
  if (!eventList) throw 'Could not get all dogs';
  eventList = eventList.map((element) => {
    element._id = element._id.toString();
    return element;
  });
  return eventList;
};

const get = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';

  const eventCollection = await events();
  const event = await eventCollection.findOne({ _id: new ObjectId(id) });
  if (!event) throw 'No event with that id';
  event._id = event._id.toString();
  return event;
};

const remove = async (id) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const eventCollection = await events();
  const deletionInfo = await eventCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });

  if (!deletionInfo) {
    throw `Could not delete event with id of ${id}`;
  }

  return { eventName: deletionInfo.eventName, deleted: true };
};

const rename = async (id, newEventName) => {
  if (!id) throw 'You must provide an id to search for';
  if (typeof id !== 'string') throw 'Id must be a string';
  if (id.trim().length === 0)
    throw 'Id cannot be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  if (!newEventName) throw 'You must provide a new event name.';
  if (typeof newEventName !== 'string') throw 'New event name must be a string';
  if (newEventName.trim().length === 0)
    throw 'new event name cannot be an empty string or string with just spaces';

  newEventName = newEventName.trim();

  if (newEventName.length < 5) {
    throw 'The new event name must be greater than or equal to 5 chars';
  }

  const updatedEvent = {
    eventName: newEventName
  };

  const eventCollection = await events();

  const oldEvent = await get(id);

  const oldEventName = oldEvent['eventName'];

  if (oldEventName === newEventName) {
    throw 'The new event name must be different from the old event name';
  }

  const updatedInfo = await eventCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updatedEvent },
    { returnDocument: 'after' }
  );

  if (!updatedInfo) {
    throw 'could not update event successfully';
  }
  updatedInfo._id = updatedInfo._id.toString();
  return updatedInfo;
};

export default {
  create,
  getAll,
  get,
  remove,
  rename
}

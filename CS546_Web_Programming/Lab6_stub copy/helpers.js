// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import { ObjectId } from 'mongodb';
import date from 'date-fns';
import state from 'usa-state-validator';
import { events } from './config/mongoCollections.js';

function isValidZipCode(zipCode) {
    const zipCodePattern = /^[0-9]{5}$/;

    return zipCodePattern.test(zipCode);
}

function isValidString(inputStr) {
    if (typeof inputStr !== 'string') {
        return false;
    }

    if (inputStr.length === 0) {
        return false;
    }

    return true;
}

function isNotValidNumber(input) {
    return typeof input !== 'number' || isNaN(input) || input === Infinity || input === -Infinity;
}

function isObj(obj) {
    if (!obj)
        throw "Input is not supplied, is undefined, null, 0, false, '', or NaN";
    if (Array.isArray(obj))
        throw 'Input must be an object, but an array was supplied';
    if (typeof obj !== 'object') throw 'Input must be an object!';
}

function checkId(id) {
    if (!id) throw 'Error: You must provide an id to search for';
    //if (typeof id !== 'string') throw 'Error: id must be a string';
    //id = id.trim();
    //if (id.length === 0)
    //throw 'Error: id cannot be an empty string or just spaces';
    if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
    return id;
}

function validateEventParams(eventName, eventDescription, eventLocation, contactEmail, maxCapacity, priceOfAdmission, eventDate, startTime, endTime, publicEvent) {
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

    isObj(eventLocation);

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


    let startDateFormat = date.parse(eventDate + ' ' + startTime, 'MM/dd/yyyy hh:mm a', new Date());
    const currentDate = new Date();

    if (startDateFormat <= currentDate) {
        throw "not a future date.";
    }

    let endDateFormat = date.parse(eventDate + ' ' + endTime, 'MM/dd/yyyy hh:mm a', new Date());

    const isStartDateAfterEndDate = date.isAfter(startDateFormat, endDateFormat);

    if (isStartDateAfterEndDate) {
        throw 'Start time cannot be later than the end time / end time cannot be earlier than start time.';
    }

    //const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/i;
    const timePattern = /^(1[0-2]|[1-9]):[0-5][0-9] (AM|PM)$/;


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

    if (isNotValidNumber(maxCapacity) || isNotValidNumber(priceOfAdmission)) {
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

    if (!isValidString(eventLocation['streetAddress']) || !isValidString(eventLocation['city']) || !isValidString(eventLocation['state']) || !isValidString(eventLocation['zip'])) {
        throw 'Not a valid string.';
    }

    if (eventLocation['streetAddress'].length < 3 || eventLocation['city'].length < 3) {
        throw 'The street address and city must be 3 or more chars';
    }

    if (!state.isValidStateAbbreviation(eventLocation['state'])) {
        throw 'Not a valid state.';
    }

    if (!isValidZipCode(eventLocation['zip'])) {
        throw 'Not a valid zip code.';
    }

    return { eventName, eventDescription, eventLocation, contactEmail, maxCapacity, priceOfAdmission, eventDate, startTime, endTime, publicEvent };
}

async function checkIfEventIdExists(eventId) {
    const eventCollection = await events();
    const foundEvent = await eventCollection.findOne({ _id: eventId });

    if (!foundEvent) throw 'Event not found';
}

function validateAttendeeParams(firstName, lastName, emailAddress) {
    if (!firstName || !lastName || !emailAddress) {
        throw 'All fields need to have valid values.';
    }

    if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof emailAddress !== 'string') {
        throw 'All fields need to be of type string.';
    }

    firstName = firstName.trim();
    lastName = lastName.trim();
    emailAddress = emailAddress.trim();

    if (firstName.length === 0 || lastName.length === 0 || emailAddress.length === 0) {
        throw 'The fields must have characters other than spaces.';
    }

    const nameRegex = /^[A-Za-z0-9.'\-]+$/;

    if (!nameRegex.test(firstName)) {
        throw 'Invalid first name.';
    }

    if (!nameRegex.test(lastName)) {
        throw 'Invalid last name.';
    }

    // Validate contactEmail format
    const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailAddress)) {
        throw "Invalid email format.";
    }

    return { firstName, lastName, emailAddress };
}

export default {
    isValidZipCode,
    isNotValidNumber,
    isValidString,
    isObj,
    checkId,
    validateEventParams,
    validateAttendeeParams,
    checkIfEventIdExists
}
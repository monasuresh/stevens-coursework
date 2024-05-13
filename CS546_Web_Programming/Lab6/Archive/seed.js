import {dbConnection, closeConnection} from './config/mongoConnection.js';
import events from './data/events.js'
import attendees from './data/attendees.js';

const db = await dbConnection();
await db.dropDatabase();

let event1;
try {
    event1 = await events.create("Test Event 1", "This is an event description with 25 or more characters.", {streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "test1@stevens.edu", 3, 1,"08/25/2024","2:00 PM","8:00 PM",false);
} catch(e) {
    console.log(e);
}

try {
    await attendees.createAttendee(event1._id, "Test1", "Test1", 'test1a1@gmal.com');
    //console.log(attendee);
} catch (e) {
    console.log(e);
}

try {
    await attendees.createAttendee(event1._id, "Test1", "Test1", 'test1a2@gmal.com');
    //console.log(attendee);
} catch (e) {
    console.log(e);
}

let event2;
try {
    event2 = await events.create("Test Event 2", "This is an event description with 25 or more characters.", {streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "test2@stevens.edu", 5, 1,"08/25/2024","2:00 PM","8:00 PM",false);
} catch(e) {
    console.log(e);
}

try {
    await attendees.createAttendee(event2._id, "Test2", "Test2", 'test2a1@gmal.com');
    //console.log(attendee);
} catch (e) {
    console.log(e);
}

try {
    await attendees.createAttendee(event2._id, "Test2", "Test2", 'test2a2@gmal.com');
    //console.log(attendee);
} catch (e) {
    console.log(e);
}

console.log('Done seeding database');

await closeConnection();
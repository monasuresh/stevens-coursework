// This file should set up the express server as shown in the lecture code

import eventData from './data/events.js';
import { dbConnection, closeConnection } from './config/mongoConnection.js';
import attendeeData from './data/attendees.js';
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let event1 = undefined;
let event2 = undefined;
let event3 = undefined;
let event4 = undefined;
let allEvents = undefined;
let getEventsById = undefined;
let removeEventsById = undefined;
let renameEventsById = undefined;
console.log("Let's add few events");
//*************************...1....create an event1*****************************
try {
    event1 = await eventData.create("Patrick's Big End of Summer BBQ","Come join us for our yearly end of summer bbq!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "phill@stevens.edu",30,0,"08/25/2024","2:00 PM","8:00 PM",false);
    console.log("Event1 has been added successfully!");
    console.log(event1);
} catch(e) {
    console.log(e);
}

try {
    let attendee = await attendeeData.createAttendee(event1._id, 'Monica', 'Suresh', 'blah@gmail.com');
    //console.log("Event1 has been added successfully!");
    console.log(attendee);
} catch(e) {
    console.log(e);
}

try {
    let attendee = await attendeeData.createAttendee(event1._id, 'Monica', 'K', 'blah@gmail.com');
    //console.log("Event1 has been added successfully!");
    console.log(attendee);
} catch(e) {
    console.log(e);
}

let attendeeId;

try {
    let attendee = await attendeeData.getAllAttendees(event1._id);
    attendeeId = attendee[0]._id;
    //console.log("Event1 has been added successfully!");
    console.log(attendee);
} catch(e) {
    console.log(e);
}

try {
    let attendee = await attendeeData.getAttendee(attendeeId);
    //console.log("Event1 has been added successfully!");
    console.log(attendee);
} catch(e) {
    console.log(e);
}

try {
    console.log('Getting attendee based on id.');
    let attendee = await attendeeData.getAttendee(attendeeId);
    //console.log("Event1 has been added successfully!");
    console.log(attendee);
} catch(e) {
    console.log(e);
}

/*try {
    console.log('Removing attendee based on id.');
    let attendee = await attendeeData.removeAttendee(attendeeId);
    //console.log("Event1 has been added successfully!");
    console.log(attendee);
} catch(e) {
    console.log(e);
} */
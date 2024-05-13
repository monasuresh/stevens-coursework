/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/

import eventData from './data/events.js'
import { dbConnection, closeConnection } from './config/mongoConnection.js';

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
    event1 = await eventData.create("Patrick's Big End of Summer BBQ","Come join us for our yearly end of summer bbq!",{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "phill@stevens.edu",30,0,"08/25/2024","2:00PM","8:00PM",false);
    console.log("Event1 has been added successfully!");
    console.log(event1);
} catch(e) {
    console.log(e);
}

try {
    const renameEventsById = await eventData.rename(event1._id.toString(), "Aiden's 5th Birthday Bash");
    console.log("Event has been renamed successfully!");
    console.log(renameEventsById);
} catch(e) {
    console.log(e);
}

let testEvent1Id;
let testEvent2Id;

try {
    const testEvent = await eventData.create('Test Event', 'This is a description of the test event', { streetAddress: '1 Main St.', city: 'Boston', state: "MA", zip: '02112', blah: 'hello'}, ' test@gmail.com ', 10, 1, ' 11/23/2024 ', ' 12:00AM ', ' 1:00PM ', true);
    testEvent1Id = testEvent['_id'];
    console.log(testEvent);
} catch (error) {
    console.log(error);
}

try {
    const testEvent = await eventData.create('Test Event 2', 'This is a description of the test event 2', { streetAddress: '1 Main St.', city: 'Hoboken', state: "NJ", zip: '07030' }, ' test2@gmail.com ', 10, 1, ' 11/23/2025 ', ' 12:00AM ', ' 12:00PM ', true);
    testEvent2Id = testEvent['_id'];
    const eventList = await event.getAll();
    console.log(eventList);
} catch (error) {
    console.log(error);
}

try {
    const testEvent = await eventData.create('Test Event 3', 'This is a description of the test event 3', { streetAddress: '1 Main St.', city: 'Boston', state: "MA", zip: '02112' }, ' test3@gmail.com ', 10, 1, ' 11/23/2026 ', ' 12:00AM ', ' 12:00pm ', true);
    console.log(testEvent);
} catch (error) {
    console.log(error);
}

try {
    const renamedTestEvent1 = await eventData.rename(testEvent1Id, " abcde ");
    console.log(renamedTestEvent1);
} catch (error) {
    console.log(error);
}

try {
    const removeTestEvent2 = await eventData.remove(testEvent2Id);
    console.log(removeTestEvent2);
} catch (error) {
    console.log(error);
}

try {
    const eventList = await eventData.getAll();
    console.log(eventList);
} catch (error) {
    console.log(error);
}

try {
    const testEvent = await eventData.create('This is a description of the test event', { streetAddress: '1 Main St.', city: 'Boston', state: "MA", zip: '02112' }, 'test@gmail.com', 11, 1, '09/30/2026', '12:00AM', '12:50AM', true);
    console.log(testEvent);
} catch (error) {
    console.log(error);
}

try {
    const removeTestEvent2 = await eventData.remove(testEvent2Id);
    console.log(removeTestEvent2);
} catch (error) {
    console.log(error);
}

try {
    const renamedTestEvent1 = await eventData.rename(testEvent1Id, 1);
    console.log(renamedTestEvent1);
} catch (error) {
    console.log(error);
}

try {
    const testEvent = await eventData.get(testEvent2Id);
    console.log(testEvent);
} catch (e) {
    console.log(e);
}



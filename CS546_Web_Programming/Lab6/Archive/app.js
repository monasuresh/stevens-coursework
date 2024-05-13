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
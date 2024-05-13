//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file that you used for lab 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById(id) function and call it in the :/id route.

import { getAuthors } from "../data/data.js";
import { getAuthorById } from "../data/data.js";
import express from 'express';
import * as helper from "../helpers.js";

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const authorList = await getAuthors();
      return res.json(authorList);
    } catch (e) {
      return res.status(500).send(e);
    }
  });
// Implement GET Request Method and send a JSON response See lecture code!

router.route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = helper.validateId(req.params.id);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const author = await getAuthorById(req.params.id);
      return res.json(author);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  });
//Implement GET Request Method and send a JSON response See lecture code!

export default router;

//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import { searchCharacterByName } from "../data/characters.js";
import { searchCharacterById } from "../data/characters.js";
import express from 'express';
import * as helper from "../helpers.js";

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    return res.render('home', { title: 'Marvel Character Finder' });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  let found = true;
  let characterName;

  try {
    characterName = helper.checkString(req.body.searchCharacterByName, 'character name');
  } catch (e) {
    return res.status(400).render('error', { message: e });
  }

  try {
    const characterList = await searchCharacterByName(characterName);
    return res.render('characterSearchResults', { title: 'Marvel Characters Found', characterName: characterName, characters: characterList, found: found });
  } catch (e) {
    found = false;
    return res.status(404).render('characterSearchResults', { title: 'Marvel Characters Found', characterName: characterName, found: found });
  }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  let characterId;

  try {
    characterId = helper.checkId(req.params.id, 'ID');
  } catch (e) {
    return res.status(400).render('error', { message: e });
  }

  try {
    const characterObject = await searchCharacterById(characterId);
    const characterName = characterObject.name;
    const imageLink = characterObject.thumbnail.path + '/portrait_uncanny.jpg';
    const characterDescription = characterObject.description;
    const comicItems = characterObject.comics.items;
    return res.render('characterById', { title: characterName, imageLink: imageLink, description: characterDescription, comicItems: comicItems });
  } catch (e) {
    return res.status(404).render('error', { message: 'There was no character found for the given ID' });
  }
});

//export router
export default router;

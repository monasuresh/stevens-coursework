//import axios, md5
import axios from 'axios';
import md5 from 'blueimp-md5'; //you will need to install this module;
import * as helper from '../helpers.js';
const publickey = 'e71802c39a072cedceac2b4b8b57886f';
const privatekey = 'ee2cf5aab6baac66b3b1bde1b14544fbf8a0a245';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const restOfTheUrl = '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

export const searchCharacterByName = async (name) => {
  name = helper.checkString(name, 'name');
  const characterByNameUrl = baseUrl + '?nameStartsWith=' + name + '&limit=15' + restOfTheUrl;
  const { data } = await axios.get(characterByNameUrl);
  if (data['data']['results'].length === 0) {
    throw `We're sorry, but no results were found for ${name}`;
  }
  return data['data']['results'];
};

export const searchCharacterById = async (id) => {
  id = helper.checkId(id, 'ID');
  const characterByIdUrl = baseUrl + '/' + id + '?' + restOfTheUrl;
  const { data } = await axios.get(characterByIdUrl);

  if (data['data']['code'] === 404) {
    throw 'The character could not be found';
  }

  const characterObject = data['data']['results'][0];
  return characterObject;
};

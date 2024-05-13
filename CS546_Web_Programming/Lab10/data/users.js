//import mongo collections, bcrypt and implement the following data functions
import helper from '../helpers.js';
import { users } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
const saltRounds = 16;

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  // Validate user parameters
  let userParams = helper.validateUserParams(firstName, lastName, emailAddress, password, role);

  await helper.checkForDuplicateEmailAddress(emailAddress);

  const hash = await bcrypt.hash(userParams.passwordInput, saltRounds);

  let lowerCaseEmailAddress = userParams.emailAddressInput.toLowerCase();

  // Create a new user object
  const newUser = {
    firstName: userParams.firstNameInput,
    lastName: userParams.lastNameInput,
    emailAddress: lowerCaseEmailAddress,
    password: hash,
    role: userParams.roleInput
  };

  const userCollection = await users();

  // Insert the new user into the Users collection
  const insertResult = await userCollection.insertOne(newUser);

  if (!insertResult.acknowledged || !insertResult.insertedId) {
    throw 'Could not insert user successfully';
  }

  return { insertedUser: true };
};

export const loginUser = async (emailAddress, password) => {
  let emailAndPasswordParams = helper.validateEmailAndPassword(emailAddress, password);
  const userCollection = await users();

  let lowerCaseEmailAddress = emailAndPasswordParams.emailAddressInput.toLowerCase();

  let user = await userCollection.findOne({ 'emailAddress': lowerCaseEmailAddress });
  
  if (!user) {
    throw 'The email address was not found.';
  }

  let compareToSuppliedPassword = false;

  try {
    compareToSuppliedPassword = await bcrypt.compare(emailAndPasswordParams.passwordInput, user.password);
  } catch (e) {
    //no op
  }

  if (compareToSuppliedPassword) {
    return { firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddress, role: user.role };
  } else {
    throw 'Either the email address or password is invalid';
  }
};
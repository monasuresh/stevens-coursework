//import express, express router as shown in lecture code
import helper from '../helpers.js';
import { registerUser } from '../data/users.js';
import { loginUser } from '../data/users.js';
import express from 'express';

const router = express.Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: 'YOU SHOULD NOT BE HERE!' });
});

router
  .route('/register')
  .get(async (req, res) => {
    try {
      return res.render('register', { title: 'Registration Page' });
    } catch (e) {
      return res.status(500).render('error', { message: e });
    }
  })
  .post(async (req, res) => {
    let isError = false;
    const userDocument = req.body;
    let userParams;
    if (!userDocument || Object.keys(userDocument).length === 0) {
      isError = true;
      return res
        .status(400)
        .render('register', { title: 'Registration', message: 'There are no fields in the request body.', isError: isError });
    }

    try {
      userParams = helper.validateUserParams(userDocument.firstNameInput, userDocument.lastNameInput, userDocument.emailAddressInput, userDocument.passwordInput, userDocument.roleInput);
    } catch (e) {
      isError = true;
      return res
        .status(400)
        .render('register', { title: 'Registration', message: e, isError: isError });
    }

    let confirmPasswordParam;

    try {
      confirmPasswordParam = helper.validateConfirmPassword(userDocument.confirmPasswordInput);
    } catch (e) {
      isError = true;
      return res
        .status(400)
        .render('register', { title: 'Registration', message: e, isError: isError });
    }

    try {
      await helper.checkForDuplicateEmailAddress(userParams.emailAddressInput);
    } catch (e) {
      isError = true;
      return res
        .status(400)
        .render('register', { title: 'Registration', message: e, isError: isError });
    }

    if (userParams.passwordInput !== confirmPasswordParam.confirmPasswordInput) {
      isError = true;
      return res
        .status(400)
        .render('register', { title: 'Registration', message: 'The password and confirm password are not the same.', isError: isError });
    }

    //insert the user
    try {
      const newUser = await registerUser(userParams.firstNameInput, userParams.lastNameInput, userParams.emailAddressInput, userParams.passwordInput, userParams.roleInput);
      if (newUser) {
        return res.redirect('/login');
      } else {
        return res.status(500).render('error', { message: 'Internal Server Error' });
      }
    } catch (e) {
      return res.status(500).render('error', { message: 'Internal Server Error' });
    }
  });

router
  .route('/login')
  .get(async (req, res) => {
    try {
      return res.render('login', { title: 'Login Page' });
    } catch (e) {
      return res.status(500).render('error', { message: e });
    }
  })
  .post(async (req, res) => {
    let isError = false;
    const userDocument = req.body;
    let userParams;
    if (!userDocument || Object.keys(userDocument).length === 0) {
      isError = true;
      return res
        .status(400)
        .render('login', { title: 'Login', message: 'There are no fields in the request body.', isError: isError });
    }

    try {
      userParams = helper.validateEmailAndPassword(userDocument.emailAddressInput, userDocument.passwordInput);
    } catch (e) {
      isError = true;
      return res
        .status(400)
        .render('login', { title: 'Login', message: e, isError: isError });
    }

    //insert the user
    try {
      const newUser = await loginUser(userParams.emailAddressInput, userParams.passwordInput);
      req.session.user = newUser;
      if (req.session.user.role === 'admin') {
        return res.redirect('/admin');
      } else if (req.session.user.role === 'user') {
        return res.redirect('/protected');
      }
    } catch (e) {
      isError = true;
      return res.status(400)
        .render('login', { title: 'Login', message: e, isError: isError });
    }
  });

router.route('/protected').get(async (req, res) => {
  try {
    const currentDateTime = new Date();
    const currentTime = currentDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
    let isAdmin = req.session.user.role === 'admin';
    return res.render('protected', { title: 'User Page', firstName: req.session.user.firstName, lastName: req.session.user.lastName, currentTime: currentTime, role: req.session.user.role, isAdmin: isAdmin });
  } catch (e) {
    return res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.route('/admin').get(async (req, res) => {
  try {
    const currentDateTime = new Date();
    const currentTime = currentDateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
    return res.render('admin', { title: 'Admin Page', firstName: req.session.user.firstName, lastName: req.session.user.lastName, currentTime: currentTime, role: req.session.user.role });
  } catch (e) {
    return res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.route('/error').get(async (req, res) => {
  try {
    return res.status(403).render('error', { title: 'Error Page' });
  } catch (e) {
    return res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.route('/logout').get(async (req, res) => {
  try {
    req.session.destroy();
    return res.render('logout', { title: 'Logout Page' });
  } catch (e) {
    return res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

export default router;

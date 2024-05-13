//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import { users } from './config/mongoCollections.js';

function validateUserParams(firstNameInput, lastNameInput, emailAddressInput, passwordInput, roleInput) {
    if (!firstNameInput || !lastNameInput || !emailAddressInput || !passwordInput || !roleInput) {
        const missingFields = [];

        if (!firstNameInput) {
            missingFields.push('First Name');
        }

        if (!lastNameInput) {
            missingFields.push('Last Name');
        }

        if (!emailAddressInput) {
            missingFields.push('Email Address');
        }

        if (!passwordInput) {
            missingFields.push('Password');
        }

        if (!roleInput) {
            missingFields.push('Role');
        }

        const errorMessage = `Missing fields: ${missingFields.join(', ')}`;

        throw errorMessage;
    }

    if (typeof firstNameInput !== 'string' || typeof lastNameInput !== 'string' || typeof emailAddressInput !== 'string' || typeof passwordInput !== 'string' || typeof roleInput !== 'string') {
        const invalidTypeFields = [];

        if (typeof firstNameInput !== 'string') {
            invalidTypeFields.push('First Name');
        }

        if (typeof lastNameInput !== 'string') {
            invalidTypeFields.push('Last Name');
        }

        if (typeof emailAddressInput !== 'string') {
            invalidTypeFields.push('Email Address');
        }

        if (typeof passwordInput !== 'string') {
            invalidTypeFields.push('Password');
        }

        if (typeof roleInput !== 'string') {
            invalidTypeFields.push('Role');
        }

        const errorMessage = `Invalid field types: ${invalidTypeFields.join(', ')}`;

        throw errorMessage;
    }


    firstNameInput = firstNameInput.trim();
    lastNameInput = lastNameInput.trim();
    emailAddressInput = emailAddressInput.trim();
    passwordInput = passwordInput.trim();
    roleInput = roleInput.trim().toLowerCase();

    if (firstNameInput.length === 0 || lastNameInput.length === 0 || emailAddressInput.length === 0
        || passwordInput.length === 0 || roleInput.length === 0) {
        const emptyFields = [];

        if (firstNameInput.length === 0) {
            emptyFields.push('First Name');
        }

        if (lastNameInput.length === 0) {
            emptyFields.push('Last Name');
        }

        if (emailAddressInput.length === 0) {
            emptyFields.push('Email Address');
        }

        if (passwordInput.length === 0) {
            emptyFields.push('Password');
        }

        if (roleInput.length === 0) {
            emptyFields.push('Role');
        }

        const errorMessage = `Empty or whitespace-only fields: ${emptyFields.join(', ')}`;

        throw errorMessage;
    }

    const firstNameRegex = /^[a-zA-Z'-]{2,25}$/;
    const lastNameRegex = /^[a-zA-Z'-]{2,25}$/;
    const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9 ])(?!.*\s).{8,}$/;
    const roleRegex = /^(admin|user)$/;

    if (!firstNameRegex.test(firstNameInput)) {
        throw 'The first name should be at least 2 characters long with a max of 25 characters and should only contain letters, hyphens, and dashes.';
    }

    if (!lastNameRegex.test(lastNameInput)) {
        throw 'The last name should be at least 2 characters long with a max of 25 characters and should only contain letters, hyphens, and dashes.'
    }

    if (!emailRegex.test(emailAddressInput)) {
        throw 'Invalid email address';
    }

    if (!passwordRegex.test(passwordInput)) {
        throw 'Invalid password';
    }

    if (!roleRegex.test(roleInput)) {
        throw 'Invalid role';
    }

    return { firstNameInput: firstNameInput, lastNameInput: lastNameInput, emailAddressInput: emailAddressInput, passwordInput: passwordInput, roleInput: roleInput };
}

function validateEmailAndPassword(emailAddressInput, passwordInput) {
    if (!emailAddressInput || !passwordInput) {
        const missingFields = [];
    
        if (!emailAddressInput) {
            missingFields.push('Email Address');
        }
    
        if (!passwordInput) {
            missingFields.push('Password');
        }
    
        const errorMessage = `Missing fields: ${missingFields.join(', ')}`;
    
        throw errorMessage;
    }
    

    if (typeof emailAddressInput !== 'string' || typeof passwordInput !== 'string') {
        const invalidTypeFields = [];
    
        if (typeof emailAddressInput !== 'string') {
            invalidTypeFields.push('Email Address');
        }
    
        if (typeof passwordInput !== 'string') {
            invalidTypeFields.push('Password');
        }
    
        const errorMessage = `Invalid field types: ${invalidTypeFields.join(', ')}`;
    
        throw errorMessage;
    }    

    emailAddressInput = emailAddressInput.trim();
    passwordInput = passwordInput.trim();

    if (emailAddressInput.length === 0 || passwordInput.length === 0) {
        const emptyFields = [];
    
        if (emailAddressInput.length === 0) {
            emptyFields.push('Email Address');
        }
    
        if (passwordInput.length === 0) {
            emptyFields.push('Password');
        }
    
        const errorMessage = `Empty or whitespace-only fields: ${emptyFields.join(', ')}`;
    
        throw errorMessage;
    }
    

    const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9 ])(?!.*\s).{8,}$/;

    if (!emailRegex.test(emailAddressInput)) {
        throw 'Invalid email address';
    }

    if (!passwordRegex.test(passwordInput)) {
        throw 'Invalid password';
    }

    return { emailAddressInput: emailAddressInput, passwordInput: passwordInput };
}

function validateConfirmPassword(confirmPasswordInput) {
    if (!confirmPasswordInput) {
        throw 'Confirm password must be supplied';
    }

    confirmPasswordInput = confirmPasswordInput.trim();

    if (confirmPasswordInput.length === 0) {
        throw 'Confirm password must not be empty or just spaces';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9 ])(?!.*\s).{8,}$/;

    if (!passwordRegex.test(confirmPasswordInput)) {
        throw 'Invalid password';
    }

    return { confirmPasswordInput: confirmPasswordInput };
}

async function checkForDuplicateEmailAddress(emailAddress) {
    const userCollection = await users();

    let lowerCaseEmailAddress = emailAddress.toLowerCase();

    let user = await userCollection.findOne({ 'emailAddress': lowerCaseEmailAddress });

    if (user) {
        throw 'The provided email address already exists. Please enter a new email address.';
    }
}

export default {
    validateUserParams,
    validateEmailAndPassword,
    checkForDuplicateEmailAddress,
    validateConfirmPassword
};
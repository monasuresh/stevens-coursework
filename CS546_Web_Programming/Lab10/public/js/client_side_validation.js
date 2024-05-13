// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

(function () {
    const registrationForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');

    let errors = [];
    if (registrationForm) {
        registrationForm.addEventListener('submit', (event) => {
            let firstName = document.getElementById('firstNameInput').value;
            let lastName = document.getElementById('lastNameInput').value;
            let emailAddress = document.getElementById('emailAddressInput').value;
            let password = document.getElementById('passwordInput').value;
            let confirmPassword = document.getElementById('confirmPasswordInput').value;
            let role = document.getElementById('roleInput').value;
            errors = [];

            validateUserParams(firstName, lastName, emailAddress, password, role, errors);
            if (password.trim() !== confirmPassword.trim()) {
                errors.push('The password and confirm password are not the same');
            }

            clearErrors(registrationForm);

            if (errors.length > 0) {
                let myUL = document.createElement('ul');

                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    let myLi = document.createElement('li');
                    myLi.classList.add('error');
                    myLi.innerHTML = errors[i];
                    myUL.appendChild(myLi);
                }
                registrationForm.appendChild(myUL);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            let emailAddress = document.getElementById('emailAddressInput').value;
            let password = document.getElementById('passwordInput').value;
            errors = [];

            validateEmailAndPassword(emailAddress, password, errors);

            clearErrors(loginForm);

            if (errors.length > 0) {
                let myUL = document.createElement('ul');

                event.preventDefault();
                for (let i = 0; i < errors.length; i++) {
                    let myLi = document.createElement('li');
                    myLi.classList.add('error');
                    myLi.innerHTML = errors[i];
                    myUL.appendChild(myLi);
                }
                loginForm.appendChild(myUL);
            }
        });
    }

    function validateUserParams(firstNameInput, lastNameInput, emailAddressInput, passwordInput, roleInput, errors) {
        if (!firstNameInput || !lastNameInput || !emailAddressInput || !passwordInput || !roleInput) {
            errors.push('All fields must be supplied');
        }

        if (typeof firstNameInput !== 'string' || typeof lastNameInput !== 'string' || typeof emailAddressInput !== 'string' || typeof passwordInput !== 'string' || typeof roleInput !== 'string') {
            errors.push('All fields must be of type string');
        }

        firstNameInput = firstNameInput.trim();
        lastNameInput = lastNameInput.trim();
        emailAddressInput = emailAddressInput.trim();
        passwordInput = passwordInput.trim();
        roleInput = roleInput.trim().toLowerCase();

        if (firstNameInput.length === 0 || lastNameInput.length === 0 || emailAddressInput.length === 0
            || passwordInput.length === 0 || roleInput.length === 0) {
            errors.push('Fields must not empty or just spaces');
        }

        const firstNameRegex = /^[a-zA-Z'-]{2,25}$/;
        const lastNameRegex = /^[a-zA-Z'-]{2,25}$/;
        const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9 ])(?!.*\s).{8,}$/;
        const roleRegex = /^(admin|user)$/;

        if (!firstNameRegex.test(firstNameInput)) {
            errors.push('The first name should be at least 2 characters long with a max of 25 characters and should only contain letters, hyphens, or dashes.');
        }

        if (!lastNameRegex.test(lastNameInput)) {
            errors.push('The last name should be at least 2 characters long with a max of 25 characters and should only contain letters, hyphens, or dashes.');
        }

        if (!emailRegex.test(emailAddressInput)) {
            errors.push('Invalid email address');
        }

        if (!passwordRegex.test(passwordInput)) {
            errors.push('Invalid password');
        }

        if (!roleRegex.test(roleInput)) {
            errors.push('Invalid role');
        }
    }

    function validateEmailAndPassword(emailAddressInput, passwordInput, errors) {
        if (!emailAddressInput || !passwordInput) {
            errors.push('All fields must be supplied');
        }

        if (typeof emailAddressInput !== 'string' || typeof passwordInput !== 'string') {
            errors.push('All fields must be of type string');
        }

        emailAddressInput = emailAddressInput.trim();
        passwordInput = passwordInput.trim();

        if (emailAddressInput.length === 0 || passwordInput.length === 0) {
            errors.push('Fields must not empty or just spaces');
        }

        const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9 ])(?!.*\s).{8,}$/;

        if (!emailRegex.test(emailAddressInput)) {
            errors.push('Invalid email address');
        }

        if (!passwordRegex.test(passwordInput)) {
            errors.push('Invalid password');
        }
    }

    function validateConfirmPassword(confirmPasswordInput, errors) {
        if (!confirmPasswordInput) {
            errors.push('Confirm password must be supplied');
        }

        confirmPasswordInput = confirmPasswordInput.trim();

        if (confirmPasswordInput.length === 0) {
            errors.push('Confirm password must not be empty or just spaces');
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9 ])(?!.*\s).{8,}$/;

        if (!passwordRegex.test(confirmPasswordInput)) {
            errors.push('Invalid password');
        }
    }

    function clearErrors(form) {
        let existingUL = form.querySelector('ul');
        if (existingUL) {
            existingUL.remove();
        }
    }
})();
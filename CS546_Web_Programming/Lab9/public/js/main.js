//Here is where you will do all of the logic and processing for the palindrome and prime checking.
let palindromeForm = document.getElementById('palindromeForm');
let textInput = document.getElementById('palindrome_input');
let errorParagraph = document.getElementById('error');
let palindromesList = document.getElementById('palindromes');

if (palindromeForm) {
    palindromeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputValue = textInput.value.trim();
        let lowercaseValue = inputValue.toLowerCase();
        let lowercaseWithJustAlphaNumeric = lowercaseValue.replace(/[^a-zA-Z0-9,]/g, '');

        if (lowercaseWithJustAlphaNumeric) {
            const words = lowercaseWithJustAlphaNumeric.split(',');

            errorParagraph.hidden = true;

            const palindromeArray = words.map((word) => isPalindrome(word.trim()));

            const primeOrNotPrime = isPrime(palindromeArray.length) ? 'prime' : 'not-prime';

            let listItem = document.createElement('li');
            listItem.className = primeOrNotPrime;
            listItem.innerHTML = JSON.stringify(palindromeArray);

            palindromesList.appendChild(listItem);
        } else {
            errorParagraph.hidden = false;
            errorParagraph.innerHTML = 'Input cannot be empty or just spaces or just non-alphanumeric characters. Please provide some text.';
            return;
        }
    });
}

function isPrime(num) {
    for (let i = 2; i <= num / 2; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num !== 1;
}

function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}

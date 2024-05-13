//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

function isValidZipCode(zipCode) {
    const zipCodePattern = /^[0-9]{5}$/;

    return zipCodePattern.test(zipCode);
}

function isValidString(inputStr) {
    if (typeof inputStr !== 'string') {
        return false;
    }

    if (inputStr.length === 0) {
        return false;
    }

    return true;
}

function isNotValidNumber(input) {
    return typeof input !== 'number' || isNaN(input) || input === Infinity || input === -Infinity;
}

function isObj(obj) {
    if (!obj)
        throw "Input is not supplied, is undefined, null, 0, false, '', or NaN";
    if (Array.isArray(obj))
        throw 'Input must be an object, but an array was supplied';
    if (typeof obj !== 'object') throw 'Input must be an object!';
}

export default {
    isValidZipCode,
    isNotValidNumber,
    isValidString,
    isObj
}
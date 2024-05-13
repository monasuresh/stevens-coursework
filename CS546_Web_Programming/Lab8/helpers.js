function checkString(strVal, varName) {
    if (!strVal) throw `You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
        throw `${varName} cannot be an empty string or string with just spaces`;
    return strVal;
}

function checkId(strVal, varName) {
    if (!strVal) throw `You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `${varName} must be a string!`;

    if (isNaN(strVal)) throw `${varName} must be a valid number!`;

    strVal = strVal.trim();
    if (strVal.length === 0) {
        throw `${varName} cannot be an empty string or string with just spaces`;
    }

    return strVal;
}


export {
    checkString,
    checkId
};
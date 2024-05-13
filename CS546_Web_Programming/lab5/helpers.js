//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

function validateId(id) {
    if (!id) {
        throw 'The id was not provided.';
    } else if (typeof id !== "string") {
        throw 'Error: The id must be a string.';
    }

    let trimmedId = id.trim();

    if (trimmedId === '') {
        throw 'The id must have characters other than spaces.'
    }
    return id;
}

export {
    validateId
};
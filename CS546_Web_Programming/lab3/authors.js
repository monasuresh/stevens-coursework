//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import * as helper from './helpers.js';

const getAuthorById = async (id) => {
    if (!id) {
        throw 'Error: The id was not provided or is null, undefined, 0, false, NaN or an empty string.';
    } else if (typeof id !== "string") {
        throw 'Error: The id must be a string.';
    }

    let trimmedId = id.trim();

    if (trimmedId === '') {
        throw 'Error: The id must have characters other than spaces.'
    }

    let authors = await helper.getAuthors();

    const authorWithProvidedId = authors.find(author => author.id === trimmedId);

    if (authorWithProvidedId) {
        return authorWithProvidedId;
    } else {
        throw 'author not found';
    }
};

const searchAuthorByName = async (searchTerm) => {
    if (!searchTerm) {
        throw 'Error: The search term was not provided or is null, undefined, 0, false, NaN or an empty string.';
    } else if (typeof searchTerm !== "string") {
        throw 'Error: The search term must be a string.';
    }

    let trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === '') {
        throw 'The search term must have characters other than spaces.'
    }

    let authors = await helper.getAuthors();

    let foundAuthors = [];

    for (let author of authors) {
        if (author['first_name'].toLowerCase().includes(trimmedSearchTerm.toLowerCase())) {
            foundAuthors.push(author['first_name'] + ' ' + author['last_name']);
        }

        if (author['last_name'].toLowerCase().includes(trimmedSearchTerm.toLowerCase())) {
            foundAuthors.push(author['first_name'] + ' ' + author['last_name']);
        }
    }

    if (foundAuthors.length === 0) {
        throw 'Error: There were no authors found for the provided search term.';
    }


    var authorsSortedByLastName = foundAuthors.sort(helper.sortByLastName);

    return authorsSortedByLastName;
};

const getBookNames = async (firstName, lastName) => {
    if (!firstName) {
        throw 'The first name does not exist';
    } else if (!lastName) {
        throw 'The last name does not exist.';
    } else if (typeof firstName !== 'string') {
        throw 'The first name is not a string.';
    } else if (typeof lastName !== 'string') {
        throw 'The last name is not a string.';
    }

    let trimmedFirstName = firstName.trim();
    let trimmedLastName = lastName.trim();

    if (trimmedFirstName === '') {
        throw 'Error: The first name cannot just be spaces or empty';
    } else if (trimmedLastName === '') {
        throw 'Error: The last name cannot just be spaces or empty.';
    }

    let authors = await helper.getAuthors();
    let books = await helper.getBooks();
    const resultArray = [];

    const author = authors.find((author) =>
        author['first_name'].toLowerCase() === trimmedFirstName.toLowerCase() &&
        author['last_name'].toLowerCase() === trimmedLastName.toLowerCase()
    );

    if (!author) {
        throw 'author not found';
    }

    const bookIds = author['books'];

    if (bookIds.length < 1) {
        throw 'There are no book ids for this author.';
    }

    bookIds.forEach((id) => {
        const matchingObject = books.find((obj) => obj.id === id);
        if (matchingObject) {
            resultArray.push(matchingObject['title']);
        }
    });

    resultArray.sort(helper.sortBookTitles);

    return resultArray;
};

const youngestOldest = async () => {
    let authors = await helper.getAuthors();

    // Sort authors by date of birth in descending order
    authors.sort((a, b) => {
        const date1 = new Date(a.date_of_birth);
        const date2 = new Date(b.date_of_birth);
        return date2 - date1;
    });

    const youngestPeople = helper.getPeopleWithSameDOB(authors[0], authors);
    const oldestPeople = helper.getPeopleWithSameDOB(authors[authors.length - 1], authors);

    const youngestOldestObj = {
        youngest: helper.formatPeopleList(youngestPeople),
        oldest: helper.formatPeopleList(oldestPeople),
    };

    return youngestOldestObj;
};

const sameBirthday = async (month, day) => {
    if (!month) {
        throw 'The month was not provided.';
    } else if (!day) {
        throw 'The day was not provided.';
    } else if (typeof month !== "number" || isNaN(month) || month === Infinity || month === -Infinity) {
        throw 'The provided month is not a valid number.';
    } else if (typeof day !== "number" || isNaN(day) || day === Infinity || day === -Infinity) {
        throw 'The provided day is not a valid number.';
    } else if (month < 1 || month > 12) {
        throw 'The month must be between 1 and 12';
    } else if (!helper.isValidDayForMonth(month, day)) {
        throw 'The day is invalid.';
    }

    let authors = await helper.getAuthors();
    let peopleWithSameBirthdays = authors.filter(person => {
        let dateFormat = new Date(person.date_of_birth);
        return (dateFormat.getMonth() + 1) === month && dateFormat.getDate() === day;
    });

    if (peopleWithSameBirthdays.length < 2) {
        throw 'No two authors share the provided birthday.';
    }

    let namesOfPeopleWithSameBirthdays = [];

    peopleWithSameBirthdays.forEach(function (element) {
        namesOfPeopleWithSameBirthdays.push(element.first_name + ' ' + element.last_name);
    });

    namesOfPeopleWithSameBirthdays.sort(helper.sortByLastName);
    return namesOfPeopleWithSameBirthdays;

};

export {
    getAuthorById,
    searchAuthorByName,
    getBookNames,
    youngestOldest,
    sameBirthday
}

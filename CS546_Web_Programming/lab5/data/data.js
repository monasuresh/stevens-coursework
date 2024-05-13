/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/

import axios from 'axios';

async function getAuthors() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    return data // this will be the array of author objects
}

async function getBooks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    return data // this will be the array of author objects
}

const getAuthorById = async (id) => {
    if (!id) {
        throw 'The id was not provided or is null, undefined, 0, false, NaN or an empty string.';
    } else if (typeof id !== "string") {
        throw 'The id must be a string.';
    }

    let trimmedId = id.trim();

    if (trimmedId === '') {
        throw 'The id must have characters other than spaces.'
    }

    let authors = await getAuthors();

    const authorWithProvidedId = authors.find(author => author.id === trimmedId);

    if (authorWithProvidedId) {
        return authorWithProvidedId;
    } else {
        throw 'Author Not Found!';
    }
};

const getBookById = async (id) => {
    if (!id) {
        throw 'The id was not provided or is null, undefined, 0, false, NaN or an empty string.';
    } else if (typeof id !== "string") {
        throw 'The id must be a string.';
    }

    let trimmedId = id.trim();

    if (trimmedId === '') {
        throw 'The id must have characters other than spaces.'
    }

    let books = await getBooks();

    const bookWithProvidedId = books.find(book => book.id === trimmedId);

    if (bookWithProvidedId) {
        return bookWithProvidedId;
    } else {
        throw 'Book Not Found!';
    }
};

export {
    getAuthors,
    getBooks,
    getAuthorById,
    getBookById
};
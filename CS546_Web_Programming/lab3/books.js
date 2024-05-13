//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json
import * as helper from './helpers.js';

const getBookById = async (id) => {
    if (!id) {
        throw 'The id was not provided.';
    } else if (typeof id !== "string") {
        throw 'Error: The id must be a string.';
    }

    let trimmedId = id.trim();

    if (trimmedId === '') {
        throw 'The id must have characters other than spaces.'
    }

    let books = await helper.getBooks();

    const bookWithProvidedId = books.find(book => book.id === trimmedId);

    if (bookWithProvidedId) {
        return bookWithProvidedId;
    } else {
        throw 'book not found';
    }
};

const getAuthorName = async (bookId) => {
    if (!bookId) {
        throw 'The book id does not exist.';
    } else if (typeof bookId !== "string") {
        throw 'The book id is not a string.';
    }

    let trimmedBookId = bookId.trim();

    if (trimmedBookId === '') {
        throw 'Error: The book id cannot just be spaces or empty';
    }

    //let bookIds = [];

    let authors = await helper.getAuthors();
    let books = await helper.getBooks();

    const foundBook = books.some(book => book.id === trimmedBookId);

    if (!foundBook) {
        throw 'book not found';
    }

    const authorId = books.find(book => book.id === trimmedBookId)?.authorId;

    let authorOfBook = authors.filter(person => {
        return person.id === authorId;
    });

    if (authorOfBook.length === 0) {
        throw 'Error: '
    }

    return authorOfBook[0].first_name + ' ' + authorOfBook[0].last_name;
};

const sameGenre = async (genre) => {
    if (!genre) {
        throw 'The genre was not provided.';
    } else if (typeof genre !== "string") {
        throw 'The genre is not a string.';
    }

    let trimmedGenre = genre.trim();

    if (trimmedGenre === '') {
        throw 'Error: The genre cannot just be spaces or empty';
    }

    let trimmedLowerCaseGenre = trimmedGenre.toLowerCase();

    let books = await helper.getBooks();

    const booksWithSameGenre = books.filter((book) => {
        return book.genres.some((item) => item.toLowerCase().includes(trimmedLowerCaseGenre));
    });

    if (booksWithSameGenre.length === 0) {
        throw 'There are no books of the provided genre.';
    }

    return booksWithSameGenre;
};

const priceRange = async (min, max) => {
    if (typeof min !== 'number' || isNaN(min) || min === Infinity || min === -Infinity || min === null || min === undefined || min === false) {
        throw 'The min is not a valid number';
    } else if (typeof max !== 'number' || isNaN(max) || max === Infinity || max === -Infinity || max === null || max === undefined || max === false) {
        throw 'The max is not a valid number';
    } else if (min < 0) {
        throw 'The min cannot be negative.';
    } else if (max <= min || max < 0) {
        throw 'The max cannot be less than or equal to the min';
    }

    let books = await helper.getBooks();

    const booksWithinPriceRange = books.filter((book) => {
        return book.price >= min && book.price <= max;
    });

    if (booksWithinPriceRange.length === 0) {
        throw 'Error: No books were found within the provided price range.';
    }

    return booksWithinPriceRange;
};

const getAllBooksWithAuthorName = async () => {
    let books = await helper.getBooks();
    let authors = await helper.getAuthors();

    for (const book of books) {
        const matchingAuthor = authors.find(author => author.id === book.authorId);

        if (matchingAuthor) {
            book.author = matchingAuthor.first_name + ' ' + matchingAuthor.last_name;
            delete book.authorId;
        }
    }

    return books;
};

export {
    getBookById,
    getAuthorName,
    sameGenre,
    priceRange,
    getAllBooksWithAuthorName
}
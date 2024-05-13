/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import * as authors from "./authors.js";
import * as books from "./books.js";

// Test Cases for getAuthorById(id)

/*try {
    let author = await authors.getAuthorById('1871E6d7-551f-41cb-9a07-08240b86c95c');
    console.log(author);
} catch (error) {
    console.log(error);
}

try {
    let author = await authors.getAuthorById(2);
    console.log(author);
} catch (error) {
    console.log(error);
}

try {
    let author = await authors.getAuthorById(' ');
    console.log(author);
} catch (error) {
    console.log(error);
}

try {
    let author = await authors.getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');
    console.log(author);
} catch (error) {
    console.log(error);
}

// Test Cases for searchAuthorByName(searchTerm)

try {
    let author = await authors.searchAuthorByName('van');
    console.log(author);
} catch (error) {
    console.log(error);
}

try {
    let author = await authors.searchAuthorByName(2);
    console.log(author);
} catch (error) {
    console.log(error);
}

try {
    let author = await authors.searchAuthorByName(undefined);
    console.log(author);
} catch (error) {
    console.log(error);
}

try {
    let author = await authors.searchAuthorByName(' ');
    console.log(author);
} catch (error) {
    console.log(error);
}

try {
    let author = await authors.searchAuthorByName('foobar');
    console.log(author);
} catch (error) {
    console.log(error);
}

// Test Cases for getBookNames

try {
    let books = await authors.getBookNames("Prisca", "Vakhonin");
    console.log(books);
} catch (error) {
    console.log(error);
}

try {
    let books = await authors.getBookNames();
    console.log(books);
} catch (error) {
    console.log(error);
}

try {
    let books = await authors.getBookNames(undefined, undefined);
    console.log(books);
} catch (error) {
    console.log(error);
}

try {
    let books = await authors.getBookNames(' ', ' ');
    console.log(books);
} catch (error) {
    console.log(error);
}

try {
    let books = await authors.getBookNames('Monica', 'Suresh');
    console.log(books);
} catch (error) {
    console.log(error);
} */

/*try {
    let youngestOldest = await authors.youngestOldest();
    console.log(youngestOldest);
} catch (error) {
    console.log(error);
} */

// Test Cases for sameBirthday

try {
    let sameDOB = await authors.sameBirthday(12, 11);
    console.log(sameDOB);
} catch (error) {
    console.log(error);
}

/*try {
    let sameDOB = await authors.sameBirthday(2, 30);
    console.log(sameDOB);
} catch (error) {
    console.log(error);
}

try {
    let sameDOB = await authors.sameBirthday("2", "30");
    console.log(sameDOB);
} catch (error) {
    console.log(error);
}

try {
    let sameDOB = await authors.sameBirthday(2, 24);
    console.log(sameDOB);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getBookById('99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e');
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getBookById(undefined);
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getBookById(' ');
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff');
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getBookById(1);
    console.log(book);
} catch (error) {
    console.log(error);
}

// Test Cases for getAuthorName(bookId)

try {
    let book = await books.getAuthorName(" 99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e ");
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getAuthorName(-1);
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getAuthorName();
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getAuthorName(' ');
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getAuthorName('7989fa5e-5617-43f7-a931-46036f9dbcff');
    console.log(book);
} catch (error) {
    console.log(error);
}

// Test Cases for sameGenre(genre)

try {
    let book = await books.sameGenre();
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.sameGenre('memoir');
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.sameGenre(1);
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.sameGenre(' ');
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.sameGenre('foo bar');
    console.log(book);
} catch (error) {
    console.log(error);
} */

// priceRange(min, max) Test Cases

/*try {
    let book = await books.priceRange(1, 1.01);
    console.log(book);
} catch (error) {
    console.log(error);
} */

/*try {
    let book = await books.priceRange(1);
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.priceRange(undefined, 2);
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.priceRange(5, 1);
    console.log(book);
} catch (error) {
    console.log(error);
}

try {
    let book = await books.getAllBooksWithAuthorName();
    console.log(book);
} catch (error) {
    console.log(error);
} */
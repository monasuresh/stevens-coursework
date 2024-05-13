//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
import axios from 'axios';

async function getAuthors() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    return data // this will be the array of author objects
}

async function getBooks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    return data // this will be the array of author objects
}

function getLastName(name) {
    // Split the name into parts
    var parts = name.split(" ");

    if (parts.length > 2) {
        return parts.slice(1).join(" ");
    }
    
    return parts[parts.length - 1];
}

function sortBookTitles(title1, title2) {
    // Split titles by comma if present
    const parts1 = title1.split(',');
    const parts2 = title2.split(',');

    const word1 = parts1.length > 1 ? parts1[0].trim() : title1.trim();
    const word2 = parts2.length > 1 ? parts2[0].trim() : title2.trim();

    return word1.localeCompare(word2);
}

function getPeopleWithSameDOB(person, authors) {
    return authors.filter(p => p.date_of_birth === person.date_of_birth);
};

function formatPeopleList(peopleList) {
    if (peopleList.length < 2) {
        return peopleList[0].first_name + ' ' + peopleList[0].last_name;
    } else {
        const names = peopleList.map(person => person.first_name + ' ' + person.last_name);
        names.sort(sortByLastName);

        return names;
    }
};

function isValidDayForMonth(month, day) {
    const maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Check if the day is valid for the given month
    if (day < 1 || day > maxDaysInMonth[month - 1]) {
        return false;
    }

    return true;
}

function sortByLastName(a, b) {
    var lastName1 = getLastName(a);
    var lastName2 = getLastName(b);

    return lastName1.localeCompare(lastName2);
}

export {
    getAuthors,
    getBooks,
    getLastName,
    sortBookTitles,
    getPeopleWithSameDOB,
    formatPeopleList,
    isValidDayForMonth,
    sortByLastName
}
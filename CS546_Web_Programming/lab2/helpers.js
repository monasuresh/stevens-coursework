/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

// Helper function for mergeCommonElements

export function sortSetDifferenceArray(setDifferenceArray, arrays) {
    for (let i = 0; i < arrays.length; i++) {
        let curr = arrays[i];
        let temp = [];

        for (let element of curr) {
            if (setDifferenceArray.includes(element) && !temp.includes(element)) {
                temp.push(element);
            }
        }

        setDifferenceArray.splice(0, setDifferenceArray.length);
        setDifferenceArray.push(...temp);
    }

    for (let i = 0; i < setDifferenceArray.length - 1; i++) {
        for (let j = 0; j < setDifferenceArray.length - i - 1; j++) {
            if (
                (typeof setDifferenceArray[j] !== 'number' &&
                    typeof setDifferenceArray[j + 1] !== 'number') ||
                (typeof setDifferenceArray[j] === 'number' &&
                    typeof setDifferenceArray[j + 1] === 'number')
            ) {
                if (setDifferenceArray[j] > setDifferenceArray[j + 1]) {
                    const temp = setDifferenceArray[j];
                    setDifferenceArray[j] = setDifferenceArray[j + 1];
                    setDifferenceArray[j + 1] = temp;
                }
            } else if (typeof setDifferenceArray[j] !== 'number') {
                const temp = setDifferenceArray[j];
                setDifferenceArray[j] = setDifferenceArray[j + 1];
                setDifferenceArray[j + 1] = temp;
            }
        }
    }
}

// Helper function for sortStockPrices

export function checkIfStringIsInProperFormat(inputString) {
    const substrings = inputString.split('|');

    for (const substring of substrings) {
        if (!/,.+/.test(substring)) {
            return false;
        }
    }

    return inputString.includes('|');
}

// Helper functions for evaluatePokerHand
export function validateCards(hand, communityCards) {
    // Check if hand and communityCards exist and have the correct number of cards
    if (!hand) {
        throw 'Error: The hand does not exist';
    } else if (!Array.isArray(hand)) {
        throw 'Error: The hand must be of type array.';
    } else if (hand.length !== 2) {
        throw 'Error: The hand must have exactly 2 cards.';
    } else if (!communityCards) {
        throw 'Error: The community cards do not exist';
    } else if (!Array.isArray(communityCards)) {
        throw 'Error: The community cards must be of type array.';
    } else if (communityCards.length < 3 || communityCards.length > 5) {
        throw 'Error: The community cards must have 3 to 5 cards.';
    }

    for (const card of hand) {
        validateCommunityAndHand(card, "hand");
    }

    for (const card of communityCards) {
        validateCommunityAndHand(card, "community cards");
    }
}

export function validateCommunityAndHand(card, cardType) {
    // Check if each card object in hand and communityCards is valid
    const validSuits = ['hearts', 'clubs', 'diamonds', 'spades'];
    const validValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    if (!card) {
        throw 'Input was not supplied or null, undefined, an empty string NaN, false, or 0';
    } else if (Array.isArray(card)) {
        throw `Error: An array was supplied instead of an object for ${cardType}.`;
    } else if (typeof card !== 'object') {
        throw `Error: Input must be an object for ${cardType}!`;
    } else if (!card.hasOwnProperty('suit') || !card.hasOwnProperty('value')) {
        throw `Error: One or more cards in the ${cardType} do not have the suit or value property`;
    }

    for (let property in card) {
        if (property.trim() !== 'suit' && property.trim() !== 'value') {
            throw `Error: There must only be suit and value properties in the ${cardType}`;
        }
    }

    if (typeof card.suit !== "string") {
        throw `Error: The type of the suit must be a string for ${cardType}.`;
    } else if (typeof card.value !== "string") {
        throw `Error: The type of the rank must be a string for ${cardType}.`;
    } else if (!validSuits.includes(card.suit.trim())) {
        throw `Error: The ${cardType} suit is invalid.`;
    } else if (!validValues.includes(card.value.trim())) {
        throw `Error: The ${cardType} rank is invalid.`;
    }
}

export function hasStraightFlush(hands) {
    const suitCount = {};

    for (const hand of hands) {
        const suitValue = hand.suit;
        if (!suitCount[suitValue]) {
            suitCount[suitValue] = [];
        }
        suitCount[suitValue].push(hand.value);
    }

    // Check each suit for a straight flush
    for (const suit in suitCount) {
        if (suitCount[suit].length >= 5) {
            const sortedCards = suitCount[suit].sort((a, b) => cardValue(a) - cardValue(b));
            let consecutiveCount = 1;
            let prevCardValue = cardValue(sortedCards[0]);

            for (let i = 1; i < sortedCards.length; i++) {
                const currentCardValue = cardValue(sortedCards[i]);

                if (currentCardValue - prevCardValue === 1 || (prevCardValue === 5 && currentCardValue === 14)) {
                    consecutiveCount++;
                    if (consecutiveCount >= 5) {
                        return true; // Found a straight flush
                    }
                } else if (currentCardValue !== prevCardValue) {
                    consecutiveCount = 1;
                }

                prevCardValue = currentCardValue;
            }
        }
    }

    return false; // No straight flush found
}

export function cardValue(card) {
    const cardValues = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': [1, 14]
    };

    return Array.isArray(cardValues[card]) ? cardValues[card][1] : cardValues[card];
}

export function hasThreeOfAKind(arrOfHands) {
    const cardCounts = {};

    for (const hand of arrOfHands) {
        const cardValue = hand.value;
        cardCounts[cardValue] = (cardCounts[cardValue] || 0) + 1;
    }

    // Check if any card value appears three or more times
    for (const value in cardCounts) {
        if (cardCounts[value] >= 3) {
            return true;
        }
    }

    return false;
}


export function hasPair(arrOfHands) {
    const cardCounts = {};

    // Count card values
    for (const hand of arrOfHands) {
        const cardValue = hand.value;
        cardCounts[cardValue] = (cardCounts[cardValue] || 0) + 1;
    }

    for (const value in cardCounts) {
        if (cardCounts[value] >= 2) {
            return true;
        }
    }

    return false;
}

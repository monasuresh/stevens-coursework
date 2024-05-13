/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import * as helper from './helpers.js';

let emojiCounter = (message) => {
      // Define the regex pattern
  const regex = /:(?! )[^\s:]+:/g;

  // Use the `match` method with the global flag to find all matches
  const matches = message.match(regex);

  // Return the number of matches
  return matches ? matches.length : 0;
};

console.log(emojiCounter(':: :::: a ::: a:::'));

let sortStockPrices = (lastStocks, currStocks) => {
      if (!lastStocks || !currStocks) {
            throw 'The string does not exist';
      }
      if (typeof lastStocks !== 'string' || typeof currStocks !== 'string') {
            throw 'Either the last stock input or current stock input is not a string.';
      }

      let lastStocksTrimmed = lastStocks.trim();
      let currStocksTrimmed = currStocks.trim();

      if (!helper.checkIfStringIsInProperFormat(lastStocksTrimmed) || !helper.checkIfStringIsInProperFormat(currStocksTrimmed)) {
            throw 'Error: The strings are not in the proper format.';
      }

      lastStocksTrimmed = lastStocks.trim();
      currStocksTrimmed = currStocks.trim();

      const lastStocksArray = lastStocksTrimmed.split('|');
      const currStocksArray = currStocksTrimmed.split('|');

      // Checking if both input strings have the same number of stock ticker and stock price pairs
      if (lastStocksArray.length !== currStocksArray.length) {
            throw 'Both input strings must contain the same number of stock price/ticker pairs.';
      }

      const lastStockData = {};
      const currStockData = {};

      for (const pair of lastStocksArray) {
            const [ticker, price] = pair.split(',');
            if (lastStockData.hasOwnProperty(ticker.toLowerCase())) {
                  throw 'Error: There are duplicate stocks';
            }

            if (/^[a-zA-Z]+$/.test(ticker) === false || !(ticker.length >= 1 && ticker.length <= 5)) {
                  throw 'Error: The ticker contains non-alphabetical characters and/or incorrect length.';
            }

            if (/^(-?\d+\.\d{2,}|\.\d{2,})$/.test(price) === false) {
                  throw 'Error: the price is not in the correct format.';
            }


            let priceToFloat = parseFloat(price);

            if (priceToFloat <= 0) {
                  throw 'Stock prices cannot be 0 or negative.';
            }

            lastStockData[ticker.toLowerCase()] = priceToFloat;
      }
      for (const pair of currStocksArray) {
            const [ticker, price] = pair.split(',');
            if (currStockData.hasOwnProperty(ticker.toLowerCase())) {
                  throw 'Error: There are duplicate stocks';
            }
            if (/^[a-zA-Z]+$/.test(ticker) === false || !(ticker.length >= 1 && ticker.length <= 5)) {
                  throw 'Error: The ticker contains non-alphabetical characters and/or incorrect length.';
            }

            if (/^(-?\d+\.\d{2,}|\.\d{2,})$/.test(price) === false) {
                  throw 'Error: the price is not in the correct format.';
            }


            let priceToFloat = parseFloat(price);

            if (priceToFloat <= 0) {
                  throw 'Stock prices cannot be 0 or negative.';
            }

            currStockData[ticker.toLowerCase()] = priceToFloat;
      }

      // Check if both input strings contain the same stock tickers
      const lastStockTickers = Object.keys(lastStockData);
      const currStockTickers = Object.keys(currStockData);

      if (lastStockTickers.length !== currStockTickers.length || !lastStockTickers.every(ticker => currStockTickers.includes(ticker))) {
            throw 'Both input strings must contain the same stockTickers';
      }

      // Calculate the percentage change and create an array of objects
      const stockChanges = [];
      for (const ticker of lastStockTickers) {
            const lastPrice = lastStockData[ticker];
            const currPrice = currStockData[ticker];
            const change = ((currPrice - lastPrice) / lastPrice) * 100;
            stockChanges.push({
                  symbol: ticker.toUpperCase(),
                  price: currPrice,
                  change: parseFloat(change.toFixed(1)),
            });
      }

      stockChanges.sort((a, b) => b.change - a.change);

      return stockChanges;

};

let mashUp = (string1, string2) => {
      if (!string1 || !string2 || (!string1 && !string1)) {
            throw 'Less than one input string was provided.';
      } else if (typeof string1 !== 'string' || typeof string2 !== 'string') {
            throw 'One or more of the input is not of type string';
      } else if (string1.trim().length === 0 || string2.trim().length === 0) {
            throw 'Error: The string cannot be empty or just have spaces.';
      } else if (string1.length < 4 || string2.length < 4) {
            throw 'Error: The length of the string is less than 4';
      }
      return string2.substring(0, 4).trim() + string1.substring(4).trim() + " " + string1.substring(0, 4).trim() + string2.substring(4).trim();
};

export {
      emojiCounter,
      mashUp,
      sortStockPrices
};


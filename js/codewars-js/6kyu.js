// Given two array of integers(arr1,arr2). Your task is going to find a
// pair of numbers(an element in arr1, and another element in arr2), their
// difference is as big as possible(absolute value); Again, you should to
// find a pair of numbers, their difference is as small as possible.
// Return the maximum and minimum difference values by an array:
// [ max difference, min difference ]
//
// For example:
//
// Given arr1 = [3,10,5], arr2 = [20,7,15,8]
// should return [17,2] because 20 - 3 = 17, 10 - 8 = 2


const maxAndMin = function(arr1, arr2) {
  let allDiffs = [];

  for (var i1 = 0; i1 < arr1.length; i1++) {
    for (var i2 = 0; i2 < arr2.length; i2++) {
      allDiffs.push(Math.abs(arr1[i1] - arr2[i2]));
    }
  }

  return [Math.max(...allDiffs), Math.min(...allDiffs)];
};

// console.log(maxAndMin([1,2,3,4,5],[6,7,8,9,10])); //[9,1]
// console.log(maxAndMin([3,10,5],[3,10,5])); // [7,0]
// console.log(maxAndMin([3],[20])); //  [17,17]

// https://www.codewars.com/kata/kontti-language/train/javascript
// Kontti language is a finnish word play game, you add -kontti to the
// end of a word and then switch their first letters until the first
// vowel (as in "aeiouy"); if no vowel is present, the word stays the
// same.
//
// For example the word lamppu becomes komppu-lantti; aeiou becomes
// koeiou-antti and so on.
//
// Write a string method that turns a sentence into a kontti sentence!

String.prototype.kontti = function(){
  return this.split(' ').map( word => {
    let firstWord = wordChunks('kontti', true) + wordChunks(word);
    let lastWord = wordChunks(word, true) + wordChunks('kontti');
    return wordChunks(word, true) ? `${firstWord}-${lastWord}` : word;
  }).join(' ');
};

const wordChunks = function (word, firstChunk) {
  let idx = /[aeiou]/.search(word) ? (/[aeiouy]/.search(word).index) + 1 : 0;
  return firstChunk ? word.slice(0, idx) : word.slice(idx);
};

// console.log("lamppu".kontti()); //=> "komppu-lantti"
// console.log("lamppu sofia".kontti()); //=> "komppu-lantti kofia-sontti"
// console.log("silly game".kontti());//=> "kolly-sintti kome-gantti"
// console.log("".kontti());//=> ""
// console.log("silly grrr".kontti());//=> "kolly-sintti grrr"


// https://www.codewars.com/kata/replace-with-alphabet-position/train/javascript
// Welcome. In this kata you are required to, given a string, replace
// every letter with its position in the alphabet. If anything in the
// text isn't a letter, ignore it and don't return it. a being 1, b
// being 2, etc.

const alphabetPosition = string => {
  let startIndex = /[a-zA-Z]/.exec(string).index;
  let result = `${letterPosition(string[startIndex])}`;

  string.slice(startIndex + 1).split("").forEach( char => {
    if (letterPosition(char)) result += " " + letterPosition(char);
  });

  return result;
};

const letterPosition = (letter) => {
  let alphabetArr = "abcdefghijklmnopqrstuvwxyz".split("");
  let capsAlphabetArr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let returnVal =
    alphabetArr.indexOf(letter) + 1
    || capsAlphabetArr.indexOf(letter) + 1;
  return returnVal ? returnVal : null;
};

// console.log(alphabetPosition("The sunset sets at twelve o' clock." ) === "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11");
// console.log(alphabetPosition( "The narwhal bacons at midnight.") === "20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20");

const sqInRect = (w, h, firstRound = true) => {
  if (w > h) {
    let oldW = w;
    w = h;
    h = oldW;
  }

  let result = [];

  if ( w === 1 ){
    for (var i = 0; i < h; i++) {
      result.push(w);
    }
  } else if ( w > 1 ) {
    result.push(w);
    result.push(sqInRect((h - w), w, false));
  }

  return ((w === h) && firstRound) ? null : result.flatten();

};

Array.prototype.flatten = function () {
  let result = [];
  this.forEach( el => {
    if(el){
      if( typeof el === "number") {
        result.push(el);
      } else {
        result = result.concat(el.flatten());
      }
    }
  });
  return result;
};

// console.log(sqInRect(5, 5));
// console.log(sqInRect(5, 3));
// console.log(sqInRect(16, 31));
// console.log(sqInRect(4, 16));

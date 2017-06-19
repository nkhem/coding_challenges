// https://www.codewars.com/kata/gap-in-primes/train/javascript
// The prime numbers are not regularly spaced. For example from 2 to 3 the gap is 1. From 3 to 5 the gap is 2. From 7 to 11 it is 4. Between 2 and 50 we have the following pairs of 2-gaps primes: 3-5, 5-7, 11-13, 17-19, 29-31, 41-43
// A prime gap of length n is a run of n-1 consecutive composite numbers between two successive primes (see: http://mathworld.wolfram.com/PrimeGaps.html).
//
// We will write a function gap with parameters:
// g (integer >= 2) which indicates the gap we are looking for
// m (integer > 2) which gives the start of the search (m inclusive)
// n (integer >= m) which gives the end of the search (n inclusive)
//
// In the example above gap(2, 3, 50) will return [3, 5] or (3, 5) or {3, 5} which is the first pair between 3 and 50 with a 2-gap.
// So this function should return the first pair of two prime numbers spaced with a gap of g between the limits m, n if these numbers exist otherwise nil or null or None or Nothing (depending on the language).

const gap = function(gapNum, startNum, endNum){
  let prevPrime = null;

  for (var num = startNum; num <= endNum; num++) {
    if(isPrime(num)){
      if (!prevPrime || num - prevPrime !== gapNum) {
        prevPrime = num;
      } else {
        return [prevPrime, num];
      }
    }
  }
  return null;
};

const isPrime = function(num) {
  for (var i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return (num < 2) ? false : true;
};

// console.log(gap(4, 340107, 340121));//Expected: '[340117, 340121]', instead got: '[340107, 340111]'

// console.log(gap(2, 5, 7));// => [5, 7]
// console.log(gap(2, 5, 5));// => null
// console.log(gap(4, 130, 200));// => [163, 167]
// console.log(gap(6,100,110)); // => null (between 100 and 110 we have 101, 103, 107, 109 but 101-107is not a 6-gap because there is 103in between and 103-109is not a 6-gap because there is 107in between.)

// https://www.codewars.com/kata/directions-reduction
// Once upon a time, on a way through the old wild west,…
//
// … a man was given directions to go from one point to another. The directions were "NORTH", "SOUTH", "WEST", "EAST". Clearly "NORTH" and "SOUTH" are opposite, "WEST" and "EAST" too. Going to one direction and coming back the opposite direction is a needless effort. Since this is the wild west, with dreadfull weather and not much water, it's important to save yourself some energy, otherwise you might die of thirst!
//
// How I crossed the desert the smart way.
//
// The directions given to the man are, for example, the following:
// ["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]
//
// You can immediatly see that going "NORTH" and then "SOUTH" is not reasonable, better stay to the same place! So the task is to give to the man a simplified version of the plan. A better plan in this case is simply:
// ["WEST"]
//
// Examples
//
// dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]) => ["WEST"]
// dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH"]) => []

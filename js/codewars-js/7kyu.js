// Write function replaceAll that will replace all occuriencies of
// an item with another. Should work and both string and array inputs
//
// Ex: replaceAll([1,2,2], 1, 2) => [2,2,2]

const replaceAll = (input, find, replace) => {
  return Array.isArray(input)
    ? input.map( el => el === find ? replace : el )
    : input.replace(RegExp(find, 'g'), replace);
};

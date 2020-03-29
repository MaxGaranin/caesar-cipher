const UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_MIN = 65;
const UPPER_MAX = 90;
const LOWER_MIN = 97;
const LOWER_MAX = 122;

function encode(str, shift) {
  return processCoding(str, shift, getShiftedLetter);
}

function decode(str, shift) {
  return processCoding(str, shift, getUnshiftedLetter);
}

function processCoding(str, shift, func) {
  shift = shift % UPPER_LETTERS.length;

  const result = str.split('').map(ch => {
    const charCode = ch.charCodeAt(0);
    if (charCode >= UPPER_MIN && charCode <= UPPER_MAX) {
      return func(UPPER_LETTERS, ch, shift);
    } else if (charCode >= LOWER_MIN && charCode <= LOWER_MAX) {
      return func(LOWER_LETTERS, ch, shift);
    }
    return ch;
  });

  return result.join('');
}

function getShiftedLetter(str, ch, shift) {
  let index = str.indexOf(ch);
  index = index + shift;
  if (index >= str.length) index = index - str.length;
  return str[index];
}

function getUnshiftedLetter(str, ch, shift) {
  let index = str.indexOf(ch);
  index = index - shift;
  if (index < 0) index = str.length + index;
  return str[index];
}

module.exports = {
  encode,
  decode
};

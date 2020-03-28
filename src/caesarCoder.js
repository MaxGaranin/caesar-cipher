const UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_MIN = 65;
const UPPER_MAX = 90;
const LOWER_MIN = 97;
const LOWER_MAX = 122;

function encode(str, shift) {
  const result = str.split('').map(ch => {
    const charCode = ch.charCodeAt(0);
    if (charCode >= UPPER_MIN && charCode <= UPPER_MAX) {
      return getShiftedLetter(UPPER_LETTERS, ch, shift);
    } else if (charCode >= LOWER_MIN && charCode <= LOWER_MAX) {
      return getShiftedLetter(LOWER_LETTERS, ch, shift);
    } else {
      return ch;
    }
  });

  return result.join('');
}

function decode(str, shift) {
  const result = str.split('').map(ch => {
    const charCode = ch.charCodeAt(0);
    if (charCode >= UPPER_MIN && charCode <= UPPER_MAX) {
      return getUnshiftedLetter(UPPER_LETTERS, ch, shift);
    } else if (charCode >= LOWER_MIN && charCode <= LOWER_MAX) {
      return getUnshiftedLetter(LOWER_LETTERS, ch, shift);
    } else {
      return ch;
    }
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
  decode,
};

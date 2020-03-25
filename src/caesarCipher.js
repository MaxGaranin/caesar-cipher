const { Transform } = require('stream');

class EncodeTransform extends Transform {
  constructor({ shift }) {
    super();
    this._shift = shift;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = encode(chunk.toString(), this._shift);

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

class DecodeTransform extends Transform {
  constructor({ shift }) {
    super();
    this._shift = shift;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = decode(chunk.toString(), this._shift);

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';

function getShiftedLetter(str, ch, shift) {
  let index = str.indexOf(ch);
  index = index + shift;
  if (index >= str.length) index = index - str.length;
  return str[index];
}

function encode(str, shift) {
  const result = str.split('').map(ch => {
    const charCode = ch.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      return getShiftedLetter(upperLetters, ch, shift);
    } else if (charCode >= 97 && charCode <= 122) {
      return getShiftedLetter(lowerLetters, ch, shift);
    } else {
      return ch;
    }
  });

  return result.join('');
}

function getUnshiftedLetter(str, ch, shift) {
  let index = str.indexOf(ch);
  index = index - shift;
  if (index < 0) index = str.length + index;
  return str[index];
}

function decode(str, shift) {
  const result = str.split('').map(ch => {
    const charCode = ch.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      return getUnshiftedLetter(upperLetters, ch, shift);
    } else if (charCode >= 97 && charCode <= 122) {
      return getUnshiftedLetter(lowerLetters, ch, shift);
    } else {
      return ch;
    }
  });

  return result.join('');
}

module.exports = {
  EncodeTransform,
  DecodeTransform
};

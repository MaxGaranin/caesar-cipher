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

function encode(str, shift) {
  return str;
}

function decode(str, shift) {
  return str;
}

module.exports = {
  EncodeTransform,
  DecodeTransform
};

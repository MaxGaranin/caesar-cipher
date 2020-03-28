const { Transform } = require('stream');
const { encode, decode } = require('./caesarCoder');

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

module.exports = {
  EncodeTransform,
  DecodeTransform
};

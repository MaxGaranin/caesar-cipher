const { Transform } = require('stream');
const { ENCODE, DECODE } = require('./constants');
const { encode, decode } = require('./caesarCoder');

class CaesarCipherTransform extends Transform {
  constructor(action, shift) {
    super();

    if (action === ENCODE) {
      this._action = encode;
    } else if (action === DECODE) {
      this._action = decode;
    }

    this._shift = +shift;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = this._action(chunk.toString(), this._shift);

      return callback(null, resultString);
    } catch (err) {
      return callback(err);
    }
  }
}

module.exports = {
  CaesarCipherTransform
};

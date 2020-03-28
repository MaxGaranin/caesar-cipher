const fs = require('fs');
const stream = require('stream');
const util = require('util');
const { program } = require('commander');
const { EncodeTransform, DecodeTransform } = require('./caesarCoderStream');

program
  .requiredOption('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .requiredOption('-a, --action <type>', 'an action encode/decode');

program.parse(process.argv);

const shift = +program.shift;

let caesarCoder = null;
if (program.action == 'encode') {
  const encoder = new EncodeTransform({ shift: shift });
  caesarCoder = encoder;
} else if (program.action == 'decode') {
  const decoder = new DecodeTransform({ shift: shift });
  caesarCoder = decoder;
} else {
  console.error(`Wrong 'action' parameter, must be encode/decode.`);
  process.exit(-1);
}

const reader = program.input
  ? fs.createReadStream(program.input)
  : process.stdin;

const writer = program.output
  ? fs.createWriteStream(program.output)
  : process.stdout;

const pipeline = util.promisify(stream.pipeline);
pipeline(
  reader,
  caesarCoder,
  writer
).catch(err => {
  console.error(`There was an error while processing encoding/decoding:\n${err.message}!`);  
  process.exit(-1);
});


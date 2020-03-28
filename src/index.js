const fs = require('fs');
const stream = require('stream');
const util = require('util');
const { program } = require('commander');
const { ENCODE, DECODE } = require('./constants');
const { CaesarCipherTransform } = require('./caesarCoderStream');

program
  .requiredOption('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .requiredOption('-a, --action <type>', 'an action encode/decode');

program.parse(process.argv);

if (program.action !== ENCODE && program.action != DECODE) {
  console.error(`Wrong action parameter '${program.action}', must be encode/decode.`);
  process.exit(-1);
}

const caesarCoder = new CaesarCipherTransform(program.action, +program.shift);

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


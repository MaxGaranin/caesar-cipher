const fs = require('fs');
const { program } = require('commander');
const { EncodeTransform, DecodeTransform } = require('./caesarCipher');

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
  encoder.on('error', (err) => {
    console.error('There was an error encoding the data!', err);
    process.exit(-1);
  });
  caesarCoder = encoder;
} else if (program.action == 'decode') {
  const decoder = new DecodeTransform({ shift: shift });
  decoder.on('error', (err) => {
    console.error('There was an error decoding the data!', err);
    process.exit(-1);
  });
  caesarCoder = decoder;
} else {
  console.error(`Wrong 'action' parameter, must be encode/decode.`);
  process.exit(-1);
}

const reader = program.input
  ? fs.createReadStream(program.input)
  : process.stdin;

reader.on('error', (err) => {
  console.error(`There was an error reading the file: '${program.input}'!`);
  process.exit(-1);
});

const writer = program.output
  ? fs.createWriteStream(program.output)
  : process.stdout;

writer.on('error', (err) => {
  console.error(`There was an error writing the file '${program.output}'!`);
  process.exit(-1);
});

reader.pipe(caesarCoder).pipe(writer);

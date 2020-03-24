const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { EncodeTransform, DecodeTransform } = require('./caesarCipher');

program
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .option('-a, --action <type>', 'an action encode/decode');
 
program.parse(process.argv);

const myReadable = fs.createReadStream(
  path.join(__dirname, program.input)
);

const myWritable = fs.createReadStream(
  path.join(__dirname, program.output)
);

const encoder = new EncodeTransform({ shift: program.shift });

myReadable.pipe(encoder).pipe(myWritable);


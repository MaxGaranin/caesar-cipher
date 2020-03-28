Caesar cipher CLI tool (Task 1 on RSS 2020 NodeJS)

Implemented CLI tool that can encode and decode a text by Caesar cipher.

CLI tool accept 4 options (short alias and full name):

-s, --shift: a shift
-i, --input: an input file
-o, --output: an output file
-a, --action: an action encode/decode

Details:

1. Action (encode/decode) and the shift are required, if one of them missed - an error will be shown, the process should exit with non-zero status code.
2. If the input file is missed - used stdin as an input source.
3. If the output file is missed - used stdout as an output destination.
4. If the input and/or output file is given but doesn't exist or you can't read it (e.g. because of permissions or it is a directory) - human-friendly error will be printed in stderr.
5. For encoding/decoding use only the English alphabet, all other characters will be kept untouched.

Usage example:

$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
$ node my_caesar_cli --action decode --shift 7 --input decoded.txt --output plain.txt

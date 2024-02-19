const moo = require('moo');
const fs = require("fs");

let lexer = moo.compile({
  WS:      /[ \t]+/,
  comment: /\/\/.*?$/,
  number:  /0|[1-9][0-9]*/,
  string:  /"(?:\\["\\]|[^\n"\\])*"/,
  lparen:  '(',
  rparen:  ')',
  lbrace:  '{',
  rbrace:  '}',
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  arrow: '=>',
  assign: '=',
  NL:      { match: /\n/, lineBreaks: true },
});

module.exports = lexer;

async function main() {
    fs.promises.readFile("example.sp").then(data => {
        code = data.toString();
        lexer.reset(code);
        while (true) {
            const token = lexer.next();
            if (!token) {
                break;
            }
            console.log(token);
        }
    }).catch(err => console.log(err.stack));
};

main();
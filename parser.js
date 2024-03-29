const nearley = require("nearley");
const grammar = require("./grammar.js");
const fs = require("fs/promises");

async function main() {

    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .sp file.");
        return;
    }
    
    const code = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
    parser.feed(code);
    if (parser.results.length > 1) {
        console.log("Error: ambiguous grammar detected.");
    } else if (parser.results.length == 1) {
        const ast = parser.results[0];
        const outputFilename = filename.replace(".sp", ".ast");
        await fs.writeFile(outputFilename, JSON.stringify(ast, null, "  "));
        console.log(`Wrote ${outputFilename}.`);
    } else {
        console.log("Error: no parse found.");
    }

}

main().catch(err => console.log(err.stack));
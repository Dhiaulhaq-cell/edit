const yargs = require ('yargs');
const validator = require ('validator')
const func = require("./src/func.js");
const fs = require ('fs');

yargs.command({
    command: "detail",
    describe: "detail contact",
    builder: {
      name: {
        describe: "contact name",
        demandOption: true,
        type: "string",
      }
    },
     handler :
      func.detailKontak
  });
  
  yargs.parse();
  func.rl.close();
  
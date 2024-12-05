const yargs = require ('yargs');
const validator = require ('validator')
const func = require("./src/func.js");
const fs = require ('fs');


yargs.command({
  command: "list",
  describe: "list contact",
 
  handler : 
    func.tampilkanKontak()
});


yargs.parse();
func.rl.close();


 

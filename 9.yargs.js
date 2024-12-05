const yargs = require ('yargs');
const validator = require ('validator')
const func = require("./src/func.js");



yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    name: {
      describe: "contact name",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "contact mobile",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "contact email",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const data = {
      name: argv.name,
      mobile: argv.mobile,
      email: argv.email,
    };
    func.addContact(data);
    console.log(data);
    
 
  },
 

});


yargs.parse();
func.rl.close();


 

//memasukan modul yang dibutuhkan
const yargs = require ('yargs');
const func = require("./src/func.js");
//membuat command delete
yargs.command ({
    command : "delete",
    describe: "delete contact",
    builder: {
      name: { //identifikasi kontak yang akan dihapus
      describe: "kontak dihapus",
      demandOption: true,
      type: "string",
      } }, 
  handler(argv) {
    func.deleteContact(argv);
    }
    
  });
yargs.parse();
func.rl.close();



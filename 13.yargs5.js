const yargs = require ('yargs');
const validator = require ('validator')
const func = require("./src/func.js");
const fs = require ('fs');

yargs.command({
    command: "edit",
    describe: "edit contact",
    builder: {
      name: { //mengenali kontak dari nama
        describe: "contact name",
        demandOption: true,
        type: "string",
      },
      newName: { //update nama yang baru
        describe: "new contact name",
        demandOption: true,
        type: "string",
      },
      newMobile: { //update nomor yang baru
        describe: "new contact mobile",
        demandOption: true,
        type: "string",
      },
      newEmail: { //update email yang baru
        describe: "new contact email",
        demandOption: false,
        type: "string",
      },
    },
    //menampung nama,email,nomor yang baru
     handler (argv) {
      let data = {
         name: argv.newName,
         mobile: argv.newMobile,
         email: argv.newEmail,
      }
      //memanggil fungsi untuk merubah kontak
      func.ubahKontak(argv,data)

      
     }
})
  
  yargs.parse();
  func.rl.close();

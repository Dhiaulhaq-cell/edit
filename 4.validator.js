//memasukan module validator
const validator = require('validator')
const readline = require('node:readline');
const { default: isEmail } = require('validator/lib/isEmail');
//membuat interface kedalam 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
//membuat pertanyaan nama

rl.question('Apa nama kamu? ', (nama) => {
    console.log(`Nama kamu: ${nama}`);
 
    rl.question('Berapa nomor kamu? ', (phoneNumber) => {
        if (validator.isMobilePhone(phoneNumber, "id-ID")) {
            console.log(`${phoneNumber} adalah nomor telepon yang valid.`);
          } else {
            console.log(`${phoneNumber} bukan nomor telepon yang valid.`);  
          };
    

    rl.question('Apa email kamu? ', (email) => {
     if (validator.isEmail(email)) {
            console.log(`email kamu: ${email}`)
          } else {
            console.log(`email tidak valid`)
          };
          
// Menutup readline setelah semua pertanyaan selesai
          rl.close();
        });
      });
    });
